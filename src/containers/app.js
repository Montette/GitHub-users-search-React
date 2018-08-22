import React from 'react';
import { hot } from 'react-hot-loader';
import UsersList from'../components/UsersList';
import style from './App.css';



class App extends React.Component {

    constructor() {
      super();
      this.state = {
        searchText: '',
        foundText: '',    
        users: [],
        submit: false    
      };
    }
  
    onChangeHandle(event) {
      this.setState({searchText: event.target.value});
    }
  
    onSubmit(event) {
      event.preventDefault();
      const {searchText} = this.state;
      const foundText = this.state.searchText.slice();  
      const url = `https://api.github.com/search/users?q=${searchText}`;
      fetch(url)
        .then(response => response.json())
        .then(responseJson => this.setState({users: responseJson.items, submit: true, foundText: foundText}));
    }
  
    render() {
      return (
        <div>
          <header className={style.header}>
          <div className={style.header__container}>
              <div className={style.header__logo}>
                  <img className={style.logo__picture} src='img/git.png' />
                  <div><h1 className={style.logo__title}>GitHub User Finder</h1>
                  <p className={style.logo__describe}>Search users via <a  href='https://developer.github.com/v3/' target='blank' className={style.logo__link}>the GitHub Api</a></p></div>
              </div>
              <form onSubmit={event => this.onSubmit(event)}>
                <label htmlFor="searchText">Search by user name</label>
                <input
                  type="text"
                  id="searchText"
                  placeholder='Search'
                  onChange={event => this.onChangeHandle(event)}
                  value={this.state.searchText}/>
              </form>
          </div>
          </header>
          <main className={style.users}>
             {this.state.submit ? <h2 className={style.users__title}>Found {this.state.users.length} results for <span className={style.users__titleColor}>{this.state.foundText}</span></h2> : null}
              <UsersList users={this.state.users}/>
          </main>
        </div>
      );
    }  
         
  }

  export default hot(module)(App);
  
  
  
  
 
  
  
  