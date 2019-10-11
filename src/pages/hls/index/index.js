
import React, {
  Component,
} from 'react';

import 'antd/dist/antd.css';
import './index.css';

import UserList from './components/userList/userList';
import XlcsList from './components/xlcsList/xlcsList';
import LikeList from './components/likeList/likeList';
//import Pipeline from './components/pipeline/pipeLine';

import { 
  Layout,
  Menu,
} from 'antd';
import { element } from 'prop-types';
const { Header, Sider, Content } = Layout;

class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menuKey: '1'
    }
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick(e) {
    this.setState({
      menuKey: e.key,
    })
  }

  render() {
    const { menuKey } = this.state;
    return <div style={{"overflow":"scroll"}}>
      <Layout style={{ background: '#F2F2F2' }}>
        <Header className="header">
          <div style={{ color: '#ffffff' }}>
            婚恋社后台管理系统
          </div>
            <Menu
              theme="white"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
            >
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#F2F2F2' }}>
            <Menu 
              className="left-menu"
              mode="inline"
              // defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0,background: '#F2F2F2', color: "#41413F"}}
              onClick={this.handleMenuClick}
            >
              <Menu.Item key="1">用户管理</Menu.Item>
              <Menu.Item key="2">心理测试列表</Menu.Item>
              <Menu.Item key="3">喜欢列表管理</Menu.Item>
            </Menu>
          </Sider>
          <Layout >
            <Content
              style={{
                background: '#fff',
                paddingLeft: 15,
                paddingRight: 15,
                margin: 0,
                minHeight: 280,
              }}>
              {menuKey === '1' ? <UserList /> : null}
              {menuKey === '2' ? <XlcsList /> : null}
              {menuKey === '3' ? <LikeList /> : null}
              
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  }
}

export default Admin;
