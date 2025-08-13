import { useCallback, useState } from 'react';
import { InfiniteRowModelModule, ModuleRegistry, themeQuartz } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import Header from '../Header';
import { getDSRCount } from './../../data-functions';

ModuleRegistry.registerModules([InfiniteRowModelModule]);

const theme = themeQuartz.withParams({
   fontFamily: { googleFont: 'Roboto' },
   headerFontSize: 13,
   fontSize: 12,
   spacing: 8,
});

const Table = ({ updateSelectView }) => {
   const [columnDefs, setColumnDefs] = useState([
      { field: 'Id', headerName: 'ID', flex: 1 },
      {
         field: 'FullName',
         flex: 3,
         valueGetter: (p) => {
            if (p.data !== undefined) return `${p.data.FirstName} ${p.data.LastName}`;
            else return <img src='https://www.ag-grid.com/example-assets/loading.gif' />;
         },
      },
      { field: 'FirstName', flex: 2 },
      { field: 'LastName', flex: 2 },
      { field: 'Email', flex: 3 },
      { field: 'City', flex: 2 },
      { field: 'RegDate', headerName: 'Registered Date', flex: 2 },
      {
         field: 'DSR',
         flex: 1,
         valueGetter: (p) => {
            if (p.data !== undefined) return getDSRCount(p.data.RegDate);
            else return <img src='https://www.ag-grid.com/example-assets/loading.gif' />;
         },
      },
   ]);

   const onGridReady = useCallback((params) => {
      fetch('/thrive-table/api/data.json')
         .then((resp) => resp.json())
         .then((data) => {
            const dataSource = {
               rowCount: undefined,
               getRows: (params) => {
                  console.log('asking for ' + params.startRow + ' to ' + params.endRow);
                  // At this point in your code, you would call the server.
                  // To make the demo look real, wait for 500ms before returning
                  setTimeout(function () {
                     // take a slice of the total rows
                     const rowsThisPage = data.slice(params.startRow, params.endRow);
                     // if on or after the last page, work out the last row.
                     let lastRow = -1;
                     if (data.length <= params.endRow) {
                        lastRow = data.length;
                     }
                     // call the success callback
                     params.successCallback(rowsThisPage, lastRow);
                  }, 500);
               },
            };
            params.api.setGridOption('datasource', dataSource);
         });
   }, []);

   const title = 'Table 1 - Built With AG Grid library';
   const caption = 'Table includes sortable rows, drag and drop columns and infinite scrolling';

   return (
      <div className='table-container'>
         <Header title={title} caption={caption} updateSelectView={updateSelectView} />
         <div className='agtable-container'>
            <AgGridReact
               columnDefs={columnDefs}
               rowBuffer={0}
               rowModelType={'infinite'}
               cacheBlockSize={50}
               cacheOverflowSize={2}
               maxConcurrentDatasourceRequests={1}
               infiniteInitialRowCount={1000}
               maxBlocksInCache={10}
               onGridReady={onGridReady}
               theme={theme}
            />
         </div>
      </div>
   );
};
export default Table;