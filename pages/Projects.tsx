import React, { useState, useEffect } from 'react';
import ThreePanelLayout from '../components/ThreePanelLayout';
import { Project, Task } from '../types';
import { getProjectAnalysis, suggestProjectTasks } from '../services/gemini';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([
    { id: '1', name: 'GTM Strategy Phase 1', status: 'active', progress: 65, deadline: '2023-12-01', description: 'Early customer acquisition channel testing through LinkedIn and specialized forums.' },
    { id: '2', name: 'Series A Deck Refinement', status: 'active', progress: 40, deadline: '2023-11-15', description: 'Storytelling audit, updating financial models, and data visualization enhancements.' },
    { id: '3', name: 'Product MVP Audit', status: 'stalled', progress: 85, deadline: '2023-10-30', description: 'Comprehensive performance, security, and accessibility review prior to launch.' }
  ]);
  const [analysis, setAnalysis] = useState<{ globalHealth: number, insights: string[], projectScores: Record<string, number> } | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [suggestedTasks, setSuggestedTasks] = useState<Partial<Task>[]>([]);
  const [suggesting, setSuggesting] = useState(false);

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      const data = await getProjectAnalysis(projects);
      setAnalysis(data);
      
      // Map AI scores back to project state
      setProjects(prev => prev.map(p => ({
        ...p,
        healthScore: data.projectScores[p.id] || p.healthScore
      })));
      
      setLoading(false);
    };
    fetchAnalysis();
  }, []);

  const handleSuggestTasks = async () => {
    if (!selectedProject) return;
    setSuggesting(true);
    const tasks = await suggestProjectTasks(selectedProject);
    setSuggestedTasks(tasks);
    setSuggesting(false);
  };

  const getHealthColor = (score: number | undefined) => {
    if (score === undefined) return 'text-stone-400 border-stone-200';
    if (score >= 80) return 'text-emerald-600 border-emerald-200 bg-emerald-50';
    if (score >= 50) return 'text-amber-600 border-amber-200 bg-amber-50';
    return 'text-rose-600 border-rose-200 bg-rose-50';
  };

  return (
    <ThreePanelLayout
      title="Projects"
      leftPanel={
        <div className="space-y-8">
          <div>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4">Execution Health</p>
            <div className="text-4xl font-serif font-bold text-stone-900">{analysis?.globalHealth || 0}%</div>
            <p className="text-[10px] font-bold uppercase mt-1 text-emerald-600">Global Alignment</p>
          </div>
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Filters</p>
            <button className="block text-xs font-bold text-stone-900 underline underline-offset-4 decoration-stone-200">All Initiatives</button>
            <button className="block text-xs text-stone-400 hover:text-stone-900 transition-colors">Internal Ops</button>
            <button className="block text-xs text-stone-400 hover:text-stone-900 transition-colors">Customer Facing</button>
          </div>
        </div>
      }
      mainPanel={
        <div className="space-y-12">
          <div className="grid grid-cols-1 gap-px bg-stone-200 border border-stone-200">
            {projects.map(proj => (
              <div 
                key={proj.id} 
                onClick={() => {
                  setSelectedProject(proj);
                  setSuggestedTasks([]);
                }}
                className="p-10 bg-white group hover:bg-stone-50 transition-colors cursor-pointer relative overflow-hidden"
              >
                {proj.healthScore !== undefined && (
                  <div className={`absolute top-0 right-0 px-4 py-2 border-l border-b text-[10px] font-bold tracking-widest uppercase transition-colors ${getHealthColor(proj.healthScore)}`}>
                    Health: {proj.healthScore}
                  </div>
                )}
                
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
                  <p className="text-sm font-serif italic text-stone-500 truncate max-w-md">{proj.description}</p>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-300 group-hover:text-stone-900 transition-colors">Deadline: {proj.deadline}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Project Detail Modal */}
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
              <div className="bg-white border border-stone-200 w-full max-w-2xl overflow-hidden animate-in slide-in-from-bottom-4 duration-500 shadow-2xl">
                <div className="p-8 border-b border-stone-200 flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Project Detail</span>
                       <span className={`px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest border border-stone-200 ${selectedProject.status === 'active' ? 'text-emerald-600' : 'text-rose-600'}`}>
                         {selectedProject.status}
                       </span>
                    </div>
                    <h3 className="text-4xl font-serif font-bold text-stone-900">{selectedProject.name}</h3>
                  </div>
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="text-stone-300 hover:text-stone-900 transition-colors p-2"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>
                
                <div className="p-8 space-y-8 overflow-y-auto max-h-[70vh]">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Description</p>
                    <p className="text-lg font-serif text-stone-700 leading-relaxed italic">"{selectedProject.description}"</p>
                  </div>

                  <div className="grid grid-cols-3 gap-8 border-y border-stone-100 py-6">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Deadline</p>
                      <p className="text-xl font-serif font-bold text-stone-900">{selectedProject.deadline}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Completion</p>
                      <p className="text-xl font-serif font-bold text-stone-900">{selectedProject.progress}%</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">AI Health</p>
                      <p className={`text-xl font-serif font-bold ${getHealthColor(selectedProject.healthScore).split(' ')[0]}`}>
                        {selectedProject.healthScore || '??'} / 100
                      </p>
                    </div>
                  </div>

                  <div className="pt-8">
                    <div className="flex justify-between items-center mb-6">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-stone-900">Strategic Task Suggestions</p>
                      <button 
                        disabled={suggesting}
                        onClick={handleSuggestTasks}
                        className="text-[10px] font-bold uppercase tracking-widest bg-stone-900 text-white px-4 py-2 hover:bg-stone-800 disabled:opacity-50 transition-all flex items-center gap-2"
                      >
                        {suggesting && <div className="w-2 h-2 border border-white border-t-transparent rounded-full animate-spin"></div>}
                        {suggesting ? "Analyzing Roadmap..." : "Generate AI Tasks"}
                      </button>
                    </div>

                    {suggestedTasks.length > 0 ? (
                      <div className="space-y-3">
                        {suggestedTasks.map((t, i) => (
                          <div key={i} className="p-4 bg-stone-50 border border-stone-100 flex justify-between items-center group hover:border-stone-200 transition-colors">
                            <div>
                              <p className="text-sm font-serif text-stone-900">{t.title}</p>
                              <p className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mt-1">{t.category} • {t.priority} priority</p>
                            </div>
                            <button className="text-[10px] font-bold uppercase tracking-widest text-stone-300 group-hover:text-stone-900 transition-colors">Add to Backlog +</button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-8 text-center border border-dashed border-stone-200 bg-stone-50/50">
                        <p className="text-xs font-serif text-stone-400 italic">Generate AI-driven tasks to accelerate this project.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 bg-stone-50 border-t border-stone-200 text-right">
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="px-8 py-3 text-[10px] font-bold uppercase tracking-widest border border-stone-200 text-stone-400 hover:border-stone-900 hover:text-stone-900 transition-all"
                  >
                    Close Project Console
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      }
      rightPanel={
        loading ? (
          <div className="space-y-12 animate-pulse">
            <div className="h-4 w-24 bg-stone-200"></div>
            <div className="h-32 bg-stone-100"></div>
            <div className="h-32 bg-stone-100"></div>
          </div>
        ) : (
          <div className="space-y-12">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-6">Strategic Risk Audit</p>
              <div className="space-y-8">
                {analysis?.insights.map((insight, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 border border-stone-900 rotate-45"></div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-stone-900">Insight {idx + 1}</span>
                    </div>
                    <p className="text-sm font-serif leading-relaxed text-stone-800 italic border-l border-stone-200 pl-4 py-1">"{insight}"</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 bg-stone-900 text-white border border-stone-800">
              <p className="text-[10px] font-bold uppercase tracking-widest mb-2 opacity-50">Operational Protocol</p>
              <p className="text-xs font-serif leading-relaxed italic">"Execution health below 60% indicates a potential bottleneck in decision speed. Review stalled items immediately."</p>
            </div>
          </div>
        )
      }
    />
  );
};

export default Projects;