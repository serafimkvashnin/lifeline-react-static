import { useState } from "react";

const HabitsTable = ({ date, habits, onAddHabit, onEditHabit, onRemoveHabit, onDayChecked }) => {
  const [showInput, setShowInput] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [showEditRow, setShowEditRow] = useState(0)

  const today = new Date()

  const handleAddHabit = (event) => {
    event.preventDefault();
    const form = new FormData(event.target)
    setShowInput(false)
    onAddHabit({ name: form.get("name") })
  }

  const handleEditHabit = (event, key) => {
    event.preventDefault();
    const form = new FormData(event.target)
    setShowEdit(false)
    onEditHabit(key, form.get("name"))
  }

  const handleShowEdit = (key) => {
    setShowEdit(true)
    setShowEditRow(key)
  }

  const getDayName = (day) => {
    return new Date(year, month, day).toLocaleString("default", { weekday: "long" })
  }

  const renderHeaderRow = () => {
    return (
      <tr>
        <th rowSpan="2"><h2 className="title">Habits</h2></th>
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1
          const isToday = 
            day === today.getDate() && 
            month === today.getMonth() && 
            year === today.getFullYear();
          return (
            <th key={day} className={isToday ? "today" : ""}>
              {getDayName(day).charAt(0)}
            </th>
          )
        })}
      </tr>
    )
  }

  const renderDayRow = () => {
    return (
      <tr>
        <th style={{ display:"none" }} />
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1
          const isToday = 
            day === today.getDate() && 
            month === today.getMonth() && 
            year === today.getFullYear()
          return (
            <th key={day} className={isToday ? "today" : ""}>
              {day}
            </th>
          )
        })}
      </tr>
    )
  }

  const renderHabitRows = () => {
    return Object.entries(habits).map(([key, habit]) => (
      <tr key={key}>
        <th>
          { showEdit && key === showEditRow ? (
              <form onSubmit={(event) => handleEditHabit(event, key)}>
                <input
                  autoFocus
                  name="name"
                  type="text"
                  defaultValue={habit.name}
                  onBlur={() => setShowEdit(false)}
                />
              </form>
            ) : (
              <div className="header-content">
                <span className="habit-title">
                  {habit.name}
                </span>
                <div className="button-group">
                  <button className="icon-button" onClick={() => handleShowEdit(key)}>
                    <span className="material-icons">edit</span>
                  </button>
                  <button 
                    className="icon-button danger" 
                    onClick={() => onRemoveHabit(parseInt(key))}
                  >
                    <span className="material-icons">delete</span>
                  </button>
                </div>
              </div>
            )
          }
        </th>
        {renderHabitDays(key, habit)}
      </tr>
    ))
  }

  const renderHabitDays = (key, habit) => {
    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1
      const isChecked = habit[year]?.[month]?.[day]?.status
      return (
        <td
          key={day}
          className={isChecked ? "checked" : ""}
          onClick={() => onDayChecked(key, year, month, day)}
        />
      )
    })
  }

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
              <button type="button" onClick={() => setShowInput(true)} className="icon-button">
                <span className="material-icons">add</span>
              </button>
            )}
          </form>
        </th>
      </tr>
    )
  }

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
  )
}

export default HabitsTable
