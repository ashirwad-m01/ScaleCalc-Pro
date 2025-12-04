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
    <div>
      <div className="section-header">
        <h2>Calculate Scale Factor</h2>
        <p className="subtitle" style={{ margin: 0 }}>
          Determine the multiplicative factor between two scales.
        </p>
      </div>

      <div className="input-grid">
        {/* Input 1 */}
        <div className="input-group">
          <label htmlFor="startScaleA">
            Starting Scale
          </label>
          <div className="input-wrapper">
            <div className="prefix-area">
              <span className="prefix-text">1:</span>
            </div>
            <input
              type="number"
              name="startScaleA"
              id="startScaleA"
              className="input-field"
              placeholder="100"
              value={startScale}
              onChange={(e) => setStartScale(e.target.value)}
              min="0"
              step="any"
            />
          </div>
        </div>

        <div className="arrow-separator">
          <ArrowRight size={24} />
        </div>

        {/* Input 2 */}
        <div className="input-group">
          <label htmlFor="endScaleA">
            Target Scale
          </label>
          <div className="input-wrapper">
            <div className="prefix-area">
              <span className="prefix-text">1:</span>
            </div>
            <input
              type="number"
              name="endScaleA"
              id="endScaleA"
              className="input-field"
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
      <div className="results-area">
        {error && (
          <div className="error-box">
            <AlertCircle size={24} color="#f87171" />
            <div>{error}</div>
          </div>
        )}

        {!error && result && (
          <div className="result-card">
            
            <div className="result-label indigo">
              <Sparkles size={12} />
              <span>Calculated Factor</span>
            </div>
            
            <div className="result-value">
              {result}
            </div>

            <button
              onClick={handleCopy}
              className={`copy-btn ${copied ? 'copied' : 'default'}`}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied' : 'Copy Result'}
            </button>

            <p className="result-helper">
              Multiply your starting dimensions by this factor.
            </p>
          </div>
        )}

        {!error && !result && (
          <div className="empty-state">
            <p>Enter both scale values to see the conversion factor.</p>
          </div>
        )}
      </div>
    </div>
  );
};