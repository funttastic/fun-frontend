import React, { useState, ReactElement } from 'react';
import './Wizard.css';


interface StepProps {
    next?: () => void;
    prev?: () => void;
    finish?: () => void;
}

const Step1: React.FC<StepProps> = ({ next }) => (
    <div>
        <h2>Step 1</h2>
        <p>Content for step 1.</p>
        <button onClick={next}>Next</button>
    </div>
);

const Step2: React.FC<StepProps> = ({ next, prev }) => (
    <div>
        <h2>Step 2</h2>
        <p>Content for step 2.</p>
        <button onClick={prev}>Previous</button>
        <button onClick={next}>Next</button>
    </div>
);

const Step3: React.FC<StepProps> = ({ prev, finish }) => (
    <div>
        <h2>Step 3</h2>
        <p>Content for step 3.</p>
        <button onClick={prev}>Previous</button>
        <button onClick={finish}>Finish</button>
    </div>
);

const Wizard: React.FC = () => {
    const [step, setStep] = useState(0);

    const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));
    const finish = () => alert('Wizard completed!');

    const steps: ReactElement[] = [
        <Step1 next={nextStep} key="step1" />,
        <Step2 next={nextStep} prev={prevStep} key="step2" />,
        <Step3 prev={prevStep} finish={finish} key="step3" />,
    ];

    return <div>{steps[step]}</div>;
}

export default Wizard;
