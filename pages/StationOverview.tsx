import React from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import StationLayout from '../components/StationLayout';
import { powerLoadData } from '../mockData';

const StationOverview: React.FC = () => {
  return (
    <StationLayout title="站点概览">
      <div className="flex flex-col gap-6 p-4">
        {/* Title Section */}
        <section className="flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">A站 - 西翼</h1>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                14:05 | 晴
              </p>
            </div>
            <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-green-100 dark:bg-green-900/30 pl-3 pr-3 border border-green-200 dark:border-green-800">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <p className="text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-wide">正常</p>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-3 rounded-xl p-4 bg-white dark:bg-surface-dark shadow-card dark:shadow-none border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-4xl text-primary">bolt</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span className="material-symbols-outlined text-[20px]">bolt</span>
              <p className="text-sm font-medium">当前功率</p>
            </div>
            <p className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">45.2 <span className="text-base font-medium text-slate-400">kW</span></p>
          </div>

          <div className="flex flex-col gap-3 rounded-xl p-4 bg-white dark:bg-surface-dark shadow-card dark:shadow-none border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-4xl text-primary">solar_power</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span className="material-symbols-outlined text-[20px]">solar_power</span>
              <p className="text-sm font-medium">今日发电</p>
            </div>
            <p className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">120.5 <span className="text-base font-medium text-slate-400">kWh</span></p>
          </div>

          <div className="flex flex-col gap-3 rounded-xl p-4 bg-white dark:bg-surface-dark shadow-card dark:shadow-none border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-4xl text-primary">battery_charging_full</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span className="material-symbols-outlined text-[20px]">battery_charging_full</span>
              <p className="text-sm font-medium">电池 SOC</p>
            </div>
            <div className="flex items-end justify-between">
              <p className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">82<span className="text-base font-medium text-slate-400">%</span></p>
              <div className="h-2 w-12 bg-slate-100 dark:bg-slate-700 rounded-full mb-2 overflow-hidden">
                <div className="h-full bg-primary w-[82%] rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-xl p-4 bg-white dark:bg-surface-dark shadow-card dark:shadow-none border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-4xl text-primary">ev_station</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span className="material-symbols-outlined text-[20px]">ev_station</span>
              <p className="text-sm font-medium">充电量</p>
            </div>
            <p className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">310 <span className="text-base font-medium text-slate-400">kWh</span></p>
          </div>
        </section>

        {/* Device Status */}
        <section>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 px-1">设备状态</h3>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin" style={{ scrollbarWidth: 'thin', scrollbarColor: '#cbd5e1 transparent' }}>
            <div className="w-[160px] shrink-0 flex flex-col p-4 bg-white dark:bg-surface-dark rounded-xl border border-slate-100 dark:border-slate-800 shadow-card">
              <div className="flex items-center justify-between mb-2">
                <span className="material-symbols-outlined text-slate-400">solar_power</span>
                <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase">光伏</p>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-lg font-bold text-slate-900 dark:text-white">12</span>
                <span className="text-xs text-slate-400">/ 12</span>
              </div>
            </div>
            <div className="w-[160px] shrink-0 flex flex-col p-4 bg-white dark:bg-surface-dark rounded-xl border border-slate-100 dark:border-slate-800 shadow-card">
              <div className="flex items-center justify-between mb-2">
                <span className="material-symbols-outlined text-slate-400">battery_horiz_075</span>
                <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase">储能</p>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-lg font-bold text-slate-900 dark:text-white">2</span>
                <span className="text-xs text-slate-400">/ 2</span>
              </div>
            </div>
            <div className="w-[160px] shrink-0 flex flex-col p-4 bg-white dark:bg-surface-dark rounded-xl border border-slate-100 dark:border-slate-800 shadow-card">
              <div className="flex items-center justify-between mb-2">
                <span className="material-symbols-outlined text-slate-400">ev_station</span>
                <span className="flex h-2 w-2 rounded-full bg-amber-500"></span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase">充电桩</p>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-lg font-bold text-slate-900 dark:text-white">8</span>
                <span className="text-xs text-slate-400">/ 9</span>
              </div>
            </div>
          </div>
        </section>

        {/* Chart Section */}
        <section className="bg-white dark:bg-surface-dark rounded-xl p-5 border border-slate-100 dark:border-slate-800 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">功率与负荷曲线</h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-xs text-slate-500">发电</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                <span className="text-xs text-slate-500">负荷</span>
              </div>
            </div>
          </div>
          <div className="w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={powerLoadData}>
                <defs>
                  <linearGradient id="colorGeneration" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0f7ae6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0f7ae6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                  dy={10}
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="generation"
                  stroke="#0f7ae6"
                  fillOpacity={1}
                  fill="url(#colorGeneration)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="load"
                  stroke="#cbd5e1"
                  fill="transparent"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </StationLayout>
  );
};

export default StationOverview;
