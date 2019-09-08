import React, {
    Component,
  } from 'react';
  
  
import Cesium from 'cesium/Cesium';
import 'cesium/Widgets/widgets.css';

import './SyjlDetail.css';
import 'antd/dist/antd.css';
import { Table,Button ,Modal } from 'antd';
import Service from '../../../../Http/service';
import icon_close from '../../../public/images/icon-close.png';





class SyjlInfoBox extends Component{
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

  getBillboradData(){
    Service.getSyjlApi().then((data) => {
      // console.log('getSyjlInfo -->',data.data);
      const getSyjl = [];
    
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
        }

      }

      this.setState({
        dataAlready: true,
        columns: columns,
        jlData: getSyjl,
      })

    })
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



  export default SyjlInfoBox;