import React from 'react';
import { Field, ErrorMessage } from 'formik';


interface StepProps {
  prev: () => void;
}

const StepTree: React.FC<StepProps> = ({ prev }) => (
  <div>
    <h2>Step 3: Password</h2>
    <div>
      <label htmlFor="password">Password</label>
      <Field name="password" type="password" />
      <ErrorMessage name="password" component="div" />
    </div>
    <button type="button" onClick={prev}>
      Previous
    </button>
    <button type="submit">Finish</button>
  </div>
);

export default StepTree;
