import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Weather from './pages/Weather';
import Market from './pages/Market';
import Schemes from './pages/Schemes';
import Forum from './pages/Forum';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header user={user} onLogout={handleLogout} />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={user ? <Dashboard /> : <Login onLogin={handleLogin} />} />
            <Route path="/weather" element={user ? <Weather /> : <Login onLogin={handleLogin} />} />
            <Route path="/market" element={user ? <Market /> : <Login onLogin={handleLogin} />} />
            <Route path="/schemes" element={user ? <Schemes /> : <Login onLogin={handleLogin} />} />
            <Route path="/forum" element={user ? <Forum /> : <Login onLogin={handleLogin} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 