import './wizard.css';
import * as Yup from 'yup';
import React, { useImperativeHandle } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, Control, FieldErrors } from 'react-hook-form';
import { dispatch } from '@/model/state/redux/store';

interface StepComponentRef {
  validateStep: () => Promise<boolean> | boolean;
}

interface FormValues {
  token: string;
  chatID: string;
}

interface StepProps {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  handleNext: () => Promise<void>;
  handleBack: () => void;
  formData: FormValues;
  setFormData: React.Dispatch<React.SetStateAction<FormValues>>;
}

type StepComponentProps = StepProps & React.RefAttributes<StepComponentRef>;

const sanitizeTelegram = (token: string) => {
  return token?.replace(/[^a-zA-Z0-9:]/g, '').replace(/\s+/g, ' ').trim();
};

const _sanitizeTelegram = (chatID: string) => {
  return chatID?.replace(/[^0-9]/g, '').trim();
};

const telegramValidationSchema = Yup.object({
  token: Yup.string()
    .required('Token is required')
    .matches(/^[a-zA-Z0-9:]+$/, 'Token must be alphanumeric'),

  chatID: Yup.string()
    .required('Chat ID is required')
    .matches(/^[0-9]+$/, 'Chat ID must be numeric')
});

const StepTree = React.forwardRef<StepComponentRef, StepComponentProps>(({ formData }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { control, setValue, getValues, setError, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(telegramValidationSchema),
    defaultValues: formData
  });

  useImperativeHandle(ref, () => ({
    validateStep: async () => {
      const values = getValues();
      values.token = sanitizeTelegram(values.token);
      values.chatID = _sanitizeTelegram(values.chatID);
      setValue('token', values.token);
      setValue('chatID', values.chatID);

      try {
        await telegramValidationSchema.validate(values, { abortEarly: false });
        dispatch('app.updateWizard', {
            telegramToken: values.token,
            telegramChatID: values.chatID
        })
        return true;
      } catch (error) {
        if (error instanceof Yup.ValidationError && error.inner) {
          error.inner.forEach(validationError => {
            setError(validationError.path as keyof FormValues, { message: validationError.message });
          });
        }
        return false;
      }
    }
  }));

  return (
    <form className="wizard">
      <div className="step-tree">
        <div className="field-tree">
          <p className="h4">Enter your Telegram Token</p>
          <Controller
            name="token"
            control={control}
            render={({ field }) => (
              <div style={{ position: 'relative' }}>
                <input className="input-tree" type={showPassword ? 'text' : 'password'} {...field} value={field.value || ''} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: 10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            )}
          />
          {errors.token && <div className="error-message-tree">{errors.token.message}</div>}
        </div>
        <div className="field-tree">
          <p className="h4">Enter your Telegram Chat ID</p>
          <Controller
            name="chatID"
            control={control}
            render={({ field }) => (
              <input className="input-tree" type="text" {...field} {...field} value={field.value || ''}/>
            )}
          />
          {errors.chatID && <div className="error-message-tree">{errors.chatID.message}</div>}
        </div>
        <div className="text-tree">
          The <strong style={{ color: 'white' }}>Token</strong> is a string, like: <strong
          style={{ color: 'white' }}>110201543:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw</strong> <br />
          which is required to authorize the bot and send requests to the Bot API. <br />
          Keep your token secure and store it safely, it can be used by anyone to control your bot. <br />
          If you haven't created a Telegram bot yet, click on this link <a
          href="https://core.telegram.org/bots/features#botfather" target="_blank" rel="noopener noreferrer"><strong>Telegram
          Bot</strong></a> and follow the instructions to create one.
          <br />
          <br />
          The <strong style={{ color: 'white' }}>Chat ID </strong> is a string, like: <strong
          style={{ color: 'white' }}>110201543</strong> <br />
          The Chat ID is automatically generated by Telegram.
          Each type of chat (private, group, channel) receives a unique ID <br />
          when it is created or when the bot interacts with it for the first time. <br />
          This ID is used to identify and direct messages correctly through the Telegram API.<br />
          Click on this link and follow the steps to get the chat ID: <a
          href="https://gist.github.com/nafiesl/4ad622f344cd1dc3bb1ecbe468ff9f8a#how-to-get-telegram-bot-chat-id"
          target="_blank" rel="noopener noreferrer">
          <strong>How to get Telegram Bot Chat ID</strong>
        </a>
        </div>
      </div>
    </form>
  );
});

export default StepTree;
