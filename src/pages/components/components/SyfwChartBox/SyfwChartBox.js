
import React, {
  Component,
  PropTypes,
} from 'react';

import { Table, Pagination } from 'antd';
import echarts from '../../../public/SyDataVis/echarts';


import './SyfwChartBox.css';
import 'antd/dist/antd.css';

import Service from '../../../../Http/service';
import icon_close from '../../../public/images/icon-close.png';

class SyfwTable extends Component{
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      limit: 10,
      total: 0,
      jcwmc: [],
      jdmc: [],
      dataSource: [],
      jdmcList: [],  // 居委
      jcwmcList: [], // 街道
      columns: [],
      dataAlready: false,
    };
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.showTotal = this.showTotal.bind(this);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
  }
      
  // mount
  componentDidMount() {
    this.getSyfwJcwmc();
    this.getSyfwList();
  }

  getSyfwList() {
    const {
      currentPage,
      limit,
      jcwmc,
      jdmc,
    } = this.state;
    const params = {
      currentPage,
      limit,
      jcwmc,
      jdmc,
    }
    console.log('params -->',params);
    // let a =[];
    // let b =[];
    // for(let f in a){
    //   b.push({'tt': f});
    // }
    // console.log('b -->',b);

    Service.getSyfwList(params).then((data) => {
      this.setState({
        dataAlready: true,
        dataSource: data.data || [],
        total: data.total,
      })
    });
  }

  /** 获取实有房屋居委数据 */
  getSyfwJcwmc() {
    Service.getSyfwJcwmc().then((data) => {
      const jcwmcList = [];
      if (data && data.length > 0) {
        data.forEach(val => {
          jcwmcList.push({
            text: val,
            value: val,
          });
        });
      };
      this.getSyfwJdmc(jcwmcList);
    });
  }

  /** 获取实有房屋街道数据 */
  getSyfwJdmc(jcwmcList) {
    Service.getSyfwJdmc().then((data) => {
      const jdmcList = [];
      if (data && data.length > 0) {
        data.forEach(val => {
          jdmcList.push({
            text: val,
            value: val,
          });
        });
      };
      const columns = [
        // {
        //   title: 'Id',
        //   dataIndex: 'id',
        //   key: 'id',
        // },
        {
          title: '街道名称',
          dataIndex: 'jdmc',
          key: 'jdmc',
          filters: jdmcList,
          // onFilter: (value, record) => record.jdmc.indexOf(value) === 0,
        },
        {
          title: '居委名称',
          dataIndex: 'jcwmc',
          key: 'jcwmc',
          filters: jcwmcList,
          // onFilter: (value, record) => record.jcwmc.indexOf(value) === 0,
        },
        {
          title: '道路',
          dataIndex: 'jxlmc',
          key: 'jxlmc'
        },
        {
          title: '房屋号',
          dataIndex: 'sh',
          key: 'sh'
        },
        {
          title: '门牌号',
          dataIndex: 'mlph',
          key: 'mlph',
        },
        {
          title: '建筑房屋类型',
          dataIndex: 'jzfwlx',
          key: 'jzfwlx',
        }
      ];

      this.setState({
        jcwmcList,
        jdmcList,
        columns,
      });
    });
  }

  onFilterChange(pagination, filters, sorter) {
    // console.log("filters -->",filters);
    let jcwmc = [],
    jdmc = [];
    if(filters.jdmc){
      jdmc = filters.jdmc;
    }

    if(filters.jcwmc){
      jcwmc = filters.jcwmc;
    }

    const filterParams = {
      currentPage: 1,
      limit: this.state.limit,
      jcwmc: jcwmc,
      jdmc: jdmc,
    }
    // console.log('filterParams -->',filterParams);

    Service.getSyfwList(filterParams).then((data) => {
      this.setState({
        // dataAlready: true,
        dataSource: data.data || [],
        total: data.total,
        jcwmc: jcwmc,
        jdmc: jdmc,
      })
    });
  }

  onChange(pagination, filters, sorter) {
    this.setState({
      currentPage: pagination,
      limit: filters,
    }, () => {
      this.getSyfwList();
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
      this.getSyfwList();
    });
  }

  render() {
    if (!this.state.dataAlready) { return false};
    const {
      dataSource,
      columns,
      total,
    } = this.state;

    return (
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



/* ------------   syfw  charts------------- */
class SyfwDiagram extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // active_tab: 0,
    };

    this.syfwChartOneSetOption = this.syfwChartOneSetOption.bind(this);
    this.syfwChartOneInitChart = this.syfwChartOneInitChart.bind(this);  
    // this.syfwChartTwoSetOption = this.syfwChartTwoSetOption.bind(this);
    // this.syfwChartTwoInitChart = this.syfwChartTwoInitChart.bind(this); 
    this.syfwChartThreeSetOption = this.syfwChartThreeSetOption.bind(this);
    this.syfwChartThreeInitChart = this.syfwChartThreeInitChart.bind(this); 
    // this.syfwChartFourSetOption = this.syfwChartFourSetOption.bind(this);
    // this.syfwChartFourInitChart = this.syfwChartFourInitChart.bind(this);      


  }

  //----------------------------------- initialize four chart ---------------------------------
  syfwChartOneInitChart(data) {
    // const data=this.props.data;
    console.log('anc-->',data)
    let name=[];
    let value=[];

    for(let item of data){
      name.push(item.name)
      value.push(item.value)
    }
    // let myChart = echarts.init(this.refs.barChart)
    let syfwChartOne = echarts.init(document.getElementById('syfwChartOne'));
    let syfwChartOneOptions = this.syfwChartOneSetOption(name,data)
    syfwChartOne.setOption(syfwChartOneOptions)
  }  
  syfwChartTwoInitChart(data) {
    let name=[];
    let value=[];
    let syfwChartTwo = echarts.init(document.getElementById('syfwChartTwo'));
    let syfwChartTwoOptions = this.syfwChartTwoSetOption(name,data)
    syfwChartTwo.setOption(syfwChartTwoOptions)
  }    
  
  syfwChartThreeInitChart(data) {
    let name=[];
    let value=[];
    let syfwChartThree = echarts.init(document.getElementById('syfwChartThree'));
    let syfwChartThreeOptions = this.syfwChartThreeSetOption(name,data)
    syfwChartThree.setOption(syfwChartThreeOptions)
  }    

  syfwChartFourInitChart() {
    // const data=this.props.data;
    let data=[ 
      {value:335, name:'10'},
      {value:310, name:'20'},
      {value:274, name:'30'},
      {value:235, name:'40'},
      {value:180, name:'50'}
    ];
    let name=[];
    let value=[];
    let syfwChartFour = echarts.init(document.getElementById('syfwChartFour'));
    let syfwChartFourOptions = this.syfwChartFourSetOption(name,data)
    syfwChartFour.setOption(syfwChartFourOptions)
  }    


  //--------------------    set option    -------------------------
  syfwChartOneSetOption(name,value) {
    //
    return {
      title : {
        text: '房屋所属街道',
        textStyle: {
          color: "#fff"
        },
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      // legend: {
      //   x : 'center',
      //   y : 'bottom',
      //   textStyle: {
      //     color: "#fff"
      //   },
      //   data:['香港路','广东路','中山路','浙江路','福州路']
      // },
      toolbox: {
        show : true,
        feature : {
          mark : {show: true},
          dataView : {show: true, readOnly: false},
          magicType : {
            show: true,
            type: ['pie', 'funnel']
          },
          restore : {show: true},
          saveAsImage : {show: true}
        }
      },
      calculable : true,
      series : [
        {
          name:'街道',
          type:'pie',
          // radius : [20, 120],
          radius : '60%',
          center : ['50%', '50%'],
          roseType : 'radius',
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

  syfwChartTwoSetOption(name,value) {
    return {
      // backgroundColor: '#2c343c',
      title: {
        text: '房屋类型',
        left: 'center',
        textStyle: {
          color: "#fff"
        }
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        x : 'center',
        y : 'bottom',
        textStyle: {
          color: "#fff"
        },
        data:['公寓式住宅','小户型住宅','经济适用住房','高层住宅','商业大厦']
      },
      // toolbox: {
      // 	show : true,
      // 	feature : {
      // 		mark : {show: true},
      // 		dataView : {show: true, readOnly: false},
      // 		magicType : {
      // 			show: true,
      // 			type: ['pie', 'funnel']
      // 		},
      // 		restore : {show: true},
      // 		saveAsImage : {show: true}
      // 	}
      // },	
      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series : [
        {
          name:'房屋类型',
          type:'pie',
          radius : '76%',
          center: ['50%', '50%'],
          data: value.sort(function (a, b) { return a.value - b.value; }),
          roseType: 'radius',
          // label: {
          // 	normal: {
          // 		textStyle: {
          // 			color: 'rgba(255, 255, 255, 0.3)'
          // 		}
          // 	}
          // },
          // labelLine: {
          // 	normal: {
          // 		lineStyle: {
          // 			color: 'rgba(255, 255, 255, 0.3)'
          // 		},
          // 		smooth: 0.2,
          // 		length: 10,
          // 		length2: 20
          // 	}
          // },
          // animationType: 'scale',
          // animationEasing: 'elasticOut',
          // animationDelay: function (idx) {
          // 	return Math.random() * 200;
          // },
          itemStyle: {
            normal: {
              // color: '#c23531',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }						
        }
      ]
    }
  }

  syfwChartThreeSetOption(name,value) {
    return {
      // backgroundColor: '#2c343c',
      title: {
        text: '房屋类型',
        left: 'center',
        // top: 20,
        textStyle: {
          color: "#fff"
        }
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      // legend: {
      //   x : 'center',
      //   y : 'bottom',
      //   textStyle: {
      //     color: "#fff"
      //   },
      //   data:['新昌','福瑞','平望','承兴','新桥']
      // },
      // toolbox: {
      // 	show : true,
      // 	feature : {
      // 		mark : {show: true},
      // 		dataView : {show: true, readOnly: false},
      // 		magicType : {
      // 			show: true,
      // 			type: ['pie', 'funnel']
      // 		},
      // 		restore : {show: true},
      // 		saveAsImage : {show: true}
      // 	}
      // },	
      visualMap: {
        show: false,
        min: 900,
        max: 3000,
        inRange: {
          colorLightness: [0.3, 0.6]
        }
      },
      series : [
        {
          name:'房屋类型',
          type:'pie',
          radius : '70%',
          center: ['50%', '50%'],
          data:value.sort(function (a, b) { return a.value - b.value; }),
          roseType: 'radius',
          // label: {
          // 	normal: {
          // 		textStyle: {
          // 			color: 'rgba(255, 255, 255, 0.3)'
          // 		}
          // 	}
          // },
          // labelLine: {
          // 	normal: {
          // 		lineStyle: {
          // 			color: 'rgba(255, 255, 255, 0.3)'
          // 		},
          // 		smooth: 0.2,
          // 		length: 10,
          // 		length2: 20
          // 	}
          // },
          // animationType: 'scale',
          // animationEasing: 'elasticOut',
          // animationDelay: function (idx) {
          // 	return Math.random() * 200;
          // },
          itemStyle: {
            normal: {
              // color: '#c23531',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }						
        }
      ]
    }
  }

  syfwChartFourSetOption(name,value) {
    return  {
      // backgroundColor: '#2c343c',
      title: {
        text: '房屋楼层数量',
        left: 'center',
        textStyle: {
          color: "#fff"
        }
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        x : 'center',
        y : 'bottom',
        textStyle: {
          color: "#fff"
        },        
        data:['10','20','30','40','50']
      },
      // toolbox: {
      // 	show : true,
      // 	feature : {
      // 		mark : {show: true},
      // 		dataView : {show: true, readOnly: false},
      // 		magicType : {
      // 			show: true,
      // 			type: ['pie', 'funnel']
      // 		},
      // 		restore : {show: true},
      // 		saveAsImage : {show: true}
      // 	}
      // },	
      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series : [
        {
          name:'',
          type:'pie',
          radius : '76%',
          center: ['50%', '50%'],
          data:value.sort(function (a, b) { return a.value - b.value; }),
          roseType: 'radius',
          // label: {
          // 	normal: {
          // 		textStyle: {
          // 			color: 'rgba(255, 255, 255, 0.3)'
          // 		}
          // 	}
          // },
          // labelLine: {
          // 	normal: {
          // 		lineStyle: {
          // 			color: 'rgba(255, 255, 255, 0.3)'
          // 		},
          // 		smooth: 0.2,
          // 		length: 10,
          // 		length2: 20
          // 	}
          // },
          // animationType: 'scale',
          // animationEasing: 'elasticOut',
          // animationDelay: function (idx) {
          // 	return Math.random() * 200;
          // },
          itemStyle: {
            normal: {
              // color: '#c23531',
              shadowBlur: 200,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }						
        }
      ]
    }
  }  


  // mount
  componentDidMount() {
    Service.getSyfwGroup().then((data) => {
      console.log('---->---->',data);
      this.syfwChartOneInitChart(data.jd);
      this.syfwChartThreeInitChart(data.jw);
    });
    // this.syfwChartTwoInitChart();
    // this.syfwChartFourInitChart();
  }

  render() {
    // const {
    //   active_tab
    // } = this.state;

    return (
      <div className="charts-data">
        <div id="syfwChartOne" className="syfwChartOneDiv chartBoxFrame"></div>
        {/* <div id="syfwChartTwo" className="syfwChartTwoDiv chartBoxFrame"></div> */}
        <div id="syfwChartThree" className="syfwChartThreeDiv chartBoxFrame"></div>
        {/* <div id="syfwChartFour" className="syfwChartFourDiv chartBoxFrame"></div>      */}
      </div>
    );
  }
}

class SyfwChartBox extends Component {
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
    return this.props.close ? this.props.close('SYFW_BOX') : null;
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
      <div className="SyfwChartBox">
        <div className="title">
          <div>实有房屋</div>
          <div className="close" onClick={() => this.close()}>
            <img src={icon_close} />
          </div>
        </div>
        <ul className="charts-title">
          <li className={active_tab === 0 ? "active" : ""} onClick={() => { this.changeTab(0) }}>统计数据</li>
          <li className={active_tab === 1 ? "paddingLeft_15 active" : "paddingLeft_15"} onClick={() => { this.changeTab(1) }}>列表</li>
        </ul>
        { active_tab === 0
          ? <SyfwDiagram/> 
          : <div>
              <SyfwTable/>
            </div>
        }
      </div>
    )
  }
}

SyfwChartBox.propTypes = {
  // close: PropTypes.string,
}

SyfwChartBox.defaultProps = {
}

export default SyfwChartBox;




