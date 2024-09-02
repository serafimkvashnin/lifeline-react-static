import { useRef } from 'react'
import { exportHabitsData } from "../utils/storage";

const DataHandler = ({ habits, onDataLoaded, onDataRemoved }) => {
  const fileInputRef = useRef(null)

  const handleImportButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  const handleDataImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          onDataLoaded(json)
        } catch (error) {
          console.error('Error parsing JSON:', error)
        }
      }
      reader.readAsText(file);
    }
  }

  return ( 
    <div>
      <button onClick={handleImportButtonClick}>Import data</button>
      <input 
      type="file" 
      ref={fileInputRef}
      accept='.json'
      onChange={handleDataImport} 
      style={{ display: "none" }} 
      />
      <button onClick={() => exportHabitsData(habits)}>Export data</button>
      <button onClick={onDataRemoved}>Clear data</button>
    </div>
  )
}

export default DataHandler