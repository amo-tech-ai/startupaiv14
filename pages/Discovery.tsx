import React, { useState } from 'react';
import ThreePanelLayout from '../components/ThreePanelLayout';
import { StartupProfile, DiscoveryResult } from '../types';
import { getDiscoveryResults } from '../services/gemini';

interface DiscoveryProps {
  profile: StartupProfile;
}

const Discovery: React.FC<DiscoveryProps> = ({ profile }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<DiscoveryResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<DiscoveryResult | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    const data = await getDiscoveryResults(query, profile);
    setResults(data);
    setLoading(false);
  };

  return (
    <ThreePanelLayout
      title="Discovery"
      leftPanel={
        <div className="space-y-8">
          <div>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-4">Search History</p>
            <div className="space-y-2">
              <p className="text-xs text-stone-500 italic">"Seed VCs in SF..."</p>
              <p className="text-xs text-stone-500 italic">"SaaS Buyers..."</p>
            </div>
          </div>
          <div className="p-4 bg-stone-100 border border-stone-200">
            <h4 className="text-[10px] font-bold text-stone-900 uppercase tracking-widest mb-2">Scout Efficiency</h4>
            <p className="text-sm text-stone-600 font-serif">Verified 85% of results via Google Search Grounding.</p>
          </div>
        </div>
      }
      mainPanel={
        <div className="space-y-12">
          <form onSubmit={handleSearch} className="relative">
            <input 
              className="w-full p-8 bg-white border border-stone-200 text-3xl font-serif focus:outline-none focus:border-stone-900 placeholder-stone-200"
              placeholder="Find Seed VCs in SF focused on Fintech..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            <button 
              type="submit"
              disabled={loading}
              className="absolute right-6 top-1/2 -translate-y-1/2 px-8 py-4 bg-stone-900 text-white text-[10px] font-bold uppercase tracking-widest disabled:opacity-50"
            >
              {loading ? "Searching..." : "Explore"}
            </button>
          </form>

          <div className="space-y-px bg-stone-200 border border-stone-200">
            {results.map(res => (
              <div 
                key={res.id}
                onClick={() => setSelected(res)}
                className={`p-8 bg-white flex justify-between items-center cursor-pointer transition-all ${selected?.id === res.id ? 'ring-2 ring-stone-900 z-10' : 'hover:bg-stone-50'}`}
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">{res.type}</p>
                  <h4 className="text-2xl font-serif font-bold text-stone-900">{res.name}</h4>
                  <p className="text-xs text-stone-500 mt-2 font-serif italic truncate max-w-md">{res.source}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase text-stone-400 mb-1">Fit Score</p>
                  <p className="text-2xl font-serif font-bold text-stone-900">{res.relevance}%</p>
                </div>
              </div>
            ))}
            {!loading && results.length === 0 && (
              <div className="p-20 bg-white text-center opacity-30">
                <p className="text-sm font-serif italic">Enter a query to begin scouting the market.</p>
              </div>
            )}
          </div>
        </div>
      }
      rightPanel={
        selected ? (
          <div className="space-y-12 animate-in fade-in slide-in-from-right-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Matchmaker Analysis</p>
              <h4 className="text-xl font-serif font-bold">{selected.name}</h4>
              <p className="text-sm leading-relaxed text-stone-800 font-serif italic mt-4 border-l-2 border-stone-900 pl-4 py-2">
                "{selected.reason}"
              </p>
            </div>
            <div>
              <button className="w-full py-4 bg-stone-900 text-white text-[10px] font-bold uppercase tracking-[0.2em]">Add to Relationships</button>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center opacity-30 text-center">
            <div className="w-8 h-8 border border-stone-200 rotate-45 mb-6"></div>
            <p className="text-[10px] font-bold uppercase tracking-widest">Select result for <br/> deep alignment analysis</p>
          </div>
        )
      }
    />
  );
};

export default Discovery;