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
    .required('Mnemonic must be exactly 12 or 24 words')
    .test('len','Mnemonic is required' , val => {
      const length = val?.split(' ').length;
      return length === 12 || length === 24;
    }),
});

interface FormValues {
  mnemonic: string;
}

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
  (_props, ref) => {
    const {control, handleSubmit, formState: {errors}, getValues, setError, setValue} = useForm({
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

    const onSubmit = (data: FormValues) => {
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
              defaultValue=""
              control={control}
              render={({ field }) => <input className="input-text" type="text" {...field} />}
            />
            {errors.mnemonic && <div className="error-message">{errors.mnemonic.message}</div>}
          </div>
          <div className="text-exp">
            <p> You will need a Kujira wallet and its mnemonic. You can create a new wallet using wallet apps like:<br/>
              <strong>
              <a href="https://www.keplr.app/download" target="_blank" rel="noopener noreferrer">Keplr</a>,
              <a href="https://sonar.kujira.network/" target="_blank" rel="noopener noreferrer">Sonar</a>,
              <a href="https://setup-station.terra.money/" target="_blank" rel="noopener noreferrer">Station</a>,
              <a href="https://www.leapwallet.io/download" target="_blank" rel="noopener noreferrer">Leap</a> and
              <a href="https://www.xdefi.io/" target="_blank" rel="noopener noreferrer">XDEFI Wallet</a>.
              </strong></p>
            The mnemonic must be exactly 12 or 24 words long. following the example below:
            <p className="text-white"> <strong>bowl effort theory upset millennium circle husband inject credit big slim
              envelope
              logo fall sound much upgrade dog often other lose single nut bless</strong></p>
            You can "Add Wallet" on the homepage and navigate to the Frontend's left side menu,
            Choose "Files" and enter your username and password.
            In Hummingbot Gateway, each added wallet will have a corresponding .json file located in the directory:
             <p className="text-white"><strong>hummingbot/gateway/conf/wallets/kujira</strong></p>
            You can manually add the wallet by following the instructions in the<a
            href="https://www.funttastic.com/partners/kujira" target="_blank" rel="noopener noreferrer"><strong>Hummingbot Installation Guide</strong></a>
            under the "Installation" section. Start by following the steps outlined in the "Cloning Repository" subsection.
          </div>
        </div>
      </form>
    );
  }
);

export default StepOne;
