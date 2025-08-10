import TableBody from './TableBody';
import TableHead from './TableHead';
import { useColumnSorting } from '../useColumnSorting';
import { useEffect } from 'react';

const Table = ({data}) => {

   const cols = [
      { accessor: 'Id', label: 'ID' },
      { accessor: 'FullName', label: 'Full Name' },
      { accessor: 'FirstName', label: 'First Name' },
      { accessor: 'LastName', label: 'Last Name' },
      { accessor: 'Email', label: 'Email' },
      { accessor: 'City', label: 'City' },
      { accessor: 'RegDate', label: 'Registered Date' },
      { accessor: 'DSR', label: 'DSR' },
   ]

   const [tableData, handleSort, isLoading, isError] = useColumnSorting(data)

   useEffect(() => {
        if (isError) {
            console.error('Error fetching data:', isError);
        }
    }, [isError]);

   return (
      <div>
         <h1>Table</h1>
         {isLoading && <p>Loading...</p>}
         {data && (
            <table>
               <TableHead columns={cols} handleSort={handleSort} />
               <TableBody columns={cols} data={tableData} />
            </table>
         )}
      </div>
   )
}
export default Table;

// table with custom sorting hook based on https://github.com/Ibaslogic/react-sortable-table.git