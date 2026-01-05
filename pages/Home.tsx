import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { stations } from '../mockData';
import BottomNav from '../components/BottomNav';

const Home: React.FC = () => {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedStationId, setSelectedStationId] = useState<string | null>(null);
  const [mapScale, setMapScale] = useState(1);
  const navigate = useNavigate();

  const selectedStation = stations.find(s => s.id === selectedStationId);

  const handleZoomIn = () => {
    setMapScale(prev => Math.min(prev + 0.25, 2));
  };

  const handleZoomOut = () => {
    setMapScale(prev => Math.max(prev - 0.25, 0.5));
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <main className="flex-1 flex flex-col overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-950 -z-10 pointer-events-none"></div>

        {/* Sticky Header */}
        <div className="px-4 pt-6 pb-2 bg-white/80 dark:bg-[#101922]/90 backdrop-blur-md sticky top-0 z-20 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="mb-4">
            <label className="flex flex-col h-12 w-full">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 bg-slate-50 dark:bg-slate-800">
                <div className="text-slate-500 flex border-none items-center justify-center pl-4 rounded-l-lg">
                  <span className="material-symbols-outlined">search</span>
                </div>
                <input
                  className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-slate-900 dark:text-white focus:outline-none focus:ring-0 border-none bg-transparent h-full placeholder:text-slate-400 px-4 pl-2 text-base font-normal leading-normal"
                  placeholder="搜索电站名称或ID..."
                />
              </div>
            </label>
          </div>
          <div className="flex">
            <div className="flex h-10 flex-1 items-center justify-center rounded-lg bg-slate-200 dark:bg-slate-800 p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-2 transition-all duration-200 ${viewMode === 'list'
                    ? 'bg-primary shadow-md text-white'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700/50'
                  }`}
              >
                <span className="truncate text-sm font-medium leading-normal">列表模式</span>
              </button>
              <button
                onClick={() => { setViewMode('map'); setSelectedStationId(null); }}
                className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-2 transition-all duration-200 ${viewMode === 'map'
                    ? 'bg-primary shadow-md text-white'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700/50'
                  }`}
              >
                <span className="truncate text-sm font-medium leading-normal">地图模式</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        {viewMode === 'list' ? (
          <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
            {stations.map((station) => (
              <div
                key={station.id}
                onClick={() => navigate(`/station/${station.id}/overview`)}
                className="flex flex-col rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden group active:scale-[0.99] transition-transform duration-100 cursor-pointer"
              >
                <div
                  className="h-32 w-full bg-cover bg-center relative"
                  style={{ backgroundImage: `url('${station.image}')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="text-xs font-medium bg-black/30 backdrop-blur-sm px-2 py-1 rounded inline-block mb-1">
                      编号: #SOL-00{station.id}
                    </p>
                  </div>
                </div>
                <div className="p-4 flex flex-col">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">{station.name}</h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">location_on</span>
                        {station.address}
                      </p>
                    </div>
                    <div className={`flex h-8 px-3 items-center justify-center rounded-full gap-1.5 text-xs font-semibold uppercase tracking-wide ${station.status === 'online' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' :
                        station.status === 'alarm' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                          'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300'
                      }`}>
                      <span className="material-symbols-outlined text-[18px]">
                        {station.status === 'online' ? 'check_circle' : station.status === 'alarm' ? 'warning' : 'cloud_off'}
                      </span>
                      <span>
                        {station.status === 'online' ? '在线' : station.status === 'alarm' ? '告警' : '离线'}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 dark:border-slate-700">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 tracking-wider">光伏功率</span>
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{station.pvPower}</span>
                    </div>
                    <div className="flex flex-col gap-0.5 border-l border-slate-100 dark:border-slate-700 pl-3">
                      <span className="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 tracking-wider">储能容量</span>
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{station.storage}</span>
                    </div>
                    <div className="flex flex-col gap-0.5 border-l border-slate-100 dark:border-slate-700 pl-3">
                      <span className="text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 tracking-wider">充电桩</span>
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{station.chargers}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 relative w-full h-full overflow-hidden bg-slate-100 dark:bg-[#0B1116]">
            {/* Map Container with zoom */}
            <div
              className="absolute inset-0 transition-transform duration-300 origin-center"
              style={{ transform: `scale(${mapScale})` }}
              onClick={() => setSelectedStationId(null)}
            >
              {/* Map Grid Background */}
              <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                color: '#64748b'
              }}></div>

              {/* Map Roads */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 dark:opacity-10" xmlns="http://www.w3.org/2000/svg">
                <path d="M-100 200 L400 200 L600 400" fill="none" stroke="#64748b" strokeWidth="20"></path>
                <path d="M200 -100 L200 800" fill="none" stroke="#64748b" strokeWidth="15"></path>
                <path d="M0 500 L800 300" fill="none" stroke="#64748b" strokeWidth="12"></path>
              </svg>

              {/* Map Markers */}
              {stations.map((station) => (
                <div
                  key={station.id}
                  className="absolute flex flex-col items-center cursor-pointer transition-transform hover:scale-110 z-10"
                  style={{ top: `${station.coordinates.y}%`, left: `${station.coordinates.x}%`, transform: 'translate(-50%, -50%)' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedStationId(station.id === selectedStationId ? null : station.id);
                  }}
                >
                  {/* Marker Icon */}
                  <div className={`p-2 rounded-full shadow-lg border-2 border-white dark:border-slate-700 ${station.status === 'online' ? 'bg-emerald-500' :
                      station.status === 'alarm' ? 'bg-amber-500 animate-pulse' :
                        'bg-slate-500'
                    } text-white`}>
                    <span className="material-symbols-outlined text-[20px] block">
                      {station.status === 'online' ? 'bolt' : station.status === 'alarm' ? 'warning' : 'cloud_off'}
                    </span>
                  </div>
                  {/* Station Name Label */}
                  <div className="mt-1 px-2 py-0.5 bg-white dark:bg-slate-800 rounded shadow-sm text-xs font-medium text-slate-700 dark:text-slate-200 whitespace-nowrap">
                    {station.name.length > 10 ? station.name.substring(0, 10) + '...' : station.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Zoom Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-30">
              <button
                onClick={handleZoomIn}
                className="w-10 h-10 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined">add</span>
              </button>
              <button
                onClick={handleZoomOut}
                className="w-10 h-10 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined">remove</span>
              </button>
            </div>

            {/* Zoom Level Indicator */}
            <div className="absolute top-4 left-4 bg-white dark:bg-slate-800 px-2 py-1 rounded shadow text-xs font-medium text-slate-600 dark:text-slate-300 z-30">
              {Math.round(mapScale * 100)}%
            </div>

            {/* My Location Button */}
            <button className="absolute bottom-4 right-4 bg-white dark:bg-slate-800 p-3 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 active:scale-95 transition-transform z-30">
              <span className="material-symbols-outlined text-[24px]">my_location</span>
            </button>

            {/* Selected Station Popup Card */}
            {selectedStation && (
              <div className="absolute bottom-20 left-4 right-4 z-40 animate-slide-up">
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <div className="h-28 w-full bg-cover bg-center relative" style={{ backgroundImage: `url('${selectedStation.image}')` }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute top-2 right-2">
                      <span className={`text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide flex items-center gap-1 ${selectedStation.status === 'online' ? 'bg-emerald-500/90' :
                          selectedStation.status === 'alarm' ? 'bg-amber-500/90' :
                            'bg-slate-500/90'
                        }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                        {selectedStation.status === 'online' ? '在线' : selectedStation.status === 'alarm' ? '告警' : '离线'}
                      </span>
                    </div>
                    <button
                      className="absolute top-2 left-2 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
                      onClick={() => setSelectedStationId(null)}
                    >
                      <span className="material-symbols-outlined text-[20px]">close</span>
                    </button>
                    <div className="absolute bottom-2 left-3 text-white">
                      <h3 className="text-base font-bold">{selectedStation.name}</h3>
                    </div>
                  </div>
                  <div className="p-3 flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">ID: #SOL-00{selectedStation.id}</span>
                      <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300 text-xs mt-0.5">
                        <span className="material-symbols-outlined text-[14px]">location_on</span>
                        {selectedStation.address}
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/station/${selectedStation.id}/overview`)}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white hover:bg-primary-dark transition-colors shadow-lg"
                    >
                      <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
};

export default Home;
