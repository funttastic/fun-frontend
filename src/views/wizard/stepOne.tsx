import './wizard.css';
import * as Yup from 'yup';
import React, { forwardRef, useImperativeHandle } from 'react';
import { useForm, Controller, FieldErrors, Control } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ValidationError } from 'yup';


const sanitizeMnemonic = (mnemonic: string) => {
  return mnemonic.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
};

const mnemonicValidationSchema = Yup.object({
  mnemonic: Yup.string()
    .required('Mnemonic is required')
    .test('len', 'Mnemonic must be exactly 12 or 24 words', val => {
      const length = val?.split(' ').length;
      return length === 12 || length === 24;
    }),
});

interface StepComponentRef {
  validateStep: () => Promise<boolean>;
}

interface StepProps {
  control: Control;
  errors: FieldErrors;
  handleNext: () => Promise<void>;
  handleBack: () => void;
}

type StepComponentProps = StepProps & React.RefAttributes<StepComponentRef>;

const StepOne = forwardRef<StepComponentRef, StepComponentProps>(
  (props, ref) => {
    const { control, handleSubmit, formState: { errors }, getValues, setError, setValue } = useForm({
      resolver: yupResolver(mnemonicValidationSchema),
    });

    useImperativeHandle(ref, () => ({
      validateStep: async () => {
        let values = getValues();
        values.mnemonic = sanitizeMnemonic(values.mnemonic);
        setValue('mnemonic', values.mnemonic);
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
      data.mnemonic = sanitizeMnemonic(data.mnemonic);
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
              render={({ field }) => <input className="input-text" type="password" {...field} />}
            />
            {errors.mnemonic && <div className="error-message">{errors.mnemonic.message}</div>}
          </div>
          <div className="text-exp">
            <p>The mnemonic must be exactly 12 or 24 words long. following the example below: <br/></p>
            <p className="text-white">bowl effort theory upset millennium circle husband inject credit big slim envelope logo fall sound much upgrade dog often other lose single nut bless</p>
          </div>
        </div>
      </form>
    );
  }
);

export default StepOne;
