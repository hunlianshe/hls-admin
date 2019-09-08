

import React, {
  Component,
} from 'react';

import Cesium from 'cesium/Cesium';
import 'cesium/Widgets/widgets.css';
import './Map.css';

import bigger from '../../public/images/bigger.png';

import TimeBox from '../components/TimeBox/TimeBox';
import VideoBox from '../components/VideoBox/VideoBox';
import TimeLine from "../components/TimeLine/TimeLine";

class MapPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      popVideo: false,
    }

    this.closeVideo = this.closeVideo.bind(this);
  }

  componentDidMount() {
    this.renderCesiumViewer();
  }

  renderCesiumViewer() {

    // var viewer = new Cesium.Viewer('cesiumContainer');

var url='http://47.100.125.118:8080/geoserver/map/wms'; //Geoserver URL   
var viewer = new Cesium.Viewer('cesiumContainer',{  
  shadows : true,
    imageryProvider:new Cesium.WebMapServiceImageryProvider({   
        url : url,         
        layers: 'map:mapg'// 图层名   
    }),  
    // baseLayerPicker:false  // 去掉自带的图层选择器
});


    // var viewer = new Cesium.Viewer('cesiumContainer', {
    //   homeButton: false,
    //   navigationHelpButton: false,
    //   timeline: false,
    //   animation: false,
    //   vrButton: false,
    // });

// var initialPosition = Cesium.Cartesian3.fromDegrees(-74.01881302800248, 40.69114333714821, 753);
// var initialPosition = Cesium.Cartesian3.fromDegrees(121.48, 31.23, 753);
// var initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(21.27879878293835, -21.34390550872461, 0.0716951918898415);
// viewer.scene.camera.setView({
  // destination: initialPosition
  // orientation: initialOrientation
  // endTransform: Cesium.Matrix4.IDENTITY
// });
// 
var tileset = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    // url : 'https://www.langzou.xyz/cesium/Batchedbarrel/tileset.json'
    url : 'http://www.langzou.xyz/cesium/buildings_lab_export/hualun/tileset.json'
    // url : 'http://localhost:8002/buildings_lab_export/hualun/tileset.json'
    // url : 'http://localhost:8002/objTo3d/Batched2/tileset.json'
    // url : 'https://www.langzou.xyz/cesium/Batchedbarrel/tileset.json'
    // url : 'http://localhost:8002/output/Samples/TilesetWithDiscreteLOD/tileset.json'
    // url : 'https://www.langzou.xyz/cesium/tilesets/niuyo/data.json'
    // url : 'http://localhost:8002/tilesets/TilesetWithRequestVolume/tileset.json'
    // url : 'http://localhost:8003/tilesets/TilesetWithExpiration/tileset.json'
    // url : 'http://localhost:8003/tilesets/TilesetWithExpiration/tileset.json'
    // url : 'http://localhost:8003/tilesets/TilesetWithExpiration/tileset.json'
}));
// var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

// handler.setInputAction(function(click){
//   console.log('左键单击事件：',click.position);     
// },Cesium.ScreenSpaceEventType.LEFT_CLICK);

// 
// var tileset1 = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
//   url : 'https:/www.langzou.xyz/cesium/elf/Batched2/tileset.json'
// }));


// var viewModel = {
//   tilesets: [
//       {
//           name: 'Tileset',
//           resource: 'http://localhost:8002/objTo3d/Batched2/tileset.json'
//       },
//   ],
//   selectedTileset: undefined,
//   shadows: true
// };

// Cesium.knockout.track(viewModel);

// viewer.scene.primitives.add(tileset);
// viewer.scene.primitives.add(tileset1);
// tileset.readyPromise.then(function(){
//     var longitude = 121.47;
//     var latitude = 31.229;
//     var height = 0.0;
//     var cartesian = Cesium.Cartesian3.fromDegrees(longitude, latitude, height);
//     var transform = Cesium.Transforms.headingPitchRollToFixedFrame(cartesian, new Cesium.HeadingPitchRoll());
//     tileset._root.transform = Cesium.Matrix4.IDENTITY;
//     tileset.modelMatrix = transform;
//     console.log('tileset',tileset);
//     viewer.zoomTo(tileset, new Cesium.HeadingPitchRange(0.0, -0.5, tileset.boundingSphere.radius / 4.0));
// });

// viewer.zoomTo(tileset)
//     .otherwise(function (error) {
//         console.log(error);
//     });


// viewer.zoomTo(tileset, new Cesium.HeadingPitchRange(0, -0.5, 0));

// var tileset = new Cesium.Cesium3DTileset({ url: "http://localhost:8002/tilesets/TilesetWithRequestVolume/tileset.json" });
// viewer.scene.primitives.add(tileset);
  }

  /** go search page */
  goSearch() {
    this.props.history.push('/searchPage');
  }

  /** pop video box  */
  popVideo() {
    this.setState({
      popVideo: true,
    })
  }

  /** close video box */
  closeVideo() {
    this.setState({
      popVideo: false,
    })
  }

  render() {
    const {
      popVideo,
    } = this.state;
    return (
      <div className="IndexPage">
        <div id="cesiumContainer" className="fullSize"></div>

        { popVideo
          ? <VideoBox 
            closeVideo={this.closeVideo}/>
          : null
        }

        <div className="searchBox" onClick={() => { this.goSearch() }}>
          <input />
          <div className="search-text font-8px">
            <span>搜索</span>
          </div>
        </div>

        <div className="topPanel">
          <div className="title">
            <label>黄埔地理信息平台</label>
          </div>
        </div>

        <div className="leftPanel">
          <div className="info-box height_98">
            <div className="subtitle">实有单位</div>
            <div>建得路9号</div>
          </div>
          <div className="info-box height_98">
            <div className="subtitle">实有单位</div>
            <div>建得路9号</div>
          </div>

          <div className="info-box scroll-panel">
            <div className="subtitle">实有人口</div>
            <div className="scroll-list">
              <div className="info-list">
                <div className="user-name">王大锤</div>
                <div>身份证号：1234567890090</div>
                <div className="address">
                  <div className="address-title">户籍地址：</div>
                  <div>浙江省杭州市下城区天成苑11幢1001</div>
                </div>
              </div>
              <div className="info-list">
                <div className="user-name">王大锤</div>
                <div>身份证号：1234567890090</div>
                <div className="address">
                  <div className="address-title">户籍地址：</div>
                  <div>浙江省杭州市下城区天成苑11幢1001</div>
                </div>
              </div>
              <div className="info-list">
                <div className="user-name">王大锤</div>
                <div>身份证号：1234567890090</div>
                <div className="address">
                  <div className="address-title">户籍地址：</div>
                  <div>浙江省杭州市下城区天成苑11幢1001</div>
                </div>
              </div>
              <div className="info-list">
                <div className="user-name">王大锤</div>
                <div>身份证号：1234567890090</div>
                <div className="address">
                  <div className="address-title">户籍地址：</div>
                  <div>浙江省杭州市下城区天成苑11幢1001</div>
                </div>
              </div>
              <div className="info-list">
                <div className="user-name">王大锤</div>
                <div>身份证号：1234567890090</div>
                <div className="address">
                  <div className="address-title">户籍地址：</div>
                  <div>浙江省杭州市下城区天成苑11幢1001</div>
                </div>
              </div>
              <div className="info-list">
                <div className="user-name">王大锤</div>
                <div>身份证号：1234567890090</div>
                <div className="address">
                  <div className="address-title">户籍地址：</div>
                  <div>浙江省杭州市下城区天成苑11幢1001</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="rightPanel">
          <div className="info-box height_98">
            <div className="subtitle">实有警力</div>
            <div>5人</div>
          </div>
          <div className="video-box height_98">
            <div className="video-show">
              <video width="137" height="73">
                <source src="https://www.runoob.com/try/demo_source/movie.mp4"  type="video/mp4"/>
                <source src="https://www.runoob.com/try/demo_source/movie.ogg"  type="video/ogg"/>
              </video>
            </div>
            <div className="video-info">
              <div className="video-open" onClick={() => { this.popVideo() }}>
                <img src={bigger} />
              </div>
              <div className="video-title">外滩浦发银行3号机位</div>
            </div>
          </div>
          <div className="info-box scroll-panel">
            <div className="subtitle">实有人口</div>
            <div className="scroll-list">
              <div className="info-list">
                <div>身份证号：520202189402027011</div>
                <div className="address">
                  <div className="address-title">户籍地址：</div>
                  <div>浙江省杭州市下城区天成苑11幢1001</div>
                </div>
              </div>
              <div className="info-list">
                <div className="user-name">王大锤</div>
                <div>身份证号：1234567890090</div>
                <div className="address">
                  <div className="address-title">户籍地址：</div>
                  <div>浙江省杭州市下城区天成苑11幢1001</div>
                </div>
              </div>
              <div className="info-list">
                <div className="user-name">王大锤</div>
                <div>身份证号：1234567890090</div>
                <div className="address">
                  <div className="address-title">户籍地址：</div>
                  <div>浙江省杭州市下城区天成苑11幢1001</div>
                </div>
              </div>
              <div className="info-list">
                <div className="user-name">王大锤</div>
                <div>身份证号：1234567890090</div>
                <div className="address">
                  <div className="address-title">户籍地址：</div>
                  <div>浙江省杭州市下城区天成苑11幢1001</div>
                </div>
              </div>
              <div className="info-list">
                <div className="user-name">王大锤</div>
                <div>身份证号：1234567890090</div>
                <div className="address">
                  <div className="address-title">户籍地址：</div>
                  <div>浙江省杭州市下城区天成苑11幢1001</div>
                </div>
              </div>
            </div>
          </div>
          <div className="time">
            <TimeBox />
          </div>
        </div>

        <TimeLine /> */}

        <div className="bottomPanel">
          <div className="bottom-left"></div>
          <div className="bottom-center">
            <ul>
              <li>
                <div className="menu-tip"></div>
                <div>测距</div>
              </li>
              <li>
                <div className="menu-tip"></div>
                <div>3D</div>
              </li>
              <li>
                <div className="menu-tip"></div>
                <div>天气模块</div>
              </li>
              <li>
                <div className="menu-tip"></div>
                <div>标签隐藏</div>
              </li>
              <li>
                <div className="menu-tip"></div>
                <div>底图隐藏</div>
              </li>
              <li>
                <div className="menu-tip"></div>
                <div>时间轴</div>
              </li>
              <li>
                <div className="menu-tip"></div>
                <div>盘旋</div>
              </li>
            </ul>
          </div>
          <div className="bottom-right"></div>
        </div>
      </div>
    )
  }
}

export default MapPage;


