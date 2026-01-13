import React, { useState } from 'react';
import ThreePanelLayout from '../components/ThreePanelLayout';
import { Task, Priority } from '../types';

interface TasksProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const Tasks: React.FC<TasksProps> = ({ tasks, setTasks }) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterPriority, setFilterPriority] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Completed' | 'Pending'>('All');
  const [editingTask, setEditingTask] = useState<string | null>(null);

  const categories = ['All', ...new Set(tasks.map(t => t.category))];
  const priorities = ['All', 'high', 'medium', 'low'];

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const changePriority = (id: string, newPriority: Priority) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, priority: newPriority } : t));
  };

  const addDependency = (taskId: string, depId: string) => {
    if (taskId === depId) return;
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const deps = t.dependencies || [];
        if (deps.includes(depId)) return t;
        return { ...t, dependencies: [...deps, depId] };
      }
      return t;
    }));
  };

  const removeDependency = (taskId: string, depId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, dependencies: (t.dependencies || []).filter(d => d !== depId) };
      }
      return t;
    }));
  };

  const filteredTasks = tasks.filter(t => {
    const categoryMatch = filterCategory === 'All' || t.category === filterCategory;
    const priorityMatch = filterPriority === 'All' || t.priority === filterPriority;
    const statusMatch = filterStatus === 'All' || 
                       (filterStatus === 'Completed' && t.completed) || 
                       (filterStatus === 'Pending' && !t.completed);
    return categoryMatch && priorityMatch && statusMatch;
  });

  return (
    <ThreePanelLayout
      title="Execution"
      leftPanel={
        <div className="space-y-12">
          <div>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-6">Status</p>
            <div className="flex flex-col gap-2">
              {['All', 'Pending', 'Completed'].map((s) => (
                <button 
                  key={s}
                  onClick={() => setFilterStatus(s as any)}
                  className={`text-left text-xs font-bold transition-colors ${filterStatus === s ? 'text-stone-900 border-l-2 border-stone-900 pl-3' : 'text-stone-400 hover:text-stone-600 pl-3 border-l-2 border-transparent'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-6">Category</p>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`text-left text-xs font-bold transition-colors ${filterCategory === cat ? 'text-stone-900 border-l-2 border-stone-900 pl-3' : 'text-stone-400 hover:text-stone-600 pl-3 border-l-2 border-transparent'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-6">Priority</p>
            <div className="flex flex-col gap-2">
              {priorities.map((p) => (
                <button 
                  key={p}
                  onClick={() => setFilterPriority(p)}
                  className={`text-left text-xs font-bold transition-colors ${filterPriority === p ? 'text-stone-900 border-l-2 border-stone-900 pl-3' : 'text-stone-400 hover:text-stone-600 pl-3 border-l-2 border-transparent'}`}
                >
                  {p.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      }
      mainPanel={
        <div className="space-y-8">
          <div className="flex justify-between items-center border-b border-stone-200 pb-8">
            <h3 className="text-2xl font-serif font-bold">Execution Backlog</h3>
            <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
              {filteredTasks.length} Result{filteredTasks.length !== 1 ? 's' : ''}
            </span>
          </div>
          
          <div className="space-y-px border border-stone-200 bg-stone-200">
            {filteredTasks.map(task => (
              <div 
                key={task.id} 
                className="group p-8 bg-white hover:bg-stone-50 transition-colors"
              >
                <div className="flex items-center">
                  <div 
                    onClick={() => toggleTask(task.id)}
                    className={`w-5 h-5 border border-stone-300 mr-8 flex items-center justify-center cursor-pointer transition-colors ${task.completed ? 'bg-stone-900 border-stone-900' : 'hover:border-stone-900'}`}
                  >
                    {task.completed && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <span className={`text-lg font-serif transition-all ${task.completed ? 'line-through text-stone-300 italic' : 'text-stone-900'}`}>
                      {task.title}
                    </span>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">{task.category}</span>
                      {task.dependencies && task.dependencies.length > 0 && (
                        <span className="text-[9px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2 py-0.5 border border-amber-100">
                          Blocked by {task.dependencies.length} task{task.dependencies.length !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <button 
                      onClick={() => setEditingTask(editingTask === task.id ? null : task.id)}
                      className="text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors"
                    >
                      {editingTask === task.id ? 'Close' : 'Link'}
                    </button>
                    <div className="relative group/prio">
                      <select 
                        value={task.priority}
                        onChange={(e) => changePriority(task.id, e.target.value as Priority)}
                        className={`appearance-none bg-transparent text-[10px] font-bold uppercase tracking-widest border-b border-stone-100 cursor-pointer focus:outline-none focus:border-stone-900 pr-4 ${
                          task.priority === 'high' ? 'text-rose-600' : 
                          task.priority === 'medium' ? 'text-amber-600' : 'text-stone-400'
                        }`}
                      >
                        <option value="high">HIGH</option>
                        <option value="medium">MEDIUM</option>
                        <option value="low">LOW</option>
                      </select>
                    </div>
                    
                    <button className="text-[10px] font-bold uppercase tracking-widest text-stone-200 hover:text-rose-600 transition-colors">
                      Delete
                    </button>
                  </div>
                </div>

                {/* Dependency Management UI */}
                {editingTask === task.id && (
                  <div className="mt-6 pt-6 border-t border-stone-100 animate-in fade-in slide-in-from-top-2">
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-stone-900">Task Dependencies</p>
                      <p className="text-[10px] font-serif italic text-stone-400 italic">"Ensure sequential flow of execution"</p>
                    </div>
                    
                    <div className="space-y-4">
                      {/* Current Dependencies */}
                      {task.dependencies && task.dependencies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {task.dependencies.map(depId => {
                            const depTask = tasks.find(t => t.id === depId);
                            return (
                              <div key={depId} className="flex items-center gap-2 px-3 py-1.5 bg-stone-100 border border-stone-200 text-[10px] font-serif">
                                <span>{depTask?.title}</span>
                                <button 
                                  onClick={() => removeDependency(task.id, depId)}
                                  className="text-stone-400 hover:text-rose-600 transition-colors"
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Add Dependency Selection */}
                      <div className="relative">
                        <select 
                          className="w-full p-3 bg-stone-50 border border-stone-200 text-xs font-serif appearance-none focus:outline-none focus:border-stone-900"
                          onChange={(e) => {
                            if (e.target.value) {
                              addDependency(task.id, e.target.value);
                              e.target.value = '';
                            }
                          }}
                        >
                          <option value="">+ Link a Pre-requisite Task...</option>
                          {tasks
                            .filter(t => t.id !== task.id && !(task.dependencies || []).includes(t.id))
                            .map(t => (
                              <option key={t.id} value={t.id}>{t.title} ({t.category})</option>
                            ))
                          }
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {filteredTasks.length === 0 && (
              <div className="p-20 bg-white text-center">
                <p className="text-sm font-serif italic text-stone-400">No tasks match your current filters.</p>
                <button 
                  onClick={() => {
                    setFilterCategory('All');
                    setFilterPriority('All');
                    setFilterStatus('All');
                  }}
                  className="mt-6 text-[10px] font-bold uppercase tracking-widest text-stone-900 underline underline-offset-4"
                >
                  Reset Parameters
                </button>
              </div>
            )}
          </div>
        </div>
      }
      rightPanel={
        <>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-6">Execution Dynamics</p>
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 border border-stone-900 rotate-45"></div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-900">Critical Path Mapping</span>
                </div>
                <p className="text-sm font-serif leading-relaxed text-stone-800 italic border-l-2 border-stone-200 pl-4 py-1">
                  "Dependencies provide the OS with sequential logic. Linking tasks allows the AI to correctly identify the 'Next Best Action' based on technical readiness, not just priority."
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 border border-stone-900 rotate-45"></div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-900">Bottleneck Audit</span>
                </div>
                <p className="text-sm font-serif leading-relaxed text-stone-800 italic border-l-2 border-stone-200 pl-4 py-1">
                  {tasks.some(t => t.dependencies?.length && !t.completed) 
                    ? "Sequential dependencies detected. Ensure pre-requisite items are prioritized to prevent total workflow stagnation."
                    : "Parallel execution possible. Focus on concurrent high-priority items to maximize team velocity."
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 bg-stone-100 border border-stone-200 border-l-4 border-l-stone-900">
            <p className="text-[10px] font-bold uppercase mb-4 text-stone-900 tracking-widest">Workflow Tip</p>
            <p className="text-xs text-stone-600 leading-relaxed italic font-serif">
              Linking 'Market Research' as a dependency for 'Feature Build' ensures you aren't building in a vacuum. Always validate before you execute.
            </p>
          </div>
        </>
      }
    />
  );
};

export default Tasks;