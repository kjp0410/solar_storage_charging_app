import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { stations } from '../mockData';
import BottomNav from '../components/BottomNav';
import WeatherWidget from '../components/WeatherWidget';
import NotificationBell from '../components/NotificationBell';
import StatusFilterChips, { FilterStatus } from '../components/StatusFilterChips';
import LocationPicker, { SelectedLocation } from '../components/LocationPicker';
import AMapView from '../components/AMapView';

const Home: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation | null>(null);
  const navigate = useNavigate();

  // 过滤站点逻辑
  const filteredStations = useMemo(() => {
    return stations.filter((station) => {
      if (statusFilter !== 'all' && station.status !== statusFilter) {
        return false;
      }
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !station.name.toLowerCase().includes(query) &&
          !station.id.toLowerCase().includes(query)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [statusFilter, searchQuery, selectedLocation]);

  const handleRemoveLocation = () => {
    setSelectedLocation(null);
  };

  return (
    <div className="relative h-full overflow-hidden flex flex-col bg-background-light dark:bg-background-dark">
      {/* 背景装饰 Blobs */}
      <div className="blob bg-blue-400 dark:bg-blue-900 w-80 h-80 rounded-full -top-20 -left-20"></div>
      <div className="blob bg-purple-400 dark:bg-purple-900 w-80 h-80 rounded-full top-40 -right-20 animation-delay-2000"></div>
      <div className="blob bg-teal-300 dark:bg-teal-900 w-60 h-60 rounded-full bottom-40 left-10 animation-delay-4000"></div>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto no-scrollbar pb-28 px-5 pt-6 relative z-10">

        {/* Header: Weather + Notifications */}
        <header className="flex justify-between items-center mb-2 px-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-orange-500">
              <span className="material-symbols-outlined text-[18px]">wb_sunny</span>
            </div>
            <div>
              <div className="text-[9px] text-slate-400 dark:text-slate-500 font-medium tracking-wide">上海</div>
              <div className="text-sm font-bold flex items-center gap-1 text-slate-800 dark:text-white leading-none">
                28° <span className="text-[9px] font-normal text-slate-400">晴</span>
              </div>
            </div>
          </div>
          <NotificationBell />
        </header>

        {/* Search + Filter Button */}
        <div className="flex gap-2 mb-3">
          <div className="flex-1 relative group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-[18px]">
              search
            </span>
            <input
              className="w-full bg-glass-light dark:bg-glass-dark backdrop-blur-xl border border-glass-border-light dark:border-glass-border-dark rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none shadow-sm placeholder-slate-400 dark:placeholder-slate-500 dark:text-white transition-all"
              placeholder="查找电站、ID 或位置..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowLocationPicker(true)}
            className="bg-glass-light dark:bg-glass-dark backdrop-blur-xl border border-glass-border-light dark:border-glass-border-dark rounded-xl w-12 flex items-center justify-center shadow-sm active:scale-95 transition-transform hover:bg-white dark:hover:bg-slate-800"
          >
            <span className="material-symbols-outlined text-slate-600 dark:text-slate-200 text-[20px]">tune</span>
          </button>
        </div>

        {/* Selected Location Tags */}
        {selectedLocation?.province && (
          <div className="flex flex-wrap gap-2 mb-2">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 backdrop-blur-sm text-primary text-xs font-medium rounded-full border border-primary/20">
              <span>
                {selectedLocation.province.name}
                {selectedLocation.city && ` / ${selectedLocation.city.name}`}
                {selectedLocation.district && ` / ${selectedLocation.district.name}`}
              </span>
              <button
                onClick={handleRemoveLocation}
                className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-primary/20 transition-colors"
              >
                <span className="material-symbols-outlined text-[12px]">close</span>
              </button>
            </div>
          </div>
        )}

        {/* Status Filter Chips - Material 3 Unified Choice Chip Style */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar mb-3 pb-1">
          {/* All */}
          <button
            onClick={() => setStatusFilter('all')}
            className={`flex-shrink-0 h-7 px-3 rounded-full text-[11px] font-medium flex items-center gap-1 transition-all active:scale-95 ${statusFilter === 'all'
              ? 'bg-[#2563EB] text-white'
              : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'
              }`}
          >
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
            全部
          </button>

          {/* Running / Online */}
          <button
            onClick={() => setStatusFilter('online')}
            className={`flex-shrink-0 h-7 px-3 rounded-full text-[11px] font-medium flex items-center gap-1 transition-all active:scale-95 ${statusFilter === 'online'
              ? 'bg-[#DCFCE7] text-[#166534] border border-[#22C55E]'
              : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'
              }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${statusFilter === 'online' ? 'bg-[#166534]' : 'bg-[#22C55E]'}`}></span>
            运行中
          </button>

          {/* Error / Alarm */}
          <button
            onClick={() => setStatusFilter('alarm')}
            className={`flex-shrink-0 h-7 px-3 rounded-full text-[11px] font-medium flex items-center gap-1 transition-all active:scale-95 ${statusFilter === 'alarm'
              ? 'bg-[#FEE2E2] text-[#991B1B] border border-[#EF4444]'
              : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'
              }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${statusFilter === 'alarm' ? 'bg-[#991B1B]' : 'bg-[#EF4444]'}`}></span>
            异常
          </button>

          {/* Offline */}
          <button
            onClick={() => setStatusFilter('offline')}
            className={`flex-shrink-0 h-7 px-3 rounded-full text-[11px] font-medium flex items-center gap-1 transition-all active:scale-95 ${statusFilter === 'offline'
              ? 'bg-[#E5E7EB] text-[#374151] border border-[#9CA3AF]'
              : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]'
              }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${statusFilter === 'offline' ? 'bg-[#374151]' : 'bg-[#9CA3AF]'}`}></span>
            离线
          </button>
        </div>

        {/* View Mode Toggle */}
        <div className="bg-glass-light dark:bg-glass-dark backdrop-blur-xl p-1 rounded-xl flex mb-4 shadow-inner border border-glass-border-light dark:border-glass-border-dark">
          <button
            onClick={() => setViewMode('list')}
            className={`flex-1 py-1.5 text-sm font-semibold flex items-center justify-center gap-2 rounded-lg transition-all ${viewMode === 'list'
              ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-800 dark:text-white'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
          >
            <span className="material-symbols-outlined text-[16px]">list</span>
            列表视图
          </button>
          <button
            onClick={() => setViewMode('map')}
            className={`flex-1 py-1.5 text-sm font-medium flex items-center justify-center gap-2 rounded-lg transition-all ${viewMode === 'map'
              ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-800 dark:text-white'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
          >
            <span className="material-symbols-outlined text-[16px]">map</span>
            地图模式
          </button>
        </div>

        {/* Content Area */}
        {viewMode === 'list' ? (
          <>
            {/* 站点统计 */}
            <div className="flex justify-between items-end mb-4 px-1">
              <h2 className="text-base font-semibold text-slate-800 dark:text-white">监控列表</h2>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-black/30 px-2.5 py-1 rounded-lg">
                共 {filteredStations.length} 个站点
              </span>
            </div>

            {filteredStations.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                <span className="material-symbols-outlined text-[56px] mb-4 opacity-50">search_off</span>
                <p className="text-sm">未找到匹配的站点</p>
              </div>
            ) : (
              <div className="space-y-5">
                {filteredStations.map((station) => (
                  <div
                    key={station.id}
                    onClick={() => navigate(`/station/${station.id}/overview`)}
                    className="group bg-glass-light dark:bg-glass-dark backdrop-blur-xl border border-glass-border-light dark:border-glass-border-dark rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                  >
                    {/* 图片区域 */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={station.image}
                        alt={station.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                      {/* 状态标签 */}
                      <div className="absolute top-4 right-4">
                        <span className={`backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg ${station.status === 'online' ? 'bg-green-500/90' :
                          station.status === 'alarm' ? 'bg-red-500/90' :
                            'bg-slate-500/90'
                          }`}>
                          <span className="material-symbols-outlined text-[14px]">
                            {station.status === 'online' ? 'bolt' : station.status === 'alarm' ? 'warning' : 'cloud_off'}
                          </span>
                          {station.status === 'online' ? '运行正常' : station.status === 'alarm' ? '设备告警' : '已离线'}
                        </span>
                      </div>

                      {/* 编号 */}
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="text-[10px] opacity-80 font-mono tracking-wider uppercase">
                          ID: SOL-00{station.id}
                        </div>
                      </div>
                    </div>

                    {/* 信息区域 */}
                    <div className="p-5">
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">
                          {station.name}
                        </h3>
                        <div className="flex items-center text-slate-500 dark:text-slate-400 text-xs gap-1">
                          <span className="material-symbols-outlined text-[15px]">location_on</span>
                          <span>{station.address}</span>
                        </div>
                      </div>

                      {/* 数据指标 */}
                      <div className="grid grid-cols-3 gap-3 p-3.5 bg-white/40 dark:bg-black/20 rounded-2xl border border-white/40 dark:border-white/5">
                        <div className="flex flex-col gap-0.5">
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">光伏功率</div>
                          <div className="font-bold text-slate-800 dark:text-white text-base">
                            {station.pvPower.replace(' kWp', '')}
                            <span className="text-[10px] font-medium text-slate-500 ml-0.5">kW</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-0.5 border-l border-slate-200/50 dark:border-white/10 pl-3">
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">储能容量</div>
                          <div className="font-bold text-slate-800 dark:text-white text-base">
                            {station.storage.replace(' kWh', '').replace(' MWh', '')}
                            <span className="text-[10px] font-medium text-slate-500 ml-0.5">
                              {station.storage.includes('MWh') ? 'MWh' : 'kWh'}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-0.5 border-l border-slate-200/50 dark:border-white/10 pl-3">
                          <div className="text-[10px] text-slate-500 dark:text-slate-400">充电桩</div>
                          <div className="font-bold text-slate-800 dark:text-white text-base">
                            {station.chargers.replace(' 台', '')}
                            <span className="text-[10px] font-medium text-slate-500 ml-0.5">台</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="h-8"></div>
          </>
        ) : (
          /* Map View */
          <div className="h-[60vh] rounded-3xl overflow-hidden border border-glass-border-light dark:border-glass-border-dark shadow-lg">
            <AMapView stations={filteredStations} />
          </div>
        )}
      </main>

      {/* Location Picker Bottom Sheet */}
      <LocationPicker
        isOpen={showLocationPicker}
        onClose={() => setShowLocationPicker(false)}
        onConfirm={setSelectedLocation}
        initialLocation={selectedLocation || undefined}
      />

      <BottomNav />
    </div>
  );
};

export default Home;
