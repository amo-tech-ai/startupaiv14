import { createHashRouter, Navigate } from 'react-router-dom';
import React from 'react';
import Dashboard from './pages/Dashboard';
import Wizard from './pages/Wizard';
import CRM from './pages/CRM';
import Landing from './pages/Landing';
import Tasks from './pages/Tasks';
import Documents from './pages/Documents';
import Discovery from './pages/Discovery';
import Projects from './pages/Projects';
import UserProfile from './pages/UserProfile';
import CompanyProfile from './pages/CompanyProfile';
import LeanCanvas from './pages/LeanCanvas';
import { StartupProfile, Task, Contact, UserProfile as UserProfileType } from './types';

interface RouterProps {
  profile: StartupProfile;
  user: UserProfileType;
  tasks: Task[];
  contacts: Contact[];
  updateProfile: (data: Partial<StartupProfile>) => void;
  updateUser: (data: Partial<UserProfileType>) => void;
  setTasks: (tasks: Task[]) => void;
  setContacts: React.Dispatch<React.SetStateAction<Contact[]>>;
  updateTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export const createStartupRouter = ({
  profile,
  user,
  tasks,
  contacts,
  updateProfile,
  updateUser,
  setTasks,
  setContacts,
  updateTasks
}: RouterProps) => createHashRouter([
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
        element: <Wizard profile={profile} updateProfile={updateProfile} setTasks={setTasks} />
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
        element: <CRM contacts={contacts} setContacts={setContacts} profile={profile} setTasks={updateTasks} />
      },
      {
        path: 'projects',
        element: <Projects setTasks={updateTasks} />
      },
      {
        path: 'tasks',
        element: <Tasks tasks={tasks} setTasks={updateTasks} />
      },
      {
        path: 'documents',
        element: <Documents profile={profile} />
      },
      {
        path: 'lean-canvas',
        element: <LeanCanvas profile={profile} updateProfile={updateProfile} />
      },
      {
        path: 'profile',
        element: <UserProfile user={user} updateUser={updateUser} />
      },
      {
        path: 'company-profile',
        element: <CompanyProfile profile={profile} updateProfile={updateProfile} />
      },
      {
        index: true,
        element: <Navigate to="dashboard" replace />
      }
    ]
  }
]);