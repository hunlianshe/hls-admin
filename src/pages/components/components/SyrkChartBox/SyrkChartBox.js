
import React, {
  Component,
  PropTypes,
} from 'react';

import { Table, Pagination } from 'antd';
// import { Resizable } from 'react-resizable';
import echarts from '../../../public/SyDataVis/echarts';

import './SyrkChartBox.css';
import 'antd/dist/antd.css';

import Service from '../../../../Http/service';
import icon_close from '../../../public/images/icon-close.png';

const columns = [
  // {
  //   title: 'Id',
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
    filters: [
      {
        text: '男性',
        value: '男性',
      },
      {
        text: '女性',
        value: '女性',
      },
    ],
    // onFilter: (value, record) => record.xbhz.indexOf(value) === 0,
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
    filters: [
      {
        text: '已婚',
        value: '已婚',
      },
      {
        text: '未婚',
        value: '未婚',
      },
      {
        text: '丧偶',
        value: '丧偶',
      },
    ],
    // onFilter: (value, record) => record.hyzkhz.indexOf(value) === 0,
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
    // sorter: (a, b) => a.csrq - b.csrq,  
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
  
  
  // {
  //   title: '民族',
  //   dataIndex: 'mzhz',
  //   key: 'xxwhr',
  // },
  
  // {
  //   title: '户籍地行政区划',
  //   dataIndex: 'hjdxzqhhz',
  //   key: 'hjdxzqhhz',
  // }, 
  
  // {
  //   title: '居住地行政区划',
  //   dataIndex: 'jzdxzqhhz',
  //   key: 'jzdxzqhhz',
  // },
  
  // {
  //   title: '户籍地行政区划',
  //   dataIndex: 'hjdxzqhhz',
  //   key: 'hjdxzqhhz',
  // }, 
  // {
  //   title: '国籍',
  //   dataIndex: 'gjhz',
  //   key: 'gjhz',
  // }
];

// function onChange(pagination, filters, sorter) {
//   console.log('params', pagination, filters, sorter);
// }

class SyrkTable extends Component{
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      limit: 10,
      total: 0,
      xbhz: [],
      hyzkhz: [],
      dataSource: [],
      dataAlready: false,
    };
    
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.showTotal = this.showTotal.bind(this);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
  }

  // mount
  componentDidMount() {
    this.getSyrkList();
  }

  /** 实有人口数据列表 */
  getSyrkList() {
    const {
      currentPage,
      limit,
      xbhz,
      hyzkhz,
    } = this.state;
    const params = {
      currentPage,
      limit,
      xbhz,
      hyzkhz,
    }
    Service.getSyrkList(params).then((data) => {
      this.setState({
        dataAlready: true,
        dataSource: data.data || [],
        total: data.total || 0,
      })
    });
  }

  onFilterChange(pagination, filters, sorter) {
    console.log("filters -->",filters);
    let xbhz = [],
    hyzkhz = [];
    if(filters.xbhz){
      xbhz = filters.xbhz;
    }

    if(filters.hyzkhz){
      hyzkhz = filters.hyzkhz;
    }

    const filterParams = {
      currentPage: 1,
      limit: this.state.limit,
      xbhz: xbhz,
      hyzkhz: hyzkhz,
    }
    console.log('filterParams -->',filterParams);

    Service.getSyrkList(filterParams).then((data) => {
      this.setState({
        // dataAlready: true,
        dataSource: data.data || [],
        total: data.total,
        xbhz: xbhz,
        hyzkhz: hyzkhz,
      })
    });
  }

  onChange(pagination, filters, sorter) {
    this.setState({
      currentPage: pagination,
      limit: filters,
    }, () => {
      this.getSyrkList();
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
      this.getSyrkList();
    });
  }

  render() {
    if (!this.state.dataAlready) { return false };
    const {
      dataSource,
      total,
    } = this.state;

    const columns2 = columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
      }),
    }));

    console.log(columns2);
    return (
      <div className="tablePage">
        <div className="table-result-box">
          <Table 
            dataSource={dataSource}
            rowKey={record => record._id}
            columns={columns2}
            onChange = {this.onFilterChange}
            size="middle"
            pagination={false}
          />
          <div className="lz-pagination">
            <Pagination showQuickJumper
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


class SyrkDiagram extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // active_tab: 0,
    };
    this.syrkChartOneSetOption = this.syrkChartOneSetOption.bind(this);
    this.syrkChartOneInitChart = this.syrkChartOneInitChart.bind(this);
    // this.syrkChartThreeSetOption = this.syrkChartThreeSetOption.bind(this);
    // this.syrkChartThreeInitChart = this.syrkChartThreeInitChart.bind(this); 
    // this.syrkChartFourSetOption = this.syrkChartFourSetOption.bind(this);
    // this.syrkChartFourInitChart = this.syrkChartFourInitChart.bind(this);
    // this.syrkChartFiveSetOption = this.syrkChartFiveSetOption.bind(this);
    // this.syrkChartFiveInitChart = this.syrkChartFiveInitChart.bind(this);
    // this.syrkChartSixSetOption = this.syrkChartSixSetOption.bind(this);
    // this.syrkChartSixInitChart = this.syrkChartSixInitChart.bind(this);
    // this.syrkChartSevenSetOption = this.syrkChartSevenSetOption.bind(this);
    // this.syrkChartSevenInitChart = this.syrkChartSevenInitChart.bind(this);
    // this.syrkChartEightSetOption = this.syrkChartEightSetOption.bind(this);
    // this.syrkChartEightInitChart = this.syrkChartEightInitChart.bind(this);
    this.syrkChartNineSetOption = this.syrkChartNineSetOption.bind(this);
    this.syrkChartNineInitChart = this.syrkChartNineInitChart.bind(this);
  }  

  //----------------------------------- initialize four chart ---------------------------------
  syrkChartOneInitChart(data) {
    let name=[];
    let value=[];
    for(let item of data){
      name.push(item.name)
      value.push(item.value)
    }
    // let myChart = echarts.init(this.refs.barChart)
    let syrkChartOne = echarts.init(document.getElementById('syrkChartOne'));
    let syrkChartOneOptions = this.syrkChartOneSetOption(name,data)
    syrkChartOne.setOption(syrkChartOneOptions)
  }  
  syrkChartTwoInitChart() {
    // const data=this.props.data;
    let data=[
      {value:335, name:'房屋一'},
      {value:310, name:'房屋二'},
      {value:274, name:'房屋三'},
      {value:235, name:'房屋四'},
      {value:400, name:'房屋五'}
    ];
    let name=[];
    let value=[];
    // for(let item of data){
    //   name.push(item.name)
    //   value.push(item.value)
    // }
    // let myChart = echarts.init(this.refs.barChart)
    let syrkChartTwo = echarts.init(document.getElementById('syrkChartTwo'));
    let syrkChartTwoOptions = this.syrkChartTwoSetOption(name,data)
    syrkChartTwo.setOption(syrkChartTwoOptions)
  }    
  
  syrkChartThreeInitChart() {
    // const data=this.props.data;
    let data=[
      {value:335, name:'房屋一'},
      {value:310, name:'房屋二'},
      {value:274, name:'房屋三'},
      {value:235, name:'房屋四'},
      {value:400, name:'房屋五'}
    ];
    let name=[];
    let value=[];
    // for(let item of data){
    //   name.push(item.name)
    //   value.push(item.value)
    // }
    // let myChart = echarts.init(this.refs.barChart)
    let syrkChartThree = echarts.init(document.getElementById('syrkChartThree'));
    let syrkChartThreeOptions = this.syrkChartThreeSetOption(name,data)
    syrkChartThree.setOption(syrkChartThreeOptions)
  }    
  syrkChartFourInitChart() {
    // const data=this.props.data;
    let data=[
      {value:335, name:'美国'},
      {value:310, name:'非洲'},
      {value:234, name:'俄罗斯'},
      {value:135, name:'法国'},
      {value:1548, name:'英国'}
    ];
    let name=[];
    let value=[];
    // for(let item of data){
    //   name.push(item.name)
    //   value.push(item.value)
    // }
    // let myChart = echarts.init(this.refs.barChart)
    let syrkChartFour = echarts.init(document.getElementById('syrkChartFour'));
    let syrkChartFourOptions = this.syrkChartFourSetOption(name,data)
    syrkChartFour.setOption(syrkChartFourOptions)
  }    

  syrkChartFiveInitChart() {
    // const data=this.props.data;
    let data=[
      {value:335, name:'美国'},
      {value:310, name:'非洲'},
      {value:234, name:'俄罗斯'},
      {value:135, name:'法国'},
      {value:1548, name:'英国'}
    ];
    let name=[];
    let value=[];
    // for(let item of data){
    //   name.push(item.name)
    //   value.push(item.value)
    // }
    // let myChart = echarts.init(this.refs.barChart)
    let syrkChartFive = echarts.init(document.getElementById('syrkChartFive'));
    let syrkChartFiveOptions = this.syrkChartFiveSetOption(name,data)
    syrkChartFive.setOption(syrkChartFiveOptions)
  }   

  syrkChartSixInitChart() {
    // const data=this.props.data;
    let data=[
      {value:335, name:'美国'},
      {value:310, name:'非洲'},
      {value:234, name:'俄罗斯'},
      {value:135, name:'法国'},
      {value:1548, name:'英国'}
    ];
    let name=[];
    let value=[];
    // for(let item of data){
    //   name.push(item.name)
    //   value.push(item.value)
    // }
    // let myChart = echarts.init(this.refs.barChart)
    let syrkChartSix = echarts.init(document.getElementById('syrkChartSix'));
    let syrkChartSixOptions = this.syrkChartSixSetOption(name,data)
    syrkChartSix.setOption(syrkChartSixOptions)
  }  


  syrkChartSevenInitChart() {
    // const data=this.props.data;
    let data=[
      {value:335, name:'美国'},
      {value:310, name:'非洲'},
      {value:234, name:'俄罗斯'},
      {value:135, name:'法国'},
      {value:1548, name:'英国'}
    ];
    let name=[];
    let value=[];
    // for(let item of data){
    //   name.push(item.name)
    //   value.push(item.value)
    // }
    // let myChart = echarts.init(this.refs.barChart)
    let syrkChartSeven = echarts.init(document.getElementById('syrkChartSeven'));
    let syrkChartSevenOptions = this.syrkChartSevenSetOption(name,data)
    syrkChartSeven.setOption(syrkChartSevenOptions)
  }  

  syrkChartEightInitChart() {
    // const data=this.props.data;
    let data=[
      [[28604,77,17096869,'Australia',1990],[31163,77.4,27662440,'Canada',1990],[1516,68,1154605773,'China',1990],[13670,74.7,10582082,'Cuba',1990],[28599,75,4986705,'Finland',1990],[29476,77.1,56943299,'France',1990],[31476,75.4,78958237,'Germany',1990],[28666,78.1,254830,'Iceland',1990],[1777,57.7,870601776,'India',1990],[29550,79.1,122249285,'Japan',1990],[2076,67.9,20194354,'North Korea',1990],[12087,72,42972254,'South Korea',1990],[24021,75.4,3397534,'New Zealand',1990],[43296,76.8,4240375,'Norway',1990],[10088,70.8,38195258,'Poland',1990],[19349,69.6,147568552,'Russia',1990],[10670,67.3,53994605,'Turkey',1990],[26424,75.7,57110117,'United Kingdom',1990],[37062,75.4,252847810,'United States',1990]],
      [[44056,81.8,23968973,'Australia',2015],[43294,81.7,35939927,'Canada',2015],[13334,76.9,1376048943,'China',2015],[21291,78.5,11389562,'Cuba',2015],[38923,80.8,5503457,'Finland',2015],[37599,81.9,64395345,'France',2015],[44053,81.1,80688545,'Germany',2015],[42182,82.8,329425,'Iceland',2015],[5903,66.8,1311050527,'India',2015],[36162,83.5,126573481,'Japan',2015],[1390,71.4,25155317,'North Korea',2015],[34644,80.7,50293439,'South Korea',2015],[34186,80.6,4528526,'New Zealand',2015],[64304,81.6,5210967,'Norway',2015],[24787,77.3,38611794,'Poland',2015],[23038,73.13,143456918,'Russia',2015],[19360,76.5,78665830,'Turkey',2015],[38225,81.4,64715810,'United Kingdom',2015],[53354,79.1,321773631,'United States',2015]]
    ];
    let name=[];
    let value=[];
    // for(let item of data){
    //   name.push(item.name)
    //   value.push(item.value)
    // }
    // let myChart = echarts.init(this.refs.barChart)
    let syrkChartEight = echarts.init(document.getElementById('syrkChartEight'));
    let syrkChartEightOptions = this.syrkChartEightSetOption(name,data)
    syrkChartEight.setOption(syrkChartEightOptions)
  }


  syrkChartNineInitChart(data) {
    // const data=this.props.data;
    let lineX = data.map(e => e.name) 
    let value = data.map(e => e.value) 
    // console.log("syrkChartNineInitChart lineX-->",lineX);
    // console.log("syrkChartNineInitChart value-->",value)
    let syrkChartNine = echarts.init(document.getElementById('syrkChartNine'));
    let syrkChartNineOptions = this.syrkChartNineSetOption(lineX,value)
    syrkChartNine.setOption(syrkChartNineOptions)
  }  




  //--------------------    set option    -------------------------
  syrkChartOneSetOption(name,value) {
    return {
      title: {
        text: '不同居委会人口数量',
        left: 'center',
        // top: 20,
        textStyle: {
          color: "#fff"
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      // legend: {
      //   orient: 'vertical',
      //   x: 'left',
      //   data:name
      // },
      series: [
        {
          name:'人口数量',
          type:'pie',
          radius: ['40%', '90%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data:value
        }
      ]
    }
  }

  syrkChartTwoSetOption(name,value) {
    return {

    }
  }

  syrkChartThreeSetOption(name,value) {
    return {
      angleAxis: {
        type: 'category',
        // textStyle: {
        //   color: "#fff"
        // },
        axisLine: {
          lineStyle: {
          color: "#fff"
          }
        },	
        data: ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60', '60-70'],
        // z: 10
      },
      tooltip : {
        // trigger: 'axis',
        // axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        //     type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        // }
    },
      radiusAxis: {
      },
      polar: {
      },
      series: [{
        type: 'bar',
        textStyle: {
          color: '#fff'
         },

        data: [1, 2, 3, 4, 3, 5, 1],
        coordinateSystem: 'polar',
        name: '汉族',
        stack: 'a'
      }, {
        type: 'bar',
        data: [2, 4, 6, 1, 3, 2, 1],
        coordinateSystem: 'polar',
        name: '回族',
        stack: 'a'
      }, {
        type: 'bar',
        data: [1, 2, 3, 4, 1, 2, 5],
        coordinateSystem: 'polar',
        name: '藏族',
        stack: 'a'
      }],
      // legend: {
      //   show: true,
      //   data: ['汉族', '回族', '藏族']
      // }
    };
  }

  syrkChartFourSetOption(name,value) {
    return  {
      title: {
        text: '不同街道人口数量',
        left: 'center',
        // top: 20,
        textStyle: {
          color: "#fff"
        }
      },						
    
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      // legend: {
      //   orient: 'vertical',
      //   x: 'left',
      //   data:['美国','非洲','俄罗斯','法国','英国']
      // },
      series: [
        {
          name:'不同街道人口数量',
          type:'pie',
          radius: ['50%', '76%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data:value
        }
      ]
    }
  }  

  syrkChartFiveSetOption(name,value) {
    return  {
      tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
      },
      // legend: {
      //   textStyle: {
      //     color: "#fff"
      //   } ,
      //     data: ['小学', '初中','高中','本科','硕士']
      // },
      grid: {
          left: '2%',
          right: '3%',
          top: '3%' ,
          bottom: '2%',
          containLabel: true
      },
      xAxis:  {
          type: 'value',
          axisLine: {
            lineStyle: {
            color: "#fff"
            }
          },		
      },
      yAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
            color: "#fff"
            }
          },		
          data: ['浙江','江西','福建','山东','江苏','安徽','四川']
      },
      series: [
        {
          name: '小学',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [320, 302, 301, 334, 390, 330, 320]
        },
        {
          name: '初中',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: '高中',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: '本科',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [150, 212, 201, 154, 190, 330, 410]
        },
        {
          name: '硕士',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          data: [820, 832, 901, 934, 1290, 1330, 1320]
        }
      ]
    }
  }  

  syrkChartSixSetOption(name,value) {
    return  {
      title: {
        // text: '基础雷达图'
      },
      tooltip: {},
      // legend: {
      //   data: ['回族', '藏族']
      // },
      radar: {
        // shape: 'circle',
        name: {
          textStyle: {
            color: '#fff',
            backgroundColor: '#999',
            borderRadius: 3,
            padding: [3, 5]
           }
        },
        indicator: [
           { name: '0-20岁', max: 6500},
           { name: '20-30岁', max: 16000},
           { name: '30-40岁', max: 30000},
           { name: '40-50岁', max: 38000},
           { name: '50-60岁', max: 52000},
           { name: '70-100岁', max: 25000}
        ]
      },
      series: [{
        name: '回族 vs 藏族（Budget vs spending）',
        type: 'radar',
        // areaStyle: {normal: {}},
        data : [
          {
            value : [4300, 10000, 28000, 35000, 50000, 19000],
            name : '回族'
          },
           {
            value : [5000, 14000, 28000, 31000, 42000, 21000],
            name : '藏族'
          }
        ]
      }]
    }
  }  


  syrkChartSevenSetOption(name,value) {
    return  {
      title: {
        text: '来沪人员统计数量',
        left: 'center',
        // top: 20,
        textStyle: {
          color: "#fff"
        }
      },						
    
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      // legend: {
      //   orient: 'vertical',
      //   x: 'left',
      //   data:['美国','非洲','俄罗斯','法国','英国']
      // },
      series: [
        {
          name:'来沪人员统计数量',
          type:'pie',
          radius: ['50%', '76%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data:value
        }
      ]
    }
  }  

  syrkChartEightSetOption(name,data) {
    return  {
      // backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [{
      //   offset: 0,
      //   color: '#f7f8fa'
      // }, {
      //   offset: 1,
      //   color: '#cdd0d5'
      // }]),
      title: {
        text: '人口年龄与居住地对比',
        textStyle: {
          color: "#fff"
        } 

      },
      // legend: {
      //   right: 10,
      //   data: ['人口年龄', '学历']
      // },
      xAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
          color: "#fff"
          }
        },	
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'value',
        axisLine: {
          lineStyle: {
          color: "#fff"
          }
        },	
        boundaryGap: [0, 0.01]
      },
      series: [{
        name: '人口年龄',
        data: data[0],
        type: 'scatter',
        symbolSize: function (data) {
          return Math.sqrt(data[2]) / 5e2;
        },
        label: {
          emphasis: {
            show: true,
            formatter: function (param) {
              return param.data[3];
            },
            position: 'top'
          }
        },
        itemStyle: {
          normal: {
            shadowBlur: 10,
            shadowColor: 'rgba(120, 36, 50, 0.5)',
            shadowOffsetY: 5,
            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
              offset: 0,
              color: 'rgb(251, 118, 123)'
            }, {
              offset: 1,
              color: 'rgb(204, 46, 72)'
            }])
          }
        }
      }, {
        name: '学历',
        data: data[1],
        type: 'scatter',
        symbolSize: function (data) {
          return Math.sqrt(data[2]) / 5e2;
        },
        label: {
          emphasis: {
            show: true,
            formatter: function (param) {
              return param.data[3];
            },
            position: 'top'
          }
        },
        itemStyle: {
          normal: {
            shadowBlur: 10,
            shadowColor: 'rgba(25, 100, 150, 0.5)',
            shadowOffsetY: 5,
            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
              offset: 0,
              color: 'rgb(129, 227, 238)'
            }, {
              offset: 1,
              color: 'rgb(25, 183, 207)'
            }])
          }
        }
      }]
    }
  }

  syrkChartNineSetOption(lineX,value) {
    return  {
      title: {
        text: '不同街道人口数量',
        left: 'center',
        // top: 20,
        textStyle: {
          color: '#ccc'							
        }
      },
      tooltip : {
        trigger: 'axis'
      },
      toolbox: {
        show : true,
        // feature : {
        //   mark : {show: true},
        //   dataView : {show: true, readOnly: false},
        //   magicType: {show: true, type: ['line', 'bar']},
        //   restore : {show: true},
        //   saveAsImage : {show: true}
        // }
      },
      calculable : true,
      xAxis : [
        {
          type : 'category',
          axisLine: {
            lineStyle: {
            color: "#fff"
            }
          },									
          data : lineX
        }
      ],
      yAxis : [
        {
          type : 'value',
          name : '数量',
          left: '15%',
          axisLine: {
            lineStyle: {
              color: "#fff",
            }
          },																		               
          axisLabel : {
            formatter: '{value} '
          }
        }
      ],
      series : [
        {
          name: "",
          type:'bar',
          // barGap:0,
          itemStyle: {
            normal: {
              barBorderRadius: 5,
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  {offset: 0, color: '#956FD4'},
                  {offset: 1, color: '#3EACE5'}
                ]
              )
            }
          },		
          data:value							
          // data:monthData
        }
        
      ]
    }



  }

  



  // mount
  componentDidMount() {
    Service.getSyrkGroup().then((data) => {
      console.log('timm-data',data)
      this.syrkChartOneInitChart(data.jw);
      this.syrkChartNineInitChart(data.dl);
    });
    // this.syrkChartOneInitChart();
    // // this.syrkChartTwoInitChart();
    // this.syrkChartThreeInitChart();
    // this.syrkChartFourInitChart();
    // this.syrkChartFiveInitChart();
    // this.syrkChartSixInitChart();
    // this.syrkChartSevenInitChart();
    // this.syrkChartEightInitChart();
    // this.syrkChartNineInitChart();
  }

  render() {

    return (
      <div className="charts-data">
        <div id="syrkChartOne" className="syrkChartOneDiv chartBoxFrame"></div>
        <div id="syrkChartNine" className="syrkChartNineDiv chartBoxFrame"></div>
      </div>
    )
  }


}




class SyrkChartBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active_tab: 0,
    };

  }

  // mount
  componentDidMount() {
  }

  close() {
    return this.props.close ? this.props.close('SYRK_BOX') : null;
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
      <div className="SyrkChartBox">
        <div className="title">
          <div>实有人口</div>
          <div className="close" onClick={() => this.close()}>
            <img src={icon_close} />
          </div>
        </div>
        <ul className="charts-title">
          <li className={active_tab === 0 ? "active" : ""} onClick={() => { this.changeTab(0) }}>统计数据</li>
          <li className={active_tab === 1 ? "paddingLeft_15 active" : "paddingLeft_15"} onClick={() => { this.changeTab(1) }}>列表</li>
        </ul>
        {active_tab === 0
          ? <SyrkDiagram /> 
          : <div className="charts-data">
              <SyrkTable /> 
            </div>
        }
       
      </div>
    )
  }
}

SyrkChartBox.propTypes = {
  // close: PropTypes.string,
}

SyrkChartBox.defaultProps = {
}

export default SyrkChartBox;




