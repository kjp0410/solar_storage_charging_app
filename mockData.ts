import { Station, Alarm } from './types';

export const stations: Station[] = [
  {
    id: '1',
    name: '上海张江光储充示范站',
    address: '上海市浦东新区张江高科技园区祖冲之路2288号',
    status: 'online',
    pvPower: '500 kWp',
    storage: '1000 kWh',
    chargers: '10 台',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAB5BWZ_qpD1TKlcG0A0QRlyLiqyCbiVUWn_N2C_J-m3vYbkxdR-YPhJ7_sqFsdOpuvsI9NtUvIJlZoFBQtdbWLAdqYmbvxBfqXNjnX5_Fg-PFjS6RA4Yr860sVls-CKgPvMEvfHdOBir1SoPg6v0IxZo8UyUOv2Rfp4asm7bxHWa_FuHD4KAHFGoJ8pVH5iEkQGWIshWDs1rIHjy3DaSSS-x-cm_Nc6EBeFPOk1dQfGeMPhZuO45euJON8eD77_HrTf5XOgrekUpo',
    coordinates: { x: 85, y: 45 },
    lat: 31.2304,
    lng: 121.4737,
    config: { hasPV: true, hasESS: true, hasEVSE: true }
  },
  {
    id: '2',
    name: '北京望京光储电站',
    address: '北京市朝阳区望京科技园利泽西街7号',
    status: 'online',
    pvPower: '300 kWp',
    storage: '600 kWh',
    chargers: '--',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAq_BaIFYhj3lv1S8eHqcQmgNWWHlAaYoE0kHgfw6u0TLIkplSCiL-u1o0X3Rnz1oAsGEFtQJEYzHSK1zuWDNVuQuEz85xmx41uszuPeegY-qOHKpygZydnZ8bPWkIB51JRSMK_P3gECUzDqsOvbxQei0Al9bFMSEeLdNdHAqhFXqbxpzPVawvQD6-2-xtmQ12DEbJthHZyL7elgxSE4BIMzFzcZg8K1x4uI4eioJv_eHgvwQce4Lz6SeGeB1f1k_mFtN3Hl4ff6VA',
    coordinates: { x: 70, y: 20 },
    lat: 39.9847,
    lng: 116.4761,
    config: { hasPV: true, hasESS: true, hasEVSE: false }
  },
  {
    id: '3',
    name: '深圳南山光伏电站',
    address: '深圳市南山区科技园南区高新南一道008号',
    status: 'alarm',
    pvPower: '800 kWp',
    storage: '--',
    chargers: '--',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8Q2eYLbGTacZNg1x6baroasf0CooMFb7cnfXkGHh9jkndF5kkLpCjbCwuA0GxPo4fIK_h8NFn6xTwsYee3tGuXYJH8vbDCuyrQXVVR5R8kQMgs8NIPA1rf7t0GwmLVfc_QRCmXNS5OXxMVbQjy8crCO2kam0F5-Ts5HjtrpEKwHHjPChRNXGwkLGEBvKU_1bbbPkpK8ocTYVAqyQ78NIU9zU6jUs_IJQ0ODK6NE3uxI4o92dWMTWWNa1daugwQ0Y4yv_rEP16z1Y',
    coordinates: { x: 75, y: 85 },
    lat: 22.5431,
    lng: 114.0579,
    config: { hasPV: true, hasESS: false, hasEVSE: false }
  },
  {
    id: '4',
    name: '杭州西湖光储充站',
    address: '杭州市西湖区文三路90号',
    status: 'online',
    pvPower: '200 kWp',
    storage: '500 kWh',
    chargers: '8 台',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvO9d9ISIl4EIP8UxNIFyjxPBZykbqDN-rOzsQlSU7DUu4ZVLhryhGnqetsYlk-xDOdwdB5V6rFmHZHBJr7Oxui-6ms2ogdu1PXLRFAq3dhHegPPP00itJS2MY6ORCyx304hX8tXYQBjnXPoDWCLFNTqchInoSCjXKsPR_Ue1yx7jQkfXLgcE6XcMkL9Fx9fwxA6cI1Lo08LE4bLdEWY9W8H2WgJ4xqITVcWh-mmwQiYobpbVGwWW0a1qPJypf6VBwNFNzmwDnzLw',
    coordinates: { x: 80, y: 55 },
    lat: 30.2741,
    lng: 120.1551,
    config: { hasPV: true, hasESS: true, hasEVSE: true }
  },
  {
    id: '5',
    name: '成都高新光储站',
    address: '成都市高新区天府大道北段1700号',
    status: 'online',
    pvPower: '150 kWp',
    storage: '300 kWh',
    chargers: '--',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAB5BWZ_qpD1TKlcG0A0QRlyLiqyCbiVUWn_N2C_J-m3vYbkxdR-YPhJ7_sqFsdOpuvsI9NtUvIJlZoFBQtdbWLAdqYmbvxBfqXNjnX5_Fg-PFjS6RA4Yr860sVls-CKgPvMEvfHdOBir1SoPg6v0IxZo8UyUOv2Rfp4asm7bxHWa_FuHD4KAHFGoJ8pVH5iEkQGWIshWDs1rIHjy3DaSSS-x-cm_Nc6EBeFPOk1dQfGeMPhZuO45euJON8eD77_HrTf5XOgrekUpo',
    coordinates: { x: 35, y: 55 },
    lat: 30.5728,
    lng: 104.0668,
    config: { hasPV: true, hasESS: true, hasEVSE: false }
  },
  {
    id: '6',
    name: '广州天河光伏站',
    address: '广州市天河区珠江新城华夏路30号',
    status: 'offline',
    pvPower: '600 kWp',
    storage: '--',
    chargers: '--',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAq_BaIFYhj3lv1S8eHqcQmgNWWHlAaYoE0kHgfw6u0TLIkplSCiL-u1o0X3Rnz1oAsGEFtQJEYzHSK1zuWDNVuQuEz85xmx41uszuPeegY-qOHKpygZydnZ8bPWkIB51JRSMK_P3gECUzDqsOvbxQei0Al9bFMSEeLdNdHAqhFXqbxpzPVawvQD6-2-xtmQ12DEbJthHZyL7elgxSE4BIMzFzcZg8K1x4uI4eioJv_eHgvwQce4Lz6SeGeB1f1k_mFtN3Hl4ff6VA',
    coordinates: { x: 70, y: 80 },
    lat: 23.1291,
    lng: 113.2644,
    config: { hasPV: true, hasESS: false, hasEVSE: false }
  }
];

export const alarms: Alarm[] = [
  {
    id: '1',
    device: '逆变器 #4 - 北翼',
    location: '#INV-004',
    time: '10:42',
    message: '直流输入电压过低',
    code: '#INV-004',
    status: 'pending',
    level: 'critical'
  },
  {
    id: '2',
    device: '变压器箱 B',
    location: '#TRX-022',
    time: '09:15',
    message: '内部温度告警 (>85°C)',
    code: '#TRX-022',
    status: 'processing',
    level: 'warning'
  },
  {
    id: '3',
    device: '充电桩 #02',
    location: '#CP-002',
    time: '昨天',
    message: '通信故障',
    code: '#CP-002',
    status: 'pending',
    level: 'info'
  },
  {
    id: '4',
    device: '储能单元 #1',
    location: 'M. Scott',
    time: '昨天',
    message: '检测到电芯不平衡',
    code: '#BAT-001',
    status: 'processing',
    level: 'critical',
    user: 'M. Scott'
  },
  {
    id: '5',
    device: '安全门 A',
    location: '#SEC-A',
    time: '2天前',
    message: '门禁传感器故障',
    code: '#SEC-A',
    status: 'resolved',
    level: 'info'
  }
];

// Mock data for charts
export const powerLoadData = [
  { time: '00:00', generation: 0, load: 10 },
  { time: '04:00', generation: 0, load: 15 },
  { time: '08:00', generation: 20, load: 25 },
  { time: '12:00', generation: 85, load: 40 },
  { time: '16:00', generation: 60, load: 55 },
  { time: '20:00', generation: 10, load: 70 },
  { time: '24:00', generation: 0, load: 30 },
];

export const financeData = [
  { name: '1月', income: 80, expense: 60 },
  { name: '2月', income: 110, expense: 70 },
  { name: '3月', income: 130, expense: 65 },
  { name: '4月', income: 100, expense: 80 },
  { name: '5月', income: 140, expense: 90 },
  { name: '6月', income: 160, expense: 95 },
];

export const costBreakdown = [
  { name: '电费支出', value: 60, fill: '#0f7ae6' },
  { name: '维护支出', value: 25, fill: '#60a5fa' },
  { name: '运营支出', value: 15, fill: '#93c5fd' },
];

// New data for the 3 charts
export const pvRealtimeData = [
  { time: '00:00', value: 0.8 },
  { time: '04:00', value: 1.5 },
  { time: '08:00', value: 3.2 },
  { time: '12:00', value: 4.0 },
  { time: '16:00', value: 3.5 },
  { time: '18:00', value: 5.5 }, // Peak near end as per screenshot style
  { time: '20:00', value: 4.8 },
  { time: '24:00', value: 5.2 },
];

export const batteryCycleData = [
  { time: '00:00', charge: 20, discharge: 15 },
  { time: '04:00', charge: 22, discharge: 14 },
  { time: '08:00', charge: 25, discharge: 10 },
  { time: '12:00', charge: 26, discharge: 8 },
  { time: '16:00', charge: 24, discharge: 10 },
  { time: '20:00', charge: 21, discharge: 12 },
  { time: '24:00', charge: 22, discharge: 11 },
];

export const chargerUtilizationData = [
  { day: '周一', value: 45 },
  { day: '周二', value: 52 },
  { day: '周三', value: 58 },
  { day: '周四', value: 65 },
  { day: '周五', value: 50 },
  { day: '周六', value: 72 },
  { day: '周日', value: 75 },
];

// 财务分析完整数据
export const financialAnalysisData = {
  // 核心收益 Header
  header: {
    totalRevenue: 124592.45,        // 本年累计总收益
    monthOverMonth: 12.5,           // 环比增长率 %
    co2Reduction: 86.5,             // 累计减排CO₂ (吨)
  },

  // 关键指标 Bento Grid (2x2)
  keyMetrics: {
    roi: 18.4,                      // 投资回报率 %
    staticPayback: 6.8,             // 静态回收期 (年)
    pvSelfUseRate: 82,              // 光伏自用率 %
    avgChargerUtilization: 68,      // 平均充电利用率 %
    batteryCycles: 235,             // 储能循环次数
  },

  // 节省成本明细
  costSavings: {
    peakValleyArbitrage: 28500,     // 峰谷套利收益
    pvSelfUseSavings: 12800,        // 光伏自用节省
    demandChargeSavings: 3900,      // 需量电费节省
    total: 45200,                   // 总节省
  },

  // 月度财务数据 (用于组合图)
  monthlyData: [
    { month: '1月', income: 8000, expense: 6000, cumulativeProfit: 2000 },
    { month: '2月', income: 11000, expense: 7000, cumulativeProfit: 6000 },
    { month: '3月', income: 13000, expense: 6500, cumulativeProfit: 12500 },
    { month: '4月', income: 10000, expense: 8000, cumulativeProfit: 14500 },
    { month: '5月', income: 14000, expense: 9000, cumulativeProfit: 19500 },
    { month: '6月', income: 16000, expense: 9500, cumulativeProfit: 26000 },
    { month: '7月', income: 15500, expense: 8500, cumulativeProfit: 33000 },
    { month: '8月', income: 17000, expense: 9000, cumulativeProfit: 41000 },
    { month: '9月', income: 14500, expense: 8000, cumulativeProfit: 47500 },
    { month: '10月', income: 13000, expense: 7500, cumulativeProfit: 53000 },
    { month: '11月', income: 12000, expense: 7000, cumulativeProfit: 58000 },
    { month: '12月', income: 18000, expense: 10000, cumulativeProfit: 66000 },
  ],

  // 年度财务数据 (用于年度视图)
  yearlyData: [
    { year: '2022', income: 98000, expense: 72000, cumulativeProfit: 26000 },
    { year: '2023', income: 115000, expense: 78000, cumulativeProfit: 63000 },
    { year: '2024', income: 124592, expense: 82000, cumulativeProfit: 105592 },
  ],
};

// 站点概览数据类型接口
interface StationOverviewDataType {
  site_info: {
    name: string;
    status: 'normal' | 'warning' | 'fault';
    design_capacity: { pv_kwp: number; ess_capacity_kwh: number; ess_power_kw: number; charger_count: number };
    environment: { weather: 'sunny' | 'cloudy' | 'rainy'; irradiance: number; temperature: number };
  };
  realtime_flow: {
    pv: { power_kw: number; daily_energy_kwh: number; status: 'generating' | 'standby' | 'fault'; pr_value: number; inverter_online: number; inverter_total: number };
    grid: { power_kw: number; daily_import_kwh: number; daily_export_kwh: number; status: 'exporting' | 'importing' | 'idle' };
    ess: { power_kw: number; soc: number; soh: number; status: 'charging' | 'discharging' | 'standby'; temp_max: number; temp_min: number; strategy: 'peak_shaving' | 'demand_response' | 'backup' };
    ev_charger: { power_kw: number; daily_charged_kwh: number; active_guns: number; total_guns: number; daily_orders: number; status: 'running' | 'standby' | 'fault' };
  };
  energy_flows: Array<{ from: string; to: string; power_kw: number; active: boolean }>;
}

// 站点概览数据（站点1作为默认）
export const stationOverviewData: StationOverviewDataType = {
  site_info: {
    name: "上海张江光储充示范站",
    status: "normal",
    design_capacity: { pv_kwp: 500, ess_capacity_kwh: 1000, ess_power_kw: 200, charger_count: 10 },
    environment: { weather: "sunny", irradiance: 920, temperature: 26 }
  },
  realtime_flow: {
    pv: { power_kw: 385.2, daily_energy_kwh: 1520.5, status: "generating", pr_value: 92.3, inverter_online: 5, inverter_total: 5 },
    grid: { power_kw: 45.8, daily_import_kwh: 20.0, daily_export_kwh: 185.0, status: "exporting" },
    ess: { power_kw: 85.0, soc: 72, soh: 98, status: "charging", temp_max: 32, temp_min: 28, strategy: "peak_shaving" },
    ev_charger: { power_kw: 254.4, daily_charged_kwh: 680.0, active_guns: 7, total_guns: 10, daily_orders: 45, status: "running" }
  },
  energy_flows: [
    { from: "pv", to: "ems", power_kw: 385.2, active: true },
    { from: "ems", to: "grid", power_kw: 45.8, active: true },
    { from: "ems", to: "ess", power_kw: 85.0, active: true },
    { from: "ems", to: "ev_charger", power_kw: 254.4, active: true }
  ]
};

// 每个站点的概览数据
const stationOverviewDataMap: Record<string, StationOverviewDataType> = {
  '1': stationOverviewData,
  '2': {
    site_info: { name: "北京望京光储电站", status: "normal" as const, design_capacity: { pv_kwp: 300, ess_capacity_kwh: 600, ess_power_kw: 100, charger_count: 0 }, environment: { weather: "cloudy" as const, irradiance: 650, temperature: 18 } },
    realtime_flow: { pv: { power_kw: 168.5, daily_energy_kwh: 720.3, status: "generating" as const, pr_value: 88.6, inverter_online: 3, inverter_total: 3 }, grid: { power_kw: 32.5, daily_import_kwh: 45.0, daily_export_kwh: 120.0, status: "exporting" as const }, ess: { power_kw: 136.0, soc: 45, soh: 97, status: "discharging" as const, temp_max: 28, temp_min: 24, strategy: "peak_shaving" as const }, ev_charger: { power_kw: 0, daily_charged_kwh: 0, active_guns: 0, total_guns: 0, daily_orders: 0, status: "standby" as const } },
    energy_flows: [{ from: "pv", to: "ems", power_kw: 168.5, active: true }, { from: "ess", to: "ems", power_kw: 136.0, active: true }, { from: "ems", to: "grid", power_kw: 32.5, active: true }]
  },
  '3': {
    site_info: { name: "深圳南山光伏电站", status: "warning" as const, design_capacity: { pv_kwp: 800, ess_capacity_kwh: 0, ess_power_kw: 0, charger_count: 0 }, environment: { weather: "sunny" as const, irradiance: 980, temperature: 32 } },
    realtime_flow: { pv: { power_kw: 625.8, daily_energy_kwh: 2850.0, status: "generating" as const, pr_value: 85.2, inverter_online: 7, inverter_total: 8 }, grid: { power_kw: 625.8, daily_import_kwh: 0, daily_export_kwh: 2850.0, status: "exporting" as const }, ess: { power_kw: 0, soc: 0, soh: 0, status: "standby" as const, temp_max: 0, temp_min: 0, strategy: "peak_shaving" as const }, ev_charger: { power_kw: 0, daily_charged_kwh: 0, active_guns: 0, total_guns: 0, daily_orders: 0, status: "standby" as const } },
    energy_flows: [{ from: "pv", to: "ems", power_kw: 625.8, active: true }, { from: "ems", to: "grid", power_kw: 625.8, active: true }]
  },
  '4': {
    site_info: { name: "杭州西湖光储充站", status: "normal" as const, design_capacity: { pv_kwp: 200, ess_capacity_kwh: 500, ess_power_kw: 100, charger_count: 8 }, environment: { weather: "cloudy" as const, irradiance: 580, temperature: 22 } },
    realtime_flow: { pv: { power_kw: 95.2, daily_energy_kwh: 420.5, status: "generating" as const, pr_value: 90.1, inverter_online: 2, inverter_total: 2 }, grid: { power_kw: 15.8, daily_import_kwh: 85.0, daily_export_kwh: 25.0, status: "importing" as const }, ess: { power_kw: 45.0, soc: 82, soh: 99, status: "discharging" as const, temp_max: 30, temp_min: 26, strategy: "demand_response" as const }, ev_charger: { power_kw: 156.0, daily_charged_kwh: 380.0, active_guns: 5, total_guns: 8, daily_orders: 32, status: "running" as const } },
    energy_flows: [{ from: "pv", to: "ems", power_kw: 95.2, active: true }, { from: "ess", to: "ems", power_kw: 45.0, active: true }, { from: "grid", to: "ems", power_kw: 15.8, active: true }, { from: "ems", to: "ev_charger", power_kw: 156.0, active: true }]
  },
  '5': {
    site_info: { name: "成都高新光储站", status: "normal" as const, design_capacity: { pv_kwp: 150, ess_capacity_kwh: 300, ess_power_kw: 60, charger_count: 0 }, environment: { weather: "rainy" as const, irradiance: 320, temperature: 20 } },
    realtime_flow: { pv: { power_kw: 35.8, daily_energy_kwh: 180.0, status: "generating" as const, pr_value: 75.2, inverter_online: 2, inverter_total: 2 }, grid: { power_kw: 24.2, daily_import_kwh: 120.0, daily_export_kwh: 15.0, status: "importing" as const }, ess: { power_kw: 60.0, soc: 35, soh: 96, status: "discharging" as const, temp_max: 26, temp_min: 22, strategy: "backup" as const }, ev_charger: { power_kw: 0, daily_charged_kwh: 0, active_guns: 0, total_guns: 0, daily_orders: 0, status: "standby" as const } },
    energy_flows: [{ from: "pv", to: "ems", power_kw: 35.8, active: true }, { from: "ess", to: "ems", power_kw: 60.0, active: true }, { from: "grid", to: "ems", power_kw: 24.2, active: true }]
  },
  '6': {
    site_info: { name: "广州天河光伏站", status: "fault" as const, design_capacity: { pv_kwp: 600, ess_capacity_kwh: 0, ess_power_kw: 0, charger_count: 0 }, environment: { weather: "sunny" as const, irradiance: 890, temperature: 30 } },
    realtime_flow: { pv: { power_kw: 0, daily_energy_kwh: 850.0, status: "fault" as const, pr_value: 0, inverter_online: 0, inverter_total: 6 }, grid: { power_kw: 0, daily_import_kwh: 0, daily_export_kwh: 850.0, status: "idle" as const }, ess: { power_kw: 0, soc: 0, soh: 0, status: "standby" as const, temp_max: 0, temp_min: 0, strategy: "peak_shaving" as const }, ev_charger: { power_kw: 0, daily_charged_kwh: 0, active_guns: 0, total_guns: 0, daily_orders: 0, status: "standby" as const } },
    energy_flows: []
  }
};

// 根据站点ID获取站点概览数据
export const getStationOverviewData = (stationId: string) => {
  return stationOverviewDataMap[stationId] || stationOverviewData;
};

// 设备深度分析数据 (Device Deep Dive Diagnostic)
export const deviceAnalysisData = {
  header: {
    comms: { type: '4G', signalStrength: -80 }, // dBm
    systemState: 'Grid-Connected', // Grid-Connected, Islanding, Fault
    activeAlarms: 0
  },
  battery: {
    // 电芯一致性
    cellConsistency: {
      minVoltage: 3.21,
      maxVoltage: 3.26,
      delta: 0.05,
      threshold: 0.1 // 告警阈值
    },
    // 温度热力图 (8行 x 12列 = 96个电芯)
    thermalMatrix: (() => {
      const cells = [];
      for (let row = 1; row <= 8; row++) {
        for (let col = 1; col <= 12; col++) {
          // 基础温度 25-35°C，随机波动
          let baseTemp = 25 + Math.random() * 10;
          // 模拟几个热点
          if ((row === 3 && col === 7) || (row === 6 && col === 4)) {
            baseTemp = 42 + Math.random() * 8; // 热点 40-50°C
          }
          if (row === 5 && col === 10) {
            baseTemp = 48 + Math.random() * 5; // 超限热点
          }
          cells.push({
            id: `${row}-${col}`,
            row,
            col,
            temp: Math.round(baseTemp * 10) / 10,
            voltage: 3.2 + Math.random() * 0.1
          });
        }
      }
      return cells;
    })(),
    // 温度统计
    tempStats: {
      min: 24.5,
      max: 51.2,
      avg: 29.8,
      hotspots: 3
    }
  },
  inverter: {
    dc: {
      voltage: 750.5, // V
      current: 120.2, // A
      power: 90.2     // kW
    },
    ac: {
      voltage: 380.1, // V
      frequency: 50.02, // Hz
      powerFactor: 0.99
    },
    igbtTemp: 68.5, // °C
    onlineCount: 5,
    totalCount: 5
  },
  charger: {
    guns: [
      { id: '01', state: 'Charging', power: 62.5, soc: 45, current: 150, voltage: 400, orderId: 'ORD20260106001' },
      { id: '02', state: 'Idle', power: 0, soc: 0, current: 0, voltage: 0, orderId: '' },
      { id: '03', state: 'Charging', power: 58.2, soc: 72, current: 145, voltage: 401, orderId: 'ORD20260106002' },
      { id: '04', state: 'Charging', power: 45.0, soc: 28, current: 112, voltage: 400, orderId: 'ORD20260106003' },
      { id: '05', state: 'Fault', power: 0, soc: 0, current: 0, voltage: 0, orderId: '' },
      { id: '06', state: 'Idle', power: 0, soc: 0, current: 0, voltage: 0, orderId: '' },
      { id: '07', state: 'Charging', power: 120.0, soc: 55, current: 300, voltage: 400, orderId: 'ORD20260106004' },
      { id: '08', state: 'Offline', power: 0, soc: 0, current: 0, voltage: 0, orderId: '' },
      { id: '09', state: 'Idle', power: 0, soc: 0, current: 0, voltage: 0, orderId: '' },
      { id: '10', state: 'Charging', power: 80.5, soc: 88, current: 200, voltage: 402, orderId: 'ORD20260106005' },
      { id: '11', state: 'Fault', power: 0, soc: 0, current: 0, voltage: 0, orderId: '' },
      { id: '12', state: 'Idle', power: 0, soc: 0, current: 0, voltage: 0, orderId: '' }
    ]
  }
};
