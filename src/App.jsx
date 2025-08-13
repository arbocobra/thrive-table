import { useState } from 'react'
import CustomTable from './components/manual-grid/Table';
import SelectGrid from './components/SelectGrid';
import Footer from './components/Footer';
import LibraryTable from './components/library-grid/Table';
import './App.css'

const App = () => {
  const [gridDisplay, setGridDisplay] = useState('select')

  // Select to view custom-built table or table made with react library
  const updateSelectView = (val) => {
    if (val > 0) setGridDisplay('agGrid')
    else if (val < 0) setGridDisplay('manual')
    else setGridDisplay('select')
  }

  return (
      <div className='container'>
        { gridDisplay == 'select' && <SelectGrid updateSelectView={updateSelectView} /> }
        { gridDisplay == 'manual' && <CustomTable updateSelectView={updateSelectView} /> }
        { gridDisplay == 'agGrid' && <LibraryTable updateSelectView={updateSelectView}/> }
        <Footer />
      </div>
    )
}

export default App 