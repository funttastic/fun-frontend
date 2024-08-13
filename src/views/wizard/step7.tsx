import yaml from 'js-yaml';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useImperativeHandle, useRef } from 'react';
import {connect} from "react-redux";

interface StepSevenFormData {
  additionalInfo: string;
}

export interface StepComponentRef extends HTMLFormElement {
  validateStep: () => Promise<boolean>;
}

interface StepSevenProps {
  wizard: any,
  handleNext: () => Promise<void>;
  handleBack: () => void;
  savedData: {
    mnemonic: string;
    apiKey: string;
    telegramToken: string;
    chatId: string;
    network: string;
    market: string;
    layers: string;
  };
  onConfirm: () => void;
  onEdit: () => void;
  additionalInfoData: StepSevenFormData;
}

type StepComponentProps = StepSevenProps & React.RefAttributes<StepComponentRef>;

const mapStateToProps = (state: any, props: any) => ({
  wizard: state.app.app.wizard,
})

const StepSeven = React.forwardRef<HTMLFormElement, StepComponentProps>((props, ref) => {
  const { handleBack, savedData, wizard } = props;
  const formRef = useRef<HTMLFormElement>(null);

  useImperativeHandle(ref, () => {
    if (formRef.current) {
      return Object.assign(formRef.current, {
        validateStep: async () => {
          try {
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

  const onSubmit = async () => {
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(savedData),
      });

      if (!response.ok) {
        throw new Error('Error sending data');
      }

      handleBack();
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit().catch(error => console.error('Error in form submission:', error));
  };

  const maskData = (data: string, length = 4): string => {
    let result = '';
    if (data) {
      const visible = data.slice(-length);
      const masked = '*'.repeat(data.length - length);
      result = `${masked}${visible}`;
    }
    return result;
  };

  const parseLayers = (_yaml: string) => {
    try {
      return yaml.load(_yaml) || {};
    } catch (e) {
      console.error('Error parsing YAML:', e);
      return {};
    }
  };

  const layersObject = parseLayers(wizard.strategyLayers);

  return (
    <form onSubmit={handleFormSubmit} ref={formRef}>
      <Box className="wizard-seven">
        <Box mb={2}>
          <Typography variant="h6">Data from Previous Steps</Typography>
          <Typography>Mnemonic: {maskData(wizard.mnemonic)}</Typography>
          <Typography>API Key: {maskData(wizard.coinGeckoAPIKeys)}</Typography>
          <Typography>Telegram Token: {wizard.telegramToken}</Typography>
          <Typography>Telegram Chat ID: {wizard.telegramChatID}</Typography>
          <Typography>Network: {wizard.network}</Typography>
          <Typography>Market: {wizard.market}</Typography>
          <Typography sx={{display: 'flex' }}>
            Layers:  {Object.entries(layersObject).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join(', ')}
          </Typography>
        </Box>

        <Box className="button-seven">
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Box>
    </form>
  );
});

export default connect(mapStateToProps)(StepSeven);
