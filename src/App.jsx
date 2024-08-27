import { useState } from 'react'
import './App.css'

const exampleHabits = {
  "Running": {
   
  },
  "Reading": {
    "8": {
        "27": {
          status: true,
        }
      }
  },
}

const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
const getMonthName = (date) => date.toLocaleString("default", {"month": "long"})
const getDayName = (date, day) => new Date(date.getFullYear(), date.getMonth() + 1, day).toLocaleString("default", {"weekday": "long"})

const saveHabitsData = (data) => localStorage.data = JSON.stringify(data)
const loadHabitsData = () => JSON.parse(localStorage.data)

const App = () => {
  const [ habits, setHabits ] = useState(loadHabitsData())
  const [ date, setDate ] = useState(new Date())

  const handleHabitDayClick = (habit, month, day) => {
    const clone = structuredClone(habits)
    if (month in clone[habit]) {
      if (day in clone[habit][month]) {
        clone[habit][month][day].status = !clone[habit][month][day].status
      } else {
        clone[habit][month][day] = {
          status: true
        }
      }
    } else {
      clone[habit][month] = {
        [day]: {
          status: true
        }
      }
    }

    saveHabitsData(clone)
    setHabits(clone)
  }

  return (
    <div>
      <p>{getMonthName(date)} {date.getFullYear()}</p>
      <table>
        <thead>
          <tr>
            <th rowSpan="2">
              Habits
            </th>
            <DaysNames date={date} days={getDaysInMonth(date)} />
          </tr>
          <tr>
            <Days days={getDaysInMonth(date)} />
          </tr>
        </thead>
        <tbody>
          <Habits 
            habits={habits} 
            month={date.getMonth() + 1}
            days={getDaysInMonth(date)}
            onClick={handleHabitDayClick}
          />
        </tbody>
      </table>
    </div>
  )
}

const Habits = ({ habits, month, days, onClick }) =>
  Object.keys(habits).map((name, i) => 
    <tr key={i}>
      <th key={i}>
        {name}
      </th>
      {Array.from({length: days}, (_, j) => {
        const day = j + 1
        const habit = habits[name]
        if (month in habit && day in habit[month] && habit[month][day].status) {
          return (
            <td
              className="checkedDay"
              key={j} 
              onClick={() => onClick(name, month, day)} 
            />
          )
        } else {
          return (
            <td
              key={j} 
              onClick={() => onClick(name, month, day)} 
            />
          )
        }
      })}
    </tr>
  )

const DaysNames = ({ date, days }) => Array.from({length: days}, (_, i) => <th key={i}>{getDayName(date, i + 1).charAt(0)}</th>)
const Days = ({ days }) => Array.from({length: days}, (_, i) => <th key={i}>{i + 1}</th>)

export default App
