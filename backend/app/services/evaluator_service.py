"""
Evaluator service - Integrates with Google Gemini API for code evaluation.
"""

import json
import os
import sys
from typing import Dict, Any
from google.genai import Client
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
    
    def _create_system_prompt(self) -> str:
        """
        Create the system prompt for the evaluator.
        
        Returns:
            System prompt instruction string
        """
        return """You are a helpful coding instructor. Evaluate the provided Python code and its execution metrics. 

Your evaluation should:
1. Check if the code is correct and produces expected output
2. Assess code quality, readability, and best practices
3. Analyze the execution metrics to ensure the code runs properly
4. Provide constructive feedback

Return your response strictly as a JSON object with this exact schema:
{
    "status": "PASS" or "TRY_AGAIN",
    "score": <integer between 0-100>,
    "review": "<brief code review with specific feedback>",
    "metricsCheck": "<brief analysis of execution metrics and output>"
}

Guidelines:
- status should be "PASS" if the code is correct and runs as expected
- status should be "TRY_AGAIN" if there are errors or the output is incorrect
- score should reflect overall code quality (0-100 scale)
- review should be 1-2 sentences with specific, actionable feedback
- metricsCheck should be 1-2 sentences analyzing the execution output"""
    
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
