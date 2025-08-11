import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { useState, useEffect } from 'react';
import { getSortValues } from '../../useColumnSorting';
import { ModuleRegistry, ClientSideRowModelModule, PaginationModule, themeQuartz, ColumnHoverModule } from 'ag-grid-community'; 

const TableLib = ({data, updateSelectView}) => {

  ModuleRegistry.registerModules([ClientSideRowModelModule, PaginationModule, ColumnHoverModule]);

   const [rowData, setRowData] = useState();
  const [colDefs, setColDefs] = useState([
      { field: 'ID', flex: 1 },
      { field: 'Full Name', flex: 3 },
      { field: 'First Name', flex: 2 },
      { field: 'Last Name', flex: 2 },
      { field: 'Email', flex: 3 },
      { field: 'City', flex: 2 },
      { field: 'Registered Date', flex: 2 },
      { field: 'DSR', flex: 1 },
   ])

   const myTheme = themeQuartz
	.withParams({
        accentColor: "#5BC3BA",
        browserColorScheme: "light",
        fontFamily: {
            googleFont: "Roboto"
        },
        headerFontSize: 14,
        rowVerticalPaddingScale: 1.1
    });

   useEffect(() => {
       let ignore = false
       getSortValues(data)
       .then(vals => {
         if (!ignore) setRowData(vals)
       })
       return () => ignore = true
   
     },[])

   //   const suppressRowHoverHighlight = true;
   // const columnHoverHighlight = true;

  return (
    <div>
      <div onClick={() => updateSelectView(0)} className='return-button'><span>&#129104;  Back</span></div>
      <h3>Table Built With AG Grid Library - includes sort, draggable columns and pagination</h3>
      <div className='alt-container'>
         <AgGridReact
         rowData={rowData}
         columnDefs={colDefs}
         modules={[ClientSideRowModelModule]}
         pagination={true}
         paginationPageSize={20}
         paginationPageSizeSelector={[20, 50, 100]}
         theme={myTheme}
         />
      </div>
   </div>   
  );
};

export default TableLib