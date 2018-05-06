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
        <header className='header'>
        <div className='header__container'>
            <div className="header__logo">
                <img className='logo__picture' src='img/git.png' />
                <div><h1 className='logo__title'>GitHub User Finder</h1>
                <p className='logo__describe'>Search users via <a  href='https://developer.github.com/v3/' target='blank' className='logo__link'>the GitHub Api</a></p></div>
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
        <main className='users'>
           {this.state.submit ? <h2 className='users__title'>Found {this.state.users.length} results for <span className='users__title--color'>{this.state.foundText}</span></h2> : null}
            <UsersList users={this.state.users}/>
        </main>
      </div>
    );
  }  
       
}


class UsersList extends React.Component {
  get users() {
    return this.props.users.map(user => <User key={user.id} user={user}/>);
  }
 render() {
    return (
     <div className='users__container'>
        {this.users}
      </div>
    );
  }
}


    
class User extends React.Component {
  render() {
    return (
      <div className='users__item'>
     <a href={this.props.user.html_url} className='users__link--photo' target="_blank"> <img className='users__photo' src={this.props.user.avatar_url}/> <div className='users__layer'><p>See profile</p></div> </a>
        <a href={this.props.user.html_url} className='users__link--name' target="_blank">{this.props.user.login}</a>
        
      </div>
    );
  }
}

















ReactDOM.render(
  <App />,
  document.getElementById('root')
);