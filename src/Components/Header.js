import React from 'react';
import { Link } from 'react-router-dom';
import '../Css/Header.css';
import { GET_CATEGORY_CURRENCY } from '../Query';
import { graphql } from '@apollo/client/react/hoc';
import { store } from '../Store/store';
import { connect } from 'react-redux';
import uuid from 'react-uuid';

class Header extends React.PureComponent {
  componentDidMount() {
    const closeMiniCart = (e) => {
      let element = document.querySelector('.miniCart');
      if (
        e.target.className !== 'emptyCart' &&
        !element.contains(e.target) &&
        e.target.className !== 'cart__count' &&
        e.target.className !== 'delete' &&
        e.target.className !== 'changeQuantity'
      ) {
        console.log(e.target.className);
        this.props.ShowMiniCart(false);
      }
    };
    document.body.addEventListener('click', closeMiniCart);
  }

  handleOptionChange = (e) => {
    this.props.changeCurrency(e.target.value);
  };

  renderCategory = () => {
    if (this.props.data.loading) {
      <div className='header__categories'></div>;
    } else {
      const categories = this.props.data.categories;
      return categories.map((category) => {
        return (
          <Link key={uuid()} to={`/home/${category.name}`} className='link'>
            <div
              className={
                this.props.category !== category.name
                  ? 'header__option'
                  : 'header__option header__option__focus'
              }
              key={category.name}
              onClick={() => this.props.changeCategory(category.name)}
            >
              {category.name.toUpperCase()}
            </div>
          </Link>
        );
      });
    }
  };

  showCurrencyOptions = () => {
    if (!this.props.data.loading) {
      const currencies = this.props.data.currencies;
      return currencies.map((currency) => {
        return (
          <option
            key={currency.label}
            value={currency.symbol}
            label={currency.symbol + ' ' + currency.label}
          ></option>
        );
      });
    }
  };

  render() {
    return (
      <main className='header'>
        <div className='header__categories'>{<this.renderCategory />}</div>
        <div
          className='header__logo'
          onClick={() => this.props.ShowMiniCart(false)}
        >
          <Link to='/'>
            <img
              onClick={() => this.props.changeCategory('all')}
              src={'../logo.svg'}
            />
          </Link>
        </div>
        <div className='header__options'>
          <div>
            <select
              className='header__select'
              value={this.props.currency}
              onChange={this.handleOptionChange}
            >
              {<this.showCurrencyOptions />}
            </select>
          </div>
          <div
            className='header__cart'
            onClick={() => this.props.ShowMiniCart()}
          >
            <img className='emptyCart' src='../empty-cart.svg' />
            <div className='cart__count'>{this.props.cart.length}</div>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cartReducer.cart,
    miniCart: state.cartReducer.miniCart,
    category: state.productReducer.category,
    currency: state.productReducer.currency,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCategory: (category) =>
      dispatch({ type: 'CHANGE_CATEGORY', category: category }),
    changeCurrency: (currency) =>
      dispatch({ type: 'CHANGE_CURRENCY', currency: currency }),
    ShowMiniCart: (isShown) =>
      dispatch({ type: 'SHOW_MINI_CART', isShown: isShown }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(graphql(GET_CATEGORY_CURRENCY)(Header));
