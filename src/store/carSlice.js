import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCars } from "../utils/api";

export const getCars = createAsyncThunk("cars/getCars", async () => {
  const data = await fetchCars();
  const detailedData = await Promise.all(
    data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const details = await res.json();
      return {
        name: pokemon.name,
        url: pokemon.url,
        types: details.types, // 👈 add types here
        id: details.id,
        weight: details.weight,
        abilities: details.abilities,
        sprites: details.sprites,
        pokemon:pokemon
      };
    })
  );

  return detailedData;
});

const carSlice = createSlice({
  name: "cars",
  initialState: {

    cars: [],
    page: 1,
    status: "idle" | "loading" | "succeeded" | "failed",
   
    error: null,
    wishlist: JSON.parse(localStorage.getItem("wishlist")) || [],
  },
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
    addToWishlist(state, action) {
      const pokemon = action.payload;
      const updateCars = state.wishlist.find((item, idx) => pokemon.id == item.id);
      if (!updateCars) {
        state.wishlist.push(pokemon);
      }
    },

    removeFromWishlist(state, action) {
      // state.wishlist = state.wishlist.filter(
      //   (item) => item.id !== action.payload
      // );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCars.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCars.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cars = action.payload; 
      })
      .addCase(getCars.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setPage, addToWishlist, removeFromWishlist } = carSlice.actions;
export default carSlice.reducer;
