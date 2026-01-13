import React from 'react';
import { useNavigate } from 'react-router-dom';
import ThreePanelLayout from '../components/ThreePanelLayout';
import { UserProfile as UserProfileType } from '../types';

interface UserProfileProps {
  user: UserProfileType;
  updateUser: (data: Partial<UserProfileType>) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, updateUser }) => {
  const navigate = useNavigate();

  return (
    <ThreePanelLayout
      title="My Profile"
      leftPanel={
        <div className="space-y-8">
          <div>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-6">Account Context</p>
            <p className="text-xs text-stone-600 font-serif italic leading-relaxed">
              "Personalized preferences help tailor the AI Coach's communication style and dashboard visibility."
            </p>
          </div>
        </div>
      }
      mainPanel={
        <div className="space-y-8">
          <div className="flex justify-between items-center mb-8">
            <p className="text-sm text-stone-400 font-serif italic">Manage your personal information and account settings</p>
            <button 
              onClick={() => navigate('/app/dashboard')}
              className="px-4 py-2 border border-stone-200 text-[10px] font-bold uppercase tracking-widest hover:border-stone-900"
            >
              Back to Dashboard
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Column: Profile Card */}
            <div className="md:col-span-4 space-y-6">
              <div className="bg-white border border-stone-200 p-8 text-center space-y-6">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-3xl overflow-hidden">
                    {user.avatarUrl ? <img src={user.avatarUrl} alt="Avatar" /> : "👤"}
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-stone-900 text-white rounded-full border-4 border-white flex items-center justify-center text-xs">
                    📷
                  </button>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-stone-900">{user.firstName} {user.lastName}</h3>
                  <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mt-1">{user.role}</p>
                  <p className="text-[9px] text-stone-300 font-bold uppercase tracking-widest">{user.department}</p>
                </div>
                <button className="w-full py-2 border border-stone-200 text-[10px] font-bold uppercase tracking-widest hover:border-stone-900">
                  Change Avatar
                </button>
              </div>

              <div className="bg-white border border-stone-200 overflow-hidden">
                <button className="w-full text-left p-4 hover:bg-stone-50 transition-colors flex items-center gap-3 border-b border-stone-100">
                  <span className="text-xs">⚙️</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-600">Manage Account Settings</span>
                </button>
                <button className="w-full text-left p-4 hover:bg-stone-50 transition-colors flex items-center gap-3 text-rose-600">
                  <span className="text-xs">🚪</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Log Out</span>
                </button>
              </div>
            </div>

            {/* Right Column: Forms */}
            <div className="md:col-span-8 space-y-8">
              <div className="bg-white border border-stone-200 p-8">
                <h3 className="text-sm font-serif font-bold text-stone-900 mb-2">Personal Information</h3>
                <p className="text-[10px] text-stone-400 uppercase font-bold tracking-widest mb-8">Manage your public profile details</p>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">First Name *</label>
                    <input 
                      type="text"
                      className="w-full p-3 bg-stone-50 border border-stone-100 focus:outline-none focus:border-stone-900 text-xs font-serif"
                      value={user.firstName}
                      onChange={e => updateUser({ firstName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Last Name</label>
                    <input 
                      type="text"
                      className="w-full p-3 bg-stone-50 border border-stone-100 focus:outline-none focus:border-stone-900 text-xs font-serif"
                      value={user.lastName}
                      onChange={e => updateUser({ lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400">Bio</label>
                    <button className="text-[9px] font-bold uppercase text-stone-400 hover:text-stone-900 flex items-center gap-1">
                      ✨ Rewrite with AI
                    </button>
                  </div>
                  <textarea 
                    className="w-full p-3 bg-stone-50 border border-stone-100 focus:outline-none focus:border-stone-900 text-xs font-serif min-h-[120px]"
                    placeholder="Tell us a little about yourself..."
                    value={user.bio}
                    onChange={e => updateUser({ bio: e.target.value })}
                  />
                  <p className="text-right text-[9px] text-stone-300 font-bold uppercase mt-1">0/250 characters</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Email Address</label>
                    <div className="flex items-center gap-2 p-3 bg-stone-50 border border-stone-100 text-xs text-stone-400">
                      <span>✉️</span>
                      <span>{user.email}</span>
                      <span className="ml-auto text-[8px] font-bold uppercase bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded-sm">Verified</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Timezone *</label>
                    <div className="relative">
                      <select 
                        className="w-full p-3 bg-stone-50 border border-stone-100 focus:outline-none focus:border-stone-900 text-xs font-serif appearance-none"
                        value={user.timezone}
                        onChange={e => updateUser({ timezone: e.target.value })}
                      >
                        <option>Pacific Time (US & Canada)</option>
                        <option>Eastern Time (US & Canada)</option>
                        <option>UTC</option>
                      </select>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-stone-300 pointer-events-none">▼</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-stone-200 p-8">
                <h3 className="text-sm font-serif font-bold text-stone-900 mb-2">Preferences</h3>
                <p className="text-[10px] text-stone-400 uppercase font-bold tracking-widest mb-8">Customize your workspace experience</p>

                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-stone-900">Appearance</p>
                      <p className="text-[10px] text-stone-400 font-serif italic mt-1">Select your interface color theme.</p>
                    </div>
                    <div className="flex bg-stone-100 p-1 border border-stone-200 rounded-sm">
                      {['Light', 'Dark', 'Auto'].map(theme => (
                        <button 
                          key={theme}
                          onClick={() => updateUser({ preferences: { ...user.preferences, appearance: theme.toLowerCase() as any } })}
                          className={`px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest transition-all ${user.preferences.appearance === theme.toLowerCase() ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-400 hover:text-stone-900'}`}
                        >
                          {theme === 'Light' ? '☀️ ' : theme === 'Dark' ? '🌙 ' : '💻 '}{theme}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-stone-900">AI Copilot Mode</p>
                        <span className="text-[8px] font-bold uppercase bg-indigo-50 text-indigo-600 px-1.5 py-0.5 rounded-sm">BETA</span>
                      </div>
                      <p className="text-[10px] text-stone-400 font-serif italic mt-1 max-w-sm">Enable proactive suggestions and automated insights across your workflow.</p>
                    </div>
                    <button 
                      onClick={() => updateUser({ preferences: { ...user.preferences, aiCopilot: !user.preferences.aiCopilot } })}
                      className={`w-10 h-5 rounded-full relative transition-colors ${user.preferences.aiCopilot ? 'bg-indigo-600' : 'bg-stone-200'}`}
                    >
                      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${user.preferences.aiCopilot ? 'right-1' : 'left-1'}`}></div>
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-stone-900">Language</p>
                      <p className="text-[10px] text-stone-400 font-serif italic mt-1">Choose your preferred language.</p>
                    </div>
                    <div className="relative w-48">
                      <select 
                        className="w-full p-3 bg-stone-50 border border-stone-100 focus:outline-none focus:border-stone-900 text-xs font-serif appearance-none"
                        value={user.preferences.language}
                        onChange={e => updateUser({ preferences: { ...user.preferences, language: e.target.value } })}
                      >
                        <option>English (United States)</option>
                        <option>Spanish</option>
                        <option>French</option>
                      </select>
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-stone-300 pointer-events-none">▼</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      rightPanel={null}
    />
  );
};

export default UserProfile;