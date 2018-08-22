import React from 'react';
import style from './css/User.css';

  const User = props => {
      return (
        <div className={style.users__item}>
       <a href={props.user.html_url} className={style.users__linkPhoto} target="_blank"> <img className={style.users__photo} src={props.user.avatar_url}/> <div className={style.users__layer}><p>See profile</p></div> </a>
          <a href={props.user.html_url} className={style.users__linkName} target="_blank">{props.user.login}</a>   
        </div>
      );
  }

  export default User;