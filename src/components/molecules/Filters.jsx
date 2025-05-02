import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import MultiSelect from "../atoms/MultiSelect";
import { GrCompare } from "react-icons/gr";
import SingleSelect from "../atoms/SingleSelect";
import Button from "../atoms/Button";
import { PiListHeartDuotone } from "react-icons/pi";

export default function Filters({
  filters,
  setFilters,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
}) {
  const [availableTypes, setAvailableTypes] = useState([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/type")
      .then((res) => {
        const types = res.data.results
          .map((t) => t.name)
          .filter((name) => name !== "shadow" && name !== "unknown");
        setAvailableTypes(types);
      })
      .catch((err) => console.error("Error fetching types:", err));
  }, []);

  const handleNameChange = useCallback(
    (e) => {
      setFilters((prev) => ({ ...prev, name: e.target.value }));
      setCurrentPage(1);
    },
    [setFilters, setCurrentPage]
  );

  const handleSortChange = useCallback(
    (val) => {
      setFilters((prev) => ({ ...prev, sort: val }));
      setCurrentPage(1);
    },
    [setFilters, setCurrentPage]
  );

  const handleItemsPerPageChange = useCallback(
    (val) => {
      setItemsPerPage(Number(val));
      setCurrentPage(1);
    },
    [setItemsPerPage, setCurrentPage]
  );

  const sortOptions = useMemo(
    () => [
      { label: "ID", value: "id" },
      { label: "Name (A-Z)", value: "name" },
    ],
    []
  );

  const itemsPerPageOptions = useMemo(
    () => [10, 20, 50].map((n) => ({ label: String(n), value: n })),
    []
  );

  return (
    <div className="flex flex-wrap gap-4 md:gap-6 p-4 bg-transparent dark:text-white">
      {/* Name Filter */}
      <div className="flex flex-col w-full sm:w-48">
        <label className="mb-1 font-medium text-sm text-gray-800 dark:text-gray-200">
          Name
        </label>
        <input
          className="bg-gray-100 dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded px-3 py-2"
          placeholder="Search by Name..."
          value={filters.name}
          onChange={handleNameChange}
        />
      </div>

      {/* Type Filter */}
      <MultiSelect
        filters={filters}
        setFilters={setFilters}
        availableTypes={availableTypes}
        setCurrentPage={setCurrentPage}
      />

      <SingleSelect
        label="Sort By"
        value={filters.sort}
        options={sortOptions}
        onChange={handleSortChange}
      />

      <SingleSelect
        label="Items per page"
        value={itemsPerPage}
        options={itemsPerPageOptions}
        onChange={handleItemsPerPageChange}
      />

      <div className="flex gap-3">
        <Button
          width="w-44"
          text="My Favorites"
          Icon={PiListHeartDuotone}
          to="/my-fav"
          color="yellow"
        />
        <Button
          width="w-auto"
          text="Compare"
          Icon={GrCompare}
          to="/compare"
          color="green"
        />
      </div>
    </div>
  );
}
