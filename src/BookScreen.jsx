import { useState, useEffect } from 'react';
import { Layout, Typography, Button, Divider, Spin, message, Card, Space } from 'antd';
import { LogoutOutlined, BookFilled } from '@ant-design/icons';
import axios from 'axios';

import BookList from './components/BookList';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';

const { Header, Content } = Layout;
const { Title } = Typography;

const URL_BOOK = "/api/book";
const URL_CATEGORY = "/api/book-category";

function BookScreen({ onLogout }) {
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editBook, setEditBook] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(URL_CATEGORY);
      setCategories(response.data.map(cat => ({
        label: cat.name,
        value: cat.id
      })));
    } catch (error) {
      console.error('Error categories:', error);
    }
  };

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(URL_BOOK);
      setBookData(response.data);
    } catch (error) {
      message.error('โหลดข้อมูลหนังสือไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBook = async (bookValues) => {
    setLoading(true);
    try {
      await axios.post(URL_BOOK, bookValues);
      message.success('เพิ่มหนังสือใหม่เรียบร้อยแล้ว');
      fetchBooks();
    } catch (error) {
      message.error('ไม่สามารถเพิ่มหนังสือได้');
    } finally {
      setLoading(false);
    }
  };

  const handleLikeBook = async (book) => {
    try {
      await axios.patch(`${URL_BOOK}/${book.id}`, { 
        likeCount: (book.likeCount || 0) + 1 
      });
      fetchBooks();
    } catch (error) {
      message.error('Like ไม่สำเร็จ');
    }
  };

  const handleEditBook = async (values) => {
    setLoading(true);
    try {
      const { id, category, createdAt, updatedAt, ...data } = values;
      const payload = {
        ...data,
        price: Number(data.price),
        stock: Number(data.stock)
      };
      
      await axios.patch(`${URL_BOOK}/${id}`, payload);
      message.success('แก้ไขข้อมูลสำเร็จ');
      setEditBook(null);
      fetchBooks();
    } catch (error) {
      message.error('แก้ไขข้อมูลล้มเหลว');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`${URL_BOOK}/${bookId}`);
      message.success('ลบหนังสือออกแล้ว');
      fetchBooks();
    } catch (error) {
      message.error('ลบไม่สำเร็จ');
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBooks();
  }, []);

  return (
    <Layout style={{ minHeight: '100vh', background: '#f5f7f9' }}>
      <Header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        background: '#001529',
        padding: '0 40px',
        width: '100%'
      }}>
        <Space>
          <BookFilled style={{ color: '#fff', fontSize: '20px' }} />
          <Title level={4} style={{ color: '#fff', margin: 0 }}>BOOK STORE</Title>
        </Space>
        <Button type="primary" danger icon={<LogoutOutlined />} onClick={onLogout}>
          Logout
        </Button>
      </Header>

      <Content style={{ padding: '40px 0' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 40px' }}>
          <Card 
            style={{ 
              marginBottom: '40px', 
              borderRadius: '12px', 
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              border: 'none'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Title level={5} style={{ marginBottom: '25px' }}>Add Book</Title>

              <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <AddBook categories={categories} onBookAdded={handleAddBook} />
              </div>
            </div>
          </Card>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <Title level={3} style={{ margin: 0, fontWeight: 600 }}>Books List</Title>
            <div style={{ 
              width: '45px', 
              height: '4px', 
              background: '#1890ff', 
              margin: '10px auto 0', 
              borderRadius: '2px' 
            }}></div>
          </div>
          <div style={{ 
            background: '#fff', 
            borderRadius: '12px', 
            padding: '24px', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)' 
          }}>
            <Spin spinning={loading} size="large">
              <BookList 
                data={bookData} 
                onLiked={handleLikeBook}
                onDeleted={handleDeleteBook}
                onEdit={book => setEditBook(book)}
              />
            </Spin>
          </div>
        </div>
      </Content>

      <EditBook 
        book={editBook} 
        categories={categories} 
        open={editBook !== null} 
        onCancel={() => setEditBook(null)} 
        onSave={handleEditBook} 
      />
    </Layout>
  );
}

export default BookScreen;