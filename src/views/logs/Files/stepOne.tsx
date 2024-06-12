import React from 'react';
import { Field, ErrorMessage } from 'formik';

interface StepProps {
  next: () => void;
}

const StepOne: React.FC<StepProps> = ({ next }) => (
  <div>
    <h2>Step 1: Name</h2>
    <div>
      <label htmlFor="name">Name</label>
      <Field name="name" type="text" />
      <ErrorMessage name="name" component="div" />
    </div>
    <button type="button" onClick={next}>
      Next
    </button>
  </div>
);

export default StepOne;
