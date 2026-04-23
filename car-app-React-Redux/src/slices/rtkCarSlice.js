
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
/**
 * createAsyncThunk: Handles asynchronous logic.
 * 'car/sellAsync' is the action name.
 * We simulate a server delay using a Promise and setTimeout.
 */
// Thunk to simulate an API call for selling a car
export const sellCarAsync = createAsyncThunk(
  'car/sellAsync',
  async (carId) => {
    // Wait for 1 second (simulating a network request)
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 1 sec delay
     // Return the carId to be used in the 'fulfilled' case
    return carId;
  }
);

const rtkCarSlice = createSlice({
  name: 'car',// Unique name for this slice of state
  initialState: {
    cars: [
      { id: 1, name: 'Tesla Model 3', quantity: 10 },
      { id: 2, name: 'Porsche 911', quantity: 5 },
      { id: 3, name: 'Ford Mustang', quantity: 8 },
    ],
    loadingId: null, // Tracks which car is currently being sold
  },
  reducers: {

       // Regular synchronous action to reset quantities
    restock: (state) => {
      state.cars.forEach(car => car.quantity = 10);
    }
  },


    /**
   * extraReducers: Listens for actions defined outside this slice, 
   * specifically the lifecycle of our Async Thunk.
   */
  extraReducers: (builder) => {
    builder

     // Triggered immediately when sellCarAsync starts
      .addCase(sellCarAsync.pending, (state, action) => {
        state.loadingId = action.meta.arg; // Set loading for specific car // action.meta.arg contains the carId passed in
      })

        // Triggered after the 1-second delay finishes
      .addCase(sellCarAsync.fulfilled, (state, action) => {
        const car = state.cars.find(c => c.id === action.payload);
        if (car && car.quantity > 0) car.quantity -= 1; // Decrease stock
        state.loadingId = null; // Clear loading state
      });
  }
});

export const { restock } = rtkCarSlice.actions; // Export the restock action
export default rtkCarSlice.reducer; // Export the reducer for the store
