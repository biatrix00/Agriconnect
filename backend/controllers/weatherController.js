const axios = require('axios');
const asyncHandler = require('express-async-handler');

// @desc    Get 5-day weather forecast
// @route   GET /api/weather/:location
// @access  Public
const getWeatherForecast = asyncHandler(async (req, res) => {
  const { location } = req.params;
  
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );

    // Process the data to get daily forecasts
    const dailyForecasts = response.data.list.reduce((acc, item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = {
          date,
          temp: item.main.temp,
          description: item.weather[0].description,
          humidity: item.main.humidity,
          windSpeed: item.wind.speed
        };
      }
      return acc;
    }, {});

    res.json(Object.values(dailyForecasts).slice(0, 5));
  } catch (error) {
    res.status(400);
    throw new Error('Failed to fetch weather data');
  }
});

module.exports = {
  getWeatherForecast
}; 