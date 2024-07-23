import './wizard.css';
import * as Yup from 'yup';
import React, {forwardRef, useImperativeHandle} from 'react';
import {useForm, Controller, FieldErrors, Control} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {ValidationError} from 'yup';

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
  if (!market) return '';
  return market.replace(/[^/-a-zA-Z\s]/g, '').replace(/\s+/g, ' ').trim();
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
          await marketValidationSchema.validate(values, {abortEarly: false});
          return true;
        } catch (error) {
          if (error instanceof ValidationError && error.inner) {
            error.inner.forEach(validationError => {
              setError(validationError.path as keyof typeof values, {message: validationError.message});
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
        <div className="step-five">
          <div className="field-five">
            <h4>Enter your Market</h4>
            <Controller
              name="market"
              control={control}
              render={({field}) => <input className="input-Five" type="text" {...field} />}
            />
          </div>
          <div className="error-messages-five">
            {errors.market && <div>{errors.market?.message}</div>}
          </div>
          <div className="text-five">
            <p>
              You must define the market in which this worker will operate.
              <br/> In this example, the <strong style={{color: 'white'}}>KUJI/USK</strong> market is specified.<br/> The
              markets available for trading will be those accessible on both the mainnet and testnet on 'Kujira's FIN,
              found at<a href="https://fin.kujira.network/" target="_blank" rel="noopener noreferrer"><strong>Kujira Network.</strong></a>
              <br/> The naming pattern typically consists of two symbols written in capital letters, separated by the
              "/" symbol.
              <br/> If in doubt, open<a
              href="https://kujira.network/spot/kujira193dzcmy7lwuj4eda3zpwwt9ejal00xva0vawcvhgsyyp5cfh6jyq66wfrf"
              target="_blank" rel="noopener noreferrer"><strong>Spot Trading</strong></a>and select KUJI/USK.
            </p>
          </div>
        </div>
      </form>
    );
  }
);

export default StepFive;
