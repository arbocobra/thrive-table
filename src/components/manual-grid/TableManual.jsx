import { useState } from 'react';
import TableBody from './TableBody';
import TableHead from './TableHead';
import Pagination from './Pagination';
import { useColumnSorting } from '../../useColumnSorting';

// Table built without libraries - custom sorting hook adapted from: https://github.com/Ibaslogic/react-sortable-table.git

const TableManual = ({data, updateSelectView}) => {

   //pagination states
   const [displayPage, setDisplayPage] = useState(0)
   const [rowCount, setRowCount] = useState(20)
   const pageCount = Math.ceil(data.length / rowCount)

   // Custom hook to format default data and manage sorting
   const [tableData, handleSort, isLoading] = useColumnSorting(data)

   // Defined columns with label text and accessor values
   const cols = [
      { accessor: 'Id', label: 'ID' },
      { accessor: 'FullName', label: 'Full Name' },
      { accessor: 'FirstName', label: 'First Name' },
      { accessor: 'LastName', label: 'Last Name' },
      { accessor: 'Email', label: 'Email' },
      { accessor: 'City', label: 'City' },
      { accessor: 'RegDate', label: 'Registered Date' },
      { accessor: 'DSR', label: 'DSR' },
   ]

   return (
      <div>
         <div onClick={() => updateSelectView(0)} className='return-button'><span>&#129104;  Back</span></div>
         <h3>Table 1: Built From Scratch</h3>
         { isLoading && <p>Loading...</p> }
         { data && (
            <>
               <table>
                  <TableHead columns={cols} handleSort={handleSort} />
                  <TableBody page={displayPage} count={rowCount} columns={cols} data={tableData} />
               </table>
               <Pagination displayPage={displayPage + 1} count={pageCount} setDisplayPage={setDisplayPage} rows={rowCount} setRowCount={setRowCount} />
            </>
         )}
      </div>
   )
}
export default TableManual;