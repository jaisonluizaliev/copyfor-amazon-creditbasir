import Cookies from 'js-cookie';
import { createContext, useReducer } from 'react';

export const Store = createContext();

export const actionTypes = {
  DARK_MODE_ON: 'DARK_MODE_ON',
  DARK_MODE_OFF: 'DARK_MODE_OFF',
  CART_ADD_ITEM: 'CART_ADD_ITEM',
  CART_REMOVE_ITEM: 'CART_REMOVE_ITEM',
  USER_LOGIN: 'USER_LOGIN',
  USER_LOGOUT: 'USER_LOGOUT',
};

const initialState = {
  darkMode: Cookies.get('darkMode') === 'ON' ? true : false,
  cart: {
    cartItems: Cookies.get('cardItems')
      ? JSON.parse(Cookies.get('cardItems'))
      : [],
  },
  userInfo: Cookies.get('cartItems')
    ? JSON.parse(Cookies.get('userInfo'))
    : null,
};

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.DARK_MODE_ON:
      return { ...state, darkMode: true };
    case actionTypes.DARK_MODE_OFF:
      return { ...state, darkMode: false };
    case actionTypes.CART_ADD_ITEM: {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      Cookies.set('cardItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case actionTypes.CART_REMOVE_ITEM: {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      Cookies.set('cardItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case actionTypes.USER_LOGIN:
      return { ...state, userInfo: action.payload };
    case actionTypes.USER_LOGOUT:
      return { ...state, userInfo: null, cart: { cartItems: [] } };

    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{children}</Store.Provider>;
}
