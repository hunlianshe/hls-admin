

import React, {
  Component,
} from 'react';
import { withRouter } from "react-router-dom";

import { 
  Input,
  Select,
  Table
} from 'antd';
const { Search } = Input;
const { Option } = Select;

import './userList.css';
import Service from '../../../../../Http/service';
import Utils from '../../../../utils/utils';


class UserList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '',
      data: [],
      paginationProps: { pageSize: 10 },
      currentPage: 1,
      pageSize: 10000,
    }
    
    this.goDetail = this.goDetail.bind(this);
  }

  componentWillMount() {
    this.columns = [
      {
        title: '昵称',
        width: 100,
        textWrap: 'word-break',
        dataIndex: 'nickName',
        key: 'nickName',
      },
      {
        title: '微信号',
        width: 100,
        textWrap: 'word-break',
        dataIndex: 'weChatId',
        key: 'weChatId',
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
        title: '注册日期',
        width: 40,
        textWrap: 'word-break',
        key: 'updatedAt',
        dataIndex: 'updatedAt',
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
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.height - b.height,
      },
      {
        title: '收入（万）',
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
      {
        title: '操作',
        width: 200,
        key: 'action',
        render: (text, record) => (
          <span>
            {/* <Divider type="vertical" /> */}
            <a target="_blank" href={`${window.location.origin}/#/userDetail/${record.openid}`} 
            // onClick={() => {
            //   this.goDetail(record.openid);
            // }}
            >详情</a>
          </span>
        ),
      }
    ];
    this.getUserList();
  }

  goDetail(id) {
    this.props.history.push(`/userDetail/${id}`);
  }

  getUserList(body = {}) {
    console.log("body", body)
    Service.getUserList(body).then((result) => {
      console.log('result', result);
      let data = result.data;
      data.forEach((e) => {
        e.gender = e.gender === 1 ? '男' : '女';
        e.updatedAt = Utils.formatDate(e.updatedAt);
        return e;
      });
      this.setState({ data });
    });
  }

  /** items per page */
  handlePageSizeChange = (value) => {
    this.setState({ paginationProps: { pageSize: value } })
  }

  onSearch = (value) => {
    console.log('value',value)
    this.getUserList({ nickName: value});
  }

  render() {
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
          columns={this.columns}
          rowKey={record => record._id}
          dataSource={this.state.data}/>
      </div>
    </div>
  }
}

export default withRouter(UserList);




