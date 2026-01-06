# 光储充管理平台 - 后端 API 接口规范文档

> **版本**: v1.0  
> **更新日期**: 2026-01-06  
> **基础路径**: `/api/v1`

---

## 📋 目录

1. [通用规范](#通用规范)
2. [站点管理](#站点管理)
3. [站点概览](#站点概览)
4. [告警管理](#告警管理)
5. [财务分析](#财务分析)
6. [设备分析](#设备分析)
7. [图表数据](#图表数据)

---

## 通用规范

### 请求头
```http
Content-Type: application/json
Authorization: Bearer <token>
```

### 响应格式
```json
{
  "code": 200,
  "message": "success",
  "data": { ... },
  "timestamp": 1704531600000
}
```

### 错误码
| Code | 说明 |
|------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

---

## 站点管理

### 1. 获取站点列表

**GET** `/stations`

**响应**:
```json
{
  "code": 200,
  "data": [
    {
      "id": "1",
      "name": "上海张江光储充示范站",
      "address": "上海市浦东新区张江高科技园区祖冲之路2288号",
      "status": "online",           // online | alarm | offline
      "pvPower": "500 kWp",
      "storage": "1000 kWh",
      "chargers": "10 台",
      "image": "https://...",
      "lat": 31.2304,
      "lng": 121.4737,
      "config": {
        "hasPV": true,
        "hasESS": true,
        "hasEVSE": true
      }
    }
  ]
}
```

**字段说明**:

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | string | ✅ | 站点唯一标识 |
| name | string | ✅ | 站点名称 |
| address | string | ✅ | 站点地址 |
| status | enum | ✅ | 站点状态: `online` / `alarm` / `offline` |
| pvPower | string | ✅ | 光伏装机容量 (无则显示 "--") |
| storage | string | ✅ | 储能容量 (无则显示 "--") |
| chargers | string | ✅ | 充电桩数量 (无则显示 "--") |
| image | string | ❌ | 站点图片URL |
| lat | number | ✅ | 纬度 (WGS84) |
| lng | number | ✅ | 经度 (WGS84) |
| config.hasPV | boolean | ✅ | 是否有光伏系统 |
| config.hasESS | boolean | ✅ | 是否有储能系统 |
| config.hasEVSE | boolean | ✅ | 是否有充电桩 |

---

## 站点概览

### 2. 获取站点概览数据

**GET** `/stations/{stationId}/overview`

**路径参数**:
| 参数 | 类型 | 说明 |
|------|------|------|
| stationId | string | 站点ID |

**响应**:
```json
{
  "code": 200,
  "data": {
    "site_info": {
      "name": "上海张江光储充示范站",
      "status": "normal",           // normal | warning | fault
      "design_capacity": {
        "pv_kwp": 500,
        "ess_capacity_kwh": 1000,
        "ess_power_kw": 200,
        "charger_count": 10
      },
      "environment": {
        "weather": "sunny",         // sunny | cloudy | rainy
        "irradiance": 920,          // W/m²
        "temperature": 26           // °C
      }
    },
    "realtime_flow": {
      "pv": {
        "power_kw": 385.2,
        "daily_energy_kwh": 1520.5,
        "status": "generating",     // generating | standby | fault
        "pr_value": 92.3,           // Performance Ratio %
        "inverter_online": 5,
        "inverter_total": 5
      },
      "grid": {
        "power_kw": 45.8,
        "daily_import_kwh": 20.0,
        "daily_export_kwh": 185.0,
        "status": "exporting"       // exporting | importing | idle
      },
      "ess": {
        "power_kw": 85.0,
        "soc": 72,                  // State of Charge %
        "soh": 98,                  // State of Health %
        "status": "charging",       // charging | discharging | standby
        "temp_max": 32,             // °C
        "temp_min": 28,             // °C
        "strategy": "peak_shaving"  // peak_shaving | demand_response | backup
      },
      "ev_charger": {
        "power_kw": 254.4,
        "daily_charged_kwh": 680.0,
        "active_guns": 7,
        "total_guns": 10,
        "daily_orders": 45,
        "status": "running"         // running | standby | fault
      }
    },
    "energy_flows": [
      { "from": "pv", "to": "ems", "power_kw": 385.2, "active": true },
      { "from": "ems", "to": "grid", "power_kw": 45.8, "active": true },
      { "from": "ems", "to": "ess", "power_kw": 85.0, "active": true },
      { "from": "ems", "to": "ev_charger", "power_kw": 254.4, "active": true }
    ]
  }
}
```

**energy_flows 节点说明**:
| 节点名 | 说明 |
|--------|------|
| pv | 光伏系统 |
| ess | 储能系统 |
| grid | 电网 |
| ev_charger | 充电桩 |
| ems | 能量管理系统 (中心节点) |

---

## 告警管理

### 3. 获取告警列表

**GET** `/stations/{stationId}/alarms`

**查询参数**:
| 参数 | 类型 | 说明 |
|------|------|------|
| status | string | 可选，筛选状态: `pending` / `processing` / `resolved` |
| level | string | 可选，筛选级别: `critical` / `warning` / `info` |

**响应**:
```json
{
  "code": 200,
  "data": [
    {
      "id": "1",
      "device": "逆变器 #4 - 北翼",
      "location": "#INV-004",
      "time": "10:42",              // 相对时间或具体时间
      "message": "直流输入电压过低",
      "code": "#INV-004",
      "status": "pending",          // pending | processing | resolved
      "level": "critical",          // critical | warning | info
      "user": ""                    // 处理人 (可选)
    }
  ]
}
```

**告警级别样式建议**:
| Level | 颜色 | 说明 |
|-------|------|------|
| critical | 红色 | 严重告警，需立即处理 |
| warning | 橙色 | 警告，需关注 |
| info | 蓝色 | 信息提示 |

---

## 财务分析

### 4. 获取财务分析数据

**GET** `/stations/{stationId}/financial-analysis`

**响应**:
```json
{
  "code": 200,
  "data": {
    "header": {
      "totalRevenue": 124592.45,    // 本年累计总收益 (元)
      "monthOverMonth": 12.5,       // 环比增长率 (%)
      "co2Reduction": 86.5          // 累计减排CO₂ (吨)
    },
    "keyMetrics": {
      "roi": 18.4,                  // 投资回报率 (%)
      "staticPayback": 6.8,         // 静态回收期 (年)
      "pvSelfUseRate": 82,          // 光伏自用率 (%)
      "avgChargerUtilization": 68,  // 平均充电利用率 (%)
      "batteryCycles": 235          // 储能循环次数 (次)
    },
    "costSavings": {
      "peakValleyArbitrage": 28500, // 峰谷套利收益 (元)
      "pvSelfUseSavings": 12800,    // 光伏自用节省 (元)
      "demandChargeSavings": 3900,  // 需量电费节省 (元)
      "total": 45200                // 总节省 (元)
    },
    "monthlyData": [
      {
        "month": "1月",
        "income": 8000,
        "expense": 6000,
        "cumulativeProfit": 2000
      }
      // ... 共12个月
    ],
    "yearlyData": [
      {
        "year": "2024",
        "income": 124592,
        "expense": 82000,
        "cumulativeProfit": 105592
      }
    ]
  }
}
```

---

## 设备分析

### 5. 获取设备深度分析数据

**GET** `/stations/{stationId}/device-analysis`

**响应**:
```json
{
  "code": 200,
  "data": {
    "header": {
      "comms": {
        "type": "4G",               // 通信类型
        "signalStrength": -80       // 信号强度 (dBm)
      },
      "systemState": "Grid-Connected",  // Grid-Connected | Islanding | Fault
      "activeAlarms": 0
    },
    "battery": {
      "cellConsistency": {
        "minVoltage": 3.21,         // 最低电压 (V)
        "maxVoltage": 3.26,         // 最高电压 (V)
        "delta": 0.05,              // 压差 (V)
        "threshold": 0.1            // 告警阈值 (V)
      },
      "thermalMatrix": [
        {
          "id": "1-1",
          "row": 1,
          "col": 1,
          "temp": 28.5,             // 温度 (°C)
          "voltage": 3.24           // 电压 (V)
        }
        // 8行 x 12列 = 96个电芯
      ],
      "tempStats": {
        "min": 24.5,
        "max": 51.2,
        "avg": 29.8,
        "hotspots": 3               // 热点数量
      }
    },
    "inverter": {
      "dc": {
        "voltage": 750.5,           // V
        "current": 120.2,           // A
        "power": 90.2               // kW
      },
      "ac": {
        "voltage": 380.1,           // V
        "frequency": 50.02,         // Hz
        "powerFactor": 0.99
      },
      "igbtTemp": 68.5,             // °C
      "onlineCount": 5,
      "totalCount": 5
    },
    "charger": {
      "guns": [
        {
          "id": "01",
          "state": "Charging",      // Charging | Idle | Fault | Offline
          "power": 62.5,            // kW
          "soc": 45,                // %
          "current": 150,           // A
          "voltage": 400,           // V
          "orderId": "ORD20260106001"
        }
      ]
    }
  }
}
```

---

## 图表数据

### 6. 获取功率/负荷曲线数据

**GET** `/stations/{stationId}/charts/power-load`

**查询参数**:
| 参数 | 类型 | 说明 |
|------|------|------|
| date | string | 日期 YYYY-MM-DD |

**响应**:
```json
{
  "code": 200,
  "data": [
    { "time": "00:00", "generation": 0, "load": 10 },
    { "time": "04:00", "generation": 0, "load": 15 },
    { "time": "08:00", "generation": 20, "load": 25 },
    { "time": "12:00", "generation": 85, "load": 40 },
    { "time": "16:00", "generation": 60, "load": 55 },
    { "time": "20:00", "generation": 10, "load": 70 },
    { "time": "24:00", "generation": 0, "load": 30 }
  ]
}
```

---

### 7. 获取光伏实时发电数据

**GET** `/stations/{stationId}/charts/pv-realtime`

**响应**:
```json
{
  "code": 200,
  "data": [
    { "time": "00:00", "value": 0.8 },
    { "time": "04:00", "value": 1.5 },
    { "time": "08:00", "value": 3.2 }
    // ...
  ]
}
```

---

### 8. 获取储能充放电数据

**GET** `/stations/{stationId}/charts/battery-cycle`

**响应**:
```json
{
  "code": 200,
  "data": [
    { "time": "00:00", "charge": 20, "discharge": 15 },
    { "time": "04:00", "charge": 22, "discharge": 14 }
    // ...
  ]
}
```

---

### 9. 获取充电桩利用率数据

**GET** `/stations/{stationId}/charts/charger-utilization`

**响应**:
```json
{
  "code": 200,
  "data": [
    { "day": "周一", "value": 45 },
    { "day": "周二", "value": 52 }
    // ...
  ]
}
```

---

## 📝 对接注意事项

1. **时间格式**: 建议使用 ISO 8601 格式 (`2026-01-06T10:42:00+08:00`)
2. **数值精度**: 功率保留1位小数，百分比保留整数
3. **空值处理**: 没有的设备数据返回默认值 (如 `power_kw: 0`)
4. **实时性**: 概览数据建议 5-10 秒刷新一次
5. **地图坐标**: 使用 GCJ-02 坐标系 (高德/腾讯地图)

---

## 🔄 WebSocket 实时推送 (可选)

**连接地址**: `ws://api.example.com/ws/stations/{stationId}`

**推送消息类型**:
```json
{
  "type": "realtime_flow",      // 实时功率流
  "data": { ... }
}
```

```json
{
  "type": "alarm",              // 新告警
  "data": { ... }
}
```
