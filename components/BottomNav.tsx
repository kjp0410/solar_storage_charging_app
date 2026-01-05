import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Simple active check
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#101922] border-t border-slate-200 dark:border-slate-800 pb-safe pt-2 z-50">
      <div className="flex justify-around items-center h-16 pb-2">
        <button 
          onClick={() => navigate('/')}
          className="flex flex-col items-center justify-center w-full h-full gap-1 group"
        >
          <div className={`relative p-1 rounded-full transition-colors ${isActive('/') ? '' : 'group-hover:bg-slate-50 dark:group-hover:bg-slate-800'}`}>
            <span className={`material-symbols-outlined text-[28px] ${isActive('/') ? 'text-primary filled' : 'text-slate-400 dark:text-slate-500'}`}>
              home
            </span>
          </div>
          <span className={`text-xs font-medium ${isActive('/') ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}>
            首页
          </span>
        </button>
        <button 
          onClick={() => navigate('/me')}
          className="flex flex-col items-center justify-center w-full h-full gap-1 group"
        >
          <div className={`relative p-1 rounded-full transition-colors ${isActive('/me') ? '' : 'group-hover:bg-slate-50 dark:group-hover:bg-slate-800'}`}>
            <span className={`material-symbols-outlined text-[28px] ${isActive('/me') ? 'text-primary filled' : 'text-slate-400 dark:text-slate-500'}`}>
              person
            </span>
          </div>
          <span className={`text-xs font-medium ${isActive('/me') ? 'text-primary' : 'text-slate-400 dark:text-slate-500'}`}>
            我的
          </span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
