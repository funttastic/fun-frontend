import * as React from 'react';
import {Controller, SubmitHandler, Control, FieldErrors, useForm} from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {UseFormHandleSubmit} from "react-hook-form/dist/types/form";

interface StepSevenFormData {
  additionalInfo: string;
}

interface StepSevenProps {
  control: Control<StepSevenFormData>;
  errors: FieldErrors<StepSevenFormData>;
  handleNext: () => Promise<void>;
  handleBack: () => void;

}

interface StepComponentRef {
  validateStep: () => Promise<boolean> | boolean;
}

const StepSeven = React.forwardRef<StepComponentRef, StepSevenProps>((props, ref) => {
  const { control, errors } = props;
  const { handleSubmit } = useForm<StepSevenFormData>();

  const onSubmit: SubmitHandler<StepSevenFormData> = async (data) => {
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to send data');
      }
      alert('Data sent successfully!');
    } catch (error) {
      console.error(error);
      alert('Error sending data');
    }
  };

  React.useImperativeHandle(ref, () => ({
    validateStep: () => {
      return Object.keys(errors).length === 0;
    }
  }));

  return (
    <Box className="wizard-seven" onSubmit={handleSubmit(onSubmit)}>
      <div className="step-seven">
      <Controller
        name="additionalInfo"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="confirm that the information is correct and click confirm"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        )}
      />
      </div>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
});

export default StepSeven;
