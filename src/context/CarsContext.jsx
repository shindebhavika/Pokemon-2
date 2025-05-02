import React, { createContext, useContext, useState, useEffect } from "react";

const CarsContext = createContext();

export const useCars = () => useContext(CarsContext);

export const CarsProvider = ({ children }) => {
  const [cars, setCars] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  useEffect(() => {
    const fetchCars = async () => {
      setStatus("loading");
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=150`);
        const data = await res.json();
        const detailedData = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();
            return {
              name: pokemon.name,
              url: pokemon.url,
              types: details.types,
              id: details.id,
              weight: details.weight,
              abilities: details.abilities,
              sprites: details.sprites,
              pokemon: details,
            };
          })
        );
        setCars(detailedData);
        setStatus("succeeded");
      } catch (err) {
        setError(err.message);
        setStatus("failed");
      }
    };

    fetchCars();
  }, [page]);

  const addToWishlist = (car) => {
    const updatedWishlist = [...wishlist];
    const carExists = updatedWishlist.find((item) => item.id === car.id);
    if (!carExists) {
      updatedWishlist.push(car);
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    }
  };

  const removeFromWishlist = (carId) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== carId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <CarsContext.Provider
      value={{
        cars,
        page,
        status,
        error,
        wishlist,
        setPage,
        addToWishlist,
        removeFromWishlist,
      }}
    >
      {children}
    </CarsContext.Provider>
  );
};
