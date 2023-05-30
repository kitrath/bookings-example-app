import { useState } from "react";
import data from "../../static.json";

export default function UsersList() {
  const { users } = data;
  // Initially, no user selected
  const [usersIndex, setUsersIndex] = useState(null);
 
  return (
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
  );
}