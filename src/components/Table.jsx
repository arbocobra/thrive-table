import TableBody from './TableBody';
import TableHead from './TableHead';
import { useState, useEffect } from 'react';
import { useColumnSorting } from '../useColumnSorting';

const Table = ({data}) => {

   const columns = ['Id', 'Full Name', 'First Name', 'Last Name', 'Email', 'City', 'Registered Date', 'DSR']
   const [tableData, handleSort] = useColumnSorting(data, columns)

   useEffect(() => console.log(tableData))

   const handleClick = (e) => {
      e.preventDefault()
      const col = e.target.value;
      handleSort(col, 'asc')
   }

   return (
      <div>
         <h1>Table</h1>
         <table>
            <TableHead columns={columns} handleSort={handleSort} />
            <TableBody columns={columns} data={tableData} />
            
         </table>
         <button onClick={handleClick} value='RegDate'>Date</button>
      </div>
   )
}
export default Table;