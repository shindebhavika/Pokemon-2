import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

import BackToTopButton from './components/atoms/BackToTopButton';
import Navbar from './components/molecules/Navbar';


import PokemonDetail from './pages/PokemonDetail';
import Landing from './pages/Landing';
import FavoritesPage from './pages/FavoritesPage';
import Comparison from './pages/Comparison';
import { CarsProvider } from './context/CarsContext';


function App() {
  return (
    <CarsProvider>
    <div>

  <Navbar/>

      <Router>
        <Routes>
        <Route path="/" element={<Landing/>}></Route>
          <Route path="/explore" element={<Home></Home>}></Route>
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
          <Route path="/my-fav" element={<FavoritesPage/>}></Route>
          <Route path="/compare" element={<Comparison></Comparison>}></Route>
        </Routes>
      </Router>

      <BackToTopButton/>
    </div>
    </CarsProvider>
  )
}

export default App
