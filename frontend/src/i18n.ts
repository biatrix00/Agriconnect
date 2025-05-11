import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to Agriconnect',
      marketplace: 'Marketplace',
      forum: 'Forum',
      aiAssistant: 'AI Assistant',
      guides: 'Guides',
      priceCheck: 'Price Check',
      sellCrops: 'Sell my crops',
      buyProduce: 'Buy fresh produce',
      learnTechniques: 'Learn better techniques',
      signIn: 'Sign in to your account',
      email: 'Email address',
      password: 'Password',
      signInBtn: 'Sign in',
      postQuestion: 'Post a Question',
      dashboard: 'Dashboard',
      weather: 'Weather',
      logout: 'Logout',
      login: 'Login',
      register: 'Register',
      // ...add more keys as needed
    }
  },
  kn: {
    translation: {
      welcome: 'ಅಗ್ರಿಕನೆಕ್ಟ್‌ಗೆ ಸ್ವಾಗತ',
      marketplace: 'ಮಾರುಕಟ್ಟೆ',
      forum: 'ಚರ್ಚಾ ವೇದಿಕೆ',
      aiAssistant: 'ಎಐ ಸಹಾಯಕ',
      guides: 'ಮಾರ್ಗದರ್ಶಿಗಳು',
      priceCheck: 'ಬೆಲೆ ಪರಿಶೀಲನೆ',
      sellCrops: 'ನನ್ನ ಬೆಳೆಗಳನ್ನು ಮಾರಾಟ ಮಾಡಿ',
      buyProduce: 'ತಾಜಾ ಉತ್ಪನ್ನಗಳನ್ನು ಖರೀದಿಸಿ',
      learnTechniques: 'ಉತ್ತಮ ತಂತ್ರಗಳನ್ನು ಕಲಿಯಿರಿ',
      signIn: 'ನಿಮ್ಮ ಖಾತೆಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ',
      email: 'ಇಮೇಲ್ ವಿಳಾಸ',
      password: 'ಪಾಸ್ವರ್ಡ್',
      signInBtn: 'ಸೈನ್ ಇನ್',
      postQuestion: 'ಪ್ರಶ್ನೆ ಪೋಸ್ಟ್ ಮಾಡಿ',
      dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
      weather: 'ಹವಾಮಾನ',
      logout: 'ಲಾಗ್ ಔಟ್',
      login: 'ಲಾಗಿನ್',
      register: 'ನೋಂದಣಿ',
      // ...add more keys as needed
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 