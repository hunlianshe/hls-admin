

import React, {
    Component,
} from 'react';

import './SearchPage.css';
import { Table, Pagination } from 'antd';

import icon_close from '../../../public/images/icon-close.png';
import Service from '../../../../Http/service';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      limit: 10,
      total: 0,
      activeTab: 0,
      dataSource: [],
      dataAlready: false,
    }
    this.columns = [
      // {
      //   title: 'id',
      //   dataIndex: 'id',
      //   key: 'id',
      // },
      {
        title: '姓名',
        dataIndex: 'xm',
        key: 'xm',
        width: 80,
      },
      {
        title: '性别',
        dataIndex: 'xbhz',
        key: 'xbhz',
        width: 65,
      },
      {
        title: '证件号码',
        dataIndex: 'zjhm',
        key: 'zjhm',
      },
      {
        title: '婚姻状况',
        dataIndex: 'hyzkhz',
        key: 'hyzkhz',
      },
      {
        title: '学历',
        dataIndex: 'whcdhz',
        key: 'whcdhz',
      },
      {
        title: '出生日期',
        dataIndex: 'csrq',
        key: 'csrq',
        // defaultSortOrder: 'descend',
        sorter: (a, b) => a.csrq - b.csrq,
      },
      {
        title: '居委名称',
        dataIndex: 'jcwmc',
        key: 'jcwmc',
      },
      {
        title: '户籍地行政区划',
        dataIndex: 'hjdxzqhhz',
        key: 'hjdxzqhhz',
      },      
      {
        title: '户籍地址',
        dataIndex: 'hjdz',
        key: 'hjdz',
      },
      {
        title: '居住地址',
        dataIndex: 'jzdz',
        key: 'jzdz',
      }
    ];
    
    this.onChange = this.onChange.bind(this);
    this.showTotal = this.showTotal.bind(this);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this);
    this.getSearchData();
  }

  /**
   * 获取搜索数据
   */
  getSearchData() {
    const {
      activeTab,
      currentPage,
      limit,
    } = this.state;
    const { keyword } = this.props;
    const params = {
      currentPage,
      limit,
      keyword,
    }
    switch (activeTab) {
      case 0: // 实有人口
        Service.getSyrkList(params).then((data) => {
          this.setState({
            dataAlready: true,
            dataSource: data.data,
            total: data.total,
          });
        });
        this.columns = [
          // {
          //   title: 'id',
          //   dataIndex: 'id',
          //   key: 'id',
          // },
          {
            title: '姓名',
            dataIndex: 'xm',
            key: 'xm',
            width: 50,
          },
          {
            title: '性别',
            dataIndex: 'xbhz',
            key: 'xbhz',
            width: 35,
          },
          {
            title: '证件号码',
            dataIndex: 'zjhm',
            key: 'zjhm',
          },
          {
            title: '婚姻状况',
            dataIndex: 'hyzkhz',
            key: 'hyzkhz',
          },
          {
            title: '学历',
            dataIndex: 'whcdhz',
            key: 'whcdhz',
          },
          {
            title: '出生日期',
            dataIndex: 'csrq',
            key: 'csrq',
            // defaultSortOrder: 'descend',
            sorter: (a, b) => a.csrq - b.csrq,
          },
          {
            title: '居委名称',
            dataIndex: 'jcwmc',
            key: 'jcwmc',
          },
          {
            title: '户籍地行政区划',
            dataIndex: 'hjdxzqhhz',
            key: 'hjdxzqhhz',
          },      
          {
            title: '户籍地址',
            dataIndex: 'hjdz',
            key: 'hjdz',
          },
          {
            title: '居住地址',
            dataIndex: 'jzdz',
            key: 'jzdz',
          }
        ];
        break;
      case 1: // 实有房屋
        Service.getSyfwList(params).then((data) => {
          this.setState({
            dataAlready: true,
            dataSource: data.data,
            total: data.total,
          });
        });
        this.columns = [
          {
            title: '街道名称',
            dataIndex: 'jdmc',
            key: 'jdmc',
          },
          {
            title: '居委名称',
            dataIndex: 'jcwmc',
            key: 'jcwmc',
          },
          {
            title: '道路',
            dataIndex: 'jxlmc',
            key: 'jxlmc'
          },
          {
            title: '门牌号',
            dataIndex: 'mlph',
            key: 'mlph',
          },
          {
            title: '室号',
            dataIndex: 'sh',
            key: 'sh',
          },
          {
            title: '建筑物房屋类型',
            dataIndex: 'jzfwlx',
            key: 'jzfwlx',
          },
        ];
        break;
      case 2: // 实有单位
        Service.getSydwList(params).then((data) => {
          this.setState({
            dataAlready: true,
            dataSource: data.data,
            total: data.total,
          });
        });
        this.columns = [
          {
            title: '派出所名称',
            dataIndex: 'pcsName',
            key: 'pcsName',
          },
          {
            title: '单位名称',
            dataIndex: 'dwName',
            key: 'dwName',
          },
          {
            title: '单位性质',
            dataIndex: 'dwlb',//代码未知
            key: 'dwlb',
          },
          {
            title: '统一信用代码',
            dataIndex: 'xydm',
            key: 'xydm',
          },
          {
            title: '组织机构代码',
            dataIndex: 'zzjgdm',
            key: 'zzjgdm',
          },
          {
            title: '工商营业执照代码',
            dataIndex: 'yyzzbh',
            key: 'yyzzbh',
          },
          {
            title: '详细地址',
            dataIndex: 'xxdz',
            key: 'xxdz',
          },
          {
            title: '法定代表人姓名',
            dataIndex: 'fddbrxm',
            key: 'fddbrxm',
          },
        ];
        break;
      default:
        break;
    }
  }

  /**
   * tab切换
   * @param {} tabIndex 
   */
  changTab(tabIndex) {
    this.setState({
      activeTab: tabIndex,
      currentPage: 1,
    }, () => {
      this.getSearchData();
    })
  }

  close() {
    return this.props.close ? this.props.close() : null;
  }

  onChange(pagination, filters, sorter) {
    this.setState({
      currentPage: pagination,
      limit: filters,
    }, () => {
      this.getSearchData();
    });
  }

  showTotal(total) {
    return `共${total}条`
  }

  onShowSizeChange(current, pageSize) {
    this.setState({
      currentPage: current,
      limit: pageSize,
    }, () => {
      this.getSearchData();
    });
  }

  render() {
    if (!this.state.dataAlready) { return false };
    const {
      activeTab,
      dataSource,
      total,
    } = this.state;
    const columns = this.columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
      }),
    }));
    return (
      <div className="SearchPage">
        {/* <div className="searchBox">
          <input />
          <div className="search-text">搜索</div>
        </div> */}
        <div className="search-flex">
          <div className="big-text">搜索页面</div>
          <div className="go-back" onClick={() => this.close()}>
            <img src={icon_close} />
          </div>
        </div>

        <div className="search-filter-box" >
          <svg viewBox="64 64 896 896" className="" data-icon="filter" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false">
            <path d="M349 838c0 17.7 14.2 32 31.8 32h262.4c17.6 0 31.8-14.3 31.8-32V642H349v196zm531.1-684H143.9c-24.5 0-39.8 26.7-27.5 48l221.3 376h348.8l221.3-376c12.1-21.3-3.2-48-27.7-48z">
            </path>
          </svg>
          <a className={this.state.activeTab === 0 ? "active" : null} onClick={() => { this.changTab(0) }}>实有人口</a>
          <a className={this.state.activeTab === 1 ? "active" : null} onClick={() => { this.changTab(1) }}>实有房屋</a>
          <a className={this.state.activeTab === 2 ? "active" : null} onClick={() => { this.changTab(2) }}>实有单位</a>  
        </div>

        <div className="search-result-box">
          {/* 实有人口 */}
          {activeTab === 0 
            ? <Table dataSource={dataSource}
              columns={columns}
              rowKey={record => record._id}
              pagination={false} />
            : null}
          {/* 实有房屋 */}
          {activeTab === 1
            ? <Table dataSource={dataSource}
              columns={this.columns}
              rowKey={record => record._id}
              pagination={false}/>
            : null}
          {/* 实有单位 */}
          {activeTab === 2
            ? <Table dataSource={dataSource}
              columns={this.columns}
              rowKey={record => record._id}
              pagination={false}/>
            : null}
          
          <div className="lz-pagination">
            <Pagination showQuickJumper
              showSizeChanger
              defaultCurrent={1}
              total={total}
              onChange={this.onChange}
              showTotal={this.showTotal}
              onShowSizeChange={this.onShowSizeChange}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default SearchPage;


