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
