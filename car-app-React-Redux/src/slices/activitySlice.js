

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
      const timestamp = new Date().toLocaleTimeString();

       // unshift adds the new log to the TOP of the list
      state.logs.unshift(`Sold Car ID ${action.payload} at ${timestamp}`);
    });
  }
});

export const { clearLogs } = activitySlice.actions;
export default activitySlice.reducer;
