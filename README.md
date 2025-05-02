🧩 Evolution Chain Fetching – Solution Explanation
✅ Approach
This solution focuses on correctly fetching and handling the evolution chain details for each Pokémon using the Pokémon API. The primary objective was to retrieve data such as sprites and Pokémon ID from the evolution list.

🛠️ What Was Done
Fetching Evolution Data
For every Pokémon in the evolution chain (evoNames), a separate HTTP request is sent to:
https://pokeapi.co/api/v2/pokemon/{pokeName}
This fetches detailed info including sprites and id.
## 🖼️ Preview

https://pokehub-one.vercel.app/

![Image](https://github.com/user-attachments/assets/7f5e7c01-cd02-4306-86fe-6fd89dfd5549)
![Image](https://github.com/user-attachments/assets/fdbd503b-a2f7-4b1b-aa6d-dfece9650c33)
![Image](https://github.com/user-attachments/assets/1d5c5844-37e1-4018-8176-54c9499b3124)


