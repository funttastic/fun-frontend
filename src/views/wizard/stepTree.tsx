import React from 'react';
import './wizard.css';
import { Field, ErrorMessage } from 'formik';

interface StepProps {
  prev: () => void;
}

const StepThree: React.FC<StepProps> = ({ prev }) => (
  <div className="wizard">
    <div>
      <h2>Step 3: Password</h2>
      <div className="field">
        <label htmlFor="password">Password:</label>
        <Field className="input-text" name="password" type="password" />
        <ErrorMessage name="password" component="div" />
      </div>
      <div>
        <button className="button-prev" type="button" onClick={prev}>
          <p className="button-text">Previous</p>
        </button>
      </div>
      <div>
        <button className="button" type="submit">
          <p className="button-text">Finish</p>
        </button>
      </div>
    </div>
  </div>
);

export default StepThree;
