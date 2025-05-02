import React, { useEffect, useState, useCallback, useMemo } from "react";
import Filters from "../components/molecules/Filters";
import CarCard from "../components/molecules/CarCard";

import Pagination from "../components/atoms/Pagination";

import { useCars } from "../context/CarsContext";

function Home() {
  const [filters, setFilters] = useState({
    name: "",
    types: [],
    sort: "id",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  const { cars, status } = useCars();
  

  // Extract unique types
  const allTypes = useMemo(() => {
    return Array.from(
      new Set(cars.flatMap((car) => car.types?.map((t) => t.type.name)))
    ).map((name) => ({ name }));
  }, [cars]);

  // Filter and sort
  const filteredAndSortedCars = useMemo(() => {
    const filtered = cars.filter((pokemon) => {
      const matchesName = pokemon.name
        .toLowerCase()
        .includes(filters.name.toLowerCase());

      const matchesTypes =
        filters.types.length === 0 ||
        filters.types.every((type) =>
          pokemon.types?.some((t) => t.type.name === type)
        );

      return matchesName && matchesTypes;
    });

    return [...filtered].sort((a, b) => {
      return filters.sort === "name"
        ? a.name.localeCompare(b.name)
        : a.id - b.id;
    });
  }, [cars, filters]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCars.length / itemsPerPage);

  const paginatedCars = useMemo(() => {
    return filteredAndSortedCars.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredAndSortedCars, currentPage, itemsPerPage]);

  const handlePageChange = useCallback(
    (page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages]
  );

  return (
    <div className="p-4 sm:p-6 md:p-8 font-sans bg-yellow-50 dark:bg-gray-900 min-h-screen transition-colors">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 text-center sm:text-left">
        Search Your Fav Pokémon
      </h1>

      <Filters
        filters={filters}
        setFilters={setFilters}
        types={allTypes}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />

      {status === "loading" && (
        <div className="text-center text-xl text-gray-600 dark:text-gray-300 mt-8">
          Loading Pokémon...
        </div>
      )}

      {status === "succeeded" && filteredAndSortedCars.length === 0 && (
        <div className="text-center text-xl text-gray-600 dark:text-gray-300 mt-8">
          No Pokémon found!
        </div>
      )}

      <div className="flex flex-wrap justify-center sm:justify-start gap-4 mt-4 w-full min-h-[100px]">
        {paginatedCars.map((pokemon, index) => {
          const images = pokemon.sprites
            ? Object.values(pokemon.sprites).filter(Boolean)
            : [];
          const types = pokemon.types?.map((t) => t.type.name) || [];

          return (
            <CarCard
              key={index}
              pokemon={pokemon}
              images={images}
              types={types}
            />
          );
        })}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}

export default Home;
