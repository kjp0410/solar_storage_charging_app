import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="absolute bottom-0 w-full bg-glass-light/80 dark:bg-glass-dark/80 backdrop-blur-2xl border-t border-glass-border-light dark:border-glass-border-dark z-50 pb-6">
      <div className="flex justify-around items-center h-14">
        <button
          onClick={() => navigate('/')}
          className={`relative flex flex-col items-center justify-center w-full h-full gap-0.5 group ${isActive('/') ? 'text-primary' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'} transition-colors`}
        >
          {isActive('/') && (
            <span className="absolute top-0 w-10 h-0.5 bg-primary rounded-b-full"></span>
          )}
          <span className={`material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform ${isActive('/') ? 'filled' : ''}`}>
            home
          </span>
          <span className={`text-[10px] font-medium ${isActive('/') ? 'font-bold' : ''}`}>首页</span>
        </button>
        <button
          onClick={() => navigate('/me')}
          className={`relative flex flex-col items-center justify-center w-full h-full gap-0.5 group ${isActive('/me') ? 'text-primary' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'} transition-colors`}
        >
          {isActive('/me') && (
            <span className="absolute top-0 w-10 h-0.5 bg-primary rounded-b-full"></span>
          )}
          <span className={`material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform ${isActive('/me') ? 'filled' : ''}`}>
            person
          </span>
          <span className={`text-[10px] font-medium ${isActive('/me') ? 'font-bold' : ''}`}>我的</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
