

/**
 * @author liyj
 * @creationTime 2019-09-03
 * @README 调用地图瓦片的通用方法
 */
import Credit from 'cesium/Core/Credit'
import Rectangle from 'cesium/Core/Rectangle'
import createTileMapServiceImageryProvider from 'cesium/Scene/createTileMapServiceImageryProvider'
import WebMapServiceImageryProvider from 'cesium/Scene/WebMapServiceImageryProvider'
import mapTilesConfig from './mapTilesConfig'
let  loadImageryProvider={
    loadTmsProvider:function(tmsUrl,minLevel,maxLevel,rectangle,format,creditText){
        debugger;
         return createTileMapServiceImageryProvider({
                url:tmsUrl,     
                minimumLevel:minLevel,
                maximumLevel:maxLevel,
                rectangle: rectangle?rectangle:Rectangle.MAX_VALUE,
                fileExtension:format, 
                credit:creditText?creditText:'',
         })
    },
    loadWMSProvider:function(wmsUrl,layerName) {
        return  new WebMapServiceImageryProvider({   
                    url : wmsUrl,
                    // 图层名       
                    layers: layerName?layerName:'map:mapg'
              })  
     },
    getDefaultProviders:function(){
        let imageryProviders=[];
        let world7= createTileMapServiceImageryProvider({
            url:mapTilesConfig.URL.tdtWorldTms,
            fileExtension:'png',
            credit:new Credit( '世界7级',false),
            minimumLevel:1,
            maximumLevel:7,
            });
        imageryProviders.push(world7);
        let tdtHp=createTileMapServiceImageryProvider({
                url:mapTilesConfig.URL.tdtShTms,
                fileExtension:'jpg',
                credit:new Credit( '上海18级范围jpg75瓦片',false),
                minimumLevel:9,
                maximumLevel:18,
                rectangle:mapTilesConfig.RANGE.shCityRectangle
            });
        imageryProviders.push(tdtHp);
        return imageryProviders;
    }
 }
export default loadImageryProvider;