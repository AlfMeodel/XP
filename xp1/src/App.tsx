import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Navigation from './components/navigation/Navigation';
import Inscription from './pages/Inscription';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/inscription' element={<Inscription />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
