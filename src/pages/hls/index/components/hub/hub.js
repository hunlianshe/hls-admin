

import React, {
  Component,
} from 'react';
import './hub.css';
import { Layout, Button, List, Switch,Progress } from 'antd';
const { Content } = Layout;

let obj = {
  projectName: "Hub",
  application: [{
    title: 'Hub web',
    description: 'a wonderful website',
    git:"",
    docker:"ociocorpcommsnpregistry.azurecr.io/hubkube/hubweb",
  },
  {
    title: 'hubservice',
    description: 'backend for hubweb',
    git:"",
    docker:"ociocorpcommsnpregistry.azurecr.io/hubkube/hubservoce"
  },
  {
    title: 'mongo',
    description: 'database for hubservice',
    docker:"ociocorpcommsnpregistry.azurecr.io/hubkube/mongo"

  }]
}


class Hub extends Component {

 
  addProcess=()=>{ 
    this.props.addProcess();
}
  render() {
    const { tableData } = this.props;
    return <div style={{ marginLeft: '50px', marginRight: '50px' }}>
      <Content >
        <List
          itemLayout="horizontal"
          dataSource={tableData}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                //   avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                title={<a href="https://ant.design">{item.title}</a>}
                description={item.description}
              />
              <label style={{ fontSize: "12px", marginRight: "20px" }}> Setup develop environment</label>
              <Switch checkedChildren="open" unCheckedChildren="close"  style={{ marginRight: "20px" }} />
              <label style={{  fontSize: "12px", marginRight: "20px" }}> Setup dependence environment</label>
              <Switch checkedChildren="open" unCheckedChildren="close"  style={{  marginRight: "20px" }}/>
              <Progress width={50} type="circle" percent={item.percent} format={() => {if(item.percent>100)return 'ok'}} />
            </List.Item>
          )}
        />
        <Button type="primary" id='add' ref='add' onClick={this.addProcess} style={{ marginTop: "1%", marginLeft: "92%" }}>Setup</Button>
      </Content>
    </div>
  }
}

export default Hub;


