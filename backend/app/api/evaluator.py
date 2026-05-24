"""
Evaluator API routes - POST endpoint for code evaluation.
"""

import sys
from fastapi import APIRouter, HTTPException, status
from app.models.evaluation_request import EvaluationRequest
from app.models.evaluation_response import EvaluationResponse
from app.services.evaluator_service import EvaluatorService

# Create router
router = APIRouter(prefix="/evaluate", tags=["evaluator"])

# Initialize evaluator service
evaluator_service = EvaluatorService()


@router.post("/vibe-check", response_model=EvaluationResponse, status_code=status.HTTP_200_OK)
async def vibe_check(request: EvaluationRequest) -> EvaluationResponse:
    """
    Evaluate a user's code submission using AI.
    
    This endpoint receives code and execution metrics, sends them to the Gemini API,
    and returns a structured evaluation including status, score, code review, and metrics analysis.
    
    Args:
        request: EvaluationRequest with moduleId, lessonId, fullCode, and executionOutput
        
    Returns:
        EvaluationResponse with status, score, review, and metricsCheck
        
    Raises:
        HTTPException: If evaluation fails or API key is not configured
    """
    try:
        print(f"[DEBUG] Received vibe-check request", file=sys.stderr)
        print(f"[DEBUG] Module: {request.moduleId}, Lesson: {request.lessonId}", file=sys.stderr)
        print(f"[DEBUG] Code length: {len(request.fullCode)} chars", file=sys.stderr)
        print(f"[DEBUG] Output length: {len(request.executionOutput)} chars", file=sys.stderr)
        
        # Validate that required fields are not empty
        if not request.fullCode.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Code submission cannot be empty"
            )
        
        # Call evaluator service
        print(f"[DEBUG] Calling evaluator service...", file=sys.stderr)
        evaluation = evaluator_service.evaluate_code(request)
        print(f"[DEBUG] Evaluation complete: {evaluation}", file=sys.stderr)
        
        return evaluation
        
    except HTTPException:
        raise
    except ValueError as e:
        print(f"[ERROR] ValueError: {str(e)}", file=sys.stderr)
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=f"Invalid evaluation response: {str(e)}"
        )
    except Exception as e:
        error_msg = f"Code evaluation failed: {str(e)}"
        print(f"[ERROR] {error_msg}", file=sys.stderr)
        import traceback
        traceback.print_exc(file=sys.stderr)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=error_msg
        )
