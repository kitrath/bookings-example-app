import { useState, useEffect, Fragment } from "react";
import Spinner from "../UI/Spinner";

import getData from "../../utils/api";

export default function UsersList() {
  const [request, setRequest] = useState({
    isLoading: false,
    error: null,
    users: []
  });
  // Initially, no user selected
  const [usersIndex, setUsersIndex] = useState(null);

  useEffect(() => {
  
    setRequest(r => ({ ...r, isLoading: true }));

    getData("http://localhost:3001/users")
      .then((users) => {
        setRequest(r => ({ ...r, isLoading: false, users }));
      })
      .catch((error) => {
        setRequest( r => ({ ...r, isLoading: false, error }));
      });

  }, []);

  const { users, isLoading, error } = request;

  if (error) {
    return <p>{error.message}</p>
  }

  if (isLoading) {
    return <p><Spinner/> Loading users...</p>
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