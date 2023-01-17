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

class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <div className='App'>
          <Header />
          <Routes>
            <Route
              path='/home'
              element={[<CategoryPage key={2} />, <MiniCart key={1} />]}
            />
            <Route
              path='/home/:category'
              element={[<CategoryPage key={2} />, <MiniCart key={1} />]}
            />

            <Route
              path='/product/:id'
              element={[<ProductPage key={2} />, <MiniCart key={1} />]}
            />

            <Route path='/cart' element={[<Cart />]} />

            <Route path='*' element={<Navigate to='/home' />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;
