import { useState } from 'react';
import { Button, Form, Input, Alert, Card, Typography, Layout, Space } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title, Text } = Typography;
const URL_AUTH = "/api/auth/login";

export default function LoginScreen(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);

  const handleLogin = async (formData) => {
    try {
      setIsLoading(true);
      setErrMsg(null);
      const response = await axios.post(URL_AUTH, formData);
      const token = response.data.access_token;
      axios.defaults.headers.common = { 'Authorization': `bearer ${token}` };
      props.onLoginSuccess(token);
    } catch (err) {
      console.log(err);
      setErrMsg("Username หรือ Password ไม่ถูกต้อง");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f5f7f9 0%, #e4e9f2 100%)'
    }}>
      <Card 
        style={{ 
          width: '100%', 
          maxWidth: 400, 
          borderRadius: '15px', 
          boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
          padding: '20px'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Space direction="vertical">
            <div style={{ 
              background: '#1890ff', 
              width: '60px', 
              height: '60px', 
              borderRadius: '50%', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center',
              margin: '0 auto 10px'
            }}>
              <LoginOutlined style={{ fontSize: '30px', color: '#fff' }} />
            </div>
            <Title level={2} style={{ margin: 0 }}>Login</Title>
            <Text type="secondary">Welcome! Please enter your details.</Text>
          </Space>
        </div>
        <Form
          name="login_form"
          layout="vertical"
          onFinish={handleLogin}
          autoComplete="off"
        >
          {errMsg && (
            <Form.Item>
              <Alert message={errMsg} type="error" showIcon closable onClose={() => setErrMsg(null)} />
            </Form.Item>
          )}
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input 
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />} 
              placeholder="Username" 
              size="large"
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password 
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Password" 
              size="large"
              style={{ borderRadius: '8px' }}
            />
          </Form.Item>
          <Form.Item style={{ marginTop: '30px' }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={isLoading} 
              block 
              size="large"
              style={{ 
                borderRadius: '8px', 
                height: '45px',
                fontWeight: 'bold',
                fontSize: '16px'
              }}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}