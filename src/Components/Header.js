import React from 'react';
import { Link } from 'react-router-dom';
import '../Css/Header.css';
import { GET_CATEGORY } from '../Query';
import { graphql } from '@apollo/client/react/hoc';
import { store } from '../Store/store';
import { connect } from 'react-redux';
import uuid from 'react-uuid';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: store.getState().category,
            currency: store.getState().currency,
            quantity: store.getState().cart.length,
        };
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({
                currency: store.getState().currency,
                category: store.getState().category,
                quantity: store.getState().cart.length,
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleOptionChange = (e) => {
        this.props.changeCurrency(e.target.value);
    };

    showCategory = () => {
        if (this.props.data.loading) {
            <div className='header__categories'></div>;
        } else {
            const categories = this.props.data.categories;
            this.state.loading = false;
            return categories.map((category) => {
                return (
                    <Link key={uuid()} to={`/home/${category.name}`} className='link'>
                    <div
                        className='header__option'
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
            const categories = this.props.data.categories[0];
            const pricesArray = categories.products[0].prices;
            return pricesArray.map((price) => {
                const currency = price.currency;
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
            <div className='header'>
                <div className='header__categories'>
                    {<this.showCategory />}
                </div>
                <div
                    className='header__logo'
                    onClick={() => this.props.ShowMiniCart(false)}
                >
                    <Link to='/'>
                        <img src={'../logo.svg'} />
                    </Link>
                </div>
                <div className='header__options'>
                    <div>
                        <select
                            className='header__select'
                            value={this.state.currency}
                            onChange={this.handleOptionChange}
                        >
                            {<this.showCurrencyOptions />}
                        </select>
                    </div>
                    <div
                        onClick={() => this.props.ShowMiniCart()}
                        className='header__cart'
                    >
                        <img className='emptyCart' src='../empty-cart.svg' />
                        <div>{this.state.quantity}</div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        miniCart: state.miniCart,
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
)(graphql(GET_CATEGORY)(Header));
