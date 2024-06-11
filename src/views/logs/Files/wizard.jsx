import React, { useState } from 'react';
import './Wizard.css';



function Step1({ next }) {
    return (
        <div>
            <h2>Step 1</h2>
            <p>Content for step 1.</p>
            <button onClick={next}>Next</button>
        </div>
    );
}

function Step2({ next, prev }) {
    return (
        <div>
            <h2>Step 2</h2>
            <p>Content for step 2.</p>
            <button onClick={prev}>Previous</button>
            <button onClick={next}>Next</button>
        </div>
    );
}

function Step3({ prev, finish }) {
    return (
        <div>
            <h2>Step 3</h2>
            <p>Content for step 3.</p>
            <button onClick={prev}>Previous</button>
            <button onClick={finish}>Finish</button>
        </div>
    );
}

export default function Wizard() {
    const [step, setStep] = useState(0);

    const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));
    const finish = () => alert('Wizard completed!');

    const steps = [
        <Step1 next={nextStep} key="step1" />,
        <Step2 next={nextStep} prev={prevStep} key="step2" />,
        <Step3 prev={prevStep} finish={finish} key="step3" />,
    ];

    return <div>{steps[step]}</div>;
}
