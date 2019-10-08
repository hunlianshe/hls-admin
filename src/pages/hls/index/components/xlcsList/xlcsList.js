

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

import './xlcsList.css';
import Service from '../../../../../Http/service';
import { element } from 'prop-types';



class XlcsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      url: '',
      xlcsList: [],
      paginationProps: { pageSize: 10 },
      currentPage: 1,
      pageSize: 10000,
    }
    
    this.goDetail = this.goDetail.bind(this);
  }

  componentWillMount() {
    this.columns = [
      {
        title: '类型',
        width: 100,
        textWrap: 'word-break',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: '题目',
        textWrap: 'word-break',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '题目内容',
        textWrap: 'word-break',
        dataIndex: 'content',
        key: 'content',
        children: [
          {
            title: '问题',
            dataIndex: 'question',
            key: 'question',
            width: 400,
          },
          {
            title: '答案选项',
            dataIndex: 'answerOptions',
            key: 'answerOptions',
            width: 400,
          },
        ]
      },
    ];
    this.getTestList();
  }

  goDetail(id) {
    this.props.history.push(`/userDetail/${id}`);
  }

  getTestList() {
    Service.getTestList().then((result) => {
      console.log('result', result);
      let data = result.data;
      let xlcsList = [];
      data.forEach((item) => {
        if(item.type !== '3'){
          item.content.forEach(e => {
            let answers = '';
            e.answerOptions.forEach(element => {
              answers = `${answers} ${element.optionIndex}、${element.optionContent}；`
            });
            xlcsList.push({
              type: item.type,
              name: item.name,
              question: e.question,
              answerOptions: answers,
            })
          });
        }
      });
      this.setState({ xlcsList });
    });
  }

  /** items per page */
  handlePageSizeChange = (value) => {
    this.setState({ paginationProps: { pageSize: value } })
  }

  // onSearch = (value) => {
  //   console.log('value',value)
  //   this.getUserList({ nickName: value});
  // }

  render() {
    const {
      xlcsList,
    } = this.state;
    const paginationProps = {
      pageSize:10,
    }
    return <div>
      <div className="sub-title">心理测试列表</div>
      <div className="list-table">
        <Table pagination={this.state.paginationProps}
          columns={this.columns}
          rowKey={record => record._id}
          dataSource={this.state.xlcsList}/>
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

export default withRouter(XlcsList);




