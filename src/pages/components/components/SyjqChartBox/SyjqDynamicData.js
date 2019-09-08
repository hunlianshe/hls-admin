
import React, {
  Component,
  PropTypes,
} from 'react';
import { Table } from 'antd';
import { Select } from 'antd';

import './SyjqChartBox.css';
import 'antd/dist/antd.css';

import $ from '../../../public/SyDataVis/jquery';
// import Cesium from 'cesium/Cesium';
// import 'cesium/Widgets/widgets.css';
// import '../../Index/index.css';
// import './blinking.css';


import Service from '../../../../Http/service';
import icon_close from '../../../public/images/icon-close.png';

var currentTime = new Date();

class SyjqDynamicData extends Component {
  constructor(props) {
    super(props);
    // console.log('sjdDataRes -->',this.getData());
    //页面初始化时加载当前时间的 数据，然后通过30秒时间间隔去请求数据
    this.state = {
      dynamicSyjdData: this.getData(),
      date: new Date(),
    };
    this.filterInitSjdbrj =  this.filterInitSjdbrj.bind(this);

  }


  componentDidMount() {
    // this.getSjdDayData()
    this.updateSjdData();
  }

  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  getData(){
    var sjdDataRes = []
    // $.ajax({
    //   type: 'get',
    //   url:'http://localhost:8022/proxy/jingqing/third/SjdDay?ssxqdm=310101000000&page=1&pageSize=10&num=1',//改成config读取
    //   async: false,
    //   success: function(data){
    //     // console.log('ajax -->',data.data.data);
    //     sjdDataRes = data.data.data;
    //   }
    // });
    return sjdDataRes
  }

  updateSjdData(){
    this.timerID = setInterval(
      () => this.getSjdDayData(),
      10000
    );
  }


  getSjdDayData() {
    Service.getSyjqApiSjdDay().then((data) => {
      this.setState({
        dynamicSyjdData: data.data
      })
      // console.log("change",this.state.divGetSjdCoor);
    });
    this.setState({
      date: new Date()
    });

  }


  filterInitSjdbrj(data,index){
    if(data.length > 0 ){
      return data[index].bjr
      // console.log('filterInitSjdbrj',data[0].bjr)
    }
  }

  filterInitSjdlxdh(data,index){
    if(data.length > 0 ){
      return data[index].lxdh
      // console.log('filterInitSjdbrj',data[0].bjr)
    }
  } 
  
  filterInitSjdssxqmc(data,index){
    if(data.length > 0 ){
      return data[index].ssxqmc
      // console.log('filterInitSjdbrj',data[0].bjr)
    }
  }

  filterInitSjdscslsj(data,index){
    if(data.length > 0 ){
      return data[index].scslsj
      // console.log('filterInitSjdbrj',data[0].bjr)
    }
  }

  filterInitSjdqlbmc(data,index){
    if(data.length > 0 ){
      return data[index].jqlbmc
      // console.log('filterInitSjdbrj',data[0].bjr)
    }
  }

  filterInitSjdsjxqs(data,index){
    if(data.length > 0 ){
      return data[index].sjxq
      // console.log('filterInitSjdbrj',data[0].bjr)
    }
  }

  filterInitSjdsCoor(data,index){
    if(data.length > 0 ){
      return [Number(data[index].xzb), Number(data[index].yzb)]
      // console.log('filterInitSjdbrj',data[0].bjr)
    }
  }

  

  render(){
    // console.log("child initSjdbrjDay",this.props.initSjdbrjDay)
    return(
      <div className="scroll-list">
        {/* <h2> {this.state.date.toLocaleTimeString()}  </h2> */}
        <div className="info-list border-bottom jqmsg">
          <div className="user-name">报警人：{this.filterInitSjdbrj(this.state.dynamicSyjdData,0)}   
            <img onClick={() => this.props.parrentflyToLocation(this.filterInitSjdsCoor(this.state.dynamicSyjdData,0))} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAyCAYAAAAqRkmtAAAACXBIWXMAACE3AAAhNwEzWJ96AAACtklEQVRogdWazW0bMRCFnxcpQB1kO7BKWFfgTQXW2SfnaCAIdHQRPqwriFKBt4R1B1QHuiYXBgxIYE1zZvgzCqIBCAMUOe/zLGdIrnRlrUWDjQC2AAYAPYDPkasjAANgBrAAOFRLOdDCNlhrJ1tvk/dRpFsy2DmfGwBjm0uAcwZtGiMo2eQ1mkC31lpzRshgxmtVgY7W2tM/gAx28ppJHirrXTb/yMzHn6usdu3k+ze+IoSqcJvp70uyOhCPW4qk+3xvre0LkrH3c3J8f1gGqcSR1uShEDAFfBA0TJxgsRMpux8aAOP2IGhNFOggTNwpQoa2EzSHFChXzDUjWRLZOQblonnIjIwbt17fxvflPAluzQ5rUGptnoTEcdm5MCLBFqGg90w1mNaglO0b1lfKuOjumXl/QUdmABXNbQVkMCqyPTNn7PzOQe04hvhsytxlSuYar5mybee3t5TNRP8OwHUD6LX3UaI5dP5knrKF6B8ZiBcAN769MOMoH5RmzyUSdUaktth3O4lQTQzhe0PBuNMTdWm6Ivqp8S6K8aNzy+pVw39HDP7vjAPdEP1Hoj+VIFTSUD4oTXzyk+JrLnzZSmXhQoy/839D+dmt+lI+UkaVymPH1EpqEnc3v/Nr8pWB5HxQmqbjahfR7yL2xkBI9sYUfbqmX8oWelGHkos65l3MwRnCVeQxQ6y2PTK6H64iUlSdPZ8B8lnQTF7uuLUa7F4R8l7QIq/LyHwBoXFtliqG+AIiZPLvM8JKkL9yXumE9k1wVgubU3u/puZyTr8rw+ZAPlHzNZznwDb70YoEJ6Lyz2o+tpSY1hMp+lakVFQNshS0RFwVsgY0F1YVsha0FbZqs6gFrYWt3tFaQEthm84IraC5sM0HGQ1QCVblSwot0AAbX0XUvklp/WFBysIrxfofEcQG4A+PNJG59rpEMwAAAABJRU5ErkJggg=="></img></div>
          <div>联系电话：{this.filterInitSjdlxdh(this.state.dynamicSyjdData,0)} </div>
          <div>派出所： {this.filterInitSjdssxqmc(this.state.dynamicSyjdData,0)}</div>
          <div>报警时间： {this.filterInitSjdscslsj(this.state.dynamicSyjdData,0)}</div>
          <div>报警类型：{this.filterInitSjdqlbmc(this.state.dynamicSyjdData,0)} </div>
          <div>报警详情： {this.filterInitSjdsjxqs(this.state.dynamicSyjdData,0)}</div>
        </div>
        <div className="info-list border-bottom jqmsg">
          <div className="user-name">报警人：{this.filterInitSjdbrj(this.state.dynamicSyjdData,1)}   
            <img onClick={() => this.props.parrentflyToLocation(this.filterInitSjdsCoor(this.state.dynamicSyjdData,1))} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAyCAYAAAAqRkmtAAAACXBIWXMAACE3AAAhNwEzWJ96AAACtklEQVRogdWazW0bMRCFnxcpQB1kO7BKWFfgTQXW2SfnaCAIdHQRPqwriFKBt4R1B1QHuiYXBgxIYE1zZvgzCqIBCAMUOe/zLGdIrnRlrUWDjQC2AAYAPYDPkasjAANgBrAAOFRLOdDCNlhrJ1tvk/dRpFsy2DmfGwBjm0uAcwZtGiMo2eQ1mkC31lpzRshgxmtVgY7W2tM/gAx28ppJHirrXTb/yMzHn6usdu3k+ze+IoSqcJvp70uyOhCPW4qk+3xvre0LkrH3c3J8f1gGqcSR1uShEDAFfBA0TJxgsRMpux8aAOP2IGhNFOggTNwpQoa2EzSHFChXzDUjWRLZOQblonnIjIwbt17fxvflPAluzQ5rUGptnoTEcdm5MCLBFqGg90w1mNaglO0b1lfKuOjumXl/QUdmABXNbQVkMCqyPTNn7PzOQe04hvhsytxlSuYar5mybee3t5TNRP8OwHUD6LX3UaI5dP5knrKF6B8ZiBcAN769MOMoH5RmzyUSdUaktth3O4lQTQzhe0PBuNMTdWm6Ivqp8S6K8aNzy+pVw39HDP7vjAPdEP1Hoj+VIFTSUD4oTXzyk+JrLnzZSmXhQoy/839D+dmt+lI+UkaVymPH1EpqEnc3v/Nr8pWB5HxQmqbjahfR7yL2xkBI9sYUfbqmX8oWelGHkos65l3MwRnCVeQxQ6y2PTK6H64iUlSdPZ8B8lnQTF7uuLUa7F4R8l7QIq/LyHwBoXFtliqG+AIiZPLvM8JKkL9yXumE9k1wVgubU3u/puZyTr8rw+ZAPlHzNZznwDb70YoEJ6Lyz2o+tpSY1hMp+lakVFQNshS0RFwVsgY0F1YVsha0FbZqs6gFrYWt3tFaQEthm84IraC5sM0HGQ1QCVblSwot0AAbX0XUvklp/WFBysIrxfofEcQG4A+PNJG59rpEMwAAAABJRU5ErkJggg=="></img></div>
          <div>联系电话：{this.filterInitSjdlxdh(this.state.dynamicSyjdData,1)} </div>
          <div>派出所： {this.filterInitSjdssxqmc(this.state.dynamicSyjdData,1)}</div>
          <div>报警时间： {this.filterInitSjdscslsj(this.state.dynamicSyjdData,1)}</div>
          <div>报警类型：{this.filterInitSjdqlbmc(this.state.dynamicSyjdData,1)} </div>
          <div>报警详情： {this.filterInitSjdsjxqs(this.state.dynamicSyjdData,1)}</div>
        </div>
        <div className="info-list border-bottom jqmsg">
          <div className="user-name">报警人：{this.filterInitSjdbrj(this.state.dynamicSyjdData,2)}   
            <img onClick={() => this.props.parrentflyToLocation(this.filterInitSjdsCoor(this.state.dynamicSyjdData,2))} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAAyCAYAAAAqRkmtAAAACXBIWXMAACE3AAAhNwEzWJ96AAACtklEQVRogdWazW0bMRCFnxcpQB1kO7BKWFfgTQXW2SfnaCAIdHQRPqwriFKBt4R1B1QHuiYXBgxIYE1zZvgzCqIBCAMUOe/zLGdIrnRlrUWDjQC2AAYAPYDPkasjAANgBrAAOFRLOdDCNlhrJ1tvk/dRpFsy2DmfGwBjm0uAcwZtGiMo2eQ1mkC31lpzRshgxmtVgY7W2tM/gAx28ppJHirrXTb/yMzHn6usdu3k+ze+IoSqcJvp70uyOhCPW4qk+3xvre0LkrH3c3J8f1gGqcSR1uShEDAFfBA0TJxgsRMpux8aAOP2IGhNFOggTNwpQoa2EzSHFChXzDUjWRLZOQblonnIjIwbt17fxvflPAluzQ5rUGptnoTEcdm5MCLBFqGg90w1mNaglO0b1lfKuOjumXl/QUdmABXNbQVkMCqyPTNn7PzOQe04hvhsytxlSuYar5mybee3t5TNRP8OwHUD6LX3UaI5dP5knrKF6B8ZiBcAN769MOMoH5RmzyUSdUaktth3O4lQTQzhe0PBuNMTdWm6Ivqp8S6K8aNzy+pVw39HDP7vjAPdEP1Hoj+VIFTSUD4oTXzyk+JrLnzZSmXhQoy/839D+dmt+lI+UkaVymPH1EpqEnc3v/Nr8pWB5HxQmqbjahfR7yL2xkBI9sYUfbqmX8oWelGHkos65l3MwRnCVeQxQ6y2PTK6H64iUlSdPZ8B8lnQTF7uuLUa7F4R8l7QIq/LyHwBoXFtliqG+AIiZPLvM8JKkL9yXumE9k1wVgubU3u/puZyTr8rw+ZAPlHzNZznwDb70YoEJ6Lyz2o+tpSY1hMp+lakVFQNshS0RFwVsgY0F1YVsha0FbZqs6gFrYWt3tFaQEthm84IraC5sM0HGQ1QCVblSwot0AAbX0XUvklp/WFBysIrxfofEcQG4A+PNJG59rpEMwAAAABJRU5ErkJggg=="></img></div>
          <div>联系电话：{this.filterInitSjdlxdh(this.state.dynamicSyjdData,2)} </div>
          <div>派出所： {this.filterInitSjdssxqmc(this.state.dynamicSyjdData,2)}</div>
          <div>报警时间： {this.filterInitSjdscslsj(this.state.dynamicSyjdData,2)}</div>
          <div>报警类型：{this.filterInitSjdqlbmc(this.state.dynamicSyjdData,2)} </div>
          <div>报警详情： {this.filterInitSjdsjxqs(this.state.dynamicSyjdData,2)}</div>
        </div>
      </div>      
    )
  }


}



SyjqDynamicData.propTypes = {
  // close: PropTypes.string,
}

SyjqDynamicData.defaultProps = {
}

export default SyjqDynamicData;






