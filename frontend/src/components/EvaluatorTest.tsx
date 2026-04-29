'use client';

import { useState } from 'react';
import Script from 'next/script';

export default function EvaluatorTest() {
  const [isReady, setIsReady] = useState(false);
  const [output, setOutput] = useState<string>('');

  // This function runs when the user clicks the button
  const runPythonCode = async () => {
    try {
      // @ts-ignore - Pyodide attaches itself to the global window object
      const pyodide = await window.loadPyodide();
      
      // Let's run a simple Python script!
      const result = await pyodide.runPythonAsync(`
        x = 10
        y = 5
        x * y + 100
      `);
      
      setOutput(`Result: ${result}`);
    } catch (error) {
      console.error(error);
      setOutput("Oops, the code broke! 🛑");
    }
  };

  return (
    <div className="p-8 bg-white rounded-xl shadow-md max-w-md mx-auto mt-10">
      {/* This Script tag safely loads the Pyodide WebAssembly engine from a CDN */}
      <Script 
        src="https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js"
        onLoad={() => setIsReady(true)} 
      />

      <h2 className="text-2xl font-serif text-[#590D22] mb-4">The Lab 🧪</h2>
      
      {isReady ? (
        <button 
          onClick={runPythonCode}
          className="bg-pink-200 text-pink-800 px-4 py-2 rounded-lg font-mono hover:bg-pink-300 transition-colors"
        >
          Run Test Python
        </button>
      ) : (
        <p className="text-gray-400 italic">Booting up the Python engine...</p>
      )}

      {output && (
        <div className="mt-6 p-4 bg-[#1E1E2E] text-pink-50 font-mono rounded-lg">
          {output}
        </div>
      )}
    </div>
  );
}