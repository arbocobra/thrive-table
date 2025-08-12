import TableRow from './TableRow';
const TableBody = ({ page, count, columns, data }) => {
   const startRange = page * count;
   const endRange = startRange + count;

   if (data) {
      return (
         <tbody>
            {data.map((row, i) => {
               if (i >= startRange && i < endRange) {
                return <TableRow key={`row-${i}`} columns={columns} row={row} i={i}/>
               }
            })}
         </tbody>
      );
   } else {
      return null;
   }
};
export default TableBody;
