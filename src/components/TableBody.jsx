import { useEffect } from 'react';
import { PropagateLoader } from 'react-spinners';

const TableBody = ({columns, data}) => {
   useEffect(() => console.log(data))
   if (data) {
      return (
         <tbody>
            { data.map((row, i) => {
               return (
                  <tr key={`row-${i}`}>
                     {columns.map(({accessor, label}) => {
                        let val = row[label] ? row[label] : '-'
                        if (row[label] == 0) val = 0
                        return (
                           <td key={`${accessor}-${i}`}>{val}</td>
                        )
                     })}
                  </tr>
               )
            })}
         </tbody>
      )
   } else {
      return null
   }
   
}
export default TableBody;