import './wizard.css';
import * as Yup from 'yup';
import React, { forwardRef, useImperativeHandle } from 'react';
import { useForm, Controller, FieldErrors, Control } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ValidationError } from 'yup';


interface FormValues {
  layer: string;
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

const sanitizeLayer = (layer: string) => {
  return layer.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
};

const layerValidationSchema = Yup.object({
  layer: Yup.string()
    .required('layer is required')
});

type StepComponentProps = StepProps & React.RefAttributes<StepComponentRef>;

const StepSix = forwardRef<StepComponentRef, StepComponentProps>(
  (_props, ref) => {
    const {control, handleSubmit, formState: {errors}, getValues, setError, setValue} = useForm({
      resolver: yupResolver(layerValidationSchema),
    });

    useImperativeHandle(ref, () => ({
      validateStep: async () => {
        let values = getValues();
        values.layer = sanitizeLayer(values.layer);
        setValue('layer', values.layer);
        try {
          await layerValidationSchema.validate(values, { abortEarly: false });
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
      data.layer = sanitizeLayer(data.layer);
      console.log(data);
    };

    return (
      <form className="wizard" onSubmit={handleSubmit(onSubmit)}>
        <div className="step">
          <h4>Enter your layer and Crypto</h4>
          <div className="field">
            <Controller
              name="layer"
              control={control}
              render={({ field }) => <input className="input-Five" type="text" {...field} />}
            />
            {errors.layer && <div className="error-message">{errors.layer.message}</div>}
          </div>
          <div className="text-exp">
            <p>

            </p>
          </div>
        </div>
      </form>
    );
  }
);

export default StepSix;
