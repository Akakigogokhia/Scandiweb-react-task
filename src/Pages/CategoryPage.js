import React from 'react';
import '../Css/CategoryPage.css';
import Product from '../Components/Product';
import { GET_DATA } from '../Query';
import { graphql } from '@apollo/client/react/hoc';
import { connect } from 'react-redux';

class CategoryPage extends React.PureComponent {
  renderProducts = () => {
    if (this.props.data.loading) {
      return <h1>Loading...</h1>;
    } else {
      const categories = this.props.data.categories;
      const products = categories.find(
        (category) => category.name === this.props.category
      ).products;

      return products.map((product) => {
        const priceInfo = product.prices.find(
          (prices) => prices.currency.symbol === this.props.currency
        );
        return (
          <Product key={product.id} info={product} priceInfo={priceInfo} />
        );
      });
    }
  };

  render() {
    return (
      <div
        className={!this.props.miniCart ? 'categoryPage' : 'categoryPage dark'}
        onClick={() => this.props.ShowMiniCart(false)}
      >
        <div className='categoryPage__name'>
          {this.props.category.toUpperCase()}
        </div>
        <div className='product__container'>{<this.renderProducts />}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    category: state.productReducer.category,
    currency: state.productReducer.currency,
    miniCart: state.cartReducer.miniCart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ShowMiniCart: (isShown) =>
      dispatch({ type: 'SHOW_MINI_CART', isShown: isShown }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(graphql(GET_DATA)(CategoryPage));
