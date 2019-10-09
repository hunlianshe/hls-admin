

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
import Utils from '../../../../utils/utils';

class UserDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '',
      userInfo: {},
      paginationProps: { pageSize: 10 },
      currentPage: 1,
      pageSize: 10000,
    }
  }

  componentWillMount() {
    console.log('this.$route.query:', this.props.match.params.id);
    const openid  = this.props.match.params.id
    this.getUserDetail(openid);
  }

  getUserDetail(openid) {
    Service.getUserInfo(openid).then((result) => {
      console.log('result', result);
      let userInfo = result.data;
      userInfo.gender = userInfo.gender && userInfo.gender === 1 ? '男' : '女';
      this.setState({ userInfo });
    });
  }

  render() {
    const userInfo = this.state.userInfo;
    return <div className="userDetail">
      <div className="sub-title">用户详情</div>
      
      <div>
        <div className="info-title">基本信息</div>
        <div className="info-cell">
          <div>昵称：{userInfo.name}</div>
          <div>手机：{userInfo.phone}</div>
        </div>
        <div className="info-cell">
          <div>性别：{userInfo.gender}</div>
          <div>生日：{userInfo.birth}</div>
        </div>
        <div className="info-cell">
          <div>身高：{userInfo.height}</div>
          <div>收入：{userInfo.salary}</div>
        </div>
        <div className="info-cell">
          <div>工作地区：{userInfo.workProvince} {userInfo.workCity} {userInfo.workRegion}</div>
          <div>学历：{userInfo.education}</div>
        </div>
        <div className="info-cell">
          <div>是否想要孩子：{userInfo.wantChild}</div>
          <div>是否有孩子：{userInfo.hasChild}</div>
        </div>
        <div className="info-cell">
          <div>婚姻状况：{userInfo.isMarriage}</div>
          <div>职业：{userInfo.jobGeneral} {userInfo.jobDetail}</div>
        </div>
        <div className="info-cell">
          <div>是否买房：{userInfo.haveHouse}</div>
        </div>
        <div>
          <div className="info-title">择偶标准</div>
          <div className="info-cell">
            <div>年龄：{userInfo.objectInfo && userInfo.objectInfo.age ? userInfo.objectInfo.age : '--'}</div>
            <div>收入：{userInfo.objectInfo && userInfo.objectInfo.salary ? userInfo.objectInfo.salary : '--'}</div>
          </div>
          <div className="info-cell">
            <div>身高：{userInfo.objectInfo && userInfo.objectInfo.height ? userInfo.objectInfo.height : '--'}</div>
          </div>
        </div>
        <div>
          <div className="info-title">其他信息</div>
          <div className="info-cell">
            <div>注册日期：{Utils.formatDate(userInfo.createdAt)}</div>
          </div>
        </div>
        <div>
          <div className="info-title">头像</div>
          <img style={{borderRadius: '70px', width: '70px', height: '70px'}} src={userInfo.avatarUrl} />
        </div>
        <div>
          <div className="info-title">图片</div>
          {
            userInfo.photos && userInfo.photos.map((url) => {
              return <div className="user-img">
                <img src={url} />
              </div>
            })
          }
        </div>
      </div>
    </div>
  }
}

export default UserDetail;




