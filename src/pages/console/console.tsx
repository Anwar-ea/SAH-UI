import { Layout, Menu, MenuProps, theme, Drawer, Button } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import * as React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MenuOutlined } from '@ant-design/icons';

interface IConsoleProps {}

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'home',
    label: <Link to="/console/app">Applications</Link>,
  },
  {
    key: 'about',
    label: <Link to="/console/api-key">API Key Management</Link>,
  },
  {
    key: 'contact',
    label: <Link to="/console/developers">Developer Notes</Link>,
  },
];

const Console: React.FunctionComponent<IConsoleProps> = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Function to handle window resize
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Layout
      style={{
        padding: '0px',
        maxHeight: '100vh',
        background: colorBgContainer,
        borderRadius: borderRadiusLG,
      }}
    >
      {/* Show Sider on Desktop */}
      {!isMobile ? (
        <Sider
          style={{ background: colorBgContainer }}
          width={'20%'}
        >
          <Menu mode="inline" defaultSelectedKeys={['1']} style={{ height: '100%' }} items={items} />
        </Sider>
      ) : (
        // Show Drawer button on Mobile
        <Button
          type="primary"
          icon={<MenuOutlined />}
          onClick={() => setDrawerVisible(true)}
          style={{ position: 'fixed', top: 16, left: 16, zIndex: 1000 }}
        />
      )}

      {/* Drawer for mobile view */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={250}
      >
        <Menu mode="inline" defaultSelectedKeys={['1']} items={items} onClick={() => setDrawerVisible(false)} />
      </Drawer>

      <Content style={{ padding: '0 24px', minHeight: 280 }}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default Console;
