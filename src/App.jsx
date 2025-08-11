import { useState, useEffect } from 'react'
import { PropagateLoader } from 'react-spinners';
import TableManual from './components/manual-grid/TableManual';
import TableLib from './components/library-grid/TableLib';
import SelectGrid from './components/SelectGrid';
import { getData } from './data';
import './App.css'

const App = () => {
  const [list, setList] = useState([])
  const [gridDisplay, setGridDisplay] = useState('manual')

  useEffect(() => {
    // no duplicate data on first render
    let ignore = false
    
    // Request 500 users for table
    getData(500).then(data => {
      if (!ignore) setList(data)
    })
    return () => ignore = true
  },[])

  // Select to view manually-built table or version made with react library
  const updateSelectView = (val) => {
    if (val > 0) setGridDisplay('agGrid')
    else if (val < 0) setGridDisplay('manual')
    else setGridDisplay(null)
  }

  // Enable selection after user list has been fetched, else display loading graphic
  if (list.length) {
    if (gridDisplay == 'agGrid') return <div><TableLib data={list} updateSelectView={updateSelectView} /></div>
    else if (gridDisplay == 'manual') return <div><TableManual data={list} updateSelectView={updateSelectView} /></div>
    else return <div><SelectGrid updateSelectView={updateSelectView} /></div>
  } else {
    return (
      <div className='container'>
          <PropagateLoader/>
      </div>
    )
  }
}

export default App 