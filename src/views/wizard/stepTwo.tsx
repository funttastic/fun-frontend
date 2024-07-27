import './wizard.css';
import React, {forwardRef, useImperativeHandle} from 'react';
import * as Yup from 'yup';
import {useForm, Controller, Control, FieldErrors} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {FaEye, FaEyeSlash} from "react-icons/fa";

interface StepComponentRef {
  validateStep: () => Promise<boolean> | boolean;
}
interface FormValues {
    apiKeys: string;
}

interface StepProps {
  control: Control;
  errors: FieldErrors;
  handleNext: () => Promise<void>;
  handleBack: () => void;
  formData: FormValues;
  setFormData: React.Dispatch<React.SetStateAction<FormValues>>;
}

type StepComponentProps = StepProps & React.RefAttributes<StepComponentRef>;

const validateKeys = (val: string) => {
  if (!val) return false;
  const keys = val.split(' ');
  if (keys.length < 1) return false;

  return keys.every(key => key.length >= 16 && key.length <= 64);
};

const sanitizeApiKey = (apiKeys: string) => {
  return apiKeys.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
};

const apiKeyValidationSchema = Yup.object({
  apiKeys: Yup.string()
    .required('At least one CoinGecko API key is required')
    .test('validateKeys', 'Each key must be between 16 and 64 characters', validateKeys),
});

const StepTwo = forwardRef<StepComponentRef, StepComponentProps>(
  ({formData, setFormData, handleNext, handleBack}, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const {control, handleSubmit, setValue, formState: {errors}} = useForm({
      resolver: yupResolver(apiKeyValidationSchema),
    });

    const onSubmit = (values: FormValues) => {
      setFormData(values);
      handleNext();
      console.log(values);
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const sanitizedValue = sanitizeApiKey(e.target.value);
      setValue('apiKeys', sanitizedValue);
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
        <h4 className="a4">Enter Your CoinGecko API Key(s)</h4>
        <div className="step-two">
          <div className="field-two">
            <Controller
              name="apiKeys"
              control={control}
              render={({field}) => (
                <div>
                  <input className="input-two" type={showPassword ? 'text' : 'password'} {...field} onInput={handleInput}/>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: 350,
                      top: '55%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {showPassword ? <FaEyeSlash/> : <FaEye/>}
                  </button>
                </div>
              )}
            />
            <div className="error-message-two">
              {errors.apiKeys && <div>{errors.apiKeys.message}</div>}
            </div>

            <div className="text-two">
              You will need a CoinGecko API key so the trading bot can obtain up-to-date
              information about tokens and markets, including current prices.
              Enter one or more (separated by a comma) CoinGecko key following the example below: <strong
              className="text-white">CG-5MyDSj3ENddNA4juzHhgTvDF, CG-NmtXFGbM5oxPSuVarBFhUiGt, ...</strong><br/>
              If you don't have a CoinGecko key, you can create a demo or real account and generate your key by
              following the instructions in the
              <a
                href="https://support.coingecko.com/hc/en-us/articles/21880397454233-User-Guide-How-to-sign-up-for-CoinGecko-Demo-API-and-generate-an-API-key"
                target="_blank" rel="noopener noreferrer">
                <strong>User Guide CoinGecko Key.</strong></a>
            </div>
          </div>
        </div>
      </form>
  )
  ;
  }
  );

  export default StepTwo;