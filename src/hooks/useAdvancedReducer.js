import { useReducer, useCallback } from 'react';

/**
 * Mini redux system for local component state
 * @param {function=} [reducer] optional
 * @param {Object=} [initialState] optional
 */
const useAdvancedReducer = (reducer, initialState = {}, middleware) => {
  const advancedReducer = (state = {}, action) => {
    const { type, payload } = action;
    if (type && payload) {
      return {
        ...state,
        ...payload
      };
    }
    return state;
  };

  const [state, dispatch] = useReducer(reducer || advancedReducer, initialState);

  /**
   * @param {string} type
   * @param {any=} payload optional
   */
  const makeActionCreator = (type, payload) => ({ type, payload });

  const advancedDispatch = useCallback((action) => {
    if (middleware) {
      const actionAfterMw = middleware(action);
      if (actionAfterMw) dispatch(actionAfterMw);
    }
    else dispatch(action);
  });

  return {
    dispatch,
    state,
    advancedDispatch,
    makeActionCreator,
  };
};

export default useAdvancedReducer;
