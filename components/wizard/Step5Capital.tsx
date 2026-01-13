
import React from 'react';
import { StartupProfile } from '../../types';
import { FUNDING_USES } from '../../constants';

interface Step5Props {
  profile: StartupProfile;
  updateProfile: (data: Partial<StartupProfile>) => void;
  fundingStrategy: string;
}

const Step5Capital: React.FC<Step5Props> = ({ profile, updateProfile, fundingStrategy }) => {
  const toggleFundingUse = (use: string) => {
    const current = profile.useOfFunds || [];
    if (current.includes(use)) {
      updateProfile({ useOfFunds: current.filter(u => u !== use) });
    } else {
      updateProfile({ useOfFunds: [...current, use] });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <h3 className="text-3xl font-serif font-bold">Capital Planning</h3>
      <div className="space-y-8">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Fundraising Goal ($)</label>
          <input 
            type="number"
            className="w-full p-10 bg-white border border-stone-200 focus:outline-none focus:border-stone-900 text-5xl font-serif text-center" 
            value={profile.fundraisingGoal} 
            onChange={e => updateProfile({ fundraisingGoal: Number(e.target.value) })} 
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-4">Use of Funds</label>
          <div className="grid grid-cols-2 gap-3">
            {FUNDING_USES.map(use => (
              <button
                key={use}
                onClick={() => toggleFundingUse(use)}
                className={`p-3 text-[10px] font-bold uppercase tracking-widest border transition-all text-left ${
                  profile.useOfFunds?.includes(use) 
                    ? 'bg-stone-900 border-stone-900 text-white' 
                    : 'bg-white border-stone-200 text-stone-400 hover:border-stone-900 hover:text-stone-900'
                }`}
              >
                {use}
              </button>
            ))}
          </div>
        </div>
        {fundingStrategy && (
          <div className="p-8 border-l-4 border-stone-900 bg-stone-50">
            <p className="text-[10px] font-bold uppercase text-stone-400 tracking-widest mb-2">Capital Strategy</p>
            <p className="text-sm font-serif leading-relaxed text-stone-800 italic">
              "{fundingStrategy}"
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step5Capital;
