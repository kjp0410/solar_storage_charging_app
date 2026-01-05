import React, { useState } from 'react';
import BottomNav from '../components/BottomNav';

const Me: React.FC = () => {
    const [showMessageModal, setShowMessageModal] = useState(false);

    return (
        <div className="bg-white dark:bg-[#101922] min-h-screen text-slate-900 dark:text-white font-body selection:bg-primary selection:text-white flex flex-col">
            <div className="relative flex h-full w-full max-w-md mx-auto flex-col pb-24 flex-1">
                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center p-4 bg-white/80 dark:bg-[#101922]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
                    <h2 className="text-xl font-bold leading-tight tracking-tight flex-1 text-center">个人中心</h2>
                </div>

                {/* Profile Info */}
                <div className="flex flex-col items-center pt-8 pb-6 px-6 bg-gradient-to-b from-slate-100 to-white dark:from-slate-800 dark:to-[#101922]">
                    <div className="relative">
                        <div 
                            className="bg-center bg-no-repeat bg-cover rounded-full h-28 w-28 shadow-lg ring-4 ring-white dark:ring-slate-800" 
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAklQc8CdzvghVAAELukFSU0oMNAYiV28V45zHN2oAM3SQtnHZq0_gozxWEBp3PK-FSfTvmVtefU6zzE4Pa4gIUKD7iEIIa-NN2UxHep1Tp_FE6WF-8BIIiTF04tKe9WPpDbYxBV99Umq6rYmXySaUipXM045B4_YPdFahsn66zjYv_vVMbfORgGUj0Ui1_6p42lAALb71f3mqr1Ezjofza2MUPITSf5PstRfKsHv0D3gC4U7LQvkYBU4UQ6JBRPABtQLn_IdDcy3M")' }}
                        ></div>
                        <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1.5 border-2 border-white dark:border-slate-800 shadow-sm flex items-center justify-center">
                            <span className="material-symbols-outlined text-[16px]">edit</span>
                        </div>
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
                            <div className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer border-b border-slate-100 dark:border-slate-700 last:border-0">
                                <div className="flex items-center justify-center rounded-xl bg-blue-50 dark:bg-slate-700 text-primary shrink-0 size-10">
                                    <span className="material-symbols-outlined">person</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-base font-medium truncate text-slate-900 dark:text-white">个人资料</p>
                                </div>
                                <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                            </div>
                            <div className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer last:border-0">
                                <div className="flex items-center justify-center rounded-xl bg-blue-50 dark:bg-slate-700 text-primary shrink-0 size-10">
                                    <span className="material-symbols-outlined">notifications</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-base font-medium truncate text-slate-900 dark:text-white">通知设置</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-slate-500 dark:text-slate-400 font-body">已开启</span>
                                    <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex flex-col gap-2">
                        <h3 className="px-2 text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">消息中心</h3>
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                            <div 
                                className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer border-b border-slate-100 dark:border-slate-700 last:border-0"
                                onClick={() => setShowMessageModal(true)}
                            >
                                <div className="flex items-center justify-center rounded-xl bg-blue-50 dark:bg-slate-700 text-primary shrink-0 size-10 relative">
                                    <span className="material-symbols-outlined">mail</span>
                                    <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border border-white dark:border-slate-700"></span>
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-base font-medium truncate text-slate-900 dark:text-white">我的消息</p>
                                </div>
                                <div className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">3</div>
                                <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                            </div>
                            <div className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer last:border-0">
                                <div className="flex items-center justify-center rounded-xl bg-blue-50 dark:bg-slate-700 text-primary shrink-0 size-10">
                                    <span className="material-symbols-outlined">campaign</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-base font-medium truncate text-slate-900 dark:text-white">系统公告</p>
                                </div>
                                <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                            </div>
                        </div>
                    </div>

                    {/* Support */}
                    <div className="flex flex-col gap-2">
                        <h3 className="px-2 text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">服务支持</h3>
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                            <div className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer border-b border-slate-100 dark:border-slate-700 last:border-0">
                                <div className="flex items-center justify-center rounded-xl bg-blue-50 dark:bg-slate-700 text-primary shrink-0 size-10">
                                    <span className="material-symbols-outlined">help_center</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-base font-medium truncate text-slate-900 dark:text-white">帮助与文档</p>
                                </div>
                                <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                            </div>
                            <div className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer last:border-0">
                                <div className="flex items-center justify-center rounded-xl bg-blue-50 dark:bg-slate-700 text-primary shrink-0 size-10">
                                    <span className="material-symbols-outlined">feedback</span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-base font-medium truncate text-slate-900 dark:text-white">意见反馈</p>
                                </div>
                                <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                            </div>
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

            {/* Message Modal */}
            {showMessageModal && (
                <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setShowMessageModal(false)}></div>
                    <div className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-t-2xl sm:rounded-2xl shadow-2xl transform transition-all flex flex-col max-h-[85vh] animate-slide-up">
                        <div className="sm:hidden flex justify-center pt-3 pb-1" onClick={() => setShowMessageModal(false)}>
                            <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
                        </div>
                        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-700">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">我的消息</h3>
                            <button className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500" onClick={() => setShowMessageModal(false)}>
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="overflow-y-auto p-4 space-y-3">
                            <div className="relative flex gap-4 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 cursor-pointer active:scale-[0.98] transition-all hover:shadow-sm group">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400">
                                        <span className="material-symbols-outlined filled">warning</span>
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <p className="text-sm font-bold text-red-700 dark:text-red-400">告警信息</p>
                                        <span className="text-xs text-red-400 dark:text-red-500/80">10分钟前</span>
                                    </div>
                                    <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2">
                                        站点 #883-21 储能单元温度异常升高，请立即检查。
                                    </p>
                                    <div className="mt-2 flex items-center text-xs font-medium text-red-600 dark:text-red-400 group-hover:underline">
                                        前往站点告警 <span className="material-symbols-outlined text-[14px] ml-0.5">arrow_forward</span>
                                    </div>
                                </div>
                                <div className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            </div>
                            
                            <div className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                        <span className="material-symbols-outlined">info</span>
                                    </div>
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
                                <div className="w-2 h-2 bg-red-500 rounded-full mt-1.5"></div>
                            </div>

                             <div className="flex gap-4 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                                        <span className="material-symbols-outlined">check_circle</span>
                                    </div>
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

            <BottomNav />
        </div>
    );
};

export default Me;
