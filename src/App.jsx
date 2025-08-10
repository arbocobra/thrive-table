import { useState, useEffect } from 'react'
import { faker } from '@faker-js/faker';
import Table from './components/Table';
import './App.css'
import { getData } from './data';

const App = () => {
  const [list, setList] = useState([])

  // const getData = () => {
  //   const dataArray = []
  //   for (let i = 0; i < 25; i++) {
  //     let FirstName = faker.person.firstName();
  //     let LastName = faker.person.lastName();
  //     let Email = faker.internet.email({firstName: FirstName, lastName: LastName})
  //     let City = faker.location.city()
  //     let initDate = faker.date.recent({ days:365 })
  //     let RegDate = initDate.toISOString().split('T')[0]
  //     let val = {Id: i, FirstName, LastName, Email, City, RegDate}
  //     dataArray.push(val)
  //   }
  //   setList(dataArray)
  // }

  useEffect(() => {
    let ignore = false
    getData()
    .then(data => {
      if (!ignore) setList(data)
    })
    return () => ignore = true
  
    // getData().then(data => setList(data))
  },[])

  if (list.length) {
    return (
        <div className='container'>
          <Table data={list} />
        </div>
    )
  } else {
    return (
      <div className='container'>
          <p>Loading...</p>
      </div>
    )
  }

}

export default App
