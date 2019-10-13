
import React, {
  Component,
} from 'react';

import './hlsHeader.css';
import {
  Layout,
} from 'antd';
const { Header} = Layout;

import user from '../../../public/user.png';

class HlsHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      steps: [],
      currentSteps: 1,
    }
  }

  componentWillMount() {
  }

  render() {
    const token = sessionStorage.getItem('token');
   return <div>
     <Header className="header">
       <div className="header-content">
         <div className="flex-1">婚恋社后台管理系统</div>
         <div>
           {token
             ? <div className="display-flex">
               <img src={user} />
                  已登陆
                </div>
             : null}
         </div>
       </div>
     </Header>
   </div>
  }
}

export default HlsHeader;

