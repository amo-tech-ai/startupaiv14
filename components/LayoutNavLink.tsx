import React from 'react';
import { NavLink } from 'react-router-dom';

interface LayoutNavLinkProps {
  to: string;
  label: string;
}

const LayoutNavLink: React.FC<LayoutNavLinkProps> = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) => 
      `block py-2 text-sm transition-all duration-300 ${
        isActive 
          ? 'text-stone-900 font-bold translate-x-1 border-l-2 border-stone-900 pl-4 -ml-4' 
          : 'text-stone-400 hover:text-stone-600 pl-4 -ml-4 border-l-2 border-transparent hover:border-stone-200'
      }`
    }
  >
    {label}
  </NavLink>
);

export default LayoutNavLink;