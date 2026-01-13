import React, { useState, useMemo } from 'react';
import { RouterProvider } from 'react-router-dom';
import { StartupProfile, Task, Contact, UserProfile as UserProfileType } from './types';
import { INITIAL_PROFILE, INITIAL_USER } from './constants';
import { createStartupRouter } from './router';

const App: React.FC = () => {
  const [profile, setProfile] = useState<StartupProfile>(INITIAL_PROFILE);
  const [user, setUser] = useState<UserProfileType>(INITIAL_USER);
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Follow up with Investor Mike', priority: 'high', completed: false, category: 'Fundraising' },
    { id: '2', title: 'Update pitch deck slide 5', priority: 'medium', completed: false, category: 'Strategy' },
    { id: '3', title: 'Schedule co-founder meeting', priority: 'medium', completed: false, category: 'Team' },
  ]);
  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: 'Sarah Miller', organization: 'Peak Ventures', type: 'investor', stage: 'Meeting', lastContact: '2023-10-20', interactions: [] },
    { id: '2', name: 'Mike Ross', organization: 'Angel', type: 'investor', stage: 'Interested', lastContact: '2023-10-22', interactions: [] },
  ]);

  const updateProfile = (data: Partial<StartupProfile>) => {
    setProfile(prev => ({ ...prev, ...data }));
  };

  const updateUser = (data: Partial<UserProfileType>) => {
    setUser(prev => ({ ...prev, ...data }));
  };

  const handleSetTasks = (newTasks: Task[]) => {
    setTasks(prev => [...newTasks, ...prev]);
  };

  const router = useMemo(() => createStartupRouter({
    profile,
    user,
    tasks,
    contacts,
    updateProfile,
    updateUser,
    setTasks: handleSetTasks,
    setContacts,
    updateTasks: setTasks
  }), [profile, user, tasks, contacts]);

  return <RouterProvider router={router} />;
};

export default App;