import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Articles from './pages/Articles';
import AIChat from './pages/AIChat';
import About from './pages/About';
import Login from './pages/Login';
import Myths from './pages/Myths';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/ai-chat" element={<AIChat />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/myths" element={<Myths />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;