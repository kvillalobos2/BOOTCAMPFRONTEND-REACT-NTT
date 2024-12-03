import './App.css';
import { AppProvider } from './context/app-context';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/home-page/HomePage';
import ShoppingPage from './pages/shopping-page/ShoppingPage';
import LoginPage from './pages/login-page/LoginPage';
import PrivateRoute from './routes/private-route/private-route';
import AppInitializer from './context/app-initializer';


function App() {
  return (
    <AppProvider>
      <Router>
      <AppInitializer />
        <div className="app__responsive">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
            <Route path="/shopping-cart" element={<PrivateRoute element={<ShoppingPage />} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
