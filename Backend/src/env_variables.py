import os
from dotenv import load_dotenv

load_dotenv()

port = os.getenv("PORT")
gemini_api_keys = os.getenv("GEMINI_API_KEY")