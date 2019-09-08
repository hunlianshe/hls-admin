

import React, {
  Component,
} from 'react';

import './TimeLine.css';
import {viewer} from '../../Index/Index.js.js.js.js.js.js.js';
import Cesium from 'cesium/Cesium';

var xDirection;
var clientWidth = document.body.clientWidth-290-290-56;
var timeLeap = (24*3600)/clientWidth;
// console.log("the client width is"+clientWidth);
// console.log("the time leap is"+timeLeap);

let offsetLeft
class TimeLine extends Component {
  constructor(props) {
    super(props);

    this.state = {
      marginLeft: 0,
    }
  }

  componentDidMount() {
    var oldX = 0;
    let _this = this;
    const box = document.getElementById('timeLine');
    const drag = document.getElementById('mask');
    const boxWidth = box.clientWidth;
    const boxOffsetLeft = box.offsetLeft;

    drag.ondragstart = function () { return false; };
    drag.onselectstart = function () { return false; };
    drag.onmousedown = function (e) {
      document.onmousemove = function (e) {
        e.preventDefault();
        e.stopPropagation();
        const offsetWidth = e.target.offsetWidth;
        offsetLeft = e.target.offsetLeft;
        const disX = offsetLeft + offsetWidth;
        const marginLeft = e.clientX - boxOffsetLeft;
        if (marginLeft < 0 || e.clientX+35 > boxWidth+boxOffsetLeft) {
          return;
        }
        _this.setState({
          marginLeft,
        }, ()=>{
  
          if(oldX<_this.state.marginLeft){
            console.log("where is difference" + (_this.state.marginLeft-oldX))
            xDirection = "RIGHT";
            var toAdd = (_this.state.marginLeft-oldX)*timeLeap;
            var nTime =Cesium.JulianDate.addSeconds(viewer.clockViewModel.currentTime,toAdd,new Cesium.JulianDate());
            viewer.clockViewModel.currentTime = nTime;
            console.log('The time is: '+ viewer.clockViewModel.currentTime);
          }
          else{
            xDirection = "LEFT";
            var toSubtract = (oldX - _this.state.marginLeft)*-timeLeap;
            var nTime =Cesium.JulianDate.addSeconds(viewer.clockViewModel.currentTime,toSubtract,new Cesium.JulianDate()); 
            viewer.clockViewModel.currentTime = nTime;
            console.log('The time is: '+ viewer.clockViewModel.currentTime);
           
          
          }
          oldX = _this.state.marginLeft;
          console.log("far right"+_this.state.marginLeft);
          });
      };
      document.onmouseup = function (e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }

  closeVideo() {
    return this.props.closeVideo ? this.props.closeVideo() : null;
  }

  render() {
    const {
      marginLeft
    } = this.state;
    return (
      <div className="TimeLine" id="timeLine">
        <div className="scroll">
          <div className="time">00:00</div>
          <div className="hr"></div><div className="time">06:00</div>
          <div className="hr"></div><div className="time">12:00</div>
          <div className="hr"></div><div className="time">18:00</div>
          <div className="hr"></div><div className="time">24:00</div>
        </div>
        <div className="mark" id="mask" style={{ marginLeft: marginLeft }}></div>
      </div>
    )
  }
}

export default TimeLine;


