import Radio from '@mui/material/Radio';
import * as Yup from 'yup';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useForm, FormProvider, FieldErrors, Control } from 'react-hook-form';
import { useImperativeHandle } from 'react';
import { ValidationError } from 'yup';
import { dispatch} from '@/model/state/redux/store';

interface StepProps {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  handleNext: () => Promise<void>;
  handleBack: () => void;
  formData: FormValues;
  setFormData: React.Dispatch<React.SetStateAction<FormValues>>;
}

interface StepComponentRef {
  validateStep: () => Promise<boolean> | boolean;
}

type StepComponentProps = StepProps & React.RefAttributes<StepComponentRef>;

interface FormValues {
  choice: 'mainnet' | 'testnet';
}

const StyledFormControlLabel = styled(FormControlLabel)(({ theme, checked }) => ({
  '.MuiFormControlLabel-label': {
    color: checked ? theme.palette.primary.main : undefined,
  },
}));

const schema = Yup.object().shape({
  choice: Yup.string()
    .oneOf(['mainnet', 'testnet'])
    .required('You must select either Mainnet or Testnet'),
});

const StepFour = React.forwardRef<StepComponentRef, StepComponentProps>(({ formData, setFormData }, ref) => {

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      choice: '' as 'mainnet' | 'testnet',
  }});

  const { setError, getValues, formState: { errors } } = methods;



  useImperativeHandle(ref, () => ({
    validateStep: async () => {
      const values = getValues();
      try {
        await schema.validate(values, { abortEarly: false });
        setFormData(values);
        dispatch('app.updateWizard', {
          network: values.choice,
        });
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

  return (
    <FormProvider {...methods}>
      <div className="wizard">
        <RadioGroup
          className="button-four"
          value={methods.watch('choice')}
          onChange={(e) => methods.setValue('choice', e.target.value as 'mainnet' | 'testnet')}>
          <div className="radio-button-four">
            <StyledFormControlLabel
              value="mainnet"
              label="Mainnet"
              control={<Radio size="small" />} checked={methods.watch('choice') === 'mainnet'} />
          </div>
          <div className="radio-button-four">
            <StyledFormControlLabel
              value="testnet"
              label="Testnet"
              control={<Radio size="small" />} checked={methods.watch('choice') === 'testnet'} />
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
      </div>
    </FormProvider>
  );
});

export default StepFour;
