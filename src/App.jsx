import { useState } from 'react'
import { faker } from '@faker-js/faker';
import Table from './components/Table';
import './App.css'

function App() {
  const [list, setList] = useState([])

  const getData = () => {
    const dataArray = []
    for (let i = 0; i < 25; i++) {
      let FirstName = faker.person.firstName();
      let LastName = faker.person.lastName();
      let Email = faker.internet.email({firstName: FirstName, lastName: LastName})
      let City = faker.location.city()
      let initDate = faker.date.recent({ days:365 })
      let RegDate = initDate.toISOString().split('T')[0]
      let val = {Id: i, FirstName, LastName, Email, City, RegDate}
      dataArray.push(val)
    }
    setList(dataArray)
  }

  if (!list.length) getData()

  return (
    <>
      <div className="card">
        <Table data={list} />
      </div>
    </>
  )
}

export default App
