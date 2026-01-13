import React, { useState } from 'react';
import ThreePanelLayout from '../components/ThreePanelLayout';
import { StartupProfile, CompetitorAnalysis } from '../types';
import { getCompetitorIntelligence } from '../services/gemini';

interface DocumentsProps {
  profile: StartupProfile;
}

const Documents: React.FC<DocumentsProps> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState<'strategy' | 'market'>('strategy');
  const [intel, setIntel] = useState<CompetitorAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRunIntel = async () => {
    setLoading(true);
    const result = await getCompetitorIntelligence(profile);
    setIntel(result);
    setLoading(false);
  };

  return (
    <ThreePanelLayout
      title="Strategy"
      leftPanel={
        <div className="space-y-12">
          <div>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-6">Strategic Artifacts</p>
            <div className="space-y-1">
              <button 
                onClick={() => setActiveTab('strategy')}
                className={`block w-full text-left py-2 text-xs font-bold transition-colors ${activeTab === 'strategy' ? 'text-stone-900 border-l-2 border-stone-900 pl-4 -ml-4' : 'text-stone-400 hover:text-stone-900 pl-4 -ml-4 border-l-2 border-transparent'}`}
              >
                Core Strategy
              </button>
              <button 
                onClick={() => setActiveTab('market')}
                className={`block w-full text-left py-2 text-xs font-bold transition-colors ${activeTab === 'market' ? 'text-stone-900 border-l-2 border-stone-900 pl-4 -ml-4' : 'text-stone-400 hover:text-stone-900 pl-4 -ml-4 border-l-2 border-transparent'}`}
              >
                Market Intelligence
              </button>
            </div>
          </div>
          
          <div className="p-6 bg-stone-100 border border-stone-200">
            <h4 className="text-[10px] font-bold text-stone-900 uppercase tracking-widest mb-3">Advisor</h4>
            <p className="text-xs leading-relaxed text-stone-600 font-serif italic">
              "Your core thesis depends on technical superiority. Ensure your IP roadmap reflects the market gaps identified."
            </p>
          </div>
        </div>
      }
      mainPanel={
        <div className="space-y-12 max-w-2xl">
          {activeTab === 'strategy' ? (
            <div className="animate-in fade-in duration-500 space-y-12">
              <section className="space-y-6">
                <div className="flex justify-between items-end border-b border-stone-200 pb-4">
                  <h3 className="text-2xl font-serif font-bold text-stone-900">Executive Summary</h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Locked v1.0</span>
                </div>
                <p className="text-stone-700 leading-relaxed font-serif text-lg">
                  {profile.name || "The Enterprise"} is addressing the critical problem in {profile.industry || "the market"}: <span className="italic">"{profile.problem || "Problem statement pending..."}"</span>
                </p>
                <p className="text-stone-700 leading-relaxed font-serif text-lg">
                  Our solution, {profile.solution || "Proprietary technology"}, leverages specific market insights to capture share from incumbents like {profile.competitors || "the competition"}.
                </p>
              </section>

              <section className="space-y-6 pt-12">
                <h3 className="text-xl font-serif font-bold">Business Model Thesis</h3>
                <div className="space-y-6 text-stone-600 text-sm leading-relaxed">
                  <p>
                    We currently achieve ${profile.revenue.toLocaleString()}/month in revenue with a base of {profile.users.toLocaleString()} users. 
                    Our goal is to reach ${profile.fundraisingGoal.toLocaleString()} in funding to scale operations and optimize customer acquisition costs.
                  </p>
                  <div className="bg-stone-50 p-8 border border-stone-200 border-l-4 border-stone-900">
                    <p className="text-stone-900 font-bold mb-2 uppercase tracking-widest text-[10px]">Strategic Moat</p>
                    <p className="font-serif italic text-stone-700">"Focus on structural clarity and operational efficiency through integrated AI workflows, allowing for 3x velocity compared to traditional startups."</p>
                  </div>
                </div>
              </section>
            </div>
          ) : (
            <div className="animate-in fade-in duration-500 space-y-12">
              <div className="flex justify-between items-center border-b border-stone-200 pb-8">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-stone-900">Competitive Audit</h3>
                  <p className="text-xs text-stone-400 mt-1 uppercase tracking-widest font-bold">Real-time Market Reconnaissance</p>
                </div>
                <button 
                  onClick={handleRunIntel}
                  disabled={loading}
                  className="px-6 py-3 bg-stone-900 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800 transition-all disabled:opacity-50 flex items-center gap-3"
                >
                  {loading && <div className="w-2 h-2 border border-white border-t-transparent rounded-full animate-spin"></div>}
                  {loading ? "Grounding Results..." : "Run Market Intel"}
                </button>
              </div>

              {intel ? (
                <div className="space-y-16">
                  {/* Competitor Matrix */}
                  <section>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-8">Identified Incumbents</p>
                    <div className="grid grid-cols-1 gap-px bg-stone-200 border border-stone-200">
                      {intel.competitors.map((comp, i) => (
                        <div key={i} className="bg-white p-8 group hover:bg-stone-50 transition-colors">
                          <h4 className="text-xl font-serif font-bold text-stone-900 mb-6">{comp.name}</h4>
                          <div className="grid grid-cols-2 gap-8">
                            <div>
                              <p className="text-[9px] font-bold uppercase tracking-widest text-emerald-600 mb-2">Strengths</p>
                              <ul className="space-y-1">
                                {comp.strengths.map((s, idx) => (
                                  <li key={idx} className="text-xs text-stone-600 font-serif leading-relaxed">• {s}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="text-[9px] font-bold uppercase tracking-widest text-rose-600 mb-2">Weaknesses</p>
                              <ul className="space-y-1">
                                {comp.weaknesses.map((w, idx) => (
                                  <li key={idx} className="text-xs text-stone-600 font-serif leading-relaxed">• {w}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Market Gaps */}
                  <section>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-6">Strategic White Space</p>
                    <div className="grid grid-cols-3 gap-6">
                      {intel.marketGaps.map((gap, i) => (
                        <div key={i} className="p-6 bg-stone-100 border border-stone-200 flex flex-col">
                          <span className="text-xs font-serif font-bold text-stone-900 mb-2">Gap 0{i+1}</span>
                          <p className="text-xs text-stone-600 leading-relaxed italic">"{gap}"</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Verdict */}
                  <div className="p-10 bg-stone-900 text-white border border-stone-900">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-4 opacity-50">Defensive Advice</p>
                    <p className="text-lg font-serif italic leading-relaxed">
                      "{intel.strategicAdvice}"
                    </p>
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center border-2 border-dashed border-stone-200 bg-stone-50/50">
                  <div className="w-12 h-12 border border-stone-200 rotate-45 mx-auto mb-8 opacity-40"></div>
                  <p className="text-sm font-serif italic text-stone-400">Initialize Market Intelligence to identify key competitors and hidden opportunities.</p>
                </div>
              )}
            </div>
          )}
        </div>
      }
      rightPanel={
        <div className="space-y-12">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3">Inference Engine</p>
            <p className="text-sm leading-relaxed text-stone-800 font-serif italic border-l-2 border-stone-900 pl-4 py-2">
              {activeTab === 'strategy' 
                ? "Your narrative is optimized for Seed-stage VCs. Focus on the 'problem' severity to drive higher engagement."
                : "Real-time search grounding identifies current market pivots. Incumbents are moving slowly in your niche—now is the window for aggressive acquisition."}
            </p>
          </div>
          <div className="space-y-3 pt-8">
            <button className="w-full py-3 border border-stone-900 text-stone-900 text-[10px] font-bold uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-colors">
              Export Strategy PDF
            </button>
            <button className="w-full py-3 border border-stone-200 text-stone-400 text-[10px] font-bold uppercase tracking-widest hover:border-stone-900 hover:text-stone-900 transition-colors">
              Share with Board
            </button>
          </div>
        </div>
      }
    />
  );
};

export default Documents;