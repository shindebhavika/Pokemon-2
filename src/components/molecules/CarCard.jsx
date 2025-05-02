import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";

function CarCard({ pokemon, images, types }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((fav) => fav.name === pokemon.name));
  }, [pokemon.name]);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      const updated = favorites.filter((fav) => fav.name !== pokemon.name);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(false);
      alert("Removed from Favourites");
    } else {
      const newFav = {
        name: pokemon.name,
        id: pokemon.id,
        weight: pokemon.weight,
        images,
        types,
        abilities: pokemon.abilities,
      };
      favorites.push(newFav);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
      alert("Added to Favourites");
    }
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      onClick={handleCardClick}
      className="cursor-pointer p-1 bg-white dark:bg-gray-800 rounded-xl shadow "
    >
      <div className="relative h-96 w-72 [perspective:1000px] mx-auto">
        <div
          className={`absolute duration-1000 w-full h-full [transform-style:preserve-3d] ${
            isFlipped ? "[transform:rotateX(180deg)]" : ""
          }`}
        >
          {/* Front Side */}
          <div className="absolute w-full h-full rounded-xl bg-gradient-to-br from-yellow-100 to-blue-400 p-4 text-white [backface-visibility:hidden]">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start">
                <div className="text-2xl font-bold text-[#b0ae2e]">
                  {pokemon.name.toUpperCase()}
                </div>
                <button
                  onClick={toggleFavorite}
                  className={`text-2xl  ${
                    isFavorite ? "text-red-300" : "text-white-500"
                  }`}
                >
                  {isFavorite ? <FaHeart /> : <FaRegHeart />}
                </button>
              </div>
              <img
                src={images?.[2]}
                alt={pokemon.name}
                className="rounded-xl w-full h-40 object-cover mt-2"
              />
              <p>
                <strong>ID:</strong> {pokemon.id}
              </p>
              <p>
                <strong>Weight:</strong> {pokemon.weight}
              </p>
              <p>
                <strong>Types:</strong>
              </p>
              <ul className="flex gap-1 flex-wrap">
                {types.map((type, i) => (
                  <li key={i} className="text-sm bg-opacity-30  rounded">
                    {type}
                  </li>
                ))}
              </ul>
              <div className="flex justify-between items-center mt-auto">
                Click card to flip!
                <Link
                  to={`/pokemon/${pokemon.name}`}
              
                  onClick={(e) => e.stopPropagation()}
                  className="px-3 py-1 bg-white text-yellow-600 rounded hover:text-blue-700 transition"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>

          {/* Back Side */}
          <div className="absolute w-full h-full rounded-xl bg-gradient-to-br from-yellow-200 to-green-500 p-6 text-white [transform:rotateX(180deg)] [backface-visibility:hidden]">
            <div className="flex flex-col h-full">
              <img
                src={images?.[0]}
                alt={pokemon.name}
                className="rounded-xl w-full h-40 object-cover"
              />
              <div className="text-2xl font-bold mb-2">Abilities</div>
              <ul className="flex gap-1 flex-wrap mt-2">
                {pokemon?.abilities?.map((item, i) => (
                  <li key={i} className="text-sm bg-opacity-30 px-2 rounded">
                    {item.ability.name}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex justify-between items-center">
                <Link
                  to={`/pokemon/${pokemon.name}`}
                  onClick={(e) => e.stopPropagation()}
                  className="px-3 py-1 bg-white text-yellow-600 rounded hover:text-blue-700 transition"
                >
                  Details
                </Link>
                <FaStar className="text-yellow-300 text-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarCard;
