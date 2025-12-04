import React, { useState } from 'react';
import { ScaleToFactor } from './components/ScaleToFactor';
import { ScaleFromFactor } from './components/ScaleFromFactor';
import { Ruler, Calculator, Info } from 'lucide-react';

enum TabMode {
  SCALE_TO_FACTOR = 'SCALE_TO_FACTOR',
  SCALE_FROM_FACTOR = 'SCALE_FROM_FACTOR',
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabMode>(TabMode.SCALE_TO_FACTOR);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Background Ambience - Static */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <header className="mb-10 text-center relative z-10">
        <div className="inline-flex items-center justify-center p-4 glass-panel rounded-2xl shadow-lg mb-6 bg-white/5 border border-white/10">
          <Ruler className="h-8 w-8 text-indigo-400" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
          ScaleCalc Pro
        </h1>
        <p className="mt-3 text-lg text-slate-400 font-medium max-w-xl mx-auto">
          Precision tool for Architects and Designers.
        </p>
      </header>

      <main className="w-full max-w-2xl relative z-10">
        <div className="glass-panel rounded-3xl shadow-2xl overflow-hidden">
          {/* Tab Navigation Segmented Control */}
          <div className="p-3 border-b border-white/5">
            <div className="bg-black/40 rounded-xl p-1 flex relative">
              <button
                onClick={() => setActiveTab(TabMode.SCALE_TO_FACTOR)}
                className={`flex-1 py-3 px-4 text-sm font-semibold rounded-lg focus:outline-none transition-colors duration-200 flex items-center justify-center gap-2
                  ${activeTab === TabMode.SCALE_TO_FACTOR 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
              >
                <Info className="w-4 h-4" />
                Scale → Factor
              </button>
              <button
                onClick={() => setActiveTab(TabMode.SCALE_FROM_FACTOR)}
                className={`flex-1 py-3 px-4 text-sm font-semibold rounded-lg focus:outline-none transition-colors duration-200 flex items-center justify-center gap-2
                  ${activeTab === TabMode.SCALE_FROM_FACTOR 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
              >
                <Calculator className="w-4 h-4" />
                Scale + Factor → Scale
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-6 sm:p-10 bg-gradient-to-b from-transparent to-black/20">
            {activeTab === TabMode.SCALE_TO_FACTOR ? (
              <ScaleToFactor />
            ) : (
              <ScaleFromFactor />
            )}
          </div>
        </div>

        {/* Footer/Info */}
        <div className="mt-8 text-center text-sm text-slate-500 font-medium">
          <p>ScaleCalc Pro.</p>
        </div>
      </main>
    </div>
  );
}