import {
  HomeOutlined,
  DatabaseOutlined,
  MoneyCollectOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import '../styles/DefaultLayout.css'
import Spinner from './Spinner';
const { Header, Content, Footer, Sider } = Layout;

const DefaultLayout = (props) => {
  const navigate = useNavigate();
  const { cartItems, loading } = useSelector(state => state.rootReducer)
  const [collapsed, setCollapsed] = useState(false);
  // const dispath = useDispatch();
  // To get localstorage data
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  return (

    <Layout style={{ minHeight: '100vh', }}>
      {loading && <Spinner />}

      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo">
          <h3 className='text-center text-light font-weight-bold mt-2 mb-1'>Pos</h3>
        </div>

        <Menu theme="dark" defaultSelectedKeys={window.location.pathname} mode="inline" >
          <Menu.Item key='/' icon={<HomeOutlined />}>
            <Link to='/'>Home</Link>
          </Menu.Item>

          <Menu.Item key='/items' icon={<DatabaseOutlined />}>
            <Link to='/items'>Items</Link>
          </Menu.Item>

          <Menu.Item key='/bills' icon={<MoneyCollectOutlined />}>
            <Link to='/bills'>Bills</Link>
          </Menu.Item>

          <Menu.Item key='/customers' icon={<UserOutlined />}>
            <Link to='/customers'>Customers</Link>
          </Menu.Item>

          <Menu.Item key='/logout' icon={<LogoutOutlined />}
            onClick={() => {
              localStorage.removeItem('auth')
              navigate("/login");
            }}>
            Logout
          </Menu.Item>
        </Menu>

      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background"
          style={{
            padding: 0,
            background: '#fff',
            marginLeft: 20
          }}
        >
          <div className='cart-item' onClick={() => navigate('/cart')}>
            <div className='child'>
              <p>User : {JSON.parse(localStorage.getItem('auth')).name}</p>
            </div>
            <div className='cart-item-2 child'>

              <p className='number-cart'>{cartItems.length}</p>
              <p>Cart</p>
            </div>
          </div>
        </Header>

        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <div
            className="site-layout-background"
            style={{
              margin: '16px 0',
              padding: 24,
              minHeight: 600,
            }}
          >
            {props.children}
          </div>
        </Content>

        <Footer
          style={{
            textAlign: 'center',
          }}
        >
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;