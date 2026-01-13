
import React from 'react';
import ThreePanelLayout from '../components/ThreePanelLayout';
import { StartupProfile } from '../types';

interface DocumentsProps {
  profile: StartupProfile;
}

const Documents: React.FC<DocumentsProps> = ({ profile }) => {
  return (
    <ThreePanelLayout
      title="Strategy"
      leftPanel={
        <div className="space-y-4">
          <p className="text-xs font-bold text-stone-400 uppercase">Artifacts</p>
          <div className="space-y-1">
            <button className="block text-xs font-bold text-stone-900">Core Strategy</button>
            <button className="block text-xs text-stone-500 hover:text-stone-900">Investor Memo</button>
            <button className="block text-xs text-stone-500 hover:text-stone-900">Pitch Deck Outline</button>
          </div>
        </div>
      }
      mainPanel={
        <div className="space-y-12 max-w-2xl">
          <section className="space-y-6">
            <h3 className="text-2xl font-serif font-bold text-stone-900">Executive Summary</h3>
            <p className="text-stone-700 leading-relaxed font-serif">
              {profile.name} is addressing the critical problem in {profile.industry}: {profile.problem}. 
              Our solution, {profile.solution}, leverages proprietary technology to capture market share from {profile.competitors}.
            </p>
          </section>

          <section className="space-y-6 pt-12 border-t border-stone-200">
            <h3 className="text-xl font-serif font-bold">Business Model Thesis</h3>
            <div className="space-y-6 text-stone-600 text-sm leading-relaxed">
              <p>
                We currently achieve $${profile.revenue}/month in revenue with a base of {profile.users} users. 
                Our goal is to reach $${profile.fundraisingGoal} in seed funding to scale operations and optimize customer acquisition costs.
              </p>
              <div className="bg-stone-50 p-6 border-l-4 border-stone-900">
                <p className="text-stone-900 font-bold mb-2">Key Differentiator</p>
                <p>Focus on structural clarity and operational efficiency through integrated AI workflows.</p>
              </div>
            </div>
          </section>
        </div>
      }
      rightPanel={
        <>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">Strategic Review</p>
            <p className="text-sm leading-relaxed text-stone-800">
              "Your summary is strong but needs more data on retention. Consider adding a section about user LTV to attract Tier-1 investors."
            </p>
          </div>
          <button className="w-full py-3 border border-stone-900 text-stone-900 text-[10px] font-bold uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-colors">
            Export Investor PDF
          </button>
        </>
      }
    />
  );
};

export default Documents;
