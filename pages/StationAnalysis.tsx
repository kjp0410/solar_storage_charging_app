import React, { useState, useRef, useCallback } from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip, AreaChart, Area, LineChart, Line, YAxis, CartesianGrid, ComposedChart } from 'recharts';
import StationLayout from '../components/StationLayout';
import { pvRealtimeData, batteryCycleData, chargerUtilizationData, financialAnalysisData, deviceAnalysisData } from '../mockData';



const StationAnalysis: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'device' | 'financial'>('device');
    const [chartView, setChartView] = useState<'monthly' | 'yearly'>('monthly');
    const [deviceTab, setDeviceTab] = useState<'battery' | 'inverter' | 'charger'>('battery');
    const [longPressProgress, setLongPressProgress] = useState<{ [key: string]: number }>({});
    const [gunFilter, setGunFilter] = useState<'all' | 'Charging' | 'Idle' | 'Fault' | 'Offline'>('all');
    const [selectedGun, setSelectedGun] = useState<typeof deviceAnalysisData.charger.guns[0] | null>(null);
    const [hoveredCell, setHoveredCell] = useState<typeof deviceAnalysisData.battery.thermalMatrix[0] | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const finData = financialAnalysisData;
    const deviceData = deviceAnalysisData;

    // Long press handlers
    const handleLongPressStart = useCallback((action: string) => {
        setLongPressProgress(prev => ({ ...prev, [action]: 0 }));
        let progress = 0;
        intervalRef.current = setInterval(() => {
            progress += 3.33;
            setLongPressProgress(prev => ({ ...prev, [action]: Math.min(progress, 100) }));
        }, 100);
        timerRef.current = setTimeout(() => {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setLongPressProgress(prev => ({ ...prev, [action]: 100 }));
            alert(`${action === 'reset' ? '系统复位' : '紧急停机'} 已触发!`);
            setTimeout(() => setLongPressProgress(prev => ({ ...prev, [action]: 0 })), 500);
        }, 3000);
    }, []);

    const handleLongPressEnd = useCallback((action: string) => {
        if (timerRef.current) clearTimeout(timerRef.current);
        if (intervalRef.current) clearInterval(intervalRef.current);
        setLongPressProgress(prev => ({ ...prev, [action]: 0 }));
    }, []);

    // Thermal cell color helper
    const getThermalColor = (temp: number) => {
        if (temp >= 45) return { bg: 'rgba(239, 68, 68, 0.2)', border: '#ef4444', text: 'text-red-500' };
        if (temp >= 35) return { bg: 'rgba(249, 115, 22, 0.2)', border: '#f97316', text: 'text-orange-500' };
        return { bg: 'rgba(34, 197, 94, 0.2)', border: '#22c55e', text: 'text-emerald-500' };
    };

    return (
        <StationLayout title="站点分析">
            <div className="flex flex-col w-full max-w-md mx-auto p-4 gap-5">
                {/* Toggle - Glass Pill Style */}
                <div className="flex w-full gap-2 p-1 bg-glass-light dark:bg-glass-dark backdrop-blur-xl rounded-full border border-glass-border-light dark:border-glass-border-dark">
                    <button
                        onClick={() => setActiveTab('device')}
                        className={`flex-1 py-2.5 px-4 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-2 ${activeTab === 'device' ? 'bg-white dark:bg-white/20 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
                    >
                        <span className="material-symbols-outlined text-[18px]">tune</span>
                        设备运行
                    </button>
                    <button
                        onClick={() => setActiveTab('financial')}
                        className={`flex-1 py-2.5 px-4 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-2 ${activeTab === 'financial' ? 'bg-white dark:bg-white/20 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
                    >
                        <span className="material-symbols-outlined text-[18px]">attach_money</span>
                        财务分析
                    </button>
                </div>

                {activeTab === 'financial' ? (
                    <div className="flex flex-col gap-4 animate-fade-in">
                        {/* Header Card - 核心收益 */}
                        <div className="flex flex-col p-5 bg-gradient-to-br from-primary to-blue-600 rounded-3xl shadow-lg text-white relative overflow-hidden">
                            <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                            <div className="flex items-center justify-between mb-1 relative z-10">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-white/80">payments</span>
                                    <span className="text-sm font-medium text-white/90 uppercase tracking-wider">本年累计总收益</span>
                                </div>
                                <span className="text-sm font-medium text-emerald-100 bg-emerald-500/30 backdrop-blur-sm px-2.5 py-0.5 rounded-full flex items-center">
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

                        {/* Key Metrics Grid - Glass Cards */}
                        <div className="grid grid-cols-2 gap-3">
                            {/* ROI */}
                            <div className="flex flex-col p-4 bg-glass-light dark:bg-glass-dark backdrop-blur-xl rounded-2xl border border-glass-border-light dark:border-glass-border-dark shadow-glass">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="material-symbols-outlined text-blue-500 text-xl">query_stats</span>
                                    <span className="text-xs font-bold text-slate-400 bg-white/50 dark:bg-white/10 px-1.5 py-0.5 rounded">年度</span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">投资回报率</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{finData.keyMetrics.roi}%</p>
                                <p className="text-[10px] text-slate-400 mt-1">静态回收期: {finData.keyMetrics.staticPayback}年</p>
                            </div>
                            {/* 光伏自用率 */}
                            <div className="flex flex-col p-4 bg-glass-light dark:bg-glass-dark backdrop-blur-xl rounded-2xl border border-glass-border-light dark:border-glass-border-dark shadow-glass">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="material-symbols-outlined text-amber-500 text-xl">wb_sunny</span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">光伏自用率</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{finData.keyMetrics.pvSelfUseRate}%</p>
                                <div className="mt-2 h-1.5 bg-white/50 dark:bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${finData.keyMetrics.pvSelfUseRate}%` }}></div>
                                </div>
                            </div>
                            {/* 充电利用率 */}
                            <div className="flex flex-col p-4 bg-glass-light dark:bg-glass-dark backdrop-blur-xl rounded-2xl border border-glass-border-light dark:border-glass-border-dark shadow-glass">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="material-symbols-outlined text-emerald-500 text-xl">ev_station</span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">平均充电利用率</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{finData.keyMetrics.avgChargerUtilization}%</p>
                                <div className="mt-2 h-1.5 bg-white/50 dark:bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${finData.keyMetrics.avgChargerUtilization}%` }}></div>
                                </div>
                            </div>
                            {/* 储能循环 */}
                            <div className="flex flex-col p-4 bg-glass-light dark:bg-glass-dark backdrop-blur-xl rounded-2xl border border-glass-border-light dark:border-glass-border-dark shadow-glass">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="material-symbols-outlined text-cyan-500 text-xl">battery_horiz_075</span>
                                </div>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">储能循环次数</p>
                                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{finData.keyMetrics.batteryCycles}<span className="text-sm font-normal text-slate-400 ml-1">次</span></p>
                                <p className="text-[10px] text-slate-400 mt-1">本年度累计</p>
                            </div>
                        </div>

                        {/* 节省成本明细 - Glass Card */}
                        <div className="flex flex-col p-5 bg-glass-light dark:bg-glass-dark backdrop-blur-xl rounded-3xl border border-glass-border-light dark:border-glass-border-dark shadow-glass">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="material-symbols-outlined text-cyan-500">savings</span>
                                <h3 className="text-slate-900 dark:text-white font-bold text-lg">节省成本明细</h3>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between py-2 border-b border-white/20 dark:border-white/10">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-primary"></span>
                                        <span className="text-sm text-slate-600 dark:text-slate-300">峰谷套利收益</span>
                                    </div>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">¥{finData.costSavings.peakValleyArbitrage.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-white/20 dark:border-white/10">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                        <span className="text-sm text-slate-600 dark:text-slate-300">光伏自用节省</span>
                                    </div>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">¥{finData.costSavings.pvSelfUseSavings.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-white/20 dark:border-white/10">
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

                        {/* 收支与利润趋势图 - Glass Card */}
                        <div className="flex flex-col p-5 bg-glass-light dark:bg-glass-dark backdrop-blur-xl rounded-3xl border border-glass-border-light dark:border-glass-border-dark shadow-glass">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-slate-900 dark:text-white font-bold text-lg">收支与利润趋势</h3>
                                <div className="flex bg-white/50 dark:bg-white/10 rounded-full p-0.5">
                                    <button
                                        onClick={() => setChartView('monthly')}
                                        className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${chartView === 'monthly' ? 'bg-white dark:bg-white/20 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
                                    >
                                        月度
                                    </button>
                                    <button
                                        onClick={() => setChartView('yearly')}
                                        className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${chartView === 'yearly' ? 'bg-white dark:bg-white/20 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
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
                            <div className="h-52 w-full">
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
                                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)' }}
                                        />
                                        <Bar yAxisId="left" dataKey="income" fill="#007AFF" radius={[4, 4, 0, 0]} barSize={chartView === 'monthly' ? 12 : 40} name="income" />
                                        <Bar yAxisId="left" dataKey="expense" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={chartView === 'monthly' ? 12 : 40} name="expense" />
                                        <Line yAxisId="right" type="monotone" dataKey="cumulativeProfit" stroke="#10b981" strokeWidth={2} dot={{ r: 3, fill: '#10b981' }} name="cumulativeProfit" />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4 animate-fade-in">
                        {/* System Health Ticker */}
                        <div className="flex items-center justify-between px-4 py-3 bg-glass-light dark:bg-glass-dark backdrop-blur-xl rounded-2xl border border-glass-border-light dark:border-glass-border-dark shadow-glass">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-emerald-500 text-lg">signal_cellular_alt</span>
                                <div className="flex flex-col">
                                    <span className="text-xs text-slate-400">通信</span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">{deviceData.header.comms.type} ({deviceData.header.comms.signalStrength}dBm)</span>
                                </div>
                            </div>
                            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700"></div>
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-lg">bolt</span>
                                <div className="flex flex-col">
                                    <span className="text-xs text-slate-400">状态</span>
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">{deviceData.header.systemState === 'Grid-Connected' ? '并网运行' : deviceData.header.systemState}</span>
                                </div>
                            </div>
                            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700"></div>
                            <div className="flex items-center gap-2">
                                <span className={`material-symbols-outlined text-lg ${deviceData.header.activeAlarms > 0 ? 'text-red-500' : 'text-slate-400'}`}>notifications</span>
                                <div className="flex flex-col">
                                    <span className="text-xs text-slate-400">告警</span>
                                    <span className={`text-sm font-bold ${deviceData.header.activeAlarms > 0 ? 'text-red-500' : 'text-emerald-500'}`}>{deviceData.header.activeAlarms}</span>
                                </div>
                            </div>
                        </div>

                        {/* Device Subsystem Tabs */}
                        <div className="flex w-full gap-1 p-1 bg-glass-light dark:bg-glass-dark backdrop-blur-xl rounded-xl border border-glass-border-light dark:border-glass-border-dark">
                            <button
                                onClick={() => setDeviceTab('battery')}
                                className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${deviceTab === 'battery' ? 'bg-white dark:bg-white/20 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
                            >
                                <span className="material-symbols-outlined text-[16px]">battery_horiz_075</span>
                                电池
                            </button>
                            <button
                                onClick={() => setDeviceTab('inverter')}
                                className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${deviceTab === 'inverter' ? 'bg-white dark:bg-white/20 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
                            >
                                <span className="material-symbols-outlined text-[16px]">electric_bolt</span>
                                逆变器
                            </button>
                            <button
                                onClick={() => setDeviceTab('charger')}
                                className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${deviceTab === 'charger' ? 'bg-white dark:bg-white/20 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}
                            >
                                <span className="material-symbols-outlined text-[16px]">ev_station</span>
                                充电桩
                            </button>
                        </div>

                        {/* Tab Content */}
                        {deviceTab === 'battery' && (
                            <div className="flex flex-col gap-4">
                                {/* Cell Consistency Monitor */}
                                <div className="flex flex-col p-5 bg-glass-light dark:bg-glass-dark backdrop-blur-xl rounded-3xl border border-glass-border-light dark:border-glass-border-dark shadow-glass">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="material-symbols-outlined text-cyan-500">analytics</span>
                                        <h3 className="text-slate-900 dark:text-white font-bold text-base">电芯一致性监测</h3>
                                    </div>

                                    {/* Voltage Diff Bar */}
                                    <div className="flex flex-col gap-2">
                                        <div className="relative h-12 bg-gradient-to-r from-cyan-500 via-emerald-400 to-teal-500 rounded-xl overflow-hidden shadow-inner">
                                            {/* Min Label - Left */}
                                            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col">
                                                <span className="text-[10px] text-white/70 font-medium">Min</span>
                                                <span className="text-sm font-bold text-white">{deviceData.battery.cellConsistency.minVoltage}V</span>
                                            </div>

                                            {/* Delta - Center */}
                                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                                <div className={`px-3 py-1 rounded-full backdrop-blur-sm ${deviceData.battery.cellConsistency.delta > deviceData.battery.cellConsistency.threshold ? 'bg-red-500/90' : 'bg-white/20'}`}>
                                                    <span className={`text-sm font-bold ${deviceData.battery.cellConsistency.delta > deviceData.battery.cellConsistency.threshold ? 'text-white' : 'text-white'}`}>
                                                        Δ {deviceData.battery.cellConsistency.delta}V
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Max Label - Right */}
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-end">
                                                <span className="text-[10px] text-white/70 font-medium">Max</span>
                                                <span className="text-sm font-bold text-white">{deviceData.battery.cellConsistency.maxVoltage}V</span>
                                            </div>
                                        </div>

                                        {/* Threshold Hint */}
                                        <div className="flex justify-center">
                                            <span className={`text-[10px] ${deviceData.battery.cellConsistency.delta > deviceData.battery.cellConsistency.threshold ? 'text-red-500 font-medium' : 'text-slate-400'}`}>
                                                {deviceData.battery.cellConsistency.delta > deviceData.battery.cellConsistency.threshold ? '⚠️ 压差超限 (阈值 0.1V)' : '压差正常 (阈值 0.1V)'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Thermal Heatmap - GitHub Contribution Style */}
                                <div className="flex flex-col p-5 bg-glass-light dark:bg-glass-dark backdrop-blur-xl rounded-3xl border border-glass-border-light dark:border-glass-border-dark shadow-glass">
                                    {/* Header with Stats */}
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-orange-500">thermostat</span>
                                            <h3 className="text-slate-900 dark:text-white font-bold text-base">电池温度热力图</h3>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs">
                                            <span className="text-slate-400">热点:</span>
                                            <span className="text-red-500 font-bold">{deviceData.battery.tempStats?.hotspots || 3}</span>
                                        </div>
                                    </div>

                                    {/* Temperature Stats Bar */}
                                    <div className="flex items-center justify-between px-3 py-2 bg-white/50 dark:bg-white/5 rounded-xl mb-3">
                                        <div className="text-center">
                                            <p className="text-[10px] text-slate-400">最低</p>
                                            <p className="text-sm font-bold text-cyan-500">{deviceData.battery.tempStats?.min || 24.5}°C</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-[10px] text-slate-400">平均</p>
                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{deviceData.battery.tempStats?.avg || 29.8}°C</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-[10px] text-slate-400">最高</p>
                                            <p className="text-sm font-bold text-red-500">{deviceData.battery.tempStats?.max || 51.2}°C</p>
                                        </div>
                                    </div>

                                    {/* Hover Display */}
                                    {hoveredCell && (
                                        <div className="flex items-center justify-center gap-3 px-3 py-2 bg-slate-900 dark:bg-white/10 rounded-xl mb-3 animate-fade-in">
                                            <span className="text-white text-sm font-medium">电芯 #{hoveredCell.id}</span>
                                            <span className={`text-lg font-bold ${hoveredCell.temp >= 45 ? 'text-red-400' : hoveredCell.temp >= 35 ? 'text-orange-400' : 'text-emerald-400'}`}>
                                                {hoveredCell.temp}°C
                                            </span>
                                            <span className="text-slate-400 text-xs">{hoveredCell.voltage?.toFixed(2)}V</span>
                                        </div>
                                    )}

                                    {/* Pixel Heatmap Grid */}
                                    <div
                                        className="grid gap-[2px] select-none touch-none"
                                        style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}
                                        onMouseLeave={() => setHoveredCell(null)}
                                        onTouchEnd={() => setHoveredCell(null)}
                                    >
                                        {deviceData.battery.thermalMatrix.map((cell: typeof deviceData.battery.thermalMatrix[0]) => {
                                            // Temperature to color gradient (cold blue -> warm red)
                                            const getHeatColor = (temp: number) => {
                                                if (temp >= 45) return { bg: '#ef4444', glow: true }; // Red - Critical
                                                if (temp >= 40) return { bg: '#f97316', glow: false }; // Orange - Warning
                                                if (temp >= 35) return { bg: '#eab308', glow: false }; // Yellow
                                                if (temp >= 30) return { bg: '#22c55e', glow: false }; // Green
                                                return { bg: '#06b6d4', glow: false }; // Cyan - Cool
                                            };
                                            const heatStyle = getHeatColor(cell.temp);

                                            return (
                                                <div
                                                    key={cell.id}
                                                    className={`aspect-square rounded-[3px] cursor-pointer transition-transform hover:scale-150 hover:z-10 ${heatStyle.glow ? 'animate-pulse shadow-lg shadow-red-500/50' : ''}`}
                                                    style={{ backgroundColor: heatStyle.bg }}
                                                    onMouseEnter={() => setHoveredCell(cell)}
                                                    onTouchStart={() => setHoveredCell(cell)}
                                                />
                                            );
                                        })}
                                    </div>

                                    {/* Color Legend */}
                                    <div className="flex items-center justify-center gap-1 mt-3 pt-3 border-t border-white/10">
                                        <span className="text-[10px] text-slate-400 mr-1">冷</span>
                                        <div className="w-4 h-2 rounded-sm bg-cyan-500"></div>
                                        <div className="w-4 h-2 rounded-sm bg-emerald-500"></div>
                                        <div className="w-4 h-2 rounded-sm bg-yellow-500"></div>
                                        <div className="w-4 h-2 rounded-sm bg-orange-500"></div>
                                        <div className="w-4 h-2 rounded-sm bg-red-500"></div>
                                        <span className="text-[10px] text-slate-400 ml-1">热</span>
                                        <span className="text-[10px] text-slate-400 ml-3">（滑动查看详情）</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {deviceTab === 'inverter' && (
                            <div className="flex flex-col gap-4">
                                {/* DC/AC Dual Column */}
                                <div className="grid grid-cols-2 gap-3">
                                    {/* DC Side */}
                                    <div className="flex flex-col p-4 bg-glass-light dark:bg-glass-dark backdrop-blur-xl rounded-2xl border border-glass-border-light dark:border-glass-border-dark shadow-glass">
                                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-200 dark:border-slate-700">
                                            <span className="material-symbols-outlined text-amber-500 text-lg">solar_power</span>
                                            <span className="text-sm font-bold text-slate-900 dark:text-white">DC 直流侧</span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex justify-between">
                                                <span className="text-xs text-slate-400">电压</span>
                                                <span className="text-xs font-bold text-slate-900 dark:text-white">{deviceData.inverter.dc.voltage}V</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-xs text-slate-400">电流</span>
                                                <span className="text-xs font-bold text-slate-900 dark:text-white">{deviceData.inverter.dc.current}A</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-xs text-slate-400">功率</span>
                                                <span className="text-xs font-bold text-primary">{deviceData.inverter.dc.power}kW</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* AC Side */}
                                    <div className="flex flex-col p-4 bg-glass-light dark:bg-glass-dark backdrop-blur-xl rounded-2xl border border-glass-border-light dark:border-glass-border-dark shadow-glass">
                                        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-200 dark:border-slate-700">
                                            <span className="material-symbols-outlined text-emerald-500 text-lg">electric_meter</span>
                                            <span className="text-sm font-bold text-slate-900 dark:text-white">AC 交流侧</span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex justify-between">
                                                <span className="text-xs text-slate-400">电压</span>
                                                <span className="text-xs font-bold text-slate-900 dark:text-white">{deviceData.inverter.ac.voltage}V</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-xs text-slate-400">频率</span>
                                                <span className="text-xs font-bold text-slate-900 dark:text-white">{deviceData.inverter.ac.frequency}Hz</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-xs text-slate-400">功率因数</span>
                                                <span className="text-xs font-bold text-emerald-500">{deviceData.inverter.ac.powerFactor}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* IGBT Temperature Gauge */}
                                <div className="flex flex-col p-5 bg-glass-light dark:bg-glass-dark backdrop-blur-xl rounded-3xl border border-glass-border-light dark:border-glass-border-dark shadow-glass">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-red-500">device_thermostat</span>
                                            <h3 className="text-slate-900 dark:text-white font-bold text-base">IGBT 模块温度</h3>
                                        </div>
                                        <span className={`text-2xl font-bold ${deviceData.inverter.igbtTemp > 80 ? 'text-red-500' : deviceData.inverter.igbtTemp > 60 ? 'text-orange-500' : 'text-emerald-500'}`}>
                                            {deviceData.inverter.igbtTemp}°C
                                        </span>
                                    </div>

                                    {/* Temp Bar */}
                                    <div className="relative h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className={`absolute inset-y-0 left-0 rounded-full transition-all ${deviceData.inverter.igbtTemp > 80 ? 'bg-gradient-to-r from-red-400 to-red-500' : deviceData.inverter.igbtTemp > 60 ? 'bg-gradient-to-r from-orange-400 to-orange-500' : 'bg-gradient-to-r from-emerald-400 to-emerald-500'}`}
                                            style={{ width: `${(deviceData.inverter.igbtTemp / 100) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <span className="text-[10px] text-slate-400">0°C</span>
                                        <span className="text-[10px] text-orange-400">60°C</span>
                                        <span className="text-[10px] text-red-400">80°C</span>
                                        <span className="text-[10px] text-slate-400">100°C</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {deviceTab === 'charger' && (
                            <div className="flex flex-col gap-4">
                                {/* Filter Chips */}
                                {(() => {
                                    const guns = deviceData.charger.guns;
                                    const counts = {
                                        all: guns.length,
                                        Charging: guns.filter(g => g.state === 'Charging').length,
                                        Idle: guns.filter(g => g.state === 'Idle').length,
                                        Fault: guns.filter(g => g.state === 'Fault').length,
                                        Offline: guns.filter(g => g.state === 'Offline').length,
                                    };
                                    return (
                                        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                                            {[
                                                { key: 'all' as const, label: '全部', color: 'bg-slate-500' },
                                                { key: 'Charging' as const, label: '充电中', color: 'bg-primary' },
                                                { key: 'Idle' as const, label: '空闲', color: 'bg-emerald-500' },
                                                { key: 'Fault' as const, label: '故障', color: 'bg-red-500' },
                                                { key: 'Offline' as const, label: '离线', color: 'bg-slate-400' },
                                            ].map(item => (
                                                <button
                                                    key={item.key}
                                                    onClick={() => setGunFilter(item.key)}
                                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${gunFilter === item.key ? 'bg-white dark:bg-white/20 text-slate-900 dark:text-white shadow-sm' : 'bg-glass-light dark:bg-glass-dark text-slate-500 dark:text-slate-400'}`}
                                                >
                                                    <span className={`w-2 h-2 rounded-full ${item.color}`}></span>
                                                    {item.label}({counts[item.key]})
                                                </button>
                                            ))}
                                        </div>
                                    );
                                })()}

                                {/* Status Grid - Cinema Seat Style */}
                                <div className="p-4 bg-glass-light dark:bg-glass-dark backdrop-blur-xl rounded-3xl border border-glass-border-light dark:border-glass-border-dark shadow-glass">
                                    <div className="grid grid-cols-4 gap-3">
                                        {deviceData.charger.guns
                                            .filter(gun => gunFilter === 'all' || gun.state === gunFilter)
                                            .map((gun) => {
                                                const stateStyles = {
                                                    Charging: { bg: 'bg-primary', border: 'border-primary/30', animate: 'animate-pulse' },
                                                    Idle: { bg: 'bg-emerald-500', border: 'border-emerald-500/30', animate: '' },
                                                    Fault: { bg: 'bg-red-500', border: 'border-red-500/30', animate: '' },
                                                    Offline: { bg: 'bg-slate-400', border: 'border-slate-400/30', animate: '' },
                                                };
                                                const style = stateStyles[gun.state as keyof typeof stateStyles] || stateStyles.Offline;

                                                return (
                                                    <button
                                                        key={gun.id}
                                                        onClick={() => setSelectedGun(gun)}
                                                        className={`aspect-square rounded-xl flex flex-col items-center justify-center transition-all hover:scale-105 active:scale-95 ${style.bg} ${style.animate} border-2 ${style.border} shadow-lg`}
                                                    >
                                                        <span className="text-lg font-bold text-white">{gun.id}</span>
                                                        {gun.state === 'Charging' && (
                                                            <span className="text-[10px] font-medium text-white/90">{gun.soc}%</span>
                                                        )}
                                                        {gun.state === 'Fault' && (
                                                            <span className="text-[10px] text-white">⚠️</span>
                                                        )}
                                                    </button>
                                                );
                                            })}
                                    </div>

                                    {/* Legend */}
                                    <div className="flex justify-center gap-4 mt-4 pt-3 border-t border-white/10">
                                        <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-500"></span><span className="text-[10px] text-slate-400">空闲</span></div>
                                        <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-primary animate-pulse"></span><span className="text-[10px] text-slate-400">充电中</span></div>
                                        <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-500"></span><span className="text-[10px] text-slate-400">故障</span></div>
                                        <div className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-slate-400"></span><span className="text-[10px] text-slate-400">离线</span></div>
                                    </div>
                                </div>

                                {/* Bottom Sheet - Gun Details */}
                                {selectedGun && (
                                    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={() => setSelectedGun(null)}>
                                        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
                                        <div
                                            className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-t-3xl p-5 pb-8 animate-slide-up"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {/* Handle */}
                                            <div className="w-12 h-1 bg-slate-300 dark:bg-slate-600 rounded-full mx-auto mb-4"></div>

                                            {/* Header */}
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedGun.state === 'Charging' ? 'bg-primary' :
                                                        selectedGun.state === 'Idle' ? 'bg-emerald-500' :
                                                            selectedGun.state === 'Fault' ? 'bg-red-500' : 'bg-slate-400'
                                                        }`}>
                                                        <span className="text-xl font-bold text-white">{selectedGun.id}</span>
                                                    </div>
                                                    <div>
                                                        <p className="text-lg font-bold text-slate-900 dark:text-white">充电枪 #{selectedGun.id}</p>
                                                        <p className={`text-sm font-medium ${selectedGun.state === 'Charging' ? 'text-primary' :
                                                            selectedGun.state === 'Idle' ? 'text-emerald-500' :
                                                                selectedGun.state === 'Fault' ? 'text-red-500' : 'text-slate-400'
                                                            }`}>
                                                            {selectedGun.state === 'Charging' ? '充电中' :
                                                                selectedGun.state === 'Idle' ? '空闲' :
                                                                    selectedGun.state === 'Fault' ? '故障' : '离线'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => setSelectedGun(null)}
                                                    className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center"
                                                >
                                                    <span className="material-symbols-outlined text-slate-500 text-lg">close</span>
                                                </button>
                                            </div>

                                            {selectedGun.state === 'Charging' && (
                                                <>
                                                    {/* SOC Progress */}
                                                    <div className="mb-4">
                                                        <div className="flex justify-between mb-1">
                                                            <span className="text-sm text-slate-500">车辆 SOC</span>
                                                            <span className="text-sm font-bold text-primary">{selectedGun.soc}%</span>
                                                        </div>
                                                        <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                            <div className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full transition-all" style={{ width: `${selectedGun.soc}%` }}></div>
                                                        </div>
                                                    </div>

                                                    {/* Grid Stats */}
                                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                                            <p className="text-xs text-slate-400 mb-0.5">充电功率</p>
                                                            <p className="text-xl font-bold text-primary">{selectedGun.power}<span className="text-xs font-normal text-slate-400 ml-0.5">kW</span></p>
                                                        </div>
                                                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                                            <p className="text-xs text-slate-400 mb-0.5">充电电流</p>
                                                            <p className="text-xl font-bold text-slate-900 dark:text-white">{selectedGun.current}<span className="text-xs font-normal text-slate-400 ml-0.5">A</span></p>
                                                        </div>
                                                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                                            <p className="text-xs text-slate-400 mb-0.5">充电电压</p>
                                                            <p className="text-xl font-bold text-slate-900 dark:text-white">{selectedGun.voltage}<span className="text-xs font-normal text-slate-400 ml-0.5">V</span></p>
                                                        </div>
                                                        <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                                            <p className="text-xs text-slate-400 mb-0.5">订单号</p>
                                                            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{selectedGun.orderId || '--'}</p>
                                                        </div>
                                                    </div>
                                                </>
                                            )}

                                            {selectedGun.state === 'Fault' && (
                                                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 mb-4">
                                                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                                                        <span className="material-symbols-outlined">error</span>
                                                        <span className="font-medium">设备故障，请联系运维</span>
                                                    </div>
                                                </div>
                                            )}

                                            {selectedGun.state === 'Offline' && (
                                                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl mb-4">
                                                    <div className="flex items-center gap-2 text-slate-500">
                                                        <span className="material-symbols-outlined">wifi_off</span>
                                                        <span className="font-medium">设备离线</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Dangerous Actions - Permission Gated */}
                        <div className="flex flex-col p-5 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border border-slate-700 shadow-lg mt-4">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="material-symbols-outlined text-red-400">admin_panel_settings</span>
                                <h3 className="text-white font-bold text-base">远程控制</h3>
                                <span className="ml-auto text-[10px] text-slate-400 bg-slate-700/50 px-2 py-0.5 rounded-full">需长按 3 秒</span>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                {/* System Reset */}
                                <button
                                    onMouseDown={() => handleLongPressStart('reset')}
                                    onMouseUp={() => handleLongPressEnd('reset')}
                                    onMouseLeave={() => handleLongPressEnd('reset')}
                                    onTouchStart={() => handleLongPressStart('reset')}
                                    onTouchEnd={() => handleLongPressEnd('reset')}
                                    className="relative overflow-hidden flex flex-col items-center justify-center p-4 bg-slate-700/50 hover:bg-slate-700 rounded-xl border border-slate-600 transition-all group select-none"
                                >
                                    {longPressProgress['reset'] > 0 && (
                                        <div
                                            className="absolute inset-0 bg-amber-500/30 transition-all"
                                            style={{ width: `${longPressProgress['reset']}%` }}
                                        ></div>
                                    )}
                                    <span className="material-symbols-outlined text-amber-400 text-2xl mb-1 relative z-10">restart_alt</span>
                                    <span className="text-sm font-medium text-white relative z-10">系统复位</span>
                                </button>

                                {/* Emergency Stop */}
                                <button
                                    onMouseDown={() => handleLongPressStart('stop')}
                                    onMouseUp={() => handleLongPressEnd('stop')}
                                    onMouseLeave={() => handleLongPressEnd('stop')}
                                    onTouchStart={() => handleLongPressStart('stop')}
                                    onTouchEnd={() => handleLongPressEnd('stop')}
                                    className="relative overflow-hidden flex flex-col items-center justify-center p-4 bg-red-900/30 hover:bg-red-900/50 rounded-xl border border-red-700 transition-all group select-none"
                                >
                                    {longPressProgress['stop'] > 0 && (
                                        <div
                                            className="absolute inset-0 bg-red-500/40 transition-all"
                                            style={{ width: `${longPressProgress['stop']}%` }}
                                        ></div>
                                    )}
                                    <span className="material-symbols-outlined text-red-400 text-2xl mb-1 relative z-10">emergency_home</span>
                                    <span className="text-sm font-medium text-white relative z-10">紧急停机</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="h-4"></div>
            </div>
        </StationLayout>
    );
};

export default StationAnalysis;
