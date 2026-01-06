import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, Tooltip, AreaChart, Area, LineChart, Line, YAxis, Legend, CartesianGrid, ComposedChart } from 'recharts';
import StationLayout from '../components/StationLayout';
import { financeData, costBreakdown, pvRealtimeData, batteryCycleData, chargerUtilizationData, financialAnalysisData } from '../mockData';

const StationAnalysis: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'device' | 'financial'>('device');
    const [chartView, setChartView] = useState<'monthly' | 'yearly'>('monthly');
    const finData = financialAnalysisData;
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
                    <div className="flex flex-col gap-4 animate-fade-in">
                        {/* Header Card - 核心收益 */}
                        <div className="flex flex-col p-5 bg-gradient-to-br from-primary to-blue-600 rounded-2xl shadow-lg text-white relative overflow-hidden">
                            <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                            <div className="flex items-center justify-between mb-1 relative z-10">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-white/80">payments</span>
                                    <span className="text-sm font-medium text-white/90 uppercase tracking-wider">本年累计总收益</span>
                                </div>
                                <span className="text-sm font-medium text-emerald-100 bg-emerald-500/20 px-2 py-0.5 rounded-full flex items-center">
                                    <span className="material-symbols-outlined text-sm mr-0.5">trending_up</span>
                                    较上月 +{finData.header.monthOverMonth}%
                                </span>
                            </div>
                            <div className="flex items-baseline gap-2 mt-2 relative z-10">
                                <span className="text-3xl font-bold">¥{finData.header.totalRevenue.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-3 text-blue-100 opacity-90">
                                <span className="material-symbols-outlined text-sm">eco</span>
                                <span className="text-xs">累计减排CO₂: {finData.header.co2Reduction} 吨</span>
                            </div>
                        </div>

                        {/* Key Metrics Grid - 2x2 Bento */}
                        <div className="grid grid-cols-2 gap-3">
                            {/* ROI */}
                            <div className="flex flex-col p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="material-symbols-outlined text-blue-500 text-xl">query_stats</span>
                                    <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">年度</span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">投资回报率</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{finData.keyMetrics.roi}%</p>
                                <p className="text-[10px] text-slate-400 mt-1">静态回收期: {finData.keyMetrics.staticPayback}年</p>
                            </div>
                            {/* 光伏自用率 */}
                            <div className="flex flex-col p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="material-symbols-outlined text-amber-500 text-xl">wb_sunny</span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">光伏自用率</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{finData.keyMetrics.pvSelfUseRate}%</p>
                                <div className="mt-2 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${finData.keyMetrics.pvSelfUseRate}%` }}></div>
                                </div>
                            </div>
                            {/* 充电利用率 */}
                            <div className="flex flex-col p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="material-symbols-outlined text-emerald-500 text-xl">ev_station</span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">平均充电利用率</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{finData.keyMetrics.avgChargerUtilization}%</p>
                                <div className="mt-2 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${finData.keyMetrics.avgChargerUtilization}%` }}></div>
                                </div>
                            </div>
                            {/* 储能循环 */}
                            <div className="flex flex-col p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="material-symbols-outlined text-cyan-500 text-xl">battery_horiz_075</span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">储能循环次数</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{finData.keyMetrics.batteryCycles}<span className="text-sm font-normal text-slate-400 ml-1">次</span></p>
                                <p className="text-[10px] text-slate-400 mt-1">本年度累计</p>
                            </div>
                        </div>

                        {/* 节省成本明细 */}
                        <div className="flex flex-col p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="material-symbols-outlined text-cyan-500">savings</span>
                                <h3 className="text-slate-900 dark:text-white font-bold text-lg">节省成本明细</h3>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                                        <span className="text-sm text-slate-600 dark:text-slate-300">峰谷套利收益</span>
                                    </div>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">¥{finData.costSavings.peakValleyArbitrage.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                        <span className="text-sm text-slate-600 dark:text-slate-300">光伏自用节省</span>
                                    </div>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">¥{finData.costSavings.pvSelfUseSavings.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                        <span className="text-sm text-slate-600 dark:text-slate-300">需量电费节省</span>
                                    </div>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">¥{finData.costSavings.demandChargeSavings.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between pt-2">
                                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">合计节省</span>
                                    <span className="text-lg font-bold text-primary">¥{finData.costSavings.total.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* 收支与利润趋势图 */}
                        <div className="flex flex-col p-5 bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-slate-900 dark:text-white font-bold text-lg">收支与利润趋势</h3>
                                <div className="flex bg-slate-100 dark:bg-slate-700 rounded-lg p-0.5">
                                    <button
                                        onClick={() => setChartView('monthly')}
                                        className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${chartView === 'monthly' ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
                                    >
                                        月度
                                    </button>
                                    <button
                                        onClick={() => setChartView('yearly')}
                                        className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${chartView === 'yearly' ? 'bg-white dark:bg-slate-600 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
                                    >
                                        年度
                                    </button>
                                </div>
                            </div>
                            {/* Legend */}
                            <div className="flex gap-4 mb-4">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-3 h-3 rounded bg-primary"></span>
                                    <span className="text-xs text-slate-500">收入</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-3 h-3 rounded bg-slate-300 dark:bg-slate-600"></span>
                                    <span className="text-xs text-slate-500">支出</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-3 h-0.5 bg-emerald-500"></span>
                                    <span className="text-xs text-slate-500">累计净收益</span>
                                </div>
                            </div>
                            <div className="h-56 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <ComposedChart data={chartView === 'monthly' ? finData.monthlyData : finData.yearlyData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                                        <XAxis
                                            dataKey={chartView === 'monthly' ? 'month' : 'year'}
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 10, fill: '#94a3b8' }}
                                            dy={10}
                                        />
                                        <YAxis
                                            yAxisId="left"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 10, fill: '#94a3b8' }}
                                            tickFormatter={(v) => `${v / 1000}k`}
                                        />
                                        <YAxis
                                            yAxisId="right"
                                            orientation="right"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 10, fill: '#10b981' }}
                                            tickFormatter={(v) => `${v / 1000}k`}
                                        />
                                        <Tooltip
                                            formatter={(value: number, name: string) => [`¥${value.toLocaleString()}`, name === 'income' ? '收入' : name === 'expense' ? '支出' : '累计净收益']}
                                            contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                        />
                                        <Bar yAxisId="left" dataKey="income" fill="#0f7ae6" radius={[4, 4, 0, 0]} barSize={chartView === 'monthly' ? 12 : 40} name="income" />
                                        <Bar yAxisId="left" dataKey="expense" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={chartView === 'monthly' ? 12 : 40} name="expense" />
                                        <Line yAxisId="right" type="monotone" dataKey="cumulativeProfit" stroke="#10b981" strokeWidth={2} dot={{ r: 3, fill: '#10b981' }} name="cumulativeProfit" />
                                    </ComposedChart>
                                </ResponsiveContainer>
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
