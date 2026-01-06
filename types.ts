// 站点配置类型
export interface StationConfig {
  hasPV: boolean;
  hasESS: boolean;
  hasEVSE: boolean;
}

export interface Station {
  id: string;
  name: string;
  address: string;
  status: 'online' | 'offline' | 'alarm';
  pvPower: string;
  storage: string;
  chargers: string;
  image: string;
  coordinates: { x: number; y: number }; // For mock map
  lat?: number;  // 纬度
  lng?: number;  // 经度
  config: StationConfig;
}

export interface Alarm {
  id: string;
  device: string;
  location: string;
  time: string;
  message: string;
  code: string;
  status: 'pending' | 'processing' | 'resolved';
  level: 'critical' | 'warning' | 'info';
  user?: string;
}

export enum AnalysisViewMode {
  DEVICE = 'device',
  FINANCIAL = 'financial',
}

export interface ChartDataPoint {
  name: string;
  value1: number;
  value2?: number;
}
