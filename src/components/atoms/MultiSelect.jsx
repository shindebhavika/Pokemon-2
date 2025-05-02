import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, X } from "lucide-react";

export default function MultiSelect({
  filters,
  setFilters,
  availableTypes,
  setCurrentPage,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleType = (type) => {
    const updatedTypes = filters.types.includes(type)
      ? filters.types.filter((t) => t !== type)
      : [...filters.types, type];
    setFilters({ ...filters, types: updatedTypes });
    setCurrentPage(1);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full sm:w-80" ref={dropdownRef}>
      <label className="mb-1 block font-medium text-sm text-gray-800 dark:text-gray-200">
        Types (multi-select)
      </label>

      <div
        className="bg-gray-100 dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 cursor-pointer flex justify-between items-center flex-wrap gap-2 min-h-[42px]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1">
          {filters.types.length > 0 ? (
            filters.types.map((type) => (
              <span
                key={type}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleType(type);
                }}
                className="flex items-center gap-1 bg-gray-300 dark:bg-gray-700 text-sm text-gray-900 dark:text-white rounded-full px-2 py-0.5"
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
                <X className="w-3 h-3 cursor-pointer" />
              </span>
            ))
          ) : (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Select types
            </span>
          )}
        </div>
        <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-300 ml-auto" />
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full max-h-48 overflow-y-auto bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
          {availableTypes.map((type) => (
            <div
              key={type}
              className="px-3 py-2 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer rounded"
              onClick={() => toggleType(type)}
            >
              <span className="capitalize">{type}</span>
              {filters.types.includes(type) && (
                <Check className="w-4 h-4 text-green-500" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
