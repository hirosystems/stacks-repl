import React from "react";
import { createRoot } from "react-dom/client";
import { CodeEditor } from "./components/code-editor";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      code: "// Add some code",
    };
  }

  async componentDidMount() {
    await this.getCode("/stuff");
  }

  getCode = async (route) => {
    const response = await fetch(route);
    const { data: code } = await response.json();
    this.setState({ code });
  };

  render() {
    return (
      <div>
        <h2>Monaco Editor Sample (controlled mode)</h2>
        <CodeEditor key={this.state.code} code={this.state.code} />
        <hr />
      </div>
    );
  }
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
