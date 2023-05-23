import React from "react";
import { createRoot } from "react-dom/client";
import { CodeEditor } from "./components/code-editor";

class App extends React.Component {
  render() {
    let code = `import { StacksMainnet } from "@stacks/network";
import { StackingClient } from "@stacks/stacking";

const network = new StacksMainnet();
const client = new StackingClient("", network);

const periodInfo = await client.getPoxOperationInfo();
console.log("🦁", periodInfo);`;

    return (
      <div>
        <h2>Monaco Editor Sample (controlled mode)</h2>
        <CodeEditor code={code} />
        <hr />
      </div>
    );
  }
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
