

import React, {
  Component,
} from 'react';

import './FloorSelector.css';

class FloorSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {

  }
  showFloorInner(floor){
     this.props.getFloor(floor);
  }
  close() {
    return this.props.close ? this.props.close() : null;
  }

  render() {
    // let obj={props:this.props}
    // alert(JSON.stringify(obj));
     let getFloorList=(floorArry)=>{
         let res=[];
         for(let i=floorArry.length-1;i>=0;i--){
           res.push(  <li key={i} onClick={() => { this.showFloorInner(floorArry[i]) }}><a >{floorArry[i]}F</a></li>)
         }
         return res;
     }
     return(
       <div className="FloorSelector" id='floorSelector'>
           <div className="floorNoContainer" >
              <ul>
                {getFloorList( this.props.floorArry)}
              </ul>
            </div>
        <div></div>
       </div>
     )
  }
}

export default FloorSelector;
