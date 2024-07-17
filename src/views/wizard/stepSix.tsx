import React, {useState, useRef} from 'react';
import Editor from '@monaco-editor/react';
import './wizard.css';
import {color} from "framer-motion";


const initialYaml = `
layers:
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

const TemplateDemo: React.FC = () => {
  const [text, setText] = useState(initialYaml);
  const editorRef = useRef<any>(null);


  return (
    <>
      <div className="editor-container">
        <Editor
          className="editor-text"
          language="yaml"
          theme='vs-dark'
          value={text}
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
          <strong style={{color: '#F2845C'}}>Layers</strong> <strong>:</strong> Indicates that there are multiple layers
          or levels of trading orders. Each layer can represent a different strategy or configuration.<br/>
          <strong style={{color: '#F2845C'}}>Bid</strong> <strong>:</strong> Represents a buy order. Buy orders are
          offers to purchase an asset at a specific price.<br/>
          <strong style={{color: '#F2845C'}}>Quantity</strong> <strong>:</strong> Specifies the number of units of the
          asset you want to buy. Here, it is set to buy 2 units.<br/>
          <strong style={{color: '#F2845C'}}>Spread</strong> <strong>:</strong> The spread is the difference between the
          bid (buy) price and the ask (sell) price. It can be configured as an absolute value or a percentage.<br/>
          <strong style={{color: '#F2845C'}}>Absolute</strong> <strong>:</strong> null The absolute spread is not set
          (null), which means the configuration is using the percentage spread.<br/>
          <strong style={{color: '#F2845C'}}>Percentage</strong> <strong>:</strong>  The percentage spread is set to 15%. This means the buy order will be placed 15% below the current market
          price.<br/>
         <strong style={{color: '#F2845C'}}>Budget</strong>  <strong>:</strong>  The budget is the amount of money you are willing to spend on the buy orders.<br/>
         <strong style={{color: '#F2845C'}}>Ask</strong> <strong>:</strong>  Represents a sell order. Sell orders are offers to sell an asset at a specific price.
        </p>
      </div>
    </>
  );
}
export default TemplateDemo;
