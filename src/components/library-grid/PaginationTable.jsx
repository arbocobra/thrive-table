import { AgGridReact } from 'ag-grid-react';
import { useState, useEffect } from 'react';
import { getFinalValues } from '../../useColumnSorting';
import { getDSRCount } from '../../data-functions';
import { ModuleRegistry, ClientSideRowModelModule, PaginationModule, themeQuartz } from 'ag-grid-community';
ModuleRegistry.registerModules([ClientSideRowModelModule, PaginationModule]);

const PaginationTable = ({ updateSelectView }) => {
   const [rowData, setRowData] = useState();
   const [colDefs, _setColDefs] = useState([
      { field: 'Id', headerName: 'ID', flex: 1 },
      { field: 'FullName', flex: 3, valueGetter: (p) => `${p.data.FirstName} ${p.data.LastName}` },
      { field: 'FirstName', flex: 2 },
      { field: 'LastName', flex: 2 },
      { field: 'Email', flex: 3 },
      { field: 'City', flex: 2 },
      { field: 'RegDate', headerName: 'Registered Date', flex: 2 },
      { field: 'DSR', flex: 1, valueGetter: (p) => getDSRCount(p.data.RegDate) },
   ]);

   // const myTheme = themeQuartz.withParams({
   //       // accentColor: '#5BC3BA',
   //       // browserColorScheme: 'light',
   // fontFamily: { googleFont: 'Roboto', },
   // headerFontSize: 13,
   // fontSize: 12,
   // spacing: 8
   // });

   // Apply DSR to provided data before setRowData() - using cleanup to prevent multiple loads
   useEffect(() => {
      fetch('api/data.json')
         .then((resp) => resp.json())
         .then((data) => {
            setRowData(data);
         });
   }, []);

   return (
      <div className='agtable-container'>
         <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            modules={[ClientSideRowModelModule]}
            pagination={true}
            paginationPageSize={20}
            paginationPageSizeSelector={[20, 50, 100]}
            // theme={myTheme}
            // rowHeight={35}
         />
      </div>
   );
};

export default PaginationTable;
