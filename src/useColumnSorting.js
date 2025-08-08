import { useState, useEffect } from 'react';

const getDefaultSort = (data, cols) => {
   const result = []
   for (let row of data) {
      let val = {
         ID: row.id,
         'Full Name': `${row.fname} ${row.lname}`,
         'First Name': row.fname,
         'Last Name': row.lname,
         Email: row.email,
         City: row.city,
         'Registered Date': dateTest(row.joined),
         DSR: getCount(row.joined)
      }
      result.push(val)
   }
   return result
}

const dateTest = (date) => {
   // let parsed = Date.parse(date)
   return date.getMonth()
}
const getCount = (date) => {
   const end = Date.now()
   const start = Date(date)
   const count = end - start;
   return count / (1000 * 3600 * 24)
}

// const columns = ['Id', 'Full Name', 'First Name', 'Last Name', 'Email', 'City', 'Registration Date', 'DSR']

export const useColumnSorting = (data, cols) => {
   const [tableData, setTableData] = useState(getDefaultSort(data, cols))
   // const output = {
   //    value: tableData
   // }
   return [tableData]
}
