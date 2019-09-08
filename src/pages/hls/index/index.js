
import React, {
  Component,
} from 'react';

import 'antd/dist/antd.css';
import './admin.css';

import Model  from '../../components/model/model';
import Excel  from '../../components/uploadFile/uploadFile';
import List  from './components/list/list';
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
            <Menu.Item key="1">模型解析</Menu.Item>
            <Menu.Item key="2">excel解析</Menu.Item>
            <Menu.Item key="3">模型管理</Menu.Item>
            <Menu.Item key="4">实有数据</Menu.Item>
            <Menu.Item key="5">glb convert</Menu.Item>
            <Menu.Item key="6">Pipeline</Menu.Item>
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
          { menuKey === '1' ? <Excel /> : null }
          { menuKey === '2' ? <Model /> : null }
          { menuKey === '3' ? <List /> : null }
          { menuKey === '4' ? <UploadActData /> : null }
          { menuKey === '5' ? <Model /> : null }
          { menuKey === '6' ? <Pipeline /> : null }
          </Content>
        </Layout>
      </Layout>
    </Layout>
    </div>
  }
}

export default Admin;
