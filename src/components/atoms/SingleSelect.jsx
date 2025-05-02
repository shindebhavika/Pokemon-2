// components/SingleSelect.jsx
import React from "react";
import { ChevronDown } from "lucide-react";

const SingleSelect = ({ label, value, options, onChange }) => {
  return (
    <div className="flex flex-col w-full sm:w-48">
      <label className="mb-1 font-medium text-sm text-gray-800 dark:text-gray-200">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-gray-100 dark:bg-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 rounded px-3 py-2 pr-8"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
      </div>
    </div>
  );
};

export default SingleSelect;
