import * as React from 'react';
import { useForm, Controller, FieldErrors, Control } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Radio from '@mui/material/Radio';
import { styled } from '@mui/material/styles';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';

interface StepProps {
  control: Control<any>;
  errors: FieldErrors<FormValues>;
  handleNext: () => Promise<void>;
  handleBack: () => void;
}

interface StepComponentRef {
  validateStep: () => Promise<boolean> | boolean;
}

interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked: boolean;
}

type StepComponentProps = StepProps & React.RefAttributes<StepComponentRef>;

interface FormValues {
  choice: string;
}

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  '.MuiFormControlLabel-label': checked && {
    color: theme.palette.primary.main,
  },
}));

function MyFormControlLabel(props: FormControlLabelProps) {
  const radioGroup = useRadioGroup();
  let checked = false;
  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }
  return <StyledFormControlLabel checked={checked} {...props} />;
}

const schema = Yup.object().shape({
  choice: Yup.string().required('Uma opção deve ser selecionada'),
});

const StepFour = React.forwardRef<StepComponentRef, StepComponentProps>((props, ref) => {
  const { control, errors } = props;

  const { handleSubmit } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormValues) => {
    console.log('Form Data:', data);
    return true;
  };

  const validateStep = async () => {
    try {
      await handleSubmit(onSubmit)();
      return true;
    } catch (error) {
      console.error('Validation Errors:', error);
      return false;
    }
  };

  React.useImperativeHandle(ref, () => ({
    validateStep,
  }));

  return (
    <form className="wizard" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="choice"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <RadioGroup className="button-four" {...field}>
           <div className="radio-button-four" ><MyFormControlLabel value="first" label="Mainnet" control={<Radio size="small" />} /></div>
            <div className="radio-button-four" ><MyFormControlLabel value="second" label="Testnet" control={<Radio size="small"/>}/></div>
          </RadioGroup>
          )}
      />
      {errors.choice && <div>{errors.choice.message}</div>}
      <div className="text-four">
        <p>
          The <span className="text-white">Mainnet</span> is the primary operational network of a blockchain,
          where real transactions occur using tokens with actual economic value. <br/>
          Designed for production use, it provides high security and ensures transaction immutability.
          Ideal for real financial operations and applications requiring robustness and trust,
          the Mainnet is the go-to choice for serious blockchain deployments.
        </p>
        <br/>
        <p>
          The <span className="text-white">Testnet</span> is the testing network of a blockchain,
          allowing you to conduct transactions and test applications without real financial risks.
          It is ideal for developers, providing a safe environment for experimentation, debugging,
          and validating new features before deploying them on the Mainnet.
          Use the Testnet to ensure your solutions work correctly and efficiently before moving to production.
        </p>
      </div>
    </form>
  );
});

export default StepFour;
