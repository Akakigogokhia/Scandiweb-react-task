import React from 'react';
import '../Css/MiniCart.css';
import { connect } from 'react-redux';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';

class MiniCart extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      top: 888,
      attribute: {
        id: 0,
        attributes: {},
      },
    };
  }

  componentDidUpdate() {
    this.props.Subtotal();
    this.props.countQuantity();
  }

  renderCartItems = () => {
    const cart = this.props.cart;

    return cart.map((cartItem) => {
      const priceInfo = cartItem.info.prices.find(
        (prices) => prices.currency.symbol === this.props.currency
      );
      return (
        <CartItem
          id={cartItem.id}
          key={cartItem.id}
          info={cartItem.info}
          priceInfo={priceInfo}
          attributes={cartItem.attributes}
          currency={priceInfo.currency.symbol}
          quantity={cartItem.quantity}
          margin={50}
          onDelete={this.onDelete}
        />
      );
    });
  };

  onDelete = () => {
    const div = document.querySelector('.miniCart');
    div.scrollTo(0, 0);
  };

  scroll = () => {
    const parent = document.querySelector('.miniCart');
    this.setState({ top: parent.scrollTop + 888 });
  };

  render() {
    return (
      <div
        className='miniCart'
        onScroll={this.scroll}
        style={{ display: this.props.miniCart ? 'block' : 'none' }}
      >
        <div className='miniCart__header'>
          <strong>My Bag,</strong> {this.props.quantity} items
        </div>
        <div className='miniCart__container'>{<this.renderCartItems />}</div>
        <div
          className='miniCart__footer'
          style={{ top: this.state.top + 'px' }}
        >
          <div className='miniCart__total'>
            <p>Total:</p>
            <p>{this.props.currency + this.props.total.toFixed(2)}</p>
          </div>
          <div className='miniCart__buttons'>
            <Link to='/cart' style={{ width: '30%' }}>
              <button
                className='btn'
                onClick={() => this.props.ShowMiniCart(false)}
              >
                VIEW CART
              </button>
            </Link>
            <Link to='/cart' style={{ width: '30%' }}>
              <button id='checkout' className='btn'>
                CHECK OUT
              </button>
            </Link>
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
    quantity: state.cartReducer.quantity,
    total: state.cartReducer.total,
    miniCart: state.cartReducer.miniCart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Subtotal: () => dispatch({ type: 'COUNT_SUBTOTAL' }),
    ShowMiniCart: (isShown) =>
      dispatch({ type: 'SHOW_MINI_CART', isShown: isShown }),
    countQuantity: () => dispatch({ type: 'COUNT_QUANTITY' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);
