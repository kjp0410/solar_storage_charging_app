import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

interface StationHeaderProps {
  title: string;
}

const StationHeader: React.FC<StationHeaderProps> = ({ title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const tabs = [
    { label: '概览', path: `/station/${id}/overview`, icon: 'grid_view' },
    { label: '告警', path: `/station/${id}/alarms`, icon: 'notifications' },
    { label: '分析', path: `/station/${id}/analysis`, icon: 'analytics' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-surface-light dark:bg-surface-dark/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="flex items-center justify-between px-4 h-16">
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex flex-col items-center">
            <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-none">
              {title}
            </h1>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
              站点 A - 光伏电站 04
            </span>
          </div>
          <button className="flex items-center justify-center size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300">
            <span className="material-symbols-outlined">settings</span>
          </button>
        </div>
      </header>

      {/* Bottom Tab Bar (replaces the main app bottom bar for this view) */}
      <nav className="shrink-0 bg-surface-light dark:bg-surface-dark border-t border-slate-200 dark:border-slate-700 z-40 transition-colors duration-200">
        <div className="flex justify-around items-center h-16 pb-2">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={`relative flex flex-col items-center justify-center w-full h-full gap-1 ${isActive ? 'text-primary' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                  }`}
              >
                {isActive && (
                  <span className="absolute top-0 w-12 h-0.5 bg-primary rounded-b-full"></span>
                )}
                <span className={`material-symbols-outlined ${isActive ? 'filled' : ''}`}>
                  {tab.icon}
                </span>
                <span className={`text-[10px] font-medium tracking-wide ${isActive ? 'font-bold' : ''}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default StationHeader;
