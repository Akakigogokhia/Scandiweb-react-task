import React from 'react';
import { connect } from 'react-redux';
import '../Css/ProductPage.css';

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.fixedProduct.gallery[0],
      attributes: {},
    };
  }

  renderAttributes = () => {
    const attributes = this.props.fixedProduct.attributes;
    return attributes.map((attribute) => {
      return (
        <div key={attribute.name} className='productPage__attribute'>
          <div className='attributeName'>{attribute.name.toUpperCase()}:</div>
          {attribute.items.map((item) => {
            return (
              <div
                className={
                  attribute.type === 'text'
                    ? this.state.attributes[attribute.name] === item.value
                      ? 'clicked attribute'
                      : 'attribute'
                    : this.state.attributes[attribute.name] === item.value
                    ? 'col color'
                    : 'color'
                }
                style={{ backgroundColor: item.value }}
                onClick={() =>
                  this.selectAttributes(attribute.name, item.value)
                }
                key={item.id}
              >
                {attribute.type === 'swatch' ? '' : item.value}
              </div>
            );
          })}
        </div>
      );
    });
  };

  getPrice = () => {
    const priceInfo = this.props.fixedProduct.prices.find(
      (prices) => prices.currency.symbol === this.props.currency
    );
    const price = priceInfo.currency.symbol + priceInfo.amount.toFixed(2);
    return (
      <div className='productPage__price'>
        <div>PRICE:</div>
        <div id='productPage__price'>{price}</div>
      </div>
    );
  };

  renderPhotos = () => {
    return this.props.fixedProduct.gallery.map((image) => {
      return (
        <img
          key={image}
          onClick={() => this.setState({ image: image })}
          className='productPage__photos'
          src={image}
        />
      );
    });
  };

  selectAttributes = (name, value) => {
    const newAttr = this.state.attributes;
    newAttr[name] = value;
    this.setState({ attributes: newAttr });
  };

  addToCart = (product) => {
    this.props.addToCart(product);
    this.setState({ attributes: {} });
  };

  createProduct = (info) => {
    const product = {
      id: Math.floor(Math.random() * 1000),
      quantity: 1,
      prices: info.prices,
      info: info,
      attributeOptions: info.attributes,
      attributes: this.state.attributes,
    };
    this.addToCart(product);
  };

  render() {
    const product = this.props.fixedProduct;
    return (
      <main
        onClick={() => this.props.ShowMiniCart(false)}
        className={!this.props.miniCart ? 'productPage' : 'productPage dark'}
      >
        <div className='productPage__photoContainer'>
          <this.renderPhotos />
        </div>
        <div className='productPage__container'>
          <img src={this.state.image} />
          <div className='productPage__description'>
            <div className='productPage__brand'>{product.brand}</div>
            <div className='productPage__name'>{product.name}</div>
            <div className='productPage__attributes'>
              {<this.renderAttributes />}
              <div>{<this.getPrice />}</div>
            </div>
            {!product.inStock && <div>OUT OF STOCK</div>}
            <button
              className='productPage__addToCart'
              disabled={
                !product.inStock ||
                (Object.keys(this.state.attributes).length === 0 &&
                  Object.keys(this.props.fixedProduct.attributes).length > 0)
              }
              onClick={() => this.createProduct(product)}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer.cart,
    fixedProduct: state.productReducer.fixedProduct,
    currency: state.productReducer.currency,
    fixedAttr: state.productReducer.attributes,
    miniCart: state.cartReducer.miniCart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (product) => dispatch({ type: 'ADD_TO_CART', product: product }),
    ShowMiniCart: (isShown) =>
      dispatch({ type: 'SHOW_MINI_CART', isShown: isShown }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
