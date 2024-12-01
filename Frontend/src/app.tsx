import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { getTitleSuggestions } from "./lib";
import { FormData, Suggestions } from "./interface";
import { FaRegCopy } from "react-icons/fa";

function App() {
  const { register, handleSubmit } = useForm<FormData>();
  const [suggestedTitles, setSuggestedTitles] = useState("");
  const [suggestedKeywords, setSuggestedKeywords] = useState("");
  const [suggestedDescription, setSuggestedDescription] = useState("");

  const submitForm: SubmitHandler<FormData> = async (data: FormData) => {
    // Make sure it is a youtube link.
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/(watch\?v=)?[a-zA-Z0-9_-]{11}/;

    if (!data?.videoLink || !youtubeRegex.test(data.videoLink)) return;

    // Call the API to get the title suggestions.
    const suggestions: Suggestions = await getTitleSuggestions(data.videoLink);

    const title = suggestions.title.replace(/\n/g, "<br>");

    const keywords = suggestions.keywords.replace(/\n/g, "<br>");

    const description = suggestions.description.replace(/\n/g, "<br>");

    // Set the title suggestions.
    setSuggestedTitles(title);
    setSuggestedKeywords(keywords);
    setSuggestedDescription(description);
  };

  return (
    <div className="App">
      <h1 className="text-center">Paste YouTube Video's Link</h1>
      <form className="my-3 text-center" onSubmit={handleSubmit(submitForm)}>
        <input className="mx-2" {...register("videoLink")} />

        <Button className="mx-2" type="submit">
          Get Suggestions
        </Button>
      </form>

      {suggestedDescription && (
        <>
          <h2>Suggested Description</h2>
          <div
            className="text-start my-4 text-3xl"
            dangerouslySetInnerHTML={{ __html: suggestedDescription }}
          />
        </>
      )}

      {suggestedTitles && (
        <>
          <h2>Suggested Titles</h2>
          <div
            className="text-start my-4 text-3xl"
            dangerouslySetInnerHTML={{ __html: suggestedTitles }}
          />
        </>
      )}

      {suggestedKeywords && (
        <>
          <h2>Suggested Keywords</h2>
          <div
            className="text-start my-4 text-3xl"
            dangerouslySetInnerHTML={{ __html: suggestedKeywords }}
          />
        </>
      )}
    </div>
  );
}

export default App;
