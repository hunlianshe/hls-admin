

import Credit from 'cesium/Core/Credit'
import CesiumMath from 'cesium/Core/Math'
import Rectangle from 'cesium/Core/Rectangle'
import createTileMapServiceImageryProvider from 'cesium/Scene/createTileMapServiceImageryProvider'
import WebMapServiceImageryProvider from 'cesium/Scene/WebMapServiceImageryProvider'
import Config from '../../../config/config'
let  wmsUrl=`http://47.100.125.118:8080/geoserver/map/wms`;   
let  tdtHpTmsUrl=`${Config.MapServer}/tdtHp/tiles/`;    
let  tdtShTmsUrl=`${Config.MapServer}/tdtSHjpg75/shRange/tiles/`;  
let  tdtShTmsUrl2=`${Config.MapServer}/tdtSHjpg75/shRange/zj/tiles/`;     
let  tdtShjdTmsUrl=`${Config.MapServer}/tdtShjd/tiles/`; 
let  tdtWorldTmsUrl=`${Config.MapServer}/tdtWorld/tiles/`; //共7级
 //上海行政区 矩形范围                                 
 let shRectangle=new Rectangle(
          CesiumMath.toRadians(120.804167),
          CesiumMath.toRadians(30.636667),
          CesiumMath.toRadians(122.034722), 
          CesiumMath.toRadians(31.942778));
 //上海市区 矩形范围
 let shCityRectangle=new Rectangle(
         CesiumMath.toRadians(121.1709595),
         CesiumMath.toRadians(30.9681893),
         CesiumMath.toRadians(121.7202759),
        CesiumMath.toRadians(31.41460028));
 //上海市黄浦区的大致矩形范围
 let hpRectangle=new  Rectangle(
        CesiumMath.toRadians(121.451667),
        CesiumMath.toRadians(31.188611),
        CesiumMath.toRadians(121.513611),
        CesiumMath.toRadians(31.246667));                      
;   
let  loadImageryProvider = {
     loadTdtHp:createTileMapServiceImageryProvider({
                    url:tdtHpTmsUrl, 
                    fileExtension:'png',
                    credit:new Credit( '黄浦18级范围瓦片',false),
                    minimumLevel:3,
                    maximumLevel:18,
                    rectangle: hpRectangle
                 }),
     loadTdtSh:createTileMapServiceImageryProvider({
                        url:tdtShTmsUrl,
                        fileExtension:'jpg',
                        credit:new Credit( '上海18级范围jpg75瓦片',false),
                        minimumLevel:9,
                        maximumLevel:18,
                        rectangle: shCityRectangle
                }),
      loadTdtShjd:createTileMapServiceImageryProvider({
                        url:tdtShjdTmsUrl, 
                        fileExtension:'png',
                        credit:new Credit( '上海街道18级矩形范围瓦片',false),
                        minimumLevel:3,
                        maximumLevel:18,
                 }),
      loadTdtWorld:createTileMapServiceImageryProvider({
                        url:tdtWorldTmsUrl,
                        fileExtension:'png',
                        credit:new Credit( '世界7级',false),
                        minimumLevel:1,
                        maximumLevel:7,
              }),
      loadWordWMS:new WebMapServiceImageryProvider({   
                        url : wmsUrl,         
                        layers: 'map:mapg'// 图层名   
                }),                    
}
export default loadImageryProvider;
