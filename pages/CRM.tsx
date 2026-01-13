
import React, { useState } from 'react';
import ThreePanelLayout from '../components/ThreePanelLayout';
import { Contact, DealStage } from '../types';
import { getInvestorResearch } from '../services/gemini';

interface CRMProps {
  contacts: Contact[];
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
}

const CRM: React.FC<CRMProps> = ({ contacts, setContacts }) => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [research, setResearch] = useState<string>("");
  const [isResearching, setIsResearching] = useState(false);

  const stages: DealStage[] = ['Interested', 'Meeting', 'Negotiating', 'Closed'];

  const handleResearch = async (contact: Contact) => {
    setIsResearching(true);
    setResearch("");
    const result = await getInvestorResearch(contact);
    setResearch(result);
    setIsResearching(false);
  };

  const moveDeal = (id: string, newStage: DealStage) => {
    setContacts(prev => prev.map(c => c.id === id ? { ...c, stage: newStage } : c));
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
          
          <div className="p-6 bg-stone-100 border border-stone-200">
            <h4 className="text-[10px] font-bold text-stone-900 uppercase tracking-widest mb-3">AI Advisor</h4>
            <p className="text-xs leading-relaxed text-stone-600 font-serif italic">
              "Deal velocity in 'Meeting' stage is currently 12 days. Suggest aggressive follow-ups for Sarah Miller."
            </p>
          </div>
        </div>
      }
      mainPanel={
        <div className="space-y-8">
          <div className="flex justify-between items-center border-b border-stone-200 pb-8">
            <h3 className="text-2xl font-serif font-bold">Deal Flow</h3>
            <button className="text-[10px] font-bold uppercase tracking-widest border border-stone-900 px-6 py-3 hover:bg-stone-900 hover:text-white transition-all">
              Add Prospect
            </button>
          </div>

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
                      onClick={() => setSelectedContact(contact)}
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
        </div>
      }
      rightPanel={
        selectedContact ? (
          <div className="space-y-12 animate-in fade-in slide-in-from-right-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">{selectedContact.organization}</p>
              <h4 className="text-3xl font-serif font-bold">{selectedContact.name}</h4>
              <p className="text-sm text-stone-500 font-serif italic mt-2">Active {selectedContact.type}</p>
            </div>

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
              <div className="space-y-8">
                <div className="p-6 bg-stone-100 border border-stone-200">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-900 mb-4">Firm Intelligence</p>
                  <div className="text-sm font-serif text-stone-700 whitespace-pre-line leading-relaxed italic">
                    {research}
                  </div>
                </div>
                <div>
                  <button className="w-full py-3 border border-stone-200 text-stone-400 text-[10px] font-bold uppercase tracking-widest hover:border-stone-900 hover:text-stone-900 transition-all">
                    Draft Outreach Memo
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 border-2 border-dashed border-stone-200 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-300">No Intelligence Available</p>
                <p className="text-xs font-serif text-stone-400 mt-2 italic">Run research to unlock investor fit data.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
            <div className="w-12 h-12 border border-stone-200 rotate-45 mb-8"></div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Select a deal to reveal <br/> strategic intelligence</p>
          </div>
        )
      }
    />
  );
};

export default CRM;
