import { useState, useEffect } from 'react';

const getSortValues = async (dataArr) => {
   return dataArr.map(row => {
      return {
      ID: row.Id,
      'Full Name': `${row.FirstName} ${row.LastName}`,
      'First Name': row.FirstName,
      'Last Name': row.LastName,
      Email: row.Email,
      City: row.City,
      'Registered Date': row.RegDate,
      DSR: getDSRCount(row.RegDate)
   }
   })
}

const getDSRCount = (date) => {
   const now = new Date(Date.now())
   const joinedRound = new Date(date)
   
   // set both days to midnight
   const nowRound = now.setHours(0, 0, 0, 0);
   joinedRound.setHours(0,0,0,0)
   
   const count = nowRound - joinedRound;

   // calculate days - round for DST changes
   const result = Math.ceil(count / (1000 * 3600 * 24) - 1)

   return result
}

const sortAlphaAsc = async (col, data) => {
   return data.sort((a,b) => {
      const valA = a[col].toUpperCase();
      const valB = b[col].toUpperCase();
      if (valA > valB) { return 1; }
      if (valA < valB) { return -1; }
      return 0
   })
}

const sortAlphaDesc = async (col, data) => {
   return data.sort((a,b) => {
      const valA = a[col].toUpperCase();
      const valB = b[col].toUpperCase();
      if (valA < valB) { return 1; }
      if (valA > valB) { return -1; }
      return 0
   })
}

const sortNumDesc = async (col, data) => data.sort((a,b) => b[col] - a[col])

export const useColumnSorting = (data) => {
   const [tableData, setTableData] = useState(null)
   const [isLoading, setIsLoading] = useState(false)
   const [isError, setIsError] = useState(null)

   useEffect(() => {
      const applyData = async (data) => {
         setIsLoading(true);
         try {
            getSortValues(data).then(val => setTableData(val))
         } catch (error) {
            setIsError(error)
         } finally {
            setIsLoading(false)
         }
      }
      applyData(data)
      return () => {}
   }, [])

   const handleSort = async (colName, dir) => {
      let sortedValues;
      const dataCopy = JSON.parse(JSON.stringify(data));
      if (colName == 'Id') {
         sortedValues = (dir == 'desc') ? await sortNumDesc('Id', dataCopy) : dataCopy
      } else if (colName == 'RegDate' || colName == 'DSR') {
         sortedValues = (dir == 'desc') ? await sortAlphaAsc('RegDate', dataCopy) : await sortAlphaDesc('RegDate', dataCopy)
      } else if (colName == 'FullName') {
         sortedValues = (dir == 'desc') ? await sortAlphaDesc('FirstName', dataCopy) : await sortAlphaAsc('FirstName', dataCopy)
      }else {
         sortedValues = (dir == 'desc') ? await sortAlphaDesc(colName, dataCopy) : await sortAlphaAsc(colName, dataCopy)
      }

      let result = await getSortValues(sortedValues)

      setTableData(result)
   }

   return [tableData, handleSort, isLoading, isError]
}
