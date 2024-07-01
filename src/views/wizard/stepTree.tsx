import React, { useImperativeHandle} from 'react';
import './wizard.css';
import {useForm, Controller, Control, FieldErrors} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Button from "@mui/material/Button";

interface StepComponentRef {
  validateStep: () => Promise<boolean> | boolean;
}
interface StepProps {
  control: Control;
  errors: FieldErrors;
  handleNext: () => Promise<void>;
  handleBack: () => void;
}

type StepComponentProps = StepProps & React.RefAttributes<StepComponentRef>

const sanitizeTelegram = (token: string) => {
  return token.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
};

const mnemonicValidationSchema = Yup.object({
  token: Yup.string()
    .required('token is required')
    .test('len', 'token must be exactly 24 words', val => val?.split(' ').length === 24),
  chatID: Yup.string()
    .required('chatID is required')
    .test('len', 'chatID must be exactly 24 words', val => val?.split(' ').length === 24),
});

const StepTree = React.forwardRef<StepComponentRef, StepComponentProps>(({ handleNext, handleBack }, ref) => {
  const {control, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(mnemonicValidationSchema),
  });

  const onSubmit = (values: any) => {
    console.log(values);
  };

  useImperativeHandle(ref, () => ({
    validateStep: () => {
      return new Promise<boolean>((resolve) => {
        handleSubmit(() => resolve(true), () => resolve(false))();
      });
    },
  }));

  return (
    <form className="wizard" onSubmit={handleSubmit(onSubmit)}>
      <div className="step-tree">
        <h5>Enter your Token</h5>
        <div className="field">
          <Controller
            name="token"
            control={control}
            render={({field}) => <input className="input-text" type="text" {...field} />}
          />
          {errors.token && <div className="error-message">{errors.token.message}</div>}
        </div>
        <div className="step-tree">
          <h5>Enter your ChatID</h5>
          <div className="field">
            <Controller
              name="chatID"
              control={control}
              render={({field}) => <input className="input-text" type="text" {...field} />}
            />
            {errors.chatID && <div className="error-message">{errors.chatID.message}</div>}
          </div>
          <div className="button-group">
            <Button variant="contained" color="primary" onClick={handleBack}>Back</Button>
            <Button variant="contained" color="primary" onClick={handleNext}>Next</Button>
          </div>
        </div>
      </div>
    </form>

  );
});

export default StepTree;
