import { useState, useEffect, useRef } from 'react';
import TableBody from './TableBody';
import TableHead from './TableHead';
import Pagination from './Pagination';
import Header from '../Header';
import { fetchData, fetchDataRange } from '../../data-functions';
import { useColumnSorting } from '../../useColumnSorting';
import { handleSort, getFinalValues } from '../../sorting-functions';

// Table built without libraries - custom sorting hook adapted from: https://github.com/Ibaslogic/react-sortable-table.git

const TableManual = ({updateSelectView}) => {

   const [loading, setLoading] = useState(false)

   const toggleLoading = () => { setLoading(current => !current) }

   // const [rowData, setRowData] = useState([]);
   // const [pagination, setPagination] = useState(false)

   // //pagination states
   // const [displayPage, setDisplayPage] = useState(0)
   // const [rowCount, setRowCount] = useState(20)
   // const [totalDisplay, setTotalDisplay] = useState(0)
   // const pageCount = rowData ? Math.ceil(rowData.length / rowCount) : 1

   // const firstRender = useRef(true)

   // Custom hook to format default data and manage sorting
   // const [tableData, handleSort, isLoading] = useColumnSorting(getData())

   // const fetchForScroll = async (page) => {
   //    fetchDataRange(page)
   //       .then(result => {
   //          setRowData((prev) => [...prev, ...result])
   //          if (firstRender.current) setTotalDisplay(1000)
   //       })
   // }

   // // Fetch data then apply DSR calculation to data before setRowData() - using cleanup to prevent multiple loads
   //    useEffect(() => {
   //       (async () => {
   //          if (firstRender.current) fetchForScroll(0)
   //       })()
   //       return () => firstRender.current = false;
   //    }, []);

   //    const handleLoadMore = () => {
   //       setDisplayPage(prev => {
   //          const nextPage = prev + 1
   //          fetchForScroll(nextPage)
   //          return nextPage
   //       })
   //    }

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
         { loading && <p>Loading...</p> }
         { !loading && (
            <>
               <table>
                  <TableHead columns={cols} handleSort={handleSort} />
                  <TableBody columns={cols} toggleLoading={toggleLoading} />
               </table>
               {/* {pagination && <Pagination displayPage={displayPage + 1} count={pageCount} setDisplayPage={setDisplayPage} rows={rowCount} setRowCount={setRowCount} />} */}
            </>
         )}
      </div>
   )
}
export default TableManual;