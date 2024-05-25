import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Navigation from './components/navigation/Navigation';
import Inscription from './pages/Inscription';
import Connexion from './pages/Connexion';
import { useSelector } from 'react-redux';
import { ChargementInterface } from './components/redux/chargementSlice';
import Spiner from './components/redux/Spiner';

function App() {
  let { chargement } = useSelector((state: { chargementStore: ChargementInterface }) => state.chargementStore)
  return (
    <div className="App">
      {chargement && <Spiner />}
      <Router>
        <Navigation />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/inscription' element={<Inscription />} />
          <Route path='/connexion' element={<Connexion />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
