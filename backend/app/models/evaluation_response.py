"""
Evaluation response model - defines the schema for AI evaluation results.
"""

from pydantic import BaseModel, Field
from typing import Literal


class EvaluationResponse(BaseModel):
    """
    Response model for code evaluation results.
    
    Attributes:
        status: Pass/Fail status - strictly "PASS" or "TRY_AGAIN"
        score: Numerical score from 0-100
        review: Brief code review feedback
        metricsCheck: Analysis of execution metrics and output
    """
    
    status: Literal["PASS", "TRY_AGAIN"] = Field(..., description="Evaluation status: PASS or TRY_AGAIN")
    score: int = Field(..., ge=0, le=100, description="Score from 0 to 100")
    review: str = Field(..., description="Brief code review and feedback")
    metricsCheck: str = Field(..., description="Analysis of execution metrics and output")
    
    class Config:
        json_schema_extra = {
            "example": {
                "status": "PASS",
                "score": 85,
                "review": "Good use of NumPy arrays. Consider adding comments to explain the calculation.",
                "metricsCheck": "Code executed successfully with expected output. Mean calculation correct."
            }
        }
