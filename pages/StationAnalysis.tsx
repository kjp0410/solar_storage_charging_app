import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, Tooltip, AreaChart, Area, LineChart, Line, YAxis, Legend, CartesianGrid } from 'recharts';
import StationLayout from '../components/StationLayout';
import { financeData, costBreakdown, pvRealtimeData, batteryCycleData, chargerUtilizationData } from '../mockData';

const StationAnalysis: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'device' | 'financial'>('device');

    return (
        <StationLayout title="站点分析">
            <div className="flex flex-col w-full max-w-md mx-auto p-4 gap-6">
                {/* Toggle */}
                <div className="flex w-full gap-3">
                    <button
                        onClick={() => setActiveTab('device')}
                        className={`flex-1 py-2.5 px-4 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-2 ${activeTab === 'device' ? 'bg-slate-900 dark:bg-primary text-white shadow-md' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm'}`}
                    >
                        <span className="material-symbols-outlined text-[18px]">tune</span>
                        设备运行
                    </button>
                    <button
                        onClick={() => setActiveTab('financial')}
                        className={`flex-1 py-2.5 px-4 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-2 ${activeTab === 'financial' ? 'bg-slate-900 dark:bg-primary text-white shadow-md' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-sm'}`}
                    >
                        <span className="material-symbols-outlined text-[18px]">attach_money</span>
                        财务分析
                    </button>
                </div>

                {activeTab === 'financial' ? (
                    <div className="flex flex-col gap-3 animate-fade-in">
                        {/* Financial Overview Card */}
                        <div className="col-span-2 flex flex-col p-5 bg-gradient-to-br from-primary to-blue-600 rounded-2xl shadow-lg text-white relative overflow-hidden">
                            <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                            <div className="flex items-center gap-2 mb-1 relative z-10">
                                <span className="material-symbols-outlined text-white/80">payments</span>
                                <span className="text-sm font-medium text-white/90 uppercase tracking-wider">总收益 (本年累计)</span>
                            </div>
                            <div className="flex items-baseline gap-2 mt-2 relative z-10">
                                <span className="text-3xl font-bold">¥124,592.45</span>
                                <span className="text-sm font-medium text-emerald-100 bg-emerald-500/20 px-2 py-0.5 rounded-full flex items-center">
                                    <span className="material-symbols-outlined text-sm mr-0.5">trending_up</span> +12.5%
                                </span>
                            </div>
                            <p className="text-xs text-blue-100 mt-3 opacity-80">充电服务及光伏上网累计收益。</p>
                        </div>

                        {/* Sub Stats */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="material-symbols-outlined text-blue-500 text-xl">query_stats</span>
                                    <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">年度</span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">投资回报率</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">18.4%</p>
                                <p className="text-[10px] text-emerald-500 mt-1 font-medium">+2.1% 对比目标</p>
                            </div>
                            <div className="flex flex-col p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="material-symbols-outlined text-cyan-500 text-xl">savings</span>
                                    <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">累计</span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">节省成本</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white mt-1">¥45.2k</p>
                                <p className="text-[10px] text-slate-400 mt-1">避免电网购电成本</p>
                            </div>
                        </div>

                        {/* Bar Chart */}
                        <div className="flex flex-col p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm mt-3">
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-slate-900 dark:text-white font-bold text-lg">收支对比</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">月度财务概览</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2.5 h-2.5 rounded bg-primary"></span>
                                        <span className="text-xs text-slate-500">收益</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2.5 h-2.5 rounded bg-slate-300 dark:bg-slate-600"></span>
                                        <span className="text-xs text-slate-500">支出</span>
                                    </div>
                                </div>
                            </div>
                            <div className="h-56 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={financeData} barGap={4}>
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} />
                                        <Tooltip cursor={{ fill: 'transparent' }} />
                                        <Bar dataKey="income" fill="#0f7ae6" radius={[2, 2, 2, 2]} barSize={12} />
                                        <Bar dataKey="expense" fill="#cbd5e1" radius={[2, 2, 2, 2]} barSize={12} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-100 dark:border-slate-700">
                                <div>
                                    <p className="text-xs text-slate-400 mb-0.5">净利润 (6月)</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white">¥8,450</p>
                                </div>
                                <div className="h-8 w-px bg-slate-200 dark:bg-slate-700"></div>
                                <div>
                                    <p className="text-xs text-slate-400 mb-0.5">利润率</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white">42.8%</p>
                                </div>
                                <div className="h-8 w-px bg-slate-200 dark:bg-slate-700"></div>
                                <div>
                                    <p className="text-xs text-slate-400 mb-0.5">运营成本</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white">¥3,210</p>
                                </div>
                            </div>
                        </div>

                        {/* Pie Chart */}
                        <div className="flex flex-col p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm mt-3">
                            <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-4">成本构成</h3>
                            <div className="flex flex-row items-center gap-6">
                                <div className="relative w-32 h-32 flex-shrink-0">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={costBreakdown}
                                                innerRadius={40}
                                                outerRadius={55}
                                                paddingAngle={5}
                                                dataKey="value"
                                            >
                                                {costBreakdown.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                                        <span className="text-xs text-slate-400">总计</span>
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">¥12k</span>
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col gap-3">
                                    {costBreakdown.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.fill }}></span>
                                                <span className="text-sm text-slate-600 dark:text-slate-300">{item.name}</span>
                                            </div>
                                            <span className="text-sm font-bold text-slate-900 dark:text-white">{item.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 animate-fade-in">
                        {/* 1. Device Efficiency Cards */}
                        <div className="grid grid-cols-3 gap-3">
                            <div className="flex flex-col p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm items-start">
                                <span className="material-symbols-outlined text-primary text-xl mb-2">wb_sunny</span>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">光伏效率</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">94.5<span className="text-xs font-normal text-slate-400 ml-0.5">%</span></p>
                            </div>
                            <div className="flex flex-col p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm items-start">
                                <span className="material-symbols-outlined text-emerald-500 text-xl mb-2">battery_charging_full</span>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">电池效率</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">91.2<span className="text-xs font-normal text-slate-400 ml-0.5">%</span></p>
                            </div>
                            <div className="flex flex-col p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm items-start">
                                <span className="material-symbols-outlined text-orange-500 text-xl mb-2">ev_station</span>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">充电桩利用率</p>
                                <p className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">68.0<span className="text-xs font-normal text-slate-400 ml-0.5">%</span></p>
                            </div>
                        </div>

                        {/* 2. PV Generation Card */}
                        <div className="flex flex-col p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-card">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-slate-900 dark:text-white font-bold text-lg">光伏发电量</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">实时效率追踪</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold text-slate-900 dark:text-white">45.2 <span className="text-sm font-medium text-slate-500">kWh</span></p>
                                    <p className="text-xs font-medium text-emerald-500 flex items-center justify-end gap-0.5">
                                        <span className="material-symbols-outlined text-sm">trending_up</span>
                                        +5.4%
                                    </p>
                                </div>
                            </div>
                            <div className="h-40 w-full mb-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={pvRealtimeData}>
                                        <defs>
                                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#0f7ae6" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="#0f7ae6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.4} />
                                        <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} interval="preserveStartEnd" />
                                        <Tooltip cursor={{ stroke: '#cbd5e1', strokeWidth: 1 }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                        <Area type="monotone" dataKey="value" stroke="#0f7ae6" strokeWidth={3} fill="url(#colorPv)" activeDot={{ r: 4, fill: '#fff', stroke: '#0f7ae6', strokeWidth: 2 }} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="grid grid-cols-3 gap-2 border-t border-slate-100 dark:border-slate-700 pt-4">
                                <div>
                                    <p className="text-xs text-slate-400 mb-0.5">峰值</p>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">6.5 kW</p>
                                </div>
                                <div className="border-l border-slate-100 dark:border-slate-700 pl-4">
                                    <p className="text-xs text-slate-400 mb-0.5">平均</p>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">3.8 kW</p>
                                </div>
                                <div className="border-l border-slate-100 dark:border-slate-700 pl-4">
                                    <p className="text-xs text-slate-400 mb-0.5">当前</p>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">4.2 kW</p>
                                </div>
                            </div>
                        </div>

                        {/* 3. Battery Cycle Card */}
                        <div className="flex flex-col p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-card">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-slate-900 dark:text-white font-bold text-lg">电池循环</h3>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                                        <span className="text-xs text-slate-500">充电</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                                        <span className="text-xs text-slate-500">放电</span>
                                    </div>
                                </div>
                            </div>
                            <div className="h-40 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={batteryCycleData}>
                                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.4} />
                                        <Tooltip cursor={{ stroke: '#cbd5e1', strokeWidth: 1 }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                        <Line type="monotone" dataKey="charge" stroke="#0f7ae6" strokeWidth={3} dot={false} activeDot={{ r: 4 }} />
                                        <Line type="monotone" dataKey="discharge" stroke="#cbd5e1" strokeWidth={3} dot={false} activeDot={{ r: 4 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* 4. Charger Utilization Card */}
                        <div className="flex flex-col p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-card">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-slate-900 dark:text-white font-bold text-lg">充电桩利用率</h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">周度趋势分析</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold text-slate-900 dark:text-white">73.0 <span className="text-sm font-medium text-slate-500">%</span></p>
                                    <p className="text-xs font-medium text-primary flex items-center justify-end gap-0.5">
                                        <span className="material-symbols-outlined text-sm">trending_up</span>
                                        +2.4%
                                    </p>
                                </div>
                            </div>
                            <div className="h-40 w-full mb-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={chargerUtilizationData}>
                                        <defs>
                                            <linearGradient id="colorCharger" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.4} />
                                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} interval="preserveStartEnd" />
                                        <Tooltip cursor={{ stroke: '#cbd5e1', strokeWidth: 1 }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                        <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fill="url(#colorCharger)" activeDot={{ r: 4, fill: '#fff', stroke: '#3b82f6', strokeWidth: 2 }} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="grid grid-cols-3 gap-2 border-t border-slate-100 dark:border-slate-700 pt-4">
                                <div>
                                    <p className="text-xs text-slate-400 mb-0.5">峰值</p>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">85%</p>
                                </div>
                                <div className="border-l border-slate-100 dark:border-slate-700 pl-4">
                                    <p className="text-xs text-slate-400 mb-0.5">平均</p>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">64%</p>
                                </div>
                                <div className="border-l border-slate-100 dark:border-slate-700 pl-4">
                                    <p className="text-xs text-slate-400 mb-0.5">当前</p>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">73%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </StationLayout>
    );
};

export default StationAnalysis;
