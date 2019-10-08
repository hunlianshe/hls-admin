
import React, {
  Component,
} from 'react';

import './Login.css';
import 'antd/dist/antd.css';

import {
  Icon,
  Form,
  Input,
  Button,
  message,
} from 'antd';

import Service from '../../../Http/service';
import headImg from '../../public/icons/hpga@2x.png';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: '',
    };
    this.fileInput = '';
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    // this.props.form.validateFields();
  }

  handleSubmit = e => {
    e.preventDefault();
    let params = {};
    this.props.form.validateFields((err, values) => {
      if (!err) {
        params = values;
      }
    });
    if (JSON.stringify(params) === '{}') {
      return false;
    }
    Service.login(params).then((result) => {
      if (result.code === 200) {
        sessionStorage.setItem('token', `${result.data.username}${result.data.jnumber}`);
        this.props.history.push('/');
      } else {
        message.error(result.msg);
      }
    });
  };

  goRegister() {
    this.props.history.push('/register');
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="Login">
        <div className="head-img">
          <img src={headImg}/>
        </div>
        <div className="title">婚恋社后台管理系统</div>
        <div className="login-box">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('jnumber', {
                rules: [{ required: true, message: '请输入手机号' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="手机号"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
              <div className="flex-hrz">
                <div className="register" onClick={() => {this.goRegister()}}>注册</div>
                <div>忘记密码？</div>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

const WrappedLoginForm = Form.create({ name: 'login' })(Login);

export default WrappedLoginForm;


