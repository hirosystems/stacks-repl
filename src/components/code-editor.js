import React from "react";
import MonacoEditor from "react-monaco-editor";

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
  };

  runit = async () => {
    const code = this.editor.getValue();
    const script = document.createElement("script");

    const consoleCode = `
      const oldConsole = console;
      console = {log: (...args) => {
        const child = document.createElement("div");
        child.innerHTML = JSON.stringify(args[1]);
        document
          .getElementById("1")
          .appendChild(child);
      }};
      ${code}
      console = oldConsole;
    `;
    script.innerHTML = consoleCode;
    script.setAttribute("type", "module");

    document.head.appendChild(script);
  };

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
      <div id="1">
        <MonacoEditor
          height="400"
          language="javascript"
          value={code}
          options={options}
          onChange={this.onChange}
          editorDidMount={this.editorDidMount}
          theme="vs-dark"
        />
        <button onClick={this.runit}>Run It</button>
      </div>
    );
  }
}
