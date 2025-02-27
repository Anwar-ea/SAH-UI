import React from 'react';
import { Button, Typography } from 'antd';
import './Home.scss';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section">
        <Title level={1} style={{ color: '#FFFFFF', textAlign: 'center' }}>
          Welcome to Smart Analytics Hub
        </Title>
        <Paragraph style={{ color: '#FFFFFF', textAlign: 'center', fontSize: '18px', marginTop: '20px' }}>
          Unlock the power of data-driven decisions with our advanced analytics and SEO tools. Whether you're a business owner, marketer, or developer, we provide the insights you need to grow.
        </Paragraph>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Button type="primary" size="large">
            Explore Features
          </Button>
        </div>
      </div>

      {/* Divider */}
      <div className="divider" />

      {/* Real-Time Analytics Section */}
      <div className="section">
        <Title level={2} style={{ color: '#FFFFFF', textAlign: 'center' }}>
          Real-Time Analytics
        </Title>
        <Paragraph style={{ color: '#FFFFFF', textAlign: 'center', fontSize: '16px', marginTop: '10px' }}>
          Track your website’s performance in real-time. Monitor traffic, user behavior, and conversions with our intuitive dashboard.
        </Paragraph>
      </div>

      {/* Divider */}
      <div className="divider" />

      {/* SEO Optimization Section */}
      <div className="section">
        <Title level={2} style={{ color: '#FFFFFF', textAlign: 'center' }}>
          SEO Optimization
        </Title>
        <Paragraph style={{ color: '#FFFFFF', textAlign: 'center', fontSize: '16px', marginTop: '10px' }}>
          Improve your search engine rankings with our SEO tools. Analyze keywords, backlinks, and competitors to stay ahead.
        </Paragraph>
      </div>

      {/* Divider */}
      <div className="divider" />

      {/* Custom Reports Section */}
      <div className="section">
        <Title level={2} style={{ color: '#FFFFFF', textAlign: 'center' }}>
          Custom Reports
        </Title>
        <Paragraph style={{ color: '#FFFFFF', textAlign: 'center', fontSize: '16px', marginTop: '10px' }}>
          Generate detailed reports tailored to your needs. Export data in PDF, CSV, or Excel formats for further analysis.
        </Paragraph>
      </div>
    </div>
  );
};

export default Home;