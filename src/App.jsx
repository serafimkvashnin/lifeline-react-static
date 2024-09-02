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
    const updatedHabits = habits.concat(habit)
    updateHabits(updatedHabits)
  }

  const handleHabitDayChecked = (key, year, month, day) => {    
    const updatedHabits = [...habits];
    updatedHabits[key] = {
      ...updatedHabits[key],
      [year]: {
        ...updatedHabits[key]?.[year],
        [month]: {
          ...updatedHabits[key]?.[year]?.[month],
          [day]: {
            status: !updatedHabits[key]?.[year]?.[month]?.[day]?.status,
          },
        },
      },
    };
    updateHabits(updatedHabits)
  }

  const updateHabits = (newHabits) => {
    setHabits(newHabits);
    saveHabitsData(newHabits);
  };

  return (
    <div>
      <DataHandler 
        habits={habits} 
        onDataLoaded={(data) => updateHabits(data)} 
        onDataRemoved={() => updateHabits([])}
      />
      <DateHeader date={date} onDateChanged={(date) => setDate(date)} />
      <HabitsTable date={date} habits={habits} onAddHabit={handleAddHabit} onDayChecked={handleHabitDayChecked} />
      <ObjectRenderer obj={habits} />
    </div>
  )
}

export default App
