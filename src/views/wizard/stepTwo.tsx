import React from 'react';
import './wizard.css'
import { Field, ErrorMessage } from 'formik';

interface StepProps {
  next: () => void;
  prev: () => void;
}

const StepTwo: React.FC<StepProps> = ({ next, prev }) => (
  <div className="wizard">
    <div>
      <h2>Step 2: Email</h2>
      <div className="field">
        <label htmlFor="email">Email:</label>
        <Field className="input-text"  name="email" type="email"/>
        <ErrorMessage name="email" component="div"/>
      </div>
      <div>
        <button className="button" type="button" onClick={next}>
          <p className="button-text">Next</p>
        </button>
      </div>
      <div>
        <button className="button-prev" type="button" onClick={prev}>
          Previous
        </button>
      </div>
    </div>

  </div>
);

export default StepTwo;
