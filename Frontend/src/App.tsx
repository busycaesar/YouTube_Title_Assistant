import React from "react";
import { Button } from "react-bootstrap";

function App() {
  const temp = () => {
    console.log("Print");
  };

  return (
    <div className="App">
      Paste YouTube Video Link
      <input />
      <Button onClick={temp}>Get Title Suggestions</Button>
    </div>
  );
}

export default App;
