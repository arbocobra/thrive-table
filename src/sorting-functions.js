export const handleSort = async (colName, dir, data) => {
   let sortedValues;
   if (colName == 'Id') {
      // Id column has numerical values, Id->Ascending is default
      sortedValues = (dir == 'desc') ? await sortNumDesc('Id', data) : data
   } else if (colName == 'RegDate' || colName == 'DSR') {
      // When sorted, RegDate and DSR values are ordered the same
      // Date was converted to ISO-string which can be sorted alphabetically
      sortedValues = (dir == 'desc') ? await sortAlphaAsc('RegDate', data) : await sortAlphaDesc('RegDate', data)
   } else if (colName == 'FullName') {
      // Full Name is not part of the data, but can be sorted using First Name
      sortedValues = (dir == 'desc') ? await sortAlphaDesc('FirstName', data) : await sortAlphaAsc('FirstName', data)
   }else {
      // Remaining columns can be sorted alphabetically
      sortedValues = (dir == 'desc') ? await sortAlphaDesc(colName, data) : await sortAlphaAsc(colName, data)
   }

   let result = await getFinalValues(sortedValues)

   return result
}

export const getFinalValues = async (dataArr) => dataArr.map(row => ({...row, 'DSR': getDSRCount(row.RegDate)}))

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

export const getDSRCount = (date) => {
   // get current date, convert registration date back to date type from string
   const now = new Date(Date.now())
   const joinedRound = new Date(date)
   
   // set both days to midnight
   const nowRound = now.setHours(0, 0, 0, 0);
   joinedRound.setHours(0,0,0,0)

   // calculate days - round-up required for DST changes
   const count = nowRound - joinedRound;
   const result = Math.ceil(count / (1000 * 3600 * 24) - 1)

   return result
}