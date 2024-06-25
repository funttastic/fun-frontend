import React, {forwardRef, useImperativeHandle} from 'react';
import './wizard.css';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

interface StepComponentRef {
  validateStep: () => Promise<boolean> | boolean;
}

const mnemonicValidationSchema = Yup.object({
  mnemonic: Yup.string()
    .required('Mnemonic is required')
    .test('len', 'Mnemonic must be exactly 24 words', val => val?.split(' ').length === 24),
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
        <h4>Enter your Mnemonic</h4>
        <div className="field">
          <Controller
            name="mnemonic"
            control={control}
            render={({ field }) => <input className="input-text" type="text" {...field} />}
          />
          {errors.mnemonic && <div className="error-message">{errors.mnemonic.message}</div>}
        </div>
      </div>
    </form>
  );
});

export default StepTree;