import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  items: [],
  totalAmount: 0,
  bookingId: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { quantity, price, bookingId, ...otherPayload } = action.payload;
      const amount = Number(quantity) * Number(price);
      const existingItemIndex = state.items.findIndex(
        (item) => item.bookingId === bookingId,
      );

      // If the bookingId changes, reset the cart
      if (state.bookingId !== bookingId) {
        state.items = [];
        state.totalAmount = 0;
        state.bookingId = bookingId;
      }

      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];
        existingItem.quantity += Number(quantity);
        existingItem.amount += amount;
      } else {
        const newItem = {
          ...otherPayload,
          quantity: Number(quantity),
          price: Number(price),
          amount: amount,
        };
        state.items.push(newItem);
      }

      state.totalAmount += amount;
      state.bookingId = bookingId;

      // Update localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },

    // To directly set the cart data from API and clear old data
    setCartItems: (state, action) => {
      const { items, totalAmount, bookingId } = action.payload;

      // Clear previous cart data
      state.items = items || [];
      state.totalAmount = totalAmount || 0;
      state.bookingId = bookingId || null;

      // Update localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },

    // Action to reset the cart
    resetCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.bookingId = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
      }
    },
  },
});

export const { addToCart, setCartItems, resetCart } = cartSlice.actions;

export default cartSlice.reducer;

// Rehydrate cart from localStorage
export const rehydrateCartFromLocalStorage = () => (dispatch) => {
  if (typeof window !== "undefined") {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      dispatch(setCartItems(storedCart)); // Dispatch the rehydrated data
    }
  }
};
