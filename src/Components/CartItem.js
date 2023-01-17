import React from 'react';
import { connect } from 'react-redux';
import '../Css/CartItem.css';

class CartItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      quantity: 1,
      attributes: this.props.attributes,
    };
  }

  componentDidUpdate() {
    localStorage.setItem('cart', JSON.stringify(this.props.cart));
  }

  renderAttributes = () => {
    const attributes = this.props.info.attributes;
    return attributes.map((attribute) => {
      return (
        <div key={attribute.name} className='attribute__container'>
          <div className='attributeName'>{attribute.name}:</div>
          {attribute.items.map((item) => {
            return (
              <div
                className={
                  attribute.type === 'text'
                    ? this.state.attributes[attribute.name] === item.value
                      ? 'clicked attribute1'
                      : 'attribute1'
                    : this.state.attributes[attribute.name] === item.value
                    ? 'col color'
                    : 'color'
                }
                style={{ backgroundColor: item.value }}
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

  changeImage = (dir) => {
    const gallery = this.props.info.gallery;
    const len = gallery.length - 1;
    if (dir === '<') {
      if (this.state.index > 0) this.setState({ index: this.state.index - 1 });
      else this.setState({ index: len });
    } else {
      if (this.state.index === len) this.setState({ index: 0 });
      else this.setState({ index: this.state.index + 1 });
    }
  };

  changeCount = (symbol) => {
    symbol === '-' && this.props.quantity === 1
      ? this.props.deleteProduct(this.props.id) && this.props.onDelete()
      : this.props.changeQuantity(this.props.id, symbol);
  };

  render() {
    const gallery = this.props.info.gallery;
    return (
      <main className='cartItem__container'>
        <div
          className='cartItem'
          style={{
            marginLeft: `${this.props.margin}px`,
            marginRight: `${this.props.margin - 50}px`,
          }}
        >
          <div className='cartItem__info'>
            <h1 className='cart__productBrand'>{this.props.info.brand}</h1>
            <div className='cart__productName'>{this.props.info.name}</div>
            <div className='cartItem__price'>
              {this.props.currency + this.props.priceInfo.amount.toFixed(2)}
              <div className='cartItem__attributes'>
                {<this.renderAttributes />}
              </div>
            </div>
          </div>
          <div className='container'>
            <div className='cartItem__quantity'>
              <div
                onClick={() => this.changeCount('+')}
                className='changeQuantity'
              >
                +
              </div>
              <div className='quantity'>{this.props.quantity}</div>
              <div
                onClick={() => this.changeCount('-')}
                className='changeQuantity'
              >
                -
              </div>
            </div>
            <div className='cartItem__images'>
              <section className='imgArrow'>
                <img
                  className='cartItem__image'
                  src={gallery[this.state.index]}
                />

                {this.props.margin > 50 && (
                  <div
                    className='cartItem__arrows'
                    style={{
                      display:
                        this.props.info.gallery.length === 1 ? 'none' : 'flex',
                    }}
                  >
                    <div onClick={() => this.changeImage('<')}>{'<'}</div>
                    <div onClick={() => this.changeImage('>')}>{'>'}</div>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
        <hr />
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer.cart,
    fixedAttr: state.productReducer.attributes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProduct: (id) => dispatch({ type: 'DELETE_PRODUCT', id: id }),
    changeQuantity: (id, symbol) =>
      dispatch({ type: 'CHANGE_QUANTITY', id: id, symbol: symbol }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
