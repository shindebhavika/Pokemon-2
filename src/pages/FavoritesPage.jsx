import React, { useState } from "react";
import FavoriteCard from "../components/molecules/FavoriteCard";
import { FaBackward } from "react-icons/fa";
import Button from "../components/atoms/Button";
function FavoritesPage() {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const handleRemove = (id) => {
    const updatedFavorites = favorites.filter((poke) => poke.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="p-4 bg-yellow-50 w-full h-screen">

      <h1 className="text-3xl font-bold mb-6 font-tagesschrift">
        My Favorite Pokémon
      </h1>
      <div className="mb-6">
        <Button text="Back to List" to="/explore" Icon={FaBackward} color="yellow" width="w-auto" />
      </div>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {favorites.map((pokemon) => (
            <FavoriteCard
              key={pokemon.id}
              pokemon={pokemon}
              onRemove={handleRemove}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 dark:text-gray-400">
          No favorites added yet!
        </p>
      )}
    </div>
  );
}

export default FavoritesPage;
