import * as React from 'react';
import {useForm, Controller, FieldErrors, Control} from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Radio from '@mui/material/Radio';
import { styled } from '@mui/material/styles';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel, { FormControlLabelProps } from '@mui/material/FormControlLabel';


interface StepProps {
  control: Control;
  errors: FieldErrors;
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
  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  React.useImperativeHandle(ref, () => ({
    validateStep: async () => {
      const result = await handleSubmit(onSubmit)();
      return result !== undefined;
    }
  }));

  return (
    <form className="wizard" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="choice"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <RadioGroup className="radio-button" {...field}>
            <MyFormControlLabel value="first" label="MainNet" control={<Radio size="x-small"/>} />
            <MyFormControlLabel value="second" label="TestNet" control={<Radio size="x-small"/>} />
          </RadioGroup>
        )}
      />
      {errors.choice && <p>{errors.choice.message}</p>}
    </form>
  );
});

export default StepFour;
