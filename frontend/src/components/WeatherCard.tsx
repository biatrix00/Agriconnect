interface WeatherProps {
  temp: number;
  condition: string;
  iconUrl: string;
}

const WeatherCard = ({ temp, condition, iconUrl }: WeatherProps) => {
  return (
    <div className="bg-blue-50 rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Current Weather</h2>
          <p className="text-4xl font-bold text-blue-600 mt-2">{temp}°C</p>
          <p className="text-gray-600 mt-1">{condition}</p>
        </div>
        <img src={iconUrl} alt={condition} className="w-20 h-20" />
      </div>
    </div>
  );
};

export default WeatherCard; 