import './wizard.css';
import * as Yup from 'yup';
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import { useForm, Controller, FieldErrors, Control } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ValidationError } from 'yup';
import {FaEye, FaEyeSlash} from "react-icons/fa";


const sanitizeMnemonic = (mnemonic: string) => {
  return mnemonic.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
};

const mnemonicValidationSchema = Yup.object({
  mnemonic: Yup.string()
    .required('Mnemonic must be exactly 12 or 24 words')
    .test('len','Wallet Mnemonic is required' , val => {
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
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  handleNext: () => Promise<void>;
  handleBack: () => void;
}

type StepComponentProps = StepProps & React.RefAttributes<StepComponentRef>;

const StepOne = forwardRef<StepComponentRef, StepComponentProps>(
  (_props, ref) => {
    const [showPassword, setShowPassword] = useState(false);
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
              render={({ field }) => (
                <div style={{ position: 'relative' }}>
                  <input
                    className="input-text"
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: -30,
                      top: '30%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              )}
            />
            {errors.mnemonic && <div className="error-message">{errors.mnemonic.message}</div>}
          </div>
          <div className="text-exp">
             You will need a Kujira wallet and its mnemonic.<br/> You can create a new wallet using wallet apps like<strong>
              <a href="https://www.keplr.app/download" target="_blank" rel="noopener noreferrer">Keplr</a>,
              <a href="https://sonar.kujira.network/" target="_blank" rel="noopener noreferrer">Sonar</a>,
              <a href="https://setup-station.terra.money/" target="_blank" rel="noopener noreferrer">Station</a>,
              <a href="https://www.leapwallet.io/download" target="_blank" rel="noopener noreferrer">Leap</a> and
              <a href="https://www.xdefi.io/" target="_blank" rel="noopener noreferrer">XDEFI Wallet</a>.
              </strong><br/>
            The mnemonic must be exactly 12 or 24 words long. following the example below: <strong className="text-white">bowl effort theory upset millennium circle husband inject credit big slim
            envelope logo fall sound much upgrade dog often other lose single nut bless</strong><br/>
            If you want to manually see if the wallet was created, go to the the homepage,  left side menu, choose "Files" and enter your credentials.<br/>
            Then go to <strong className="text-white">hummingbot/gateway/conf/wallets/kujira</strong> and check if there is a file with the name of your wallet public key from Kujira.<br/>
            You can manually add the wallet by following the instructions in the<a
            href="https://www.funttastic.com/partners/kujira" target="_blank" rel="noopener noreferrer"><strong>Hummingbot Installation Guide</strong></a>
            under the "Installation" section.<br/> Start by following the steps outlined in the "Cloning Repository" subsection.
          </div>
        </div>
      </form>
    );
  }
);

export default StepOne;
