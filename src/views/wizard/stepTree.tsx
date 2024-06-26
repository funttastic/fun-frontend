import React, {forwardRef, useImperativeHandle} from 'react';
import './wizard.css';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

interface StepComponentRef {
  validateStep: () => Promise<boolean> | boolean;
}

const mnemonicValidationSchema = Yup.object({
  token: Yup.string()
    .required('token is required')
    .test('len', 'token must be exactly 24 words', val => val?.split(' ').length === 24),
  chatID: Yup.string()
    .required('chatID is required')
    .test('len', 'chatID must be exactly 24 words', val => val?.split(' ').length === 24),
});

const StepTree = forwardRef<StepComponentRef, {}>((props, ref)  => {
  const { control, handleSubmit, formState: { errors } } = useForm({
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
      <div className="step">
        <h5>Enter your Token</h5>
        <div className="field">
          <Controller
            name="token"
            control={control}
            render={({field}) => <input className="column-field" type="text" {...field} />}
          />
          {errors.token && <div className="error-message">{errors.token.message}</div>}
        </div>
      </div>
      <div className="step">
        <h5>Enter your ChatID</h5>
        <div className="field">
          <Controller
            name="chatID"
            control={control}
            render={({field}) => <input className="column-field" type="text" {...field} />}
          />
          {errors.chatID && <div className="error-message">{errors.chatID.message}</div>}
        </div>
      </div>
    </form>
  );
});

export default StepTree;
