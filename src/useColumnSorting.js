import { useState, useEffect } from 'react';

const getSortValues = (data, arr = null, col = 'Id') => {
   if (!arr) arr = data.map((_,i) => i)
   const result = arr.map((el,i) => {
      let dataRow = data.find(val => val[col] == el)
      return dataDisplay(dataRow)
   })
   
   return result
}

const dataDisplay = (row) => {
   return {
      ID: row.Id,
      'Full Name': `${row.FirstName} ${row.LastName}`,
      'First Name': row.FirstName,
      'Last Name': row.LastName,
      Email: row.Email,
      City: row.City,
      'Registered Date': row.RegDate.toDateString(),
      DSR: getCount(row.RegDate)
   }
}

const getCount = (date) => {
   const now = new Date(Date.now())

   // set both values to midnight to only include days in count
   const nowRound = now.setHours(0, 0, 0, 0);
   const joinedRound = new Date(date)
   joinedRound.setHours(0,0,0,0)
   
   const count = nowRound - joinedRound;
   return count / (1000 * 3600 * 24)
}

export const useColumnSorting = (data, cols) => {
   const [tableData, setTableData] = useState(getSortValues(data))

   const handleSort = (col, dir) => {
      let sortedValues;
      // if date field
      if (col == 'RegDate') {
         let valueArray = data.map((el,i) => el[col])
         if (dir == 'asc') sortedValues = valueArray.sort((a, b) => a - b)
         if (dir == 'desc') sortedValues = valueArray.sort((a, b) => b - a)
      }
      // if numeric field
      if (col == 'Id' || col == '')
      // if alpha field

      setTableData(getSortValues(data, sortedValues, col))
   }

   return [tableData, handleSort]
}
