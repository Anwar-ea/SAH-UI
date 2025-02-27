import React from 'react';
import { Card, Typography, Row, Col } from 'antd';
import './About.scss';

const { Title, Paragraph } = Typography;

const About: React.FC = () => {
  return (
    <div className="about-page">
      <Row justify="center" align="middle" style={{ minHeight: '80vh' }}>
        <Col span={16}>
          <Card bordered={false}>
            <Title level={1} style={{ color: '#0D21A1' }}>
              About Smart Analytics Hub
            </Title>
            <Paragraph style={{ fontSize: '18px', color: '#000100' }}>
              At Smart Analytics Hub, we believe in the power of data to transform businesses. Our mission is to provide cutting-edge analytics and SEO tools that help you make informed decisions and achieve your goals.
            </Paragraph>
            <Paragraph>
              Founded in 2023, our team consists of data scientists, developers, and SEO experts who are passionate about delivering the best solutions for our clients.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ padding: '40px 0', background: '#FFFFFF' }}>
        <Col span={12}>
          <Card title="Our Mission" bordered={false}>
            <Paragraph>
              To empower businesses with actionable insights and tools that drive growth and success.
            </Paragraph>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Our Vision" bordered={false}>
            <Paragraph>
              To become the leading platform for analytics and SEO solutions worldwide.
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default About;