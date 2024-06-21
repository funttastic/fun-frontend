import * as React from 'react';
import './wizard.css';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StepOne from "@/views/wizard/stepOne";
import StepTwo from "@/views/wizard/stepTwo";
import StepTree from "@/views/wizard/stepTree";

const steps = ['Enter your Mnemonic', 'Create an ad group', 'Create an ad'];

interface StepComponentRef {
  validateStep: () => Promise<boolean> | boolean;
}

export default function Wizard() {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [skipped, setSkipped] = React.useState<Set<number>>(new Set<number>());

  const stepRefs = React.useRef<Array<StepComponentRef | null>>([]);

  const isStepOptional = (step: number): boolean => {
    return step === 1;
  };

  const isStepSkipped = (step: number): boolean => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    if (stepRefs.current[activeStep]) {
      const isValid = await stepRefs.current[activeStep]!.validateStep();
      if (!isValid) return;
    }

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{width: '100%'}}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }

          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>
                <Box
                  sx={index === activeStep ? {color: 'white'} : {}}>
                  {label}
                </Box>
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{mt: 2, mb: 1}}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
            <Box sx={{flex: '1 1 auto'}}/>
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{mt: 2, mb: 1}}>Step {activeStep + 1}</Typography>

          <Box sx={{mt: 2, mb: 1}}>
            {activeStep === 0 && <StepOne ref={(el: StepComponentRef | null) => stepRefs.current[0] = el}/>}
            {activeStep === 1 && <StepTwo ref={(el: StepComponentRef | null) => stepRefs.current[1] = el}/>}
            {activeStep === 2 && <StepTree ref={(el: StepComponentRef | null) => stepRefs.current[2] = el}/>}
          </Box>

          <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{mr: 1}}
            >
              Back
            </Button>
            <Box sx={{flex: '1 1 auto'}}/>
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{mr: 1}}>
                Skip
              </Button>
            )}
            <Button color="inherit" onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
