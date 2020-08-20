import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

interface Geolocation {
  lat: string,
  lng: string
}

interface Address {
  street: string,
  suite: string,
  city: string,
  zipcode: string,
  geo: Geolocation
}

interface Company {
  name: string,
  catchPhrase: string,
  bs: string
}

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  address: Address ,
  phone: string,
  website: string,
  company: Company
}

const useFetchUsers = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(json => setUsers(json))
      .catch(error => console.log(error))
  }, [])

  return users
}

function App() {

  const [searchTerm, setSearchTerm] = useState<string>("")
  const users: User[] = useFetchUsers()
  const recommendedUsers = 

  return (
    <div className="App">
      <input
        onChange={e => setSearchTerm(e.target.value)}
        value={searchTerm}
      />
      {
        users.map(
          (user: User) => <li key={user.id}>{user.name}</li>
        )
      }
    </div>
  );
}

export default App;
