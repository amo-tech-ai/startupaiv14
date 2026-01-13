
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThreePanelLayout from '../components/ThreePanelLayout';
import { StartupProfile, Task } from '../types';
import { 
  getWizardSuggestions, 
  extractStartupFromURL, 
  analyzeReadiness,
  generateInitialTasks,
  getMoatAnalysis,
  getFundraisingStrategy
} from '../services/gemini';

// Modular Step Components
import Step1Identity from '../components/wizard/Step1Identity';
import Step2Narrative from '../components/wizard/Step2Narrative';
import Step3BusinessModel from '../components/wizard/Step3BusinessModel';
import Step4Traction from '../components/wizard/Step4Traction';
import Step5Capital from '../components/wizard/Step5Capital';
import Step6Review from '../components/wizard/Step6Review';

interface WizardProps {
  profile: StartupProfile;
  updateProfile: (data: Partial<StartupProfile>) => void;
  setTasks?: (tasks: Task[]) => void;
}

const Wizard: React.FC<WizardProps> = ({ profile, updateProfile, setTasks }) => {
  const [step, setStep] = useState(1);
  const [suggestion, setSuggestion] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [extracting, setExtracting] = useState(false);
  const [readinessData, setReadinessData] = useState<{ score: number, insights: string[], gaps: string[] } | null>(null);
  const [moatAnalysis, setMoatAnalysis] = useState("");
  const [fundingStrategy, setFundingStrategy] = useState("");
  const navigate = useNavigate();

  const handleNext = async () => {
    if (step === 2 && !moatAnalysis) {
      setLoadingAI(true);
      const res = await getMoatAnalysis(profile);
      setMoatAnalysis(res);
      setLoadingAI(false);
    }
    
    if (step === 4 && !fundingStrategy) {
      setLoadingAI(true);
      const res = await getFundraisingStrategy(profile);
      setFundingStrategy(res);
      setLoadingAI(false);
    }

    if (step === 5 && readinessData === null) {
      setLoadingAI(true);
      const analysis = await analyzeReadiness(profile);
      setReadinessData(analysis);
      setLoadingAI(false);
    }

    if (step < 6) {
      setStep(step + 1);
    } else {
      setLoadingAI(true);
      if (setTasks) {
        const initialTasks = await generateInitialTasks(profile);
        setTasks(initialTasks);
      }
      updateProfile({ isWizardComplete: true, readinessScore: readinessData?.score });
      setLoadingAI(false);
      navigate('/app/dashboard');
    }
    setSuggestion("");
  };

  const handleExtract = async () => {
    if (!profile.url) return;
    setExtracting(true);
    const data = await extractStartupFromURL(profile.url);
    updateProfile(data);
    setExtracting(false);
  };

  const handleSuggest = async (field: string, value: string) => {
    setLoadingAI(true);
    const result = await getWizardSuggestions(field, value);
    setSuggestion(result);
    setLoadingAI(false);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1Identity profile={profile} updateProfile={updateProfile} onExtract={handleExtract} isExtracting={extracting} />;
      case 2:
        return <Step2Narrative profile={profile} updateProfile={updateProfile} onSuggest={handleSuggest} isLoadingAI={loadingAI} />;
      case 3:
        return <Step3BusinessModel profile={profile} updateProfile={updateProfile} moatAnalysis={moatAnalysis} />;
      case 4:
        return <Step4Traction profile={profile} updateProfile={updateProfile} />;
      case 5:
        return <Step5Capital profile={profile} updateProfile={updateProfile} fundingStrategy={fundingStrategy} />;
      case 6:
        return <Step6Review profile={profile} readinessData={readinessData} />;
      default:
        return null;
    }
  };

  return (
    <ThreePanelLayout
      title={`Founder Setup`}
      leftPanel={
        <div className="space-y-12">
          <div>
            <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-6">Wizard Progress</h4>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6].map(s => (
                <div key={s} className="flex items-center gap-4 group">
                  <div className={`w-2 h-2 rotate-45 border border-stone-300 transition-all ${s <= step ? 'bg-stone-900 border-stone-900' : 'bg-transparent'}`}></div>
                  <span className={`text-[10px] font-bold uppercase tracking-[0.1em] transition-colors ${s === step ? 'text-stone-900' : 'text-stone-300'}`}>
                    {s === 1 ? 'Context' : s === 2 ? 'Narrative' : s === 3 ? 'Market' : s === 4 ? 'Traction' : s === 5 ? 'Capital' : 'Review'}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-6 bg-stone-100 border border-stone-200">
            <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3">Setup Tip</h4>
            <p className="text-xs leading-relaxed text-stone-600 font-serif italic">
              {step === 1 ? "Clear naming helps AI research your market better." :
               step === 2 ? "A strong problem statement is half the pitch." :
               step === 4 ? "Be conservative with runway; under-promising is safer." :
               "The Operating System curates your next tasks based on this final review."}
            </p>
          </div>
        </div>
      }
      mainPanel={
        <div className="max-w-2xl">
          <div className="min-h-[450px]">
            {renderStep()}
          </div>
          <div className="mt-16 pt-10 border-t border-stone-200 flex gap-6">
            {step > 1 && (
              <button 
                onClick={() => setStep(step - 1)}
                className="px-12 py-4 border border-stone-200 text-stone-400 font-bold uppercase text-[10px] tracking-[0.3em] hover:border-stone-900 hover:text-stone-900 transition-all"
              >
                Previous
              </button>
            )}
            <button 
              onClick={handleNext}
              disabled={loadingAI}
              className="px-16 py-4 bg-stone-900 text-white font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-stone-800 transition-all disabled:opacity-50 flex items-center gap-4"
            >
              {loadingAI && <div className="w-2 h-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
              {loadingAI ? "Processing..." : step === 6 ? 'Initialize OS' : 'Advance'}
            </button>
          </div>
        </div>
      }
      rightPanel={
        <div className="space-y-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 border border-stone-900 rotate-45"></div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-900">Strategic Coach</p>
            </div>
            <p className="text-sm leading-relaxed text-stone-800 font-serif">
              {step === 1 ? "Your identity is the anchor. AI extraction helps maintain a consistent professional profile across all platforms." : 
               step === 2 ? "The 'Narrative' defines 90% of your investor fit. Be ruthless with word count." :
               step === 3 ? "Moats protect your margins. AI identifies gaps in competitor offerings using real-time market data." :
               step === 4 ? "Operational data provides the 'Grounding' for strategic insights. Inaccurate numbers lead to poor coaching." :
               step === 6 ? "Once initialized, StartupAI will generate your first sprint of tasks based on your current metrics and goals." :
               "Your data informs the 'Next Best Action' logic on your dashboard."}
            </p>
          </div>

          {readinessData && step >= 5 && (
            <div className="p-6 border border-stone-200 bg-white animate-in fade-in zoom-in-95 duration-500">
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-4">Initial Assessment</p>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold text-stone-900 mb-1">Key Insight</p>
                  <p className="text-xs text-stone-600 italic">"{readinessData.insights[0]}"</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900 mb-1">Identified Gap</p>
                  <p className="text-xs text-rose-600 italic">"{readinessData.gaps[0]}"</p>
                </div>
              </div>
            </div>
          )}

          {suggestion && (
            <div className="p-6 bg-stone-100 border border-stone-200 animate-in slide-in-from-right-4 duration-300">
              <p className="text-[10px] font-bold uppercase mb-3 text-stone-900">AI Refinement</p>
              <p className="text-sm text-stone-700 italic font-serif leading-relaxed">"{suggestion}"</p>
              <button 
                onClick={() => {
                  if (step === 2) updateProfile({ problem: suggestion });
                  setSuggestion("");
                }}
                className="w-full mt-6 py-3 bg-stone-900 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800 transition-all"
              >
                Apply Refinement
              </button>
            </div>
          )}
        </div>
      }
    />
  );
};

export default Wizard;
