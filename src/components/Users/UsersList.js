import { useState, useEffect } from "react";
import Spinner from "../UI/Spinner";

import getData from "../../utils/api";

export default function UsersList({ setUser }) {
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

  return (
    <div>
      <ul className="users items-list-nav">
        {users.map((user, i) => (
          <li
            key={user.id}
            className={ i === usersIndex ? "selected": null}
          >
            <button
              className="btn"
              onClick={() => {
                setUser(users[i]);
                setUsersIndex(i);
              }}
            >
              {user.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}