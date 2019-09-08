
/**
 * @example
 * Config.MapServer='http://47.100.125.118:8080/mnt/MapTiles';
 * Config.MapServer='http://15.120.17.194:8080/MapTiles';
 */
import Config from '../../config/config'
import CesiumMath from 'cesium/Core/Math'
import Rectangle from 'cesium/Core/Rectangle'

 let mapTilesConfig={
     URL:{
        geoSeverWms:`http://47.100.125.118:8080/geoserver/map/wms`,  
        tdtHpTms:`${Config.MapServer}/tdtHp/tiles/`,   
        tdtShTms:`${Config.MapServer}/tdtSHjpg75/shRange/tiles/`, 
        tdtShTms2:`${Config.MapServer}/tdtSHjpg75/shRange/zj/tiles/`,    
        tdtShjdTms:`${Config.MapServer}/tdtShjd/tiles/`,
        tdtWorldTms:`${Config.MapServer}/tdtWorld/tiles/`//共7级
     },
     RANGE:{
        //上海行政区 矩形范围                                 
        shRectangle:new Rectangle( 
                  CesiumMath.toRadians(120.804167),
                  CesiumMath.toRadians(30.636667),
                  CesiumMath.toRadians(122.034722), 
                  CesiumMath.toRadians(31.942778)
                  ),
        //上海市区 矩形范围
        shCityRectangle:new Rectangle(
                  CesiumMath.toRadians(121.1709595),
                  CesiumMath.toRadians(30.9681893),
                  CesiumMath.toRadians(121.7202759),
                  CesiumMath.toRadians(31.41460028)
                 ),
        //上海市黄浦区的大致矩形范围
        hpRectangle:new Rectangle(
                  CesiumMath.toRadians(121.451667),
                  CesiumMath.toRadians(31.188611),
                  CesiumMath.toRadians(121.513611),
                  CesiumMath.toRadians(31.246667)
            )  
     } 
}
export default mapTilesConfig;


