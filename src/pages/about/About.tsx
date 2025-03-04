import React from 'react';
import { Card, Typography, Row, Col, Grid } from 'antd';
import './About.scss';

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

const About: React.FC = () => {
  const screens = useBreakpoint(); // Hook to detect screen size

  return (
    <div className="about-page">
      <Row justify="center" align="middle" style={{ minHeight: '50vh' }}>
        <Col xs={24} sm={20} md={16} lg={12}>
          <Card bordered={false}>
            <Title level={screens.xs ? 2 : 1} style={{ color: '#0D21A1', textAlign: 'center' }}>
              About Smart Analytics Hub
            </Title>
            <Paragraph style={{ fontSize: screens.xs ? '16px' : '18px', color: '#000100', textAlign: 'center' }}>
              At Smart Analytics Hub, we believe in the power of data to transform businesses. Our mission is to provide cutting-edge analytics and SEO tools that help you make informed decisions and achieve your goals.
            </Paragraph>
            <Paragraph style={{ textAlign: 'center' }}>
              Founded in 2023, our team consists of data scientists, developers, and SEO experts who are passionate about delivering the best solutions for our clients.
            </Paragraph>
          </Card>
        </Col>
      </Row>
      <Card bordered={false}>
        <Row gutter={[16, 16]} style={{ padding: screens.xs ? '20px 0' : '40px 0', background: '#FFFFFF' }}>
          <Col xs={24} sm={24} md={12}>
            <Card title="Our Mission" bordered={false}>
              <Paragraph>
                To empower businesses with actionable insights and tools that drive growth and success.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12}>
            <Card title="Our Vision" bordered={false}>
              <Paragraph>
                To become the leading platform for analytics and SEO solutions worldwide.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default About;