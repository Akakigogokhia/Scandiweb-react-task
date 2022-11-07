import React from 'react';
import '../Css/CategoryPage.css';
import Product from '../Components/Product';
import { GET_DATA } from '../Query';
import { graphql } from '@apollo/client/react/hoc';
import { store } from '../Store/store';

class CategoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: store.getState().category,
            currency: store.getState().currency,
            miniCart: store.getState().miniCart,
        };
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({
                category: store.getState().category,
                currency: store.getState().currency,
                miniCart: store.getState().miniCart,
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    showProducts = () => {
        if (this.props.data.loading) {
            return <h1>Loading...</h1>;
        } else {
            const categories = this.props.data.categories;
            const products = categories.find(
                (category) => category.name == this.state.category
            ).products;

            return products.map((product) => {
                const priceInfo = product.prices.find(
                    (prices) => prices.currency.symbol == this.state.currency
                );
                return (
                    <Product
                        key={product.id}
                        info={product}
                        priceInfo={priceInfo}
                    />
                );
            });
        }
    };

    render() {
        return (
            <div
                className={
                    !this.state.miniCart ? 'categoryPage' : 'categoryPage dark'
                }
            >
                <div className='categoryPage__name'>
                    {this.state.category.toUpperCase()}
                </div>
                <div className='product__container'>
                    {<this.showProducts />}
                </div>
            </div>
        );
    }
}

export default graphql(GET_DATA)(CategoryPage);
