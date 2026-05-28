"""
Evaluator service - Integrates with Google Gemini API for code evaluation.
"""

import json
import os
import sys
from typing import Dict, Any
from google.genai import Client
from pydantic import BaseModel
from app.models.evaluation_request import EvaluationRequest
from app.models.evaluation_response import EvaluationResponse


def get_best_model(client: Client) -> str:
    """
    Dynamically resolve the best available Gemini model using the new SDK.
    
    Queries the API for available models and returns the best candidate based on:
    1. Models with 'flash' in the name (preferred for speed/cost)
    2. Models with 'pro' in the name (fallback for capability)
    3. First model that supports generateContent (last resort)
    
    Args:
        client: The initialized Client instance
        
    Returns:
        str: The name of the best available model that supports generateContent
        
    Raises:
        ValueError: If no models supporting generateContent are available
    """
    # List of models to try in order of preference
    # Use model names that are commonly available across API versions
    models_to_try = [
        "gemini-2.0-flash-latest",
        "gemini-1.5-flash-latest", 
        "gemini-1.5-pro-latest",
        "gemini-2.0-flash",
        "gemini-1.5-flash",
        "gemini-1.5-pro",
        "gemini-pro-vision",
        "gemini-pro",
    ]
    
    try:
        # Try to list available models
        models = client.models.list()
        
        # Extract model names and filter for generateContent support
        available_models = []
        for model in models:
            try:
                model_name = None
                if hasattr(model, 'name'):
                    model_name = model.name
                elif hasattr(model, 'id'):
                    model_name = model.id
                else:
                    model_name = str(model)
                
                # Check if model supports generateContent
                if hasattr(model, 'supported_generation_methods'):
                    if 'generateContent' in model.supported_generation_methods:
                        available_models.append(model_name)
                else:
                    # If we can't check, assume it's available if it has a name
                    if model_name and 'gemini' in model_name.lower():
                        available_models.append(model_name)
            except Exception:
                continue
        
        if available_models:
            # Log what we found
            print(f"Available models: {available_models}")
            
            # Clean up model names (remove 'models/' prefix if present)
            available_models = [m.replace('models/', '') for m in available_models]
            
            # Priority 1: Look for flash models
            for model in available_models:
                if 'flash' in model.lower():
                    print(f"Selected flash model: {model}")
                    return model
            
            # Priority 2: Look for pro models
            for model in available_models:
                if 'pro' in model.lower():
                    print(f"Selected pro model: {model}")
                    return model
            
            # Priority 3: Return the first available model
            print(f"Selected first available model: {available_models[0]}")
            return available_models[0]
        else:
            print("Warning: No generateContent-compatible models found via list")
            
    except Exception as e:
        # If there's an error during listing, log it
        print(f"Warning: Failed to list models ({type(e).__name__}: {str(e)[:100]})")
    
    # If listing failed or returned nothing, try hardcoded models in order
    print(f"Using hardcoded model fallback, trying: {', '.join(models_to_try)}")
    return models_to_try[0]


class EvaluatorService:
    """Service for evaluating code submissions using Gemini API."""
    
    def __init__(self):
        """Initialize the Gemini client with API key from environment."""
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            error_msg = "GEMINI_API_KEY environment variable is not set"
            print(f"[ERROR] {error_msg}", file=sys.stderr)
            raise ValueError(error_msg)
        
        print(f"[DEBUG] Initializing Gemini client...", file=sys.stderr)
        # Initialize the Client with API key
        self.client = Client(api_key=api_key)
        
        # Dynamically select the best available model
        print(f"[DEBUG] Detecting best available model...", file=sys.stderr)
        self.model_name = get_best_model(self.client)
        print(f"[DEBUG] EvaluatorService initialized successfully with model: {self.model_name}", file=sys.stderr)
    
    def _create_system_prompt(self, rubric: str = None) -> str:
        """
        Create the system prompt for the evaluator with Pyxie persona.
        
        Args:
            rubric: Optional rubric criteria for evaluation
        
        Returns:
            System prompt instruction string
        """
        rubric_text = rubric if rubric else "general code quality and correctness"
        
        return f"""You are Pyxie, an expert AI code reviewer for the it girl devs platform. You are a supportive peer and a Senior Machine Learning Engineer. Address the user directly using 'you' and 'your code'. Never talk in the third person.

            STRICT TONE RULES:
            1. NO EMOJIS.
            2. NO HYPHENS. Do not use the '-' symbol anywhere in your text.
            3. NO CLICHE SLANG. Do not use bestie, slay, tea, OMG, girl, or vibes.
            4. NO AI FILLER. Do not use tapestry, testament, unveil, delve, harness, elevate, synergy, robust, transformative, optimal, seamless, or intricate.
            5. Speak directly to the user. Say 'You loaded the data' instead of 'The student loaded the data'.
            6. Keep sentences short and punchy. Maximum three sentences per field.

            YOUR MISSION:
            Evaluate the user's Python code against this rubric: {rubric_text}

            EVALUATION LOGIC AND JSON FORMAT:
            If the code meets all requirements dynamically without hardcoding:
            - status: MUST strictly be the exact string "PASS"
            - score: 100
            - review: Two short sentences. Praise their clean code using a relatable lifestyle analogy (like a flawless skincare routine or a perfectly organized vanity).
            - metricsCheck: One short sentence confirming their exact math or logic is correct.

            If the code fails, uses wrong columns, or hardcodes answers:
            - status: MUST strictly be the exact string "TRY_AGAIN"
            - score: Give a score below 80.
            - review: Two short sentences. Point out their exact error (like a KeyError or hardcoding). Use an analogy to explain why it broke (like applying setting spray before foundation) and guide them to the fix.
            - metricsCheck: One short sentence stating the direct technical error."""
                    
        
    def evaluate_code(self, request: EvaluationRequest) -> EvaluationResponse:
        """
        Evaluate submitted code using Gemini API.
        
        Args:
            request: EvaluationRequest containing code and execution metrics
            
        Returns:
            EvaluationResponse with structured evaluation results
            
        Raises:
            ValueError: If the API response cannot be parsed as valid JSON
            Exception: If there's an error calling the Gemini API
        """
        system_prompt = self._create_system_prompt()
        
        # Construct the evaluation prompt
        user_prompt = f"""Please evaluate the following Python code submission:

Module: {request.moduleId}
Lesson: {request.lessonId}

Code:
```python
{request.fullCode}
```

Execution Output:
```
{request.executionOutput}
```

Provide your evaluation as a JSON object following the schema specified."""
        
        try:
            print(f"[DEBUG] Starting evaluation for {request.moduleId}/{request.lessonId}", file=sys.stderr)
            print(f"[DEBUG] Model: {self.model_name}", file=sys.stderr)
            
            # Combine system prompt with user prompt into a single message
            combined_prompt = f"{system_prompt}\n\n{user_prompt}"
            
            print(f"[DEBUG] Calling Gemini API with combined text prompt...", file=sys.stderr)
            
            # Call Gemini API with simplest possible approach - direct text generation
            # Don't use any config objects - just pass the text and model
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=combined_prompt,
                config=None  # Explicitly disable config to prevent SDK from adding unsupported fields
            )
            
            print(f"[DEBUG] API response received", file=sys.stderr)
            response_text = response.text
            print(f"[DEBUG] Response text length: {len(response_text)} chars", file=sys.stderr)
            
            # Parse JSON response from the model
            # Handle potential markdown formatting (```json ... ```)
            if "```json" in response_text:
                json_str = response_text.split("```json")[1].split("```")[0].strip()
            elif "```" in response_text:
                json_str = response_text.split("```")[1].split("```")[0].strip()
            else:
                json_str = response_text.strip()
            
            print(f"[DEBUG] Extracted JSON successfully", file=sys.stderr)
            
            # Parse the JSON
            evaluation_data: Dict[str, Any] = json.loads(json_str)
            print(f"[DEBUG] JSON parsed: status={evaluation_data.get('status')}, score={evaluation_data.get('score')}", file=sys.stderr)
            
            # Validate and create response model
            result = EvaluationResponse(
                status=evaluation_data.get("status", "TRY_AGAIN"),
                score=int(evaluation_data.get("score", 0)),
                review=evaluation_data.get("review", ""),
                metricsCheck=evaluation_data.get("metricsCheck", "")
            )
            print(f"[DEBUG] Response model created successfully", file=sys.stderr)
            return result
            
        except json.JSONDecodeError as e:
            print(f"[ERROR] JSON parse error: {e}", file=sys.stderr)
            print(f"[ERROR] Could not parse response text", file=sys.stderr)
            raise ValueError(f"Failed to parse Gemini response as JSON: {e}")
        except Exception as e:
            print(f"[ERROR] Evaluation error: {type(e).__name__}: {str(e)}", file=sys.stderr)
            import traceback
            traceback.print_exc(file=sys.stderr)
            raise Exception(f"Error during code evaluation: {str(e)}")
