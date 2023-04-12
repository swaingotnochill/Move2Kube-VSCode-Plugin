import { vscode } from "./utilities/vscode";
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import "./App.css";
import TransformForm from "./components/TransformForm";

function App() {
  return (
    <main>
      <TransformForm />
    </main>
  );
}

export default App;
