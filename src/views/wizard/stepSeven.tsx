import * as React from 'react';
import { Control, Controller, FieldErrors, SubmitHandler, useFormContext } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

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
  const { control, handleSubmit } = useFormContext<StepSevenFormData>();

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
      // Implement your validation logic here
      // For example, you can check if there are no errors in the form
      return Object.keys(props.errors).length === 0;
    }
  }));

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="additionalInfo"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Additional Information"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        )}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
});

export default StepSeven;
