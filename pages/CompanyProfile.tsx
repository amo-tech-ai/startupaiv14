import React from 'react';
import { useNavigate } from 'react-router-dom';
import ThreePanelLayout from '../components/ThreePanelLayout';
import { StartupProfile } from '../types';

interface CompanyProfileProps {
  profile: StartupProfile;
  updateProfile: (data: Partial<StartupProfile>) => void;
}

const CompanyProfile: React.FC<CompanyProfileProps> = ({ profile, updateProfile }) => {
  const navigate = useNavigate();

  return (
    <ThreePanelLayout
      title="Company Profile"
      leftPanel={
        <div className="space-y-8">
          <div>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-6">Entity Context</p>
            <p className="text-xs text-stone-600 font-serif italic leading-relaxed">
              "A complete company profile serves as the bedrock for the Strategy Generator and Investor Matchmaker."
            </p>
          </div>
        </div>
      }
      mainPanel={
        <div className="space-y-8">
          <div className="flex justify-between items-center mb-8">
            <p className="text-sm text-stone-400 font-serif italic">Manage your company’s public information and business details</p>
            <button 
              onClick={() => navigate('/app/dashboard')}
              className="px-4 py-2 border border-stone-200 text-[10px] font-bold uppercase tracking-widest hover:border-stone-900"
            >
              Back to Dashboard
            </button>
          </div>

          <div className="space-y-8 max-w-2xl mx-auto">
            {/* Card 1: Overview */}
            <div className="bg-white border border-stone-200 p-8">
              <h3 className="text-sm font-serif font-bold text-stone-900 mb-8">Company Overview</h3>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-stone-50 border border-stone-200 flex items-center justify-center text-2xl">
                  🏢
                </div>
                <button className="text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 border border-stone-100 px-4 py-2">
                  Upload Logo
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Company Name</label>
                  <input 
                    type="text"
                    className="w-full p-3 bg-stone-50 border border-stone-100 focus:outline-none focus:border-stone-900 text-xs font-serif"
                    value={profile.name}
                    onChange={e => updateProfile({ name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Founded Year</label>
                  <input 
                    type="text"
                    className="w-full p-3 bg-stone-50 border border-stone-100 focus:outline-none focus:border-stone-900 text-xs font-serif"
                    value={profile.foundedYear || '2024'}
                    onChange={e => updateProfile({ foundedYear: e.target.value })}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Tagline</label>
                <input 
                  type="text"
                  className="w-full p-3 bg-stone-50 border border-stone-100 focus:outline-none focus:border-stone-900 text-xs font-serif italic"
                  value={profile.tagline}
                  onChange={e => updateProfile({ tagline: e.target.value })}
                  placeholder="One-line value proposition..."
                />
              </div>

              <div className="mb-6">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Short Description</label>
                <textarea 
                  className="w-full p-3 bg-stone-50 border border-stone-100 focus:outline-none focus:border-stone-900 text-xs font-serif min-h-[100px]"
                  value={profile.description}
                  onChange={e => updateProfile({ description: e.target.value })}
                  placeholder="2-3 sentences about what your company does..."
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Headquarters</label>
                <input 
                  type="text"
                  className="w-full p-3 bg-stone-50 border border-stone-100 focus:outline-none focus:border-stone-900 text-xs font-serif"
                  value={profile.headquarters || 'San Francisco, CA'}
                  onChange={e => updateProfile({ headquarters: e.target.value })}
                />
              </div>
            </div>

            {/* Card 2: Business Information */}
            <div className="bg-white border border-stone-200 p-8">
              <h3 className="text-sm font-serif font-bold text-stone-900 mb-8">Business Information</h3>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Industry</label>
                  <input 
                    type="text"
                    className="w-full p-3 bg-stone-50 border border-stone-100 focus:outline-none focus:border-stone-900 text-xs font-serif"
                    value={profile.industry}
                    onChange={e => updateProfile({ industry: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Business Model</label>
                  <input 
                    type="text"
                    className="w-full p-3 bg-stone-50 border border-stone-100 focus:outline-none focus:border-stone-900 text-xs font-serif"
                    value={profile.revenueModel}
                    onChange={e => updateProfile({ revenueModel: e.target.value })}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Customer Segments</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['Enterprise', 'B2B', 'SaaS'].map(tag => (
                    <span key={tag} className="text-[9px] font-bold uppercase tracking-widest bg-stone-100 text-stone-600 px-2.5 py-1 border border-stone-200 flex items-center gap-1">
                      {tag} <button className="hover:text-rose-600">×</button>
                    </span>
                  ))}
                  <button className="text-[9px] font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 border border-dashed border-stone-200 px-2.5 py-1">
                    + Add
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Key Features</label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['AI Dashboard', 'Strategic Planning'].map(tag => (
                    <span key={tag} className="text-[9px] font-bold uppercase tracking-widest bg-stone-100 text-stone-600 px-2.5 py-1 border border-stone-200 flex items-center gap-1">
                      {tag} <button className="hover:text-rose-600">×</button>
                    </span>
                  ))}
                  <button className="text-[9px] font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 border border-dashed border-stone-200 px-2.5 py-1">
                    + Add
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Primary Differentiator</label>
                <textarea 
                  className="w-full p-3 bg-stone-50 border border-stone-100 focus:outline-none focus:border-stone-900 text-xs font-serif min-h-[80px]"
                  value={profile.differentiator || ''}
                  onChange={e => updateProfile({ differentiator: e.target.value })}
                  placeholder="What makes your approach unique?"
                />
              </div>
            </div>

            {/* Card 3: Social */}
            <div className="bg-white border border-stone-200 p-8">
              <h3 className="text-sm font-serif font-bold text-stone-900 mb-8">Social & Web Presence</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 flex items-center justify-center text-stone-300">🌐</div>
                  <input 
                    type="text"
                    className="flex-1 p-3 bg-stone-50 border border-stone-100 focus:outline-none focus:border-stone-900 text-xs font-serif"
                    placeholder="Website URL"
                    value={profile.url}
                    onChange={e => updateProfile({ url: e.target.value })}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 flex items-center justify-center text-stone-300">💼</div>
                  <input 
                    type="text"
                    className="flex-1 p-3 bg-stone-50 border border-stone-100 focus:outline-none focus:border-stone-900 text-xs font-serif"
                    placeholder="LinkedIn Profile"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 flex items-center justify-center text-stone-300">🐦</div>
                  <input 
                    type="text"
                    className="flex-1 p-3 bg-stone-50 border border-stone-100 focus:outline-none focus:border-stone-900 text-xs font-serif"
                    placeholder="Twitter / X"
                  />
                </div>
              </div>
            </div>
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
               <h3 className="text-[11px] font-bold uppercase tracking-widest text-stone-900">AI Profile Coach</h3>
               <p className="text-[9px] text-stone-400 uppercase font-bold">Data Quality Audit</p>
             </div>
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-900 mb-4">Strengths</p>
              <div className="p-4 bg-emerald-50 border border-emerald-100 space-y-2">
                <p className="text-[10px] font-serif italic text-emerald-800">• Tagline is concise and punchy.</p>
                <p className="text-[10px] font-serif italic text-emerald-800">• Industry categorization is accurate.</p>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-900 mb-4">Risks / Gaps</p>
              <div className="p-4 bg-amber-50 border border-amber-100 space-y-2">
                <p className="text-[10px] font-serif italic text-amber-800">• LinkedIn presence is not linked.</p>
                <p className="text-[10px] font-serif italic text-amber-800">• Differentiator statement needs more bite.</p>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-900 mb-4">Recommended Actions</p>
              <button className="w-full py-4 bg-stone-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-stone-800 transition-all">
                Auto-improve Profile
              </button>
              <p className="text-[9px] text-center text-stone-400 mt-2 uppercase tracking-widest italic">Enhances copy, clarity, and positioning</p>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default CompanyProfile;