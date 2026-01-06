import React from 'react';

interface WeatherData {
    city: string;
    weather: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'overcast';
    temperature: number;
}

const WeatherWidget: React.FC = () => {
    // Mock weather data - 实际项目中应调用高德天气API
    const weatherData: WeatherData = {
        city: '上海',
        weather: 'sunny',
        temperature: 25,
    };

    const getWeatherIcon = (weather: WeatherData['weather']) => {
        const icons: Record<WeatherData['weather'], string> = {
            sunny: 'sunny',
            cloudy: 'cloud',
            rainy: 'rainy',
            snowy: 'ac_unit',
            overcast: 'filter_drama',
        };
        return icons[weather];
    };

    const getWeatherBg = (weather: WeatherData['weather']) => {
        const bgs: Record<WeatherData['weather'], string> = {
            sunny: 'from-amber-400 to-orange-500',
            cloudy: 'from-slate-400 to-slate-500',
            rainy: 'from-blue-400 to-blue-600',
            snowy: 'from-cyan-300 to-blue-400',
            overcast: 'from-slate-500 to-slate-600',
        };
        return bgs[weather];
    };

    return (
        <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getWeatherBg(weatherData.weather)} flex items-center justify-center shadow-sm`}>
                <span className="material-symbols-outlined text-white text-[18px]">
                    {getWeatherIcon(weatherData.weather)}
                </span>
            </div>
            <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                    {weatherData.city}
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {weatherData.temperature}°C
                </span>
            </div>
        </div>
    );
};

export default WeatherWidget;
