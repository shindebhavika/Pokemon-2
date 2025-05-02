import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBackward } from "react-icons/fa";
import Button from "../atoms/Button";

export default function PokemonDetail() {
  const { name } = useParams();
  const [details, setDetails] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState([]);
  const [species, setSpecies] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await res.json();
      setDetails(data);

      const speciesRes = await fetch(data.species.url);
      const speciesData = await speciesRes.json();
      setSpecies(speciesData);

      const evoRes = await fetch(speciesData.evolution_chain.url);
      const evoData = await evoRes.json();

      const evoNames = [];
      let evo = evoData.chain;
      while (evo) {
        evoNames.push(evo.species.name);
        evo = evo.evolves_to[0];
      }

      const evoDetails = await Promise.all(
        evoNames.map(async (pokeName) => {
          const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`);
          const data = await res.json();
          return {
            name: pokeName,
            image: data.sprites.other["official-artwork"].front_default,
            id: data.id,
          };
        })
      );
      setEvolutionChain(evoDetails);
    };

    fetchData();
  }, [name]);

  if (!details || !species) return <div className="p-4 text-white">Loading...</div>;

  const { height, weight, abilities, stats, sprites } = details;
  const hp = stats.find((s) => s.stat.name === "hp")?.base_stat;
  const attack = stats.find((s) => s.stat.name === "attack")?.base_stat;
  const defense = stats.find((s) => s.stat.name === "defense")?.base_stat;
  const speed = stats.find((s) => s.stat.name === "speed")?.base_stat;
  const spAtk = stats.find((s) => s.stat.name === "special-attack")?.base_stat;
  const spDef = stats.find((s) => s.stat.name === "special-defense")?.base_stat;

  return (
    <div className="min-h-screen p-8 bg-yellow-50 text-gray-800">
      <div className="mb-6">
        <Button text="Back to List" to="/" Icon={FaBackward} color="yellow" width="w-auto" />
      </div>

      <div className="max-w-5xl mx-auto  shadow-xl rounded-xl p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side: Image and ID */}
        <div className="flex flex-col items-center">
          <img
            src={sprites.other["official-artwork"].front_default}
            alt={name}
            className="w-56 h-56"
          />
          <span className="text-sm text-gray-500 mt-2">#{details.id.toString().padStart(3, '0')}</span>
        </div>

        {/* Right Side */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-bold capitalize font-tagesschrift">{name}</h1>

          {/* Description */}
          <div className="bg-yellow-100 p-4 rounded-xl shadow text-sm leading-relaxed">
            {species.flavor_text_entries.find((entry) => entry.language.name === "en")?.flavor_text.replace(/\f/g, " ")}
          </div>

          {/* Info */}
          <div className="grid grid-cols-2 gap-4 bg-yellow-50 p-4 rounded-xl shadow-sm text-sm">
            <div><strong>Height:</strong> {height / 10} m</div>
            <div><strong>Weight:</strong> {weight / 10} kg</div>
            <div><strong>Category:</strong> {species.genera.find((g) => g.language.name === "en")?.genus}</div>
            <div><strong>Abilities:</strong> {abilities.map(a => a.ability.name).join(", ")}</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-3xl mx-auto mt-10 space-y-4">
  {[
    { label: "HP", value: hp },
    { label: "Attack", value: attack },
    { label: "Defense", value: defense },
    { label: "Speed", value: speed },
    { label: "Sp. Attack", value: spAtk },
    { label: "Sp. Defense", value: spDef },
  ].map((stat) => (
    <div key={stat.label}>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{stat.label}</span>
        <span className="text-sm font-medium text-gray-700">{stat.value}</span>
      </div>
      <div className="w-full bg-yellow-100 rounded-full h-4 shadow-inner">
        <div
          className="bg-yellow-500 h-4 rounded-full"
          style={{ width: `${Math.min(stat.value, 100)}%` }} // Cap width at 100%
        ></div>
      </div>
    </div>
  ))}
</div>


      {/* Capture Rate */}
      <div className="max-w-5xl mx-auto mt-10 text-center">
        <h2 className="text-xl font-bold mb-2 font-tagesschrift">Capture Rate</h2>
        <div className="w-24 h-24 mx-auto rounded-full border-8 border-yellow-400 flex items-center justify-center text-xl font-bold text-yellow-900">
          {Math.round((species.capture_rate / 255) * 100)}%
        </div>
      </div>
      <h3 className="max-w-5xl mx-auto text-xl font-bold capitalize mt-7 font-tagesschrift">official-artwork</h3>
      <div className="flex items-center gap-6 mt-4 max-w-5xl mx-auto">
     
        <img
          src={details.sprites.other["official-artwork"].front_default}
          alt={details.name}
          className="w-32 h-32 p-2 "
        />
         <img
          src={details.sprites.other["official-artwork"].front_shiny}
          alt={details.name}
          className="w-32 h-32 p-2 "
        />
      </div>

      <div className="mt-8 max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold mb-2 border-b border-gray-600 pb-1 font-tagesschrift">Moves</h2>
        <ul className="flex flex-wrap gap-2 max-h-40 overflow-y-auto mt-2">
          {details.moves.slice(0, 30).map((m) => (
            <li
              key={m.move.name}
              className="bg-card-light text-white px-3 py-1 rounded-full text-sm bg-yellow-900"
            >
              {m.move.name}
            </li>
          ))}
        </ul>
        <p className="text-sm text-gray-400 mt-1">Showing first 30 moves</p>
      </div>
      {/* Evolution Chain */}
      <div className="max-w-5xl mx-auto mt-10">
        <h2 className="text-xl font-bold mb-4 font-tagesschrift">Evolutions</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {evolutionChain.map((evo) => (
            <div key={evo.name} className="bg-card-light bg-yellow-100 p-4 rounded-xl w-32 text-center shadow">
              <img
                src={evo.image}
                alt={evo.name}
                className="w-20 h-20 mx-auto mb-2"
              />
              <p className="capitalize font-tagesschrift font-semibold">{evo.name}</p>
              <span className="text-sm text-gray-500">#{evo.id}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
