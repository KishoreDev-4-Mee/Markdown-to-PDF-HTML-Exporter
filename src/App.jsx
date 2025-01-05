import React from "react";
import MarkdownEditor from "./MarkdownEditor";

const App = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1
        style={{
          textAlign: "center",
          color: "white",
        }}
      >
        Markdown to PDF/HTML Converter
      </h1>
      <hr
        style={{
          color: "gray",
          width:"50%"
        }}
      />
      <p
        style={{
          width: "50%",
          textAlign: "center",
          margin: "auto",
          color: "white",
          lineHeight:"30px"
        }}
      >
        {" "}
        A simple and powerful React-based tool designed to help you build and export your CV in beautifully formatted
        PDFs or HTML files directly from Markdown.
      </p>
      <MarkdownEditor />
    </div>
  );
};

export default App;
