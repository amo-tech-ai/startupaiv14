
import React from 'react';
import { StartupProfile } from '../../types';

interface Step4Props {
  profile: StartupProfile;
  updateProfile: (data: Partial<StartupProfile>) => void;
}

const Step4Traction: React.FC<Step4Props> = ({ profile, updateProfile }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <h3 className="text-3xl font-serif font-bold">Operational Traction</h3>
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Monthly Revenue ($)</label>
            <input 
              type="number"
              className="w-full p-4 bg-white border border-stone-200 focus:outline-none focus:border-stone-900" 
              value={profile.revenue} 
              onChange={e => updateProfile({ revenue: Number(e.target.value) })} 
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">MoM Growth Rate (%)</label>
            <input 
              type="number"
              className="w-full p-4 bg-white border border-stone-200 focus:outline-none focus:border-stone-900" 
              value={profile.growthRate} 
              onChange={e => updateProfile({ growthRate: Number(e.target.value) })} 
            />
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Active Users / Customers</label>
            <input 
              type="number"
              className="w-full p-4 bg-white border border-stone-200 focus:outline-none focus:border-stone-900" 
              value={profile.users} 
              onChange={e => updateProfile({ users: Number(e.target.value) })} 
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Runway (Months)</label>
            <input 
              type="number"
              className="w-full p-4 bg-white border border-stone-200 focus:outline-none focus:border-stone-900" 
              value={profile.runway} 
              onChange={e => updateProfile({ runway: Number(e.target.value) })} 
            />
          </div>
        </div>
      </div>
      <div className="p-6 border border-stone-200 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase text-stone-400 tracking-widest mb-1">Health Indicator</p>
          <p className="text-sm font-serif italic text-stone-900">
            {profile.runway < 3 ? "Critical Runway: Prioritize Fundraising." : profile.revenue > 0 ? "Revenue Active: Focus on Retention." : "Pre-Revenue: Focus on Product-Market Fit."}
          </p>
        </div>
        <div className={`w-3 h-3 rounded-full ${profile.runway < 3 ? 'bg-rose-500 animate-pulse' : 'bg-emerald-500'}`}></div>
      </div>
    </div>
  );
};

export default Step4Traction;
