import React from "react";
import MarkdownEditor from "./MarkdownEditor";

const App = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{
        textAlign: "center",
        color:"white"
      }}>Markdown to PDF Converter</h1>
      <MarkdownEditor />
    </div>
  );
};

export default App;
