import { Form, Input, InputNumber, Select, Button, Row, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const AddBook = ({ categories, onBookAdded }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    onBookAdded(values);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{ categoryId: 'Other' }}
      style={{ width: '100%', maxWidth: '1000px' }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter title' }]}>
            <Input placeholder="Book Title" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Form.Item
            name="author"
            label="Author"
            rules={[{ required: true, message: 'Please enter author' }]}>
            <Input placeholder="Author Name" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter description'}]}>
            <Input placeholder="Brief description" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please enter price' }]}>
            <InputNumber style={{ width: '100%' }} min={0} placeholder="Price" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Form.Item
            name="stock"
            label="Stock"
            rules={[{ required: true, message: 'Please enter stock' }]}>
            <InputNumber style={{ width: '100%' }} min={0} placeholder="Stock" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Form.Item name="categoryId" label="Category">
            <Select placeholder="Select Category">
              {categories.map((cat) => (
                <Option key={cat.value} value={cat.value}>
                  {cat.label}
                </Option>
              ))}
              <Option value="Other">Other</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              icon={<PlusOutlined />}
              size="large"
              style={{ paddingLeft: '40px', paddingRight: '40px', borderRadius: '8px' }}>
              New Book
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AddBook;