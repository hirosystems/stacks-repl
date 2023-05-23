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

  fetchStacksDependencies = async () => {
    if (this.stacksDeps) return;
    if (!this.stacksProm) {
      const deps = ["network"];
      this.stacksProm = Promise.all([
        new Promise((resolve) => {
          require([`../../node_modules/@stacks/network`], (stacksPackage) => {
            resolve(stacksPackage);
          });
        }),
        new Promise((resolve) => {
          require([`../../node_modules/@stacks/connect`], (stacksPackage) => {
            resolve(stacksPackage);
          });
        }),
        new Promise((resolve) => {
          require([`../../node_modules/@stacks/auth`], (stacksPackage) => {
            resolve(stacksPackage);
          });
        }),
        new Promise((resolve) => {
          require([`../../node_modules/@stacks/common`], (stacksPackage) => {
            resolve(stacksPackage);
          });
        }),
        new Promise((resolve) => {
          require([`../../node_modules/@stacks/transactions`], (
            stacksPackage
          ) => {
            resolve(stacksPackage);
          });
        }),
        new Promise((resolve) => {
          require([`../../node_modules/@stacks/stacking`], (stacksPackage) => {
            resolve(stacksPackage);
          });
        }),
      ]);
      this.stacksDeps = await this.stacksProm;
    } else {
      this.stacksDeps = await this.stacksProm;
    }
  };

  editorDidMount = async (editor) => {
    // eslint-disable-next-line no-console
    console.log("editorDidMount", editor, editor.getValue(), editor.getModel());
    this.editor = editor;
    this.fetchStacksDependencies();
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
