import React from 'react';
import '../Css/Product.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Product extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      cartShown: false,
    };
  }

  showButton = (hover) => {
    this.setState({ cartShown: hover });
  };

  addToCart = () => {
    const product = {
      id: Math.floor(Math.random() * 1000),
      quantity: 1,
      info: this.props.info,
      prices: this.props.info.prices,
      attributeOptions: this.props.info.attributes,
      attributes: {},
    };
    this.props.addToCart(product);
  };

  render() {
    return (
      <div
        className={
          !this.props.info.inStock ? 'product transparent' : 'product inStock'
        }
        onMouseEnter={() => this.showButton(true)}
        onMouseLeave={() => this.showButton(false)}
      >
        <div className='product__image'>
          {!this.props.info.inStock && <div id='msg'>OUT OF STOCK</div>}
          <Link to={`/product/${this.props.info.id}`}>
            <img
              onClick={() => this.props.fixProduct(this.props.info)}
              className='img'
              src={this.props.info.gallery[0]}
            />
          </Link>
          <div
            className={
              this.props.info.inStock
                ? this.state.cartShown
                  ? 'addToCartVis'
                  : 'addToCartHid'
                : 'hidden'
            }
            onClick={() => this.addToCart()}
          >
            <img src='../addToCart.svg' />
          </div>
        </div>

        <div className='product__description'>
          <div>{this.props.info.name}</div>
          <div className='product__price'>
            {this.props.priceInfo.currency.symbol +
              this.props.priceInfo.amount.toFixed(2)}
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCategory: (category) =>
      dispatch({ type: 'CHANGE_CATEGORY', category: category }),
    addToCart: (product) => dispatch({ type: 'ADD_TO_CART', product: product }),
    fixProduct: (product) =>
      dispatch({ type: 'FIX_PRODUCT', product: product }),
    selectAttribute: (attributes) => {
      dispatch({ type: 'SELECT_ATTRIBUTES', attributes: attributes });
    },
  };
};

export default connect(null, mapDispatchToProps)(Product);
