import React, { useState, useRef, useEffect } from "react";

interface Move2KubeFormProps {
  onRun: (options: Record<string, string>) => void;
}

export const Move2KubeForm: React.FC<Move2KubeFormProps> = ({ onRun }) => {
  const [name, setName] = useState("");
  const [source, setSource] = useState("");
  const sourceInputRef = useRef<HTMLInputElement>(null);
  const outInputRef = useRef<HTMLInputElement>(null);
  const [output, setOutput] = useState("");

  useEffect(() => {
    if (sourceInputRef.current) {
      sourceInputRef.current.setAttribute("webkitdirectory", "");
    }

    if (outInputRef.current) {
      outInputRef.current.setAttribute("webkitdirectory", "");
    }
  }, []);

  // Add more state variables for other fields
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const options: Record<string, string> = {
      name,
      source,
      output,
      // Add other fields
    };
    onRun(options);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Project Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Source Directory:
        <input
          type="file"
          ref={sourceInputRef}
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
      </label>
      <label>
        Output Directory:
        <input
          type="file"
          ref={outInputRef}
          value={output}
          onChange={(e) => setOutput(e.target.value)}
        />
      </label>
      {/* Add other input fields for other flags */}
      <button type="submit">Run</button>
    </form>
  );
};
