"""
Evaluation request model - defines the schema for incoming code submission requests.
"""

from pydantic import BaseModel, Field


class EvaluationRequest(BaseModel):
    """
    Request model for code evaluation.
    
    Attributes:
        moduleId: The module identifier for the lesson
        lessonId: The lesson identifier within the module
        fullCode: The complete user-submitted Python code
        executionOutput: The output from executing the code (stdout/stderr)
    """
    
    moduleId: str = Field(..., description="Module identifier")
    lessonId: str = Field(..., description="Lesson identifier")
    fullCode: str = Field(..., description="Complete Python code submission")
    executionOutput: str = Field(..., description="Output from code execution")
    
    class Config:
        json_schema_extra = {
            "example": {
                "moduleId": "regression",
                "lessonId": "simple-linear-regression",
                "fullCode": "import numpy as np\n\nx = np.array([1, 2, 3])\ny = np.array([2, 4, 6])\n\nprint(f'Mean: {np.mean(x)}')",
                "executionOutput": "Mean: 2.0"
            }
        }
