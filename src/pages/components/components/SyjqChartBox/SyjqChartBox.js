
import React, {
  Component,
  PropTypes,
} from 'react';
import { Table } from 'antd';

import { Select } from 'antd';

import echarts, { number } from '../../../public/SyDataVis/echarts';

import './SyjqChartBox.css';
import 'antd/dist/antd.css';

import Service from '../../../../Http/service';
import icon_close from '../../../public/images/icon-close.png';


const { Option } = Select;


const currentDate = new Date();


class SyjqTable extends Component{
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 1,
      limit: 500,
      jcwmc: '',
      jdmc: '',
      dataAlready: false,
      dataSource:[],
      columns:[]
    };

  }
      
  // mount
  componentDidMount() {
    this.getSjdDayData();
  }    

  getSjdDayData(){
    Service.getSyjqApiSjdDay().then((data) => {
      const columns = [
        // {
        //   title: 'id',
        //   dataIndex: 'id',
        //   key: 'id',
        // },
        {
          title: '报警时间',
          dataIndex: 'scslsj',
          key: 'scslsj',
        },
        {
          title: '报警类型',
          dataIndex: 'jqlbmc',
          key: 'jqlbmc'
        },
        {
          title: '报警人',
          dataIndex: 'bjr',
          key: 'bjr',
        },
        {
          title: '派出所',
          dataIndex: 'ssxqmc',
          key: 'ssxqmc',
        },  
        // {
        //   title: '报警详情',
        //   dataIndex: 'sjxq',
        //   key: 'sjxq',
        // },
      
      ];
      
      // const jdmcList = [];
      // //解析数据
      // if (data && data.length > 0) {
      //   data.forEach(val => {
      //     jdmcList.push({
      //       text: val,
      //       value: val,
      //     });
      //   });
      // };


      let sjdDayData = []
      // console.log("test table",data.data[0].scslsj);

      if (data.data.length > 0) {
        for(let i in data.data){
          // console.log(data.data[i].scslsj,"  ",i);
          sjdDayData.push({
            key: i,
            id: i,
            scslsj: data.data[i].scslsj,
            jqlbmc: data.data[i].jqlbmc,
            bjr: data.data[i].bjr,
            // lxdh
            ssxqmc: data.data[i].ssxqmc,
            // sjxq: data.data[i].sjxq
          });
        }
      };
      // console.log("get table",sjdDayData);
      this.setState({
        dataAlready: true,
        dataSource: sjdDayData || [],
        columns: columns
      })
    });
  }  


  render() {
    if (!this.state.dataAlready) { return false};
    const {
      dataSource,
      columns,
    } = this.state;
    // console.log(dataSource);
    return (
      <div className="tablePage">
        <div className="table-result-box">
          <Table 
            dataSource={dataSource} 
            columns={columns}
            size="small"
            // pagination={{ pageSize: 50 }} scroll={{ y: 240 }}
          />
        </div>     
      </div>
 
    )
  }
}




//  show syjq Diagram
class SyjqDiagram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countSjdYear: [],
      countSjdMonth: [],
      SjdDay: [],
      SjdMonth: [],
      SjdYear: [],
      newSjd: [],
      initDate: initSelectDate,
      sjdTtotalNum: 0,
      realDate: ''
    };

    this.syjqChartOneSetOption = this.syjqChartOneSetOption.bind(this);
    this.syjqChartOneInitChart = this.syjqChartOneInitChart.bind(this);
    // this.syjqChartTwoSetOption = this.syjqChartTwoSetOption.bind(this);
    // this.syjqChartTwoInitChart = this.syjqChartTwoInitChart.bind(this); 
    // this.syjqChartThreeSetOption = this.syjqChartThreeSetOption.bind(this);
    // this.syjqChartThreeInitChart = this.syjqChartThreeInitChart.bind(this); 
    // this.syjqChartFourSetOption = this.syjqChartFourSetOption.bind(this);
    // this.syjqChartFourInitChart = this.syjqChartFourInitChart.bind(this);
    this.syjqChartFiveSetOption = this.syjqChartFiveSetOption.bind(this);
    this.syjqChartFiveInitChart = this.syjqChartFiveInitChart.bind(this);
    // this.syjqChartSixSetOption = this.syjqChartSixSetOption.bind(this);
    // this.syjqChartSixInitChart = this.syjqChartSixInitChart.bind(this);    
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  // mount
  componentDidMount() {
    this.getCountSjdYearData();
    this.getCountSjdMonthData();
    this.getSjdDayData();
    this.getSjdMonthData();
    this.getSjdYearData();
    // this.getNewSjdData();
  }


  componentDidUpdate(){
    this.syjqChartOneInitChart(this.state.initDate);
    // this.syjqChartTwoInitChart();
    // this.syjqChartThreeInitChart();
    this.syjqChartFiveInitChart();
  }



  //----------------------------------- get jq api data ---------------------------------  

  getCountSjdYearData(){
    Service.getSyjqApiCountSjdYear().then((data) => {
      // console.log("raw data--->",data);
      this.setState({
        countSjdYear: data,
      })
      // console.log(this.state.countSjdYear);
    });
    
  }

  getCountSjdMonthData(){
    //pass time stamp param
    let currentDateParam = '';
    if(currentDate.getMonth() < 10){
      currentDateParam = String(currentDate.getFullYear()) + '-0' +  String(currentDate.getMonth() + 1) ;
    }else{
      currentDateParam = String(currentDate.getFullYear()) + '-' +  String(currentDate.getMonth() + 1 ) ;
    }

  
    this.setState({
      // sjdTtotalNum: totalNumRes,
      realDate: currentDateParam,
    });

    console.log("test date -->",currentDate);
    // console.log("realDate data--->",this.state.realDate);
    
    Service.getSyjqApiCountSjdMonth(currentDateParam).then((data) => {
      console.log("res data--->",data);
      var totalNumRes = this.countSyjqMonthNum(data)[0];
      
      this.setState({
        sjdTtotalNum: totalNumRes,
      });
      this.setState({
        countSjdMonth: this.countSyjqMonthNum(data).slice(1,) || [],
      });
    });
    // console.log("countSjdMonth data--->",this.state.countSjdMonth);
    
  }

  getSjdDayData(){
    Service.getSyjqApiSjdDay().then((data) => {
      this.setState({
        SjdDay: data || [],
      })
    });
  }  

  getSjdMonthData(){
    Service.getSyjqApiSjdMonth().then((data) => {
      this.setState({
        SjdMonth: data || [],
      })
    });
  }  

  getSjdYearData(){
    Service.getSyjqApiSjdYear().then((data) => {
      this.setState({
        SjdYear: data || [],
      })
    });
  }  

  getNewSjdData(){
    Service.getSyjqApiNewSjd().then((data) => {
      this.setState({
        newSjd: data.data[0] || [],
      })
    });
  }  




  //----------------------------------- initialize the number div ---------------------------------
  syjqChartZeroInitChart() {
    // const data=this.props.data;
    const data=[
      {value:3491, name:'交通安全'},
      {value:2118, name:'警务求助'},
      {value:1234, name:'纠纷类'},
      {value:980, name:'侵犯人身权利'}
    ];

    let name=[];
    // let name = ['北京东路','中华路','济南路','合肥路','河南路']
    let value=[];

    for(let item of data){
      name.push(item.name)
      value.push(item.value)
    }


  }  



  //----------------------------------- initialize four chart ---------------------------------
  syjqChartOneInitChart(titileDate) {
    // const data=this.props.data;
    console.log('syjqChartOneInitChart -->',this.state.countSjdMonth);
    const data=[
      {value:this.state.countSjdMonth[0], name:'交通安全'},
      {value:this.state.countSjdMonth[1], name:'警务求助'},
      {value:this.state.countSjdMonth[2], name:'纠纷类'},
      {value:this.state.countSjdMonth[3], name:'侵犯人身权利'}
    ];
    let name=[],
        value=[];
    for(let item of data){
      name.push(item.name)
      value.push(item.value)
    }
    // let myChart = echarts.init(this.refs.barChart)
    let syjqChartOne = echarts.init(document.getElementById('syjqChartOne'));
    let syjqChartOneOptions = this.syjqChartOneSetOption(name,data,titileDate);
    syjqChartOne.setOption(syjqChartOneOptions);
  }  

  syjqChartTwoInitChart() {
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
    let syjqChartTwo = echarts.init(document.getElementById('syjqChartTwo'));
    let syjqChartTwoOptions = this.syjqChartTwoSetOption(name,data);
    syjqChartTwo.setOption(syjqChartTwoOptions)
  }    
  
  syjqChartThreeInitChart() {
    // const data=this.props.data;
    let data=[
      {value:335, name:'房屋一'},
      {value:310, name:'房屋二'},
      {value:274, name:'房屋三'},
      {value:235, name:'房屋四'},
      {value:400, name:'房屋五'}
    ];
    let myColor = ['#eb2100', '#eb3600', '#d0570e', '#d0a00e', '#34da62', '#00e9db', '#00c0e9', '#0096f3', '#33CCFF', '#33FFCC'];
    let name=[];
    let value=[];
    // for(let item of data){
    //   name.push(item.name)
    //   value.push(item.value)
    // }
    // let myChart = echarts.init(this.refs.barChart)
    let syjqChartThree = echarts.init(document.getElementById('syjqChartThree'));
    let syjqChartThreeOptions = this.syjqChartThreeSetOption(myColor,data)
    syjqChartThree.setOption(syjqChartThreeOptions)
  }    
  syjqChartFourInitChart() {
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
    let syjqChartFour = echarts.init(document.getElementById('syjqChartFour'));
    let syjqChartFourOptions = this.syjqChartFourSetOption(name,data)
    syjqChartFour.setOption(syjqChartFourOptions)
  }    

  syjqChartFiveInitChart() {
    //  显示每个警情类型不同月份的警情数量
    let sjdYearData =  this.countSyjqYearNum();
    // console.log('sjdYearData>>',sjdYearData)
    let mothName = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
    let sjdYearTypeData =  sjdYearData[0].slice(1,);  //一年内发生的总数量
    let sjdYearTypeNum =  sjdYearData[1]; //一年内发生了多少个类型
    let sjdYearTypeMonthData =  sjdYearData[2]; //一年内 每个类型警情 每个月发生的数量
    
    //显示一年内每个月的警情数量
    let sjdYearMonthData =  sjdYearData[3]; //一年内每个月发生的数量
    //option
    let syjqChartFive = echarts.init(document.getElementById('syjqChartFive'));
    let syjqChartFiveOptions = this.syjqChartFiveSetOption(sjdYearTypeNum,mothName.slice(0,sjdYearMonthData.length),sjdYearTypeMonthData,sjdYearMonthData);
    syjqChartFive.setOption(syjqChartFiveOptions);
  }   

  syjqChartSixInitChart() {
    // const data=this.props.data;
    let charts = {
      // unit: '数量',
      names: ['浙江', '江西'],
      lineX: ['北京东路', '河南路', '浙江路', '河南路', '北京东路', '河南路', '浙江路', '河南路', '北京东路', '河南路', '浙江路', '河南路', '北京东路', '河南路', '浙江路', '河南路', '北京东路', '河南路', '浙江路', '河南路',],
      value: [
        [451, 352, 303, 534, 95, 236, 217, 328, 159, 151, 231, 192, 453, 524, 165, 236, 527, 328, 129, 530],
        [360, 545, 80, 192, 330, 580, 192, 80, 250, 453, 352, 28, 625, 345, 65, 325, 468, 108, 253, 98]
      ]
  
    }
    let color = ['rgba(23, 255, 243', 'rgba(255,100,97']
    let lineY = []
  
    for (let i = 0; i < charts.names.length; i++) {
      let x = i
      if (x > color.length - 1) {
        x = color.length - 1
      }
      let data = {
        name: charts.names[i],
        type: 'line',
        color: color[x] + ')',
        smooth: true,
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: color[x] + ', 0.3)'
            }, {
              offset: 0.8,
              color: color[x] + ', 0)'
            }], false),
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowBlur: 10
          }
        },
        symbol: 'circle',
        symbolSize: 5,
        data: charts.value[i]
      }
      lineY.push(data)
    }
  
    lineY[0].markLine = {
      silent: true,
      data: [{
        yAxis: 5
      }, {
        yAxis: 100
      }, {
        yAxis: 200
      }, {
        yAxis: 300
      }, {
        yAxis: 400
      }]
    }    


    let syjqChartSix = echarts.init(document.getElementById('syjqChartSix'));
    let syjqChartSixOptions = this.syjqChartSixSetOption(charts,lineY)
    syjqChartSix.setOption(syjqChartSixOptions)
  }  


  //--------------------    set option    -------------------------
  syjqChartOneSetOption(name,value,titileDate) {
    //
    return {
      title: {
        text: titileDate + ' 不同警情类型数量',
        left: 'center',
        // top: 20,
        textStyle: {
          color: '#ccc'							
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        x: '0%',
        y: '15%',

        data:name,
        textStyle: {
          color: '#ccc'							
        }
      },
      series: [
        {
          name:'警情类型',
          type:'pie',
          radius: ['50%', '80%'],
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

  syjqChartTwoSetOption(name,value) {
    return {

    }
  }

  syjqChartThreeSetOption(myColor,value) {
    return {
      title: {
          // text: '警情程度',
          left: "",
          textStyle: {
            color: "#fff"
          } 
      },
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'shadow'
          }
      },
      // legend: {
      //     // data: ['2011年', '2012年']
      // },
      grid: {
          left: '3%',
          right: '4%',
          top: '6%',
          bottom: '3%',
          containLabel: true
      },
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
          type: 'category',
          axisLine: {
            lineStyle: {
              color: "#fff",
            }
          },
          data: ['无效','紧急','一般','非紧急','中度','轻微']
      },
      series: [
          {
              name: '2011年',
              type: 'bar',
              data: [18203, 23489, 29034, 104970, 131744, 630230]
          },
          {
              name: '2012年',
              type: 'bar',
              data: [19325, 23438, 31000, 121594, 134141, 681807]
          }
      ]
    }
  
  }

  syjqChartFourSetOption(name,value) {
    return      {
      // backgroundColor:'black',
      "normal": {
        "top": 200,
        "left": 300,
        "width": 500,
        "height": 400,
        "zIndex": 6,
        "backgroundColor": "white"
      },
      color: ["rgba(245, 166, 35, 1)", "rgba(19, 173, 255, 1)"],
      // "title": {
      //   "show": true,
      //   // "text": "警情类型",
      //   "left": "45%",
      //   "top": "1%",
      //   "textStyle": {
      //     "fontSize": 18,
      //     "color": "#fff",
      //     "fontStyle": "normal",
      //     "fontWeight": "normal"
      //   }
      // },
      "tooltip": {
        "show": true,
        "trigger": "item"
      },
      // legend: {
      //   "show": true,
      //   "icon": "circle",
      //   "left": "45%",
      //   "top": "90%",
      //   "orient": "horizontal",
      //   "textStyle": {
      //     "fontSize": 14,
      //     "color": "#fff"
      //   },
      //   "data": ["数据1", "数据2"]
      // },
      "radar": {
        "center": ["50%", "50%"],
        "radius": "65%",
        "startAngle": 90,
        "splitNumber": 4,
        "shape": "circle",
        "splitArea": {
          "areaStyle": {
            "color": ["transparent"]
          }
        },
        "axisLabel": {
          "show": false,
          "fontSize": 18,
          "color": "#fff",
          "fontStyle": "normal",
          "fontWeight": "normal"
        },
        "axisLine": {
          "show": true,
          "lineStyle": {
            "color": "#fff"//
          }
        },
        "splitLine": {
          "show": true,
          "lineStyle": {
            "color": "grey"//
          }
        },
        "indicator": [{
          "name": "房屋买卖合同纠纷",
          "max": 88
        }, {
          "name": "劳动合同纠纷",
          "max": 88
        }, {
          "name": "财产损害赔偿纠纷",
          "max": 88
        },  {
          "name": "侵犯财产案件",
          "max": 88
        }, {
          "name": "交通案件",
          "max": 88
        }, {
          "name": "离婚纠纷",
          "max": 88
        }, {
          "name": "危害公共安案件",
          "max": 88
        }]
      },
      "series": [{
        "name": "数据1",
        "type": "radar",
        "symbol": "circle",
        "symbolSize": 10,
        "areaStyle": {
          "normal": {
            "color": "rgba(245, 166, 35, 0.4)"
          }
        },
        itemStyle:{
          color:'rgba(245, 166, 35, 1)',
          borderColor:'rgba(245, 166, 35, 0.3)',
          borderWidth:10,
        },
        "lineStyle": {
          "normal": {
            "type": "dashed",
            
            "color": "rgba(245, 166, 35, 1)",
            "width": 2
          }
        },
        "data": [
          [80, 50, 55, 80, 50, 80, 48, 43, 60, 78, 60, 40, 42, 44, 65]
        ]
      }, {
        "name": "数据2",
        "type": "radar",
        "symbol": "circle",
        "symbolSize": 10,
        "itemStyle": {
          "normal": {
            color:'rgba(19, 173, 255, 1)',
            "borderColor": "rgba(19, 173, 255, 0.4)",
            "borderWidth": 10
          }
        },
        "areaStyle": {
          "normal": {
            "color": "rgba(19, 173, 255, 0.5)"
          }
        },
        "lineStyle": {
          "normal": {
            "color": "rgba(19, 173, 255, 1)",
            "width": 2,
            "type": "dashed"
          }
        },
        "data": [
          [60, 60, 65, 60, 70, 40, 80, 63, 68, 60, 77, 60, 80, 62, 80]
        ]
      }]
    }
  }  

  syjqChartFiveSetOption(jqtype,xData,value,monthData) {
    return  {
      // backgroundColor: '#191E40',
      title: {
        text: '2019 各月份警情数量',
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
      legend: {
        data:jqtype,
        bottom: '5%',
        textStyle: {
          color: '#B4B4B4'
        },								
      },
      xAxis : [
        {
          type : 'category',
          axisLine: {
            lineStyle: {
            color: "#fff"
            }
          },									
          data : xData
        }
      ],
      yAxis : [
        {
          type : 'value',
          name : '数量',
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
          name: jqtype[0],
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
          data:value[0]							
          // data:monthData
        },
        {
          name:jqtype[1],
          type:'bar',
          data:value[1]
        },
        {
          name:jqtype[2],
          type:'bar',
          data:value[2]
        },
        {
          name:jqtype[3],
          type:'bar',
          // barCategoryGap: '10%',
          data:value[3]
        }
        
      ]
    }
  }  

  syjqChartSixSetOption(charts,lineY) {
    return  {
      // backgroundColor:'#1b2735',
      tooltip: {
        trigger: 'axis'
      },
      // legend: {
      //   data: charts.names,
      //   textStyle: {
      //     fontSize: 12,
      //     color: "#fff"
      //   },
      //   right: '4%'
      // },
      grid: {
        top: '14%',
        left: '4%',
        right: '4%',
        bottom: '12%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: charts.lineX,
        axisLabel: {
          textStyle: {
            color: "#fff"
          },
          // formatter: function(params) {
          //   return params.split(' ')[0] + '\n' + params.split(' ')[1]
          // }
        }
      },
      yAxis: {
        name: charts.unit,
        type: 'value',
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: "#fff"
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgb(23,255,243,0.3)'
          }
        },
        axisLine: {
          lineStyle: {
            color: 'rgb(0,253,255,0.6)'
          }
        }
      },
      series: lineY
    }
  }  





  /* count the SyjqMonth number  */
  countSyjqMonthNum(sjdMonth){
    //统计一个月内各个类别的警情
    let totalNum  = 0,
        jtDataNum = 0,
        jfDataNum = 0,
        jwDataNum = 0,
        qfDataNum = 0;

    if(sjdMonth != null ){
      for(let  key in sjdMonth.jtData){
        // console.log(sjdMonth.jtData[key].countTotal);
        jtDataNum +=  Number(sjdMonth.jtData[key].countTotal);
      }
      for(let  key in sjdMonth.jfData){
        // console.log(sjdMonth.jtData[key].countTotal);
        jfDataNum +=  Number(sjdMonth.jfData[key].countTotal);
      }
      for(let  key in sjdMonth.jwData){
        // console.log(sjdMonth.jtData[key].countTotal);
        jwDataNum +=  Number(sjdMonth.jwData[key].countTotal);
      }
      for(let  key in sjdMonth.qfData){
        // console.log(sjdMonth.jtData[key].countTotal);
        qfDataNum +=  Number(sjdMonth.qfData[key].countTotal);
      }
      totalNum = jtDataNum + jfDataNum + jwDataNum + qfDataNum;
      // console.log(totalNum);
    }

    console.log("countNum res >--",[totalNum,jtDataNum,jfDataNum,jwDataNum,qfDataNum]);

    return [totalNum,jtDataNum,jfDataNum,jwDataNum,qfDataNum];
  }



  /* count the SyjqYear number  */
  countSyjqYearNum(){    
    //统计一年内各个类别的警情
    let totalNum  = 0,
        jtDataNum = 0,
        jfDataNum = 0,
        jwDataNum = 0,
        qfDataNum = 0;

    let monthData = [];
    
    if(this.state.countSjdYear != null ){
      for(let  key in this.state.countSjdYear.jtData){
        jtDataNum +=  Number(this.state.countSjdYear.jtData[key].countTotal);
        monthData.push(Number(this.state.countSjdYear.jtData[key].countTotal));
      }
      for(let  key in this.state.countSjdYear.jfData){
        jfDataNum +=  Number(this.state.countSjdYear.jfData[key].countTotal);
        monthData[key] += Number(this.state.countSjdYear.jfData[key].countTotal);
      }
      for(let  key in this.state.countSjdYear.jwData){
        jwDataNum +=  Number(this.state.countSjdYear.jwData[key].countTotal);
        monthData[key] += Number(this.state.countSjdYear.jtData[key].countTotal);
      }
      for(let  key in this.state.countSjdYear.qfData){
        qfDataNum +=  Number(this.state.countSjdYear.qfData[key].countTotal);
        monthData[key] +=  Number(this.state.countSjdYear.jtData[key].countTotal);
      }
      totalNum = jtDataNum + jfDataNum + jwDataNum + qfDataNum;
    }

    // console.log(monthData);

    //统计一年内各个类别每个月的警情
    let jtYearDataNum  = [],
        jfYearDataNum = [],
        jwYearDataNum = [],
        qfYearDataNum = [],
        jtYearDataType  = 0,
        jfYearDataType = 0,
        jwYearDataType = 0,
        qfYearDataType = 0;

    if(this.state.countSjdYear != null ){
      for(let  key in this.state.countSjdYear.jtData){
        // console.log(this.state.countSjdYear.jtData[key].countTotal);\
        jtYearDataNum.push(this.state.countSjdYear.jtData[key].countTotal);
        jtYearDataType = this.state.countSjdYear.jtData[key].objectName;
      }
      for(let  key in this.state.countSjdYear.jfData){
        jfYearDataNum.push(this.state.countSjdYear.jfData[key].countTotal);
        jfYearDataType = this.state.countSjdYear.jfData[key].objectName;
      }
      for(let  key in this.state.countSjdYear.jwData){
        jwYearDataNum.push(this.state.countSjdYear.jwData[key].countTotal);
        jwYearDataType = this.state.countSjdYear.jwData[key].objectName;
      }
      for(let  key in this.state.countSjdYear.qfData){
        qfYearDataNum.push(this.state.countSjdYear.qfData[key].countTotal);
        qfYearDataType = this.state.countSjdYear.qfData[key].objectName;
      }
    }

    return [[totalNum,jtDataNum,jfDataNum,jwDataNum,qfDataNum],
            [jtYearDataType,jfYearDataType,jwYearDataType,qfYearDataType],
            [jtYearDataNum,jfYearDataNum,jwYearDataNum,qfYearDataNum],
            monthData
           ];
  }


  handleTimeChange(value){
    // pass time stamp param
    Service.getSyjqApiCountSjdMonth(value.key).then((data) => {
      // console.log("value.key res data--->",totalNumRes);
      this.setState({
        sjdTtotalNum: this.countSyjqMonthNum(data)[0]
      });
      this.setState({
        countSjdMonth: this.countSyjqMonthNum(data).slice(1,) || [],
      });
    });    
    this.syjqChartOneInitChart(value.key);

  }



  render() {
    console.log("sjd data--->",this.state);
    return (
        <div className="charts-data">
          <div id="syjqChartZero" className="syjqChartOneDiv chartBoxFrame">
            <div className="resource-box" >
              <div className = "chartSelectTitle">
                <div  className = "time-select" >
                  <Select 
                    labelInValue
                    defaultValue = {{ key: this.state.initDate}}
                    style = {{width : '100%'}}
                    onChange = {this.handleTimeChange}
                  >
                    <Option value= '2019-03'> 2019-03 </Option>
                    <Option value= '2019-04'> 2019-04 </Option>
                    <Option value= '2019-05'> 2019-05 </Option>
                    <Option value= '2019-06'> 2019-06 </Option>
                    <Option value= '2019-07' > 2019-07 </Option>
                    <Option value=  '2019-08' > 2019-08 </Option>
                  </Select>
                </div >
                <div className = "chart-title" >
                  <h4 className="chart-subtitle" >  报警数量   </h4>
                </div>
              </div>

              <div className="syjqChartOneTextOne"  >
                { this.state.sjdTtotalNum }  <span id="value_total"></span>
              </div>
            </div> 
          </div>

          <div id="syjqChartOne" className="syjqChartOneDiv chartBoxFrame"></div>
          <div id="syjqChartFive" className="syjqChartFiveDiv chartBoxFrame"></div>      
        </div>
    )
  }

}



class SyjqChartBox extends Component {
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
    return this.props.close ? this.props.close('SYJQ_BOX') : null;
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
      <div className="SyjqChartBox">
        <div className="title">
          <div>实有警情</div>
          <div className="close" onClick={() => this.close()}>
            <img src={icon_close} />
          </div>
        </div>
        <ul className="charts-title">
          <li className={active_tab === 0 ? "active" : ""} onClick={() => { this.changeTab(0) }}>统计数据</li>
          <li className={active_tab === 1 ? "paddingLeft_15 active" : "paddingLeft_15"} onClick={() => { this.changeTab(1) }}>列表</li>
        </ul>
        {active_tab === 0
          ? <SyjqDiagram /> 
          : <div>
              <SyjqTable /> 
            </div>
        }
       
      </div>
    )
  }
}

SyjqChartBox.propTypes = {
  // close: PropTypes.string,
}

SyjqChartBox.defaultProps = {
}

export default SyjqChartBox;




