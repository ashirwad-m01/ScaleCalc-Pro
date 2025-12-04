import React, { useState, useEffect } from 'react';
import { ArrowRight, AlertCircle, Sparkles, Copy, Check } from 'lucide-react';

export const ScaleToFactor: React.FC = () => {
  const [startScale, setStartScale] = useState<string>('');
  const [endScale, setEndScale] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    calculate();
    setCopied(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startScale, endScale]);

  const calculate = () => {
    setError(null);
    setResult(null);

    if (!startScale && !endScale) return;

    if (!startScale || !endScale) return;

    const s1 = parseFloat(startScale);
    const s2 = parseFloat(endScale);

    if (isNaN(s1) || isNaN(s2)) {
      setError('Please enter valid numeric values.');
      return;
    }

    if (s1 <= 0 || s2 <= 0) {
      setError('Scale denominators must be > 0.');
      return;
    }

    const factor = s1 / s2;
    setResult(factor.toFixed(4));
  };

  const handleCopy = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(result);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center md:text-left">
        <h2 className="text-2xl font-bold text-white">Calculate Scale Factor</h2>
        <p className="text-slate-400 font-medium">
          Determine the multiplicative factor between two scales.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center relative">
        {/* Input 1 */}
        <div className="relative group">
          <label htmlFor="startScaleA" className="block text-sm font-semibold text-slate-300 mb-2 ml-1">
            Starting Scale
          </label>
          <div className="glass-input-container rounded-xl flex items-center overflow-hidden">
            <div className="bg-white/5 border-r border-white/10 px-4 py-3.5">
              <span className="text-indigo-400 font-bold text-lg">1:</span>
            </div>
            <input
              type="number"
              name="startScaleA"
              id="startScaleA"
              className="glass-input block w-full py-3.5 px-4 text-white placeholder:text-slate-600 text-lg font-medium"
              placeholder="100"
              value={startScale}
              onChange={(e) => setStartScale(e.target.value)}
              min="0"
              step="any"
            />
          </div>
        </div>

        <div className="hidden md:flex justify-center text-slate-600 pt-6">
          <ArrowRight className="w-6 h-6" />
        </div>

        {/* Input 2 */}
        <div className="relative group">
          <label htmlFor="endScaleA" className="block text-sm font-semibold text-slate-300 mb-2 ml-1">
            Target Scale
          </label>
          <div className="glass-input-container rounded-xl flex items-center overflow-hidden">
            <div className="bg-white/5 border-r border-white/10 px-4 py-3.5">
              <span className="text-indigo-400 font-bold text-lg">1:</span>
            </div>
            <input
              type="number"
              name="endScaleA"
              id="endScaleA"
              className="glass-input block w-full py-3.5 px-4 text-white placeholder:text-slate-600 text-lg font-medium"
              placeholder="150"
              value={endScale}
              onChange={(e) => setEndScale(e.target.value)}
              min="0"
              step="any"
            />
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="mt-8">
        {error && (
          <div className="rounded-xl bg-red-900/20 p-4 border border-red-500/20 flex items-center gap-3">
            <AlertCircle className="h-6 w-6 text-red-400" aria-hidden="true" />
            <div className="text-sm text-red-200 font-medium">{error}</div>
          </div>
        )}

        {!error && result && (
          <div className="relative group">
            <div className="relative bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col items-center justify-center text-center">
              
              <div className="flex items-center gap-2 text-indigo-300 font-bold mb-2 uppercase tracking-wider text-xs bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                <Sparkles className="w-3 h-3" />
                <span>Calculated Factor</span>
              </div>
              
              <div className="my-4 flex items-center justify-center">
                 <div className="text-5xl sm:text-6xl font-black text-white tracking-tight">
                  {result}
                </div>
              </div>

              <div className="flex gap-2 mt-2 w-full justify-center">
                 <button
                  onClick={handleCopy}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all duration-200 border
                    ${copied 
                      ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300' 
                      : 'bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20'
                    }`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Copy Result'}
                </button>
              </div>

              <p className="mt-4 text-xs text-slate-400 font-medium">
                Multiply your starting dimensions by this factor.
              </p>
            </div>
          </div>
        )}

        {!error && !result && (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-8 text-center">
            <p className="text-slate-500 font-medium">Enter both scale values to see the conversion factor.</p>
          </div>
        )}
      </div>
    </div>
  );
};