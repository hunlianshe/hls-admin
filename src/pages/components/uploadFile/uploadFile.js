
import React, {
  Component,
} from 'react';

import './uploadFile.css';
import 'antd/dist/antd.css';

import Config from '../../../../config/config';

import { Upload, Icon, message, Modal } from 'antd';
const Dragger = Upload.Dragger;

class Excel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: '',
    };
    this.fileInput = '';

    this.uploadProps = {
      name: 'file',
      multiple: true,
      action: `${Config.HOST}/assert/excel`,
      showUploadList: true,
      onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (status === 'done') {
          const response = info.file.response
          if (response.code === 200) {
            message.success(`${info.file.name}上传成功`, 3);
          } else {
            Modal.error({
              title: `上传失败`,
              content: `[${info.file.name}] ${response.msg}`,
            });
          }
        } else if (status === 'error') {
          Modal.error({
            title: `上传失败`,
            content: `[${info.file.name}] ${response.msg}`,
          });
        }
      },
    };
  }

  componentDidMount() {
  }

  goBack() {
    this.props.history.push('/index');
  }

  render() {
    return (
      <div className="UploadFile">
        <div>模型解析</div>
        <div className="uplaod">
          <Dragger {...this.uploadProps} >
            <p className="ant-upload-drag-icon">
              <Icon type="inbox" />
            </p>
            <p className="ant-upload-text">点击或拖拽上传</p>
            <p className="ant-upload-hint">支持多文件</p>
          </Dragger>
        </div>
      </div>
    )
  }
}

export default Excel;


