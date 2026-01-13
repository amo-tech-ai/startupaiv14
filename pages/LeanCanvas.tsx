import React, { useState, useEffect } from 'react';
import ThreePanelLayout from '../components/ThreePanelLayout';
import { StartupProfile, LeanCanvas as LeanCanvasData } from '../types';
import { improveUVP, getCanvasSuggestions } from '../services/gemini';

interface LeanCanvasProps {
  profile: StartupProfile;
  updateProfile: (data: Partial<StartupProfile>) => void;
}

const LeanCanvas: React.FC<LeanCanvasProps> = ({ profile, updateProfile }) => {
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Local state for the canvas to handle immediate UI updates
  const [canvas, setCanvas] = useState<LeanCanvasData>(profile.leanCanvas || {
    problem: [], alternatives: [], solution: [], metrics: [], uvp: '', highLevelConcept: '', 
    unfairAdvantage: '', channels: [], segments: [], earlyAdopters: [], costs: [], revenue: [],
    fundraisingGoal: profile.fundraisingGoal
  });

  // Ensure fundraising goal is always synced from the master profile if local is 0/empty
  useEffect(() => {
    if (!canvas.fundraisingGoal && profile.fundraisingGoal) {
      updateCanvasField('fundraisingGoal', profile.fundraisingGoal);
    }
  }, [profile.fundraisingGoal]);

  const updateCanvasField = (field: keyof LeanCanvasData, value: any) => {
    setCanvas(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setSaveStatus('idle');
    
    // Explicit save confirmation updates the master app state
    updateProfile({ leanCanvas: canvas, fundraisingGoal: canvas.fundraisingGoal || profile.fundraisingGoal });
    
    // UI Feedback delay
    setTimeout(() => {
      setIsSaving(false);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2500);
    }, 1000);
  };

  const handleAIImproveUVP = async () => {
    setLoadingAction('uvp');
    const newUvp = await improveUVP(profile, canvas);
    updateCanvasField('uvp', newUvp);
    setLoadingAction(null);
  };

  const handleAIBlockAssist = async (blockName: string, field: keyof LeanCanvasData) => {
    setLoadingAction(blockName);
    const content = Array.isArray(canvas[field]) ? (canvas[field] as string[]) : [canvas[field] as string];
    const suggestions = await getCanvasSuggestions(blockName, content, profile);
    if (suggestions.length > 0) {
      updateCanvasField(field, suggestions);
    }
    setLoadingAction(null);
  };

  return (
    <ThreePanelLayout
      title="Lean Canvas"
      leftPanel={
        <div className="space-y-12">
          <div>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-6">Strategic Integrity</p>
            <div className="space-y-4">
              <ContextBadge label="Model Consistency" status="Optimal" />
              <ContextBadge label="Market Grounding" status="Validated" />
              <ContextBadge label="Unit Economics" status="Calculating" />
            </div>
          </div>
          <div className="p-6 bg-stone-100 border border-stone-200">
            <h4 className="text-[10px] font-bold text-stone-900 uppercase tracking-widest mb-3">Architect's Guidance</h4>
            <p className="text-xs leading-relaxed text-stone-600 font-serif italic">
              "A Lean Canvas is a de-risking tool. If your 'Unique Value Proposition' doesn't explicitly solve the top 'Problem', your conversion path will remain fragmented."
            </p>
          </div>
        </div>
      }
      mainPanel={
        <div className="space-y-12 pb-24">
          {/* Header Controls */}
          <div className="flex justify-between items-end mb-8">
            <div className="space-y-2">
               <h3 className="text-2xl font-serif font-bold text-stone-900">{profile.name || "Untitled Startup"} OS</h3>
               <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-300 italic">Strategic Mental Model v1.4</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="px-5 py-2.5 border border-stone-200 text-stone-400 text-[10px] font-bold uppercase tracking-widest hover:border-stone-900 hover:text-stone-900 transition-colors">Export Logic</button>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className={`px-8 py-2.5 bg-stone-900 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800 transition-all flex items-center gap-3 shadow-lg shadow-stone-200 ${saveStatus === 'success' ? 'bg-emerald-600' : ''}`}
              >
                {isSaving && <div className="w-2 h-2 border border-white border-t-transparent rounded-full animate-spin"></div>}
                {saveStatus === 'success' ? '✓ Data Persisted' : isSaving ? 'Confirming...' : 'Save Canvas'}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-stone-300 mb-10">
            <span>Execution Framework</span>
            <span className="text-stone-200">/</span>
            <span className="text-stone-900">The Lean Canvas</span>
          </div>

          {/* Lean Canvas Grid - Architectural Structure */}
          <div className="grid grid-cols-10 gap-px bg-stone-200 border border-stone-200 shadow-sm overflow-hidden rounded-sm">
            
            {/* COLUMN 1 & 2: PROBLEM */}
            <div className="col-span-2 row-span-2 bg-white flex flex-col">
              <BlockHeader title="PROBLEM" subtitle="Top 3 pain points." onAssist={() => handleAIBlockAssist('Problem', 'problem')} loading={loadingAction === 'Problem'} />
              <div className="p-6 flex-1 min-h-[180px]">
                <BlockList items={canvas.problem} onUpdate={(val) => updateCanvasField('problem', val)} />
              </div>
              <BlockHeader title="EXISTING ALTERNATIVES" subtitle="How they solve it today." isSub />
              <div className="p-6 bg-stone-50/40 min-h-[140px]">
                <BlockList items={canvas.alternatives} onUpdate={(val) => updateCanvasField('alternatives', val)} />
              </div>
            </div>

            {/* COLUMN 3 & 4: SOLUTION */}
            <div className="col-span-2 row-span-2 bg-white flex flex-col">
              <BlockHeader title="SOLUTION" subtitle="Core features/product." onAssist={() => handleAIBlockAssist('Solution', 'solution')} loading={loadingAction === 'Solution'} />
              <div className="p-6 flex-1 min-h-[180px]">
                <BlockList items={canvas.solution} onUpdate={(val) => updateCanvasField('solution', val)} />
              </div>
              <BlockHeader title="KEY METRICS" subtitle="Numbers that tell the truth." isSub onAssist={() => handleAIBlockAssist('Metrics', 'metrics')} loading={loadingAction === 'Metrics'} />
              <div className="p-6 bg-stone-50/40 min-h-[140px]">
                <BlockList items={canvas.metrics} onUpdate={(val) => updateCanvasField('metrics', val)} />
              </div>
            </div>

            {/* COLUMN 5 & 6: UVP (THE HEART) */}
            <div className="col-span-2 row-span-2 bg-white flex flex-col border-x border-stone-200">
              <BlockHeader title="UNIQUE VALUE PROP" subtitle="Single, clear, compelling message." onAssist={handleAIImproveUVP} loading={loadingAction === 'uvp'} />
              <div className="p-8 flex-1 flex flex-col justify-center text-center">
                 <textarea 
                    className="w-full text-base font-serif italic text-stone-900 leading-relaxed font-bold bg-transparent focus:outline-none resize-none border-none text-center h-auto" 
                    value={canvas.uvp} 
                    onChange={(e) => updateCanvasField('uvp', e.target.value)}
                    rows={6}
                    placeholder="Refining core thesis..."
                 />
              </div>
              <BlockHeader title="HIGH-LEVEL CONCEPT" subtitle="Your X for Y analogy." isSub />
              <div className="p-6 bg-stone-50/40 min-h-[140px] flex items-center">
                 <input 
                    className="w-full text-xs font-serif text-stone-600 italic bg-transparent focus:outline-none text-center font-bold" 
                    value={canvas.highLevelConcept}
                    onChange={(e) => updateCanvasField('highLevelConcept', e.target.value)}
                    placeholder="e.g. Stripe for Non-Profits"
                 />
              </div>
            </div>

            {/* COLUMN 7 & 8: UNFAIR ADVANTAGE */}
            <div className="col-span-2 row-span-2 bg-white flex flex-col">
              <BlockHeader title="UNFAIR ADVANTAGE" subtitle="Cannot be easily copied." />
              <div className="p-6 flex-1 min-h-[180px]">
                <textarea 
                  className="w-full text-xs font-serif text-stone-600 italic leading-relaxed bg-transparent focus:outline-none resize-none border-none" 
                  value={canvas.unfairAdvantage}
                  onChange={(e) => updateCanvasField('unfairAdvantage', e.target.value)}
                  placeholder="Identify your proprietary moat..."
                />
              </div>
              <BlockHeader title="CHANNELS" subtitle="Direct path to customers." isSub onAssist={() => handleAIBlockAssist('Channels', 'channels')} loading={loadingAction === 'Channels'} />
              <div className="p-6 bg-stone-50/40 min-h-[140px]">
                <BlockList items={canvas.channels} onUpdate={(val) => updateCanvasField('channels', val)} />
              </div>
            </div>

            {/* COLUMN 9 & 10: CUSTOMER SEGMENTS */}
            <div className="col-span-2 row-span-2 bg-white flex flex-col">
              <BlockHeader title="CUSTOMER SEGMENTS" subtitle="List your target users." onAssist={() => handleAIBlockAssist('Segments', 'segments')} loading={loadingAction === 'Segments'} />
              <div className="p-6 flex-1 min-h-[180px]">
                <BlockList items={canvas.segments} onUpdate={(val) => updateCanvasField('segments', val)} />
              </div>
              <BlockHeader title="EARLY ADOPTERS" subtitle="Ideal first customers." isSub />
              <div className="p-6 bg-stone-50/40 min-h-[140px]">
                <BlockList items={canvas.earlyAdopters} onUpdate={(val) => updateCanvasField('earlyAdopters', val)} />
              </div>
            </div>

            {/* BOTTOM ROW: COST & REVENUE */}
            <div className="col-span-5 bg-white flex flex-col border-t border-stone-200">
              <BlockHeader title="COST STRUCTURE" subtitle="Fixed and variable costs." onAssist={() => handleAIBlockAssist('Costs', 'costs')} loading={loadingAction === 'Costs'} />
              <div className="p-8 grid grid-cols-2 gap-8 min-h-[160px]">
                <BlockList items={canvas.costs} onUpdate={(val) => updateCanvasField('costs', val)} />
              </div>
            </div>

            <div className="col-span-5 bg-white flex flex-col border-t border-l border-stone-200">
              <BlockHeader title="REVENUE STREAMS" subtitle="How you make money." onAssist={() => handleAIBlockAssist('Revenue', 'revenue')} loading={loadingAction === 'Revenue'} />
              <div className="p-8 grid grid-cols-2 gap-8 min-h-[160px]">
                <BlockList items={canvas.revenue} onUpdate={(val) => updateCanvasField('revenue', val)} />
              </div>
            </div>
          </div>

          {/* Fundraising Synchronization Section */}
          <section className="bg-white border border-stone-200 p-10 flex justify-between items-center group hover:border-stone-900 transition-all">
            <div className="max-w-md">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-stone-900 mb-2">Fundraising Objective</h4>
              <p className="text-xs text-stone-400 font-serif italic leading-relaxed">
                Your target capitalization target, synchronized directly with your startup profile. This informs the unit economics logic across the board.
              </p>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-serif text-stone-300">$</span>
                <input 
                  type="number" 
                  className="text-6xl font-serif font-bold text-stone-900 bg-transparent focus:outline-none text-right w-64 border-b-2 border-transparent focus:border-stone-100 transition-all"
                  value={canvas.fundraisingGoal}
                  onChange={(e) => updateCanvasField('fundraisingGoal', Number(e.target.value))}
                />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-600 mt-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                Profile Synchronized
              </span>
            </div>
          </section>

          {/* Improved Builder Journey Map - Replicating screenshot layout */}
          <section className="pt-20 border-t border-stone-100">
             <div className="flex items-center gap-3 mb-10">
                <div className="w-5 h-5 bg-stone-100 border border-stone-200 flex items-center justify-center p-1">
                   <div className="grid grid-cols-2 gap-0.5">
                      <div className="w-1.5 h-1.5 bg-stone-900"></div>
                      <div className="w-1.5 h-1.5 bg-stone-300"></div>
                      <div className="w-1.5 h-1.5 bg-stone-300"></div>
                      <div className="w-1.5 h-1.5 bg-stone-900"></div>
                   </div>
                </div>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-stone-900">Builder Journey</h4>
             </div>
             
             <div className="flex gap-4 overflow-x-auto pb-8 -mx-12 px-12 snap-x hide-scrollbar">
                <JourneyCard 
                  icon="📄" 
                  title="Startup Profile" 
                  desc="Define your startup fundamentals." 
                  isActive={false} 
                />
                <JourneyCard 
                  icon="📊" 
                  title="Lean Canvas" 
                  desc="Map your problem, solution, UVP, and strategy." 
                  isActive={true} 
                />
                <JourneyCard 
                  icon="📉" 
                  title="Pitch Deck" 
                  desc="Generate investor-ready slides." 
                  isActive={false} 
                />
                <JourneyCard 
                  icon="🚀" 
                  title="GTM Strategy" 
                  desc="Build channels, ICP, messaging, and launch plan." 
                  isActive={false} 
                />
                <JourneyCard 
                  icon="👥" 
                  title="CRM Personas" 
                  desc="Create buyer personas for outreach." 
                  isActive={false} 
                />
                <JourneyCard 
                  icon="⚡" 
                  title="Tasks" 
                  desc="AI-generated actions for your next steps." 
                  isActive={false} 
                />
             </div>
          </section>
        </div>
      }
      rightPanel={
        <div className="space-y-12">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-stone-100 border border-stone-200">
               <span className="text-lg">🧠</span>
             </div>
             <div>
               <h3 className="text-[11px] font-bold uppercase tracking-widest text-stone-900">Intelligence Agent</h3>
               <p className="text-[9px] text-stone-400 uppercase font-bold tracking-tighter">Strategic Auditor v0.4</p>
             </div>
          </div>

          <div className="space-y-12">
            <div className="p-8 bg-stone-50 border border-stone-100 font-serif italic text-stone-800 text-sm leading-relaxed border-l-4 border-stone-900 relative">
               <span className="absolute -top-3 left-6 bg-stone-900 text-white text-[8px] font-bold uppercase px-2 py-0.5 tracking-widest">Urgent Note</span>
               "I've synchronized your ${canvas.fundraisingGoal?.toLocaleString()} goal. Based on your cost structure, your current revenue model requires 24% higher retention to reach breakeven within the stated runway."
            </div>

            <div>
               <p className="text-[10px] font-bold uppercase tracking-widest text-stone-900 mb-6">Strategic Inference Tools</p>
               <div className="space-y-4">
                  <IntelligenceButton 
                    label="Improve Value Prop (Gemini 3 Pro)" 
                    icon="✨" 
                    onClick={handleAIImproveUVP} 
                    loading={loadingAction === 'uvp'}
                  />
                  <IntelligenceButton 
                    label="Audit Strategy Consistency" 
                    icon="🔍" 
                    onClick={() => {}} 
                  />
               </div>
            </div>

            <div className="pt-8 border-t border-stone-100">
               <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-6">Risk Density Map</p>
               <div className="flex items-center gap-4">
                  <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 w-[72%]"></div>
                  </div>
                  <span className="text-[11px] font-bold text-stone-900">72%</span>
               </div>
               <p className="text-[9px] text-stone-400 font-serif mt-3 italic text-right">Iteration required on Channel selection.</p>
            </div>
          </div>
        </div>
      }
    />
  );
};

/* --- SHARED UI SUB-COMPONENTS --- */

const BlockHeader: React.FC<{ 
  title: string, 
  subtitle: string, 
  isSub?: boolean, 
  onAssist?: () => void, 
  loading?: boolean 
}> = ({ title, subtitle, isSub, onAssist, loading }) => (
  <div className={`p-6 border-b border-stone-100 ${isSub ? 'border-t border-stone-100 pt-8' : ''} flex justify-between items-start`}>
    <div>
      <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-900 mb-1">{title}</h4>
      <p className="text-[9px] text-stone-400 font-serif leading-tight italic">{subtitle}</p>
    </div>
    {onAssist && (
      <button 
        onClick={onAssist}
        disabled={loading}
        className="text-[11px] text-stone-300 hover:text-stone-900 transition-colors p-1.5 -mt-1.5 hover:rotate-12 transform"
        title="AI Strategic Assistance"
      >
        {loading ? '...' : '✨'}
      </button>
    )}
  </div>
);

const BlockList: React.FC<{ items: string[], onUpdate: (val: string[]) => void }> = ({ items, onUpdate }) => {
  const handleUpdate = (idx: number, val: string) => {
    const newItems = [...items];
    newItems[idx] = val;
    onUpdate(newItems);
  };

  const addItem = () => onUpdate([...items, '']);

  return (
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li key={i} className="text-xs text-stone-700 font-serif italic leading-relaxed flex items-start gap-3 group">
          <span className="text-stone-200 text-[11px] mt-1 shrink-0">•</span>
          <textarea 
            className="flex-1 bg-transparent focus:outline-none resize-none border-b border-transparent focus:border-stone-50 transition-all py-1" 
            value={item} 
            onChange={(e) => handleUpdate(i, e.target.value)}
            rows={1}
            onInput={(e: any) => {
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
          />
        </li>
      ))}
      <li>
        <button 
          onClick={addItem}
          className="text-[9px] font-bold uppercase text-stone-300 hover:text-stone-900 transition-all mt-4 border-b border-stone-100 hover:border-stone-900"
        >
          + Add Assumption
        </button>
      </li>
    </ul>
  );
};

const JourneyCard: React.FC<{ icon: string, title: string, desc: string, isActive: boolean }> = ({ icon, title, desc, isActive }) => (
  <div className={`w-56 shrink-0 p-6 border transition-all cursor-pointer group snap-start bg-white relative ${isActive ? 'border-stone-900 ring-1 ring-stone-900' : 'border-stone-200 hover:border-stone-400'}`}>
     <div className="absolute top-4 right-4 text-[10px] text-stone-300 group-hover:text-stone-900 transition-colors">→</div>
     <div className="flex flex-col h-full">
        <div className={`w-10 h-10 flex items-center justify-center text-sm rounded-full mb-6 transition-colors ${isActive ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-500 group-hover:bg-stone-200 group-hover:text-stone-900'}`}>
           {icon}
        </div>
        <h5 className="text-[11px] font-bold text-stone-900 uppercase tracking-widest mb-2">{title}</h5>
        <p className="text-[10px] text-stone-400 font-serif leading-relaxed line-clamp-2 italic">{desc}</p>
     </div>
  </div>
);

const ContextBadge: React.FC<{ label: string, status: string }> = ({ label, status }) => (
  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-tighter">
    <span className="text-stone-400">{label}</span>
    <span className="text-stone-900">{status}</span>
  </div>
);

const IntelligenceButton: React.FC<{ label: string, icon: string, onClick: () => void, loading?: boolean }> = ({ label, icon, onClick, loading }) => (
  <button 
    onClick={onClick}
    disabled={loading}
    className="w-full py-4 border border-stone-200 text-stone-600 text-[10px] font-bold uppercase tracking-[0.25em] hover:border-stone-900 hover:text-stone-900 transition-all flex items-center justify-center gap-4 bg-white shadow-sm"
  >
    <span className="text-sm">{loading ? '⏳' : icon}</span>
    {loading ? 'Thinking...' : label}
  </button>
);

export default LeanCanvas;
