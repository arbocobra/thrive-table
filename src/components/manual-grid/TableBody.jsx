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
                        {columns.map(({accessor, label}) => {
                           let val = row[label] ? row[label] : '-'
                           if (row[label] == 0) val = 0
                           if (accessor == 'FullName') {
                              return (<td key={`${accessor}-${i}`}>{`${row['First Name']} ${row['Last Name']}`}</td>)
                           } else {
                              return (<td key={`${accessor}-${i}`}>{val}</td>)
                           }
                           // return (
                           //    <td key={`${accessor}-${i}`}>{val}</td>
                           // )
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