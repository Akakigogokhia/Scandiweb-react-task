import {
  ADD_TO_CART,
  CHANGE_QUANTITY,
  COUNT_QUANTITY,
  COUNT_SUBTOTAL,
  DELETE_PRODUCT,
  SHOW_MINI_CART,
} from '../constants';

export const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  id: 0,
  quantity: 0,
  category: 'all',
  currency: JSON.parse(localStorage.getItem('currency')) || '$',
  total: 0,
  miniCart: false,
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      localStorage.setItem(
        'cart',
        JSON.stringify([...state.cart, action.product])
      );
      return {
        ...state,
        cart: [...state.cart, action.product],
      };

    case SHOW_MINI_CART:
      const newMiniCart =
        action.isShown === undefined ? !state.miniCart : action.isShown;
      return {
        ...state,
        miniCart: newMiniCart,
      };

    case COUNT_SUBTOTAL:
      let total = 0;
      state.cart.forEach((item) => {
        total +=
          item.prices.find((price) => price.currency.symbol === state.currency)
            .amount * item.quantity;
      });

      return {
        ...state,
        total: total,
      };

    case DELETE_PRODUCT:
      const newCart = state.cart.filter((product) => product.id !== action.id);
      localStorage.setItem('cart', JSON.stringify(newCart));
      return {
        ...state,
        cart: newCart,
      };

    case CHANGE_QUANTITY:
      let cartUpdate = [...state.cart];
      cartUpdate.map((product) => {
        if (product.id === action.id) {
          if (action.symbol === '+' && product.quantity < 30) {
            product.quantity += 1;
          } else if (action.symbol === '-' && product.quantity > 1) {
            product.quantity -= 1;
          }
        }
      });
      localStorage.setItem('cart', JSON.stringify(cartUpdate));
      return {
        ...state,
        cart: cartUpdate,
      };

    case COUNT_QUANTITY:
      let newQuantity = 0;
      state.cart.forEach((item) => (newQuantity += item.quantity));
      return {
        ...state,
        quantity: newQuantity,
      };

    default:
      return state;
  }
};
