import { useState, useEffect } from 'react';
import TableBody from './TableBody';
import TableHead from './TableHead';
import Pagination from './Pagination';
import Header from '../Header';
import { fetchData, fetchDataRange } from '../../data-functions';
import { useColumnSorting } from '../../useColumnSorting';
import { handleSort, getFinalValues } from '../../sorting-functions';

// Table built without libraries - custom sorting hook adapted from: https://github.com/Ibaslogic/react-sortable-table.git

const TableManual = ({updateSelectView}) => {

   const [rowData, setRowData] = useState();
   const [infiniteScroll, setInfiniteScroll] = useState(true)

   //pagination states
   const [displayPage, setDisplayPage] = useState(0)
   const [rowCount, setRowCount] = useState(20)
   const pageCount = rowData ? Math.ceil(rowData.length / rowCount) : 1

   // Custom hook to format default data and manage sorting
   // const [tableData, handleSort, isLoading] = useColumnSorting(getData())



   // Fetch data then apply DSR calculation to data before setRowData() - using cleanup to prevent multiple loads
      useEffect(() => {
         let ignore = false;
         if (infiniteScroll) {
            fetchDataRange(displayPage)
               .then(result => {
                  if (!ignore) setRowData(result)
               })
         } else {
            fetchData()
               .then(result => {
                if (!ignore) setRowData(result)
               })
         }
         
         return () => (ignore = true);
      }, []);

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

   const title = 'Table 1 - Built From Scratch'
   const caption = 'Table includes sortable rows, multiple rows per page options, and pagination'

   return (
      <div>
         <Header title={title} caption={caption} updateSelectView={updateSelectView} />
         { !rowData && <p>Loading...</p> }
         { rowData && (
            <>
               <table>
                  <TableHead columns={cols} handleSort={handleSort} />
                  <TableBody page={displayPage} count={rowCount} columns={cols} data={rowData} />
               </table>
               {!infiniteScroll && <Pagination displayPage={displayPage + 1} count={pageCount} setDisplayPage={setDisplayPage} rows={rowCount} setRowCount={setRowCount} />}
            </>
         )}
      </div>
   )
}
export default TableManual;