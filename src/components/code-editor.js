import React from "react";
import MonacoEditor, { MonacoDiffEditor } from "react-monaco-editor";

export class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: props.code,
    };
  }

  onChange = (newValue) => {
    console.log("onChange", newValue); // eslint-disable-line no-console
  };

  editorDidMount = async (editor) => {
    // eslint-disable-next-line no-console
    console.log("editorDidMount", editor, editor.getValue(), editor.getModel());
    this.editor = editor;
  render() {
    const { code } = this.state;
    const options = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: "line",
      automaticLayout: false,
  };
    return (
      <div>
        <MonacoEditor
          height="400"
          language="javascript"
          value={code}
          options={options}
          onChange={this.onChange}
          editorDidMount={this.editorDidMount}
          theme="vs-dark"
        />
      </div>
    );
  }
}
