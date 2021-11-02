import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';

export const Store = createContext();

export const actionTypes = {
  DARK_MODE_ON: 'DARK_MODE_ON',
  DARK_MODE_OFF: 'DARK_MODE_OFF',
};

const initialState = {
  darkMode: Cookies.get('darkMode') === 'ON' ? true : false,
};

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.DARK_MODE_ON:
      return { ...state, darkMode: true };
    case actionTypes.DARK_MODE_OFF:
      return { ...state, darkMode: false };
    default:
      state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{children}</Store.Provider>;
}
