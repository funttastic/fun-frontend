import './wizard.css';
import * as Yup from 'yup';
import React, { forwardRef, useImperativeHandle } from 'react';
import { useForm, Controller, FieldErrors, Control } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ValidationError } from 'yup';

interface FormValues {
    market: string;
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

const sanitizeMarket = (market: string) => {
  return market.replace(/[^/-a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
};

const marketValidationSchema = Yup.object({
  market: Yup.string()
    .required('market is required')
});

type StepComponentProps = StepProps & React.RefAttributes<StepComponentRef>;

const StepFive = forwardRef<StepComponentRef, StepComponentProps>(
  (_props, ref) => {
    const {control, handleSubmit, formState: {errors}, getValues, setError, setValue} = useForm({
      resolver: yupResolver(marketValidationSchema),
    });

    useImperativeHandle(ref, () => ({
      validateStep: async () => {
        let values = getValues();
        values.market = sanitizeMarket(values.market);
        setValue('market', values.market);
        try {
          await marketValidationSchema.validate(values, { abortEarly: false });
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
      data.market = sanitizeMarket(data.market);
      console.log(data);
    };

    return (
      <form className="wizard" onSubmit={handleSubmit(onSubmit)}>
        <div className="step">
          <h4>Enter your market and Crypto</h4>
          <div className="field">
            <Controller
              name="market"
              control={control}
              render={({ field }) => <input className="input-Five" type="text" {...field} />}
            />
            {errors.market && <div className="error-message">{errors.market.message}</div>}
          </div>
          <div className="text-exp">
          <p>
            You must define the market in which this worker will operate.
           <br/> In this example, the <span style={{color: 'white'}}>KUJI/USK</span> market is specified.<br/> The markets available for trading will be those accessible on both the mainnet and testnet on 'Kujira's FIN, found at <a href="https://fin.kujira.network/" target="_blank">Kujira Network</a>.
           <br/> The naming pattern typically consists of two symbols written in capital letters, separated by the "/" symbol.
           <br/> If in doubt, open the market on FIN and check the name of the pair in the page title.
          </p>
          </div>
        </div>
      </form>
    );
  }
);

export default StepFive;
