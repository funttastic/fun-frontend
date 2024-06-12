import React from 'react';
import { Field, ErrorMessage } from 'formik';

interface StepProps {
  next: () => void;
  prev: () => void;
}

const StepTwo: React.FC<StepProps> = ({ next, prev }) => (
  <div>
    <h2>Step 2: Email</h2>
    <div>
      <label htmlFor="email">Email</label>
      <Field name="email" type="email" />
      <ErrorMessage name="email" component="div" />
    </div>
    <button type="button" onClick={prev}>
      Previous
    </button>
    <button type="button" onClick={next}>
      Next
    </button>
  </div>
);

export default StepTwo;
