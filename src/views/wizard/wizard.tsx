import React, { useState, ReactNode } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import StepOne from './stepOne';
import StepTwo from './stepTwo';
import StepThree from './stepTree';

interface FormValues {
  mnemonic: string;
  email: string;
  password: string;
}

const Wizard: React.FC = () => {
  const [step, setStep] = useState(0);

  const initialValues: FormValues = {
    mnemonic: '',
    email: '',
    password: '',
  };

  const validationSchemas = [
    Yup.object({
      mnemonic: Yup.string().required('Mnemonic is required'),
    }),
    Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    Yup.object({
      password: Yup.string().required('Password is required'),
    }),
  ];

  const nextStep = () => {
    setStep(prevStep => Math.min(prevStep + 1, steps.length - 1));
  };

  const prevStep = () => setStep(prevStep => Math.max(prevStep - 1, 0));

  const steps: ReactNode[] = [
    <StepOne next={nextStep} key="step1" />,
    <StepTwo next={nextStep} prev={prevStep} key="step2" />,
    <StepThree prev={prevStep} key="step3" />,
  ];

  const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    if (step === steps.length - 1) {
      alert('Wizard completed!');
      console.log('Form Values:', values);
      actions.setSubmitting(false);
    } else {
      nextStep();
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchemas[step]}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {steps[step]}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Wizard;
