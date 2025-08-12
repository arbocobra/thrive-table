import { useState } from 'react'
import TableManual from './components/manual-grid/TableManual';
import TableLib from './components/library-grid/TableLib';
import SelectGrid from './components/SelectGrid';
import Footer from './components/Footer';

import './App.css'

const App = () => {
  const [gridDisplay, setGridDisplay] = useState('select')

  // Select to view manually-built table or version made with react library
  const updateSelectView = (val) => {
    if (val > 0) setGridDisplay('agGrid')
    else if (val < 0) setGridDisplay('manual')
    else setGridDisplay('select')
  }

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