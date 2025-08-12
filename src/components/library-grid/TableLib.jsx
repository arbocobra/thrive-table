import { AgGridReact } from 'ag-grid-react';
import { useState, useEffect } from 'react';
import { getFinalValues } from '../../useColumnSorting';
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
      // accentColor: '#5BC3BA',
      // browserColorScheme: 'light',
      fontFamily: { googleFont: 'Roboto', },
      headerFontSize: 13,
      fontSize: 12,
      spacing: 8
   });

   // Apply DSR to provided data before setRowData() - using cleanup to prevent multiple loads
   useEffect(() => {
      let ignore = false;
      getFinalValues(data).then((vals) => {
         if (!ignore) setRowData(vals);
      });
      return () => (ignore = true);
   }, []);

   const title = 'Table 2 - Built With AG Grid library'
   const caption = 'Table includes sortable rows, drag and drop columns, multiple rows per page options and pagination'

   return (
      <div>
         <Header title={title} caption={caption} updateSelectView={updateSelectView} />
         {/* <div onClick={() => updateSelectView(0)} className='return-button'>
            <span>&#129104; Back</span>
         </div>
         <h3>Table 2 - Built With AG Grid library</h3>
         <div className='caption'>Table includes sortable rows, drag and drop columns, multiple rows per page options and pagination</div> */}
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
