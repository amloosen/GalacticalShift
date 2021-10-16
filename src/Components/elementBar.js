import React from "react";
import { Spring } from "react-spring";
import barstyles from "./style/barstyles.css";

const ElementBar = ({ progress }) => {
  return (
    <Spring from={{ percent: 0 }} to={{ percent: progress }}>
      {({ percent }) => (
        <div class="progress vertical">
          <div style={{ height: `${progress}%` }} className="progress-bar">
          <p className="text-danger">
            <span className="sr-only">{`${progress}%`}</span>
            </p>
          </div>
        </div>

      )}
    </Spring>
  );
};

export default ElementBar;
