import React from 'react';
import User from'./User';
import style from './css/UsersList.css';



  class UsersList extends React.Component {
    get users() {
      return this.props.users.map(user => <User key={user.id} user={user}/>);
    }
   render() {
      return (
       <div className={style.users__container}>
          {this.users}
        </div>
      );
    }
  }

  export default UsersList;