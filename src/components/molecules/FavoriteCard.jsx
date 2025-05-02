import React from "react";
import { MdFolderDelete } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai"; // Optional: icon for Details
import { Link } from "react-router-dom";
import Button from "../atoms/Button"; // Adjust path if needed
import { BsClipboardHeartFill } from "react-icons/bs";
import { TfiMore } from "react-icons/tfi";
const FavoriteCard = ({ pokemon, onRemove }) => {
  return (
    <div className="bg-yellow-100 dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col items-center text-center shadow-amber-100">
  
      <img
        src={pokemon.images?.[2]}
        alt={pokemon.name}
        className="w-20 h-20 object-contain mb-1"
      />
      <h2 className="capitalize font-semibold text-md mb-1">{pokemon.name}</h2>
      <p className="text-xs font-bold dark:text-gray-400 mb-4">
        ID: {pokemon.id}
      </p>
      <div className="flex gap-2 flex-wrap justify-center">
        <Button
          text="Remove"
          onClick={() => onRemove(pokemon.id)}
          Icon={MdFolderDelete}
          color="red"
          width="w-32"
        />
        <Button
          text="Details"
        
          to={`/pokemon/${pokemon.name}`}
     
          Icon={ TfiMore}
          color="yellow"
    width="w-32"
        />
      </div>
    </div>
  );
};

export default FavoriteCard;
