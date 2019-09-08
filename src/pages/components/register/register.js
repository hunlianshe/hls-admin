
import React, {
  Component,
} from 'react';

import './Register.css';
import 'antd/dist/antd.css';

import {
  Icon,
  Form,
  Input,
  Button,
  message
} from 'antd';

import Service from '../../../Http/service';

import headImg from '../../public/icons/hpga@2x.png';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Register extends Component {
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
    Service.register(params).then((result) => {
      if (result.code === 200 ) {
        message.success('注册成功');
        this.props.history.push('/login');
      } else {
        message.error(result.msg);
      }
    });
  };

  goLogin() {
    this.props.history.push('/login');
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="Register">
        <div className="head-img">
          <img src={headImg} />
        </div>
        <div className="title">黄浦地理信息平台</div>
        <div className="register-box">
          <Form onSubmit={this.handleSubmit} className="register-form">
            <Form.Item label="姓名">
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入姓名' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="姓名"
                />,
              )}
            </Form.Item>
            <Form.Item label="警号">
              {getFieldDecorator('jnumber', {
                rules: [{ required: true, message: '请输入警号' }],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="警号"
                />,
              )}
            </Form.Item>
            <Form.Item label="密码">
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
            <Form.Item label="确认密码">
              {getFieldDecorator('repassword', {
                rules: [{ required: true, message: '请输入确认密码' }],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="确认密码"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="register-form-button">
                注册
              </Button>
            </Form.Item>
            <div className="btn-login" onClick={() => { this.goLogin() }}>登录</div>
          </Form>
        </div>
      </div>
    )
  }
}

const WrappedRegisterForm = Form.create({ name: 'login' })(Register);

export default WrappedRegisterForm;