import React, { useState } from 'react';
import './wizard.css';
import { Field, ErrorMessage, Formik, Form } from 'formik';
import * as Yup from 'yup';
import { apiPostAddWallet } from '@/model/service/api/funttastic';

interface StepProps {
  next: () => void;
}

const StepOne: React.FC<StepProps> = ({ next }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: { mnemonic: string }) => {
    setLoading(true);
    setError(null); // Reset error state before new submission
    try {
      await apiPostAddWallet(values.mnemonic);
      next();
    } catch (err) {
      console.error('Erro ao adicionar carteira:', err);
      setError('Erro ao adicionar carteira. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wizard">
      <div className="step">
        <h2>Enter your Mnemonic</h2>
        <Formik
          initialValues={{ mnemonic: '' }}
          validationSchema={Yup.object({
            mnemonic: Yup.string().required('Mnemonic is required'),
          })}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="field">
                <label htmlFor="mnemonic">Mnemonic:</label>
                <Field className="input-text" name="mnemonic" type="password" />
                <ErrorMessage name="mnemonic" component="div" className="error-message" />
              </div>
              {error && <div className="error-message">{error}</div>}
              <button className="button" onClick={apiPostAddWallet} type="submit" disabled={isSubmitting || loading}>
                <p className="button-text">{loading ? 'Loading...' : 'Next'}</p>
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default StepOne;
