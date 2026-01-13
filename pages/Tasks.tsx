
import React from 'react';
import ThreePanelLayout from '../components/ThreePanelLayout';
import { Task } from '../types';

interface TasksProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const Tasks: React.FC<TasksProps> = ({ tasks, setTasks }) => {
  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <ThreePanelLayout
      title="Execution"
      leftPanel={
        <div className="space-y-4">
          <p className="text-xs font-bold text-stone-400 uppercase">Filters</p>
          <div className="space-y-1">
            <button className="block text-xs font-bold text-stone-900">All Tasks</button>
            <button className="block text-xs text-stone-500 hover:text-stone-900">Fundraising</button>
            <button className="block text-xs text-stone-500 hover:text-stone-900">Product</button>
          </div>
        </div>
      }
      mainPanel={
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-serif font-bold">Priority Backlog</h3>
            <span className="text-xs text-stone-400">{tasks.filter(t => !t.completed).length} Pending</span>
          </div>
          
          <div className="space-y-px border border-stone-200 bg-stone-200">
            {tasks.map(task => (
              <div 
                key={task.id} 
                onClick={() => toggleTask(task.id)}
                className="group flex items-center p-6 bg-white cursor-pointer hover:bg-stone-50 transition-colors"
              >
                <div className={`w-4 h-4 border border-stone-300 mr-6 flex items-center justify-center ${task.completed ? 'bg-stone-900 border-stone-900' : ''}`}>
                  {task.completed && <div className="w-1.5 h-1.5 bg-white"></div>}
                </div>
                <div className="flex-1">
                  <span className={`text-sm ${task.completed ? 'line-through text-stone-400' : 'text-stone-900'}`}>
                    {task.title}
                  </span>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${task.priority === 'high' ? 'text-rose-600' : 'text-stone-400'}`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      }
      rightPanel={
        <>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-3">Workload Analysis</p>
            <p className="text-sm leading-relaxed text-stone-800">
              "Your task velocity is high. However, most tasks are administrative. Focus more time on high-impact 'Strategy' items this week."
            </p>
          </div>
          <div className="p-4 bg-stone-100 border border-stone-200">
            <p className="text-xs font-bold uppercase mb-2">Efficiency Tip</p>
            <p className="text-xs text-stone-600 leading-relaxed italic">
              Try the 'Batching' method: group your co-founder meetings on Tuesday afternoons to preserve deep-work morning blocks.
            </p>
          </div>
        </>
      }
    />
  );
};

export default Tasks;
