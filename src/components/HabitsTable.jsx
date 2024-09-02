import { useState } from "react"

const HabitsTable = ({ date, habits, onAddHabit, onDayChecked }) => {
  const [ showInput, setShowInput ] = useState(false)

  const handleAddHabit = (event) => {
    event.preventDefault()
    const form = new FormData(event.target);
    setShowInput(false)
    onAddHabit({
      name: form.get('name')
    })
  }

  const getDayName = (date, day) => 
    new Date(date.getFullYear(), date.getMonth(), day).toLocaleString("default", {"weekday": "long"})  

  const month = date.getMonth() 
  const days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  return (
    <table>
      <thead>
        <tr>
          <th rowSpan="2">
            Habits
          </th>
          {Array.from({length: days}, (_, i) => {
            const day = i + 1
            return <th key={day}>
              {getDayName(date, day).charAt(0)}
            </th>
          })}
        </tr>
        <tr>
          {Array.from({length: days}, (_, i) => {
            const day = i + 1
            return <th key={day}>
              {day}
            </th>
          })}
        </tr>
      </thead>
      <tbody>
        {Object.keys(habits).map((key) => {
          const habit = habits[key]
          return (
            <tr key={key}>
              <th key={key}>
                {habit.name}
              </th>
              {Array.from({length: days}, (_, i) => {
                const day = i + 1
                if (month in habit && day in habit[month] && habit[month][day].status) {
                  return (
                    <td
                      className="checkedDay"
                      key={day} 
                      onClick={() => onDayChecked(key, month, day)} 
                    />
                  )
                } else {
                  return (
                    <td
                      key={day} 
                      onClick={() => onDayChecked(key, month, day)} 
                    />
                  )
                }
              })}
            </tr>
          )
        })}
        <tr>
          <th>
          <form onSubmit={handleAddHabit}>
            {showInput && (
              <input 
                autoFocus
                name="name"
                type="text"
                onBlur={() => setShowInput(false)}
              />
            )}
            {!showInput && (
              <button type="button" onClick={() => setShowInput(true)}>+</button>
            )}
          </form>
          </th>
        </tr>
      </tbody>
    </table>
  )
}

export default HabitsTable