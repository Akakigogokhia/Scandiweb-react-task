import React from 'react';
import { connect } from 'react-redux';
import CartItem from '../Components/CartItem';
import '../Css/Cart.css';

class Cart extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isDisabled: false,
    };
  }

  componentDidUpdate() {
    this.props.Subtotal();
    this.props.countQuantity();
  }

  componentDidMount() {
    this.props.Subtotal();
  }

  renderCartItems = () => {
    const cart = this.props.cart;
    return cart.map((cartItem, index) => {
      const priceInfo = cartItem.info.prices.find(
        (prices) => prices.currency.symbol === this.props.currency
      );
      return (
        <CartItem
          index={index}
          id={cartItem.id}
          key={cartItem.id}
          info={cartItem.info}
          priceInfo={priceInfo}
          quantity={cartItem.quantity}
          attributes={cartItem.attributes}
          currency={priceInfo.currency.symbol}
          margin={100}
        />
      );
    });
  };

  render() {
    const total = this.props.total;
    const symbol = JSON.parse(localStorage.getItem('currency'));
    return (
      <div className='cart'>
        <h1 className='cart__name'>CART</h1>
        <hr />
        <this.renderCartItems />
        <div className='cart__total'>
          <div>
            <div>Tax 21%: </div>
            {symbol
              ? symbol + (total * 0.21).toFixed(2)
              : '$' + (total * 0.21).toFixed(2)}
          </div>

          <div>
            <div>Quantitiy: </div>
            <div className='cart__numbers'>{this.props.quantity}</div>
          </div>
          <div>
            <div>Total: </div>
            <div className='cart__numbers'>
              {symbol
                ? symbol + (1.21 * total).toFixed(2)
                : '$' + (1.21 * total).toFixed(2)}
            </div>
          </div>
          <div className='cart__orderButton'>
            <button>ORDER</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer.cart,
    currency: state.productReducer.currency,
    total: state.cartReducer.total,
    quantity: state.cartReducer.quantity,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Subtotal: () => dispatch({ type: 'COUNT_SUBTOTAL' }),
    countQuantity: () => dispatch({ type: 'COUNT_QUANTITY' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
