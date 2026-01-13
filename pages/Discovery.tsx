import React, { useState } from 'react';
import ThreePanelLayout from '../components/ThreePanelLayout';
import { StartupProfile, DiscoveryResult } from '../types';
import { getDiscoveryResults } from '../services/gemini';

interface DiscoveryProps {
  profile: StartupProfile;
}

const Discovery: React.FC<DiscoveryProps> = ({ profile }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<DiscoveryResult[]>([
    // Normalized types to lowercase to match the DiscoveryResult type
    { id: '1', name: 'Elena Rodriguez', type: 'lead', relevance: 94, reason: 'High role relevance + Recent Series B funding', source: 'TechFlow Systems' },
    { id: '2', name: 'Marcus Chen', type: 'investor', relevance: 88, reason: 'Invests in early-stage B2B SaaS', source: 'Chen Capital' },
    { id: '3', name: 'Sarah Johnson', type: 'partner', relevance: 72, reason: 'Potential integration partner', source: 'Creative Solutions' },
    { id: '4', name: 'David Kim', type: 'lead', relevance: 91, reason: 'Perfect tech stack match', source: 'BuildRight' },
    { id: '5', name: 'Olivia Wilson', type: 'lead', relevance: 65, reason: 'Role matches but industry is adjacent', source: 'GrowthHacks' },
  ]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<DiscoveryResult | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    const data = await getDiscoveryResults(query, profile);
    if (data.length > 0) setResults(data);
    setLoading(false);
  };

  return (
    <ThreePanelLayout
      title="Contact Discovery"
      leftPanel={
        <div className="space-y-8">
          <div>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-6">Discovery Modes</p>
            <div className="space-y-2">
              <button className="block w-full text-left text-xs font-bold text-stone-900 border-l-2 border-stone-900 pl-4 -ml-4 transition-all">Investor Scout</button>
              <button className="block w-full text-left text-xs text-stone-400 hover:text-stone-900 pl-4 -ml-4 border-l-2 border-transparent transition-all">Customer Prospecting</button>
              <button className="block w-full text-left text-xs text-stone-400 hover:text-stone-900 pl-4 -ml-4 border-l-2 border-transparent transition-all">Partner Match</button>
            </div>
          </div>
          <div className="p-6 bg-stone-100 border border-stone-200">
            <h4 className="text-[10px] font-bold text-stone-900 uppercase tracking-widest mb-3">Matching Logic</h4>
            <p className="text-xs leading-relaxed text-stone-600 font-serif italic">
              "Affinity is calculated based on current MRR trajectory and sector-specific deal velocity. High-fit leads are prioritized."
            </p>
          </div>
        </div>
      }
      mainPanel={
        <div className="space-y-10">
          {/* Top Actions */}
          <div className="flex justify-between items-center mb-4">
             <div className="flex items-center gap-3">
               <p className="text-sm text-stone-400 font-serif italic">Find and enrich new prospects with intelligent matching.</p>
               <span className="text-[8px] font-bold uppercase tracking-widest bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full flex items-center gap-1">
                 <span className="w-1 h-1 bg-stone-400 rounded-full animate-pulse"></span>
                 AI Powered
               </span>
             </div>
             <div className="flex gap-2">
               <button className="px-4 py-2 border border-stone-200 text-[10px] font-bold uppercase tracking-widest hover:border-stone-900">Enrich Data</button>
               <button className="px-4 py-2 bg-stone-900 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800">Import Contacts</button>
             </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="space-y-4">
            <form onSubmit={handleSearch} className="relative">
              <input 
                type="text" 
                placeholder="Search by name, company, role, or keywords..."
                className="w-full pl-10 pr-4 py-4 bg-white border border-stone-200 text-sm font-serif focus:outline-none focus:border-stone-900 shadow-sm"
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300">🔍</span>
            </form>
            <div className="flex justify-end gap-3 items-center">
               <FilterDropdown label="Type" value="All" />
               <FilterDropdown label="Industry" value="All" />
               <FilterDropdown label="Region" value="All" />
               <button className="text-stone-300 hover:text-stone-900 transition-colors">
                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path></svg>
               </button>
            </div>
          </div>

          {/* Discovery Metrics Row */}
          <div className="grid grid-cols-4 gap-4">
            <SummaryMetric label="New Contacts" value="128" subValue="+12% this week" icon="👤+" />
            <SummaryMetric label="High Potential" value="42" subValue="Match score > 85" icon="✨" />
            <SummaryMetric label="Investor Matches" value="15" subValue="+3 new funds" icon="📈" />
            <SummaryMetric label="LinkedIn Imports" value="324" subValue="Last sync: 1h ago" icon="🔗" />
          </div>

          {/* Search Results Table */}
          <div className="space-y-6">
            <div className="flex justify-between items-baseline border-b border-stone-200 pb-4">
               <div className="flex items-center gap-3">
                 <h3 className="text-lg font-serif font-bold text-stone-900">Search Results</h3>
                 <span className="text-[10px] font-bold bg-stone-100 text-stone-500 px-2 py-0.5 rounded-full">{results.length} Found</span>
               </div>
               <button className="text-[8px] font-bold uppercase text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-sm">✓ All emails verified</button>
            </div>

            <div className="overflow-hidden border border-stone-200 bg-stone-200">
              <table className="w-full text-left border-collapse bg-white">
                <thead className="bg-stone-50 border-b border-stone-200">
                  <tr className="text-[9px] font-bold uppercase tracking-widest text-stone-400">
                    <th className="px-6 py-4 font-bold">Profile</th>
                    <th className="px-6 py-4 font-bold">Role & Location</th>
                    <th className="px-6 py-4 font-bold">Type & Source</th>
                    <th className="px-6 py-4 font-bold">AI Match</th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {results.map((res) => (
                    <tr 
                      key={res.id} 
                      onClick={() => setSelected(res)}
                      className={`group hover:bg-stone-50 cursor-pointer transition-colors ${selected?.id === res.id ? 'bg-stone-50' : ''}`}
                    >
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-4">
                          <Avatar label={res.name.split(' ').map(n => n[0]).join('')} />
                          <div>
                            <p className="text-sm font-serif font-bold text-stone-900">{res.name}</p>
                            <p className="text-[10px] text-stone-400 font-bold uppercase flex items-center gap-1">
                              {res.source} <span className="text-[8px] opacity-30">↗</span>
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        {/* Normalized comparison to lowercase 'investor' */}
                        <p className="text-xs text-stone-700">{res.type === 'investor' ? 'Angel Investor' : 'VP of Engineering'}</p>
                        <p className="text-[10px] text-stone-400 uppercase tracking-tight mt-1">📍 San Francisco, CA</p>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex flex-col gap-1.5 items-start">
                          {/* Normalized comparisons to lowercase types */}
                          <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-sm ${res.type === 'investor' ? 'bg-emerald-50 text-emerald-600' : res.type === 'partner' ? 'bg-amber-50 text-amber-600' : 'bg-stone-100 text-stone-600'}`}>{res.type}</span>
                          <div className="flex gap-1">
                             <span className="text-[8px] font-bold text-stone-300 uppercase border border-stone-100 px-1.5 py-0.5">Decision Maker</span>
                             <span className="text-[8px] font-bold text-stone-300 uppercase border border-stone-100 px-1.5 py-0.5">Scaling Team</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="w-48">
                          <div className="flex justify-between items-baseline mb-2">
                             <span className="text-[10px] font-bold text-stone-900">{res.relevance}%</span>
                             <span className="text-[8px] font-bold uppercase text-stone-300">High Fit</span>
                          </div>
                          <div className="h-1 bg-stone-100 w-full overflow-hidden mb-2">
                            <div 
                              className="h-full bg-emerald-500 transition-all duration-1000" 
                              style={{ width: `${res.relevance}%` }}
                            ></div>
                          </div>
                          <p className="text-[9px] text-stone-400 font-serif leading-tight line-clamp-2 italic">
                            {res.reason}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-right">
                         <span className="text-stone-200 group-hover:text-stone-900 transition-all">→</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      }
      rightPanel={
        selected ? (
          <div className="space-y-12 animate-in fade-in slide-in-from-right-4">
            <div className="mb-8">
              <Avatar label={selected.name.split(' ').map(n => n[0]).join('')} large />
              <h4 className="text-3xl font-serif font-bold text-stone-900 mt-6">{selected.name}</h4>
              <p className="text-xs text-stone-400 font-bold uppercase tracking-widest mt-1">{selected.source}</p>
            </div>

            <div className="space-y-8">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-900 mb-4">Matchmaker Reasoning</p>
                <div className="p-6 bg-white border border-stone-200 border-l-4 border-l-stone-900 italic font-serif text-stone-700 text-sm leading-relaxed">
                  "{selected.reason}"
                </div>
              </div>

              <div className="space-y-4">
                 <button className="w-full py-4 bg-stone-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-stone-800 transition-all">
                    Add to Relationships
                 </button>
                 <button className="w-full py-4 bg-white border border-stone-200 text-stone-600 text-[10px] font-bold uppercase tracking-[0.2em] hover:border-stone-900 transition-all">
                    View LinkedIn Profile ↗
                 </button>
              </div>
              
              <div>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-4">System Recommendations</p>
                 <ul className="space-y-3">
                   <li className="flex gap-2 text-[10px] font-serif italic text-stone-600">• Mention recent Series B in outreach.</li>
                   <li className="flex gap-2 text-[10px] font-serif italic text-stone-600">• Potential referral via Startup X founder.</li>
                 </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
            <div className="w-12 h-12 border border-stone-200 rotate-45 mb-8 flex items-center justify-center">
              <span className="text-stone-300 -rotate-45">🔍</span>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest">Select a prospect to view <br/> deep matching analysis</p>
          </div>
        )
      }
    />
  );
};

const SummaryMetric: React.FC<{ label: string, value: string, subValue: string, icon: string }> = ({ label, value, subValue, icon }) => (
  <div className="bg-white p-6 border border-stone-200 group hover:border-stone-900 transition-all cursor-pointer">
    <div className="flex justify-between items-start mb-4">
      <p className="text-[9px] font-bold uppercase tracking-widest text-stone-400">{label}</p>
      <div className="w-8 h-8 bg-stone-50 border border-stone-100 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all text-xs">
        {icon}
      </div>
    </div>
    <p className="text-2xl font-serif font-bold text-stone-900">{value}</p>
    <p className="text-[9px] font-bold uppercase text-stone-300 mt-1">{subValue}</p>
  </div>
);

const FilterDropdown: React.FC<{ label: string, value: string }> = ({ label, value }) => (
  <div className="flex items-center gap-2 px-3 py-1.5 border border-stone-200 bg-stone-50 hover:border-stone-400 cursor-pointer transition-colors group">
    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 group-hover:text-stone-900">{label}:</span>
    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-900">{value}</span>
    <span className="text-stone-300 text-[8px] group-hover:text-stone-900">▼</span>
  </div>
);

const Avatar: React.FC<{ label: string, large?: boolean }> = ({ label, large }) => (
  <div className={`${large ? 'w-20 h-20 text-xl' : 'w-10 h-10 text-xs'} rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center font-bold text-stone-400 overflow-hidden`}>
    {label}
  </div>
);

export default Discovery;