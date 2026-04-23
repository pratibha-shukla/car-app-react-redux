import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/**
 * Thunk to simulate a car sale.
 * We use { getState } to access the current state and determine 
 * the next sale number for that specific car model.
 */
export const sellCarAsync = createAsyncThunk(
  'car/sellAsync',
  async (carData, { getState }) => {
    // 1. Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 2. Access state to find the current saleCount for this specific car
    const state = getState();
    const car = state.car.cars.find(c => c.id === carData.id);
    
    // 3. Calculate the next sale number (e.g., if saleCount is 0, this is #1)
    const nextSaleNumber = (car.saleCount || 0) + 1;

    // 4. Return both the car info and the specific sale number to the reducers
    return { ...carData, saleNumber: nextSaleNumber };
  }
);

const rtkCarSlice = createSlice({
  name: 'car',
  initialState: {
    cars: [
      // Added saleCount: 0 to each car to track individual sales
      { id: 1, name: 'Tesla Model 3', quantity: 10, saleCount: 0 },
      { id: 2, name: 'Porsche 911', quantity: 5, saleCount: 0 },
      { id: 3, name: 'Ford Mustang', quantity: 8, saleCount: 0 },
    ],
    loadingId: null, 
  },
  reducers: {
    restock: (state) => {
      state.cars.forEach(car => {
        car.quantity = 10;
        car.saleCount = 0; // Optional: Reset counters on restock
      });
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sellCarAsync.pending, (state, action) => {
        /**
         * FIX: Since action.meta.arg is now an object {id, name},
         * we must use .id to ensure the loading spinner shows on the right card.
         */
        state.loadingId = action.meta.arg.id; 
      })
      .addCase(sellCarAsync.fulfilled, (state, action) => {
        const { id } = action.payload; 
        const car = state.cars.find(c => c.id === id);
        
        if (car && car.quantity > 0) {
          car.quantity -= 1;     // Decrease inventory
          car.saleCount += 1;    // Increment this car's specific counter
        }
        state.loadingId = null; 
      })
      .addCase(sellCarAsync.rejected, (state) => {
        state.loadingId = null; // Reset loading if the "API" fails
      });
  }
});

export const { restock } = rtkCarSlice.actions;
export default rtkCarSlice.reducer;

