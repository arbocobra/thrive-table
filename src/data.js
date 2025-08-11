import { faker } from '@faker-js/faker';

export const getData = async (count) => {
    const dataArray = []
    for (let i = 0; i < count; i++) {
      let FirstName = faker.person.firstName();
      let LastName = faker.person.lastName();
      let Email = faker.internet.email({firstName: FirstName, lastName: LastName})
      let City = faker.location.city()
      let initDate = faker.date.recent({ days:365 })
      let RegDate = initDate.toISOString().split('T')[0]
      let val = {Id: i, FirstName, LastName, Email, City, RegDate}
      dataArray.push(val)
    }
    return dataArray
  }