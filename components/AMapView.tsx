import React, { useEffect, useRef, useState } from 'react';
import { Station } from '../types';
import { wgs84ToGcj02 } from '../utils/coordTransform';
import { useNavigate } from 'react-router-dom';

// 声明高德地图类型
declare global {
    interface Window {
        AMap: any;
        _AMapSecurityConfig: {
            securityJsCode: string;
        };
    }
}

interface AMapViewProps {
    stations: Station[];
    onStationSelect?: (station: Station) => void;
}

const AMapView: React.FC<AMapViewProps> = ({ stations, onStationSelect }) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<any>(null);
    const markerCluster = useRef<any>(null);
    const [selectedStation, setSelectedStation] = useState<Station | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!mapContainer.current || !window.AMap) {
            console.warn('AMap not loaded');
            return;
        }

        // 初始化地图
        mapInstance.current = new window.AMap.Map(mapContainer.current, {
            zoom: 5,
            center: [116.397428, 39.90923], // 北京为中心
            mapStyle: 'amap://styles/normal',
            resizeEnable: true,
        });

        // 创建自定义Marker内容
        const createMarkerContent = (station: Station) => {
            const isAlarm = station.status === 'alarm';
            const isOffline = station.status === 'offline';
            const bgColor = isAlarm ? '#ef4444' : isOffline ? '#64748b' : '#22c55e';
            const icon = isAlarm ? 'warning' : isOffline ? 'cloud_off' : 'bolt';

            return `
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          transform: translate(-50%, -100%);
        ">
          <div style="
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: ${bgColor};
            border: 2px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            ${isAlarm ? 'animation: pulse 1.5s infinite;' : ''}
          ">
            <span class="material-symbols-outlined" style="color: white; font-size: 18px;">${icon}</span>
          </div>
          <div style="
            margin-top: 4px;
            padding: 2px 8px;
            background: white;
            border-radius: 4px;
            box-shadow: 0 1px 4px rgba(0,0,0,0.15);
            font-size: 11px;
            font-weight: 500;
            color: #334155;
            white-space: nowrap;
          ">${station.name.length > 8 ? station.name.substring(0, 8) + '...' : station.name}</div>
        </div>
      `;
        };

        // 创建标记点数据 - 使用站点的实际经纬度
        const markers = stations.map((station) => {
            // 使用站点数据中的lat/lng，如果没有则使用默认值
            const coord: [number, number] = station.lat && station.lng
                ? [station.lng, station.lat]
                : [121.4737, 31.2304];
            return {
                lnglat: coord,
                station: station,
                weight: station.status === 'alarm' ? 100 : station.status === 'offline' ? 50 : 1,
            };
        });

        // 使用聚合插件
        if (window.AMap.MarkerCluster) {
            markerCluster.current = new window.AMap.MarkerCluster(mapInstance.current, markers, {
                gridSize: 60,
                renderClusterMarker: (context: any) => {
                    const count = context.count;
                    const div = document.createElement('div');
                    div.style.cssText = `
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(135deg, #0f7ae6, #3b82f6);
            border: 3px solid white;
            box-shadow: 0 2px 10px rgba(15, 122, 230, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
          `;
                    div.innerHTML = count.toString();
                    context.marker.setContent(div);
                    context.marker.setOffset(new window.AMap.Pixel(-20, -20));
                },
                renderMarker: (context: any) => {
                    const station = context.data[0].station;
                    const content = createMarkerContent(station);
                    context.marker.setContent(content);
                    context.marker.setOffset(new window.AMap.Pixel(0, 0));

                    // 告警站点优先显示
                    if (station.status === 'alarm') {
                        context.marker.setzIndex(1000);
                    }
                },
            });

            // 点击聚合或单个Marker
            markerCluster.current.on('click', (e: any) => {
                if (e.clusterData && e.clusterData.length > 1) {
                    // 点击聚合点，放大地图
                    mapInstance.current.setZoomAndCenter(
                        mapInstance.current.getZoom() + 2,
                        e.lnglat
                    );
                } else if (e.clusterData && e.clusterData.length === 1) {
                    // 点击单个Marker
                    const station = e.clusterData[0].station;
                    setSelectedStation(station);
                    onStationSelect?.(station);
                }
            });
        } else {
            // 如果聚合插件未加载，使用普通Marker
            stations.forEach((station) => {
                const coord: [number, number] = station.lat && station.lng
                    ? [station.lng, station.lat]
                    : [121.4737, 31.2304];
                const marker = new window.AMap.Marker({
                    position: coord,
                    content: createMarkerContent(station),
                    offset: new window.AMap.Pixel(0, 0),
                    zIndex: station.status === 'alarm' ? 1000 : 100,
                });
                marker.on('click', () => {
                    setSelectedStation(station);
                    onStationSelect?.(station);
                });
                marker.setMap(mapInstance.current);
            });
        }

        // 添加地图控件
        mapInstance.current.addControl(new window.AMap.Scale());

        return () => {
            if (mapInstance.current) {
                mapInstance.current.destroy();
            }
        };
    }, [stations, onStationSelect]);

    return (
        <div className="relative w-full h-full">
            {/* Map Container */}
            <div ref={mapContainer} className="absolute inset-0" />

            {/* Zoom Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                <button
                    onClick={() => mapInstance.current?.zoomIn()}
                    className="w-10 h-10 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 active:scale-95 transition-transform"
                >
                    <span className="material-symbols-outlined">add</span>
                </button>
                <button
                    onClick={() => mapInstance.current?.zoomOut()}
                    className="w-10 h-10 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 active:scale-95 transition-transform"
                >
                    <span className="material-symbols-outlined">remove</span>
                </button>
            </div>

            {/* My Location Button */}
            <button
                onClick={() => {
                    // 定位到当前位置（需要浏览器授权）
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition((pos) => {
                            const [gcjLng, gcjLat] = wgs84ToGcj02(pos.coords.longitude, pos.coords.latitude);
                            mapInstance.current?.setCenter([gcjLng, gcjLat]);
                            mapInstance.current?.setZoom(12);
                        });
                    }
                }}
                className="absolute bottom-20 right-4 bg-white dark:bg-slate-800 p-3 rounded-full shadow-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 active:scale-95 transition-transform z-10"
            >
                <span className="material-symbols-outlined text-[24px]">my_location</span>
            </button>

            {/* Selected Station Card */}
            {selectedStation && (
                <div className="absolute bottom-20 left-4 right-4 z-20 animate-slide-up">
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <div
                            className="h-28 w-full bg-cover bg-center relative"
                            style={{ backgroundImage: `url('${selectedStation.image}')` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            <div className="absolute top-2 right-2">
                                <span
                                    className={`text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide flex items-center gap-1 ${selectedStation.status === 'online'
                                        ? 'bg-emerald-500/90'
                                        : selectedStation.status === 'alarm'
                                            ? 'bg-amber-500/90'
                                            : 'bg-slate-500/90'
                                        }`}
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                                    {selectedStation.status === 'online' ? '在线' : selectedStation.status === 'alarm' ? '告警' : '离线'}
                                </span>
                            </div>
                            <button
                                className="absolute top-2 left-2 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors"
                                onClick={() => setSelectedStation(null)}
                            >
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                            <div className="absolute bottom-2 left-3 text-white">
                                <h3 className="text-base font-bold">{selectedStation.name}</h3>
                            </div>
                        </div>
                        <div className="p-3 flex justify-between items-center">
                            <div className="flex flex-col">
                                <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                                    ID: #SOL-00{selectedStation.id}
                                </span>
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

            {/* Loading State (if AMap not loaded) */}
            {!window.AMap && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-900">
                    <div className="text-center">
                        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                        <p className="text-sm text-slate-500">地图加载中...</p>
                    </div>
                </div>
            )}

            {/* Pulse Animation Style */}
            <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
      `}</style>
        </div>
    );
};

export default AMapView;
