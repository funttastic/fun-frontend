import React, {useImperativeHandle} from 'react';
import './wizard.css';
import {useForm, Controller, Control, FieldErrors} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';

interface StepComponentRef {
  validateStep: () => Promise<boolean> | boolean;
}

interface StepProps {
  control: Control;
  errors: FieldErrors;
  handleNext: () => Promise<void>;
  handleBack: () => void;
}

type StepComponentProps = StepProps & React.RefAttributes<StepComponentRef>

const sanitizeTelegram = (token: string) => {
  return token.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
};

const telegramValidationSchema = Yup.object({
  token: Yup.string()
    .required('token is required')
    .test('len', 'token must be exactly 24 words', val => val?.split(' ').length === 24),
  chatID: Yup.string()
    .required('chatID is required')
    .test('len', 'chatID must be exactly 24 words', val => val?.split(' ').length === 24),
});

const StepTree = React.forwardRef<StepComponentRef, StepComponentProps>(({handleNext, handleBack}, ref) => {
    const {control, handleSubmit, getValues, setError, setValue, formState: {errors}} = useForm({
      resolver: yupResolver(telegramValidationSchema),
    });


    useImperativeHandle(ref, () => ({
      validateStep: async () => {
        let values = getValues();
        values.token = sanitizeTelegram(values.token);
        setValue('token', values.token);
        values.chatID = sanitizeTelegram(values.chatID);
        setValue('chatID', values.chatID);
        try {
          await telegramValidationSchema.validate(values, {abortEarly: false});
          return true;
        } catch (error) {
          if (error instanceof Yup.ValidationError && error.inner) {
            error.inner.forEach(validationError => {
              setError(validationError.path as keyof typeof values, {message: validationError.message});
            });
          }
          return false;
        }
      }
    }));

    const onSubmit = (data: any) => {
      data.chatID = sanitizeTelegram(data.chatID);
      data.token = sanitizeTelegram(data.token);
      console.log(data);
    }


    return (
      <form className="wizard" onSubmit={handleSubmit(onSubmit)}>
        <div className="step-tree">
          <h5>Enter your Token</h5>
          <div className="field">
            <Controller
              name="token"
              control={control}
              render={({field}) => <input className="input-text-tree" type="text" {...field} />}
            />
            {errors.token && <div className="error-message">{errors.token.message}</div>}
          </div>
          <div className="step-tree">
            <h5>Enter your ChatID</h5>
            <div className="field">
              <Controller
                name="chatID"
                control={control}
                render={({field}) => <input className="input-text-tree" type="text" {...field} />}
              />
              {errors.chatID && <div className="error-message">{errors.chatID.message}</div>}
            </div>
            <div className="text-exp">
              <p>
                The token is a string, like: <span style={{color: 'white'}}>110201543:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw</span> <br/>
                which is required to authorize the bot and send requests to the Bot API. <br/>
                Keep your token secure and store it safely, it can be used by anyone to control your bot. <br/>

                If you haven't created a Telegram bot yet, click on this link: <a href="https://core.telegram.org/bots/features#botfather">Telegram Bot</a> and follow the instructions to create one.
              </p>
            </div>
          </div>
        </div>
      </form>

    );
  })
;

export default StepTree;
