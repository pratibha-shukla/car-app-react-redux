

import { createSlice } from '@reduxjs/toolkit';
import { sellCarAsync } from './rtkCarSlice';

const activitySlice = createSlice({
  name: 'activity',
  initialState: {
    logs: []
  },
  reducers: {
    clearLogs: (state) => {
      state.logs = [];
    }
  },
  extraReducers: (builder) => {

 /**
     * CROSS-SLICE LOGIC:
     * This slice listens for 'fulfilled' from the CAR slice.
     * When a car sells successfully, we push a message into the logs array.
     */

    // Automatically add a log whenever a car sale is successful
    builder.addCase(sellCarAsync.fulfilled, (state, action) => {
         const { name, saleNumber, id } = action.payload; // Grab the name sent from the thunk
      const timestamp = new Date().toLocaleTimeString();

  // Example result: "Sold Tesla Model 3 (ID: 1) #1 at 5:00 PM"
  state.logs.unshift(`Sold ${name} (ID: ${id}) #${saleNumber} at ${timestamp}`);
    });
  }
});

export const { clearLogs } = activitySlice.actions;
export default activitySlice.reducer;
