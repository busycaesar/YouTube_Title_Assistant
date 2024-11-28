import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { getTitleSuggestions } from "./lib";

interface FormData {
  videoLink: string;
}

function App() {
  const { register, handleSubmit } = useForm<FormData>();
  const [suggestedTitles, setSuggestedTitles] = useState("");

  const submitForm: SubmitHandler<FormData> = async (data: FormData) => {
    // Make sure it is a youtube link.
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=)?[a-zA-Z0-9_-]{11}/;

    if (!data?.videoLink || !youtubeRegex.test(data.videoLink)) return;

    // Call the API to get the title suggestions.
    let titleSuggestions: string = await getTitleSuggestions(data.videoLink);

    titleSuggestions = titleSuggestions.replace(/\n/g, "<br>");

    // Set the title suggestions.
    setSuggestedTitles(titleSuggestions);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit(submitForm)}>
        Paste YouTube Video Link
        <Row>
          <Col>
            <input {...register("videoLink")} />
          </Col>
          <Col>
            <Button type="submit">Get Suggestions</Button>
          </Col>
        </Row>
      </form>

      <div dangerouslySetInnerHTML={{ __html: suggestedTitles }} />
    </div>
  );
}

export default App;
