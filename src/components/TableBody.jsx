import { useEffect } from 'react';

const TableBody = ({columns, data}) => {
   useEffect(() => console.log(data))
   return (
      <tbody>
         <tr></tr>
      </tbody>
   )
}
export default TableBody;