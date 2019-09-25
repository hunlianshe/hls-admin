

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
    width: 100,
    textWrap: 'word-break',
    dataIndex: 'nickName',
    key: 'nickName',
  },
  {
    title: '手机',
    textWrap: 'word-break',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '性别',
    width: 40,
    textWrap: 'word-break',
    key: 'gender',
    dataIndex: 'gender',
  },

  {
    title: '生日',
    width: 200,
    textWrap: 'word-break',
    key: 'birth',
    dataIndex: 'birth',
  },
  {
    title: '身高',
    width: 100,
    textWrap: 'word-break',
    dataIndex: 'height',
    key: 'height',
  },
  {
    title: '收入',
    width: 100,
    textWrap: 'word-break',
    dataIndex: 'salary',
    key: 'salary',
  },
  {
    title: '工作省市',
    width: 100,
    textWrap: 'word-break',
    dataIndex: 'workProvince',
    key: 'workProvince',
  },
  {
    title: '工作城市',
    width: 100,
    textWrap: 'word-break',
    dataIndex: 'workCity',
    key: 'workCity',
  },
  {
    title: '工作区域',
    width: 100,
    textWrap: 'word-break',
    dataIndex: 'workRegion',
    key: 'workRegion',
  },
  {
    title: '婚姻状况',
    width: 100,
    textWrap: 'word-break',
    dataIndex: 'isMarriage',
    key: 'isMarriage',
  },
  {
    title: '教育',
    width: 100,
    textWrap: 'word-break',
    dataIndex: 'education',
    key: 'education',
  },
  {
    title: '是否有小孩',
    width: 100,
    textWrap: 'word-break',
    dataIndex: 'hasChild',
    key: 'hasChild',
  },
  {
    title: '是否想要小孩',
    width: 100,
    textWrap: 'word-break',
    dataIndex: 'wantChild',
    key: 'wantChild',
  },
  {
    title: '工作大类',
    width: 200,
    textWrap: 'word-break',
    dataIndex: 'jobGeneral',
    key: 'jobGeneral',
  },
  {
    title: '工作小类',
    width: 200,
    textWrap: 'word-break',
    dataIndex: 'jobDetail',
    key: 'jobDetail',
  },
  {
    title: '是否买房',
    width: 100,
    textWrap: 'word-break',
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

  getUserList() {
    Service.getUserList().then((result) => {
      console.log('result', result);
      let data = result.data;
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

      {/* <div className="list-pageSize" >
        <label>每页数量：</label>
        <Select defaultValue="10" onChange={this.handlePageSizeChange}>
          <Option value="10">10</Option>
          <Option value="20">20</Option>
          <Option value="50">50</Option>
          <Option value="100">100</Option>
        </Select>
      </div> */}
    </div>
  }
}

export default List;




