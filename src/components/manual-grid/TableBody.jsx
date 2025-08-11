import { useEffect } from 'react';

const TableBody = ({page, count, columns, data}) => {
   const startRange = page * count
   const endRange = startRange + count

   useEffect(() => console.log(data))
   if (data) {
      return (
         <tbody>
            { data.map((row, i) => {
               if (i >= startRange && i < endRange) {
                  return (
                     <tr key={`row-${i}`}>
                        {columns.map(({accessor}) => {
                           let val = row[accessor] ? row[accessor] : '-'
                           if (row[accessor] == 0) val = 0
                           if (accessor == 'FullName') {
                              return (<td key={`${accessor}-${i}`}>{`${row['FirstName']} ${row['LastName']}`}</td>)
                           } else {
                              return (<td key={`${accessor}-${i}`}>{val}</td>)
                           }
                        })}
                     </tr>
                  )
               }
            })}
         </tbody>
      )
   } else {
      return null
   }
   
}
export default TableBody;