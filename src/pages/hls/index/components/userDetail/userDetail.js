

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

import './userDetail.css';
import Service from '../../../../../Http/service';

class UserDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '',
      data: {},
      paginationProps: { pageSize: 10 },
      currentPage: 1,
      pageSize: 10000,
    }
  }

  componentWillMount() {
    console.log('this.$route.query:', this.$route.query);
    const { openid } = this.$route.query
    // this.getUserDetail();
  }

  getUserDetail(openid) {
    Service.getUserInfo(openid).then((result) => {
      console.log('result', result);
      let data = result.data;
      data.gender = data.gender === 1 ? '男' : '女';
      this.setState({ data });
    });
  }

  render() {
    return <div className="userDetail">
      <div className="sub-title">用户详情</div>
      <div>
        <div className="info-title">基本信息</div>
        <div className="info-cell">
          <div>昵称：hahhh</div>
          <div>手机：18887786789</div>
        </div>
        <div className="info-cell">
          <div>性别：hahhh</div>
          <div>生日：18887786789</div>
        </div>
        <div className="info-cell">
          <div>身高：hahhh</div>
          <div>收入：18887786789</div>
        </div>
        <div className="info-cell">
          <div>身高：hahhh</div>
          <div>收入：18887786789</div>
        </div>
        <div className="info-cell">
          <div>工作地区：hahhh</div>
          <div>学历：18887786789</div>
        </div>
        <div className="info-cell">
          <div>是否想要孩子：hahhh</div>
          <div>是否有孩子：18887786789</div>
        </div>
        <div className="info-cell">
          <div>婚姻状况：hahhh</div>
          <div>职业：18887786789</div>
        </div>
        <div className="info-cell">
          <div>是否买房：hahhh</div>
        </div>
        <div>
          <div className="info-title">择偶标准</div>
          <div className="info-cell">
            <div>年龄：hahhh</div>
            <div>收入：18887786789</div>
          </div>
          <div className="info-cell">
            <div>身高：hahhh</div>
          </div>
        </div>
      </div>
    </div>
  }
}

export default UserDetail;




