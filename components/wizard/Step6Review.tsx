
import React from 'react';
import { StartupProfile } from '../../types';

interface Step6Props {
  profile: StartupProfile;
  readinessData: { score: number, insights: string[], gaps: string[] } | null;
}

const Step6Review: React.FC<Step6Props> = ({ profile, readinessData }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      <h3 className="text-3xl font-serif font-bold">Review & Initialize</h3>
      <div className="bg-white border border-stone-200 overflow-hidden">
        <div className="p-10 border-b border-stone-200">
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Startup OS Profile</p>
          <h4 className="text-4xl font-serif font-bold">{profile.name || "Untitled Startup"}</h4>
          <p className="text-stone-500 font-serif italic mt-2">{profile.tagline || "Vision pending..."}</p>
        </div>
        <div className="grid grid-cols-2 gap-px bg-stone-200">
          <div className="bg-white p-6">
            <p className="text-[10px] font-bold uppercase text-stone-400 mb-2">Readiness Score</p>
            <p className="text-2xl font-bold font-serif">{readinessData?.score || 85}%</p>
          </div>
          <div className="bg-white p-6">
            <p className="text-[10px] font-bold uppercase text-stone-400 mb-2">Revenue Model</p>
            <p className="text-2xl font-bold font-serif">{profile.revenueModel}</p>
          </div>
          <div className="bg-white p-6">
            <p className="text-[10px] font-bold uppercase text-stone-400 mb-2">Runway</p>
            <p className="text-2xl font-bold font-serif">{profile.runway} Mo</p>
          </div>
          <div className="bg-white p-6">
            <p className="text-[10px] font-bold uppercase text-stone-400 mb-2">Goal</p>
            <p className="text-2xl font-bold font-serif">${(profile.fundraisingGoal / 1000).toFixed(0)}k</p>
          </div>
        </div>
      </div>
      <div className="p-6 bg-emerald-50 border border-emerald-100 flex items-center gap-4">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
        <p className="text-xs font-bold text-emerald-800 uppercase tracking-widest">Initialization Parameters Confirmed</p>
      </div>
    </div>
  );
};

export default Step6Review;
