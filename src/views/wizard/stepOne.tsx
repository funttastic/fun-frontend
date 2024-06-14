import React from 'react';
import './wizard.css'
import { Field, ErrorMessage } from 'formik';

interface StepProps {
  next: () => void;
}

const StepOne: React.FC<StepProps> = ({ next }) => (
  <div className="wizard">
    <div className="step">
      <h2>Enter your Mnemonic</h2>
      <div className="field" >
        <label htmlFor="text">Mnemonic :</label>
        <Field className="input-text" name="mnemonic" type="text" />
        <ErrorMessage name="mnemonic" component="div" />
      </div>
      <button className="button" type="button" onClick={next}>
        <p className="button-text">Next</p>
      </button>
    </div>

  </div>
);

export default StepOne;
