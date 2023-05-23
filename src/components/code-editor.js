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
    const userCode = this.editor.getValue();

    if (!this.stacksDeps) {
      await this.fetchStacksDependencies();
    }

    const AsyncFunction = Object.getPrototypeOf(
      async function () {}
    ).constructor;

    console.log(this.stacksDeps);
    const fn = new AsyncFunction(
      "stacksNetwork",
      "stacksConnect",
      "stacksAuth",
      "stacksCommon",
      "stacksTransactions",
      "stacksStacking",
      `with ({...stacksNetwork, ...stacksConnect, ...stacksAuth, ...stacksCommon, ...stacksTransactions, ...stacksStacking })
      try {
        return  (async () => {
          "use strict";
          {
            ${code}
          }
        })();
    } catch(e) {
        console.log(e);
    }`
    );
    fn(...this.stacksDeps);
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
        <button onClick={this.runit}>Run It</button>
      </div>
    );
  }
}
