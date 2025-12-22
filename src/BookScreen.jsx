import { useState, useEffect } from 'react';
import { Layout, Typography, Button, Spin, message, Card, Space } from 'antd';
import { LogoutOutlined, BookFilled, TagOutlined } from '@ant-design/icons';
import axios from 'axios';

import BookList from './components/BookList';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import CategoryModal from './components/CategoryModal';

const { Header, Content } = Layout;
const { Title } = Typography;

const URL_BOOK = "/api/book";
const URL_CATEGORY = "/api/book-category";

function BookScreen({ onLogout }) {
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [editBook, setEditBook] = useState(null);
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(URL_CATEGORY);
      setCategories(response.data.map(cat => ({
        label: cat.name,
        value: cat.id
      })));
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddCategory = async (name) => {
    try {
      await axios.post(URL_CATEGORY, { name });
      message.success('เพิ่มหมวดหมู่สำเร็จ');
      fetchCategories();
    } catch (err) {
      message.error('ไม่สามารถเพิ่มหมวดหมู่ได้');
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`${URL_CATEGORY}/${id}`);
      message.success('ลบหมวดหมู่สำเร็จ');
      fetchCategories();
    } catch (err) {
      message.error('ลบไม่สำเร็จ (อาจมีหนังสืออยู่ในหมวดหมู่ต้นทาง)');
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
      message.error('ไม่สามารถเพิ่มหนังสือได้ (เช็คขนาดไฟล์รูปภาพ)');
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

  const handleEditBook = async (values) => {
    setLoading(true);
    try {
      const { id, category, createdAt, updatedAt, ...data } = values;
      await axios.patch(`${URL_BOOK}/${id}`, data);
      message.success('แก้ไขข้อมูลสำเร็จ');
      setEditBook(null);
      fetchBooks();
    } catch (error) {
      message.error('แก้ไขข้อมูลล้มเหลว');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBooks();
  }, []);

  return (
    <Layout className="screen-layout">
      <Header className="header-bar">
        <Space>
          <BookFilled style={{ color: '#fff', fontSize: '20px' }} />
          <Title level={4} style={{ color: '#fff', margin: 0 }}>BOOK STORE</Title>
        </Space>
        <Button type="primary" danger icon={<LogoutOutlined />} onClick={onLogout}>
          Logout
        </Button>
      </Header>
      <Content>
        <div className="content-wrapper">
          <Card className="main-card">
            <div style={{ textAlign: 'center' }}>
              <Space style={{ marginBottom: '25px' }}>
                <Title level={5} style={{ margin: 0 }}>Add Book</Title>
                <Button 
                  size="small" 
                  icon={<TagOutlined />} 
                  onClick={() => setIsCatModalOpen(true)}>
                  Manage Categories
                </Button>
              </Space>
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <AddBook categories={categories} onBookAdded={handleAddBook} />
              </div>
            </div>
          </Card>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <Title level={3} style={{ margin: 0, fontWeight: 600 }}>Books List</Title>
            <div style={{ width: '45px', height: '4px', background: '#1890ff', margin: '10px auto 0', borderRadius: '2px' }} />
          </div>
          <div className="table-container">
            <Spin spinning={loading} size="large">
              <BookList 
                data={bookData} 
                onLiked={(book) => {}}
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
      <CategoryModal 
        open={isCatModalOpen}
        onClose={() => setIsCatModalOpen(false)}
        categories={categories}
        onAdd={handleAddCategory}
        onDelete={handleDeleteCategory}
      />
    </Layout>
  );
}

export default BookScreen;