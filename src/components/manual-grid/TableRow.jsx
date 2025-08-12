import { useState, useEffect, useRef } from 'react';

const TableRow = ({row, i, columns}) => {

   const [displayPage, setDisplayPage] = useState(0)
   const [rowCount, setRowCount] = useState(20)
   const [totalDisplay, setTotalDisplay] = useState(0)
   const pageCount = rowData ? Math.ceil(rowData.length / rowCount) : 1

   

   return (
      <tr key={`row-${i}`}>
         {columns.map(({ accessor }) => {
            let val = row[accessor] ? row[accessor] : '-';
            if (row[accessor] == 0) val = 0;
            if (accessor == 'FullName') {
               return <td key={`${accessor}-${i}`}>{`${row['FirstName']} ${row['LastName']}`}</td>;
            } else {
               return <td key={`${accessor}-${i}`}>{val}</td>;
            }
         })}
      </tr>
   );
}

export default TableRow;