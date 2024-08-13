import './wizard.css';
import React, { forwardRef, useImperativeHandle } from 'react';
import * as Yup from 'yup';
import { useForm, Controller, Control, FieldErrors } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { dispatch } from '@/model/state/redux/store';


interface StepComponentRef {
  validateStep: () => Promise<boolean> | boolean;
}

interface FormValues {
  mnemonic: string;
}

interface StepProps {
  control: Control<FormValues>;
  errors: FieldErrors;
  handleNext: () => Promise<void>;
  formData: FormValues;
  setFormData: React.Dispatch<React.SetStateAction<FormValues>>;
}

type StepComponentProps = StepProps & React.RefAttributes<StepComponentRef>;

const validateKeys = (mnemonic: string) => {

  const keys = mnemonic.split(' ');

  dispatch('app.updateWizard', {
    mnemonic: mnemonic,
  });
  console.log('mnemonic', mnemonic)

  return keys.length === 12 || keys.length === 24;
};

const mnemonicSanitize = (mnemonic: string) => {
  return mnemonic.replace(/[^a-z\s]/g, '').replace(/-/g, '').trim();
};

const mnemonicValidationSchema = Yup.object({
  mnemonic: Yup.string()
    .required('Mnemonic is required')
    .test('mnemonic', 'Mnemonic must be between 12 or 24 characters', validateKeys),
});

const StepOne = forwardRef<StepComponentRef, StepComponentProps>(
  ({setFormData, formData }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const { control, handleSubmit, formState: { errors } } = useForm({
      resolver: yupResolver(mnemonicValidationSchema),
      defaultValues: formData,

    });

    console.log('formData')

    useImperativeHandle(ref, () => ({
      validateStep: () => {
        return new Promise<boolean>((resolve) => {
          handleSubmit((data) => {
            const sanitizedMnemonic = mnemonicSanitize(data.mnemonic);
            setFormData({ ...data, mnemonic: sanitizedMnemonic });
            resolve(true);
          }, () => resolve(false))();
        });

      }
    }));

    return (
      <div className="wizard">
        <h4 className="a4">Enter your Mnemonic</h4>
        <div className="step-one">
          <div className="field-one">
            <Controller
              name="mnemonic"
              control={control}
              render={({field}) => (
                <div>
                  <input
                    className="input-one"
                    type={showPassword ? 'text' : 'password'}
                    {...field}
                    value={field.value || ''}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="Button-eye"
                  >
                    {showPassword ? <FaEyeSlash/> : <FaEye/>}
                  </button>
                </div>
              )}
            />
            <div className="error-message-two">
              {errors.mnemonic && <div>{errors.mnemonic.message}</div>}
            </div>

            <div className="text-one">
              You will need a Kujira wallet and its mnemonic.<br/> You can create a new wallet using wallet apps
              like<strong>
              <a href="https://www.keplr.app/download" target="_blank" rel="noopener noreferrer">Keplr</a>,
              <a href="https://sonar.kujira.network/" target="_blank" rel="noopener noreferrer">Sonar</a>,
              <a href="https://setup-station.terra.money/" target="_blank" rel="noopener noreferrer">Station</a>,
              <a href="https://www.leapwallet.io/download" target="_blank" rel="noopener noreferrer">Leap</a> and
              <a href="https://www.xdefi.io/" target="_blank" rel="noopener noreferrer">XDEFI Wallet</a>.
            </strong><br/>
              The mnemonic must be exactly 12 or 24 words long. following the example below: <strong
              className="text-white">bowl effort theory upset millennium circle husband inject credit big slim
              envelope logo fall sound much upgrade dog often other lose single nut bless</strong><br/>
              If you want to manually see if the wallet was created, go to the the homepage, left side menu, choose
              "Files" and enter your credentials.<br/><br/>
              Then go to <strong className="text-white">hummingbot/gateway/conf/wallets/kujira</strong> and check if
              there is a file with the name of your wallet public key from Kujira.<br/>
              You can manually add the wallet by following the instructions in the <a
              href="https://www.funttastic.com/partners/kujira" target="_blank" rel="noopener noreferrer"><strong>Hummingbot
              Installation Guide</strong></a>
              under the "Installation" section.<br/> Start by following the steps outlined in the "Cloning Repository"
              subsection.
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default StepOne;
