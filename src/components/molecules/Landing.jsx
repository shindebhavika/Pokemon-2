import React from 'react';
import Button from '../atoms/Button';
import { useNavigate } from 'react-router-dom';
import { FaArrowCircleRight } from "react-icons/fa";
function Landing() {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate('/explore');
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pb-10">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center blur- scale-110  "
        style={{
          backgroundImage: `url('https://img.freepik.com/premium-photo/vibrant-comic-illustration-with-striking-lightning-bolts-thunder-effects_43969-34565.jpg?w=1380')`,
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-opacity-60 z-0  bg-orange-300"></div>

      {/* Content */} <img
      src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
      alt="Pikachu"
      className="w-40 h-40 drop-shadow-xl"
    />
      <div className="relative z-10 text-white text-center max-w-3xl px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-yellow-400 font-tagesschrift ">
          Welcome to Pokémon Explorer 
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          Search, compare, and favorite your favorite Pokémon! Dive into detailed stats, evolution chains, and more.
        </p>

        <Button width="w-auto" text="Explore Now" onClick={handleExploreClick} Icon={FaArrowCircleRight } />
      </div>

      {/* Features Section */}
      <div className="relative z-10 mt-16 grid md:grid-cols-3 gap-6 text-center px-4">
    
        <div className="bg-[#252837] bg-opacity-90 p-6 rounded-xl shadow-lg">
     
          <h3 className="text-xl font-semibold text-yellow-300 mb-2">Advanced Search</h3>
          <p className="text-sm text-gray-300">
            Filter by types, sort by name or ID, and paginate through your favorite monsters.
          </p>
        </div>

        <div className="bg-[#252837] bg-opacity-90 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-yellow-300 mb-2">Detailed Stats</h3>
          <p className="text-sm text-gray-300">
            Explore HP, Attack, Defense, abilities, moves, and evolution chains.
          </p>
        </div>

        <div className="bg-[#252837] bg-opacity-90 p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-yellow-300 mb-2">Favorites & Compare</h3>
          <p className="text-sm text-gray-300">
            Mark favorites and compare stats between two Pokémon side by side.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Landing;
