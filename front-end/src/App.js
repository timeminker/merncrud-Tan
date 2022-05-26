import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {

  const [library, setLibrary] = useState([])
  const [newName, setNewName] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newImage, setNewImage] = useState('')
  const [newBooked, setNewBooked] = useState(false)

  const newBookSubmit = (event) => {
    event.preventDefault()
    axios.post('http://localhost:3000/books',
    {
      name: newName,
      category: newCategory,
      author: newAuthor,
      image: newImage,
      booked: newBooked
    }).then(() => {
      axios.get('http://localhost:3000/books').then((response) => {
        setLibrary(response.data)
      })
    })
  }

  useEffect(() => {
    axios.get('http://localhost:3000/books').then((response) => {
      setLibrary(response.data)
    })
  }, [])

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNewCategoryChange = (event) => {
    setNewCategory(event.target.value)
  }
  const handleNewAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleNewImageChange = (event) => {
    setNewImage(event.target.value)
  }
  const handleNewBookedChange = (event) => {
    setNewBooked(event.target.checked)
  }


  return (
    <>
      <h1>Library</h1>
      <h2>Add New Book</h2>
      <form onSubmit={newBookSubmit}>
        Name: <input type="text" onChange={handleNewNameChange}/><br/>
        Category: <input type="text" onChange={handleNewCategoryChange}/><br/>
        Author: <input type="text" onChange={handleNewAuthorChange}/><br/>
        Image: <input type="url" onChange={handleNewImageChange}/><br/>
        Booked: <input type="checkbox" onChange={handleNewBookedChange}/><br/>
        <input type="submit" value="Add Book"/>
      </form>
      <div>
        <ul>
          {library.map((book) => {
            return (
              <li key={book._id}>
              {book.name}<br/>
              {book.author}<br/>
              {book.category}<br/>
              <img src={book.image}/>
              {book.booked ? <p>Is Reserved</p> : <p>Available</p>}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default App;
