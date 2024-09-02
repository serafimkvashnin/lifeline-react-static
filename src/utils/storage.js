const exportHabitsData = (data) => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'data.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

const removeHabitsData = () => localStorage.removeItem('data')

const saveHabitsData = (data) => localStorage.setItem('data', JSON.stringify(data))

const loadHabitsData = () => {
  const exampleHabits = [
    {
      name: "Example habit",
    },
  ]

  if (localStorage.getItem('data') === null) {
    return exampleHabits
  } else {
    return JSON.parse(localStorage.data)
  }
}

export { removeHabitsData, saveHabitsData, loadHabitsData, exportHabitsData }