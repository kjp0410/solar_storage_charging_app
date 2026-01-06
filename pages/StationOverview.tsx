import React from 'react';
import { useParams } from 'react-router-dom';
import StationLayout from '../components/StationLayout';
import { getStationOverviewData } from '../mockData';
import { useStationConfig } from '../hooks/useStationConfig';

const StationOverview: React.FC = () => {
  const { id: stationId = '1' } = useParams<{ id: string }>();
  const { config, deviceCount, stationTypeLabel, stationTypeColor } = useStationConfig(stationId);

  const data = getStationOverviewData(stationId);
  const { site_info, realtime_flow } = data;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': case 'generating': case 'running': case 'discharging': case 'exporting':
        return { bg: 'bg-[#52C41A]', text: 'text-[#52C41A]', bgLight: 'bg-green-100/60 dark:bg-green-900/20' };
      case 'standby': case 'idle': case 'charging':
        return { bg: 'bg-[#BFBFBF]', text: 'text-[#BFBFBF]', bgLight: 'bg-slate-100/60 dark:bg-slate-800/50' };
      case 'fault':
        return { bg: 'bg-[#FF4D4F]', text: 'text-[#FF4D4F]', bgLight: 'bg-red-100/60 dark:bg-red-900/20' };
      case 'warning': case 'importing':
        return { bg: 'bg-[#FAAD14]', text: 'text-[#FAAD14]', bgLight: 'bg-orange-100/60 dark:bg-orange-900/20' };
      default:
        return { bg: 'bg-slate-400', text: 'text-slate-400', bgLight: 'bg-slate-100/60' };
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      'normal': '正常', 'generating': '发电中', 'running': '运行中',
      'discharging': '放电', 'charging': '充电', 'standby': '待机',
      'fault': '故障', 'warning': '告警', 'importing': '购电',
      'exporting': '售电', 'idle': '空闲'
    };
    return labels[status] || status;
  };

  const getStrategyLabel = (strategy: string) => {
    const labels: Record<string, string> = { 'peak_shaving': '削峰填谷', 'demand_response': '需求响应', 'backup': '备用电源' };
    return labels[strategy] || strategy;
  };

  const getWeatherIcon = (weather: string) => {
    const icons: Record<string, string> = { 'sunny': 'wb_sunny', 'cloudy': 'cloud', 'rainy': 'rainy' };
    return icons[weather] || 'wb_sunny';
  };

  return (
    <StationLayout title="站点概览">
      <div className="flex flex-col gap-4 p-4 min-h-full">

        {/* Header - 站点档案 - Glass Card */}
        <section className="bg-glass-light dark:bg-glass-dark backdrop-blur-xl rounded-3xl p-5 shadow-glass border border-glass-border-light dark:border-glass-border-dark">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-orange-400/90 flex items-center justify-center shadow-lg shadow-orange-400/20">
                <span className="material-symbols-outlined text-white text-xl">{getWeatherIcon(site_info.environment.weather)}</span>
              </div>
              <h1 className="text-lg font-bold text-slate-900 dark:text-white">{site_info.name}</h1>
            </div>
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${getStatusColor(site_info.status).bgLight} backdrop-blur-sm`}>
              <span className={`w-2 h-2 rounded-full ${getStatusColor(site_info.status).bg}`}></span>
              <span className={`text-xs font-bold ${getStatusColor(site_info.status).text}`}>{getStatusLabel(site_info.status)}</span>
            </div>
          </div>

          {/* 设计容量 */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/50 dark:bg-white/10 backdrop-blur-sm rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 border border-white/40 dark:border-white/10">
              <span className="material-symbols-outlined text-[14px] text-amber-500">solar_power</span>
              PV: {site_info.design_capacity.pv_kwp}kWp
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/50 dark:bg-white/10 backdrop-blur-sm rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 border border-white/40 dark:border-white/10">
              <span className="material-symbols-outlined text-[14px] text-cyan-500">battery_horiz_075</span>
              ESS: {site_info.design_capacity.ess_capacity_kwh}kWh
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/50 dark:bg-white/10 backdrop-blur-sm rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 border border-white/40 dark:border-white/10">
              <span className="material-symbols-outlined text-[14px] text-emerald-500">ev_station</span>
              EVSE: {site_info.design_capacity.charger_count}枪
            </span>
          </div>

          {/* 环境数据 */}
          <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">thermostat</span>
              <span>{site_info.environment.temperature}°C</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">light_mode</span>
              <span>{site_info.environment.irradiance} W/m²</span>
            </div>
          </div>
        </section>

        {/* 能量流拓扑图 - Glass Card with Animated Flow */}
        <section className="bg-glass-light dark:bg-glass-dark backdrop-blur-xl rounded-3xl p-5 shadow-glass border border-glass-border-light dark:border-glass-border-dark">
          <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">能量流拓扑</h3>

          {/* CSS for flow animation */}
          <style>{`
            @keyframes flowDown {
              0% { top: 0%; opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { top: 100%; opacity: 0; }
            }
            @keyframes flowUp {
              0% { top: 100%; opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { top: 0%; opacity: 0; }
            }
            .flow-dot-down {
              animation: flowDown 1.5s ease-in-out infinite;
            }
            .flow-dot-up {
              animation: flowUp 1.5s ease-in-out infinite;
            }
            .flow-line {
              stroke-dasharray: 6 4;
              animation: dash 0.4s linear infinite;
            }
            @keyframes dash {
              to { stroke-dashoffset: -10; }
            }
            .flow-line-reverse {
              stroke-dasharray: 6 4;
              animation: dashReverse 0.4s linear infinite;
            }
            @keyframes dashReverse {
              to { stroke-dashoffset: 10; }
            }
          `}</style>

          <div className="relative">
            {/* 第一行: 根据设备配置显示 PV 和/或 ESS */}
            <div className={`flex mb-2 ${!config.hasESS ? 'justify-center' : 'justify-between'}`}>
              {/* PV 节点 - 始终显示 */}
              {config.hasPV && (
                <div className={`${config.hasESS ? 'flex-1' : 'w-40'} flex flex-col items-center p-3 rounded-2xl ${getStatusColor(realtime_flow.pv.status).bgLight} backdrop-blur-sm border border-white/30 dark:border-white/10`}>
                  <span className="material-symbols-outlined text-2xl text-amber-500 mb-1">solar_power</span>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">光伏 PV</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white">{realtime_flow.pv.power_kw} kW</span>
                  <span className="text-[10px] text-slate-400">{realtime_flow.pv.daily_energy_kwh} kWh/日</span>
                  <span className={`mt-1 text-[10px] font-bold ${getStatusColor(realtime_flow.pv.status).text}`}>
                    {getStatusLabel(realtime_flow.pv.status)}
                  </span>
                </div>
              )}

              {config.hasESS && <div className="w-6"></div>}

              {/* ESS 节点 */}
              {config.hasESS && (
                <div className={`flex-1 flex flex-col items-center p-3 rounded-2xl ${getStatusColor(realtime_flow.ess.status).bgLight} backdrop-blur-sm border border-white/30 dark:border-white/10`}>
                  <span className="material-symbols-outlined text-2xl text-cyan-500 mb-1">battery_horiz_075</span>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">储能 ESS</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white">{realtime_flow.ess.soc}%</span>
                  <span className="text-[10px] text-slate-400">{realtime_flow.ess.power_kw} kW</span>
                  <span className={`mt-1 text-[10px] font-bold ${getStatusColor(realtime_flow.ess.status).text}`}>
                    {getStatusLabel(realtime_flow.ess.status)}
                  </span>
                </div>
              )}
            </div>

            {/* 流动连接线 - 根据设备配置显示 */}
            <div className={`flex items-center my-1 gap-2 ${!config.hasESS ? 'justify-center' : 'justify-center'}`}>
              {/* PV→EMS 流动 */}
              {config.hasPV && (
                <div className={`${config.hasESS ? 'flex-1' : ''} flex flex-col items-center`}>
                  <div className="relative h-16 w-1">
                    <svg className="absolute inset-0 w-full h-full overflow-visible">
                      <line x1="50%" y1="0" x2="50%" y2="100%" className="flow-line" stroke="#52C41A" strokeWidth="2" />
                    </svg>
                    <div className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#52C41A] shadow-lg shadow-green-500/50 flow-dot-down"></div>
                    <div className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#52C41A] shadow-lg shadow-green-500/50 flow-dot-down" style={{ animationDelay: '0.75s' }}></div>
                  </div>
                  <span className="text-[10px] font-bold text-[#52C41A] mt-1">{realtime_flow.pv.power_kw}kW ↓</span>
                </div>
              )}

              {config.hasESS && <div className="w-6"></div>}

              {/* ESS→EMS 流动 */}
              {config.hasESS && (
                <div className="flex-1 flex flex-col items-center">
                  <div className="relative h-16 w-1">
                    <svg className="absolute inset-0 w-full h-full overflow-visible">
                      <line x1="50%" y1="0" x2="50%" y2="100%" className={realtime_flow.ess.status === 'charging' ? 'flow-line-reverse' : 'flow-line'} stroke={realtime_flow.ess.status === 'charging' ? '#06b6d4' : '#52C41A'} strokeWidth="2" />
                    </svg>
                    <div className={`absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full shadow-lg ${realtime_flow.ess.status === 'charging' ? 'bg-cyan-500 shadow-cyan-500/50 flow-dot-up' : 'bg-[#52C41A] shadow-green-500/50 flow-dot-down'}`}></div>
                    <div className={`absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full shadow-lg ${realtime_flow.ess.status === 'charging' ? 'bg-cyan-500 shadow-cyan-500/50 flow-dot-up' : 'bg-[#52C41A] shadow-green-500/50 flow-dot-down'}`} style={{ animationDelay: '0.75s' }}></div>
                  </div>
                  <span className={`text-[10px] font-bold mt-1 ${realtime_flow.ess.status === 'charging' ? 'text-cyan-500' : 'text-[#52C41A]'}`}>
                    {realtime_flow.ess.status === 'charging' ? '↑' : '↓'} {realtime_flow.ess.power_kw}kW
                  </span>
                </div>
              )}
            </div>

            {/* 中间: EMS 母线 */}
            <div className="flex justify-center my-2">
              <div className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary/20 via-primary/30 to-primary/20 backdrop-blur-sm rounded-2xl border border-primary/30 shadow-lg shadow-primary/10">
                <span className="material-symbols-outlined text-primary text-xl animate-pulse">hub</span>
                <span className="text-sm font-bold text-primary">EMS 母线</span>
                <span className="text-xs text-primary/80 bg-primary/10 px-2 py-0.5 rounded-full">
                  {(realtime_flow.pv.power_kw + (config.hasESS ? realtime_flow.ess.power_kw : 0)).toFixed(1)} kW
                </span>
              </div>
            </div>

            {/* EMS→Grid 和 EMS→EVSE 流动连接线 */}
            <div className={`flex items-center my-1 gap-2 ${!config.hasEVSE ? 'justify-center' : 'justify-center'}`}>
              {/* EMS→Grid 流动 */}
              <div className={`${config.hasEVSE ? 'flex-1' : ''} flex flex-col items-center`}>
                <span className={`text-[10px] font-bold mb-1 ${realtime_flow.grid.status === 'exporting' ? 'text-[#52C41A]' : 'text-[#FAAD14]'}`}>
                  {realtime_flow.grid.status === 'exporting' ? '↓' : '↑'} {realtime_flow.grid.power_kw}kW
                </span>
                <div className="relative h-16 w-1">
                  <svg className="absolute inset-0 w-full h-full overflow-visible">
                    <line x1="50%" y1="0" x2="50%" y2="100%" className={realtime_flow.grid.status === 'exporting' ? 'flow-line' : 'flow-line-reverse'} stroke={realtime_flow.grid.status === 'exporting' ? '#52C41A' : '#FAAD14'} strokeWidth="2" />
                  </svg>
                  <div className={`absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full shadow-lg ${realtime_flow.grid.status === 'exporting' ? 'bg-[#52C41A] shadow-green-500/50 flow-dot-down' : 'bg-[#FAAD14] shadow-orange-500/50 flow-dot-up'}`}></div>
                  <div className={`absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full shadow-lg ${realtime_flow.grid.status === 'exporting' ? 'bg-[#52C41A] shadow-green-500/50 flow-dot-down' : 'bg-[#FAAD14] shadow-orange-500/50 flow-dot-up'}`} style={{ animationDelay: '0.75s' }}></div>
                </div>
              </div>

              {config.hasEVSE && <div className="w-6"></div>}

              {/* EMS→EVSE 流动 */}
              {config.hasEVSE && (
                <div className="flex-1 flex flex-col items-center">
                  <span className="text-[10px] font-bold text-[#52C41A] mb-1">↓ {realtime_flow.ev_charger.power_kw}kW</span>
                  <div className="relative h-16 w-1">
                    <svg className="absolute inset-0 w-full h-full overflow-visible">
                      <line x1="50%" y1="0" x2="50%" y2="100%" className="flow-line" stroke="#10b981" strokeWidth="2" />
                    </svg>
                    <div className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50 flow-dot-down"></div>
                    <div className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50 flow-dot-down" style={{ animationDelay: '0.75s' }}></div>
                  </div>
                </div>
              )}
            </div>

            {/* 第三行: Grid 和 EVSE */}
            <div className={`flex mt-2 ${!config.hasEVSE ? 'justify-center' : 'justify-between'}`}>
              {/* Grid 节点 - 始终显示 */}
              <div className={`${config.hasEVSE ? 'flex-1' : 'w-40'} flex flex-col items-center p-3 rounded-2xl ${getStatusColor(realtime_flow.grid.status).bgLight} backdrop-blur-sm border border-white/30 dark:border-white/10`}>
                <span className="material-symbols-outlined text-2xl text-slate-500 mb-1">electrical_services</span>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">电网 Grid</span>
                <span className="text-lg font-bold text-slate-900 dark:text-white">{realtime_flow.grid.power_kw} kW</span>
                <span className="text-[10px] text-slate-400">购{realtime_flow.grid.daily_import_kwh}/售{realtime_flow.grid.daily_export_kwh}</span>
                <span className={`mt-1 text-[10px] font-bold ${getStatusColor(realtime_flow.grid.status).text}`}>
                  {getStatusLabel(realtime_flow.grid.status)}
                </span>
              </div>

              {config.hasEVSE && <div className="w-6"></div>}

              {/* EVSE 节点 */}
              {config.hasEVSE && (
                <div className={`flex-1 flex flex-col items-center p-3 rounded-2xl ${getStatusColor(realtime_flow.ev_charger.status).bgLight} backdrop-blur-sm border border-white/30 dark:border-white/10`}>
                  <span className="material-symbols-outlined text-2xl text-emerald-500 mb-1">ev_station</span>
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">充电 EVSE</span>
                  <span className="text-lg font-bold text-slate-900 dark:text-white">{realtime_flow.ev_charger.power_kw} kW</span>
                  <span className="text-[10px] text-slate-400">{realtime_flow.ev_charger.daily_charged_kwh} kWh/日</span>
                  <span className={`mt-1 text-[10px] font-bold ${getStatusColor(realtime_flow.ev_charger.status).text}`}>
                    {realtime_flow.ev_charger.active_guns}/{realtime_flow.ev_charger.total_guns}枪
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Bento Grid - 详细指标 (自适应布局) */}
        {/* 始终使用2列布局，3卡片时PV跨两列 */}
        <section className="grid gap-3 grid-cols-2">
          {/* 光伏卡片 - 3卡片时占全宽，使用专业4列Grid布局 */}
          {config.hasPV && (
            <div className={`bg-glass-light dark:bg-glass-dark backdrop-blur-xl rounded-2xl p-4 shadow-glass border border-glass-border-light dark:border-glass-border-dark ${deviceCount + 1 === 3 ? 'col-span-2' : ''}`}>
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-amber-500">solar_power</span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">光伏 PV</span>
              </div>
              {deviceCount + 1 === 3 ? (
                /* 全宽模式：4列Grid，左对齐，标签在上值在下 */
                <div className="grid grid-cols-4">
                  {/* PR值 */}
                  <div className="flex flex-col pr-2">
                    <span className="text-[10px] text-slate-400 mb-0.5">PR值</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{realtime_flow.pv.pr_value}%</span>
                  </div>
                  {/* 今日发电 */}
                  <div className="flex flex-col px-2 border-l border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 mb-0.5">今日发电</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white truncate">{realtime_flow.pv.daily_energy_kwh} kWh</span>
                  </div>
                  {/* 逆变器 */}
                  <div className="flex flex-col px-2 border-l border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 mb-0.5">逆变器</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{realtime_flow.pv.inverter_online}/{realtime_flow.pv.inverter_total}</span>
                  </div>
                  {/* 状态 */}
                  <div className="flex flex-col pl-2 border-l border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 mb-0.5">状态</span>
                    <span className={`text-sm font-bold ${getStatusColor(realtime_flow.pv.status).text}`}>{getStatusLabel(realtime_flow.pv.status)}</span>
                  </div>
                </div>
              ) : (
                /* 普通模式：纵向列表 */
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">PR值</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{realtime_flow.pv.pr_value}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">逆变器</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{realtime_flow.pv.inverter_online}/{realtime_flow.pv.inverter_total}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">今日发电</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{realtime_flow.pv.daily_energy_kwh} kWh</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">状态</span>
                    <span className={`text-xs font-bold ${getStatusColor(realtime_flow.pv.status).text}`}>{getStatusLabel(realtime_flow.pv.status)}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 储能卡片 */}
          {config.hasESS && (
            <div className="bg-glass-light dark:bg-glass-dark backdrop-blur-xl rounded-2xl p-4 shadow-glass border border-glass-border-light dark:border-glass-border-dark">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-cyan-500">battery_horiz_075</span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">储能 ESS</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">SOC</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{realtime_flow.ess.soc}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">SOH</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{realtime_flow.ess.soh}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">温度</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{realtime_flow.ess.temp_min}~{realtime_flow.ess.temp_max}°C</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">策略</span>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{getStrategyLabel(realtime_flow.ess.strategy)}</span>
                </div>
              </div>
            </div>
          )}

          {/* 充电卡片 */}
          {config.hasEVSE && (
            <div className="bg-glass-light dark:bg-glass-dark backdrop-blur-xl rounded-2xl p-4 shadow-glass border border-glass-border-light dark:border-glass-border-dark">
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-emerald-500">ev_station</span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">充电 EVSE</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">在充枪数</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{realtime_flow.ev_charger.active_guns}/{realtime_flow.ev_charger.total_guns}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">今日订单</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{realtime_flow.ev_charger.daily_orders}单</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">今日充电</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{realtime_flow.ev_charger.daily_charged_kwh} kWh</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">当前功率</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">{realtime_flow.ev_charger.power_kw} kW</span>
                </div>
              </div>
            </div>
          )}

          {/* 电网卡片 (始终显示) */}
          <div className="bg-glass-light dark:bg-glass-dark backdrop-blur-xl rounded-2xl p-4 shadow-glass border border-glass-border-light dark:border-glass-border-dark">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-slate-500">electrical_services</span>
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">电网 Grid</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">今日购电</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{realtime_flow.grid.daily_import_kwh} kWh</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">今日售电</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{realtime_flow.grid.daily_export_kwh} kWh</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">当前功率</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{realtime_flow.grid.power_kw} kW</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400">状态</span>
                <span className={`text-xs font-bold ${getStatusColor(realtime_flow.grid.status).text}`}>{getStatusLabel(realtime_flow.grid.status)}</span>
              </div>
            </div>
          </div>
        </section>

        <div className="h-4"></div>
      </div>
    </StationLayout>
  );
};

export default StationOverview;
