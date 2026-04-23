

import { configureStore } from '@reduxjs/toolkit';
import carReducer from '../slices/rtkCarSlice';
import activityReducer from '../slices/activitySlice'; 

export const store = configureStore({
  reducer: {

    // state.car will point to the carReducer data
    car: carReducer, // 'car' matches the name in your slice

     // state.history will point to the activityReducer data
     history: activityReducer,
  },
});
