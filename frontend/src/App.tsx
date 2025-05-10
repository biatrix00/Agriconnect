import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Marketplace from './components/Marketplace';
import FarmerDashboard from './components/FarmerDashboard';
import ConsumerDashboard from './components/ConsumerDashboard';
import Weather from './components/Weather';
import Forum from './components/Forum';
import AIAssistant from './components/AIAssistant';
import Profile from './components/Profile';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'consumer';
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5001/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const ProtectedRoute = ({ children, allowedRoles }: { children: JSX.Element, allowedRoles: string[] }) => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (!user) {
      return <Navigate to="/login" />;
    }

    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/" />;
    }

    return children;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['farmer', 'consumer']}>
                {user?.role === 'farmer' ? <FarmerDashboard /> : <ConsumerDashboard />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              user ? <Profile /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
