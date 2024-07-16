import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';
import * as yaml from 'js-yaml';

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
    <div className="editor-container">
      <Editor
        className="editor-text"
        language="yaml"
        theme = 'vs-dark'
        value={text}
        options={{
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: false,
          cursorStyle: 'line',
          automaticLayout: false,
          formatOnType: true,
          tabSize: 2,
          insertSpaces: true,
        }}
      />
    </div>
  );
};

export default TemplateDemo;
