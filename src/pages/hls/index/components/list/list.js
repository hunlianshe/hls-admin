

import React, {
  Component,
} from 'react';

import { 
  Input,
  Select,
  Table
} from 'antd';
const { Search } = Input;
const { Option } = Select;

import './list.css';
import Service from '../../../../../Http/service';

const columns = [
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
    width:100,
    textWrap: 'word-break',
    dataIndex: 'fwbm',
    key: 'fwbm',
  },
  {
    title: 'jcwdm',
    width:100,
    textWrap: 'word-break',
    dataIndex: 'jcwdm',
    key: 'jcwdm',
  },
  {
    title: 'jcwmc',
    width:100,
    textWrap: 'word-break',
    dataIndex: 'jcwmc',
    key: 'jcwmc',
  },
  {
    title: 'jddm',
    width:100,
    textWrap: 'word-break',
    dataIndex: 'jddm',
    key: 'jddm',
  },
  {
    title: 'jdmc',
    width:100,
    textWrap: 'word-break',
    dataIndex: 'jdmc',
    key: 'jdmc',
  },
  {
    title: 'jlxmc',
    width:100,
    textWrap: 'word-break',
    dataIndex: 'jlxmc',
    key: 'jlxmc',
  },
  {
    title: 'jzwbm',
    width:100,
    textWrap: 'word-break',
    dataIndex: 'jzwbm',
    key: 'jzwbm',
  },
  {
    title: 'mlph',
    width:100,
    textWrap: 'word-break',
    dataIndex: 'mlph',
    key: 'mlph',
  },
  {
    title: 'sh',
    width:100,
    textWrap: 'word-break',
    dataIndex: 'sh',
    key: 'sh',
  },
  {
    title: 'szc',
    width:100,
    textWrap: 'word-break',
    dataIndex: 'szc',
    key: 'szc',
  },
  {
    title: 'updatedAt',
    width:100,
    textWrap: 'word-break',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: 'x',
    width:100,
    textWrap: 'word-break',
    dataIndex: 'x',
    key: 'x',
  },
  {
    title: 'y',
    width:100,
    textWrap: 'word-break',
    dataIndex: 'y',
    key: 'y',
  },
  {
    title: 'z',
    width:100,
    textWrap: 'word-break',
    dataIndex: 'z',
    key: 'z',
  },
];

class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '',
      data: [],
      paginationProps: { pageSize: 10 },
      currentPage: 1,
      pageSize: 10000,
    }
  }

  componentWillMount() {
    this.getModelMetadata();
  }

  getModelMetadata(currentPage = 1, limit = 100000, filename = '') {
    Service.getModelMetadata({ currentPage, limit, filename }).then((data) => {
      data = data.data
      this.setState({ data })
    }) 
  }

  /** items per page */
  handlePageSizeChange = (value) => {
    this.setState({ paginationProps: { pageSize: value } })
  }

  onSearch = (value) => {
    this.getModelMetadata(1, 10, value);
  } 

  render() {
    const {
      pageSize,
      modelData,
    } = this.state;
    const paginationProps = {
      pageSize:10,
    }
    return <div>
      <div className="sub-title">实有数据</div>
      <div className="list-search">
        <Search
          placeholder="fileName"
          enterButton="搜索"
          size="large"
          onSearch={this.onSearch}
        />
      </div>
      <div className="list-table">
        <Table pagination={this.state.paginationProps}
          columns={columns}
          rowKey={record => record._id}
          dataSource={this.state.data}/>
      </div>

      <div className="list-pageSize" >
        <label>每页数量：</label>
        <Select defaultValue="10" onChange={this.handlePageSizeChange}>
          <Option value="10">10</Option>
          <Option value="20">20</Option>
          <Option value="50">50</Option>
          <Option value="100">100</Option>
        </Select>
      </div>
    </div>
  }
}

export default List;




