from langchain_google_genai import ChatGoogleGenerativeAI
from env_variables import gemini_api_keys

def generate_response(prompt_template, input_variables, gemini_api_keys_by_api_call):
    
    # Get Gemini's API Keys either from environment variables or from API call.
    model_api_keys = gemini_api_keys_by_api_call if not gemini_api_keys else gemini_api_keys

    if not model_api_keys: return "Gemini API Keys not provided."

    # Initiate LLM by passing the API Keys.
    llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", google_api_key=model_api_keys)

    # Chain the template and instance
    chain = prompt_template | llm

    # Invoke the chain by passing the input variables for the prompt template
    response = chain.invoke(input_variables)

    # Return the response
    return response.content