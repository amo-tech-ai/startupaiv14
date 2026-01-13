
import React from 'react';
import { StartupProfile } from '../../types';
import { REVENUE_MODELS } from '../../constants';

interface Step3Props {
  profile: StartupProfile;
  updateProfile: (data: Partial<StartupProfile>) => void;
  moatAnalysis: string;
}

const Step3BusinessModel: React.FC<Step3Props> = ({ profile, updateProfile, moatAnalysis }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <h3 className="text-3xl font-serif font-bold">Business Model & Moat</h3>
      <div className="space-y-8">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Revenue Model</label>
          <select 
            className="w-full p-4 bg-white border border-stone-200 focus:outline-none focus:border-stone-900 appearance-none font-serif"
            value={profile.revenueModel}
            onChange={e => updateProfile({ revenueModel: e.target.value })}
          >
            {REVENUE_MODELS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Competitors</label>
          <textarea 
            className="w-full p-4 bg-white border border-stone-200 focus:outline-none focus:border-stone-900 min-h-[100px]" 
            value={profile.competitors} 
            onChange={e => updateProfile({ competitors: e.target.value })} 
            placeholder="List 3-5 key competitors. Be honest."
          />
        </div>
        {moatAnalysis && (
          <div className="p-6 bg-stone-100 border border-stone-200">
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-900 mb-4">AI Moat Analysis</p>
            <p className="text-sm font-serif italic text-stone-600 whitespace-pre-line leading-relaxed">
              {moatAnalysis}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step3BusinessModel;
