import React, {useState, forwardRef, useImperativeHandle} from 'react';
import Editor from '@monaco-editor/react';
import {dispatch} from '@/model/state/redux/store';
import './wizard.css';

const initialYaml = `layers:
  - bid:
      quantity: 2
      spread:
        absolute: null
        percentage: 15
      budget:
        absolute: 1 
        percentage: 0.1
    ask:
      quantity: 1
      spread:
        absolute: null
        percentage: 15
      budget:
        absolute: null
        percentage: 0.1
`;

type StepSixProps = {
  setFormData: (data: any) => void;
  formData: any;
};

const StepSix = forwardRef<unknown, StepSixProps>(({setFormData, formData}, ref) => {
  const [text, setText] = useState(initialYaml);

  useImperativeHandle(ref, () => ({
    validateStep: async () => {
      let isValid = true;

      if (!text.trim()) {
        isValid = false;
      } else {
        setFormData({...formData, strategyLayers: text});
      }

      return isValid;
    }
  }));

  return (
    <div>
      <div className="editor-container">
        <h4 className="editor-header">Strategy Layer(s)</h4>
        <Editor
          className="editor-text"
          language="yaml"
          theme="vs-dark"
          value={text}
          onChange={value => {
            setText(value || '');
            dispatch('app.updateWizard', {
              strategyLayers: value,
            })
            console.log(text);
          }}
          options={{
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: false,
            cursorStyle: 'line',
            automaticLayout: true,
            formatOnType: true,
            tabSize: 2,
            insertSpaces: true,
          }}
        />
      </div>
      <div className="text-layer">
        <p>
          <strong style={{color: '#F2845C'}}>Layers</strong>: Indicates that there are multiple layers or levels of
          trading orders. Each layer can represent a different strategy or configuration.<br/>
          <strong style={{color: '#F2845C'}}>Bid</strong>: Represents a buy order. Buy orders are offers to purchase an
          asset at a specific price.<br/>
          <strong style={{color: '#F2845C'}}>Quantity</strong>: Specifies the number of units of the asset you want to
          buy. Here, it is set to buy 2 units.<br/>
          <strong style={{color: '#F2845C'}}>Spread</strong>: The spread is the difference between the bid (buy) price
          and the ask (sell) price. It can be configured as an absolute value or a percentage.<br/>
          <strong style={{color: '#F2845C'}}>Absolute</strong>: null The absolute spread is not set (null), which means
          the configuration is using the percentage spread.<br/>
          <strong style={{color: '#F2845C'}}>Percentage</strong>: The percentage spread is set to 15%. This means the
          buy order will be placed 15% below the current market price.<br/>
          <strong style={{color: '#F2845C'}}>Budget</strong>: The budget is the amount of money you are willing to spend
          on the buy orders.<br/>
          <strong style={{color: '#F2845C'}}>Ask</strong>: Represents a sell order. Sell orders are offers to sell an
          asset at a specific price.
        </p>
      </div>
    </div>
  );
});

export default StepSix;
