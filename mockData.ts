import { Station, Alarm } from './types';

export const stations: Station[] = [
  {
    id: '1',
    name: '光伏电站 Alpha-01',
    address: '纽约工业园 123号',
    status: 'online',
    pvPower: '450 kWp',
    storage: '800 kWh',
    chargers: '4 台',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAB5BWZ_qpD1TKlcG0A0QRlyLiqyCbiVUWn_N2C_J-m3vYbkxdR-YPhJ7_sqFsdOpuvsI9NtUvIJlZoFBQtdbWLAdqYmbvxBfqXNjnX5_Fg-PFjS6RA4Yr860sVls-CKgPvMEvfHdOBir1SoPg6v0IxZo8UyUOv2Rfp4asm7bxHWa_FuHD4KAHFGoJ8pVH5iEkQGWIshWDs1rIHjy3DaSSS-x-cm_Nc6EBeFPOk1dQfGeMPhZuO45euJON8eD77_HrTf5XOgrekUpo',
    coordinates: { x: 50, y: 40 }
  },
  {
    id: '2',
    name: '储能中心 Beta',
    address: '加州电网路 456号',
    status: 'alarm',
    pvPower: '120 kWp',
    storage: '2.5 MWh',
    chargers: '2 台',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAq_BaIFYhj3lv1S8eHqcQmgNWWHlAaYoE0kHgfw6u0TLIkplSCiL-u1o0X3Rnz1oAsGEFtQJEYzHSK1zuWDNVuQuEz85xmx41uszuPeegY-qOHKpygZydnZ8bPWkIB51JRSMK_P3gECUzDqsOvbxQei0Al9bFMSEeLdNdHAqhFXqbxpzPVawvQD6-2-xtmQ12DEbJthHZyL7elgxSE4BIMzFzcZg8K1x4uI4eioJv_eHgvwQce4Lz6SeGeB1f1k_mFtN3Hl4ff6VA',
    coordinates: { x: 20, y: 65 }
  },
  {
    id: '3',
    name: '充电站 Delta',
    address: '德州高速路 789号',
    status: 'offline',
    pvPower: '50 kWp',
    storage: '100 kWh',
    chargers: '16 台',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8Q2eYLbGTacZNg1x6baroasf0CooMFb7cnfXkGHh9jkndF5kkLpCjbCwuA0GxPo4fIK_h8NFn6xTwsYee3tGuXYJH8vbDCuyrQXVVR5R8kQMgs8NIPA1rf7t0GwmLVfc_QRCmXNS5OXxMVbQjy8crCO2kam0F5-Ts5HjtrpEKwHHjPChRNXGwkLGEBvKU_1bbbPkpK8ocTYVAqyQ78NIU9zU6jUs_IJQ0ODK6NE3uxI4o92dWMTWWNa1daugwQ0Y4yv_rEP16z1Y',
    coordinates: { x: 80, y: 20 }
  },
  {
    id: '4',
    name: '风电场 X-Ray',
    address: '科罗拉多州风岭 101号',
    status: 'online',
    pvPower: '1.2 MWp',
    storage: '3.0 MWh',
    chargers: '--',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvO9d9ISIl4EIP8UxNIFyjxPBZykbqDN-rOzsQlSU7DUu4ZVLhryhGnqetsYlk-xDOdwdB5V6rFmHZHBJr7Oxui-6ms2ogdu1PXLRFAq3dhHegPPP00itJS2MY6ORCyx304hX8tXYQBjnXPoDWCLFNTqchInoSCjXKsPR_Ue1yx7jQkfXLgcE6XcMkL9Fx9fwxA6cI1Lo08LE4bLdEWY9W8H2WgJ4xqITVcWh-mmwQiYobpbVGwWW0a1qPJypf6VBwNFNzmwDnzLw',
    coordinates: { x: 60, y: 80 }
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

// 站点概览仪表盘数据
export const stationOverviewData = {
  site_info: {
    name: "A站-西翼",
    status: "normal" as const, // normal | warning | fault
    design_capacity: {
      pv_kwp: 150,
      ess_capacity_kwh: 200,
      ess_power_kw: 100,
      charger_count: 10
    },
    environment: {
      weather: "sunny" as const, // sunny | cloudy | rainy
      irradiance: 850,  // W/m²
      temperature: 28   // °C
    }
  },
  realtime_flow: {
    pv: {
      power_kw: 45.2,
      daily_energy_kwh: 120.5,
      status: "generating" as const,  // generating | standby | fault
      pr_value: 85.2,        // Performance Ratio %
      inverter_online: 3,
      inverter_total: 3
    },
    grid: {
      power_kw: 15.5,
      daily_import_kwh: 50.0,
      daily_export_kwh: 12.0,
      status: "importing" as const    // importing | exporting | idle
    },
    ess: {
      power_kw: 20.0,
      soc: 82,
      soh: 98,
      status: "discharging" as const, // charging | discharging | standby
      temp_max: 32,
      temp_min: 28,
      strategy: "peak_shaving" as const // peak_shaving | demand_response | backup
    },
    ev_charger: {
      power_kw: 80.7,
      daily_charged_kwh: 310.0,
      active_guns: 6,
      total_guns: 10,
      daily_orders: 42,
      status: "running" as const      // running | standby | fault
    }
  },
  // 能量流向定义
  energy_flows: [
    { from: "pv", to: "ems", power_kw: 45.2, active: true },
    { from: "grid", to: "ems", power_kw: 15.5, active: true },
    { from: "ems", to: "ev_charger", power_kw: 80.7, active: true },
    { from: "ess", to: "ems", power_kw: 20.0, active: true }
  ]
};
