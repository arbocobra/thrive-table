import TableBody from './TableBody';
import TableHead from './TableHead';
import { useState } from 'react';
import { useColumnSorting } from '../useColumnSorting';

const Table = ({data}) => {

   console.log(data)
   const columns = ['Id', 'Full Name', 'First Name', 'Last Name', 'Email', 'City', 'Registered Date', 'DSR']
   const [tableData] = useColumnSorting(data, columns)
   // const sortData = (columnName) => {
   //    if (columnName == 'Registration Date') {return 0}
   //    else if (columnName == 'DSR') {return 0}
   //    else {
   //       return 1
   //    }
   // }

   return (
      <div>
         <h1>Table</h1>
         <table>
            <TableHead columns={columns} />
            <TableBody columns={columns} data={tableData} />
         </table>
      </div>
   )
}
export default Table;