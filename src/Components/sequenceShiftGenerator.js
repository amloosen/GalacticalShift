
import { range } from "lodash";
import normalPdf from "normal-pdf";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";


const sequenceGenerator = ({ onSpacebarHit = () => {} }) => {


function [sq] = sequenceGenerator(params, user)
//function to set up the dimensional shifts, true values etc.

//// Input needed (same for all subjects in one study)
//- number of trials (in params)
//- stimuli_values (in params)
const min_trials_ps = 20;// min trials after a shift until next one
const max_shifts = this.props.trialTotal/min_trials_ps ;//initialize

const w0 = [100; 0; 0; 100; 100; 0; 100; 0; 0; 100];//ADAPT if needed
const w_values = [-1; 1; 1; -1; -1; 1; -0.5; 0.5; 0.5;-0.5]; //w values for all shifts + the beginning;- ADAPT if needed

//random sequence of all stimuli created as follows;
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

var corr_elem_tmp = [1, 2, 3]; //1 is left and 2 is right; determine where the correct value is displayed
shuffle(corr_elem_tmp);

// const stimuli_col = params.task.stimuli_col (randperm(length(params.task.stimuli_col )));

//random sequence of stimuli value created as follows;

function getRand(array) {
  var val_options = range(0, 110, 10);
  var rand = val_options[~~(Math.random() * val_options.length)];
  // var rand = Math.floor(Math.random() * 10);
  if (array.indexOf(rand) === -1) {
    return rand;
  } else {
    return getRand(array);
  }
}

// sq.stimuli_values_rand = params.task.stimuli_values(randperm(length(params.task.stimuli_values)));

//random noise created as follows; do not uncomment throughout one study
const sd = 2;
const eps = randn(params.main.n_trials,1).*sd;

//// Output
//Struct (sq) with:
// - rule shifts
// - relevant stimuli
// - x values
// - weights
// - true value (y)

//// Rule Shifts
sq.shift_sq     = zeros(params.task.numShift,1); //1==ID; 2==ED; 0 ==none
sq.shift_sq(1)  = 1;
for i=2:params.task.numShift
    if sq.shift_sq(i-1)==1
        sq.shift_sq (i) = 2;
    else
        sq.shift_sq (i) = 1;
    end
end

//shift number in that corresponding trial
sq.stages = zeros(params.main.n_trials,1);
for j=1:params.task.numShift
    sq.stages((user.trial_sequences*(j-1))+1:user.trial_sequences*j) = j;
end

//// Bring together
//prep colour sequence according to shifts - ADAPT if needed
col_sq = repelem(sq.stimuli_col,2);
sq.col_sq = repmat(col_sq,[1,ceil(params.task.numShift/2)]);//ADAPT accordingly

//prepare the adaptation of stimuli values no ensure no true values >100 and <0 - ADAPT if needed
s = params.main.n_trials /((size(sq.stimuli_values_rand,2)));
s = ceil(s);
//adapt size to trial length
A = repmat(sq.stimuli_values_rand,[1,s]);

//create vectors to adapt stimuli vector if clashing with w or error term values
//error term too high (>=0.1)
stimuli_val = A(1:params.main.n_trials);
stimuli_val_pos = stimuli_val;
stimuli_val_neg = stimuli_val;
stimuli_val_pos(stimuli_val_pos==0)= stimuli_val_pos(stimuli_val_pos==0)+ 10; //if epsilon is too big the relevant stimulus can't be 100 but will be 90 instead
stimuli_val_neg(stimuli_val_neg==100)= stimuli_val_neg(stimuli_val_neg==100)-10; //if epsilon is too big the relevant stimulus can't be 100 but will be 90 instead

for i=1:params.task.numShift

    //initialize
    sq.all{i} = nan(user.trial_sequences(i),7);

    //fill in preceded shift
    sq.all{i}(:,1) = sq.shift_sq(i);

    //w0
    sq.all{i}(:,2) = sq.w0(i);

    //fill in relevant Ws
    sq.all{i}(:,3) = sq.w_values(i);

    //fill in relevant colours
    sq.all{i}(:,4) = sq.col_sq(i);

    //     t = user.trial_sequences*(i-1);

    t = sum(user.trial_sequences(1:(i-1)));
    if i==1
        t = 0;
    end

    for k = 1 : user.trial_sequences(i)
        //fill in relevant noise - adapt with altering noise if necessary
        sq.all{i}(k,6) = sq.eps(t+k);

        //fill in stimuli values considering the Ws
        if sq.eps(t+k)>= 0.0
            if sq.w_values(i)== 1 || sq.w_values(i)==0.5
                sq.all{i}(k,5) = stimuli_val_neg(t+k);
            elseif sq.w_values(i)== -1 || sq.w_values(i)== -0.5
                sq.all{i}(k,5) = stimuli_val_pos(t+k);
            end
        elseif sq.eps(t+k)<= -0.0
            if sq.w_values(i)== 1 || sq.w_values(i)==0.5
                sq.all{i}(k,5) = stimuli_val_pos(t+k);
            elseif sq.w_values(i)== -1 || sq.w_values(i)== -0.5
                sq.all{i}(k,5) = stimuli_val_neg(t+k);
            end
        else
            sq.all{i}(k,5) = stimuli_val(t+k);
        end
    end

    //fill in equation to generate y (true value)
    //y = w0 + w1*x1 + w2*x2 + w3*x3 + w4*x4 + epsilon
    for k=1:user.trial_sequences(i)
        sq.all{i}(k,7)= sq.all{i}(k,2) + sq.all{i}(k,5)*sq.all{i}(k,3)+sq.all{i}(k,6);
    end
end

sq.all_desc = {'preceded shift', 'w0', 'relevant w', 'relevant element/colour', 'relevant x', 'noise', 'y'};//adapt later
sq.all_mat = [sq.all{1, 1} ; sq.all{1, 2}; sq.all{1, 3}; sq.all{1, 4}; sq.all{1, 5}; sq.all{1, 6}; sq.all{1, 7}; sq.all{1, 8}; sq.all{1, 9}; sq.all{1, 10}];
};

export default Sequence;
