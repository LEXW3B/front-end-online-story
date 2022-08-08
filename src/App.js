// Main Imports
import React from 'react';
import './App.css';
// Logic Imports
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import * as api from './services/api';
// Component Imports
import Carrinho from './components/Carrinho';
import Content from './components/Content';
import SideBar from './components/SideBar';
import Header from './components/Header';
import Product from './components/Product';

class App extends React.Component {
  state = {
    searchInput: '',
    clickSearch: false,
    searchResult: {
      results: [],
    },
  }

  handleChange = ({ target }) => {
    this.setState({
      searchInput: target.value,
    });
  }

  searchRequest = async () => {
    const { searchInput } = this.state;
    const request = await api.getProductsFromCategoryAndQuery('', searchInput);

    this.setState({
      searchResult: request,
      clickSearch: true,
    });
  }

  setFilterCategory = async (categoryId) => {
    const { searchInput } = this.state;
    const request = await api.getProductsFromCategoryAndQuery(categoryId, searchInput);

    this.setState({
      searchResult: request,
      clickSearch: true,
    });
  }

  render() {
    const { searchInput, searchResult, clickSearch } = this.state;

    return (
      <BrowserRouter>
        <h1>Front-end Online Store</h1>
        <div className="header">

          <Header
            handleChange={ this.handleChange }
            searchRequest={ this.searchRequest }
            createProductCard={ this.createProductCard }
          />
        </div>
        <div className="page-body">
          <Switch>
            <Route exact path="/">
              <SideBar
                setFilterCategory={ this.setFilterCategory }
              />
              <Content
                searchInput={ searchInput }
                searchResult={ searchResult }
                clickSearch={ clickSearch }
              />
            </Route>
            <Route exact path="/carrinho" component={ Carrinho } />
            <Route exact path="/product/:id" component={ Product } />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
