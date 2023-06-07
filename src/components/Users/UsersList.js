import { useState, useEffect, Fragment } from "react";
import Spinner from "../UI/Spinner";

export default function UsersList() {
  const [users, setUsers] = useState(null);
  // Initially, no user selected
  const [usersIndex, setUsersIndex] = useState(null);

  useEffect(() => {

    fetch("http://localhost:3001/users")
      .then(resp => resp.json())
      .then(data => setUsers(data));

  }, []);

  if (users === null) {
    return <Spinner/>
  }

  const user = users[usersIndex];

  return (
    <Fragment>
      <div>
        <ul className="users items-list-nav">
          {users.map((user, i) => (
            <li
              key={user.id}
              className={ i === usersIndex ? "selected": null}
            >
              <button
                className="btn"
                onClick={() => setUsersIndex(i)}
              >
                {user.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      {user && (
        <div className="user-details">
          <div className="item">
            <div className="item-header">
              <h2>{user.name}</h2>
            </div>
            <div className="item-details">
              <h3>{user.title}</h3>
              <div>
                <p>{user.notes}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}