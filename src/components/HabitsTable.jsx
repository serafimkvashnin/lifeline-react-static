import { useState } from "react";

const HabitsTable = ({ date, habits, onAddHabit, onDayChecked }) => {
  const [showInput, setShowInput] = useState(false);

  const today = new Date()

  const handleAddHabit = (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    setShowInput(false);
    onAddHabit({ name: form.get("name") });
  };

  const getDayName = (date, day) => {
    return new Date(year, month, day).toLocaleString("default", { weekday: "long" });
  };

  const renderHeaderRow = () => {
    return (
      <tr>
        <th rowSpan="2"><h2 className="title">Habits</h2></th>
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const isToday = 
            day === today.getDate() && 
            month === today.getMonth() && 
            year === today.getFullYear();
          return (
            <th key={day} className={isToday ? "today" : ""}>
              {getDayName(date, day).charAt(0)}
            </th>
          );
        })}
      </tr>
    );
  };

  const renderDayRow = () => {
    return (
      <tr>
        <th style={{ display:"none" }} />
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const isToday = 
            day === today.getDate() && 
            month === today.getMonth() && 
            year === today.getFullYear();
          return (
            <th key={day} className={isToday ? "today" : ""}>
              {day}
            </th>
          );
        })}
      </tr>
    );
  };

  const renderHabitRows = () => {
    return Object.entries(habits).map(([key, habit]) => (
      <tr key={key}>
        <th>{habit.name}</th>
        {renderHabitDays(key, habit)}
      </tr>
    ));
  };

  const renderHabitDays = (key, habit) => {
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const isChecked = habit[year]?.[month]?.[day]?.status;
      return (
        <td
          key={day}
          className={isChecked ? "checked" : ""}
          onClick={() => onDayChecked(key, year, month, day)}
        />
      );
    });
  };

  const renderAddHabitRow = () => {
    return (
      <tr>
        <th>
          <form onSubmit={handleAddHabit}>
            {showInput ? (
              <input
                autoFocus
                name="name"
                type="text"
                onBlur={() => setShowInput(false)}
              />
            ) : (
              <button type="button" onClick={() => setShowInput(true)}>
                +
              </button>
            )}
          </form>
        </th>
      </tr>
    );
  };

  const year = date.getFullYear()
  const month = date.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  return (
    <table>
      <thead>
        {renderHeaderRow()}
        {renderDayRow()}
      </thead>
      <tbody>
        {renderHabitRows()}
        {renderAddHabitRow()}
      </tbody>
    </table>
  );
};

export default HabitsTable;
