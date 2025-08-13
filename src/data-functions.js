import { faker } from '@faker-js/faker';

export const getData = (count) => {
  const dataArray = []
  // Using Faker API to populate table data - row count provided as an argument
  for (let i = 0; i < count; i++) {
    let FirstName = faker.person.firstName();
    let LastName = faker.person.lastName();
    let Email = faker.internet.email({firstName: FirstName[0], lastName: LastName}) // Email uses FirstName initial and LastName
    let City = faker.location.city()
    let initDate = faker.date.recent({ days:365 })  // Select registration date within past year
    let RegDate = initDate.toISOString().split('T')[0]  // Convert date to yyyy-mm-dd format allows it to be sorted as a string

    let val = {Id: i, FirstName, LastName, Email, City, RegDate}
    dataArray.push(val)
  }
  return dataArray
}

// without a server there are no functions to limit fetch results in the request query
// this step is meant to replicate requesting API from a URL
export const fetchData = async () => {
  const filePath = '/api/data.json'
  try {
    const response = await fetch(filePath)
    const data = await response.json()
    return data
  } catch (e) {console.error('I broke')}
}

// calculate days since registration
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