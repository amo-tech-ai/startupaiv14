import React, { useState } from 'react';
import ThreePanelLayout from '../components/ThreePanelLayout';
import { Contact, DealStage, DiscoveryResult, StartupProfile, Interaction, Task, Priority } from '../types';
import { getInvestorResearch, getDiscoveryResults, draftOutreachMemo } from '../services/gemini';

interface CRMProps {
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
  profile: StartupProfile;
  setTasks?: React.Dispatch<React.SetStateAction<Task[]>>;
}

const CRM: React.FC<CRMProps> = ({ contacts, setContacts, profile, setTasks }) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [research, setResearch] = useState<string>("");
  const [isResearching, setIsResearching] = useState(false);
  const [viewMode, setViewMode] = useState<'pipeline' | 'prospecting'>('pipeline');
  const [prospects, setProspects] = useState<DiscoveryResult[]>([]);
  const [isScouting, setIsScouting] = useState(false);
  
  // Outreach states
  const [activeRightTab, setActiveRightTab] = useState<'insights' | 'outreach'>('insights');
  const [outreachDraft, setOutreachDraft] = useState<string>("");
  const [isDrafting, setIsDrafting] = useState(false);
  const [newInteraction, setNewInteraction] = useState("");

  const stages: DealStage[] = ['Interested', 'Meeting', 'Negotiating', 'Closed'];

  const handleResearch = async (contact: Contact) => {
    setIsResearching(true);
    setResearch("");
    const result = await getInvestorResearch(contact);
    setResearch(result);
    setIsResearching(false);
  };

  const handleDraftOutreach = async (contact: Contact) => {
    setIsDrafting(true);
    const draft = await draftOutreachMemo(contact, profile);
    setOutreachDraft(draft);
    setIsDrafting(false);
  };

  const logInteraction = (contactId: string) => {
    if (!newInteraction.trim()) return;
    const interaction: Interaction = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split('T')[0],
      type: 'note',
      content: newInteraction
    };
    setContacts(prev => prev.map(c => 
      c.id === contactId 
        ? { ...c, interactions: [interaction, ...(c.interactions || [])], lastContact: interaction.date } 
        : c
    ));
    setNewInteraction("");
  };

  const scheduleFollowUp = (contact: Contact) => {
    if (!setTasks) return;
    const followUpDate = new Date();
    followUpDate.setDate(followUpDate.getDate() + 3); // Default 3 days later
    const dateStr = followUpDate.toISOString().split('T')[0];

    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: `Follow up with ${contact.name} (${contact.organization})`,
      priority: 'high',
      completed: false,
      category: 'Fundraising',
      contactId: contact.id
    };
    setTasks(prev => [newTask, ...prev]);
    
    // Add a ghost log that a follow-up was scheduled
    const interaction: Interaction = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split('T')[0],
      type: 'note',
      content: `Scheduled follow-up task for ${dateStr}.`
    };
    setContacts(prev => prev.map(c => 
      c.id === contact.id 
        ? { ...c, interactions: [interaction, ...(c.interactions || [])] } 
        : c
    ));
  };

  const moveDeal = (id: string, newStage: DealStage) => {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, stage: newStage } : c));
  };

  const handleScout = async () => {
    setIsScouting(true);
    const results = await getDiscoveryResults("Find the most compatible venture capital investors", profile);
    setProspects(results);
    setIsScouting(false);
  };

  const addProspectToPipeline = (prospect: DiscoveryResult) => {
    const newContact: Contact = {
      id: Math.random().toString(36).substr(2, 9),
      name: prospect.name,
      organization: prospect.name,
      type: 'investor',
      stage: 'Interested',
      lastContact: new Date().toISOString().split('T')[0],
      interactions: []
    };
    setContacts(prev => [...prev, newContact]);
    setProspects(prev => prev.filter(p => p.id !== prospect.id));
    setViewMode('pipeline');
  };

  return (
    <ThreePanelLayout
      title="Relationships"
      leftPanel={
        <div className="space-y-12">
          <div>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-6">Pipeline Health</p>
            <div className="space-y-4">
              {stages.map(stage => {
                const count = contacts.filter(c => c.stage === stage).length;
                return (
                  <div key={stage} className="flex justify-between items-center text-[10px] font-bold uppercase">
                    <span className="text-stone-400">{stage}</span>
                    <span className="text-stone-900">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-6">Navigation</p>
            <div className="space-y-2">
              <button 
                onClick={() => setViewMode('pipeline')}
                className={`block w-full text-left text-xs font-bold transition-colors ${viewMode === 'pipeline' ? 'text-stone-900 border-l-2 border-stone-900 pl-4 -ml-4' : 'text-stone-400 hover:text-stone-900 pl-4 -ml-4 border-l-2 border-transparent'}`}
              >
                Deal Pipeline
              </button>
              <button 
                onClick={() => setViewMode('prospecting')}
                className={`block w-full text-left text-xs font-bold transition-colors ${viewMode === 'prospecting' ? 'text-stone-900 border-l-2 border-stone-900 pl-4 -ml-4' : 'text-stone-400 hover:text-stone-900 pl-4 -ml-4 border-l-2 border-transparent'}`}
              >
                AI Prospecting
              </button>
            </div>
          </div>
          
          <div className="p-6 bg-stone-100 border border-stone-200">
            <h4 className="text-[10px] font-bold text-stone-900 uppercase tracking-widest mb-3">AI Advisor</h4>
            <p className="text-xs leading-relaxed text-stone-600 font-serif italic">
              "Focus on conversion velocity. Investors in 'Meeting' stage require high-touch follow-ups within 24 hours of interaction."
            </p>
          </div>
        </div>
      }
      mainPanel={
        <div className="space-y-8">
          <div className="flex justify-between items-center border-b border-stone-200 pb-8">
            <h3 className="text-2xl font-serif font-bold">
              {viewMode === 'pipeline' ? 'Deal Flow' : 'Investor Scouting'}
            </h3>
            <div className="flex gap-4">
              {viewMode === 'prospecting' && (
                <button 
                  onClick={handleScout}
                  disabled={isScouting}
                  className="text-[10px] font-bold uppercase tracking-widest bg-stone-900 text-white px-6 py-3 hover:bg-stone-800 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {isScouting && <div className="w-2 h-2 border border-white border-t-transparent rounded-full animate-spin"></div>}
                  {isScouting ? "Scouting..." : "Find Matches"}
                </button>
              )}
              <button className="text-[10px] font-bold uppercase tracking-widest border border-stone-900 px-6 py-3 hover:bg-stone-900 hover:text-white transition-all">
                Add Prospect
              </button>
            </div>
          </div>

          {viewMode === 'pipeline' ? (
            <div className="flex gap-6 overflow-x-auto pb-8 snap-x">
              {stages.map(stage => (
                <div key={stage} className="w-72 shrink-0 snap-start">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">{stage}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-stone-200 text-stone-600">{contacts.filter(c => c.stage === stage).length}</span>
                  </div>
                  <div className="space-y-4 min-h-[400px] p-2 bg-stone-100/50 border border-stone-100 rounded-lg">
                    {contacts.filter(c => c.stage === stage).map(contact => (
                      <div 
                        key={contact.id} 
                        onClick={() => {
                          setSelectedContact(contact);
                          setResearch("");
                          setOutreachDraft("");
                          setActiveRightTab('insights');
                        }}
                        className={`p-6 bg-white border border-stone-200 cursor-pointer group hover:border-stone-900 transition-all ${selectedContact?.id === contact.id ? 'border-stone-900 ring-1 ring-stone-900' : ''}`}
                      >
                        <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">{contact.organization}</p>
                        <h5 className="text-lg font-serif font-bold text-stone-900 mb-4">{contact.name}</h5>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] text-stone-400 font-serif italic">Last: {contact.lastContact}</span>
                          {stage !== 'Closed' && (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                const next = stages[stages.indexOf(stage) + 1];
                                if (next) moveDeal(contact.id, next);
                              }}
                              className="text-[10px] font-bold uppercase tracking-widest text-stone-300 group-hover:text-stone-900 transition-colors"
                            >
                              Advance →
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {prospects.length > 0 ? (
                <div className="grid grid-cols-1 gap-px bg-stone-200 border border-stone-200">
                  {prospects.map(prospect => (
                    <div key={prospect.id} className="p-8 bg-white group hover:bg-stone-50 transition-colors">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 mb-1">{prospect.relevance}% Affinity</p>
                          <h4 className="text-2xl font-serif font-bold text-stone-900">{prospect.name}</h4>
                        </div>
                        <button 
                          onClick={() => addProspectToPipeline(prospect)}
                          className="text-[10px] font-bold uppercase tracking-widest border border-stone-200 px-4 py-2 hover:border-stone-900 transition-colors"
                        >
                          Add to Pipeline +
                        </button>
                      </div>
                      <p className="text-sm font-serif italic text-stone-600 leading-relaxed mb-4">"{prospect.reason}"</p>
                      <a href={prospect.source} target="_blank" rel="noreferrer" className="text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors">
                        View Source URL ↗
                      </a>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center border-2 border-dashed border-stone-200 bg-stone-50/50">
                  <div className="w-12 h-12 border border-stone-200 rotate-45 mx-auto mb-8 opacity-40"></div>
                  <p className="text-sm font-serif italic text-stone-400">Initialize AI Scouting to identify high-affinity investors for your current stage.</p>
                </div>
              )}
            </div>
          )}
        </div>
      }
      rightPanel={
        selectedContact ? (
          <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4">
            <div className="mb-8">
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">{selectedContact.organization}</p>
              <h4 className="text-3xl font-serif font-bold">{selectedContact.name}</h4>
              <div className="flex gap-4 mt-6 border-b border-stone-200">
                <button 
                  onClick={() => setActiveRightTab('insights')}
                  className={`pb-2 text-[10px] font-bold uppercase tracking-widest transition-all ${activeRightTab === 'insights' ? 'text-stone-900 border-b-2 border-stone-900' : 'text-stone-400'}`}
                >
                  Insights
                </button>
                <button 
                  onClick={() => setActiveRightTab('outreach')}
                  className={`pb-2 text-[10px] font-bold uppercase tracking-widest transition-all ${activeRightTab === 'outreach' ? 'text-stone-900 border-b-2 border-stone-900' : 'text-stone-400'}`}
                >
                  Outreach
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-12">
              {activeRightTab === 'insights' ? (
                <>
                  <div>
                    <button 
                      disabled={isResearching}
                      onClick={() => handleResearch(selectedContact)}
                      className="w-full py-4 bg-stone-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-stone-800 transition-all flex items-center justify-center gap-4"
                    >
                      {isResearching && <div className="w-2 h-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                      {isResearching ? "Scouring Web..." : "Run AI Deep Research"}
                    </button>
                  </div>

                  {research ? (
                    <div className="p-6 bg-stone-100 border border-stone-200">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-stone-900 mb-4">Firm Intelligence</p>
                      <div className="text-sm font-serif text-stone-700 whitespace-pre-line leading-relaxed italic">
                        {research}
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 border-2 border-dashed border-stone-200 text-center">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-stone-300">No Intelligence Available</p>
                      <p className="text-xs font-serif text-stone-400 mt-2 italic">Run research to unlock investor fit data.</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="space-y-12">
                  {/* AI Drafting */}
                  <div>
                    <button 
                      disabled={isDrafting}
                      onClick={() => handleDraftOutreach(selectedContact)}
                      className="w-full py-4 border border-stone-900 text-stone-900 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-stone-900 hover:text-white transition-all flex items-center justify-center gap-4"
                    >
                      {isDrafting && <div className="w-2 h-2 border-2 border-stone-900 border-t-transparent rounded-full animate-spin"></div>}
                      {isDrafting ? "Drafting Narrative..." : "Draft Personalized Memo"}
                    </button>
                    {outreachDraft && (
                      <div className="mt-4 p-6 bg-stone-50 border border-stone-200 text-xs font-serif leading-relaxed italic text-stone-700 whitespace-pre-line group relative">
                        {outreachDraft}
                        <button 
                          onClick={() => navigator.clipboard.writeText(outreachDraft)}
                          className="absolute top-2 right-2 text-[8px] font-bold uppercase text-stone-400 hover:text-stone-900"
                        >
                          Copy
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Interaction Logging */}
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-4">Communication Log</p>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <input 
                          type="text"
                          value={newInteraction}
                          onChange={(e) => setNewInteraction(e.target.value)}
                          placeholder="Log call, email, or note..."
                          className="flex-1 p-3 bg-white border border-stone-200 text-xs font-serif focus:outline-none focus:border-stone-900"
                        />
                        <button 
                          onClick={() => logInteraction(selectedContact.id)}
                          className="px-4 bg-stone-100 border border-stone-200 text-[10px] font-bold uppercase hover:bg-stone-200"
                        >
                          Log
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        {selectedContact.interactions?.map(interaction => (
                          <div key={interaction.id} className="p-4 border-l-2 border-stone-200 bg-stone-50/50">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400">{interaction.date}</span>
                              <span className="text-[9px] font-bold uppercase tracking-widest text-stone-900">{interaction.type}</span>
                            </div>
                            <p className="text-xs font-serif text-stone-600 italic">"{interaction.content}"</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Scheduling */}
                  <div>
                    <button 
                      onClick={() => scheduleFollowUp(selectedContact)}
                      className="w-full py-4 bg-white border border-stone-200 text-stone-400 text-[10px] font-bold uppercase tracking-[0.2em] hover:border-stone-900 hover:text-stone-900 transition-all"
                    >
                      Schedule 3-Day Follow-up
                    </button>
                    <p className="text-[9px] text-center text-stone-400 mt-2 uppercase tracking-widest">Adds High-Priority Task to Execution Backlog</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
            <div className="w-12 h-12 border border-stone-200 rotate-45 mb-8"></div>
            <p className="text-[10px] font-bold uppercase tracking-widest">Select a deal to reveal <br/> strategic intelligence</p>
          </div>
        )
      }
    />
  );
};

export default CRM;
