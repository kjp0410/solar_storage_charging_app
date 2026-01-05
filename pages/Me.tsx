import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const Me: React.FC = () => {
    const navigate = useNavigate();
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showNotificationModal, setShowNotificationModal] = useState(false);
    const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
    const [showHelpModal, setShowHelpModal] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);

    // Notification settings state
    const [notifyAlarm, setNotifyAlarm] = useState(true);
    const [notifyMaintenance, setNotifyMaintenance] = useState(true);
    const [notifySystem, setNotifySystem] = useState(false);
    const [notifyEmail, setNotifyEmail] = useState(false);

    return (
        <div className="flex flex-col h-full bg-white dark:bg-[#101922] text-slate-900 dark:text-white font-body">
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
                <div className="w-full max-w-md mx-auto pb-4">
                    {/* Header */}
                    <div className="flex items-center p-4 bg-white/80 dark:bg-[#101922]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                        <h2 className="text-xl font-bold leading-tight tracking-tight flex-1 text-center">个人中心</h2>
                    </div>

                    {/* Profile Info */}
                    <div className="flex flex-col items-center pt-8 pb-6 px-6 bg-gradient-to-b from-slate-100 to-white dark:from-slate-800 dark:to-[#101922]">
                        <div className="relative">
                            <div
                                className="bg-center bg-no-repeat bg-cover rounded-full h-28 w-28 shadow-lg ring-4 ring-white dark:ring-slate-800"
                                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAklQc8CdzvghVAAELukFSU0oMNAYiV28V45zHN2oAM3SQtnHZq0_gozxWEBp3PK-FSfTvmVtefU6zzE4Pa4gIUKD7iEIIa-NN2UxHep1Tp_FE6WF-8BIIiTF04tKe9WPpDbYxBV99Umq6rYmXySaUipXM045B4_YPdFahsn66zjYv_vVMbfORgGUj0Ui1_6p42lAALb71f3mqr1Ezjofza2MUPITSf5PstRfKsHv0D3gC4U7LQvkYBU4UQ6JBRPABtQLn_IdDcy3M")' }}
                            ></div>
                            <button
                                onClick={() => setShowProfileModal(true)}
                                className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1.5 border-2 border-white dark:border-slate-800 shadow-sm flex items-center justify-center"
                            >
                                <span className="material-symbols-outlined text-[16px]">edit</span>
                            </button>
                        </div>
                        <div className="mt-4 flex flex-col items-center text-center">
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">陈亚历</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="px-2 py-0.5 rounded text-xs font-medium bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300">站点管理员</span>
                                <span className="text-slate-500 dark:text-slate-400 text-sm font-body">ID: 883-21</span>
                            </div>
                        </div>
                    </div>

                    {/* Menu Groups */}
                    <div className="flex flex-col gap-6 px-4 mt-4">
                        {/* Account */}
                        <div className="flex flex-col gap-2">
                            <h3 className="px-2 text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">账户与偏好</h3>
                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                                <button onClick={() => setShowProfileModal(true)} className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer border-b border-slate-100 dark:border-slate-700">
                                    <div className="flex items-center justify-center rounded-xl bg-blue-50 dark:bg-slate-700 text-primary shrink-0 size-10">
                                        <span className="material-symbols-outlined">person</span>
                                    </div>
                                    <div className="flex-1 min-w-0 text-left">
                                        <p className="text-base font-medium truncate text-slate-900 dark:text-white">个人资料</p>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                                </button>
                                <button onClick={() => setShowNotificationModal(true)} className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer">
                                    <div className="flex items-center justify-center rounded-xl bg-blue-50 dark:bg-slate-700 text-primary shrink-0 size-10">
                                        <span className="material-symbols-outlined">notifications</span>
                                    </div>
                                    <div className="flex-1 min-w-0 text-left">
                                        <p className="text-base font-medium truncate text-slate-900 dark:text-white">通知设置</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-slate-500 dark:text-slate-400 font-body">已开启</span>
                                        <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex flex-col gap-2">
                            <h3 className="px-2 text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">消息中心</h3>
                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                                <button
                                    className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer border-b border-slate-100 dark:border-slate-700"
                                    onClick={() => setShowMessageModal(true)}
                                >
                                    <div className="flex items-center justify-center rounded-xl bg-blue-50 dark:bg-slate-700 text-primary shrink-0 size-10 relative">
                                        <span className="material-symbols-outlined">mail</span>
                                        <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border border-white dark:border-slate-700"></span>
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0 text-left">
                                        <p className="text-base font-medium truncate text-slate-900 dark:text-white">我的消息</p>
                                    </div>
                                    <div className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">3</div>
                                    <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                                </button>
                                <button onClick={() => setShowAnnouncementModal(true)} className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer">
                                    <div className="flex items-center justify-center rounded-xl bg-blue-50 dark:bg-slate-700 text-primary shrink-0 size-10">
                                        <span className="material-symbols-outlined">campaign</span>
                                    </div>
                                    <div className="flex-1 min-w-0 text-left">
                                        <p className="text-base font-medium truncate text-slate-900 dark:text-white">系统公告</p>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                                </button>
                            </div>
                        </div>

                        {/* Support */}
                        <div className="flex flex-col gap-2">
                            <h3 className="px-2 text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">服务支持</h3>
                            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                                <button onClick={() => setShowHelpModal(true)} className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer border-b border-slate-100 dark:border-slate-700">
                                    <div className="flex items-center justify-center rounded-xl bg-blue-50 dark:bg-slate-700 text-primary shrink-0 size-10">
                                        <span className="material-symbols-outlined">help_center</span>
                                    </div>
                                    <div className="flex-1 min-w-0 text-left">
                                        <p className="text-base font-medium truncate text-slate-900 dark:text-white">帮助与文档</p>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                                </button>
                                <button onClick={() => setShowFeedbackModal(true)} className="w-full flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer">
                                    <div className="flex items-center justify-center rounded-xl bg-blue-50 dark:bg-slate-700 text-primary shrink-0 size-10">
                                        <span className="material-symbols-outlined">feedback</span>
                                    </div>
                                    <div className="flex-1 min-w-0 text-left">
                                        <p className="text-base font-medium truncate text-slate-900 dark:text-white">意见反馈</p>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                                </button>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex flex-col items-center gap-4 mt-2 mb-6">
                            <button className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-red-600 font-bold py-3.5 rounded-xl shadow-sm hover:bg-red-50 dark:hover:bg-slate-700 active:scale-[0.99] transition-all flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined">logout</span>
                                退出登录
                            </button>
                            <p className="text-xs text-slate-400 dark:text-slate-500 font-body">版本 2.1.0 (Build 445)</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <BottomNav />

            {/* ===== MODALS ===== */}

            {/* Profile Modal */}
            {showProfileModal && (
                <div className="absolute inset-0 z-[100] flex items-end justify-center">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowProfileModal(false)}></div>
                    <div className="relative w-full bg-white dark:bg-slate-800 rounded-t-2xl shadow-2xl flex flex-col max-h-[85%] animate-slide-up">
                        <div className="flex justify-center pt-3 pb-1" onClick={() => setShowProfileModal(false)}>
                            <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                        </div>
                        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">个人资料</h3>
                            <button className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500" onClick={() => setShowProfileModal(false)}>
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="overflow-y-auto p-4 space-y-4">
                            <div className="flex flex-col items-center py-4">
                                <div
                                    className="bg-center bg-no-repeat bg-cover rounded-full h-24 w-24 shadow-lg ring-4 ring-white dark:ring-slate-700"
                                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAklQc8CdzvghVAAELukFSU0oMNAYiV28V45zHN2oAM3SQtnHZq0_gozxWEBp3PK-FSfTvmVtefU6zzE4Pa4gIUKD7iEIIa-NN2UxHep1Tp_FE6WF-8BIIiTF04tKe9WPpDbYxBV99Umq6rYmXySaUipXM045B4_YPdFahsn66zjYv_vVMbfORgGUj0Ui1_6p42lAALb71f3mqr1Ezjofza2MUPITSf5PstRfKsHv0D3gC4U7LQvkYBU4UQ6JBRPABtQLn_IdDcy3M")' }}
                                ></div>
                                <button className="mt-2 text-sm text-primary font-medium">更换头像</button>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">姓名</label>
                                <input className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm p-3" type="text" defaultValue="陈亚历" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">手机号</label>
                                <input className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm p-3" type="tel" defaultValue="138****8888" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">邮箱</label>
                                <input className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm p-3" type="email" defaultValue="chen.yali@example.com" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">职位</label>
                                <input className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm p-3" type="text" defaultValue="站点管理员" disabled />
                            </div>
                        </div>
                        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30">
                            <button onClick={() => setShowProfileModal(false)} className="w-full py-3 px-4 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors">
                                保存修改
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Notification Settings Modal */}
            {showNotificationModal && (
                <div className="absolute inset-0 z-[100] flex items-end justify-center">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowNotificationModal(false)}></div>
                    <div className="relative w-full bg-white dark:bg-slate-800 rounded-t-2xl shadow-2xl flex flex-col max-h-[85%] animate-slide-up">
                        <div className="flex justify-center pt-3 pb-1" onClick={() => setShowNotificationModal(false)}>
                            <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                        </div>
                        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">通知设置</h3>
                            <button className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500" onClick={() => setShowNotificationModal(false)}>
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="overflow-y-auto p-4 space-y-4">
                            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-white">告警通知</p>
                                    <p className="text-xs text-slate-500">设备告警实时推送</p>
                                </div>
                                <button onClick={() => setNotifyAlarm(!notifyAlarm)} className={`w-12 h-7 rounded-full transition-colors ${notifyAlarm ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'}`}>
                                    <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${notifyAlarm ? 'translate-x-6' : 'translate-x-1'}`}></div>
                                </button>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-white">维护提醒</p>
                                    <p className="text-xs text-slate-500">定期维护计划提醒</p>
                                </div>
                                <button onClick={() => setNotifyMaintenance(!notifyMaintenance)} className={`w-12 h-7 rounded-full transition-colors ${notifyMaintenance ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'}`}>
                                    <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${notifyMaintenance ? 'translate-x-6' : 'translate-x-1'}`}></div>
                                </button>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-white">系统消息</p>
                                    <p className="text-xs text-slate-500">系统更新与公告</p>
                                </div>
                                <button onClick={() => setNotifySystem(!notifySystem)} className={`w-12 h-7 rounded-full transition-colors ${notifySystem ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'}`}>
                                    <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${notifySystem ? 'translate-x-6' : 'translate-x-1'}`}></div>
                                </button>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-white">邮件通知</p>
                                    <p className="text-xs text-slate-500">重要信息发送至邮箱</p>
                                </div>
                                <button onClick={() => setNotifyEmail(!notifyEmail)} className={`w-12 h-7 rounded-full transition-colors ${notifyEmail ? 'bg-primary' : 'bg-slate-300 dark:bg-slate-600'}`}>
                                    <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${notifyEmail ? 'translate-x-6' : 'translate-x-1'}`}></div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Message Modal */}
            {showMessageModal && (
                <div className="absolute inset-0 z-[100] flex items-end justify-center">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowMessageModal(false)}></div>
                    <div className="relative w-full bg-white dark:bg-slate-800 rounded-t-2xl shadow-2xl flex flex-col max-h-[85%] animate-slide-up">
                        <div className="flex justify-center pt-3 pb-1" onClick={() => setShowMessageModal(false)}>
                            <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                        </div>
                        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">我的消息</h3>
                            <button className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500" onClick={() => setShowMessageModal(false)}>
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="overflow-y-auto p-4 space-y-3">
                            <div className="relative flex gap-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 cursor-pointer active:scale-[0.98] transition-all">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400">
                                    <span className="material-symbols-outlined filled">warning</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <p className="text-sm font-bold text-red-700 dark:text-red-400">告警信息</p>
                                        <span className="text-xs text-red-400">10分钟前</span>
                                    </div>
                                    <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2">
                                        站点 #883-21 储能单元温度异常升高，请立即检查。
                                    </p>
                                </div>
                                <div className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            </div>

                            <div className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                    <span className="material-symbols-outlined">info</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">系统维护通知</p>
                                        <span className="text-xs text-slate-400">2小时前</span>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        系统将于今晚 02:00 进行例行维护，预计时长 30 分钟。
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                                    <span className="material-symbols-outlined">check_circle</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">工单已完成</p>
                                        <span className="text-xs text-slate-400">昨天</span>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">
                                        您提交的关于充电桩 #04 的维修工单已处理完毕。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Announcement Modal */}
            {showAnnouncementModal && (
                <div className="absolute inset-0 z-[100] flex items-end justify-center">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowAnnouncementModal(false)}></div>
                    <div className="relative w-full bg-white dark:bg-slate-800 rounded-t-2xl shadow-2xl flex flex-col max-h-[85%] animate-slide-up">
                        <div className="flex justify-center pt-3 pb-1" onClick={() => setShowAnnouncementModal(false)}>
                            <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                        </div>
                        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">系统公告</h3>
                            <button className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500" onClick={() => setShowAnnouncementModal(false)}>
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="overflow-y-auto p-4 space-y-4">
                            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded">NEW</span>
                                    <span className="text-xs text-slate-500">2026-01-05</span>
                                </div>
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">系统更新 v2.1.0</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">新增设备分析报表功能，优化告警推送逻辑，修复若干已知问题。</p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-200 dark:border-slate-700">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs text-slate-500">2026-01-01</span>
                                </div>
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">元旦假期运维安排</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">元旦期间（1月1日-3日），运维值班电话：400-xxx-xxxx</p>
                            </div>
                            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-200 dark:border-slate-700">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs text-slate-500">2025-12-20</span>
                                </div>
                                <h4 className="font-bold text-slate-900 dark:text-white mb-1">新增站点接入通知</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400">光储充一体化站点 Delta 已完成系统接入，请相关管理员确认配置。</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Help Modal */}
            {showHelpModal && (
                <div className="absolute inset-0 z-[100] flex items-end justify-center">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowHelpModal(false)}></div>
                    <div className="relative w-full bg-white dark:bg-slate-800 rounded-t-2xl shadow-2xl flex flex-col max-h-[85%] animate-slide-up">
                        <div className="flex justify-center pt-3 pb-1" onClick={() => setShowHelpModal(false)}>
                            <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                        </div>
                        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">帮助与文档</h3>
                            <button className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500" onClick={() => setShowHelpModal(false)}>
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="overflow-y-auto p-4 space-y-3">
                            <button className="w-full flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                <span className="material-symbols-outlined text-primary">menu_book</span>
                                <div className="flex-1 text-left">
                                    <p className="font-medium text-slate-900 dark:text-white">用户手册</p>
                                    <p className="text-xs text-slate-500">系统功能使用说明</p>
                                </div>
                                <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                            </button>
                            <button className="w-full flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                <span className="material-symbols-outlined text-primary">quiz</span>
                                <div className="flex-1 text-left">
                                    <p className="font-medium text-slate-900 dark:text-white">常见问题</p>
                                    <p className="text-xs text-slate-500">FAQ 解答</p>
                                </div>
                                <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                            </button>
                            <button className="w-full flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                <span className="material-symbols-outlined text-primary">play_circle</span>
                                <div className="flex-1 text-left">
                                    <p className="font-medium text-slate-900 dark:text-white">视频教程</p>
                                    <p className="text-xs text-slate-500">操作演示视频</p>
                                </div>
                                <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                            </button>
                            <button className="w-full flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                <span className="material-symbols-outlined text-primary">support_agent</span>
                                <div className="flex-1 text-left">
                                    <p className="font-medium text-slate-900 dark:text-white">联系客服</p>
                                    <p className="text-xs text-slate-500">7x24 在线支持</p>
                                </div>
                                <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Feedback Modal */}
            {showFeedbackModal && (
                <div className="absolute inset-0 z-[100] flex items-end justify-center">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowFeedbackModal(false)}></div>
                    <div className="relative w-full bg-white dark:bg-slate-800 rounded-t-2xl shadow-2xl flex flex-col max-h-[90%] animate-slide-up">
                        <div className="flex justify-center pt-3 pb-1" onClick={() => setShowFeedbackModal(false)}>
                            <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                        </div>
                        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">意见反馈</h3>
                            <button className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500" onClick={() => setShowFeedbackModal(false)}>
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="overflow-y-auto p-4 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">反馈类型</label>
                                <select className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm p-3">
                                    <option>功能建议</option>
                                    <option>问题反馈</option>
                                    <option>界面优化</option>
                                    <option>其他</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">详细描述</label>
                                <textarea
                                    className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm p-3"
                                    rows={5}
                                    placeholder="请详细描述您的建议或遇到的问题..."
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">联系方式（选填）</label>
                                <input className="w-full bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm p-3" type="text" placeholder="手机号或邮箱" />
                            </div>
                        </div>
                        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30">
                            <button onClick={() => setShowFeedbackModal(false)} className="w-full py-3 px-4 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary-dark transition-colors">
                                提交反馈
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Me;
