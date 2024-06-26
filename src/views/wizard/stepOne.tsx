import './wizard.css';
import * as Yup from 'yup';
import React, { forwardRef, useImperativeHandle } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ValidationError } from 'yup';

const mnemonicValidationSchema = Yup.object({
  mnemonic: Yup.string()
    .required('Mnemonic is required')
    .test('len', 'Mnemonic must be exactly 12 or 24 words', val => {
      const length = val?.split(' ').length;
      return length === 12 || length === 24;
    }),
});

const StepOne = forwardRef((props, ref) => {
  const { control, handleSubmit, formState: { errors }, getValues, setError } = useForm({
    resolver: yupResolver(mnemonicValidationSchema),
  });

  useImperativeHandle(ref, () => ({
    validateStep: async () => {
      const values = getValues();
      try {
        await mnemonicValidationSchema.validate(values, { abortEarly: false });
        return true;
      } catch (error) {
        if (error instanceof ValidationError && error.inner) {
          error.inner.forEach(validationError => {
            setError(validationError.path as keyof typeof values, { message: validationError.message });
          });
        }
        return false;
      }
    }
  }));

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form className="wizard" onSubmit={handleSubmit(onSubmit)}>
      <div className="step">
        <h4>Enter your Mnemonic</h4>
        <div className="field">
          <Controller
            name="mnemonic"
            control={control}
            render={({field}) => <input className="input-text" type="password" {...field} />}
          />
          {errors.mnemonic && <div className="error-message">{errors.mnemonic.message}</div>}
        </div>
        <div className="text-exp">
          <p>The mnemonic must be between twelve and twenty four words long. following the example below: <br/></p>
              <p className="text-white"> " bowl effort theory upset millennium <br/> circle husband inject credit big slim <br/> envelope logo fall sound much upgrade <br/>dog often other lose single nut bless "</p>

        </div>
      </div>
    </form>
  );
});

export default StepOne;
