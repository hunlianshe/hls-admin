

import React, {
  Component,
} from 'react';


import Cesium from 'cesium/Cesium';
import 'cesium/Widgets/widgets.css';

import './SyjlDetail.css';
import 'antd/dist/antd.css';
import { Table ,Modal} from 'antd';
import Service from '../../../../Http/service';
import icon_close from '../../../public/images/icon-close.png';

class SyjlInfo extends Component{
  constructor(props) {
    super(props);
    console.log('SyjlInfo -->',this.props.syjlInfo);
    

    this.state = {
      // name: this.props.syjlDetailInfo.name,
      // busnum: this.props.syjlDetailInfo.busnum,

    }

  }

  componentDidMount() {

  }

  closeChart() {
    return this.props.closeSyjlDetail ? this.props.closeSyjlDetail() : null;
  }

  render() {
    

    const policeType = {'0':'特警','1':'治安','2':'交警','3':'机动' };
    console.log("policeType -->",policeType[this.props.syjlInfo.type]  );
     return(
       <div className="SyjlDetail" id='SyjlDetail'>
            <div className="title">
              <div>详细信息</div>
              <div className="close" onClick={() => this.closeChart()}>
                <img src={icon_close} />
              </div>
            </div>       
           <div className="detail-content">
            <div className="detail-info">
              <ul>
                <li>警员姓名：  {this.props.syjlInfo.name} </li>
                <li>手台号:   {this.props.syjlInfo.tetranumber}</li>
                <li>警号:   {this.props.syjlInfo.id}</li>
                <li>电话:   {this.props.syjlInfo.phone}</li>
                <li>一级部门名称：{this.props.syjlInfo.firstDepartName}</li>
                <li>二级部门名称：{this.props.syjlInfo.secondDepartName}</li>
                <li>三级部门名称：{this.props.syjlInfo.thirdDepartName}</li>
                <li>警种类型：{policeType[this.props.syjlInfo.type]}</li>
                
              </ul>
            </div>
            <div className="detail-action">
              
            </div>
           </div>
       </div>
     )
  }
}





class SyjlDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataAlready: false,
      columns: [],
      jlData: [],
      syjlDetailInfo: '',
      showSyjlBox: false,
    }

    this.openSyjlDetail = this.openSyjlDetail.bind(this);
    this.closeSyjlDetail = this.closeSyjlDetail.bind(this); 
    this.getSyjlInfo = this.getSyjlInfo.bind(this); 
    
  }

  componentWillReceiveProps(nextProps){
    if(this.props.jqClickPoint !== nextProps.jqClickPoint){
      if(nextProps.jqClickPoint){
        this.getSyjlInfo(nextProps,nextProps.jqClickPoint,1000);
      }
      // console.log("nextProps", nextProps.jqClickPoint);
      // console.log("nextProps", nextProps);
      // console.log("this props", this.props.jqClickPoint);
    }else if(this.props.syjlDrawCircleRaidus !== nextProps.syjlDrawCircleRaidus){
      // console.log("DrawCircle nextProps", nextProps);
      // console.log("DrawCircle this props", this.props);
      if(nextProps.syjlDrawCircleRaidus){
        this.getSyjlInfo(nextProps,nextProps.syjlDrawCircleOrigin,nextProps.syjlDrawCircleRaidus);
        // new code 0829
        //we need jlData
        // nextProps.syjlAddBillborads(this.state.jlData);
      }
    }

  }

  componentDidMount() {
    // ()=>{
    //   this.props.syjlAddBillborads(this.state.jlData);
    // }  
    
  }

  componentDidUpdate(){
    // this.props.syjlAddBillborads(this.state.jlData);
  }


  getSyjlInfo(nextProps,propsRawPoint,filterDistance){
    // let rawPoint = propsRawPoint;
    let ellipsoid = nextProps.cesiumViewer.scene.globe.ellipsoid;;
    // viewer.scene.globe.ellipsoid;
    // console.log("jqClickPoint -->",filterDistance) 
    // console.log("jqClickPoint -->",propsRawPoint) 
    // console.log("cesiumViewer -->",nextProps.cesiumViewer)

    const columns  = [
      {
        title: '姓名',
        dataIndex: 'name',
        width: 80,
      },
      {
        title: '警号',
        dataIndex: 'policeId',
        width: 40,
      },
      {
        title: '定位',
        dataIndex: '',
        key: 'x',
        render: (text,record) => <a onClick={() => this.props.syjlflyToLocation(record.name,record.location)}>定位</a>,
        // render: (record) => <a onClick={() => console.log('定位 -->',record.location)}>定位</a>,
      },
      {
        title: '详情',
        dataIndex: '',
        render: (text,record) => <a onClick={() => this.openSyjlDetail(record)}>详情</a>,
      },
    ];

    Service.getSyjlApi().then((data) => {
      console.log('getSyjlInfo -->',data.data);
      const getSyjl = [];
      let addTableIndex = false;
      for(let i in data.data){
        let phoneStr = data.data[i].phone.split('；'); 
        let calRadius = this.calculateArea(ellipsoid,propsRawPoint,Number(data.data[i].lon),Number(data.data[i].lat) );
        // console.log('calRadius -->',calRadius);
        if(calRadius < filterDistance){
          getSyjl.push({
            key: i,
            name: data.data[i].name,
            policeId: data.data[i].policeId,
            location:  [data.data[i].lon,data.data[i].lat],
            phone: phoneStr[0],
            tetranumber: data.data[i].tetranumber,
            firstDepartName: data.data[i].firstDepartName,
            secondDepartName: data.data[i].secondDepartName,
            thirdDepartName: data.data[i].thirdDepartName,
            type: data.data[i].type,
          });
          addTableIndex = true;
        }
      }

      if(getSyjl.length == 0){
        Modal.warning({
          title: '搜索半径内没有警力人员！',
          content: '请重新设置搜索半径',
        });
      }
      console.log('getSyjl length -->',getSyjl.length);
      
      this.setState({
        dataAlready: addTableIndex,
        columns: columns,
        jlData: getSyjl,
      })

      this.props.syjlAddBillborads(getSyjl);

    })

  }

  calculateArea(ellipsoid,originePoint,jlPointLon,jlPointLat){  
    // console.log("ellipsoid -->",ellipsoid)
    // console.log("Cartographic -->",Cesium.Cartographic)
    let origine_coord_wgs84 = Cesium.Cartographic.fromDegrees(originePoint[0], originePoint[1], 0);//单位：度，度，米
    let jl_coord_wgs84 = Cesium.Cartographic.fromDegrees(jlPointLon, jlPointLat, 0);//单位：度，度，米

    let origine_coord_xyz = ellipsoid.cartographicToCartesian(origine_coord_wgs84);
    let jl_coord_xyz = ellipsoid.cartographicToCartesian(jl_coord_wgs84);
    // console.log('x=' + coord_xyz.x + ',y=' + coord_xyz.y + ',z=' + coord_xyz.z);//单位：米，米，米

    // let radius = Math.sqrt(Math.pow(originePoint[0] - jlPoint, 2) + Math.pow(originePoint[1] - jlPointLat,2));
    let radius = Math.sqrt(Math.pow(origine_coord_xyz.x - jl_coord_xyz.x, 2) + 
                            Math.pow(origine_coord_xyz.y - jl_coord_xyz.y,2) );

    return radius;

  }

  /** open Syjl box */
  openSyjlDetail(info){
    this.setState({
      syjlDetailInfo: info,
    });
    this.setState({
      showSyjlBox: true,
    });
  }

 /** close Syjl box */
  closeSyjlDetail(){
    this.setState({
      showSyjlBox: false,
    });
  }


  render() {
    if (!this.state.dataAlready) { return false};
    // console.log("cesiumViewer -->",this.props.cesiumViewer)
    // console.log("jlData -->",this.state.jlData)
    const {
      jlData,
      columns,
      showSyjlBox,
    } = this.state;
    console.log("jlData -->",jlData);
    
    // console.log("jqClickPoint -->",this.props.jqClickPoint);
    return(
    <div className="Syjltable">
      <Table columns={columns} dataSource={jlData} pagination={{ pageSize: 100 }} scroll={{ y: 125 }} size="small" />
      {showSyjlBox ? 
        <SyjlInfo syjlInfo={this.state.syjlDetailInfo} 
          syjlFilterTotal = {jlData} 
          closeSyjlDetail={this.closeSyjlDetail} 
        /> 
        : null
      }
    </div>
    
    )
  }
}

export default SyjlDetail;
