import { useState } from 'react'
import './App.css'
import DateHeader from './components/DateHeader'
import HabitsTable from './components/HabitsTable'
import { loadHabitsData, saveHabitsData } from './utils/storage'
import ObjectRenderer from './components/ObjectRenderer'
import DataHandler from './components/DataHandler'

const App = () => {
  const [ habits, setHabits ] = useState(loadHabitsData())
  const [ date, setDate ] = useState(new Date())

  const handleAddHabit = (habit) => {
    const newHabits = habits.concat(habit)
    setHabits(newHabits)
    saveHabitsData(newHabits)
  }

  const handleHabitDayChecked = (key, month, day) => {
    const newHabits = [...habits]
    if (month in newHabits[key]) {
      if (day in newHabits[key][month]) {
        newHabits[key][month][day].status = !newHabits[key][month][day].status
      } else {
        newHabits[key][month][day] = {
          status: true
        }
      }
    } else {
      newHabits[key][month] = {
        [day]: {
          status: true
        }
      }
    }

    saveHabitsData(newHabits)
    setHabits(newHabits)
  }

  return (
    <div>
      <DataHandler 
        habits={habits} 
        onDataLoaded={(data) => {
          setHabits(data)
          saveHabitsData(data)
        }} 
        onDataRemoved={() => {
          setHabits([])
          saveHabitsData([])
        }}
      />
      <DateHeader date={date} onDateChanged={(date) => setDate(date)} />
      <HabitsTable date={date} habits={habits} onAddHabit={handleAddHabit} onDayChecked={handleHabitDayChecked} />
      <ObjectRenderer obj={habits} />
    </div>
  )
}

export default App
