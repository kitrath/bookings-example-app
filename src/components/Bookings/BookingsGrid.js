import { useEffect, useMemo, useState, Fragment } from "react";

import { getGrid, transformBookings } from "./grid-builder";

import { getBookings } from "../../utils/api";

import Spinner from "../UI/Spinner";

export default function BookingsGrid(
  { week, bookable, booking, setBooking }
) {
  const [bookings, setBookings] = useState(null);
  const [error, setError] = useState(false);

  const {grid, sessions, dates} = useMemo(
    () => bookable ? getGrid(bookable, week.start) : {},
    [bookable, week.start]
  );

  useEffect(() => {
    if (bookable) {
      // track whether the bookings data is current
      let doUpdate = true;

      setBookings(null);
      setError(false);
      setBooking(null);

      getBookings(bookable.id, week.start, week.end)
        .then(resp => {
          if (doUpdate) {
            setBookings(transformBookings(resp));
          }
        })
        .catch(setError);

      return () => doUpdate = false;
    }
  }, [week, bookable, setBooking]);

  function cell(session, date) {
    const cellData = bookings?.[session]?.[date] || grid[session][date];

    const isSelected = booking?.session === session && booking?.date === date;

    return (
      <td
        key={date}
        className={isSelected ? "selected" : null}
        onClick={bookings ? () => setBooking(cellData) : null} 
      >
        {cellData.title}
      </td>
    );
  }

  return (
    <div className="bookings-grid placeholder">
      <h3>Bookings Grid</h3>
      <p>{bookable?.title}</p>
      <p>{week.date.toISOString()}</p>
    </div>
  );
}