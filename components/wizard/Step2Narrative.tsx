
import React from 'react';
import { StartupProfile } from '../../types';

interface Step2Props {
  profile: StartupProfile;
  updateProfile: (data: Partial<StartupProfile>) => void;
  onSuggest: (field: string, value: string) => void;
  isLoadingAI: boolean;
}

const Step2Narrative: React.FC<Step2Props> = ({ profile, updateProfile, onSuggest, isLoadingAI }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <h3 className="text-3xl font-serif font-bold">Narrative Analysis</h3>
      <div className="space-y-8">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">The Critical Problem</label>
          <textarea 
            className="w-full p-4 bg-white border border-stone-200 focus:outline-none focus:border-stone-900 min-h-[120px] font-serif" 
            value={profile.problem} 
            onChange={e => updateProfile({ problem: e.target.value })} 
            placeholder="Describe the deep pain point your users face..."
          />
          <button 
            onClick={() => onSuggest('problem statement', profile.problem)}
            className="text-[10px] font-bold uppercase mt-2 underline tracking-widest hover:text-stone-600"
          >
            {isLoadingAI ? "Thinking..." : "Refine Narrative with AI"}
          </button>
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Your Proprietary Solution</label>
          <textarea 
            className="w-full p-4 bg-white border border-stone-200 focus:outline-none focus:border-stone-900 min-h-[120px] font-serif" 
            value={profile.solution} 
            onChange={e => updateProfile({ solution: e.target.value })} 
            placeholder="How specifically do you solve this? What's the magic?"
          />
        </div>
      </div>
    </div>
  );
};

export default Step2Narrative;
