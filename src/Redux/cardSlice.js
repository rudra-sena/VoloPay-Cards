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
    updateAllCards: (state) => {
      console.log("Updating All Cards Data");
    },
    updateYourCards: (state) => {
      console.log("Updating Your Cards Data");
    },
    updateFilteredCards: (state, action) => {
      console.log("Updating Filtered Cards Data");
    },
  },
});

export const { updateAllCards, updateYourCards, updateFilteredCards } =
  cardSlice.actions;

export default cardSlice.reducer;
