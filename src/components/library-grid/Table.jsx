import React, { StrictMode, useCallback, useMemo, useState } from "react";
import { InfiniteRowModelModule, ModuleRegistry, } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { getData } from '../../data';

ModuleRegistry.registerModules([
  InfiniteRowModelModule,
//   ...(process.env.NODE_ENV !== "production" ? [ValidationModule] : []),
]);

const GridExample = () => {
//   const [columnDefs, setColumnDefs] = useState([
//     // this row shows the row index, doesn't use any data from the row
//     {
//       headerName: "ID",
//       maxWidth: 100,
//       // it is important to have node.id here, so that when the id changes (which happens
//       // when the row is loaded) then the cell is refreshed.
//       valueGetter: "node.id",
//       cellRenderer: (props) => {
//         if (props.value !== undefined) {
//           return props.value;
//         } else {
//           return (
//             <img src="https://www.ag-grid.com/example-assets/loading.gif" />
//           );
//         }
//       },
//     },
//     { field: "athlete", minWidth: 150 },
//     { field: "age" },
//     { field: "country", minWidth: 150 },
//     { field: "year" },
//     { field: "date", minWidth: 150 },
//     { field: "sport", minWidth: 150 },
//     { field: "gold" },
//     { field: "silver" },
//     { field: "bronze" },
//     { field: "total" },
//   ]);

   const [columnDefs, _setColumnDefs] = useState([
      { field: 'Id', headerName: 'ID', flex: 1 },
      { field: 'FullName', valueGetter: (p) => `${p.data.FirstName} ${p.data.LastName}`, flex: 3 },
      { field: 'FirstName', flex: 2 },
      { field: 'LastName', flex: 2 },
      { field: 'Email', flex: 3 },
      { field: 'City', flex: 2 },
      { field: 'RegDate', headerName: 'Registered Date', flex: 2 },
      { field: 'DSR', flex: 1 },
   ]);

  const onGridReady = useCallback((params) => {
   
   fetch()
      .then((resp) => resp.json())
      .then((data) => {
        const dataSource = {
          rowCount: undefined,
          getRows: (params) => {
            console.log(
              "asking for " + params.startRow + " to " + params.endRow,
            );
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
        params.api.setGridOption("datasource", dataSource);
      });
  }, []);

  return (
    <div>
      <div className='agtable-container'>
        <AgGridReact
          columnDefs={columnDefs}
          rowBuffer={0}
          rowModelType={"infinite"}
          cacheBlockSize={100}
          cacheOverflowSize={2}
          maxConcurrentDatasourceRequests={1}
          infiniteInitialRowCount={1000}
          maxBlocksInCache={10}
          onGridReady={onGridReady}
        />
      </div>
    </div>
  );
};
export default GridExample