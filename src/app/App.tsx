
import './App.css';
import { AppProvider } from './context/app-context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home-page/HomePage';
import ShoppingPage from './pages/shopping-page/ShoppingPage';


function App() {
  return (
    <AppProvider>
      <Router>
        <div className="app__responsive">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shopping-cart" element={<ShoppingPage />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
