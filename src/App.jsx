import { useState, useEffect } from 'react'
import { PropagateLoader } from 'react-spinners';
import TableManual from './components/manual-grid/TableManual';
import TableLib from './components/library-grid/TableLib';
import SelectGrid from './components/SelectGrid';
import Footer from './components/Footer';
import { getData, fetchData } from './data-functions';
import './App.css'

const App = () => {
  const [list, setList] = useState([])
  const [gridDisplay, setGridDisplay] = useState('select')

  // useEffect(() => {
  //   // no duplicate data on first render
  //   let ignore = false
    
  //   // Request 500 users for table
  //   getData(500).then(data => {
  //     if (!ignore) setList(data)
  //   })
  //   return () => ignore = true
  // },[])

  // Select to view manually-built table or version made with react library
  const updateSelectView = (val) => {
    if (val > 0) setGridDisplay('agGrid')
    else if (val < 0) setGridDisplay('manual')
    else setGridDisplay('select')
  }


  // // Enable selection after user list has been fetched, else display loading graphic
  // if (list.length) {
  //     return (
  //     <div className='container'>
  //       { gridDisplay == 'select' && <SelectGrid updateSelectView={updateSelectView} /> }
  //       { gridDisplay == 'manual' && <TableManual updateSelectView={updateSelectView} /> }
  //       { gridDisplay == 'agGrid' && <TableLib updateSelectView={updateSelectView} /> }
  //       <Footer />
  //     </div>
  //   )
  // } else {
  //   return (
  //     <div className='container'>
  //         <PropagateLoader/>
  //     </div>
  //   )
  // }
return (
      <div className='container'>
        { gridDisplay == 'select' && <SelectGrid updateSelectView={updateSelectView} /> }
        { gridDisplay == 'manual' && <TableManual updateSelectView={updateSelectView} /> }
        { gridDisplay == 'agGrid' && <TableLib updateSelectView={updateSelectView} /> }
        <Footer />
      </div>
    )

}

export default App 