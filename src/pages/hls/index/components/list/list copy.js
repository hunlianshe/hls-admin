

import React, {
  Component,
} from 'react';
import './list.css';

import { Input, Select, Drawer, Table, Divider, Tag, Button } from 'antd';
import Service from '../../lib/service';
import iconFailCircle from '../../public/boardx/icon-fail-circle.png';
import iconAlertCircle from '../../public/boardx/icon-alert-circle.png';
import iconEmergencyCircle from '../../public/boardx/icon-emergency-circle.png';
import iconCheckCircle from '../../public/boardx/icon-check-circle.png';
import iconMoreVert from '../../public/boardx/icon-more-vert.png';
import iconExpandMore from '../../public/boardx/icon-expand-more.png';
import Service from '../../../../../Http/service';

const { Option } = Select;
const drawerStyles = {

    drawer: { shadowColor: '#0000ff', shadowOpacity: 0.8, shadowRadius: 3},

    main: {paddingLeft: 0},

}
const columns = [
  // {
  //   title: '_id',
  //   key: '_id',
  //   dataIndex: '_id',
  //   render: (text, record) => {
  //     let color = "#3665F3"
  //     if (record.application !== "HUB") {
  //       color = "#4B7D06"
  //     }
  //     return (<div>
  //       {text}
  //       <br></br>
  //       <Tag color={color} key={text}>
  //         {record.application}
  //       </Tag>
  //     </div>)
  //   },
  // },
  {
    title: '上传日期',
    key: 'createdAt',
    dataIndex: 'createdAt',
  },
  {
    title: 'filename',
    key: 'filename',
    dataIndex: 'filename',
    // sorter: (a, b) =>{
    //   console.log(" a.expireDate - b.expireDate", a.expireDate > b.expireDate)
    //   return   a.expireDate > b.expireDate
    // } ,
    // sortDirections: ['descend', 'ascend'],
    // render: (text, record) => {
    //   let color
    //   if (record.expireStatus === "Expired") {
    //     color = "red"
    //   }
    //   return (<span>
    //     {record.expireDate}
    //     <br></br>
    //     <span style={{ color: color }}>
    //       {record.expireStatus}
    //     </span>
        
    //   </span>)
    // },
  },

  {
    title: 'fwbm',
    dataIndex: 'fwbm',
    key: 'fwbm',
  },
  {
    title: 'jcwdm',
    dataIndex: 'jcwdm',
    key: 'jcwdm',
  },
  {
    title: 'jcwmc',
    dataIndex: 'jcwmc',
    key: 'jcwmc',
  },
  {
    title: 'jddm',
    dataIndex: 'jddm',
    key: 'jddm',
  },
  {
    title: 'jdmc',
    dataIndex: 'jdmc',
    key: 'jdmc',
  },
  {
    title: 'jlxmc',
    dataIndex: 'jlxmc',
    key: 'jlxmc',
  },
  {
    title: 'jzwbm',
    dataIndex: 'jzwbm',
    key: 'jzwbm',
  },
  {
    title: 'mlph',
    dataIndex: 'mlph',
    key: 'mlph',
  },
  {
    title: 'sh',
    dataIndex: 'sh',
    key: 'sh',
  },
  {
    title: 'szc',
    dataIndex: 'szc',
    key: 'szc',
  },
  {
    title: 'updatedAt',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: 'x',
    dataIndex: 'x',
    key: 'x',
  },
  {
    title: 'y',
    dataIndex: 'y',
    key: 'y',
  },
  {
    title: 'z',
    dataIndex: 'z',
    key: 'z',
  },
];

const data = [
  {
    status: '1',
    env: '1',
    component: 32,
    location: '上海市浦东新区1号',
    expireDate:"2019-02-01"
  },
  {
    status: '2',
    env: '2',
    component: 42,
    location: '上海市浦东新区2号',
    expireDate:"2019-02-01"
  },
  {
    status: '3',
    env: '3',
    component: 32,
    location: '上海市浦东新区3号',
    expireDate:"2019-02-01"
  },
];



function handleChange(value) {
  console.log(`selected ${value}`);
}



class List extends Component {

  constructor(props) {
    super(props)
    this.state = {
      url: '',
      data: data,
      paginationProps: { pageSize: 10 },
      visible: false,

    }
  }


  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
   projectChange =(value) => {
     console.log('value',value)
     
     Service.getModelMetadata({}).then((data) => {
      data = data.data
      console.log("data....", data)
      this.setState({ data })
    })
  }

  componentWillMount() {
    Service.certlist().then((data) => {
      data = data.rows
      console.log("data....", data)
      this.setState({ data })
    })
  }

  /** items per page */
  handlePageSizeChange = (value) => {
    this.setState({ paginationProps: { pageSize: value } })
    console.log(`select pageSize:  ${value}`);
  }

  render() {
    return <div>
      <div> 模型</div>
      <div style={{ fontSize: "36px", color: "#111820" }} ><strong>模型管理</strong> </div>
      <div style={{ display: "flex",marginTop:"23px" }}>
        <div className="create-new">
          {/* <Select defaultValue="Request New Cert" type="primary" style={{ width: 146, backgroundColor: "#3665F3" }} onChange={handleChange}>
            <Option value="jack">External Cert</Option>
            <Option value="lucy">Internal Cert</Option>
          </Select> */}
          {/* <Button type="primary">Create New</Button> */}
        </div>
      </div>
      <div className="list-table">
        <Table style={{ marginTop: "12px" }} pagination={this.state.paginationProps} columns={columns} dataSource={this.state.data} />
      </div>

      <div className="list-pageSize" >
        <label>Items per page：</label>
        <Select defaultValue="10" onChange={this.handlePageSizeChange}>
          <Option value="10">10</Option>
          <Option value="20">20</Option>
          <Option value="50">50</Option>
          <Option value="100">100</Option>
        </Select>
      </div>


      <div className="right-model">
        <Drawer
          placement="right"
          width="400px"
          closable={true}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <div><b><h2>Certificate Detail</h2></b></div><br/>
          <div><span className={'reg_draw'}><b>Common Name:&nbsp;&nbsp;&nbsp;</b></span><span>hubdev.corp.ebay.com</span></div>
          <p/>
          <div><span className={'reg_draw'}><b>Subject Alternative Names:</b></span><p/><p>hubdev.corp.ebay.com, hubdev1.corp.ebay.com, hubdev2.corp.ebay.com, hubdev3.corp.ebay.com, hubdev4.corp.ebay.com, hubdev5.corp.ebay.com, hubdev6.corp.ebay.com, hubdev7.corp.ebay.com, hubdev8.corp.ebay.com, hubdev9.corp.ebay.com, hubdev10.corp.ebay.com, hubservicedev.corp.ebay.com, hubservicedev1.corp.ebay.com, hubservicedev2.corp.ebay.com, hubservicedev3.corp.ebay.com, hubservicedev4.corp.ebay.com, hubservicedev5.corp.ebay.com, hubservicedev6.corp.ebay.com, hubservicedev7.corp.ebay.com, hubservicedev8.corp.ebay.com, hubservicedev9.corp.ebay.com, hubservicedev10.corp.ebay.com</p></div>

          <div><span className={'reg_draw'}><b>Organization:&nbsp;&nbsp;&nbsp;</b></span><span>eBay Inc.</span></div>
          <p/>
          <div>
            <span className={'reg_draw'}><b>Organization Unit:&nbsp;&nbsp;&nbsp;</b></span><span>EF China</span>
          </div>
          <p/>
          <div>
            <span className={'reg_draw'}><b>Locality:&nbsp;&nbsp;&nbsp;</b></span><span>Shanghai</span>
          </div>
          <p/>
          <div>
           <span className={'reg_draw'}><b>State:&nbsp;&nbsp;&nbsp;</b></span><span>Shanghai</span>
          </div>
          <p/>
          <div>
            <span className={'reg_draw'}><b>Country:&nbsp;&nbsp;&nbsp;</b></span><span>CN</span>
          </div>
          <p/>
          <div>
            <span className={'reg_draw'}><b>Valid From:&nbsp;&nbsp;&nbsp;</b></span><span>July 2, 2018</span>
          </div>
          <p/>
          <div>
            <span className={'reg_draw'}><b>Valid to:&nbsp;&nbsp;&nbsp;</b></span><span>July 1, 2020</span>
          </div>
          <p/>
          <div>
            <span className={'reg_draw'}><b>Issuer:&nbsp;&nbsp;&nbsp;</b></span><span>eBay SSL CA v2 - A, eBay Inc</span>
          </div>
          <p/>
          <div>
            <span className={'reg_draw'}><b>Serial Number:</b></span><p>5b0000b8f6c01bd7dd557315c400000000b8f6</p></div><br/>

        </Drawer>
      </div>



    </div>
  }
}

export default List;




