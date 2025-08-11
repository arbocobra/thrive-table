import { faker } from '@faker-js/faker';

export const getData = async (count) => {
  const dataArray = []
  
  // Using Faker API to populate table data - row count provided as an argument

  for (let i = 0; i < count; i++) {
    let FirstName = faker.person.firstName();
    let LastName = faker.person.lastName();

    // Email uses FirstName initial and LastName
    let Email = faker.internet.email({firstName: FirstName[0], lastName: LastName})
    
    let City = faker.location.city()

    // Select registration date within past year
    let initDate = faker.date.recent({ days:365 })
    // Convert date to yyyy-mm-dd format allows it to be sorted as a string
    let RegDate = initDate.toISOString().split('T')[0]

    let val = {Id: i, FirstName, LastName, Email, City, RegDate}
    dataArray.push(val)
  }
  return dataArray
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