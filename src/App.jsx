import './App.css'
import { useState, useEffect } from 'react';
import BookList from "./components/BookList";

function App() {
  const [totalAmount, setTotalAmount] = useState(0)
  const [bookData, setBookData] = useState([
    { id: 1, title: "Harry Potter", author: "J.K. Rowling", description: "Orphan Harry learns he is a wizard", price: 15.70, isbn: "978-1408825945", stock: 10 },
    { id: 2, title: "Sapiens", author: "Yuval Noah Harari", description: "A brief history of humankind", price: 22.99, isbn: "978-0062316097", stock: 50 },
  ])
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)

  const generateBook = () => {
    const current = bookData.length + 1
    return {
      id: current,
      title: `Dummy Book ${current}`,
      author: `Unknown${current}`,
      description: `Dummy Description ${current}`,
      price: Math.floor(Math.floor(Math.random() * 20)),
      stock: Math.floor(Math.floor(Math.random() * 50))
    }
  }

  const handleAddBook = () => {
    //setBookData([...bookData, generateBook()])
    setBookData([...bookData, {title: title, price: price, stock: stock}])
  }

  useEffect(() => {
    setTotalAmount(bookData.reduce((total, book) => total += (book.price * book.stock), 0))
  }, [bookData])

  return (
    <>
      <h1>Books Store</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <label>Title : </label>
        <input type="text" onChange={(evt) => setTitle(evt.target.value)}/>
        <label>Price : </label>
        <input type="number" onChange={(evt) => setPrice(evt.target.value)} />
        <label>Stock : </label>
        <input type="number" onChange={(evt) => setStock(evt.target.value)} />
        <button onClick={handleAddBook}>New Book</button>
      </div>
      <h3>My books worth {totalAmount} dollars</h3>
      <BookList data={bookData}/>
    </>
  )
}

export default App
