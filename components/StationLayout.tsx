import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { stations } from '../mockData';

interface StationLayoutProps {
    title: string;
    children: React.ReactNode;
}

const StationLayout: React.FC<StationLayoutProps> = ({ title, children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();

    // 获取当前站点信息
    const station = stations.find(s => s.id === id);
    const stationName = station?.name || `站点 ${id}`;

    const tabs = [
        { label: '概览', path: `/station/${id}/overview`, icon: 'grid_view' },
        { label: '告警', path: `/station/${id}/alarms`, icon: 'notifications' },
        { label: '分析', path: `/station/${id}/analysis`, icon: 'analytics' },
    ];

    return (
        <div className="relative flex flex-col h-full bg-background-light dark:bg-background-dark text-slate-900 dark:text-white overflow-hidden">
            {/* 背景装饰 Blobs */}
            <div className="blob bg-blue-400 dark:bg-blue-900 w-60 h-60 rounded-full -top-10 -right-10"></div>
            <div className="blob bg-purple-400 dark:bg-purple-900 w-40 h-40 rounded-full top-1/2 -left-10 animation-delay-2000"></div>
            <div className="blob bg-teal-300 dark:bg-teal-900 w-32 h-32 rounded-full bottom-20 right-10 animation-delay-4000"></div>

            {/* Header - Glass Style */}
            <header className="shrink-0 bg-glass-light/80 dark:bg-glass-dark/80 backdrop-blur-2xl border-b border-glass-border-light dark:border-glass-border-dark z-40">
                <div className="flex items-center justify-between px-4 h-14">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center justify-center size-10 rounded-full bg-white/50 dark:bg-white/10 hover:bg-white dark:hover:bg-white/20 transition-colors text-slate-600 dark:text-slate-300"
                    >
                        <span className="material-symbols-outlined text-[22px]">arrow_back</span>
                    </button>
                    <div className="flex flex-col items-center">
                        <h1 className="text-base font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                            {title}
                        </h1>
                        <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mt-0.5 max-w-[200px] truncate">
                            {stationName}
                        </span>
                    </div>
                    <div className="size-10"></div>
                </div>
            </header>

            {/* Scrollable Content */}
            <main className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar relative z-10">
                {children}
            </main>

            {/* Bottom Tab Bar - Glass Style */}
            <nav className="shrink-0 bg-glass-light/80 dark:bg-glass-dark/80 backdrop-blur-2xl border-t border-glass-border-light dark:border-glass-border-dark z-40 pb-6">
                <div className="flex justify-around items-center h-14">
                    {tabs.map((tab) => {
                        const isActive = location.pathname === tab.path;
                        return (
                            <button
                                key={tab.path}
                                onClick={() => navigate(tab.path)}
                                className={`relative flex flex-col items-center justify-center w-full h-full gap-0.5 transition-colors ${isActive ? 'text-primary' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                                    }`}
                            >
                                {isActive && (
                                    <span className="absolute top-0 w-10 h-0.5 bg-primary rounded-b-full"></span>
                                )}
                                <span className={`material-symbols-outlined text-[24px] ${isActive ? 'filled' : ''}`}>
                                    {tab.icon}
                                </span>
                                <span className={`text-[10px] font-medium ${isActive ? 'font-bold' : ''}`}>
                                    {tab.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
};

export default StationLayout;
