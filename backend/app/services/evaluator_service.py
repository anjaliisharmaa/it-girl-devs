"""
Evaluator service - Integrates with Google Gemini API for code evaluation.
"""

import json
import os
from typing import Dict, Any
import google.generativeai as genai
from app.models.evaluation_request import EvaluationRequest
from app.models.evaluation_response import EvaluationResponse


class EvaluatorService:
    """Service for evaluating code submissions using Gemini API."""
    
    def __init__(self):
        """Initialize the Gemini client with API key from environment."""
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY environment variable is not set")
        
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel("gemini-1.5-flash")
    
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
            # Call Gemini API
            response = self.model.generate_content(user_prompt)
            response_text = response.text
            
            # Parse JSON response from the model
            # Handle potential markdown formatting (```json ... ```)
            if "```json" in response_text:
                json_str = response_text.split("```json")[1].split("```")[0].strip()
            elif "```" in response_text:
                json_str = response_text.split("```")[1].split("```")[0].strip()
            else:
                json_str = response_text.strip()
            
            # Parse the JSON
            evaluation_data: Dict[str, Any] = json.loads(json_str)
            
            # Validate and create response model
            return EvaluationResponse(
                status=evaluation_data.get("status", "TRY_AGAIN"),
                score=int(evaluation_data.get("score", 0)),
                review=evaluation_data.get("review", ""),
                metricsCheck=evaluation_data.get("metricsCheck", "")
            )
            
        except json.JSONDecodeError as e:
            raise ValueError(f"Failed to parse Gemini response as JSON: {e}")
        except Exception as e:
            raise Exception(f"Error during code evaluation: {str(e)}")
