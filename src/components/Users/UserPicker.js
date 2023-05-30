import data from "../../static.json";

export default function UserPicker() {
  const { users } = data;

  return (
    <select>
      <option
        value="" 
      >
        Users
      </option>
      {users.map((user) => (
        <option
          key={user.id}
          value={user.name} 
        >
          {user.name}
        </option>
      ))}
    </select>
  );
}