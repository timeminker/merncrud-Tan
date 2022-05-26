import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'





// <form onSubmit={(event) => {
//   handleUpdateEntry(event,book)
// }}>
// Name: <input type="text" onChange={handleNewNameChange}/><br/>
// Category: <input type="text" onChange={handleNewCategoryChange}/><br/>
// Author: <input type="text" onChange={handleNewAuthorChange}/><br/>
// Image: <input type="url" onChange={handleNewImageChange}/><br/>
// Booked: <input type="checkbox" onChange={handleNewBookedChange}/><br/>
// <input type="submit" value="Edit Book"/>
// </form>


const App = () => {

  const [library, setLibrary] = useState([])
  const [newName, setNewName] = useState('')
  const [newCategory, setNewCategory] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newImage, setNewImage] = useState('')
  const [newBooked, setNewBooked] = useState(false)
  const [show, setShow] = useState(false)
  const [editLibrary, setEditLibrary] = useState([])
  const [showEdit, setShowEdit] = useState(false)

  const handleShowEdit = () => {
    setShowEdit(!showEdit)
  }

  const reveal = () => {
      setShow(!show)

  }

  const reset = () => {
    setNewName('')
    setNewAuthor('')
    setNewImage('')
    setNewBooked(false)
  }

  const newBookSubmit = (event) => {
    event.preventDefault()
    axios.post('http://localhost:3000/books',
    {
      name: newName,
      category: newCategory,
      author: newAuthor,
      image: newImage,
      booked: newBooked,
      showEdit:false
    }).then(() => {
      axios.get('http://localhost:3000/books').then((response) => {
        setLibrary(response.data)
        reset()
      })
    })
  }

  useEffect(() => {
    axios.get('http://localhost:3000/books').then((response) => {
      setLibrary(response.data)
    })
  }, [])

  const refreshPage = (event) => {
    event.preventDefault()
    // window.location.reload(false)
  }

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



  const handleDeleteEntry = (bookData) => {
    axios.delete(`http://localhost:3000/books/${bookData._id}`).then(() => {
      axios.get('http://localhost:3000/books').then((response) => {
        setLibrary(response.data)
      })
    })
  }

  const handleUpdateEntry = (event, bookData) => {
    event.preventDefault()
    setEditLibrary(library)
    axios.put(`http://localhost:3000/books/${bookData._id}`, {
      name: newName,
      category: newCategory,
      author: newAuthor,
      image: newImage,
      booked: newBooked,
      showEdit:false
    }).then(() => {
      axios.get('http://localhost:3000/books').then((response) => {
        setLibrary(response.data)
      })
    })
  }



  return (
    <div className='container'>
      <div className='library'>
        <h1>Library</h1>
      </div>
      <header>
      <h2>Add New Book</h2>
      <form onSubmit={newBookSubmit}>
        Name: <input type="text" onChange={handleNewNameChange} required/><br/>
        Category: <select name="category" onChange={handleNewCategoryChange}>
                    <option value='fiction'>Fiction</option>
                    <option value='fantasy'>Fantasy</option>
                    <option value='non-fiction'>Non-fiction</option>
                    <option value='biography'>Biography</option>
                  </select><br/>
        Author: <input type="text" onChange={handleNewAuthorChange}/><br/>
        Image: <input type="url" onChange={handleNewImageChange}/><br/>
        Booked: <input type="checkbox" onChange={handleNewBookedChange}/><br/>
        <input type="submit" value="Add Book"/>
      </form>
      </header>
      <div>
        <button>Fantasy</button><br/>
        Fiction<input type="checkbox" /><br/>
        Non-fiction<input type="checkbox" /><br/>
        Biography<input type="checkbox" /><br/>
      </div>
      <div>
        <ul>
          {library.map((book, index) => {
            return (
              <li key={book._id}>
              Name: {book.name}<br/>
              Author: {book.author}<br/>
              Category: {book.category}<br/>
              <img src={book.image}/>
              {book.booked ? <p>Is Reserved</p> : <p>Available</p>}<br/>
              {show && book.category == 'fiction' ?
              <div>{book.name}<br/>
              {book.author}<br/>
              {book.category}<br/>
              <img src={book.image}/></div> : null }
              { showEdit ?
                <form onSubmit={(event) => {
                handleUpdateEntry(event,book)
              }}>
              Name: <input type="text" onChange={handleNewNameChange} required/><br/>
              Category: <select name="category" onChange={handleNewCategoryChange}>
                          <option value='fiction'>Fiction</option>
                          <option value='fantasy'>Fantasy</option>
                          <option value='non-fiction'>Non-fiction</option>
                          <option value='biography'>Biography</option>
                        </select><br/>
              Author: <input type="text" onChange={handleNewAuthorChange}/><br/>
              Image: <input type="url" onChange={handleNewImageChange}/><br/>
              Booked: <input type="checkbox" onChange={handleNewBookedChange}/><br/>
              <input type="submit" value="Edit Book"/>
              </form> : <button onClick={(event) => {handleShowEdit()}}>Click to edit</button> }
              <button onClick={(event) => {
                handleDeleteEntry(book)
              }}>Delete</button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default App;
