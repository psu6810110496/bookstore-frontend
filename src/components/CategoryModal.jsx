import { Modal, Form, Input, Button, List, Popconfirm, message } from 'antd';
import { PlusOutlined, DeleteOutlined, TagOutlined } from '@ant-design/icons';

export default function CategoryModal({ open, onClose, categories, onAdd, onDelete }) {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    onAdd(values.name);
    form.resetFields();
  };

  return (
    <Modal
      title={<span><TagOutlined /> Manage Categories</span>}
      open={open}
      onCancel={onClose}
      footer={null}
      width={500}
    >
      <Form form={form} onFinish={handleFinish} className="category-add-form">
        <Form.Item 
          name="name" 
          rules={[{ required: true, message: 'กรุณากรอกชื่อหมวดหมู่' }]}
          style={{ flex: 1, marginBottom: 0 }}>
          <Input placeholder="New Category Name (e.g. Science Fiction)" />
        </Form.Item>
        <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
          Add
        </Button>
      </Form>
      <div className="category-modal-list">
        <List
          dataSource={categories}
          renderItem={(item) => (
            <div className="category-item">
              <span>{item.label}</span>
              <Popconfirm
                title="ลบหมวดหมู่?"
                description="หนังสือที่อยู่ในหมวดหมู่นี้อาจได้รับผลกระทบ"
                onConfirm={() => onDelete(item.value)}
                okText="Yes"
                cancelText="No">
                <Button type="text" danger icon={<DeleteOutlined />} />
              </Popconfirm>
            </div>
          )}
        />
      </div>
    </Modal>
  );
}