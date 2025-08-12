import { AgGridReact } from 'ag-grid-react';
import { useState, useEffect } from 'react';
import { getFinalValues } from '../../useColumnSorting';
import { fetchData } from '../../data-functions';
import Header from '../Header';
import { ModuleRegistry, ClientSideRowModelModule, PaginationModule, themeQuartz } from 'ag-grid-community';

const TableLib = ({ data, updateSelectView }) => {
   ModuleRegistry.registerModules([ClientSideRowModelModule, PaginationModule]);

   const [rowData, setRowData] = useState();
   const [colDefs, _setColDefs] = useState([
      { field: 'Id', headerName: 'ID', flex: 1 },
      { field: 'FullName', valueGetter: (p) => `${p.data.FirstName} ${p.data.LastName}`, flex: 3 },
      { field: 'FirstName', flex: 2 },
      { field: 'LastName', flex: 2 },
      { field: 'Email', flex: 3 },
      { field: 'City', flex: 2 },
      { field: 'RegDate', headerName: 'Registered Date', flex: 2 },
      { field: 'DSR', flex: 1 },
   ]);

   const myTheme = themeQuartz.withParams({
      fontFamily: { googleFont: 'Roboto', },
      headerFontSize: 13,
      fontSize: 12,
      spacing: 8
   });

   // Fetch data then apply DSR calculation to data before setRowData() - using cleanup to prevent multiple loads
   useEffect(() => {
      let ignore = false;
      fetchData()
         .then(result => getFinalValues(result))
         .then(values => {
            if (!ignore) setRowData(values)
         })
      return () => (ignore = true);
   }, []);

   const title = 'Table 2 - Built With AG Grid library'
   const caption = 'Table includes sortable rows, drag and drop columns, multiple rows per page options and pagination'

   return (
      <div>
         <Header title={title} caption={caption} updateSelectView={updateSelectView} />
         <div className='agtable-container'>
            <AgGridReact
               rowData={rowData}
               columnDefs={colDefs}
               modules={[ClientSideRowModelModule]}
               pagination={true}
               paginationPageSize={20}
               paginationPageSizeSelector={[20, 50, 100]}
               theme={myTheme}
               // rowHeight={35}
            />
         </div>
      </div>
   );
};

export default TableLib;
