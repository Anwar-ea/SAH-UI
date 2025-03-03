import React from 'react';
import { Card, Form, Input, Button, Typography, Row, Col, Grid } from 'antd';
import './Contact.scss';

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const Contact: React.FC = () => {
  const screens = useBreakpoint(); // Hook to detect screen size

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    alert('Thank you for contacting us! We will get back to you soon.');
  };

  return (
    <div className="contact-page">
      <Row justify="center" align="middle" style={{ minHeight: '80vh' }}>
        <Col xs={24} sm={20} md={16} lg={12}>
          <Card bordered={false}>
            <Title level={screens.xs ? 2 : 1} style={{ color: '#0D21A1', padding: screens.xs ? '0 20px' : '0 50px' }}>
              Contact Us
            </Title>
            <Paragraph style={{ fontSize: screens.xs ? '16px' : '18px', color: '#000100', padding: screens.xs ? '0 20px' : '0 50px' }}>
              Have questions or need assistance? Reach out to us! Our team is here to help you with any inquiries or feedback.
            </Paragraph>
            <Form onFinish={onFinish} layout="vertical">
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input placeholder="Enter your name" />
              </Form.Item>
              <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                <Input placeholder="Enter your email" />
              </Form.Item>
              <Form.Item name="message" label="Message" rules={[{ required: true }]}>
                <Input.TextArea rows={4} placeholder="Enter your message" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block={screens.xs}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: screens.xs ? '20px' : '50px' }}>
        <Card title="Our Office" bordered={false} style={{ maxWidth: '600px', width: '100%', textAlign: 'center' }}>
          <Paragraph>
            Address: 123 Analytics Street, Data City, DC 12345
          </Paragraph>
          <Paragraph>
            Email: support@smartanalyticshub.com
          </Paragraph>
          <Paragraph>
            Phone: +1 (123) 456-7890
          </Paragraph>
        </Card>
      </div>
    </div>
  );
};

export default Contact;