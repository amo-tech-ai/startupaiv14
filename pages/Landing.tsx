import React from 'react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-serif">
      {/* Top Navigation Bar */}
      <nav className="p-8 md:px-16 flex justify-between items-center border-b border-stone-200">
        <Link to="/" className="text-lg font-bold tracking-tight">StartupAI</Link>
        <div className="space-x-12 text-[10px] font-bold uppercase tracking-widest hidden md:block">
          <Link to="/how-it-works" className="hover:text-stone-500 transition-colors">How it works</Link>
          <Link to="/pricing" className="hover:text-stone-500 transition-colors">Pricing</Link>
          <Link to="/app/wizard" className="bg-stone-900 text-white px-6 py-3 hover:bg-stone-800 transition-all">Launch OS</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-8 md:px-32 text-center max-w-6xl mx-auto">
        <div className="space-y-12">
          <div className="inline-flex items-center gap-3 px-4 py-1 border border-stone-200 rounded-full mb-8">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-500">v14 Release Now Active</span>
          </div>
          
          <h2 className="text-7xl md:text-[9rem] font-bold tracking-tighter leading-[0.85] text-stone-900">
            Structure <br/>
            <span className="italic font-normal">Over</span> Chaos.
          </h2>
          
          <p className="text-xl md:text-3xl text-stone-500 max-w-3xl mx-auto leading-relaxed font-light">
            The intelligent operating system that transforms founder intuition into investor-ready execution.
          </p>

          <div className="pt-12 flex flex-col md:flex-row gap-6 justify-center">
            <Link 
              to="/app/wizard" 
              className="px-16 py-6 bg-stone-900 text-white font-bold uppercase text-xs tracking-[0.3em] hover:bg-stone-800 transition-all shadow-xl hover:translate-y-[-2px]"
            >
              Initialize System
            </Link>
            <button className="px-16 py-6 border border-stone-200 text-stone-900 font-bold uppercase text-xs tracking-[0.3em] hover:border-stone-900 transition-all">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Editorial Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-32 pt-24 border-t border-stone-200 text-left w-full">
          <div className="space-y-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">01 / Clarity</p>
            <h3 className="text-2xl font-bold">Deep Strategy Mapping</h3>
            <p className="text-stone-500 leading-relaxed font-sans text-sm">
              Our inference engine deconstructs your business model, identifying strategic vulnerabilities before they become operational crises.
            </p>
          </div>
          <div className="space-y-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">02 / Execution</p>
            <h3 className="text-2xl font-bold">Dynamic Prioritization</h3>
            <p className="text-stone-500 leading-relaxed font-sans text-sm">
              Stop wondering what to do. StartupAI curates your daily priorities based on real-time data, runway, and fundraising milestones.
            </p>
          </div>
          <div className="space-y-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400">03 / Fundraising</p>
            <h3 className="text-2xl font-bold">Investor Intelligence</h3>
            <p className="text-stone-500 leading-relaxed font-sans text-sm">
              Manage your cap table and investor pipeline with AI-driven suggestions on outreach timing and deck refinement.
            </p>
          </div>
        </div>
      </main>

      {/* Improved Editorial Footer */}
      <footer className="w-full border-t border-stone-200 bg-stone-50 pt-24 pb-12 px-8 md:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-24 text-left">
          <div className="col-span-1">
            <h4 className="text-xl font-serif font-bold mb-6">StartupAI</h4>
            <p className="text-stone-500 text-sm leading-relaxed font-serif italic">
              The architectural operating system for founders who prioritize structure over noise.
            </p>
          </div>
          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-stone-900 mb-8">Platform</h5>
            <ul className="space-y-4 text-sm text-stone-500">
              <li><Link to="/app/dashboard" className="hover:text-stone-900 transition-colors">Command Center</Link></li>
              <li><Link to="/app/crm" className="hover:text-stone-900 transition-colors">Relationships</Link></li>
              <li><Link to="/app/tasks" className="hover:text-stone-900 transition-colors">Execution</Link></li>
              <li><Link to="/app/documents" className="hover:text-stone-900 transition-colors">Strategy</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-stone-900 mb-8">System</h5>
            <ul className="space-y-4 text-sm text-stone-500">
              <li><Link to="/app/wizard" className="hover:text-stone-900 transition-colors">Setup Wizard</Link></li>
              <li><Link to="/how-it-works" className="hover:text-stone-900 transition-colors">Architecture</Link></li>
              <li><a href="https://ai.google.dev/gemini-api/docs" target="_blank" rel="noreferrer" className="hover:text-stone-900 transition-colors">Documentation</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-[10px] font-bold uppercase tracking-widest text-stone-900 mb-8">Company</h5>
            <ul className="space-y-4 text-sm text-stone-500">
              <li><Link to="/pricing" className="hover:text-stone-900 transition-colors">Pricing</Link></li>
              <li><a href="#" className="hover:text-stone-900 transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-stone-900 transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center gap-8">
          <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
            &copy; MMXXIV StartupAI Systems v14
          </span>
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 italic">
              Built for the Ambitious
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;