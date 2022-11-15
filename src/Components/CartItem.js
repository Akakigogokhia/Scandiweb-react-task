import React from 'react';
import { connect } from 'react-redux';
import '../Css/CartItem.css';

class CartItem extends React.Component {
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

  showAttributes = () => {
    const attributes = this.props.info.attributes;
    return attributes.map((attribute) => {
      return (
        <div key={attribute.name} className='attribute__container'>
          <div className='attributeName'>{attribute.name.toUpperCase()}:</div>
          {attribute.items.map((item) => {
            return (
              <div
                className={
                  attribute.type == 'text'
                    ? this.state.attributes[attribute.name] == item.value
                      ? 'clicked attribute'
                      : 'attribute'
                    : this.state.attributes[attribute.name] == item.value
                    ? 'col color'
                    : 'color'
                }
                style={{ backgroundColor: item.value }}
                key={item.id}
                onClick={() =>
                  this.selectAttributes(attribute.name, item.value)
                }
              >
                {attribute.type == 'swatch' ? '' : item.value}
              </div>
            );
          })}
        </div>
      );
    });
  };

  selectAttributes = (name, value) => {
    const newAttr = this.state.attributes;
    newAttr[name] = value;
    this.setState({ attributes: newAttr });
    this.props.changeAttributes(this.props.id, this.state.attributes);
  };

  changeImage = (dir) => {
    const gallery = this.props.info.gallery;
    const len = gallery.length - 1;
    if (dir == '<') {
      if (this.state.index > 0) this.setState({ index: this.state.index - 1 });
      else this.setState({ index: len });
    } else {
      if (this.state.index == len) this.setState({ index: 0 });
      else this.setState({ index: this.state.index + 1 });
    }
  };

  changeCount = (symbol) => {
    this.props.changeQuantity(this.props.id, symbol);
  };

  render() {
    const gallery = this.props.info.gallery;
    return (
      <div className='cartItem__container'>
        <div className='cartItem'>
          <div className='cartItem__info'>
            <h1 className='cart__productBrand'>{this.props.info.brand}</h1>
            <div className='cart__productName'>{this.props.info.name}</div>
            <div className='cartItem__price'>
              {this.props.currency + this.props.priceInfo.amount.toFixed(2)}
              <div className='cartItem__attributes'>
                {<this.showAttributes />}
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
              <img
                className='cartItem__image'
                src={gallery[this.state.index]}
              />
            </div>
            <div className='cartItem__changeImage'>
              <div className='cartItem__arrows'>
                <div onClick={() => this.changeImage('<')}>{'<'}</div>
                <div onClick={() => this.changeImage('>')}>{'>'}</div>
              </div>
              <img
                onClick={() => this.props.deleteProduct(this.props.id)}
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Delete-button.svg/862px-Delete-button.svg.png'
              />
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    fixedAttr: state.attributes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProduct: (id) => dispatch({ type: 'DELETE_PRODUCT', id: id }),
    changeQuantity: (id, symbol) =>
      dispatch({ type: 'CHANGE_QUANTITY', id: id, symbol: symbol }),
    changeAttributes: (id, attributes) =>
      dispatch({
        type: 'CHANGE_ATTRIBUTES',
        id: id,
        attributes: attributes,
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
