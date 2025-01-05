import React, { useRef, useState } from "react";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import "./App.css";

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState("");
  const link = useRef()

  // Function to convert Markdown to sanitized HTML
  const convertMarkdownToHtml = (markdownText) => {
    const rawHtml = marked(markdownText, { breaks: true });
    return sanitizeHtml(rawHtml, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["h1", "h2"]),
    });
  };

  // Function to trigger printing the rendered HTML
  const printToPdf = (type) => {
      const htmlContent = convertMarkdownToHtml(markdown);
    if(type == "html"){
      const blob = new Blob(
        [
          ` <!DOCTYPE html>
      <html>
        <head>
          <title>Markdown to PDF</title>
          <style>
          @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
            body {
              font-family: "Roboto", serif;
              margin: 20px;
                  width: 60%;
                  padding: 40px;
    margin: auto;
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `,
        ],
        { type: "text/html" }
      );

      // Set the href to the Blob URL
      link.current.href = URL.createObjectURL(blob);

      // Set the download attribute with a filename
      link.current.download = "markdown-output.html";

      // Trigger the download
      link.current.click();
      // printWindow.close();
    }
    else{
      const printWindow = window.open("", "_blank");
    
      printWindow.document.open();
      printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Markdown to PDF</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();

      // printWindow.document.close();
    }
   

     
  };

  return (
    <div className="container">
      <a ref={link}></a>
      <div className="markdown">
        <h1 style={{ color: "white" }}>Markdown</h1>
        <textarea
          placeholder="Enter Markdown here..."
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          style={{ height: "350px", marginBottom: "20px" }}
        />
      </div>
      <div className="preview">
        <h1 style={{ color: "white" }}>Preview</h1>
        <div
          style={{
            border: "3px dotted darkgray",
            padding: "80px 180px",
            backgroundColor: "#f9f9f9",
            marginBottom: "20px",

            minHeight: "100px",
            borderRadius: "4px",
            overflow: "auto",
          }}
          dangerouslySetInnerHTML={{
            __html: convertMarkdownToHtml(markdown),
          }}
        />
        <div
          style={{
            textAlign: "center",
          }}
        >
          <button
            onClick={()=>printToPdf("pdf")}
            style={{
              padding: "10px 20px",
              backgroundColor: "orange",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginRight:"10px"
            }}
          >
            Export to PDF
          </button>
          <button
            onClick={() => printToPdf("html")}
            style={{
              padding: "10px 20px",
              backgroundColor: "red",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Export to HTML
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
