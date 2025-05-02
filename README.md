🧩 Evolution Chain Fetching – Solution Explanation
✅ Approach
This solution focuses on correctly fetching and handling the evolution chain details for each Pokémon using the Pokémon API. The primary objective was to retrieve data such as sprites and Pokémon ID from the evolution list.

🛠️ What Was Done
Fetching Evolution Data
For every Pokémon in the evolution chain (evoNames), a separate HTTP request is sent to:
https://pokeapi.co/api/v2/pokemon/{pokeName}
This fetches detailed info including sprites and id.
## 🖼️ Preview

![Detail Page](.\public\02.05.2025_21.44.28_REC.png)
