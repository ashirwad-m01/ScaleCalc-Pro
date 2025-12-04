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
    <div className="app-wrapper">
      
      {/* Background Ambience */}
      <div className="bg-glow"></div>
      
      <header>
        <div className="icon-badge">
          <Ruler size={32} color="#818cf8" />
        </div>
        <h1>
          ScaleCalc Pro
        </h1>
        <p className="subtitle">
          Precision tool for Architects and Designers.
        </p>
      </header>

      <main className="content-container">
        <div className="glass-card">
          {/* Tab Navigation */}
          <div className="tab-nav">
            <div className="tab-group">
              <button
                onClick={() => setActiveTab(TabMode.SCALE_TO_FACTOR)}
                className={`tab-btn ${activeTab === TabMode.SCALE_TO_FACTOR ? 'active' : ''}`}
              >
                <Info size={16} />
                Scale → Factor
              </button>
              <button
                onClick={() => setActiveTab(TabMode.SCALE_FROM_FACTOR)}
                className={`tab-btn ${activeTab === TabMode.SCALE_FROM_FACTOR ? 'active' : ''}`}
              >
                <Calculator size={16} />
                Scale + Factor → Scale
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="main-content">
            {activeTab === TabMode.SCALE_TO_FACTOR ? (
              <ScaleToFactor />
            ) : (
              <ScaleFromFactor />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="app-footer">
          <p>ScaleCalc Pro.</p>
        </div>
      </main>
    </div>
  );
}