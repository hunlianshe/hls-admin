
import React, {
  Component,
} from 'react';

import 'antd/dist/antd.css';
import './index.css';

import Model  from '../../components/model/model';
import UserList from './components/userList/userList';
import UserDetail from './components/userDetail/userDetail';
import UploadActData from './components/uploadActData/uploadActData';
//import Pipeline from './components/pipeline/pipeLine';

import { 
  Layout,
  Menu,
} from 'antd';
const { Sider, Content } = Layout;

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
      <Layout>
        {/* <Header className="header" style={{ background: '#FFF' }}>
          <div className="logo" />
          <div style={{display:"none",justifyContent:"space-between"}}>
            <div>
              <img src={iconMenu} width="20px" height="20px" style={{marginRight:"15px"}} />
              <img src={iconLogo} width="110px" height="22px"  />
            </div>
          <div>
          <img src={iconNotification}  width="23.33px" height="23.33px" style={{marginRight:"15px"}}/>
          <img src={zukliu}  width="50px" height="50px" />
          </div>
          </div>
          <Menu
            theme="white"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{ lineHeight: '64px' }}
          >
          </Menu>
        </Header> */}
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
            </Content>
          </Layout>
        </Layout>
      </Layout>
      <UserList />
    </div>
  }
}

export default Admin;
