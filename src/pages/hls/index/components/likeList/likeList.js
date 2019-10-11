

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

import './likeList.css';
import Service from '../../../../../Http/service';

class LikeList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '',
      data: [],
      paginationProps: { pageSize: 10 },
      currentPage: 1,
      pageSize: 10000,
    }

    this.goList = this.goList.bind(this);
  }

  componentWillMount() {
    this.columns = [
      {
        title: '昵称',
        width: 260,
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
        width: 80,
        textWrap: 'word-break',
        key: 'gender',
        dataIndex: 'gender',
      },
      {
        title: '我喜欢',
        key: 'meLike',
        render: (text, record) => (
          <span>
            <a target="_blank" href={`${window.location.origin}/#/likeListDetail/${record.openid}/meLike`}>我喜欢</a>
          </span>
        ),
      },
      {
        title: '喜欢我',
        key: 'likeMe',
        render: (text, record) => (
          <span>
            <a target="_blank" href={`${window.location.origin}/#/likeListDetail/${record.openid}/likeMe`}>喜欢我</a>
          </span>
        ),
      },
      {
        title: '相互喜欢',
        key: 'likeEachOther',
        render: (text, record) => (
          <span>
            <a target="_blank" href={`${window.location.origin}/#/likeListDetail/${record.openid}/likeEachOther`}
            // onClick={() => {
            //   this.goList(record.openid, 'likeEachOther');
            // }}
            >相互喜欢</a>
          </span>
        ),
      }
    ];
    this.getUserList();
  }

  goList(id, type) {
    // this.props.history.push(`/likeListDetail/${id}/${type}`);
    window.location.href = `${window.location.origin}/#/likeListDetail/${id}/${type}`;
  }

  getUserList(body = {}) {
    console.log("body", body)
    Service.getUserList(body).then((result) => {
      console.log('result', result);
      let data = result.data;
      data.forEach((e) => {
        return e.gender = e.gender === 1 ? '男' : '女';
      });
      this.setState({ data });
    });
  }

  /** items per page */
  handlePageSizeChange = (value) => {
    this.setState({ paginationProps: { pageSize: value } })
  }

  onSearch = (value) => {
    console.log('value', value)
    this.getUserList({ nickName: value });
  }

  render() {
    const {
      pageSize,
      modelData,
    } = this.state;
    const paginationProps = {
      pageSize: 10,
    }
    return <div>
      <div className="sub-title">喜欢列表管理</div>
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
          dataSource={this.state.data} />
      </div>
    </div>
  }
}

export default withRouter(LikeList);
