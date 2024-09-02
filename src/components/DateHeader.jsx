const DateHeader = ({ date, onDateChanged }) => {
    const getMonthName = (date) => date.toLocaleString("default", {"month": "long"})

    const onLeftClick = () => {
      const newDate = new Date(date.getFullYear(), date.getMonth() - 1)
      onDateChanged(newDate)
    }

    const onRightClick = () => {
      const newDate = new Date(date.getFullYear(), date.getMonth() + 1)
      onDateChanged(newDate)
    }

    return (
      <div>
         <h1>
          <button onClick={onLeftClick}>{'<'}</button>
          {getMonthName(date)} {date.getFullYear()}
          <button onClick={onRightClick}>{'>'}</button>
        </h1>
      </div>
    )
}

export default DateHeader