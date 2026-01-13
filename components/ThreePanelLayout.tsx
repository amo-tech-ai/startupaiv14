import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface ThreePanelLayoutProps {
  leftPanel?: ReactNode;
  mainPanel: ReactNode;
  rightPanel: ReactNode;
  title: string;
}

const ThreePanelLayout: React.FC<ThreePanelLayoutProps> = ({ leftPanel, mainPanel, rightPanel, title }) => {
  return (
    <div className="flex h-screen bg-stone-50 overflow-hidden selection:bg-stone-200">
      {/* Left Panel: Navigation & Contextual Metadata */}
      <Sidebar>
        {leftPanel}
      </Sidebar>

      {/* Main Panel: Primary Content Area */}
      <main className="flex-1 overflow-y-auto bg-stone-50 border-r border-stone-100">
        <div className="max-w-4xl mx-auto px-12 py-16">
          <header className="mb-16 border-b border-stone-200 pb-10 flex justify-between items-end">
            <div>
              <h2 className="text-5xl font-serif font-bold text-stone-900 tracking-tight leading-tight">{title}</h2>
              <p className="text-stone-400 mt-4 text-sm font-serif italic">Founder OS / Session 001</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="text-[10px] text-stone-400 uppercase tracking-widest font-bold">System Health</span>
              <div className="flex items-center gap-2 px-3 py-1 bg-white border border-stone-200 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-bold uppercase tracking-tight text-stone-600">Live Sync</span>
              </div>
            </div>
          </header>
          
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
            {mainPanel}
          </div>
        </div>
      </main>

      {/* Right Panel: AI Insights & Strategic Guidance */}
      <aside className="w-80 flex flex-col bg-stone-50 relative shrink-0">
        <div className="absolute inset-0 p-8 overflow-y-auto space-y-12">
          <div className="flex items-center gap-3 border-b border-stone-200 pb-4">
            <div className="w-3 h-3 border border-stone-900 rotate-45"></div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-900">Intelligence</h3>
          </div>
          
          <div className="space-y-12 pb-20">
            {rightPanel}
          </div>
        </div>
        
        {/* Footer-like element in Right Panel */}
        <div className="mt-auto p-8 bg-stone-100/50 border-t border-stone-200 text-[10px] text-stone-400 uppercase tracking-widest leading-relaxed">
          Powered by Gemini 3 <br/>
          Strategic Inference Engine
        </div>
      </aside>
    </div>
  );
};

export default ThreePanelLayout;