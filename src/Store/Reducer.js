export const initialState = {
	cart: JSON.parse(localStorage.getItem('cart')) || [],
	id: 0,
	quantity: 0,
	category: 'all',
	fixedProduct: JSON.parse(localStorage.getItem('product')) || [],
	currency: JSON.parse(localStorage.getItem('currency')) || '$',
	subtotal: {
		total: 0,
	},
	miniCart: false,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'CHANGE_CATEGORY':
			return {
				...state,
				category: action.category,
			};

		case 'CHANGE_CURRENCY':
			localStorage.setItem('currency', JSON.stringify(action.currency));
			return {
				...state,
				currency: action.currency,
			};

		case 'ADD_TO_CART':
			localStorage.setItem(
				'cart',
				JSON.stringify([...state.cart, action.product])
			);
			return {
				...state,
				cart: [...state.cart, action.product],
			};

		case 'SHOW_MINI_CART':
			const newMiniCart =
				action.isShown === undefined ? !state.miniCart : action.isShown;
			return {
				...state,
				miniCart: newMiniCart,
			};

		case 'COUNT_SUBTOTAL':
			let total = 0;
			state.cart.map((item) => {
				total +=
					item.prices.find(
						(price) => price.currency.symbol == state.currency
					).amount * item.quantity;
			});
			const obj = {
				total: total,
			};
			return {
				...state,
				subtotal: { total: obj.total },
			};

		case 'CHANGE_ID':
			return {
				...state,
				fixedProduct: { ...state.fixedProduct, id: action.id },
			};

		case 'DELETE_PRODUCT':
			const newCart = state.cart.filter(
				(product) => product.id != action.id
			);
			localStorage.setItem('cart', JSON.stringify(newCart));
			return {
				...state,
				cart: newCart,
			};

		case 'CHANGE_ATTRIBUTE':
			alert('hoiaa');
			let changedCart = [...state.cart];
			changedCart.map((product) => {
				if (product.id == action.id) {
					product.attributes.push(action.attributes);
				}
			});
			return {
				...state,
				cart: changedCart,
			};

		case 'FIX_PRODUCT':
			localStorage.setItem('product', JSON.stringify(action.product));
			return {
				...state,
				fixedProduct: action.product,
			};

		case 'CHANGE_QUANTITY':
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

		case 'COUNT_QUANTITY':
			let newQuantity = 0;
			state.cart.map((item) => (newQuantity += item.quantity));
			return {
				...state,
				quantity: newQuantity,
			};

		default:
			return state;
	}
};

export default reducer;
