'use client';

import { useState, useRef } from 'react';
import Script from 'next/script';
import { useEffect } from 'react';

type Cell = {
  id: number;
  code: string;
  output: string;
};

export default function EvaluatorTest() {
  const [isReady, setIsReady] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('Booting up Python... ⏳');
  
  const pyodideRef = useRef<any>(null);

  const [cells, setCells] = useState<Cell[]>([
    { 
      id: 1, 
      code: "# 🎀 Let's import our toolkit\nimport numpy as np\nimport pandas as pd\nprint('Libraries loaded! ✨')", 
      output: "" 
    },
    { 
      id: 2, 
      code: "# 🤖 Training our first browser-based ML model!\nfrom sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_squared_error, r2_score\n\n# 📊 Our messy real-life data\nskincare_hours = np.array([0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0]).reshape(-1, 1)\ncompliments = np.array([2, 4, 5, 7, 8, 10, 11, 13, 14, 16])\n\n# 🎯 Fit the line\nbestie_bot = LinearRegression()\nbestie_bot.fit(skincare_hours, compliments)\n\n# 🔮 Test accuracy\npredictions = bestie_bot.predict(skincare_hours)\nr2 = r2_score(compliments, predictions)\n\nprint(f\"💯 R² Score: {r2:.2f}\")", 
      output: "" 
    }
  ]);

  const initPyodide = async () => {
    try {
      // @ts-ignore
      const pyodide = await window.loadPyodide();
      setLoadingStatus('Downloading ML Libraries (pandas, scikit-learn)... 📦');
      await pyodide.loadPackage(['numpy', 'pandas', 'scikit-learn']);
      pyodideRef.current = pyodide;
      setIsReady(true);
    } catch (err) {
      console.error(err);
      setLoadingStatus('Failed to load engine 🛑');
    }
  };

  const runCell = async (cellId: number) => {
    if (!pyodideRef.current) return;
    const targetCell = cells.find(c => c.id === cellId);
    if (!targetCell) return;

    updateCellOutput(cellId, 'Running... ⏳');

    try {
      let printedOutput = "";
      pyodideRef.current.setStdout({ batched: (msg: string) => { printedOutput += msg + "\n"; } });

      let result = await pyodideRef.current.runPythonAsync(targetCell.code);
      
      let finalDisplay = printedOutput;
      if (result !== undefined && result !== null) {
        finalDisplay += String(result);
      }
      
      if (finalDisplay.trim() === "") {
        finalDisplay = "✅ Executed successfully";
      }
      
      updateCellOutput(cellId, finalDisplay.trim());
    } catch (error: any) {
      updateCellOutput(cellId, `Oops! 🛑:\n${error.message}`);
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

  // 🎀 DOM Magic: Auto-resize textarea to fit content without scrollbars
  const handleCodeChange = (id: number, e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto'; // Reset height briefly
    e.target.style.height = `${e.target.scrollHeight}px`; // Expand to fit exact text height
    
    // Update state
    setCells(cells.map(cell => cell.id === id ? { ...cell, code: e.target.value } : cell));
  };

  const updateCellOutput = (id: number, newOutput: string) => {
    setCells(cells.map(cell => cell.id === id ? { ...cell, output: newOutput } : cell));
  };

  // 🎀 DOM Magic Part 2: Auto-resize on initial load!
  useEffect(() => {
    // Find all our custom textareas
    const textareas = document.querySelectorAll('.it-girl-textarea');
    textareas.forEach((ta) => {
      const el = ta as HTMLTextAreaElement;
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    });
  }, [cells.length]); // Re-runs anytime the number of cells changes

  return (
    <div className="max-w-3xl mx-auto mt-12 mb-20 font-sans">
      <Script 
        src="https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js"
        onReady={initPyodide} 
      />

      {/* Sleek Header */}
      <div className="flex justify-between items-end mb-6 px-2">
        <div>
          <h2 className="text-3xl font-serif text-[#590D22] mb-1 tracking-tight">The Code Diary 📓✨</h2>
          <p className="text-pink-400 text-sm font-medium">Your personal, in-browser execution lab.</p>
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
                <div className="pl-4 py-2 text-[13px] font-mono text-[#590D22]/80 whitespace-pre-wrap leading-relaxed">
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

    </div>
  );
}