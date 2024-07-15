import './wizard.css';
import yaml from "js-yaml";
import AceEditor from "react-ace";
import React, { useState } from "react";

import "ace-builds/src-noconflict/mode-yaml";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

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
      quantity:   1
      spread:
        absolute: null
        percentage: 15
      budget:
        absolute: null
        percentage: 0.1
`;


const YamlEditor: React.FC = () => {
  const [yamlContent, setYamlContent] = useState<string>(initialYaml);
  const [parsedContent, setParsedContent] = useState<object | null>(null);

  const handleYamlChange = (newContent: string) => {
    setYamlContent(newContent);
    try {
      const parsed = yaml.load(newContent);
      if (typeof parsed === "object" && parsed !== null) {
        setParsedContent(parsed);
      } else {
        setParsedContent(null);
      }
    } catch (e) {
      setParsedContent(null);
      console.error("Error parsing YAML:", e);
    }
  };

  return (
    <div style={{ padding:"50px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <AceEditor
        mode="yaml"
        theme="github"
        name="yaml-editor"
        value={yamlContent}
        onChange={handleYamlChange}
        editorProps={{
          $blockScrolling: true,

        }}
        setOptions={{
          cursorStart: 1,
          useWorker: true,
          showLineNumbers: true,
          highlightActiveLine: false,
          cursorStyle: "wide",
          wrap: true,
        }}
        className="editor-text"
      />
    </div>
  );
};

export default YamlEditor;
