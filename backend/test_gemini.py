import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load your .env file
load_dotenv()

# Configure the API key
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

print("Searching for available models for your API key...")

try:
    # 1. Print all valid 1.5 models you have access to
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods and '1.5' in m.name:
            print(f"Found: {m.name}")

    # 2. Test the universally supported Flash version
    print("\nTesting 'gemini-1.5-flash'...")
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content("Say exactly: 'The It-Girl Devs API is officially operational! 💅'")
    print(f"\nSUCCESS! The AI says: {response.text}")

except Exception as e:
    print(f"\nERROR: {e}")