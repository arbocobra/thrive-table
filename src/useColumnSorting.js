import { useState } from 'react';

const getSortValues = (dataArr) => {
   return dataArr.map(el => dataDisplay(el))
   // if (!arr) arr = data.map((_,i) => i)
   // const result = arr.map((el,i) => {
   //    let dataRow = data.find(val => val[col] == el)
   //    return dataDisplay(dataRow)
   // })
   
   // return result
}

const dataDisplay = (row) => {
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
}

// const getFormattedDate = (date) => {
//    const dateCopy = new Date(date)
//    return dateCopy.toDateString() 86400000
// }

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

const sortAlphaAsc = (col, data) => {
   return data.sort((a,b) => {
      const valA = a[col].toUpperCase();
      const valB = b[col].toUpperCase();
      if (valA > valB) { return 1; }
      if (valA < valB) { return -1; }
      return 0
   })
}

// const sortDateNumAsc = (col, data) => data.sort((a,b) => a[col] - b[col])

const sortAlphaDesc = (col, data) => {
   return data.sort((a,b) => {
      const valA = a[col].toUpperCase();
      const valB = b[col].toUpperCase();
      if (valA < valB) { return 1; }
      if (valA > valB) { return -1; }
      return 0
   })
}

const sortDateNumDesc = (col, data) => data.sort((a,b) => b[col] - a[col])

export const useColumnSorting = (data) => {
   const [tableData, setTableData] = useState(getSortValues(data))

   const handleSort = (colName, dir) => {
      let sortedValues;
      let sortCol;
      const dataCopy = JSON.parse(JSON.stringify(data));
      switch (colName) {
         case 'Full Name':
         case 'First Name':
            // sortCol = 'FirstName';
            sortedValues = (dir == 'desc') ? sortAlphaDesc('FirstName', dataCopy) : sortAlphaAsc('FirstName', dataCopy)
            break;
         case 'Last Name':
            // sortCol = 'LastName';
            sortedValues = (dir == 'desc') ? sortAlphaDesc('LastName', dataCopy) : sortAlphaAsc('LastName', dataCopy)
            break;
         case 'City':
            // sortCol = 'City';
            sortedValues = (dir == 'desc') ? sortAlphaDesc('City', dataCopy) : sortAlphaAsc('City', dataCopy)
            break;
         case 'Email':
            // sortCol = 'Email';
            sortedValues = (dir == 'desc') ? sortAlphaDesc('Email', dataCopy) : sortAlphaAsc('Email', dataCopy)
            break;
         case 'Registered Date': 
         case 'DSR': 
            // sortCol = 'RegDate';
            sortedValues = (dir == 'desc') ? sortAlphaAsc('RegDate', dataCopy) : sortAlphaDesc('RegDate', dataCopy)
            // sortedValues = dir == 'desc' ? sortDateNumDesc('RegDate', dataCopy) : sortDateNumAsc('RegDate', dataCopy)
            break;
         default:
            // sortCol = 'Id'
            sortedValues = (dir == 'desc') ? sortDateNumDesc('Id', dataCopy) : data
      }
      // if (sortCol !== 'Id') {
      //    if (dir == 'asc') sortedValues = sortAlphaAsc(sortCol, dataCopy)
      //    else if (dir == 'desc') sortedValues = sortAlphaDesc(sortCol, dataCopy)
      //    else sortedValues = data
      // } else {
      //    if (dir == 'desc') sortedValues = sortDateNumDesc('Id', dataCopy)
      //    else sortedValues = data
      // }
         
      setTableData(getSortValues(sortedValues))
   }

   return [tableData, handleSort]
}
