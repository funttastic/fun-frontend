import React, { useImperativeHandle, useRef } from 'react';
import { Controller, useFormContext, SubmitHandler } from 'react-hook-form';
import { Control, FieldErrors } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

interface StepSevenFormData {
  additionalInfo: string;
}

export interface StepComponentRef extends HTMLFormElement {
  validateStep: () => Promise<boolean>;
}

interface StepSevenProps {
  control: Control<StepSevenFormData>;
  errors: FieldErrors<StepSevenFormData>;
  handleNext: () => Promise<void>;
  handleBack: () => void;
  savedData: any;
  onConfirm: () => void;
  onEdit: () => void;
}

type StepComponentProps = StepSevenProps & React.RefAttributes<StepComponentRef>;

const StepSeven = React.forwardRef<HTMLFormElement, StepComponentProps>((props, ref) => {
  const { control, handleNext, handleBack, savedData } = props;
  const { handleSubmit, setValue } = useFormContext<StepSevenFormData>();
  const formRef = useRef<HTMLFormElement>(null);

  useImperativeHandle(ref, () => {
    if (formRef.current) {
      return Object.assign(formRef.current, {
        validateStep: async () => {
          try {
            let values = savedData;
            values.additionalInfo = (values.additionalInfo || {}).trim();
            setValue('additionalInfo', values.additionalInfo);

            return true;
          } catch (error) {
            console.error("Validation error:", error);
            return false;
          }
        }
      });
    }
    return {} as HTMLFormElement;
  });

  const onSubmit: SubmitHandler<StepSevenFormData> = async (data) => {
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error sending data');
      }

      await handleNext();
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
              error={!!props.errors.additionalInfo}
              helperText={props.errors.additionalInfo ? 'This field is required' : ''}
            />
          )}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2 }}>
          <Button onClick={handleBack}>Back</Button>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Box>
    </form>
  );
});

export default StepSeven;
