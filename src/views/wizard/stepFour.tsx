import Radio from '@mui/material/Radio';
import * as Yup from 'yup';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';
import { useForm, FormProvider, useFormContext, FieldErrors, Control } from 'react-hook-form';
import { useImperativeHandle } from 'react';
import { ValidationError } from 'yup';

interface StepProps {
  control: Control<any>;
  errors: FieldErrors<FormValues>;
  handleNext: () => Promise<void>;
  handleBack: () => void;
  formData: FormValues;
  setFormData: React.Dispatch<React.SetStateAction<FormValues>>;
}

interface StepComponentRef {
  validateStep: () => Promise<boolean> | boolean;
}

interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked: boolean;
}

type StepComponentProps = StepProps & React.RefAttributes<StepComponentRef>;

interface FormValues {
  choice: 'mainnet' | 'testnet';
}

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  '.MuiFormControlLabel-label': checked && {
    color: theme.palette.primary.main,
  },
}));

function MyFormControlLabel(props: FormControlLabelProps) {
  const { watch } = useFormContext();
  const value = watch('choice');
  const checked = value === props.value;
  return <StyledFormControlLabel checked={checked} {...props} />;
}

const schema = Yup.object().shape({
  choice: Yup.string()
    .oneOf(['mainnet', 'testnet'])
    .required('You must select either Mainnet or Testnet'),
});

const StepFour = React.forwardRef<StepComponentRef, StepComponentProps>(({ formData, setFormData, handleNext, handleBack, control }, ref) => {
  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: formData,
  });

  const { handleSubmit, setError, getValues, formState: { errors } } = methods;

  const onSubmit = (data: FormValues) => {
    setFormData(data);
    handleNext();
    return true;
  };

  useImperativeHandle(ref, () => ({
    validateStep: async () => {
      const values = getValues();
      try {
        await schema.validate(values, { abortEarly: false });
        setFormData(values);
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
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as 'mainnet' | 'testnet';
    methods.setValue('choice', value, { shouldValidate: true });
  };

  return (
    <FormProvider {...methods}>
      <form className="wizard" onSubmit={handleSubmit(onSubmit)}>
        <RadioGroup className="button-four" value={methods.watch('choice')} onChange={handleRadioChange}>
          <div className="radio-button-four">
            <MyFormControlLabel value="mainnet" label="Mainnet" control={<Radio size="small" />} />
          </div>
          <div className="radio-button-four">
            <MyFormControlLabel value="testnet" label="Testnet" control={<Radio size="small" />} />
          </div>
        </RadioGroup>
        {errors.choice && <div className="error-messages-four">{errors.choice.message}</div>}
        <div id="network-description" className="text-four">
          <p>
            The <span className="text-white">Mainnet</span> is the primary operational network of a blockchain,
            where real transactions occur using tokens with actual economic value. <br />
            Designed for production use, it provides high security and ensures transaction immutability.
            Ideal for real financial operations and applications requiring robustness and trust,
            the Mainnet is the go-to choice for serious blockchain deployments.
          </p>
          <br />
          <p>
            The <span className="text-white">Testnet</span> is the testing network of a blockchain,
            allowing you to conduct transactions and test applications without real financial risks.
            It is ideal for developers, providing a safe environment for experimentation, debugging,
            and validating new features before deploying them on the Mainnet.
            Use the Testnet to ensure your solutions work correctly and efficiently before moving to production.
          </p>
        </div>
      </form>
    </FormProvider>
  );
});

export default StepFour;
