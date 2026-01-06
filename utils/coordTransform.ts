/**
 * 坐标转换工具
 * WGS84 (GPS坐标) <-> GCJ02 (火星坐标/高德坐标)
 */

const PI = Math.PI;
const AXIS = 6378245.0; // 长半轴
const OFFSET = 0.00669342162296594323; // 扁率

/**
 * 判断坐标是否在中国境内
 */
function outOfChina(lng: number, lat: number): boolean {
    return !(lng > 73.66 && lng < 135.05 && lat > 3.86 && lat < 53.55);
}

/**
 * 转换纬度
 */
function transformLat(x: number, y: number): number {
    let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    ret += ((20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0) / 3.0;
    ret += ((20.0 * Math.sin(y * PI) + 40.0 * Math.sin((y / 3.0) * PI)) * 2.0) / 3.0;
    ret += ((160.0 * Math.sin((y / 12.0) * PI) + 320.0 * Math.sin((y * PI) / 30.0)) * 2.0) / 3.0;
    return ret;
}

/**
 * 转换经度
 */
function transformLng(x: number, y: number): number {
    let ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    ret += ((20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0) / 3.0;
    ret += ((20.0 * Math.sin(x * PI) + 40.0 * Math.sin((x / 3.0) * PI)) * 2.0) / 3.0;
    ret += ((150.0 * Math.sin((x / 12.0) * PI) + 300.0 * Math.sin((x / 30.0) * PI)) * 2.0) / 3.0;
    return ret;
}

/**
 * WGS84 转 GCJ02 (GPS坐标 -> 高德坐标)
 * @param lng 经度
 * @param lat 纬度
 * @returns [经度, 纬度] GCJ02坐标
 */
export function wgs84ToGcj02(lng: number, lat: number): [number, number] {
    if (outOfChina(lng, lat)) {
        return [lng, lat];
    }

    let dLat = transformLat(lng - 105.0, lat - 35.0);
    let dLng = transformLng(lng - 105.0, lat - 35.0);

    const radLat = (lat / 180.0) * PI;
    let magic = Math.sin(radLat);
    magic = 1 - OFFSET * magic * magic;
    const sqrtMagic = Math.sqrt(magic);

    dLat = (dLat * 180.0) / (((AXIS * (1 - OFFSET)) / (magic * sqrtMagic)) * PI);
    dLng = (dLng * 180.0) / ((AXIS / sqrtMagic) * Math.cos(radLat) * PI);

    const mgLat = lat + dLat;
    const mgLng = lng + dLng;

    return [mgLng, mgLat];
}

/**
 * GCJ02 转 WGS84 (高德坐标 -> GPS坐标)
 * @param lng 经度
 * @param lat 纬度
 * @returns [经度, 纬度] WGS84坐标
 */
export function gcj02ToWgs84(lng: number, lat: number): [number, number] {
    if (outOfChina(lng, lat)) {
        return [lng, lat];
    }

    let dLat = transformLat(lng - 105.0, lat - 35.0);
    let dLng = transformLng(lng - 105.0, lat - 35.0);

    const radLat = (lat / 180.0) * PI;
    let magic = Math.sin(radLat);
    magic = 1 - OFFSET * magic * magic;
    const sqrtMagic = Math.sqrt(magic);

    dLat = (dLat * 180.0) / (((AXIS * (1 - OFFSET)) / (magic * sqrtMagic)) * PI);
    dLng = (dLng * 180.0) / ((AXIS / sqrtMagic) * Math.cos(radLat) * PI);

    const mgLat = lat + dLat;
    const mgLng = lng + dLng;

    return [lng * 2 - mgLng, lat * 2 - mgLat];
}

/**
 * 批量转换WGS84坐标到GCJ02
 */
export function batchWgs84ToGcj02(
    coords: Array<{ lng: number; lat: number }>
): Array<{ lng: number; lat: number }> {
    return coords.map(({ lng, lat }) => {
        const [gcjLng, gcjLat] = wgs84ToGcj02(lng, lat);
        return { lng: gcjLng, lat: gcjLat };
    });
}
