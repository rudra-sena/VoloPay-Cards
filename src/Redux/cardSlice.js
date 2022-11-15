import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCards: [],
  filteredCards: [],
  searchedCards: [],
  filterApplied: false,
};

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    updateAllCards: (state, action) => {
      state.allCards = [...state.allCards, ...action.payload];
      state.allCards = state.allCards.filter(
        (value, index, self) =>
          index ===
          self.findIndex(
            (t) => t.place === value.place && t.name === value.name
          )
      );
      state.filteredCards = state.allCards;
      state.searchedCards = state.allCards;
    },
    updateFilteredCards: (state, action) => {
      state.filteredCards = [...action.payload];
    },
    updateFilterApplied: (state, action) => {
      state.filterApplied = action.payload;
    },
    search: (state, action) => {
      state.searchedCards = state.allCards.filter((card) => {
        return card.name.toLowerCase().includes(action.payload);
      });
      state.filteredCards = state.searchedCards;
    },
    filter: (state, action) => {
      state.filteredCards = state.searchedCards;
      console.log(action.payload);
      const checked = action.payload[0];
      if (checked.length > 0) {
        state.filteredCards = state.filteredCards.filter((card) => {
          return checked.includes(card.card_type);
        });
      }
      const selected = action.payload[1];
      if (selected !== "Select Cardholder") {
        state.filteredCards = state.filteredCards.filter((card) => {
          return card.owner === selected;
        });
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateAllCards,
  updateFilteredCards,
  updateFilterApplied,
  filter,
  search,
} = cardSlice.actions;

export default cardSlice.reducer;
