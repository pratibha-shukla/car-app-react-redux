import { useState, useEffect } from 'react';
import { store } from '../store/rtkStore';



/**
 * Custom selector hook.
 * selector: a function that picks a part of the state (e.g., state => state.car.cars)
 */
export function useMySelector(selector) {


    // Initialize local state with the current data in the Redux store
  const [state, setState] = useState(selector(store.getState()));

    /**
     * store.subscribe: Registers a listener that runs every time 
     * ANY action is dispatched to the store.
     */

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const nextState = selector(store.getState());

        // Update local React state so the UI re-renders with new data
      setState(nextState);
    });


    // Cleanup: Stop listening when the component unmounts
    return unsubscribe;
  }, [selector]);

  return state;
}
