from langchain_community.document_loaders import YoutubeLoader

def get_video_transcript(video_link):
    # Initiate the loader with the video url.
    youtube_video_loader = YoutubeLoader.from_youtube_url(video_link)
    # Trigger the loader to get the video transcript.
    youtube_video_transcript = youtube_video_loader.load()

    return youtube_video_transcript