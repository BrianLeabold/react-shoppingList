import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';
import { Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import './App.css';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <div className='App'>
          <header className='App-header'>
            <AppNavbar />
            <Container className='row'>
              <div className='col-md-3'></div>
              <div className='col-md-6 col-sm-12'>
                <ItemModal />
                <ShoppingList />
              </div>
              <div className='col-md-3'></div>
            </Container>
          </header>
        </div>
      </Provider>
    );
  }
}

export default App;
