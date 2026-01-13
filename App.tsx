import React, { useState, useMemo } from 'react';
import { createHashRouter, RouterProvider, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Wizard from './pages/Wizard';
import CRM from './pages/CRM';
import Landing from './pages/Landing';
import Tasks from './pages/Tasks';
import Documents from './pages/Documents';
import Discovery from './pages/Discovery';
import Projects from './pages/Projects';
import { StartupProfile, Task, Contact } from './types';
import { INITIAL_PROFILE } from './constants';

const App: React.FC = () => {
  const [profile, setProfile] = useState<StartupProfile>(INITIAL_PROFILE);
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Follow up with Investor Mike', priority: 'high', completed: false, category: 'Fundraising' },
    { id: '2', title: 'Update pitch deck slide 5', priority: 'medium', completed: false, category: 'Strategy' },
    { id: '3', title: 'Schedule co-founder meeting', priority: 'medium', completed: false, category: 'Team' },
  ]);
  const [contacts, setContacts] = useState<Contact[]>([
    { id: '1', name: 'Sarah Miller', organization: 'Peak Ventures', type: 'investor', stage: 'Meeting', lastContact: '2023-10-20' },
    { id: '2', name: 'Mike Ross', organization: 'Angel', type: 'investor', stage: 'Interested', lastContact: '2023-10-22' },
  ]);

  const updateProfile = (data: Partial<StartupProfile>) => {
    setProfile(prev => ({ ...prev, ...data }));
  };

  const handleSetTasks = (newTasks: Task[]) => {
    setTasks(prev => [...newTasks, ...prev]);
  };

  // Define router inside useMemo to keep it stable while allowing it to react to latest state changes
  const router = useMemo(() => createHashRouter([
    {
      path: '/',
      element: <Landing />
    },
    {
      path: '/how-it-works',
      element: <Landing />
    },
    {
      path: '/pricing',
      element: <Landing />
    },
    {
      path: '/app',
      children: [
        {
          path: 'wizard',
          element: <Wizard profile={profile} updateProfile={updateProfile} setTasks={handleSetTasks} />
        },
        {
          path: 'dashboard',
          element: <Dashboard profile={profile} tasks={tasks} />
        },
        {
          path: 'discovery',
          element: <Discovery profile={profile} />
        },
        {
          path: 'crm',
          element: <CRM contacts={contacts} setContacts={setContacts} />
        },
        {
          path: 'projects',
          element: <Projects />
        },
        {
          path: 'tasks',
          element: <Tasks tasks={tasks} setTasks={setTasks} />
        },
        {
          path: 'documents',
          element: <Documents profile={profile} />
        },
        {
          index: true,
          element: <Navigate to="dashboard" replace />
        }
      ]
    }
  ]), [profile, tasks, contacts]);

  return <RouterProvider router={router} />;
};

export default App;