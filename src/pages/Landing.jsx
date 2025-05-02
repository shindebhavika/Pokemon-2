

import React from "react";
import Button from "../components/atoms/Button";
import { useNavigate } from "react-router-dom";
import { FaArrowCircleRight } from "react-icons/fa";

const features = [
  {
    title: "Advanced Search",
    description:
      "Filter by types, sort by name or ID, and paginate through your favorite monsters.",
  },
  {
    title: "Detailed Stats",
    description:
      "Explore HP, Attack, Defense, abilities, moves, and evolution chains.",
  },
  {
    title: "Favorites & Compare",
    description:
      "Mark favorites and compare stats between two Pokémon side by side.",
  },
];

const FeatureCard = ({ title, description }) => (
  <div className="bg-[#252837] bg-opacity-90 p-6 rounded-xl shadow-lg">
    <h3 className="text-xl font-semibold text-yellow-300 mb-2">{title}</h3>
    <p className="text-sm text-gray-300">{description}</p>
  </div>
);

export default function Landing() {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/explore");
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pb-10">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center scale-110 blur-sm landing-bg" style={{
  backgroundImage:
    "url('https://img.freepik.com/premium-photo/vibrant-comic-illustration-with-striking-lightning-bolts-thunder-effects_43969-34565.jpg?w=1380')",
}}></div>

      <div className="absolute inset-0 bg-orange-300 bg-opacity-60 z-0"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-white text-center px-6">
        <img
          src="/Pikachu.webp"
          alt="Pikachu"
          className="w-40 h-40 drop-shadow-xl mb-6"
        />
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-yellow-400 font-tagesschrift">
          Welcome to Pokémon Explorer
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
          Search, compare, and favorite your favorite Pokémon! Dive into detailed stats, evolution chains, and more.
        </p>

        <Button
          width="w-auto"
          text="Explore Now"
          onClick={handleExploreClick}
          Icon={FaArrowCircleRight}
        />
      </div>

      {/* Features */}
      <div className="relative z-10 mt-16 grid md:grid-cols-3 gap-6 px-4">
        {features.map((feature, idx) => (
          <FeatureCard key={idx} {...feature} />
        ))}
      </div>
    </div>
  );
}
