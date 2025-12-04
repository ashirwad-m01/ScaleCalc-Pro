import React, { useState, useEffect } from 'react';
import { ArrowRight, AlertCircle, Layers, Copy, Check } from 'lucide-react';

export const ScaleFromFactor: React.FC = () => {
  const [startScale, setStartScale] = useState<string>('');
  const [factor, setFactor] = useState<string>('');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    calculate();
    setCopied(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startScale, factor]);

  const calculate = () => {
    setError(null);
    setResult(null);

    if (!startScale && !factor) return;
    if (!startScale || !factor) return;

    const s1 = parseFloat(startScale);
    const f = parseFloat(factor);

    if (isNaN(s1) || isNaN(f)) {
      setError('Please enter valid numeric values.');
      return;
    }

    if (s1 <= 0) {
      setError('Scale denominator must be > 0.');
      return;
    }

    if (f === 0) {
      setError('Scale factor cannot be zero.');
      return;
    }

    const s2 = s1 / f;
    const roundedS2 = Math.round(s2);
    
    if (roundedS2 <= 0) {
      setError('Resulting scale is too small.');
      return;
    }

    setResult(`1:${roundedS2}`);
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
        <h2>Derive New Scale</h2>
        <p className="subtitle" style={{ margin: 0 }}>
          Calculate the resulting scale when a scale factor is applied.
        </p>
      </div>

      <div className="input-grid">
        {/* Input 1 */}
        <div className="input-group">
          <label htmlFor="startScaleB">
            Starting Scale
          </label>
          <div className="input-wrapper">
            <div className="prefix-area">
              <span className="prefix-text">1:</span>
            </div>
            <input
              type="number"
              name="startScaleB"
              id="startScaleB"
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
          <label htmlFor="factor">
            Scale Factor
          </label>
          <div className="input-wrapper">
            <div className="prefix-area">
              <span className="prefix-text factor">×</span>
            </div>
            <input
              type="number"
              name="factor"
              id="factor"
              className="input-field"
              placeholder="0.75"
              value={factor}
              onChange={(e) => setFactor(e.target.value)}
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
            
            <div className="result-label emerald">
              <Layers size={12} />
              <span>Resulting Scale</span>
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
              Rounded to the nearest whole number denominator.
            </p>
          </div>
        )}

        {!error && !result && (
          <div className="empty-state">
            <p>Enter starting scale and factor to calculate result.</p>
          </div>
        )}
      </div>
    </div>
  );
};