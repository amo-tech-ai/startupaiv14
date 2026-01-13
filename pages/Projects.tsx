import React, { useState, useEffect } from 'react';
import ThreePanelLayout from '../components/ThreePanelLayout';
import { Project, Task, Priority } from '../types';
import { getProjectAnalysis, suggestProjectTasks } from '../services/gemini';

interface ProjectsProps {
  setTasks?: React.Dispatch<React.SetStateAction<Task[]>>;
}

const Projects: React.FC<ProjectsProps> = ({ setTasks }) => {
  const [projects, setProjects] = useState<Project[]>([
    { id: '1', name: 'Seed Fundraising Sprint', status: 'active', progress: 45, deadline: 'Apr 15', description: 'Outreach' },
    { id: '2', name: 'MVP v1 Build', status: 'active', progress: 62, deadline: 'Mar 01', description: 'Development' },
    { id: '3', name: 'Q1 GTM Launch', status: 'active', progress: 15, deadline: 'May 20', description: 'Strategy' },
    { id: '4', name: 'Investor Pipeline Expansion', status: 'completed', progress: 100, deadline: 'Feb 10', description: 'Done' },
    { id: '5', name: 'Legal Incorporation & IP', status: 'active', progress: 80, deadline: 'Feb 28', description: 'Review' }
  ]);

  const [analysis, setAnalysis] = useState<{ globalHealth: number, insights: string[], projectScores: Record<string, number> } | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      const data = await getProjectAnalysis(projects);
      setAnalysis(data);
      setLoading(false);
    };
    fetchAnalysis();
  }, []);

  return (
    <ThreePanelLayout
      title="Project Overview"
      leftPanel={
        <div className="space-y-8">
          <div>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-6">Initiatives</p>
            <div className="space-y-2">
              <button className="block w-full text-left text-xs font-bold text-stone-900 border-l-2 border-stone-900 pl-4 -ml-4 transition-all">All Projects</button>
              <button className="block w-full text-left text-xs text-stone-400 hover:text-stone-900 pl-4 -ml-4 border-l-2 border-transparent transition-all">Internal</button>
              <button className="block w-full text-left text-xs text-stone-400 hover:text-stone-900 pl-4 -ml-4 border-l-2 border-transparent transition-all">External</button>
            </div>
          </div>
          <div className="p-6 bg-stone-100 border border-stone-200">
            <h4 className="text-[10px] font-bold text-stone-900 uppercase tracking-widest mb-3">Resource Load</h4>
            <p className="text-xs leading-relaxed text-stone-600 font-serif italic">
              "Developer bandwidth is at 85% capacity. Suggest deferring Phase 2 tasks until GTM launch is stabilized."
            </p>
          </div>
        </div>
      }
      mainPanel={
        <div className="space-y-10">
          {/* Top Actions */}
          <div className="flex justify-between items-center mb-4">
             <p className="text-sm text-stone-400 font-serif italic">Manage your initiatives, deadlines, and deliverables.</p>
             <div className="flex gap-2">
               <button className="px-4 py-2 border border-stone-200 text-[10px] font-bold uppercase tracking-widest hover:border-stone-900">Filter</button>
               <button className="px-4 py-2 bg-stone-900 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800">+ New Project</button>
             </div>
          </div>

          {/* View Toggles & Search */}
          <div className="flex justify-between items-center">
            <div className="flex bg-stone-100 p-1 border border-stone-200 rounded-sm">
              <button className="px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest bg-white text-stone-900 shadow-sm">List View</button>
              <button className="px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900">Timeline</button>
            </div>
            <div className="relative w-64">
              <input 
                type="text" 
                placeholder="Search projects..."
                className="w-full pl-8 pr-4 py-2 bg-white border border-stone-200 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-stone-900"
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-300">🔍</span>
            </div>
          </div>

          {/* Metric Row */}
          <div className="grid grid-cols-4 gap-4">
            <SummaryCard label="Overall Completion" value="64%" delta="+8%" />
            <SummaryCard label="Active Projects" value="6" delta="On track" deltaColor="text-stone-400" />
            <SummaryCard label="Milestones Risk" value="3" delta="+2 this week" deltaColor="text-rose-600" />
            <SummaryCard label="Tasks Completed" value="128" delta="+12%" />
          </div>

          {/* Project List */}
          <div className="space-y-6">
            <div className="flex justify-between items-baseline border-b border-stone-200 pb-4">
               <div className="flex items-center gap-3">
                 <h3 className="text-lg font-serif font-bold text-stone-900">Active Projects</h3>
                 <span className="text-[10px] font-bold bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full">{projects.length}</span>
               </div>
               <button className="text-[9px] font-bold uppercase text-stone-400 hover:text-stone-900 transition-all">Sort by Status ↓</button>
            </div>

            <div className="space-y-px bg-stone-200 border border-stone-200">
              {projects.map(proj => (
                <div 
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className="bg-white p-8 group hover:bg-stone-50 transition-all cursor-pointer flex items-center gap-8"
                >
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${proj.progress === 100 ? 'bg-emerald-500' : proj.progress < 30 ? 'bg-amber-500' : 'bg-rose-500'}`}></div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-lg font-serif font-bold text-stone-900">{proj.name}</h4>
                      <span className="text-[8px] font-bold uppercase px-2 py-0.5 border border-stone-100 bg-stone-50 text-stone-400">{proj.description}</span>
                    </div>
                    <div className="flex gap-4 items-center">
                       <p className="text-[9px] font-bold text-stone-300 uppercase tracking-widest">📅 {proj.deadline}</p>
                       <p className="text-[9px] font-bold text-stone-300 uppercase tracking-widest italic">• 2h ago</p>
                    </div>
                  </div>

                  <div className="w-64">
                    <div className="flex justify-between text-[9px] font-bold uppercase text-stone-400 mb-2">
                      <span>Progress</span>
                      <span>{proj.progress}%</span>
                    </div>
                    <div className="h-1 bg-stone-100 w-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${proj.progress === 100 ? 'bg-stone-900' : 'bg-stone-400'}`} 
                        style={{ width: `${proj.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex -space-x-2 shrink-0">
                    <Avatar label="A S" />
                    <Avatar label="M D" />
                  </div>

                  <span className="text-stone-200 group-hover:text-stone-900 transition-all">→</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
      rightPanel={
        <div className="space-y-10">
          {/* AI Coach Alerts */}
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 border border-stone-900 rotate-45 flex items-center justify-center">
                  <div className="w-1 h-1 bg-stone-900"></div>
                </div>
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-stone-900">AI Coach</h3>
              </div>
              <span className="text-[9px] font-bold uppercase bg-stone-100 text-stone-500 px-2 py-0.5">3 New</span>
            </div>

            <AlertItem 
              icon="⚠️"
              title="Timeline Risk Detected"
              desc="4 tasks in 'MVP Build' are overdue. Consider extending the sprint by 1 week."
            />
            <AlertItem 
              icon="📄"
              title="Missing Financials"
              desc="Your Pitch Deck is missing a 'Financial Projections' slide."
            />
            <AlertItem 
              icon="👤"
              title="Investor Follow-up"
              desc="3 investors haven't replied in 7 days."
            />

            <button className="w-full py-2 text-[9px] font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-all border-t border-stone-100 pt-6">View All Insights →</button>
          </div>

          {/* Quick Actions Grid */}
          <div className="space-y-6 pt-10 border-t border-stone-200">
             <h3 className="text-[11px] font-bold uppercase tracking-widest text-stone-900">Quick Actions</h3>
             <div className="grid grid-cols-2 gap-3">
                <ActionBox icon="+" label="New Project" />
                <ActionBox icon="🚀" label="GTM Plan" />
                <ActionBox icon="📊" label="Pitch Deck" />
                <ActionBox icon="💬" label="Ask AI" />
             </div>
          </div>
        </div>
      }
    />
  );
};

const SummaryCard: React.FC<{ label: string, value: string, delta: string, deltaColor?: string }> = ({ label, value, delta, deltaColor = "text-emerald-600" }) => (
  <div className="bg-white p-6 border border-stone-200">
    <div className="flex justify-between items-start mb-4">
      <p className="text-[9px] font-bold uppercase tracking-widest text-stone-400">{label}</p>
      <div className="w-6 h-6 border border-stone-100 rotate-45 flex items-center justify-center">
        <div className="w-1 h-1 bg-stone-200 -rotate-45"></div>
      </div>
    </div>
    <div className="flex justify-between items-end">
      <p className="text-2xl font-serif font-bold text-stone-900">{value}</p>
      <span className={`text-[9px] font-bold uppercase ${deltaColor}`}>{delta}</span>
    </div>
  </div>
);

const AlertItem: React.FC<{ icon: string, title: string, desc: string }> = ({ icon, title, desc }) => (
  <div className="p-6 bg-white border border-stone-200 group hover:border-stone-900 transition-all cursor-pointer">
    <div className="flex gap-4">
      <div className="text-xl grayscale group-hover:grayscale-0 transition-all">{icon}</div>
      <div>
        <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-900 mb-1">{title}</h4>
        <p className="text-[10px] text-stone-500 font-serif leading-relaxed italic line-clamp-2">"{desc}"</p>
      </div>
    </div>
  </div>
);

const ActionBox: React.FC<{ icon: string, label: string }> = ({ icon, label }) => (
  <button className="aspect-square flex flex-col items-center justify-center bg-white border border-stone-200 hover:border-stone-900 group transition-all">
    <span className="text-xl mb-3 grayscale group-hover:grayscale-0 transition-all">{icon}</span>
    <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400 group-hover:text-stone-900">{label}</span>
  </button>
);

const Avatar: React.FC<{ label: string }> = ({ label }) => (
  <div className="w-8 h-8 rounded-full bg-stone-100 border-2 border-white flex items-center justify-center text-[9px] font-bold text-stone-400">
    {label}
  </div>
);

export default Projects;
