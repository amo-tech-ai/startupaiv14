import React, { useState, useEffect } from 'react';
import ThreePanelLayout from '../components/ThreePanelLayout';
import { Project } from '../types';
import { getProjectAnalysis } from '../services/gemini';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    { id: '1', name: 'GTM Strategy Phase 1', status: 'active', progress: 65, deadline: '2023-12-01', description: 'Early customer acquisition channel testing.' },
    { id: '2', name: 'Series A Deck Refinement', status: 'active', progress: 40, deadline: '2023-11-15', description: 'Storytelling audit and data viz updates.' },
    { id: '3', name: 'Product MVP Audit', status: 'stalled', progress: 85, deadline: '2023-10-30', description: 'Performance and security review.' }
  ]);
  const [analysis, setAnalysis] = useState<{ health: number, insights: string[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      const data = await getProjectAnalysis(projects);
      setAnalysis(data);
      setLoading(false);
    };
    fetchAnalysis();
  }, [projects]);

  return (
    <ThreePanelLayout
      title="Projects"
      leftPanel={
        <div className="space-y-8">
          <div>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4">Execution Health</p>
            <div className="text-4xl font-serif font-bold text-stone-900">{analysis?.health || 0}%</div>
            <p className="text-[10px] font-bold uppercase mt-1 text-emerald-600">On Schedule</p>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Filters</p>
            <button className="block text-xs font-bold text-stone-900">All Initiatives</button>
            <button className="block text-xs text-stone-400 hover:text-stone-900 transition-colors">Internal Ops</button>
            <button className="block text-xs text-stone-400 hover:text-stone-900 transition-colors">Customer Facing</button>
          </div>
        </div>
      }
      mainPanel={
        <div className="space-y-12">
          <div className="grid grid-cols-1 gap-px bg-stone-200 border border-stone-200">
            {projects.map(proj => (
              <div key={proj.id} className="p-10 bg-white group hover:bg-stone-50 transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${proj.status === 'active' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">{proj.status}</span>
                    </div>
                    <h4 className="text-3xl font-serif font-bold text-stone-900">{proj.name}</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-serif font-bold text-stone-900">{proj.progress}%</p>
                    <p className="text-[10px] font-bold uppercase text-stone-400">Complete</p>
                  </div>
                </div>
                <div className="h-0.5 bg-stone-100 w-full mb-8 overflow-hidden">
                  <div className="h-full bg-stone-900 transition-all duration-1000" style={{ width: `${proj.progress}%` }}></div>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-serif italic text-stone-500">{proj.description}</p>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-300 group-hover:text-stone-900 transition-colors">Deadline: {proj.deadline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
      rightPanel={
        loading ? (
          <div className="space-y-12 animate-pulse">
            <div className="h-4 w-24 bg-stone-200"></div>
            <div className="h-32 bg-stone-100"></div>
          </div>
        ) : (
          <div className="space-y-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-6">Risk Analyst</p>
              <div className="space-y-8">
                {analysis?.insights.map((insight, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 border border-stone-900 rotate-45"></div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-stone-900">Finding {idx + 1}</span>
                    </div>
                    <p className="text-sm font-serif leading-relaxed text-stone-800 italic">"{insight}"</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 bg-stone-900 text-white">
              <p className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-50">Operational Tip</p>
              <p className="text-xs font-serif leading-relaxed italic">"Consolidate stalled tasks into a single 'Spring Clean' sprint to restore momentum."</p>
            </div>
          </div>
        )
      }
    />
  );
};

export default Projects;