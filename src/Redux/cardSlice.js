import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCards: [],
  yourCards: [],
  filteredCards: [],
};

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    updateAllCards: (state, action) => {
      if (state.allCards.length < 86) {
        state.allCards = [...state.allCards, ...action.payload];
      }
    },
    updateYourCards: (state, action) => {
      state.yourCards = [...state.yourCards, ...action.payload];
    },
    updateFilteredCards: (state, action) => {
      console.log("Updating Filtered Cards Data");
    },
  },
});

export const { updateAllCards, updateYourCards, updateFilteredCards } =
  cardSlice.actions;

export default cardSlice.reducer;
