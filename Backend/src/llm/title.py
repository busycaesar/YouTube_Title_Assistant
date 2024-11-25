from langchain.prompts import PromptTemplate
from .llm import generate_response
from langchain_community.document_loaders import YoutubeLoader

def get_video_transcript(video_link):
    # Initiate the loader with the video url.
    youtube_video_loader = YoutubeLoader.from_youtube_url(video_link)
    # Trigger the loader to get the video transcript.
    youtube_video_transcript = youtube_video_loader.load()

    return youtube_video_transcript

def get_title_suggestions(video_link, gemini_api_keys):
    # Get the transcript of the video.
    video_transcript = get_video_transcript(video_link)

    # Initiate a prompt template.
    prompt_template = PromptTemplate(
        input_variables=["video_transcript"],
        template="""
        Given the following transcript of a video, generate 5 catchy and SEO-friendly titles that are relevant to the video content. The titles should capture the essence of the video, making viewers interested to watch without being misleading or clickbait, unless specified. Please ensure the titles include high-performing keywords for SEO optimization and are aligned with the topic of the video.

        Video Transcript: {video_transcript}
        """
        )

    # Call the function to generate the response by passing the prompt template and input variables.
    generated_response = generate_response(
            prompt_template, 
            { "video_transcript": video_transcript },
            gemini_api_keys
        )
    
    # Return the generated response.
    return generated_response