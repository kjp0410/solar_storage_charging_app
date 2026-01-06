import React from 'react';

export type FilterStatus = 'all' | 'online' | 'alarm' | 'offline';

interface StatusFilterChipsProps {
    activeFilter: FilterStatus;
    onFilterChange: (filter: FilterStatus) => void;
}

interface FilterOption {
    key: FilterStatus;
    label: string;
    icon: string;
    color: string;
    activeBg: string;
    activeText: string;
}

const filterOptions: FilterOption[] = [
    {
        key: 'all',
        label: '全部站点',
        icon: 'dashboard',
        color: 'text-slate-500',
        activeBg: 'bg-primary',
        activeText: 'text-white',
    },
    {
        key: 'online',
        label: '在线',
        icon: 'check_circle',
        color: 'text-emerald-600 dark:text-emerald-400',
        activeBg: 'bg-emerald-500',
        activeText: 'text-white',
    },
    {
        key: 'alarm',
        label: '告警',
        icon: 'warning',
        color: 'text-red-600 dark:text-red-400',
        activeBg: 'bg-red-500',
        activeText: 'text-white',
    },
    {
        key: 'offline',
        label: '离线',
        icon: 'cloud_off',
        color: 'text-slate-400',
        activeBg: 'bg-slate-500',
        activeText: 'text-white',
    },
];

const StatusFilterChips: React.FC<StatusFilterChipsProps> = ({
    activeFilter,
    onFilterChange,
}) => {
    return (
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1 -mx-1 px-1">
            {filterOptions.map((option) => {
                const isActive = activeFilter === option.key;

                return (
                    <button
                        key={option.key}
                        onClick={() => onFilterChange(option.key)}
                        className={`
              flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium
              whitespace-nowrap shrink-0 transition-all duration-200
              ${isActive
                                ? `${option.activeBg} ${option.activeText} shadow-md`
                                : `bg-white dark:bg-slate-800 ${option.color} border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600`
                            }
            `}
                    >
                        <span className={`material-symbols-outlined text-[16px] ${isActive ? '' : option.color}`}>
                            {option.icon}
                        </span>
                        <span>{option.label}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default StatusFilterChips;
