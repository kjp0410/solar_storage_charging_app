import { useMemo } from 'react';
import { stations } from '../mockData';
import { StationConfig } from '../types';

interface DeviceTab {
    key: 'pv' | 'battery' | 'charger';
    label: string;
    icon: string;
}

export function useStationConfig(stationId: string) {
    const station = stations.find(s => s.id === stationId);

    const config: StationConfig = station?.config || {
        hasPV: true,
        hasESS: true,
        hasEVSE: true
    };

    // 可用设备Tab列表
    const availableTabs = useMemo<DeviceTab[]>(() => {
        const tabs: DeviceTab[] = [];
        if (config.hasPV) tabs.push({ key: 'pv', label: '光伏', icon: 'solar_power' });
        if (config.hasESS) tabs.push({ key: 'battery', label: '储能', icon: 'battery_horiz_075' });
        if (config.hasEVSE) tabs.push({ key: 'charger', label: '充电桩', icon: 'ev_station' });
        return tabs;
    }, [config.hasPV, config.hasESS, config.hasEVSE]);

    // 设备数量
    const deviceCount = [config.hasPV, config.hasESS, config.hasEVSE].filter(Boolean).length;

    // 站点类型标签
    const stationTypeLabel = useMemo(() => {
        if (config.hasPV && config.hasESS && config.hasEVSE) return '光储充';
        if (config.hasPV && config.hasESS) return '光储';
        if (config.hasPV) return '光伏';
        return '未知';
    }, [config.hasPV, config.hasESS, config.hasEVSE]);

    // 站点类型颜色
    const stationTypeColor = useMemo(() => {
        if (config.hasPV && config.hasESS && config.hasEVSE) return 'bg-emerald-500';
        if (config.hasPV && config.hasESS) return 'bg-cyan-500';
        return 'bg-amber-500';
    }, [config.hasPV, config.hasESS, config.hasEVSE]);

    return {
        config,
        availableTabs,
        deviceCount,
        station,
        stationTypeLabel,
        stationTypeColor
    };
}

export default useStationConfig;
