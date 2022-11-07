import React from 'react';
import { connect } from 'react-redux';
import CartItem from '../Components/CartItem';
import '../Css/Cart.css';

class Cart extends React.Component {
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

    showCartItems = () => {
        const cart = this.props.cart;
        return cart.map((cartItem, index) => {
            const priceInfo = cartItem.info.prices.find(
                (prices) => prices.currency.symbol == this.props.currency
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
                <this.showCartItems />
                <div className='cart__total'>
                    <div>
                        <div>Tax 21%: </div>
                        <div className='cart__numbers'>
                            {symbol + (total * 0.21).toFixed(2)}
                        </div>
                    </div>
                    <div>
                        <div>Quantitiy: </div>
                        <div className='cart__numbers'>
                            {this.props.quantity}
                        </div>
                    </div>
                    <div>
                        <div>Total: </div>
                        <div className='cart__numbers'>
                            {symbol + (1.21 * total).toFixed(2)}
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
        cart: state.cart,
        currency: state.currency,
        total: state.subtotal.total,
        quantity: state.quantity,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        Subtotal: () => dispatch({ type: 'COUNT_SUBTOTAL' }),
        countQuantity: () => dispatch({ type: 'COUNT_QUANTITY' }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
