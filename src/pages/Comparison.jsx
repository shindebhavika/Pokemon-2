import { useState } from "react";
import axios from "axios";
import { Button } from "bootstrap";

function Comparison() {
  const [pokemon1, setPokemon1] = useState("3");
  const [pokemon2, setPokemon2] = useState("4");
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");

  const fetchPokemon = async (nameOrId, setter, setError) => {
    try {
      setError("");
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${nameOrId}`
      );
      setter(res.data);
    } catch {
      setter(null);
      setError(`Pokémon "${nameOrId}" not found.`);
    }
  };

  const handleRandom = (setter, setError) => {
    const randomId = Math.floor(Math.random() * 898) + 1;
    fetchPokemon(randomId, setter, setError);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 justify-center">
      <h2 className="text-3xl font-bold text-center mb-6 font-tagesschrift dark:text-white">
        Compare Pokémon Stats
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => handleRandom(setData1, setError1)}
            type="button"
            className="btn btn-outline-warning"
          >
            Random-1 🎲
          </button>
        </div>
        {error1 && <p className="text-red-500 mt-1 text-sm">{error1}</p>}

        <div className="flex gap-2">
          <button
            onClick={() => handleRandom(setData2, setError2)}
            type="button"
          className="btn btn-outline-warning"
          >
            Random-2 🎲
          </button>
        </div>
        {error2 && <p className="text-red-500 mt-1 text-sm">{error2}</p>}
      </div>
      {!data1 && !data2 && (
        <p className="text-center text-gray-500 font-medium font-tagesschrift">
          Please click the buttons to fetch random Pokémon.
        </p>
      )}
      {/* Result Table */}
      {data1 && data2 && (
        <div className="overflow-x-auto border rounded-lg shadow-md p-4 bg-white dark:bg-gray-800">
          <h3 className="text-xl font-semibold text-center mb-4 capitalize ">
            {data1.name} vs {data2.name}
          </h3>
          <table className="w-full table-auto border-collapse text-sm md:text-base">
            <thead className="bg-yellow-100 text-yellow-400">
              <tr>
                <th className="border p-2">Stat</th>
                <th className="border p-2 capitalize text-center">
                  {data1.name}
                </th>
                <th className="border p-2 capitalize text-center">
                  {data2.name}
                </th>
              </tr>
            </thead>
            <tbody>
              {data1.stats.map((stat, idx) => (
                <tr
                  key={stat.stat.name}
                  className="odd:bg-gray-50 even:bg-white"
                >
                  <td className="border p-2 capitalize font-medium">
                    {stat.stat.name}
                  </td>
                  <td
                    className={`border p-2 font-semibold text-center ${
                      data1.stats[idx].base_stat > data2.stats[idx].base_stat
                        ? "text-green-500"
                        : ""
                    }`}
                  >
                    {stat.base_stat}
                  </td>
                  <td
                    className={`border p-2 font-semibold text-center ${
                      data2.stats[idx].base_stat > stat.base_stat
                        ? "text-green-500"
                        : ""
                    }`}
                  >
                    {data2.stats[idx].base_stat}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Comparison;
