import React, { useState } from 'react';
import { alarms } from '../mockData';

interface NotificationBellProps {
    onOpenNotifications?: () => void;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ onOpenNotifications }) => {
    const [showPanel, setShowPanel] = useState(false);

    const unreadCount = alarms.filter(a => a.status !== 'resolved').length;

    const handleClick = () => {
        setShowPanel(!showPanel);
        onOpenNotifications?.();
    };

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'critical': return 'bg-red-500';
            case 'warning': return 'bg-amber-500';
            default: return 'bg-blue-500';
        }
    };

    const getLevelBg = (level: string) => {
        switch (level) {
            case 'critical': return 'bg-red-50/80 dark:bg-red-900/20 border-red-100/50 dark:border-red-800/50';
            case 'warning': return 'bg-amber-50/80 dark:bg-amber-900/20 border-amber-100/50 dark:border-amber-800/50';
            default: return 'bg-blue-50/80 dark:bg-blue-900/20 border-blue-100/50 dark:border-blue-800/50';
        }
    };

    return (
        <div className="relative">
            {/* Bell Button - Glass Style */}
            {/* Bell Button - Glass Style */}
            <button
                onClick={handleClick}
                className="relative bg-glass-light dark:bg-glass-dark hover:bg-white dark:hover:bg-slate-700 backdrop-blur-xl border border-glass-border-light dark:border-glass-border-dark p-2 rounded-full shadow-sm transition-all group active:scale-95"
            >
                <span className="material-symbols-outlined text-slate-500 dark:text-slate-300 group-hover:text-primary transition-colors text-[20px]">
                    notifications
                </span>

                {/* Badge */}
                {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white dark:border-slate-800"></span>
                )}
            </button>

            {/* Notification Panel - Glass Style */}
            {showPanel && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowPanel(false)}
                    />

                    <div className="absolute right-0 top-14 w-80 max-h-96 bg-glass-light dark:bg-glass-dark backdrop-blur-2xl rounded-3xl shadow-2xl border border-glass-border-light dark:border-glass-border-dark overflow-hidden z-50 animate-fade-in">
                        {/* Header */}
                        <div className="px-5 py-4 border-b border-white/20 dark:border-white/10 flex justify-between items-center">
                            <span className="text-base font-bold text-slate-900 dark:text-white">告警通知</span>
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full">
                                {unreadCount} 条待处理
                            </span>
                        </div>

                        {/* List */}
                        <div className="max-h-72 overflow-y-auto">
                            {alarms.filter(a => a.status !== 'resolved').slice(0, 5).map((alarm) => (
                                <div
                                    key={alarm.id}
                                    className={`px-5 py-4 border-b border-white/10 dark:border-white/5 cursor-pointer hover:bg-white/30 dark:hover:bg-white/5 transition-colors ${getLevelBg(alarm.level)}`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${getLevelColor(alarm.level)} shadow-lg`} />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                                                {alarm.device}
                                            </p>
                                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                                                {alarm.message}
                                            </p>
                                            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5 font-medium">
                                                {alarm.time}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="px-5 py-3 border-t border-white/20 dark:border-white/10 bg-white/30 dark:bg-black/20">
                            <button className="w-full text-center text-sm font-semibold text-primary hover:text-primary-dark transition-colors">
                                查看全部告警 →
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default NotificationBell;
