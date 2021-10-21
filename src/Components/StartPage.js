import React from "react";
import { withRouter } from "react-router-dom";
import * as Consent from "survey-react";
import { API_URL } from "../config";
import { handleResponse } from "./helpers";
import "../../node_modules/survey-react/survey.css";
// import queryString from "query-string"; // I need this for prolific
import "./style/startStyle.css";
////////////////////////////////////////////////////////////////////////////////
//import images used to increase the loading time
//SliderIntro
import img_spacebar from "./intro/spacebar.png";
import img_up from "./intro/up.png";
import img_down from "./intro/down.png";
import img_left from "./intro/left.png";
import img_right from "./intro/right.png";
import img_slider1 from "./intro/SliderExamplePicture1.png";
import img_slider2 from "./intro/SliderExamplePoint.png";
import img_slider3 from "./intro/SliderExampleLine.png";
import img_slider4 from "./intro/SliderExamplePicture2.png";
import img_slider5 from "./intro/SliderExamplePicture3.png";
import img_slider6 from "./intro/SliderExamplePicture4.png";
import img_slider7 from "./intro/SliderExamplePicture5.png";
//TrainingIntroA
import img_intro1 from "./intro/ExamplePicture1.jpg";
import img_left from "./intro/left.png";
import img_right from "./intro/right.png";
//TrainingIntroC
import img_intro1 from "./intro/ExamplePicture1.jpg";
import img_bar from "./intro/bar.png";
//MAIN
import img_indicat1 from "./intro/indicat1.png";
import img_indicat2 from "./intro/indicat2.png";
import img_indicat3 from "./intro/indicat3.png";
//stimuli
import Cover from "./img/cover.jpg";
import Blue from "./img/stimuli3_blue.jpg";
import Red from "./img/stimuli3_red.jpg";
// import Green from "./img/stimuli3_green.jpg";
import Yellow from "./img/stimuli3_yellow.jpg";
////////////////////////////////////////////////////////////////////////////////
//assign pictures to variables
var sliderTraining = [
  img_spacebar,
  img_up,
  img_down,
  img_left,
  img_right,
  img_slider1,
  img_slider2,
  img_slider3,
  img_slider4,
  img_slider5,
  img_slider6,
  img_slider7,
];

var trainingA = [
  img_intro1,
  img_left,
  img_right,
  Cover,
  Blue
];

var trainingB = [
  Cover,
  Blue,
  Red,
  Yellow
];

var trainingC = [
  img_intro1,
  img_left,
  img_bar,
  Cover,
  Blue,
  Red,
  Yellow
];

var mainTask = [
  img_indicat1,
  img_indicat2,
  img_indicat2,
  Cover,
  Blue,
  Red,
  Yellow
];

////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
class StartPage extends React.Component {
  constructor(props) {
    super(props);
/// process images
    [sliderTraining].forEach((image) => {
      new Image().src = image;
    });
    [trainingA].forEach((image) => {
      new Image().src = image;
    });
    [trainingB].forEach((image) => {
      new Image().src = image;
    });
    [trainingC].forEach((image) => {
      new Image().src = image;
    });
    [mainTask].forEach((image) => {
      new Image().src = image;
    });

    // Get data and time
    var dateAndTime = new Date().toLocaleString();

    var currentDate = new Date(); // maybe change to local
    var timeString = currentDate.toTimeString();

    var date = currentDate.getDate();
    var month = currentDate.getMonth(); //Be careful! January is 0 not 1
    var year = currentDate.getFullYear();
    var dateString = date + "-" + (month + 1) + "-" + year;

    // Gen a random 6 digit number for now
    var prolific_id = Math.floor(100000 + Math.random() * 900000);
    // var prolific_id = 120000; //for testing

    // Set state
    this.state = {
      userID: prolific_id,
      date: dateString,
      dateAndTime: dateAndTime,
      startTime: timeString,
      consentComplete: 0,
      study_part: 0,
      ///
      sliderTraining: sliderTraining,
      trainingA: trainingA,
      trainingB: trainingB,
      trainingC: trainingC,
      mainTask: mainTask
    };

    this.redirectToTarget = this.redirectToTarget.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    var introPic = this.state.introPic;

    [introPic].forEach((image) => {
      new Image().src = image;
    });
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  redirectToTarget() {
    let body = {
      startTime: this.state.startTime,
      dateAndTime: this.state.dateAndTime,
    };

    fetch(
      `${API_URL}/start_info/create/` +
        this.state.userID +
        `/` +
        this.state.study_part,
      {
        //eigentlich auch in den body beim ersten mal
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    this.setState({
      consentComplete: 1,
    });

    this.props.history.push({
      pathname: `/SliderIntro`,
      state: {
        userID: this.state.userID,
        date: this.state.date,
        startTime: this.state.startTime,
        //
        sliderTraining: this.state.sliderTraining,
        trainingA: this.state.trainingA,
        trainingB: this.state.trainingB,
        trainingC: this.state.trainingC,
        mainTask: this.state.mainTask
      },
    });
  }

  render() {
    // var consentstyle = Consent.StylesManager.applyTheme('default');
    let defaultThemeColors = Consent.StylesManager.ThemeColors["default"];

    // Change the main color
    defaultThemeColors["$main-color"] = "#363868";
    defaultThemeColors["$sv_complete_btn"] = "#8c94b4";
    // Apply your changes
    Consent.StylesManager.applyTheme();
    // Full consent, non-NHS version
    var json1 = {
      title: null,
      pages: [
        {
          questions: [
            {
              type: "html",
              name: "info",
              html: "<b>Who is conducting this research study?</b>",
            },

            {
              type: "html",
              name: "info",
              html:
                "<p>This research is being conducted by the Wellcome Centre for Human Neuroimaging and the Max Planck UCL Centre for Computational Psychiatry and Ageing Research. The lead researchers for this project are Alisa Loosen, MSc, (PhD Candidate, a.loosen.17@ucl.ac.uk) and Tobias Hauser, Dr, (Principal Investigator, t.hauser@ucl.ac.uk). This study has been approved by the UCL Research Ethics Committee (project ID number 15301&#92;001) and funded by the Wellcome Trust.</p>",
            },

            {
              type: "html",
              name: "info",
              html: "<b>What is the purpose of this study?</b>",
            },

            {
              type: "html",
              name: "info",
              html:
                "<p> We are interested in how the adult brain controls learning and decision-making. This research aims to provide insights into how the healthy brain works to help us understand the causes of a number of different medical conditions.</p>",
            },

            {
              type: "html",
              name: "info",
              html: "<b>Who can participate in the study?</b>",
            },

            {
              type: "html",
              name: "info",
              html:
                "<p><ul><li>Adults aged above the age of <strong>18</strong></li><li>Fluent in English</li><li>Normal or corrected-to-normal vision</li></ul>If you take part in this study, you confirm that you meet the eligibity criteria.</p>",
            },

            {
              type: "html",
              name: "info",
              html: "<b>What will happen to me if I take part?</b>",
            },

            {
              type: "html",
              name: "info",
              html:
                "<p>You will play one or more online computer tasks, which will last around approximately <strong>1 hour</strong>. <br/><br/>You will also be asked some questions about yourself, your feelings, background, attitudes and behaviour in your everyday life. <br/><br/>You will receive <strong>8.25 GBP</strong> for helping us.<br/>Plus, depending on your performance you can earn an <strong>additional bonus</strong> of up to <strong>1 GBP</strong>. <br/><br/>Remember, you are free to withdraw at any time without giving a reason.</p>",
            },

            {
              type: "html",
              name: "info",
              html:
                "<b>What are the possible disadvantages and risks of taking part?</b>",
            },

            {
              type: "html",
              name: "info",
              html:
                "<p> The task you complete does not pose any known risks. You will be asked to answer some questions about your mood and feelings, and we will provide information about ways to seek help should you feel affected by the issues raised by these questions.</p>",
            },

            {
              type: "html",
              name: "info",
              html: "<b>What are the possible benefits of taking part?</b>",
            },

            {
              type: "html",
              name: "info",
              html:
                "<p>While there are no immediate benefits to taking part, your participation in this research will help us understand how people make decisions and this could have benefits for our understanding of mental health problems. </p>",
            },

            { type: "html", name: "info", html: "<b>Complaints</b>" },

            {
              type: "html",
              name: "info",
              html:
                "<p>If you wish to complain or have any concerns about any aspect of the way you have been approached or treated by members of staff, then the research UCL complaints mechanisms are available to you. In the first instance, please talk to the researcher or the chief investigator (Dr Tobias Hauser, t.hauser@ucl.ac.uk) about your complaint. If you feel that the complaint has not been resolved satisfactorily, please contact the chair of the UCL Research Ethics Committee (ethics@ucl.ac.uk). <br/><br/>If you are concerned about how your personal data are being processed please contact the data controller who is UCL: data-protection@ucl.ac.uk. If you remain unsatisfied, you may wish to contact the Information Commissioner’s Office (ICO). Contact details, and details of data subject rights, are available on the ICO website <a href='https://ico.org.uk/for-organisations/data-protection-reform/overview-of-the-gdpr/individuals-rights' target='_blank'>here</a>. (opens in new tab) </p>",
            },

            {
              type: "html",
              name: "info",
              html: "<b>What about my data?</b>",
            },

            {
              type: "html",
              name: "info",
              html:
                "<p>This ‘local’ privacy notice sets out the information that applies to this particular study. Further information on how UCL uses participant information can be found in our ‘general’ privacy notice:<br/><br/>For participants in research studies, click <a href='https://www.ucl.ac.uk/legal-services/sites/legal-services/files/ucl_general_research_participant_privacy_notice_v1.pdf' target='_blank'>here</a>. (opens in new tab)<br/><br/>The information that is required to be provided to participants under data protection legislation (GDPR and DPA 2018) is provided across both the ‘local’ and ‘general’ privacy notices.<br/><br/>To help future research and make the best use of the research data you have given us (such as answers to questionnaires) we may keep your research data indefinitely and share these. The data we collect will be shared and held as follows:<ul><li> In publications, your data will be anonymised, so you cannot be identified. </li><li> In public databases, your data will be anonymised. </li><li>We do not collect any personal data that could be used to identify you. </li><li> Personal data is any information that could be used to identify you, such as your User ID. When we collect your data, your User ID will be replaced with a nonidentifiable random ID number. No personally identifying data will be stored.</li></ul>The legal basis used to process your personal data will be the provision of public task (this means that the research you are taking part in is deemed to be in the public interest). The legal basis used to process special category data (i.e. ethnicity) will be for scientific research purposes. We will follow the UCL and legal guidelines to safeguard your data. If you change your mind and withdraw your consent to participate in this study you can contact us via Prolific. However, we collect all data in an anonymised form, which is why this data cannot be destroyed, withdrawn or recalled. <br/><br/>If there are any queries or concerns please do not hesitate to contact Ms Alisa Loosen (a.loosen.17@ucl.ac.uk).</p>",
            },
          ],
        },
        {
          questions: [
            {
              type: "checkbox",
              name: "checkbox1",
              title:
                "I have read the information above, and understand what the study involves.",
              isRequired: true,
              choices: ["Yes"],
            },

            {
              type: "checkbox",
              name: "checkbox2",
              title:
                "I consent to the processing of my personal information (e.g. User ID) for the purposes of this research study. I understand that such information will remain confidential and will be handled in accordance with all applicable data protection legislation and ethical standards in research. These data will only be accessible to the study team and individuals from the University and Funder who are responsible for monitoring and audits.",
              isRequired: true,
              choices: ["Yes"],
            },

            {
              type: "checkbox",
              name: "checkbox3",
              title:
                "I understand that my anonymised personal data can be shared with others for future research, shared in public databases and in scientific reports.",
              isRequired: true,
              choices: ["Yes"],
            },

            {
              type: "checkbox",
              name: "checkbox4",
              title:
                "I understand that I am free to withdraw from this study at any time without giving a reason and this will not affect my future medical care or legal rights.",
              isRequired: true,
              choices: ["Yes"],
            },

            {
              type: "checkbox",
              name: "checkbox5",
              title:
                "I understand the potential benefits and risks of participating, the support available to me should I become distressed during the research, and who to contact if I wish to lodge a complaint.",
              isRequired: true,
              choices: ["Yes"],
            },

            {
              type: "checkbox",
              name: "checkbox6",
              title:
                "I understand the inclusion and exclusion criteria in the Information Sheet and as explained to me by the researcher. I confirm that I do not fall under the exclusion criteria.",
              isRequired: true,
              choices: ["Yes"],
            },

            {
              type: "checkbox",
              name: "checkbox7",
              title:
                "I agree that the research project named above has been explained to me to my satisfaction and I agree to take part in this study.",
              isRequired: true,
              choices: ["Yes"],
            },
          ],
        },
      ],
    };

    if (this.state.consentComplete === 0) {
      return (
        <div className="placeMiddle">
          <div className="placeMiddleHeader">
            INFORMATION FOR THE PARTICIPANT
          </div>
          <br />
          Please read this information page carefully. If you are happy to
          proceed, please check the boxes on the second page of this form to
          consent to this study proceeding. Please note that you cannot proceed
          to the study unless you give your full consent.
          <br />
          <br />
          <div className="surveyElement">
            <Consent.Survey
              json={json1}
              showCompletedPage={false}
              onComplete={this.redirectToTarget}
            />
          </div>
        </div>
      );
    } else {
      // this.redirectToTarget();
      console.log("ERROR This should have given consent.");
      return null;
    }
  }
}

export default withRouter(StartPage);
