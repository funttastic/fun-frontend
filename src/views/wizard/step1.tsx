import './wizard.css';
import * as Yup from 'yup';
import Box from "@mui/material/Box";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import {dispatch} from '@/model/state/redux/store';
import {yupResolver} from '@hookform/resolvers/yup';
import React, {forwardRef, useImperativeHandle} from 'react';
import {useForm, Controller, Control, FieldErrors} from 'react-hook-form';



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
  ({setFormData, formData}, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const {control, handleSubmit, formState: {errors}} = useForm({
      resolver: yupResolver(mnemonicValidationSchema),
      defaultValues: formData,

    });

    console.log('formData')

    useImperativeHandle(ref, () => ({
      validateStep: () => {
        return new Promise<boolean>((resolve) => {
          handleSubmit((data) => {
            const sanitizedMnemonic = mnemonicSanitize(data.mnemonic);
            setFormData({...data, mnemonic: sanitizedMnemonic});
            resolve(true);
          }, () => resolve(false))();
        });

      }
    }));

    return (
      <Box className="wizard-one grid gap-8 max-w-md mx-auto overflow-hidden md:grid-cols-10 md:items-center md:text-left">
        <h4 className="h4-one text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4">Enter your Mnemonic</h4>
        <Box className="step-one md:flex flex-col md:flex-row md:space-x-4">
          <Box className="field-one flex-1 mb-4 md:mb-0">
            <Controller
              name="mnemonic"
              control={control}
              render={({ field }) => (
                <Box className="relative">
                  <input
                    className="input-one h-12 px-4 py-2 text-sm sm:text-base md:text-lg lg:text-xl rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                    type={showPassword ? 'text' : 'password'}
                    {...field}
                    value={field.value || ''}
                  />
                  <button
                    className="Button-eye absolute inset-y-0 right-3 flex items-center text-gray-600"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </Box>
              )}
            />
            <div className="error-message-two text-red-500 mt-2 text-xs sm:text-sm md:text-base">
              {errors.mnemonic && <div>{errors.mnemonic.message}</div>}
            </div>
          </Box>

          <div className="text-one text-sm sm:text-base md:text-lg lg:text-xl mt-4 md:mt-0 md:ml-4 leading-relaxed">
            You will need a Kujira wallet and its mnemonic.<br />
            You can create a new wallet using wallet apps like
            <strong>
              <a href="https://www.keplr.app/download" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Keplr
              </a>,
              <a href="https://sonar.kujira.network/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Sonar
              </a>,
              <a href="https://setup-station.terra.money/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Station
              </a>,
              <a href="https://www.leapwallet.io/download" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                Leap
              </a> and
              <a href="https://www.xdefi.io/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                XDEFI Wallet
              </a>.
            </strong><br />
            The mnemonic must be exactly 12 or 24 words long, following the example below:
            <strong className="text-white">
              bowl effort theory upset millennium circle husband inject credit big slim envelope logo fall sound much upgrade dog often other lose single nut bless
            </strong><br />
            If you want to manually see if the wallet was created, go to the homepage, left side menu, choose "Files" and enter your credentials.<br /><br />
            Then go to <strong className="text-white">hummingbot/gateway/conf/wallets/kujira</strong> and check if there is a file with the name of your wallet public key from Kujira.<br />
            You can manually add the wallet by following the instructions in the
            <a href="https://www.funttastic.com/partners/kujira" target="_blank" rel="noopener noreferrer">
              <strong>Hummingbot Installation Guide</strong>
            </a>
            under the "Installation" section.<br />
            Start by following the steps outlined in the "Cloning Repository" subsection.
          </div>
        </Box>
      </Box>
    );
  });

export default StepOne;