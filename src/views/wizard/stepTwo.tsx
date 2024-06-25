import './wizard.css';
import React, { forwardRef, useImperativeHandle } from 'react';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface StepComponentRef {
  validateStep: () => Promise<boolean> | boolean;
}

const validateKeys = (val: string) => {
  if (!val) return false;
  const keys = val.split(' ');
  if (keys.length < 1) return false;

  return keys.every(key => key.length >= 16 && key.length <= 64);
};

const apiKeyValidationSchema = Yup.object({
  apiKeys: Yup.string()
    .required('At least one API key is required')
    .test('validateKeys', 'Each key must be between 16 and 64 characters', validateKeys),
});

const StepTwo = forwardRef<StepComponentRef, {}>((props, ref) => {
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(apiKeyValidationSchema),
  });

  const onSubmit = (values: any) => {
    console.log(values);
  };

  const handleInput = (e: any) => {
    e.target.style.height = 'auto';
    const scrollHeight = e.target.scrollHeight;
    const maxHeight = parseInt(getComputedStyle(e.target).maxHeight);
    e.target.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
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
        <h4>Please Enter Your CoinGecko Key(s)</h4>
        <div className="field">
          <Controller
            name="apiKeys"
            control={control}
            render={({ field }) => (
              <textarea
                className="input-key"
                {...field}
                onInput={handleInput}
              />
            )}
          />
          {errors.apiKeys && <div className="error-message">{errors.apiKeys.message}</div>}
        </div>
        <div className="text-exp">
          <p>Enter one or more coingecko key (separated by a comma) following the example below:
            <br/>

            "  two or more: ("CG-5MyDSj3ENddNA4juzHhgTvDF", "CG-NmtXFGbM5oxPSuVarBFhUiGt", ...) "
          </p>
        </div>
      </div>
    </form>
  );
});

export default StepTwo;