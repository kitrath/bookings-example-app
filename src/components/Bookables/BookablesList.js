import { useState } from "react";
import data from "../../static.json";
import { FaArrowRight } from "react-icons/fa";

export default function BookablesList() {
  const { bookables } = data;
  const [group, setGroup] = useState("Kit");
  const bookablesInGroup = bookables.filter(b => b.group === group);
  const [bookableIndex, setBookableIndex] = useState(1)
  const groups = [...new Set(bookables.map(b => b.group))];

  function nextBookable() {
    setBookableIndex(i => (i + 1) % bookablesInGroup.length);
  }

  return (
    <div>
      <select
        value={group}
        onChange={(e) => setGroup(e.target.value)}  
      >
        {groups.map(g => <option value={g} key={g}>{g}</option>)}
      </select>
      <ul className="bookables items-list-nav">
        {bookablesInGroup.map((b, i) => (
          <li
            key={b.id}
            className={ i === bookableIndex ? "selected" : null}
          >
            <button
              className="btn"
              onClick={() => setBookableIndex(i)}
            >
              {b.title}
            </button>
          </li>
        ))}
      </ul>
      <p>
        <button
          className="btn"
          onClick={nextBookable}
          autofocus
        >
          <FaArrowRight/>
          <span>Next</span>
        </button>
      </p>
    </div>
  );
}