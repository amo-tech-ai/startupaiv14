import React, { ReactNode } from 'react';
import LayoutNavLink from './LayoutNavLink';

interface SidebarProps {
  children?: ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return (
    <aside className="w-72 border-r border-stone-200 flex flex-col bg-stone-100/40 shrink-0">
      <div className="p-8 border-b border-stone-200">
        <h1 className="text-xl font-serif font-bold tracking-tight text-stone-900">StartupAI</h1>
        <p className="text-[10px] text-stone-400 uppercase tracking-[0.2em] mt-1 font-bold">Operating System v14</p>
      </div>
      
      <div className="p-8 flex-1 space-y-8 overflow-y-auto">
        <div>
          <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-4">Platform</p>
          <nav className="space-y-1">
            <LayoutNavLink to="/app/dashboard" label="Dashboard" />
            <LayoutNavLink to="/app/projects" label="Projects" />
            <LayoutNavLink to="/app/wizard" label="Startup Profile Wizard" />
            <LayoutNavLink to="/app/company-profile" label="Edit Company" />
            <LayoutNavLink to="/app/profile" label="User Profile" />
            <LayoutNavLink to="/app/documents" label="Pitch Decks" />
            <LayoutNavLink to="/app/lean-canvas" label="Lean Canvas" />
            <LayoutNavLink to="/app/discovery" label="Discovery" />
            <LayoutNavLink to="/app/crm" label="Deals" />
            <LayoutNavLink to="/app/tasks" label="Execution" />
          </nav>
        </div>

        <div>
          <p className="text-[9px] font-bold text-stone-400 uppercase tracking-widest mb-4">Workspace</p>
          <nav className="space-y-1">
            <LayoutNavLink to="/app/settings" label="Settings" />
          </nav>
        </div>
      </div>

      {children && (
        <div className="p-8 border-t border-stone-200 bg-stone-100/20">
          {children}
        </div>
      )}

      {/* User Quick Switcher as seen in screenshot */}
      <div className="p-6 border-t border-stone-200 bg-stone-100/40 flex items-center justify-between group cursor-pointer hover:bg-stone-200 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-stone-200 border border-stone-300 flex items-center justify-center text-xs">
            👤
          </div>
          <div>
            <p className="text-[10px] font-bold text-stone-900">Alex Founder</p>
            <p className="text-[8px] font-bold text-stone-400 uppercase tracking-tight">Pro Plan</p>
          </div>
        </div>
        <span className="text-stone-300 group-hover:text-stone-900">›</span>
      </div>
    </aside>
  );
};

export default Sidebar;