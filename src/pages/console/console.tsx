import { Layout, Menu, MenuProps, theme } from 'antd';
import { Content } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import * as React from 'react';
import { Link, Outlet } from 'react-router-dom';

interface IConsoleProps {
}
type MenuItem = Required<MenuProps>['items'][number];

let items: MenuItem[] = [
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
    }
  ];
const Console: React.FunctionComponent<IConsoleProps> = (props) => {
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
  return  (
    <Layout
    style={{ padding: '0px', height: '100vh', background: colorBgContainer, borderRadius: borderRadiusLG }}
  >
    <Sider style={{ background: colorBgContainer , }} width={'20%'} >
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        
        defaultOpenKeys={['sub1']}
        style={{ height: '100%' }}
        items={items}
      />
    </Sider>
    <Content style={{ padding: '0 24px', minHeight: 280 }}>
        <Outlet/>
    </Content>
  </Layout>
  );
};

export default Console;
