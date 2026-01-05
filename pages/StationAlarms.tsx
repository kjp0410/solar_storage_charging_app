import React, { useState } from 'react';
import StationHeader from '../components/StationHeader';
import { alarms } from '../mockData';
import { Alarm } from '../types';

const StationAlarms: React.FC = () => {
  const [selectedAlarm, setSelectedAlarm] = useState<Alarm | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen text-slate-900 dark:text-white pb-32 flex flex-col">
      <StationHeader title="站点告警" />
      
      {/* Filters */}
      <div className="px-4 pb-3 pt-4 flex gap-2 overflow-x-auto no-scrollbar items-center sticky top-16 bg-background-light/95 dark:bg-background-dark/95 z-30 backdrop-blur-sm">
        <button className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 whitespace-nowrap active:bg-slate-200 dark:active:bg-slate-700 transition-colors">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">等级: 全部</span>
          <span className="material-symbols-outlined text-[18px] text-slate-500">expand_more</span>
        </button>
        <button className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20 whitespace-nowrap">
          <span className="text-sm font-medium text-primary">状态: 未处理</span>
          <span className="material-symbols-outlined text-[18px] text-primary">expand_more</span>
        </button>
        <button className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 whitespace-nowrap active:bg-slate-200 dark:active:bg-slate-700 transition-colors">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">时间: 24h</span>
          <span className="material-symbols-outlined text-[18px] text-slate-500">expand_more</span>
        </button>
        <button className="flex items-center justify-center size-8 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 shrink-0">
          <span className="material-symbols-outlined text-[20px]">filter_list_off</span>
        </button>
      </div>

      <main className="flex-1 overflow-y-auto p-4 pt-0 relative z-0">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-surface-light dark:bg-surface-dark p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center">
            <span className="text-red-500 font-bold text-xl">3</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">严重</span>
          </div>
          <div className="bg-surface-light dark:bg-surface-dark p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center">
            <span className="text-amber-500 font-bold text-xl">12</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">警告</span>
          </div>
          <div className="bg-surface-light dark:bg-surface-dark p-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center">
            <span className="text-primary font-bold text-xl">5</span>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">待处理</span>
          </div>
        </div>

        {/* Alarm List */}
        <div className="flex flex-col gap-3">
          {alarms.map((alarm) => (
            <button 
              key={alarm.id}
              onClick={() => setSelectedAlarm(alarm)}
              className={`w-full text-left relative bg-surface-light dark:bg-surface-dark rounded-xl shadow-card overflow-hidden group active:scale-[0.98] transition-all duration-150 border border-transparent hover:border-slate-200 dark:hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary/50 ${alarm.status === 'resolved' ? 'opacity-80' : ''}`}
            >
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                alarm.level === 'critical' ? 'bg-red-500' :
                alarm.level === 'warning' ? 'bg-amber-500' :
                alarm.status === 'resolved' ? 'bg-emerald-500' : 'bg-slate-400'
              }`}></div>
              <div className="p-4 pl-5 flex items-start gap-3">
                <div className={`shrink-0 size-10 rounded-lg flex items-center justify-center mt-1 ${
                    alarm.level === 'critical' ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' :
                    alarm.level === 'warning' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' :
                    alarm.status === 'resolved' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400' :
                    'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}>
                  <span className="material-symbols-outlined">
                    {alarm.level === 'critical' ? 'warning' : alarm.level === 'warning' ? 'thermostat' : alarm.status === 'resolved' ? 'check_circle' : 'wifi_off'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-slate-900 dark:text-white font-bold truncate pr-2">{alarm.device}</h3>
                    <span className="text-xs font-mono text-slate-400 whitespace-nowrap">{alarm.time}</span>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-tight mb-2">{alarm.message}</p>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 uppercase tracking-wide">
                        {alarm.code}
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold ${
                        alarm.status === 'pending' ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300' :
                        alarm.status === 'processing' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' :
                        alarm.status === 'resolved' ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300' :
                        'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}>
                        {alarm.status === 'pending' ? '未处理' : alarm.status === 'processing' ? '处理中' : alarm.status === 'resolved' ? '已关闭' : '待复核'}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* FAB */}
      <div className="fixed bottom-24 right-4 z-30">
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center justify-center gap-2 h-14 pl-4 pr-5 bg-primary hover:bg-primary-dark text-white rounded-2xl shadow-lg shadow-primary/30 active:scale-95 transition-all duration-200 group"
        >
          <span className="material-symbols-outlined group-hover:rotate-90 transition-transform">add</span>
          <span className="font-bold text-sm tracking-wide">创建工单</span>
        </button>
      </div>

      {/* Alarm Detail Modal */}
      {selectedAlarm && (
        <div className="fixed inset-0 z-50 flex justify-end flex-col sm:items-center sm:justify-center">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] transition-opacity" onClick={() => setSelectedAlarm(null)}></div>
            <div className="relative w-full sm:max-w-md bg-surface-light dark:bg-surface-dark rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col animate-slide-up">
                <div className="h-6 flex items-center justify-center shrink-0 sm:hidden" onClick={() => setSelectedAlarm(null)}>
                    <div className="w-12 h-1 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                </div>
                <div className="px-6 pb-4 border-b border-slate-100 dark:border-slate-700/50 flex items-start gap-4">
                    <div className={`shrink-0 size-12 rounded-xl flex items-center justify-center ${
                         selectedAlarm.level === 'critical' ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400'
                    }`}>
                        <span className="material-symbols-outlined text-[28px]">warning</span>
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{selectedAlarm.device}</h2>
                            <button className="text-slate-400 hover:text-slate-600 p-1 -mr-2" onClick={() => setSelectedAlarm(null)}>
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-mono text-slate-500">{selectedAlarm.code}</span>
                            <span className="size-1 bg-slate-300 rounded-full"></span>
                            <span className={`text-xs font-medium ${selectedAlarm.level === 'critical' ? 'text-red-600' : 'text-amber-600'}`}>
                                {selectedAlarm.level === 'critical' ? '严重' : '警告'}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="p-6 overflow-y-auto space-y-6">
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">描述</h3>
                        <p className="text-slate-800 dark:text-slate-200 text-sm leading-relaxed">
                            {selectedAlarm.level === 'critical' 
                             ? '在组串 4 上检测到直流输入低压。电压在超过5分钟内低于阈值（200V）。可能存在遮挡或熔断器故障。' 
                             : '设备内部温度过高，请检查散热系统。'}
                        </p>
                        <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-700 flex items-center gap-3">
                            <span className="material-symbols-outlined text-slate-400">schedule</span>
                            <div className="text-xs">
                                <span className="block text-slate-500">发生时间</span>
                                <span className="font-medium text-slate-900 dark:text-white">今天, {selectedAlarm.time}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">影响范围</h3>
                        <div className="flex gap-2">
                            <span className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">逆变器 #4</span>
                            <span className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">组串 4</span>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">相关工单</h3>
                            <button className="text-xs text-primary font-medium hover:underline">+ 关联现有工单</button>
                        </div>
                        <div className="p-3 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-center text-sm text-slate-500 italic">
                            无关联的活动工单。
                        </div>
                    </div>
                </div>
                <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30 flex gap-3">
                    <button onClick={() => setSelectedAlarm(null)} className="flex-1 py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                        关闭告警
                    </button>
                    <button className="flex-1 py-3 px-4 rounded-xl bg-primary text-white font-semibold text-sm shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors">
                        确认
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Create Work Order Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex justify-end flex-col sm:items-center sm:justify-center">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] transition-opacity" onClick={() => setShowCreateModal(false)}></div>
            <div className="relative w-full sm:max-w-md bg-surface-light dark:bg-surface-dark rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-slide-up">
                <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">创建工单</h2>
                    <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div className="p-6 overflow-y-auto space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">工单类型</label>
                        <select className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary">
                            <option>故障排查</option>
                            <option>定期巡检</option>
                            <option>组件更换</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">关联设备</label>
                        <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary p-2.5" type="text" placeholder="搜索设备..." />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">优先级</label>
                        <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                            <button className="flex-1 py-2 text-sm font-medium text-slate-500 rounded-md">低</button>
                            <button className="flex-1 py-2 text-sm font-medium text-slate-500 rounded-md">中</button>
                            <button className="flex-1 py-2 text-sm font-bold bg-white dark:bg-slate-700 text-red-600 shadow-sm rounded-md border border-slate-200 dark:border-slate-600">高</button>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">问题描述</label>
                        <textarea className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary p-2.5" rows={4} placeholder="请描述告警详情..."></textarea>
                    </div>
                </div>
                <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30 flex gap-3">
                     <button onClick={() => setShowCreateModal(false)} className="flex-1 py-3 px-4 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                        取消
                    </button>
                    <button onClick={() => setShowCreateModal(false)} className="flex-1 py-3 px-4 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors">
                        提交工单
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default StationAlarms;
