# It-Girl Devs Backend - AI Code Evaluator

## Overview

The backend is a **FastAPI** application that integrates with Google's **Gemini 1.5 Flash** API to provide AI-powered code evaluation. Users submit Python code along with execution metrics, and the API returns structured feedback including a pass/fail status, score, code review, and execution metrics analysis.

---

## Directory Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── api/
│   │   ├── __init__.py
│   │   └── evaluator.py          # POST /evaluate/vibe-check endpoint
│   ├── models/
│   │   ├── __init__.py
│   │   ├── evaluation_request.py  # Request schema (Pydantic)
│   │   └── evaluation_response.py # Response schema (Pydantic)
│   └── services/
│       ├── __init__.py
│       └── evaluator_service.py   # Gemini API integration logic
├── main.py                         # FastAPI app entry point
├── requirements.txt                # Python dependencies
├── .env.example                    # Environment variables template
└── venv/                          # Python virtual environment
```

---

## Components Explained

### 1. **Models** (`app/models/`)

#### `evaluation_request.py`
Defines the incoming request schema:
```python
class EvaluationRequest(BaseModel):
    moduleId: str          # e.g., "regression"
    lessonId: str          # e.g., "simple-linear-regression"
    fullCode: str          # The Python code to evaluate
    executionOutput: str   # Output from running the code
```

#### `evaluation_response.py`
Defines the outgoing response schema:
```python
class EvaluationResponse(BaseModel):
    status: Literal["PASS", "TRY_AGAIN"]  # Pass/Fail decision
    score: int             # 0-100 score
    review: str            # Brief code review feedback
    metricsCheck: str      # Analysis of execution metrics
```

---

### 2. **Services** (`app/services/`)

#### `evaluator_service.py`
Contains the `EvaluatorService` class which:
- **Initializes Gemini client** from the `GEMINI_API_KEY` environment variable
- **Creates system prompt** that instructs the model to act as a coding instructor
- **Sends requests** to Gemini 1.5 Flash API
- **Parses JSON responses** from the model (handles markdown code blocks)
- **Returns validated responses** using the `EvaluationResponse` Pydantic model

Key method:
```python
def evaluate_code(self, request: EvaluationRequest) -> EvaluationResponse
```

---

### 3. **API Routes** (`app/api/`)

#### `evaluator.py`
Defines the FastAPI router with the evaluation endpoint:

**Endpoint:** `POST /evaluate/vibe-check`

**Request Body:**
```json
{
  "moduleId": "regression",
  "lessonId": "simple-linear-regression",
  "fullCode": "import numpy as np\n\nx = np.array([1, 2, 3])\nprint(f'Mean: {np.mean(x)}')",
  "executionOutput": "Mean: 2.0"
}
```

**Response (200 OK):**
```json
{
  "status": "PASS",
  "score": 85,
  "review": "Good use of NumPy arrays. Consider adding comments to explain the calculation.",
  "metricsCheck": "Code executed successfully with expected output. Mean calculation correct."
}
```

**Error Responses:**
- **400**: Code submission is empty
- **422**: Invalid evaluation response from Gemini
- **500**: Evaluation failed (missing API key, API error, etc.)

---

### 4. **Main Application** (`main.py`)

The FastAPI application entry point that:
- Loads environment variables from `.env` file
- Configures CORS middleware with allowed origins
- Includes the evaluator router
- Provides health check endpoints:
  - `GET /` - Root health check
  - `GET /health` - Monitoring health check

---

## 🚀 Setup & Running

### Prerequisites
- Python 3.8+
- Virtual environment created (already done: `backend/venv/`)
- Dependencies installed (already done via `pip install -r requirements.txt`)

### 1. Activate Virtual Environment

**Windows (PowerShell):**
```bash
cd backend
.\venv\Scripts\activate
```

**macOS/Linux:**
```bash
cd backend
source venv/bin/activate
```

### 2. Configure Environment Variables

**Copy the template:**
```bash
copy .env.example .env  # Windows
cp .env.example .env    # macOS/Linux
```

**Edit `.env` and add your Gemini API key:**
```
GEMINI_API_KEY=your_actual_gemini_api_key_here
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
ENVIRONMENT=development
DEBUG=True
SECRET_KEY=your_secret_key_here
```

**Where to get the Gemini API key:**
- Visit: https://makersuite.google.com/app/apikey
- Create/copy your API key
- Paste into `.env`

### 3. Start the Server

```bash
uvicorn main:app --reload
```

**Output:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Application startup complete
```

---

## API Documentation

### Interactive API Documentation

Once the server is running, access the interactive docs:

- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

These provide full API documentation and allow testing endpoints directly.

### Testing the Endpoint

**Using cURL:**
```bash
curl -X POST "http://localhost:8000/evaluate/vibe-check" \
  -H "Content-Type: application/json" \
  -d '{
    "moduleId": "regression",
    "lessonId": "simple-linear-regression",
    "fullCode": "import numpy as np\nx = np.array([1, 2, 3])\nprint(f\"Mean: {np.mean(x)}\")",
    "executionOutput": "Mean: 2.0"
  }'
```

**Using Python requests:**
```python
import requests

url = "http://localhost:8000/evaluate/vibe-check"
payload = {
    "moduleId": "regression",
    "lessonId": "simple-linear-regression",
    "fullCode": "import numpy as np\nx = np.array([1, 2, 3])\nprint(f'Mean: {np.mean(x)}')",
    "executionOutput": "Mean: 2.0"
}

response = requests.post(url, json=payload)
print(response.json())
```

---

## Connecting from Frontend

The frontend (Next.js) can call the evaluator endpoint:

```typescript
// example: frontend API call
const response = await fetch('http://localhost:8000/evaluate/vibe-check', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    moduleId: 'regression',
    lessonId: 'simple-linear-regression',
    fullCode: userSubmittedCode,
    executionOutput: codeExecutionResult
  })
});

const evaluation = await response.json();
```

---

## Key Dependencies

From `requirements.txt`:

| Package | Purpose |
|---------|---------|
| `fastapi==0.109.0` | Web framework |
| `uvicorn[standard]==0.27.0` | ASGI server |
| `pydantic==2.5.3` | Data validation |
| `google-generativeai==0.3.2` | Gemini API client |
| `python-dotenv==1.0.0` | Environment variable loading |
| `httpx==0.26.0` | HTTP client |
| `python-multipart==0.0.6` | Form data parsing |

---

## AI System Prompt

The evaluator uses a standard, simple system prompt (located in `app/services/evaluator_service.py`):

```
You are a helpful coding instructor. Evaluate the provided Python code 
and its execution metrics. Return your response strictly as a JSON object 
with: status, score, review, and metricsCheck.
```

This prompt can be refined later to add personality and tone specific to It-Girl Devs.

---

## Troubleshooting

### Issue: `GEMINI_API_KEY not set`
**Solution:** Ensure your `.env` file exists in the `backend/` folder and contains `GEMINI_API_KEY=your_key_here`

### Issue: `ModuleNotFoundError: No module named 'google.generativeai'`
**Solution:** Run `pip install -r requirements.txt` to install dependencies

### Issue: `Connection refused on http://localhost:8000`
**Solution:** Ensure the server is running with `uvicorn main:app --reload`

### Issue: CORS errors from frontend
**Solution:** Update `ALLOWED_ORIGINS` in `.env` to include your frontend URL

---

## Development Notes

### Error Handling
The evaluator service includes comprehensive error handling:
- JSON parsing errors from Gemini API
- Missing API key errors
- Empty code submission validation
- Pydantic validation for request/response schemas

### Response Validation
Both request and response models use Pydantic for automatic validation and documentation.

### Logging
For debugging, enable FastAPI logging:
```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

---

## Data Flow

```
Frontend (Code + Output)
         ↓
POST /evaluate/vibe-check
         ↓
app/api/evaluator.py (Route Handler)
         ↓
app/services/evaluator_service.py (EvaluatorService.evaluate_code)
         ↓
Google Gemini 1.5 Flash API
         ↓
JSON Response Parsing
         ↓
Validation (Pydantic)
         ↓
POST Response → Frontend
```

---

## Future Enhancements

- Add personality/tone to system prompt
- Add response logging/analytics
- Implement response caching for identical submissions
- Add rate limiting per user/module
- Add integration tests
- Add monitoring/metrics

---

**Status:** Ready for development  
**Framework:** FastAPI + Gemini 1.5 Flash  
**Last Updated:** May 2026
