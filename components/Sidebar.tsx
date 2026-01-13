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
      
      <nav className="p-8 flex-1 space-y-1 overflow-y-auto">
        <LayoutNavLink to="/app/dashboard" label="Command Center" />
        <LayoutNavLink to="/app/discovery" label="Discovery" />
        <LayoutNavLink to="/app/crm" label="Relationships" />
        <LayoutNavLink to="/app/projects" label="Projects" />
        <LayoutNavLink to="/app/tasks" label="Execution" />
        <LayoutNavLink to="/app/documents" label="Strategy" />
        <div className="pt-8 mt-8 border-t border-stone-200">
          <LayoutNavLink to="/app/wizard" label="Setup Wizard" />
        </div>
      </nav>

      {children && (
        <div className="p-8 border-t border-stone-200 bg-stone-100/20">
          {children}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;