'use client';

import { useState, useRef } from 'react';
import Script from 'next/script';

// 🎀 We define what a "Cell" looks like
type Cell = {
  id: number;
  code: string;
  output: string;
};

export default function EvaluatorTest() {
  const [isReady, setIsReady] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState('Booting up Python... ⏳');
  
  // We save the Pyodide engine in a "ref" so all cells can share the exact same brain!
  const pyodideRef = useRef<any>(null);

  // 🎀 Our notebook is now an ARRAY of cells!
  const [cells, setCells] = useState<Cell[]>([
    { 
      id: 1, 
      code: "# Cell 1: Import our IT-Girl Toolkit\nimport numpy as np\nimport pandas as pd\nprint('Libraries loaded! ✨')", 
      output: "" 
    },
    { 
      id: 2, 
      code: "# Cell 2: Test the memory\ndata = np.array([1, 2, 3, 4, 5])\nprint(f'My data: {data}')", 
      output: "" 
    }
  ]);

  // 🚀 The initialization function (Loads Python + ML Libraries)
  const initPyodide = async () => {
    try {
      // @ts-ignore
      const pyodide = await window.loadPyodide();
      setLoadingStatus('Downloading ML Libraries (pandas, scikit-learn)... 📦');
      
      // Tell Pyodide to fetch the heavy data science packages!
      await pyodide.loadPackage(['numpy', 'pandas', 'scikit-learn']);
      
      pyodideRef.current = pyodide; // Save the brain
      setIsReady(true);
    } catch (err) {
      console.error(err);
      setLoadingStatus('Failed to load engine 🛑');
    }
  };

  // ▶️ Run a specific cell
  const runCell = async (cellId: number) => {
    if (!pyodideRef.current) return;

    // Find the cell we are trying to run
    const targetCell = cells.find(c => c.id === cellId);
    if (!targetCell) return;

    // Update that specific cell's output to show it's running
    updateCellOutput(cellId, 'Running... ⏳');

    try {
      // 🎀 1. Create a temporary string to catch any print() statements
      let printedOutput = "";

      // 🎀 2. Tell Pyodide to send printed text to our string instead of the hidden console
      pyodideRef.current.setStdout({ batched: (msg: string) => { printedOutput += msg + "\n"; } });

      // Run the code from THIS cell
      let result = await pyodideRef.current.runPythonAsync(targetCell.code);
      
      // 🎀 3. Combine the printed output with the final returned result (if any)
      let finalDisplay = printedOutput;
      if (result !== undefined && result !== null) {
        finalDisplay += String(result);
      }
      
      // If the cell literally did nothing that produces output, show the success tag
      if (finalDisplay.trim() === "") {
        finalDisplay = "✅ Executed successfully (No output)";
      }
      
      updateCellOutput(cellId, finalDisplay.trim());
    } catch (error: any) {
      updateCellOutput(cellId, `Oops, Error 🛑:\n${error.message}`);
    }
  };

  // ➕ Add a new blank cell to the bottom
  const addCell = () => {
    const newCell: Cell = {
      id: Date.now(), // unique ID
      code: "# New cell\n",
      output: ""
    };
    setCells([...cells, newCell]);
  };

  // 📝 Update what's typed inside a specific cell
  const updateCellCode = (id: number, newCode: string) => {
    setCells(cells.map(cell => cell.id === id ? { ...cell, code: newCode } : cell));
  };

  // 🖨️ Update the output of a specific cell
  const updateCellOutput = (id: number, newOutput: string) => {
    setCells(cells.map(cell => cell.id === id ? { ...cell, output: newOutput } : cell));
  };

  return (
    <div className="p-8 bg-white rounded-2xl shadow-xl max-w-3xl mx-auto mt-10 border-2 border-pink-100">
      <Script 
        src="https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js"
        onReady={initPyodide} 
      />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif text-[#590D22]">The IT-Girl Colab 📓</h2>
        {!isReady && <span className="text-sm font-mono text-pink-500 animate-pulse">{loadingStatus}</span>}
      </div>

      {/* Map through our array of cells and render them */}
      <div className="space-y-6">
        {cells.map((cell) => (
          <div key={cell.id} className="border border-pink-100 rounded-xl overflow-hidden shadow-sm">
            
            {/* The Editor */}
            <div className="bg-[#1E1E2E] relative group">
              <textarea
                value={cell.code}
                onChange={(e) => updateCellCode(cell.id, e.target.value)}
                spellCheck="false"
                className="w-full min-h-[100px] bg-transparent text-pink-50 font-mono text-[14px] p-4 outline-none resize-y"
              />
              {/* Floating Run Button */}
              <button 
                onClick={() => runCell(cell.id)}
                disabled={!isReady}
                className="absolute top-3 right-3 bg-white/10 hover:bg-pink-500/80 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all disabled:opacity-50"
                title="Run this cell"
              >
                ▶️
              </button>
            </div>

            {/* The Output Console (Only shows if there is output) */}
            {cell.output && (
              <div className="bg-pink-50 p-3 text-sm font-mono text-[#590D22] border-t border-pink-100 whitespace-pre-wrap">
                {cell.output}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add New Cell Button */}
      <button 
        onClick={addCell}
        disabled={!isReady}
        className="mt-6 w-full py-3 border-2 border-dashed border-pink-200 text-pink-500 rounded-xl font-medium hover:bg-pink-50 transition-colors disabled:opacity-50"
      >
        + Add Code Cell ✨
      </button>

    </div>
  );
}