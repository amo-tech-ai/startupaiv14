
import React from 'react';
import { StartupProfile } from '../../types';

interface Step1Props {
  profile: StartupProfile;
  updateProfile: (data: Partial<StartupProfile>) => void;
  onExtract: () => void;
  isExtracting: boolean;
}

const Step1Identity: React.FC<Step1Props> = ({ profile, updateProfile, onExtract, isExtracting }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <h3 className="text-3xl font-serif font-bold">Context & Identity</h3>
      <div className="space-y-6">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Website URL</label>
          <div className="flex gap-2">
            <input 
              className="flex-1 p-4 bg-white border border-stone-200 focus:outline-none focus:border-stone-900 font-serif" 
              value={profile.url} 
              onChange={e => updateProfile({ url: e.target.value })} 
              placeholder="https://yourstartup.com"
            />
            <button 
              disabled={isExtracting}
              onClick={onExtract}
              className="px-6 bg-stone-100 border border-stone-200 text-[10px] font-bold uppercase tracking-widest hover:bg-stone-200 transition-colors disabled:opacity-50"
            >
              {isExtracting ? "Scraping..." : "AI Auto-fill"}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Startup Name</label>
            <input 
              className="w-full p-4 bg-white border border-stone-200 focus:outline-none focus:border-stone-900" 
              value={profile.name} 
              onChange={e => updateProfile({ name: e.target.value })} 
              placeholder="e.g., AcmeAI"
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Industry</label>
            <input 
              className="w-full p-4 bg-white border border-stone-200 focus:outline-none focus:border-stone-900" 
              value={profile.industry} 
              onChange={e => updateProfile({ industry: e.target.value })} 
              placeholder="e.g., Fintech"
            />
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">One-Sentence Tagline</label>
          <input 
            className="w-full p-4 bg-white border border-stone-200 focus:outline-none focus:border-stone-900 font-serif italic" 
            value={profile.tagline} 
            onChange={e => updateProfile({ tagline: e.target.value })} 
            placeholder="The operating system for..."
          />
        </div>
      </div>
    </div>
  );
};

export default Step1Identity;
