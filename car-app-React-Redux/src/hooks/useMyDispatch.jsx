import { store } from '../store/rtkStore';

/**
 * Returns the store's dispatch function so components can trigger actions.
 */

export function useMyDispatch() {
  return store.dispatch;
}
