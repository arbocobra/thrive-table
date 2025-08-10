import TableBody from './TableBody';
import TableHead from './TableHead';
import { useState, useEffect } from 'react';
import { useColumnSorting } from '../useColumnSorting';

const Table = ({data}) => {

   const columns = ['Id', 'Full Name', 'First Name', 'Last Name', 'Email', 'City', 'Registered Date', 'DSR']
   const [tableData, handleSort] = useColumnSorting(data)

   const handleClick = (e) => {
      e.preventDefault()
      const col = e.target.value;
      handleSort(col, 'desc')
   }

   return (
      <div>
         <h1>Table</h1>
         <table>
            <TableHead columns={columns} handleSort={handleSort} />
            <TableBody columns={columns} data={tableData} />
         </table>
         <button onClick={handleClick} value='Id'>Id</button>
         <button onClick={handleClick} value='Full Name'>Full Name</button>
         <button onClick={handleClick} value='First Name'>First Name</button>
         <button onClick={handleClick} value='Last Name'>Last Name</button>
         <button onClick={handleClick} value='Email'>Email</button>
         <button onClick={handleClick} value='City'>City</button>
         <button onClick={handleClick} value='Registered Date'>Reg Date</button>
         <button onClick={handleClick} value='DSR'>DSR</button>
      </div>
   )
}
export default Table;