import './App.css'
import { useState, useEffect } from 'react';
import { Divider, Spin } from 'antd';
import BookList from './components/BookList'
import AddBook from './components/AddBook';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3000"
const URL_BOOK = "/api/book"

function BookScreen() {
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false)
  const [bookData, setBookData] = useState([])

  const fetchBooks = async () => {
    setLoading(true)
    try{
      const response = await axios.get(URL_BOOK)
      setBookData(response.data)
    } catch(err) { console.log(err) }
    finally { setLoading(false)}
  }

  const handleAddBook = async (book) => {
    setLoading(true)
    try{
      await axios.post(URL_BOOK, book)
      fetchBooks()
    } catch(err) { console.log(err)}
    finally {setLoading(false)}
  }

  useEffect(() => {
    setTotalAmount(bookData.reduce((total, book) => total + (book.price * book.stock), 0))
  }, [bookData])

  useEffect(() => {
    fetchBooks()
  }, [])
  
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "2em" }}>
        <AddBook onBookAdded={handleAddBook}/>
      </div>
      <Divider>
        My books worth {totalAmount.toLocaleString()} dollars
      </Divider>
      <Spin spinning={loading}>
        <BookList 
          data={bookData} 
          onLiked={bookId => setBookData(bookData.map(book => book.id === bookId ? { ...book, likeCount: book.likeCount + 1 } : book))}
          onDeleted={bookId => setBookData(bookData.filter(book => book.id !== bookId))}
        />
      </Spin>
    </>
  )
}

export default BookScreen
