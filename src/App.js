import './Css/App.css';
import React from 'react';
import Header from './Components/Header';
import CategoryPage from './Pages/CategoryPage';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import ProductPage from './Pages/ProductPage';
import Cart from './Pages/Cart';
import MiniCart from './Components/MiniCart';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className='App'>
                    <Routes>
                        <Route
                            path='/home'
                            element={[
                                <Header />,
                                <CategoryPage />,
                                <MiniCart />,
                            ]}
                        />

                        <Route
                            path='/product/:id'
                            element={[
                                <Header />,
                                <ProductPage />,
                                <MiniCart />,
                            ]}
                        />

                        <Route path='/cart' element={[<Header />, <Cart />]} />

                        <Route path='*' element={<Navigate to='/home' />} />
                    </Routes>
                </div>
            </Router>
        );
    }
}

export default App;
