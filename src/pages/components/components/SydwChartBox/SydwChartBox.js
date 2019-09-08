
import React, {
  Component,
  PropTypes,
} from 'react';

import { Table, Pagination } from 'antd';
import { Select } from 'antd';
import echarts from '../../../public/SyDataVis/echarts';
// import SydwTable from '../SydwChartBox/SydwTable'

import './SydwChartBox.css';
import 'antd/dist/antd.css';

import Service from '../../../../Http/service';
import icon_close from '../../../public/images/icon-close.png';



const { Option } = Select;

class SydwTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      limit: 10,
      total: 0,
      pcsName: [],
      dwlb: [],
      dataSource: [],
      pcsList: [],
      columns: [],
      dataAlready: false,
    };
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onPageChange = this.onPageChange.bind(this);
    this.showTotal = this.showTotal.bind(this);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
  }

  // mount
  componentDidMount() {
    this.getSydwList();
    this.getSydwPcs();
  }

  handleChange(value) {
    console.log(`selected ${value}`);
  }



  getSydwList() {
    const {
      currentPage,
      limit,
      pcsName,
      dwlb
    } = this.state;
    const params = {
      currentPage,
      limit,
      pcsName,
      dwlb
    }
    // console.log("state -->",this.state);
    console.log("params -->",params);
    Service.getSydwList(params).then((data) => {
      // console.log(data.data);
      this.setState({
        dataAlready: true,
        dataSource: data.data || [],
        total: data.total || 0,
      });
    });
  }

  /** 派出所 */
  getSydwPcs() {
    Service.getSydwPcs().then((data) => {
      const pcsList = [];
      if (data && data.length > 0) {
        data.forEach(val => {
          pcsList.push({
            text: val,
            value: val,
          });
        });
      };
      let columns = [
        // {
        //   title: 'Id',
        //   dataIndex: 'id',
        //   key: 'id',
        // },
        {
          title: '派出所名称',
          dataIndex: 'pcsName',
          key: 'pcsName',
          filters: pcsList,
          // onFilter: (value, record) => record.pcsName.indexOf(value) === 0,
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
          filters: [
            {
              text: '事业单位',
              value: '事业单位',
            },
            {
              text: '企业单位',
              value: '企业单位',
            },
            {
              text: '机关团体',
              value: '机关团体',
            },
            {
              text: '其他',
              value: '其他',
            },
          ],
          // onFilter: (value, record) => record.dwjc.indexOf(value) === 0,
        },
        {
          title: '统一信用代码',
          dataIndex: 'xydm',
          key: 'xydm',
        },
        {
          title: '详细地址',
          dataIndex: 'xxdz',
          key: 'xxdz',
        }

      ];
      this.setState({
        pcsList,
        columns,
      });
    });
  }

  onFilterChange(pagination, filters, sorter) {
    console.log("filters -->",filters);
    // pcsName: [],
    // dwlb: [],
    let pcsName = [],
    dwlb = [];
    if(filters.pcsName){
      pcsName = filters.pcsName;
    }

    if(filters.dwlb){
      dwlb = filters.dwlb;
    }

    const filterParams = {
      currentPage: 1,
      limit: this.state.limit,
      pcsName: pcsName,
      dwlb: dwlb,
    }
    console.log('filterParams -->',filterParams);

    Service.getSydwList(filterParams).then((data) => {
      console.log('filter res data -->',data);
      this.setState({
        // dataAlready: true,
        dataSource: data.data || [],
        total: data.total,
        pcsName: pcsName,
        dwlb: dwlb
      })
    });
  }

  onPageChange(pagination, filters, sorter) {
    console.log("onChange pagination -->",pagination);
    console.log("onChange filters -->",filters);
    console.log("onChange sorter -->",sorter);
    this.setState({
      currentPage: pagination,
      limit: filters,
    }, () => {
      this.getSydwList();
    });

    
  }

  showTotal(total) {
    return `共${total}条`
  }

  onShowSizeChange(current, pageSize) {
    console.log("onShowSizeChange -->",current,pageSize)
    this.setState({
      currentPage: current,
      limit: pageSize,
    }, () => {
      this.getSydwList();
    });
  }

  render() {
    if (!this.state.dataAlready) { return false };
    const {
      dataSource,
      columns,
      total,
    } = this.state;
    return (
      <div>
        <div className="tablePage">
          <div className="table-result-box">
            <Table
              dataSource={dataSource}
              rowKey={record => record._id}
              columns={columns}
              onChange = {this.onFilterChange}
              size="middle"
              pagination={false}
            />
            <div className="lz-pagination">
              <Pagination showQuickJumper
                // showSizeChanger
                defaultCurrent={1}
                total={total}
                onChange={this.onPageChange}
                showTotal={this.showTotal}
                onShowSizeChange={this.onShowSizeChange}
              />
            </div>
          </div>
        </div>            
      </div>



    )
  }
}


class SydwDiagram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // active_tab: 0,
    };
    this.sydwChartOneSetOption = this.sydwChartOneSetOption.bind(this);
    this.sydwChartOneInitChart = this.sydwChartOneInitChart.bind(this);
    this.sydwChartTwoSetOption = this.sydwChartTwoSetOption.bind(this);
    this.sydwChartTwoInitChart = this.sydwChartTwoInitChart.bind(this);
    // this.sydwChartThreeSetOption = this.sydwChartThreeSetOption.bind(this);
    // this.sydwChartThreeInitChart = this.sydwChartThreeInitChart.bind(this);
    // this.sydwChartFourSetOption = this.sydwChartFourSetOption.bind(this);
    // this.sydwChartFourInitChart = this.sydwChartFourInitChart.bind(this);
  }


  sydwChartOneInitChart(data) {
    // const data=this.props.data;
    let name = [];
    let value = [];

    for (let item of data) {
      name.push(item.name)
      value.push(item.value)
    }
    // let myChart = echarts.init(this.refs.barChart)
    let sydwChartOne = echarts.init(document.getElementById('sydwChartOne'));
    let sydwChartOneOptions = this.sydwChartOneSetOption(name, data)
    sydwChartOne.setOption(sydwChartOneOptions)
  }
  sydwChartTwoInitChart(data) {
    let name = [];
    let value = [];
    let sydwChartTwo = echarts.init(document.getElementById('sydwChartTwo'));
    let sydwChartTwoOptions = this.sydwChartTwoSetOption(name, data)
    sydwChartTwo.setOption(sydwChartTwoOptions)
  }

  sydwChartThreeInitChart() {
    // const data=this.props.data;
    let data = [
      { value: 89, name: '远洋商业大厦' },
      { value: 59, name: '东新大厦' },
      { value: 169, name: '恒积大厦' },
      { value: 45, name: '汇金大厦' },
      { value: 24, name: '中汇大厦' }
    ];
    let name = [];
    let value = [];
    let sydwChartThree = echarts.init(document.getElementById('sydwChartThree'));
    let sydwChartThreeOptions = this.sydwChartThreeSetOption(name, data)
    sydwChartThree.setOption(sydwChartThreeOptions)
  }
  sydwChartFourInitChart() {
    // const data=this.props.data;
    let data = [
      { value: 89, name: '香港路' },
      { value: 59, name: '广东路' },
      { value: 169, name: '中山路' },
      { value: 45, name: '浙江路' },
      { value: 24, name: '福州路' }
    ];
    let name = [];
    let value = [];
    // for(let item of data){
    //   name.push(item.name)
    //   value.push(item.value)
    // }
    // let myChart = echarts.init(this.refs.barChart)
    let sydwChartFour = echarts.init(document.getElementById('sydwChartFour'));
    let sydwChartFourOptions = this.sydwChartFourSetOption(name, data)
    sydwChartFour.setOption(sydwChartFourOptions)
  }


  //--------------------    set option    -------------------------
  sydwChartOneSetOption(name, value) {
    //
    return {
      title: {
        text: '单位所属派出所',
        x: 'center',
        textStyle: {
          color: "#fff"
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      // legend: {
      //   orient: 'vertical',
      //   left: 'left',
      //   textStyle: {
      //     color: "#fff"
      //   },
      //   data: []
      // },
      series: [
        {
          name: '派出所',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: value,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }

  sydwChartTwoSetOption(name, value) {
    return {
      title: {
        text: 'SydwDiagram',
        textStyle: {
          color: "#fff"
        },
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      // legend: {
      //   orient: 'vertical',
      //   left: 'left',
      //   textStyle: {
      //     color: "#fff"
      //   },
      //   data: ['事业单位', '外企单位', '民营单位', '机关团体', '其他']
      // },
      series: [
        {
          name: '单位类型',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          data: value,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }

  sydwChartThreeSetOption(name, value) {
    return {
      title: {
        text: '单位所属建筑',
        x: 'center',
        textStyle: {
          color: "#fff"
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        textStyle: {
          color: "#fff"
        },
        data: ['远洋商业大厦', '东新大厦', '恒积大厦', '汇金大厦', '中汇大厦']
      },
      series: [
        {
          name: '派出所',
          type: 'pie',
          radius: '76%',
          center: ['50%', '50%'],
          data: value,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }

  sydwChartFourSetOption(name, value) {
    return {
      title: {
        text: '单位所属街道',
        x: 'center',
        textStyle: {
          color: "#fff"
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        textStyle: {
          color: "#fff"
        },
        data: ['香港路', '广东路', '中山路', '浙江路', '福州路']
      },
      series: [
        {
          name: '派出所',
          type: 'pie',
          radius: '76%',
          center: ['50%', '50%'],
          data: value,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }




  // mount
  componentDidMount() {
    Service.getSydwGroup().then((data) => {
      this.sydwChartOneInitChart(data.pcs);
      this.sydwChartTwoInitChart(data.type);
    });
    // this.sydwChartThreeInitChart();
    // this.sydwChartFourInitChart();
  }

  render() {
    return (
      <div className="charts-data">
        <div id="sydwChartOne" className="sydwChartOneDiv chartBoxFrame"></div>
        <div id="sydwChartTwo" className="sydwChartTwoDiv chartBoxFrame"></div>
        {/* <div id="sydwChartThree" className="sydwChartThreeDiv chartBoxFrame"></div> */}
        {/* <div id="sydwChartFour" className="sydwChartFourDiv chartBoxFrame"></div>  */}
      </div>
    );
  }

}









class SydwChartBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active_tab: 0,
    };

  }


  // mount
  componentDidMount() {

  }

  // componentDidUpdate() {
  // }


  close() {
    return this.props.close ? this.props.close('SYDW_BOX') : null;
  }

  changeTab(index) {
    this.setState({
      active_tab: index,
    });
  }

  render() {
    const {
      active_tab
    } = this.state;

    return (
      <div className="SydwChartBox">
        <div className="title">
          <div>实有单位</div>
          <div className="close" onClick={() => this.close()}>
            <img src={icon_close} />
          </div>
        </div>
        <ul className="charts-title">
          <li className={active_tab === 0 ? "active" : ""} onClick={() => { this.changeTab(0) }}>统计数据</li>
          <li className={active_tab === 1 ? "paddingLeft_15 active" : "paddingLeft_15"} onClick={() => { this.changeTab(1) }}>列表</li>
        </ul>
        {active_tab === 0
          ? <SydwDiagram />
          // <div className="charts-data">          
          //   <SydwDiagram  /> 

          // </div>
          : <SydwTable />
        }

      </div>
    )
  }
}

SydwChartBox.propTypes = {
  // close: PropTypes.string,
}

SydwChartBox.defaultProps = {
}

export default SydwChartBox;




