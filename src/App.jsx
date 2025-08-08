import { useState } from 'react'
import { faker } from '@faker-js/faker';
import Table from './components/Table';
import './App.css'

function App() {
  const [list, setList] = useState([])

  const getData = () => {
    const dataArray = []
    for (let i = 0; i < 25; i++) {
      let fname = faker.person.firstName();
      let lname = faker.person.lastName();
      let email = faker.internet.email({firstName: fname, lastName: lname})
      let city = faker.location.city()
      let joined = faker.date.recent({ days:365 })

      let val = {id: i, fname, lname, email, city, joined}
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
