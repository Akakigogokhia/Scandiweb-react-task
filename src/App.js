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
                <Header key={'1'} />,
                <CategoryPage key={'2'} />,
                <MiniCart key={'3'} />,
              ]}
            />

            <Route
              path='/product/:id'
              element={[
                <Header key={'4'} />,
                <ProductPage key={'5'} />,
                <MiniCart key={'6'} />,
              ]}
            />

            <Route
              path='/cart'
              element={[<Header key={'7'} />, <Cart key={'8'} />]}
            />

            <Route path='*' element={<Navigate to='/home' />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
