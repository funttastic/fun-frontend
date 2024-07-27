import React, {forwardRef, useImperativeHandle} from 'react';
import {Card, CardContent, Typography, Button, Grid} from '@mui/material';


interface StepComponentRef {
  validateStep: () => Promise<boolean>;
}

interface StepSevenProps {
  savedData: {
    [key: string]: string | number;
  },
  onConfirm: () => void,
  onEdit: () => void,
  handleNext: () => Promise<void>,
  handleBack: () => void,
  ref?: (el: (StepComponentRef | null)) => StepComponentRef | null
}

const StepSeven = forwardRef<StepComponentRef, StepSevenProps>((props, ref) => {
  const { savedData, onConfirm, onEdit, handleNext, handleBack } = props;

  useImperativeHandle(ref, () => ({
    validateStep: async () => {
      return true;
    },
  }));

  return (
    <Card className="wizard-seven" sx={{backgroundColor: 'rgba(5, 148, 211, 0.04)'}}>
      <CardContent className="field-seven">
        <Typography variant="h6" component="div">
          Data Review
        </Typography>
        <Grid container spacing={2} marginTop={4}>
          {Object.entries(savedData).map(([key, value]) => (
            <Grid item xs={12} key={key}>
              <Typography variant="body1" component="div">
                <strong>{key}:</strong> {value}
              </Typography>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2} marginTop={2}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={onEdit}>
              To edit
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="secondary" onClick={onConfirm}>
              Confirm
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
});

export default StepSeven;
