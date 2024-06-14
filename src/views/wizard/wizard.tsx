import React, { useState, ReactNode } from 'react';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import StepOne from './stepOne';
import StepTwo from './stepTwo';
import StepTree from './stepTree';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



interface FormValues {
  name: string;
  email: string;
  password: string;
}

const Wizard: React.FC = () => {
  const [step, setStep] = useState(0);

  const initialValues: FormValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchemas = [
    Yup.object({
      name: Yup.string().required('Required'),
    }),
    Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    Yup.object({
      password: Yup.string().required('Required'),
    }),
  ];

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const steps: ReactNode[] = [
    <StepOne next={nextStep} key="step1" />,
    <StepTwo next={nextStep} prev={prevStep} key="step2" />,
    <StepTree prev={prevStep} key="step3" />,
  ];

  const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
    if (step === steps.length - 1) {
      toast.success('Wizard completed!', {
        autoClose: 3000,
        position: "top-right",
        style: {
          minHeight: '20px',
          height: 'auto',
          borderRadius: '5px',
        }
      });
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
        <Form>{steps[step]}</Form>
      </Formik>
    </div>

  );
};

export default Wizard;
