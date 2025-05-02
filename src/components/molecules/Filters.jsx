import React, { useEffect, useState } from "react";
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
    async function fetchTypes() {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/type");
        const fetchedTypes = response.data.results
          .map((type) => type.name)
          .filter((name) => name !== "shadow" && name !== "unknown");
        setAvailableTypes(fetchedTypes);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    }

    fetchTypes();
  }, []);

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
          onChange={(e) => {
            setFilters({ ...filters, name: e.target.value });
            setCurrentPage(1);
          }}
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
        options={[
          { label: "ID", value: "id" },
          { label: "Name (A-Z)", value: "name" },
        ]}
        onChange={(val) => {
          setFilters({ ...filters, sort: val });
          setCurrentPage(1);
        }}
      />

      <SingleSelect
        label="Items per page"
        value={itemsPerPage}
        options={[10, 20, 50].map((n) => ({ label: String(n), value: n }))}
        onChange={(val) => {
          setItemsPerPage(Number(val));
          setCurrentPage(1);
        }}
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
