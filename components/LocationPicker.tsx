import React, { useState, useEffect } from 'react';
import { chinaRegions, Region, getCities, getDistricts } from '../data/chinaRegions';

export interface SelectedLocation {
    province?: Region;
    city?: Region;
    district?: Region;
}

interface LocationPickerProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (location: SelectedLocation) => void;
    initialLocation?: SelectedLocation;
}

const LocationPicker: React.FC<LocationPickerProps> = ({
    isOpen,
    onClose,
    onConfirm,
    initialLocation,
}) => {
    const [selectedProvince, setSelectedProvince] = useState<Region | null>(
        initialLocation?.province || null
    );
    const [selectedCity, setSelectedCity] = useState<Region | null>(
        initialLocation?.city || null
    );
    const [selectedDistrict, setSelectedDistrict] = useState<Region | null>(
        initialLocation?.district || null
    );

    const [cities, setCities] = useState<Region[]>([]);
    const [districts, setDistricts] = useState<Region[]>([]);

    useEffect(() => {
        if (selectedProvince) {
            const cityList = getCities(selectedProvince.code);
            setCities(cityList);
            setSelectedCity(null);
            setSelectedDistrict(null);
            setDistricts([]);
        } else {
            setCities([]);
            setDistricts([]);
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedProvince && selectedCity) {
            const districtList = getDistricts(selectedProvince.code, selectedCity.code);
            setDistricts(districtList);
            setSelectedDistrict(null);
        } else {
            setDistricts([]);
        }
    }, [selectedCity, selectedProvince]);

    const handleConfirm = () => {
        onConfirm({
            province: selectedProvince || undefined,
            city: selectedCity || undefined,
            district: selectedDistrict || undefined,
        });
        onClose();
    };

    const handleReset = () => {
        setSelectedProvince(null);
        setSelectedCity(null);
        setSelectedDistrict(null);
        setCities([]);
        setDistricts([]);
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
                onClick={onClose}
            />

            {/* Bottom Sheet - Glass Style */}
            <div className="fixed bottom-0 left-0 right-0 bg-glass-light dark:bg-glass-dark backdrop-blur-2xl rounded-t-3xl z-50 animate-slide-up max-h-[70vh] flex flex-col shadow-2xl border-t border-glass-border-light dark:border-glass-border-dark">
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/20 dark:border-white/10 shrink-0">
                    <button
                        onClick={handleReset}
                        className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 font-medium"
                    >
                        重置
                    </button>
                    <span className="text-base font-bold text-slate-900 dark:text-white">
                        选择位置
                    </span>
                    <button
                        onClick={handleConfirm}
                        className="text-sm font-semibold text-primary hover:text-primary-dark"
                    >
                        确定
                    </button>
                </div>

                {/* Selection Summary */}
                <div className="px-5 py-3 bg-white/30 dark:bg-black/20 text-xs text-slate-600 dark:text-slate-400 shrink-0 border-b border-white/10">
                    <span className="text-slate-500">已选：</span>
                    <span className="text-slate-900 dark:text-white font-semibold ml-1">
                        {selectedProvince?.name || '请选择省份'}
                        {selectedCity && ` / ${selectedCity.name}`}
                        {selectedDistrict && ` / ${selectedDistrict.name}`}
                    </span>
                </div>

                {/* Three Column Picker */}
                <div className="flex flex-1 min-h-0">
                    {/* Province Column */}
                    <div className="flex-1 border-r border-white/10 dark:border-white/5 overflow-y-auto no-scrollbar bg-white/20 dark:bg-black/10">
                        <div className="py-2">
                            {chinaRegions.map((province) => (
                                <button
                                    key={province.code}
                                    onClick={() => setSelectedProvince(province)}
                                    className={`w-full px-4 py-3 text-left text-sm transition-all ${selectedProvince?.code === province.code
                                            ? 'bg-primary/15 text-primary font-semibold border-r-2 border-primary'
                                            : 'text-slate-700 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-white/10'
                                        }`}
                                >
                                    {province.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* City Column */}
                    <div className="flex-1 border-r border-white/10 dark:border-white/5 overflow-y-auto no-scrollbar bg-white/10 dark:bg-black/20">
                        <div className="py-2">
                            {cities.length === 0 ? (
                                <div className="px-4 py-10 text-center text-sm text-slate-400">
                                    ← 请先选择省份
                                </div>
                            ) : (
                                cities.map((city) => (
                                    <button
                                        key={city.code}
                                        onClick={() => setSelectedCity(city)}
                                        className={`w-full px-4 py-3 text-left text-sm transition-all ${selectedCity?.code === city.code
                                                ? 'bg-primary/15 text-primary font-semibold border-r-2 border-primary'
                                                : 'text-slate-700 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-white/10'
                                            }`}
                                    >
                                        {city.name}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>

                    {/* District Column */}
                    <div className="flex-1 overflow-y-auto no-scrollbar">
                        <div className="py-2">
                            {districts.length === 0 ? (
                                <div className="px-4 py-10 text-center text-sm text-slate-400">
                                    {selectedCity ? '暂无区县' : '← 请先选择城市'}
                                </div>
                            ) : (
                                districts.map((district) => (
                                    <button
                                        key={district.code}
                                        onClick={() => setSelectedDistrict(district)}
                                        className={`w-full px-4 py-3 text-left text-sm transition-all ${selectedDistrict?.code === district.code
                                                ? 'bg-primary/15 text-primary font-semibold'
                                                : 'text-slate-700 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-white/10'
                                            }`}
                                    >
                                        {district.name}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Safe Area */}
                <div className="h-8 shrink-0 bg-white/20 dark:bg-black/10"></div>
            </div>
        </>
    );
};

export default LocationPicker;
