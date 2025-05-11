import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'consumer';
}

interface NavbarProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

const Navbar = ({ user, setUser }: NavbarProps) => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-green-600">
                {t('welcome')}
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/marketplace"
                className="border-transparent text-gray-500 hover:border-green-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                {t('marketplace')}
              </Link>
              <Link
                to="/weather"
                className="border-transparent text-gray-500 hover:border-green-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                {t('weather') || 'Weather'}
              </Link>
              <Link
                to="/forum"
                className="border-transparent text-gray-500 hover:border-green-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                {t('forum')}
              </Link>
              <Link
                to="/ai-assistant"
                className="border-transparent text-gray-500 hover:border-green-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                {t('aiAssistant')}
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={i18n.language}
              onChange={e => i18n.changeLanguage(e.target.value)}
              className="border rounded px-2 py-1 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="en">English</option>
              <option value="kn">ಕನ್ನಡ</option>
            </select>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link
                    to="/dashboard"
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {t('dashboard') || 'Dashboard'}
                  </Link>
                  <span className="text-gray-500">
                    {t('welcome')}, {user.name}
                  </span>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                  >
                    {t('logout') || 'Logout'}
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login">
                    <Button variant="outline">{t('login') || 'Login'}</Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="gradient">{t('register') || 'Register'}</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 