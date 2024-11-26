export const getTitleSuggestions = async (
  videoLink: string
): Promise<string> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/title/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Fix: Specify JSON content type
        },
        body: JSON.stringify({
          video_link: videoLink,
        }),
      }
    );

    const { success, message, data } = await response.json();

    if (!success) throw new Error(message);

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) console.log(error.message);
    return "";
  }
};
