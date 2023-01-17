import {
  CHANGE_ATTRIBUTE,
  CHANGE_CATEGORY,
  CHANGE_CURRENCY,
  CHANGE_ID,
  FIX_PRODUCT,
} from '../constants';

export const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  id: 0,
  quantity: 0,
  category: 'all',
  fixedProduct: JSON.parse(localStorage.getItem('product')) || [],
  currency: JSON.parse(localStorage.getItem('currency')) || '$',
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return {
        ...state,
        category: action.category,
      };

    case CHANGE_CURRENCY:
      localStorage.setItem('currency', JSON.stringify(action.currency));
      return {
        ...state,
        currency: action.currency,
      };

    case CHANGE_ID:
      return {
        ...state,
        fixedProduct: { ...state.fixedProduct, id: action.id },
      };

    case FIX_PRODUCT:
      localStorage.setItem('product', JSON.stringify(action.product));
      return {
        ...state,
        fixedProduct: action.product,
      };

    default:
      return state;
  }
};
