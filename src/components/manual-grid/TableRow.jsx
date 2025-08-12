const TableRow = ({columns, row, i}) => {
   return (
      <tr>
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
export default TableRow