'use client';

import { useState, useRef } from 'react';
import Script from 'next/script';
import { useEffect } from 'react';

type Cell = {
  id: number;
  code: string;
  output: string;
};

type VibeCheckResult = {
  status: 'PASS' | 'TRY_AGAIN';
  score: number;
  review: string;
  metricsCheck: string;
} | null;

interface PyxieProps {
  datasetFile?: string;
}

export default function EvaluatorTest({ datasetFile }: PyxieProps) {
  const [isReady, setIsReady] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('Booting up Python...');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [vibeCheckResult, setVibeCheckResult] = useState<VibeCheckResult>(null);
  
  const pyodideRef = useRef<any>(null);

  const [cells, setCells] = useState<Cell[]>([
    { 
      id: 1, 
      code: "# Let's import our toolkit\nimport numpy as np\nimport pandas as pd\nprint('Libraries loaded!')", 
      output: "" 
    },
    { 
      id: 2, 
      code: "# Training our first browser-based ML model!\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_squared_error, r2_score\n\n# Our messy real-life data\nskincare_hours = np.array([0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0]).reshape(-1, 1)\ncompliments = np.array([2, 4, 5, 7, 8, 10, 11, 13, 14, 16])\n\n# Fit the line\nbestie_bot = LinearRegression()\nbestie_bot.fit(skincare_hours, compliments)\n\n# Test accuracy\npredictions = bestie_bot.predict(skincare_hours)\nr2 = r2_score(compliments, predictions)\n\nprint(f\"R² Score: {r2:.2f}\")", 
      output: "" 
    }
  ]);

  const initPyodide = async () => {
    try {
      // @ts-ignore
      const pyodide = await window.loadPyodide();
      setLoadingStatus('Downloading ML Libraries (pandas, scikit-learn)...');
      await pyodide.loadPackage(['numpy', 'pandas', 'scipy', 'scikit-learn']);
      
      // Load custom dataset if provided
      if (datasetFile) {
        setLoadingStatus(`Loading your custom dataset (${datasetFile})...`);
        try {
          const response = await fetch(`/datasets/${datasetFile}`);
          const csvText = await response.text();
          pyodide.FS.writeFile(datasetFile, csvText);
        } catch (dataErr) {
          console.error(`Failed to load dataset ${datasetFile}:`, dataErr);
          setLoadingStatus(`Failed to load dataset`);
          return;
        }
      }
      
      // Configure pandas display settings to prevent column truncation
      try {
        await pyodide.runPythonAsync(`import pandas as pd
pd.set_option('display.max_columns', None)
pd.set_option('display.width', 1000)
pd.set_option('display.expand_frame_repr', False)`);
      } catch (configErr) {
        console.warn('Pandas config warning:', configErr);
      }
      
      pyodideRef.current = pyodide;
      setIsReady(true);
    } catch (err) {
      console.error(err);
      setLoadingStatus('Failed to load engine');
    }
  };

  const runCell = async (cellId: number) => {
    if (!pyodideRef.current) return;
    const targetCell = cells.find(c => c.id === cellId);
    if (!targetCell) return;

    updateCellOutput(cellId, 'Running...');

    try {
      let printedOutput = "";
      pyodideRef.current.setStdout({ batched: (msg: string) => { printedOutput += msg + "\n"; } });

      let result = await pyodideRef.current.runPythonAsync(targetCell.code);
      
      let finalDisplay = printedOutput;
      if (result !== undefined && result !== null) {
        finalDisplay += String(result);
      }
      
      if (finalDisplay.trim() === "") {
        finalDisplay = "Executed successfully";
      }
      
      updateCellOutput(cellId, finalDisplay.trim());
    } catch (error: any) {
      updateCellOutput(cellId, `Oops!:\n${error.message}`);
    }
  };

  const addCell = () => {
    const newCell: Cell = {
      id: Date.now(),
      code: "",
      output: ""
    };
    setCells([...cells, newCell]);
  };

  // DOM Magic: Auto-resize textarea to fit content without scrollbars
  const handleCodeChange = (id: number, e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto'; // Reset height briefly
    e.target.style.height = `${e.target.scrollHeight}px`; // Expand to fit exact text height
    
    // Update state
    setCells(cells.map(cell => cell.id === id ? { ...cell, code: e.target.value } : cell));
  };

  const updateCellOutput = (id: number, newOutput: string) => {
    setCells(cells.map(cell => cell.id === id ? { ...cell, output: newOutput } : cell));
  };

  // DOM Magic Part 2: Auto-resize on initial load!
  useEffect(() => {
    // Find all our custom textareas
    const textareas = document.querySelectorAll('.it-girl-textarea');
    textareas.forEach((ta) => {
      const el = ta as HTMLTextAreaElement;
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    });
  }, [cells.length]); // Re-runs anytime the number of cells changes

  const submitProjectForReview = async () => {
    try {
      setIsSubmitting(true);
      
      // Stitch all cell code into a single string
      const fullCode = cells.map(cell => cell.code).join('\n\n');
      
      // Stitch all cell outputs into a single string
      const executionOutput = cells
        .filter(cell => cell.output)
        .map(cell => `[Cell Output]\n${cell.output}`)
        .join('\n\n');
      
      // Prepare the payload
      const payload = {
        moduleId: 'regression',
        lessonId: 'simple-linear-regression',
        fullCode,
        executionOutput
      };
      
      // Send to backend
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/evaluate/vibe-check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        throw new Error(`Backend returned ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      setVibeCheckResult(result);
    } catch (error: any) {
      console.error('Vibe check failed:', error.message);
      setVibeCheckResult({
        status: 'TRY_AGAIN',
        score: 0,
        review: `Error: ${error.message}. Please check your backend connection.`,
        metricsCheck: 'Backend connection failed'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 mb-20 font-sans">
      <Script 
        src="https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js"
        onReady={initPyodide} 
      />

      {/* Sleek Header */}
      <div className="flex justify-between items-end mb-6 px-2">
        <div>
          <h2 className="text-3xl font-serif text-[#590D22] mb-1 tracking-tight">Pyxie</h2>
          <p className="text-pink-400 text-sm font-medium">Build your mini-project right here. Instant notes when you submit.</p>
        </div>
        {!isReady && <span className="text-xs font-mono bg-pink-100 text-pink-600 px-3 py-1 rounded-full animate-pulse">{loadingStatus}</span>}
      </div>

      {/* The Cells Wrapper */}
      <div className="space-y-6">
        {cells.map((cell) => (
          <div key={cell.id} className="flex flex-col group">
            
            {/* Dark Mode Editor */}
            <div className="relative bg-[#1E1E2E] rounded-xl shadow-lg border border-white/10 overflow-hidden focus-within:ring-2 focus-within:ring-pink-300 transition-all">
              
              {/* macOS Dots */}
              <div className="bg-[#2A2B3D] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
              </div>

              <textarea
                value={cell.code}
                onChange={(e) => handleCodeChange(cell.id, e)}
                spellCheck="false"
                className="it-girl-textarea w-full min-h-[60px] bg-transparent text-pink-50 font-mono text-[14px] p-4 outline-none overflow-hidden resize-none leading-relaxed"
                placeholder="# Write your code here..."
              />
              
              {/* Glossy SVG Play Button */}
              <button 
                onClick={() => runCell(cell.id)}
                disabled={!isReady}
                className="absolute top-10 right-3 bg-white/5 hover:bg-pink-500/90 text-pink-300 hover:text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 disabled:opacity-0 shadow-sm backdrop-blur-sm"
                title="Run Cell"
              >
                <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>

            {/* Aesthetic Output Console */}
            {cell.output && (
              <div className="mt-2 ml-4 relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-pink-200 rounded-full"></div>
                <div className="pl-4 py-2 text-[13px] font-mono text-[#590D22]/80 whitespace-pre overflow-x-auto tracking-normal leading-normal [&_*]:!leading-normal [&_*]:!my-0">
                  {cell.output}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Chic Add Cell Button */}
      <button 
        onClick={addCell}
        disabled={!isReady}
        className="mt-6 w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-pink-50 to-white hover:from-pink-100 hover:to-pink-50 text-pink-500 rounded-xl font-medium border border-pink-100 transition-all shadow-sm group disabled:opacity-50"
      >
        <span className="text-lg group-hover:scale-125 transition-transform duration-300">✨</span> 
        Add Code Block
      </button>

      {/* Premium Submit Button */}
      <button
        onClick={submitProjectForReview}
        disabled={!isReady || isSubmitting}
        className="mt-6 w-full py-3.5 px-6 bg-gradient-to-r from-pink-500 to-rose-400 hover:from-pink-600 hover:to-rose-500 disabled:from-gray-400 disabled:to-gray-300 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 backdrop-blur-sm border border-pink-300/50 hover:border-pink-400"
      >
        {isSubmitting ? '✨ Consulting Pyxie...' : '🎯 Submit project for feedback'}
      </button>

      {/* Aesthetic Feedback Card */}
      {vibeCheckResult && (
        <div className={`mt-8 p-6 rounded-2xl border-2 shadow-lg transition-all duration-500 ${
          vibeCheckResult.status === 'PASS'
            ? 'bg-gradient-to-br from-emerald-50/60 to-white border-emerald-200'
            : 'bg-gradient-to-br from-amber-50/60 to-white border-amber-200'
        }`}>
          {/* Header with Status */}
          <div className="mb-6 flex items-center justify-between">
            <h3 className={`text-lg font-serif tracking-tight ${
              vibeCheckResult.status === 'PASS'
                ? 'text-emerald-900'
                : 'text-amber-900'
            }`}>
              {vibeCheckResult.status === 'PASS' ? '✨ Amazing Work!' : '💡 Keep Iterating'}
            </h3>
            {vibeCheckResult.status === 'PASS' && (
              <span className="text-2xl">🎉</span>
            )}
          </div>

          {/* Score Display */}
          <div className="mb-6 flex items-baseline gap-2">
            <span className={`text-5xl font-bold ${
              vibeCheckResult.status === 'PASS'
                ? 'text-emerald-600'
                : 'text-amber-600'
            }`}>
              {vibeCheckResult.score}
            </span>
            <span className={`text-lg font-medium ${
              vibeCheckResult.status === 'PASS'
                ? 'text-emerald-700/70'
                : 'text-amber-700/70'
            }`}>
              / 100 Points
            </span>
          </div>

          {/* Metrics Check Box */}
          {vibeCheckResult.metricsCheck && (
            <div className={`mb-5 p-4 rounded-xl bg-white/50 backdrop-blur-sm border ${
              vibeCheckResult.status === 'PASS'
                ? 'border-emerald-100/50'
                : 'border-amber-100/50'
            }`}>
              <p className={`text-sm font-mono ${
                vibeCheckResult.status === 'PASS'
                  ? 'text-emerald-800'
                  : 'text-amber-800'
              }`}>
                {vibeCheckResult.metricsCheck}
              </p>
            </div>
          )}

          {/* Review Text */}
          {vibeCheckResult.review && (
            <div className={`text-sm leading-relaxed whitespace-pre-wrap ${
              vibeCheckResult.status === 'PASS'
                ? 'text-emerald-950/80'
                : 'text-amber-950/80'
            }`}>
              {vibeCheckResult.review}
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={() => setVibeCheckResult(null)}
            className={`mt-5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
              vibeCheckResult.status === 'PASS'
                ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
            }`}
          >
            Dismiss
          </button>
        </div>
      )}

    </div>
  );
}