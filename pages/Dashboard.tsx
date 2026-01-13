import React, { useEffect, useState } from 'react';
import ThreePanelLayout from '../components/ThreePanelLayout';
import { StartupProfile, Task, AIInsight } from '../types';
import { getDashboardInsights, getNextBestAction, NBA } from '../services/gemini';

interface DashboardProps {
  profile: StartupProfile;
  tasks: Task[];
}

const Dashboard: React.FC<DashboardProps> = ({ profile, tasks }) => {
  const [insight, setInsight] = useState<AIInsight | null>(null);
  const [nba, setNBA] = useState<NBA | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [insightData, nbaData] = await Promise.all([
        getDashboardInsights(profile),
        getNextBestAction(profile, tasks)
      ]);
      setInsight(insightData);
      setNBA(nbaData);
      setLoading(false);
    };
    fetchData();
  }, [profile, tasks]);

  const priorities = tasks.filter(t => !t.completed).slice(0, 3);

  return (
    <ThreePanelLayout
      title="Command Center"
      leftPanel={
        <div className="space-y-8">
          <div>
            <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4">Core Vitals</h4>
            <div className="space-y-4">
              <MiniMilestone label="Profile Status" completed={profile.isWizardComplete} />
              <MiniMilestone label="Readiness Check" completed={!!profile.readinessScore} />
              <MiniMilestone label="Strategy Locked" completed={profile.isWizardComplete} />
            </div>
          </div>
          <div className="p-4 bg-white border border-stone-200">
            <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Runway Status</h4>
            <p className="text-xl font-serif font-bold text-stone-900">{profile.runway} Months</p>
            <p className={`text-[10px] font-bold uppercase mt-1 ${profile.runway < 4 ? 'text-rose-600' : 'text-emerald-600'}`}>
              {profile.runway < 4 ? 'Caution Required' : 'Operational Buffer'}
            </p>
          </div>
        </div>
      }
      mainPanel={
        <div className="space-y-12">
          {/* Header Section */}
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <h2 className="text-4xl font-serif font-bold text-stone-900">{profile.name || "My Startup"}</h2>
              <p className="text-stone-400 font-serif italic text-sm">{profile.tagline || "Your tagline goes here"}</p>
              <div className="flex gap-4 pt-2">
                <Badge icon="🏢" label={profile.industry || "Tech"} />
                <Badge icon="📍" label="Remote" />
                <Badge icon="👥" label="1 Employees" />
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-5 py-2.5 border border-stone-200 text-stone-600 text-[10px] font-bold uppercase tracking-widest hover:border-stone-900 transition-colors">Edit Profile</button>
              <button className="px-5 py-2.5 bg-stone-900 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800 transition-colors">Share Profile</button>
            </div>
          </div>

          {/* NBA Hero Card */}
          <section className="bg-stone-900 text-white p-10 border border-stone-900 relative group overflow-hidden rounded-sm">
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-6">
                <div className="w-10 h-10 border border-white/20 flex items-center justify-center rotate-45">
                   <div className="w-1.5 h-1.5 bg-white -rotate-45"></div>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">Next Best Action</p>
                  <h3 className="text-xl font-serif font-bold">{loading ? "Calculating..." : nba?.title}</h3>
                  <p className="text-[11px] text-stone-400 font-serif italic mt-1 max-w-lg">{loading ? "Reading context..." : nba?.reason}</p>
                </div>
              </div>
              <button className="px-8 py-3 bg-white text-stone-900 text-[10px] font-bold uppercase tracking-widest hover:bg-stone-100 transition-all">
                Execute
              </button>
            </div>
          </section>

          {/* Operational Metrics Grid */}
          <div className="grid grid-cols-4 gap-4">
            <MetricCard label="MRR" value={`$${profile.revenue}`} delta="+12%" />
            <MetricCard label="Active Users" value={profile.users.toString()} delta="+5%" />
            <MetricCard label="Runway" value={`${profile.runway} Mo`} delta="-1 Mo" deltaColor="text-rose-600" />
            <MetricCard label="Profile Score" value={`${profile.readinessScore || 20}%`} delta="Improving" deltaColor="text-stone-400" />
          </div>

          {/* Active Workflows */}
          <section>
            <div className="flex justify-between items-baseline mb-6">
              <h3 className="text-lg font-serif font-bold text-stone-900">Active Workflows</h3>
              <button className="text-[10px] text-stone-400 font-bold uppercase tracking-widest hover:text-stone-900">View All</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <WorkflowCard 
                title="Fundraising Workflow" 
                desc="Get ready to pitch investors. Generates tasks, pitch deck, and updates."
                status="In Progress"
                statusColor="bg-amber-100 text-amber-600"
                icon="📈"
              />
              <WorkflowCard 
                title="GTM Workflow" 
                desc="Launch your product with channel strategy, messaging, and ICP analysis."
                status="Pending"
                statusColor="bg-stone-100 text-stone-400"
                icon="🚀"
              />
              <WorkflowCard 
                title="Product Roadmap" 
                desc="Define features, prioritization, and milestone planning."
                status="Not Started"
                statusColor="bg-stone-100 text-stone-400"
                icon="⚡"
              />
              <div className="border-2 border-dashed border-stone-200 p-8 flex flex-col items-center justify-center group hover:border-stone-900 transition-colors cursor-pointer">
                <span className="text-2xl text-stone-200 group-hover:text-stone-900 mb-2">+</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-300 group-hover:text-stone-900">Add Workflow</span>
              </div>
            </div>
          </section>

          {/* Materials & Team Availability */}
          <div className="grid grid-cols-2 gap-4">
            <section className="p-8 bg-white border border-stone-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-serif font-bold text-stone-900 flex items-center gap-2">
                  📄 Pitch Materials
                </h3>
                <span className="text-stone-300">...</span>
              </div>
              <div className="space-y-4">
                <FileItem name="Series A Deck.pdf" date="2d ago" size="2.4 MB" />
                <FileItem name="Financial Model v3.xlsx" date="5d ago" size="1.1 MB" />
                <FileItem name="One Pager.pdf" date="1w ago" size="800 KB" />
                <button className="w-full mt-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-stone-100 hover:border-stone-900 transition-colors">View Data Room</button>
              </div>
            </section>
            
            <section className="p-8 bg-white border border-stone-200 flex flex-col items-center justify-center text-center">
              <div className="flex justify-between items-center w-full mb-auto">
                <h3 className="text-sm font-serif font-bold text-stone-900 flex items-center gap-2">
                  👥 Team Availability
                </h3>
              </div>
              <div className="mb-auto py-12">
                <p className="text-xs text-stone-400 font-serif italic">Manage Team Access</p>
              </div>
            </section>
          </div>
        </div>
      }
      rightPanel={
        <div className="space-y-10">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-stone-100 border border-stone-200">
               <span className="text-sm">✨</span>
             </div>
             <div>
               <h3 className="text-[11px] font-bold uppercase tracking-widest text-stone-900">AI Coach</h3>
               <p className="text-[9px] text-stone-400 uppercase font-bold">Strategic Insights</p>
             </div>
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-900 mb-4">Focus Area</p>
              <div className="p-6 bg-white border border-stone-200 rounded-sm">
                 <p className="text-xs font-serif italic text-stone-700 leading-relaxed">
                   "{insight?.meaning || "Complete your profile to get AI insights."}"
                 </p>
                 <div className="flex items-center gap-2 mt-4 text-stone-900">
                   <span className="text-xs">⚡</span>
                   <span className="text-[10px] font-bold uppercase tracking-widest">High Impact Opportunity</span>
                 </div>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-900 mb-4">Risk Radar</p>
              <p className="text-xs font-serif text-stone-500 italic">No critical risks detected.</p>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-900 mb-4">Suggested Steps</p>
              <div className="space-y-3">
                {priorities.map(task => (
                  <div key={task.id} className="flex items-start gap-3 group cursor-pointer">
                    <div className="w-3.5 h-3.5 border border-stone-200 mt-0.5 group-hover:border-stone-900"></div>
                    <span className="text-xs font-serif text-stone-600 group-hover:text-stone-900">{task.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button className="w-full py-3 bg-white border border-stone-200 text-stone-900 text-[10px] font-bold uppercase tracking-widest hover:border-stone-900 transition-colors mt-auto">
            Generate Full Report
          </button>
        </div>
      }
    />
  );
};

const MetricCard: React.FC<{ label: string, value: string, delta: string, deltaColor?: string }> = ({ label, value, delta, deltaColor = "text-emerald-600" }) => (
  <div className="bg-white p-6 border border-stone-200">
    <p className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mb-4">{label}</p>
    <div className="flex justify-between items-end">
      <p className="text-2xl font-serif font-bold text-stone-900">{value}</p>
      <span className={`text-[9px] font-bold uppercase bg-stone-50 px-1.5 py-0.5 border border-stone-100 ${deltaColor}`}>{delta}</span>
    </div>
  </div>
);

const WorkflowCard: React.FC<{ title: string, desc: string, status: string, statusColor: string, icon: string }> = ({ title, desc, status, statusColor, icon }) => (
  <div className="p-6 bg-white border border-stone-200 hover:border-stone-900 transition-all cursor-pointer group">
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 bg-stone-50 border border-stone-100 flex items-center justify-center text-lg grayscale group-hover:grayscale-0 transition-all">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <h4 className="text-xs font-serif font-bold text-stone-900">{title}</h4>
          <span className={`text-[8px] font-bold uppercase px-2 py-0.5 rounded-sm ${statusColor}`}>{status}</span>
        </div>
        <p className="text-[10px] text-stone-400 font-serif leading-relaxed line-clamp-2">{desc}</p>
      </div>
      <span className="text-stone-200 group-hover:text-stone-900 transition-colors">→</span>
    </div>
  </div>
);

const FileItem: React.FC<{ name: string, date: string, size: string }> = ({ name, date, size }) => (
  <div className="flex items-center gap-4 group cursor-pointer">
    <div className="w-8 h-8 bg-stone-50 border border-stone-100 flex items-center justify-center text-stone-400 group-hover:text-stone-900 transition-colors">
      📄
    </div>
    <div className="flex-1">
      <p className="text-xs font-serif font-bold text-stone-700 group-hover:text-stone-900">{name}</p>
      <p className="text-[9px] text-stone-400 uppercase font-bold">{date} • {size}</p>
    </div>
  </div>
);

const Badge: React.FC<{ icon: string, label: string }> = ({ icon, label }) => (
  <div className="flex items-center gap-2 px-3 py-1 bg-stone-100/50 border border-stone-200 rounded-sm">
    <span className="text-[10px] grayscale">{icon}</span>
    <span className="text-[9px] font-bold uppercase text-stone-500">{label}</span>
  </div>
);

const MiniMilestone: React.FC<{ label: string, completed: boolean }> = ({ label, completed }) => (
  <div className="flex items-center gap-3">
    <div className={`w-2.5 h-2.5 rounded-full border border-stone-300 ${completed ? 'bg-stone-900 border-stone-900' : 'bg-transparent'}`}></div>
    <span className={`text-[10px] font-bold uppercase tracking-tight ${completed ? 'text-stone-900' : 'text-stone-400'}`}>{label}</span>
  </div>
);

export default Dashboard;