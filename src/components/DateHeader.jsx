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
          <button onClick={onLeftClick} className="icon-button">
            <span className="material-icons">chevron_left</span>
          </button>
          {getMonthName(date)} {date.getFullYear()}
          <button onClick={onRightClick} className="icon-button">
            <span className="material-icons">chevron_right</span>
          </button>
        </h1>
      </div>
    )
}

export default DateHeader