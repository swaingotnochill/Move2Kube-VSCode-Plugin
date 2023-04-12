import React, { useEffect, useState } from "react";
import "../App.css";
import "../media/reset.css";
import "../media/vscode.css";
import { vscode } from "../utilities/vscode";
import { Button } from "@mui/material";

interface FormValues {
  filePath: string;
  stringInput: string;
  booleanInput: boolean;
}

const TransformForm: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    filePath: "",
    stringInput: "",
    booleanInput: false,
  });

  const [selectedFolderPath, setSelectedFolderPath] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // const handleFolderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files;
  //   if (files && files.length > 0) {
  //     const folderPath = files[0].webkitRelativePath.split("/")[0];
  //     setSelectedFolderPath(folderPath);
  //     setFormValues({
  //       ...formValues,
  //       filePath: folderPath,
  //     });
  //   }

  //   console.log(selectedFolderPath);
  // };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    vscode.postMessage({
      command: "form",
      text: formValues,
    });
  };

  const handleOpenFolderDialog = () => {
    vscode.postMessage({
      command: "folder",
    });
  };

  useEffect(() => {
    const handleMessage = (event: MessageEvent<any>) => {
      const message = event.data;
      if (message.command === "folderSelected") {
        setSelectedFolderPath(message.folderPath);
        setFormValues({
          ...formValues,
          filePath: message.folderPath,
        });
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [formValues]);

  return (
    <div className="TransformForm">
      <h1>TransformForm</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="filePath">File path:</label>
        <button type="button" onClick={handleOpenFolderDialog}>
          Select Folder
        </button>
        {selectedFolderPath}

        <Button variant="outlined" onClick={handleOpenFolderDialog}>
          Folder
        </Button>
        <br />
        <label htmlFor="stringInput">String input:</label>
        <input
          type="text"
          id="stringInput"
          name="stringInput"
          value={formValues.stringInput}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="booleanInput">Boolean input:</label>
        <input
          type="checkbox"
          id="booleanInput"
          name="booleanInput"
          checked={formValues.booleanInput}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TransformForm;
