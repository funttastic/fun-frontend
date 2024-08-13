import './wizard.css';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {FormProvider, useForm} from 'react-hook-form';
import StepOne from "@/views/wizard/step1";
import StepTwo from "@/views/wizard/step2";
import StepTree from "@/views/wizard/step3";
import StepFour from "@/views/wizard/step4";
import StepFive from "@/views/wizard/step5";
import StepSix from "@/views/wizard/step6";
import StepSeven, {StepComponentRef} from "@/views/wizard/step7";

const steps = ['Wallet Mnemonic', 'CoinGecko API Key(s)', 'Telegram Token/Chat ID', 'Network', 'Market', 'Strategy Layers', 'Submit'];

const _path = [
  'Wizard > Hummingbot Client > Configuration > Wallet > Mnemonic',
  'Wizard > Hummingbot Gateway > Configuration > CoinGecko API Keys',
  'Wizard > Funttastic Api > Configuration > Telegram',
  'Wizard > Funttastic Api > Configuration > Mainnet/Testnet',
  'Wizard > Funttastic Api > Configuration > Market',
  'Wizard > Files > Resources > Strategies > Pure_Market_Making/1.0.0',
];

interface FormData {
  additionalInfo: string;
}

export default function Wizard() {
  const [activeStep, setActiveStep] = React.useState<number>(0);
  const [skipped, setSkipped] = React.useState<Set<number>>(new Set<number>());
  const [formData, setFormData] = React.useState<FormData | any>({});

  const stepRefs = React.useRef<Array<StepComponentRef | null>>([]);

  const {control, formState: {errors}} = useForm<FormData | any>();

  const methods = useForm<FormData>();

  const isStepOptional = (step: number): boolean => {
    return step < 5;
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

  // const handleReset = () => {
  //   setActiveStep(0);
  // };

  return (
    <Box sx={{width: '100%'}}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: { optional?: React.ReactNode } = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>
                <Box sx={index === activeStep ? {color: 'white'} : {}}>
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
            All steps completed - you're finished
          </Typography>
          {/*<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>*/}
          {/*  <Box sx={{ flex: '1 1 auto' }} />*/}
          {/*  <Button onClick={handleReset}>Reset</Button>*/}
          {/*</Box>*/}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{mt: 2, mb: 1, fontSize: 12}}>{_path[activeStep]}</Typography>

          <Box sx={{mt: 2, mb: 1}}>
            {activeStep === 0 && <StepOne
                ref={(el: StepComponentRef | null) => stepRefs.current[0] = el}
                control={control}
                errors={errors}
                handleNext={handleNext}
                setFormData={setFormData}
                formData={formData}
            />}
            {activeStep === 1 && <StepTwo
                ref={(el: StepComponentRef | null) => stepRefs.current[1] = el}
                control={control}
                errors={errors}
                handleNext={handleNext}
                setFormData={setFormData}
                formData={formData}
            />}
            {activeStep === 2 && <StepTree
                ref={(el: StepComponentRef | null) => stepRefs.current[2] = el}
                control={control}
                errors={errors}
                handleNext={handleNext}
                handleBack={handleBack}
                setFormData={setFormData}
                formData={formData}
            />}
            {activeStep === 3 && <StepFour
                ref={(el: StepComponentRef | null) => stepRefs.current[3] = el}
                control={control}
                errors={errors}
                handleNext={handleNext}
                handleBack={handleBack}
                setFormData={setFormData}
                formData={formData}
            />}
            {activeStep === 4 && <StepFive
                ref={(el: StepComponentRef | null) => stepRefs.current[4] = el}
                control={control}
                errors={errors}
                handleNext={handleNext}
                handleBack={handleBack}
                setFormData={setFormData}
                formData={formData}
            />}
            {activeStep === 5 && <StepSix
                ref={(el: StepComponentRef | null) => stepRefs.current[5] = el}
                setFormData={setFormData}
                formData={formData}
            />}
            <FormProvider {...methods}>
              {activeStep === 6 && <StepSeven
                  ref={(el: StepComponentRef | null) => stepRefs.current[6] = el}
                  savedData={formData}
                  onConfirm={handleNext}
                  onEdit={handleBack}
                  handleNext={handleNext}
                  handleBack={handleBack}
               additionalInfoData={ formData }
              />}
            </FormProvider>
          </Box>

          <Box sx={{display: 'flex', flexDirection: 'row', pt: 4, mr: 1, mt: 3}}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{fontSize: 12, mr: 1, mt: -90}}
            >
              Back
            </Button>
            <Box sx={{flex: '1 1 auto'}}/>
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{fontSize: 12, mr: -3, mt: -90}}>
                Skip
              </Button>
            )}
            <Button color="inherit" sx={{fontSize: 12, mt: -90}} onClick={handleNext}>
              {activeStep === steps.length - 1 ? '' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
