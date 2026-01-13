
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
  const fundraisingProgress = profile.fundraisingGoal > 0 
    ? Math.min(Math.round((profile.revenue / (profile.fundraisingGoal / 100)) * 10), 100) 
    : 0;

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
        <div className="space-y-16">
          {/* NBA Hero Section */}
          <section className="bg-stone-900 text-white p-12 border border-stone-900 relative group overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <div className="w-32 h-32 border-4 border-white rotate-45"></div>
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <span className={`px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest border border-white/20 ${nba?.urgency === 'high' ? 'bg-rose-500 border-rose-500' : ''}`}>
                  Strategic Priority #1
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Next Best Action</span>
              </div>
              <h3 className="text-4xl font-serif font-bold mb-4">
                {loading ? "Calculating Next Step..." : nba?.title}
              </h3>
              <p className="text-stone-400 text-sm max-w-xl font-serif italic leading-relaxed">
                {loading ? "Running strategic inference across your dataset..." : nba?.reason}
              </p>
              <button className="mt-10 px-10 py-4 bg-white text-stone-900 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-stone-100 transition-all">
                Execute Action
              </button>
            </div>
          </section>

          {/* Today's Priorities */}
          <section>
            <div className="flex justify-between items-baseline mb-8">
              <h3 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">Focus Backlog</h3>
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Active Sprint</span>
            </div>
            <div className="space-y-px bg-stone-200 border border-stone-200">
              {priorities.map(task => (
                <div key={task.id} className="group flex items-center p-8 bg-white hover:bg-stone-50 transition-colors">
                  <div className={`w-0.5 h-12 mr-8 ${task.priority === 'high' ? 'bg-rose-500' : 'bg-stone-300'}`}></div>
                  <div className="flex-1">
                    <p className="text-lg font-serif text-stone-900">{task.title}</p>
                    <p className="text-[10px] text-stone-400 mt-2 uppercase tracking-widest font-bold">{task.category}</p>
                  </div>
                  <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-300 group-hover:text-stone-900 transition-colors">Mark Complete</button>
                </div>
              ))}
            </div>
          </section>

          {/* Key Metrics */}
          <section>
            <h3 className="text-2xl font-serif font-bold text-stone-900 tracking-tight mb-8">Operational Vitals</h3>
            <div className="grid grid-cols-3 gap-px bg-stone-200 border border-stone-200">
              <DashboardMetric label="Monthly Revenue" value={`$${profile.revenue.toLocaleString()}`} delta={profile.growthRate > 0 ? `+${profile.growthRate}%` : '0%'} />
              <DashboardMetric label="Active Base" value={profile.users.toLocaleString()} delta="+2.4%" />
              <DashboardMetric label="Burn Rate" value={`$${Math.round(profile.revenue / 2).toLocaleString()}`} delta="Stable" />
            </div>
          </section>

          {/* Fundraising Viz */}
          <section className="bg-stone-100 p-12 border border-stone-200 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-stone-900">Capital Momentum</h3>
                  <p className="text-stone-500 text-sm mt-1 font-serif italic">Targeting ${profile.fundraisingGoal.toLocaleString()} Seed Round</p>
                </div>
                <span className="text-3xl font-serif font-bold text-stone-900">{fundraisingProgress}%</span>
              </div>
              <div className="h-1 bg-stone-300 w-full overflow-hidden">
                <div 
                  className="h-full bg-stone-900 transition-all duration-1000 ease-out" 
                  style={{ width: `${fundraisingProgress}%` }}
                ></div>
              </div>
            </div>
          </section>
        </div>
      }
      rightPanel={
        loading ? (
          <div className="space-y-12 animate-pulse">
            {[1, 2, 3].map(i => (
              <div key={i} className="space-y-3">
                <div className="h-2 w-20 bg-stone-200"></div>
                <div className="h-20 bg-stone-100"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-4">What does this mean?</p>
              <p className="text-sm leading-relaxed text-stone-800 font-serif italic border-l-2 border-stone-200 pl-4 py-1">
                "{insight?.meaning}"
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-4">What should I do next?</p>
              <div className="p-6 bg-white border border-stone-200">
                <p className="text-sm leading-relaxed text-stone-800 font-medium font-serif">
                  {insight?.action}
                </p>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-4">Why does this matter now?</p>
              <p className="text-xs leading-relaxed text-stone-600 bg-stone-100 p-6 font-serif leading-relaxed italic">
                {insight?.urgency}
              </p>
            </div>
          </>
        )
      }
    />
  );
};

const MiniMilestone: React.FC<{ label: string, completed: boolean }> = ({ label, completed }) => (
  <div className="flex items-center gap-3">
    <div className={`w-2.5 h-2.5 rounded-full border border-stone-300 ${completed ? 'bg-stone-900 border-stone-900' : 'bg-transparent'}`}></div>
    <span className={`text-[10px] font-bold uppercase tracking-tight ${completed ? 'text-stone-900' : 'text-stone-400'}`}>{label}</span>
  </div>
);

const DashboardMetric: React.FC<{ label: string, value: string, delta: string }> = ({ label, value, delta }) => (
  <div className="bg-white p-10">
    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-6">{label}</p>
    <p className="text-3xl font-serif font-bold text-stone-900 mb-2 tracking-tight">{value}</p>
    <p className={`text-[10px] font-bold uppercase tracking-widest ${delta.startsWith('+') ? 'text-emerald-600' : 'text-stone-400'}`}>
      {delta} Trend
    </p>
  </div>
);

export default Dashboard;
