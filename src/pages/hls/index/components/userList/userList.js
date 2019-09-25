

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

import './userList.css';
import Service from '../../../../../Http/service';

const columns = [
  {
    title: '昵称',
    dataIndex: 'nickName',
    key: 'nickName',
  },
  {
    title: '手机',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '性别',
    key: 'gender',
    dataIndex: 'gender',
  },

  {
    title: '生日',
    key: 'birth',
    dataIndex: 'birth',
  },
  {
    title: '身高',
    dataIndex: 'height',
    key: 'height',
  },
  {
    title: '收入',
    dataIndex: 'salary',
    key: 'salary',
  },
  {
    title: '工作省市',
    dataIndex: 'workProvince',
    key: 'workProvince',
  },
  {
    title: '工作城市',
    dataIndex: 'workCity',
    key: 'workCity',
  },
  {
    title: '工作区域',
    dataIndex: 'workRegion',
    key: 'workRegion',
  },
  {
    title: '婚姻状况',
    dataIndex: 'isMarriage',
    key: 'isMarriage',
  },
  {
    title: '受教育程度',
    dataIndex: 'education',
    key: 'education',
  },
  {
    title: '是否有小孩',
    dataIndex: 'hasChild',
    key: 'hasChild',
  },
  {
    title: '是否想要小孩',
    dataIndex: 'wantChild',
    key: 'wantChild',
  },
  {
    title: '工作',
    dataIndex: 'jobGeneral',
    key: 'jobGeneral',
  },
  {
    title: '工作',
    dataIndex: 'jobDetail',
    key: 'jobDetail',
  },
  {
    title: '是否买房',
    dataIndex: 'haveHouse',
    key: 'haveHouse',
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
    this.getUserList();
  }

  getUserList(id = '') {
    Service.getUserList(id).then((data) => {
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
      <div className="sub-title">用户列表</div>
      <div className="list-search">
        <Search
          placeholder="昵称"
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




