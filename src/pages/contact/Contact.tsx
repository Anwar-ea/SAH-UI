import React from 'react';
import { Card, Form, Input, Button, Typography, Row, Col } from 'antd';
import './Contact.scss';

const { Title, Paragraph } = Typography;

const Contact: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    alert('Thank you for contacting us! We will get back to you soon.');
  };

  return (
    <div className="contact-page">
      <Row justify="center" align="middle" style={{ minHeight: '80vh' }}>
        <Col span={16}>
          <Card bordered={false}>
            <Title level={1} style={{ color: '#0D21A1' }}>
              Contact Us
            </Title>
            <Paragraph style={{ fontSize: '18px', color: '#000100' }}>
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
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ padding: '40px 0', background: '#FFFFFF' }}>
        <Col span={24}>
          <Card title="Our Office" bordered={false}>
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
        </Col>
      </Row>
    </div>
  );
};

export default Contact;