import { useState, useEffect } from 'react';
import { getDSRCount } from './data';

// iterate data to add DSR value, async for large libraries
export const getFinalValues = async (dataArr) => dataArr.map(row => ({...row, 'DSR': getDSRCount(row.RegDate)}))

// sort columns with string values - ascending
const sortAlphaAsc = async (col, data) => {
   return data.sort((a,b) => {
      const valA = a[col].toUpperCase();
      const valB = b[col].toUpperCase();
      if (valA > valB) { return 1; }
      if (valA < valB) { return -1; }
      return 0
   })
}

// sort columns with string values - descending
const sortAlphaDesc = async (col, data) => {
   return data.sort((a,b) => {
      const valA = a[col].toUpperCase();
      const valB = b[col].toUpperCase();
      if (valA < valB) { return 1; }
      if (valA > valB) { return -1; }
      return 0
   })
}

// sort columns with numerical values - descending
const sortNumDesc = async (col, data) => data.sort((a,b) => b[col] - a[col])

// custom sorting hook - includes handleSort function
export const useColumnSorting = (data) => {
   const [tableData, setTableData] = useState(null)
   const [isLoading, setIsLoading] = useState(false)

   const dataCopy = JSON.parse(JSON.stringify(data));
   
   // useEffect runs on initial load to format default table values, applies isLoading while active
   useEffect(() => {
      const applyData = async () => {
         setIsLoading(true);
         try {
            getFinalValues(data).then(val => setTableData(val))
         } catch (e) {
            console.error('Error fetching data: ', e);
         } finally {
            setIsLoading(false)
         }
      }
      applyData()
      return () => {}
   }, [])

   // handleSort applies different sorting functions depending on values associated with each table column
   const handleSort = async (colName, dir) => {
      let sortedValues;
      const dataCopy = JSON.parse(JSON.stringify(data));

      if (colName == 'Id') {
         // Id column has numerical values, Id->Ascending is default
         sortedValues = (dir == 'desc') ? await sortNumDesc('Id', dataCopy) : dataCopy
      } else if (colName == 'RegDate' || colName == 'DSR') {
         // When sorted, RegDate and DSR values are ordered the same
         // Date was converted to ISO-string which can be sorted alphabetically
         sortedValues = (dir == 'desc') ? await sortAlphaAsc('RegDate', dataCopy) : await sortAlphaDesc('RegDate', dataCopy)
      } else if (colName == 'FullName') {
         // Full Name is not part of the data, but can be sorted using First Name
         sortedValues = (dir == 'desc') ? await sortAlphaDesc('FirstName', dataCopy) : await sortAlphaAsc('FirstName', dataCopy)
      }else {
         // Remaining columns can be sorted alphabetically
         sortedValues = (dir == 'desc') ? await sortAlphaDesc(colName, dataCopy) : await sortAlphaAsc(colName, dataCopy)
      }

      let result = await getFinalValues(sortedValues)

      setTableData(result)
   }

   return [tableData, handleSort, isLoading]
}
