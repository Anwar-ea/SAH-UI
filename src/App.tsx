import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Layout, Menu, Row, Col, Avatar, Button, message, Tooltip } from 'antd';
import type { MenuProps } from 'antd';
import { LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import './App.scss';
import { config } from './utility/config';
import { useUserContext } from './stateContext/root-state-context';
import { useQueries, useQuery } from 'react-query';
import { authService } from './services/auth.service';

const { Header, Content, Footer } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

const App: React.FC = () => {
  // Define menu items
  const redirect = useNavigate();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const {user, clearUserState} = useUserContext()
  const {refetch} = useQuery('logout', () => authService.logout(), {
    enabled: false, 
    onSuccess: (data) => {
      message.success(data.message);
      clearUserState();
      localStorage.clear();
      redirect('/auth?action=login');
    },
    onError: (err) => {
      message.error("An error occurred while trying to logout.");

    }
  })
  useEffect(() => {

    let items: MenuItem[] = [
      {
        key: 'home',
        label: <Link to="/">Home</Link>,
      },
      {
        key: 'about',
        label: <Link to="/about">About</Link>,
      }, 
      {
        key: 'contact',
        label: <Link to="/contact">Contact</Link>,
      },
     ( !user ? {
        key: 'login',
        icon: <LoginOutlined/>,
        label: (<Link to="/auth?action=login">Login</Link>)
      } :
      {
        key: 'signin',
        label: (<Tooltip title={`${user.firstName} ${user.lastName}`}><Avatar src={user.pictureUrl ?? '../public/images/avatar-1577909_640.png'} shape='circle' /></Tooltip>),
        children: [
          {
            key: 'logout',
            label: 'Logout',
            icon: <LogoutOutlined/>,
            onClick: () => {
              refetch();
            }
          }
        ]
      }),
    ];
    setMenuItems(items)
  }, [user])

  return (
    <Layout className="layout">
      {/* Glass-like Floating Navbar */}
      <Header style={{ padding: '0 20px' }}>
        <Row justify="space-between" align="middle">
          {/* Logo */}
          <Col style={{display: 'flex'}}>
            {/* <div className="logo" style={{ color: '#FFFFFF', fontSize: '24px', fontWeight: 'bold' }}> */}

              <img src="../public/images/SAH-logo.png" style={{ width: '60px', height: '60px'}} alt="" />
            {/* </div> */}
          </Col>

          {/* Navigation Menu */}
          <Col>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['home']}
              items={menuItems} // Use the `items` prop
              style={{ borderBottom: 'none' }}
            />
          </Col>
        </Row>
      </Header>

      {/* Main Content */}
      <Content>
        <Outlet /> {/* This will render the nested routes */}
      </Content>

      {/* Footer */}
      <Footer>
        Smart Analytics Hub ©2025
      </Footer>
    </Layout>
  );
};

export default App;