from dotenv import load_dotenv
from openai import OpenAI


def get_openai_client():
    if not hasattr(get_openai_client, "client"):
        load_dotenv()
        get_openai_client.client = OpenAI()
    return get_openai_client.client