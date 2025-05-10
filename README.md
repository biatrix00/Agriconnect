# AgriConnect

A full-stack web application for farmers to access weather information, crop advisory, market prices, and government schemes.

## Features

- User Authentication (Register/Login)
- Weather Forecast (5-day)
- Crop Advisory
- Market Prices
- Government Schemes
- Farmer Forum

## Tech Stack

- Frontend: React + TailwindCSS (Vite)
- Backend: Node.js + Express
- Database: MongoDB

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- OpenWeatherMap API key

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd agriconnect
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Create a `.env` file in the backend directory:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/agriconnect
JWT_SECRET=your_jwt_secret_key_here
OPENWEATHER_API_KEY=your_openweather_api_key_here
```

4. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

5. Start the backend server:
```bash
cd ../backend
npm run dev
```

6. Start the frontend development server:
```bash
cd ../frontend
npm run dev
```

7. Open your browser and navigate to `http://localhost:5173`

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Weather
- GET `/api/weather/:location` - Get 5-day weather forecast

### Crops
- GET `/api/crops/:season` - Get crops for a season
- GET `/api/crops/:season/:crop` - Get crop advisory

### Market
- GET `/api/market` - Get all market prices
- GET `/api/market/:crop` - Get price for specific crop

### Schemes
- GET `/api/schemes` - Get all government schemes
- GET `/api/schemes/:id` - Get scheme by ID

### Forum
- GET `/api/forum` - Get all forum posts
- POST `/api/forum` - Create new post
- DELETE `/api/forum/:id` - Delete post

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
