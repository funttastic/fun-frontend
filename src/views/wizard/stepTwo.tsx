import './wizard.css';
import React, {forwardRef, useImperativeHandle} from 'react';
import * as Yup from 'yup';
import {useForm, Controller, Control, FieldErrors} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

interface StepComponentRef {
  validateStep: () => Promise<boolean> | boolean;
}

interface StepProps {
  control: Control;
  errors: FieldErrors;
  handleNext: () => Promise<void>;
  handleBack: () => void;
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
    .required('At least one API key is required')
    .test('validateKeys', 'Each key must be between 16 and 64 characters', validateKeys),
});

const StepTwo = forwardRef<StepComponentRef, StepComponentProps>(
  (_props, ref) => {
    const {control, handleSubmit, setValue, formState: {errors}} = useForm({
      resolver: yupResolver(apiKeyValidationSchema),
    });

    const onSubmit = (values: any) => {
      console.log(values);
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
        <div className="step">
          <div className="field">
            <Controller
              name="apiKeys"
              control={control}
              render={({field}) => (
                <textarea className="input-key" {...field} onInput={handleInput}/>
              )}
            />
            {errors.apiKeys && <div className="error-message">{errors.apiKeys.message}</div>}
          </div>
          <div className="text-exp">
            <p>
              You will need a CoinGecko API key so the trading bot can obtain up-to-date
              information about tokens and markets, including current prices.
              Enter one or more (separated by a comma) CoinGecko key following the example below:</p>
            <p className="text-white">CG-5MyDSj3ENddNA4juzHhgTvDF, CG-NmtXFGbM5oxPSuVarBFhUiGt, ...</p>

            <p>If you don't have a CoinGecko key, you can create a demo or real account and generate your key by
              following the instructions in the <br/>
              <a
                href="https://support.coingecko.com/hc/en-us/articles/21880397454233-User-Guide-How-to-sign-up-for-CoinGecko-Demo-API-and-generate-an-API-key"
                target="_blank">
                CoinGecko API Key
              </a></p>
          </div>
        </div>
      </form>
    );
  }
);

export default StepTwo;
