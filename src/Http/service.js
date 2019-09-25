
import axios from 'axios';
import CONFIG from '../../config/config';


axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true

export default {
  getModel: (filename) => {
    return axios.get(`${CONFIG.HOST}/assert/getModel?filename=` + filename)
      .then((res) => {
        return res.data.data;
      });
  },
  register: (data) => {
    return axios.post(`${CONFIG.HOST}/user/register`, data)
      .then((res) => {
        return res.data;
      });
  },

  login: (data) => {
    return axios.post(`${CONFIG.HOST}/user/login`, data)
      .then((res) => {
        return res.data;
      });
  },

  getHouse: (id) => {
    return axios.get(`${CONFIG.HOST}/assert/gethouse?id=` + id)
      .then((res) => {
        if (!res.data.data) {
          return axios.get(`${CONFIG.HOST}/assert/gethouse`)
            .then((res2) => {
              return res2.data.data;
            });
        } else {
          return res.data.data;
        }
      });
  },

  /** 实有单位tab */
  getSydwList: (data) => {
    return axios.post(`${CONFIG.HOST}/assert/sydw`, data)
      .then((res) => {
        console.log("getSydwList -->",res.data)
        if (res.data.code === 200) {
          return res.data.data;
        } else {
          console.log(res.msg);
        }
      });
  },

  /** 实有单位聚合总数据 */
  getSydwGroup: (data) => {
    return axios.get(`${CONFIG.HOST}/assert/sydwgroup`, data)
      .then((res) => {
        console.log('res',res)
        if (res.data.code === 200) {
          return res.data.data;
        } else {
          console.log(res.msg);
        }
      });
  },

   /** 实有房屋聚合总数据 */
   getSyfwGroup: (data) => {
    return axios.get(`${CONFIG.HOST}/assert/syfwgroup`, data)
      .then((res) => {
        console.log('res',res)
        if (res.data.code === 200) {
          return res.data.data;
        } else {
          console.log(res.msg);
        }
      });
  },


   /** 实有人口聚合总数据 */
   getSyrkGroup: (data) => {
    return axios.get(`${CONFIG.HOST}/assert/syrkgroup`, data)
      .then((res) => {
        console.log('res',res)
        if (res.data.code === 200) {
          return res.data.data;
        } else {
          console.log(res.msg);
        }
      });
  },




  /** 获取实有单位派出所数据 */
  getSydwPcs: () => {
    return axios.get(`${CONFIG.HOST}/assert/sydwPcs`)
      .then((res) => {
        if (res.data.code === 200) {
          return res.data.data;
        } else {
          console.log(res.msg);
        }
      });
  },

  /** 实有房屋tab */
  getSyfwList: (data) => {
    return axios.post(`${CONFIG.HOST}/assert/syfw`, data)
      .then((res) => {
        if (res.data.code === 200) {
          // console.log("syfwFilter -->",res.data);
          return res.data.data;
        } else {
          console.log(res.msg);
        }
      });
  },

  /** 获取实有房屋街道数据 */
  getSyfwJdmc: () => {
    return axios.get(`${CONFIG.HOST}/assert/syfwJdmc`)
      .then((res) => {
        if (res.data.code === 200) {
          return res.data.data;
        } else {
          console.log(res.msg);
        }
      });
  },

  /** 获取实有房屋居委数据 */
  getSyfwJcwmc: () => {
    return axios.get(`${CONFIG.HOST}/assert/syfwJcwmc`)
      .then((res) => {
        if (res.data.code === 200) {
          return res.data.data;
        } else {
          console.log(res.msg);
        }
      });
  },

  /** 实有人口tab */
  getSyrkList: (data) => {
    return axios.post(`${CONFIG.HOST}/assert/syrk`, data)
      .then((res) => {
        if (res.data.code === 200) {
          return res.data.data;
        } else {
          console.log(res.msg);
        }
      });
  },

  /** 实有警力 tab */  
  getSyjlApi: () => {
    return axios.get(`${CONFIG.HOST}/proxy/gps/HpgpsAlarm/api/trace/gpstypetwo?min=15&num=150`)
      .then((res) => {
        if (res.data.code === 200) {
          return res.data.data;
        } else {
          console.log(res.msg);
        }
      });
  },





  /** 实有警情    统计各个类别警情(年)  tab */
  getSyjqApiCountSjdYear: () => {
    return axios.get(`${CONFIG.HOST}/proxy/jingqing/third/countSjdYear?ssxqdm=&year=2019`)
      .then((res) => {
        if (res.data.code === 200) {
          return res.data.data;
        } else {
          console.log(res.msg);
        }
      });
  },


  /** 实有警情    统计各个类别警情(月)  tab */
  getSyjqApiCountSjdMonth: (currentMonth) => {
    return axios.get(`${CONFIG.HOST}/proxy/jingqing/third/countSjdMonth?ssxqdm=&month=${currentMonth}`)
      .then((res) => {
        if (res.data.code === 200) {
          return res.data.data;
        } else {
          console.log(res.msg);
        }
      });
  },  


  /** 实有警情    分页获取当天某个区域的警情 tab */
  getSyjqApiSjdDay: () => {
    return axios.get(`${CONFIG.HOST}/proxy/jingqing/third/SjdDay?ssxqdm=310101000000&page=1&pageSize=10&num=1`)
      .then((res) => {
        if (res.data.code === 200) {
          return res.data.data;
        } else {
          console.log(res.msg);
        }
      });
  },    

  /** 实有警情    分页获取一个月某个区域的警情 tab */
  getSyjqApiSjdMonth: () => {
    return axios.get(`${CONFIG.HOST}/proxy/jingqing/third/SjdMonth?month=2019-01&ssxqdm=310101000000&page=1&pageSize=10&jqlbmc=%E8%AD%A6%E5%8A%A1%E6%B1%82%E5%8A%A9`)
      .then((res) => {
        if (res.data.code === 200) {
          return res.data.data;
        } else {
          console.log(res.msg);
        }
      });
  },   

  /** 实有警情    分页获取一年某个区域的警情 tab */
  getSyjqApiSjdYear: () => {
    return axios.get(`${CONFIG.HOST}/proxy/jingqing/third/SjdYear?ssxqdm=310101000000&page=1&pageSize=10&year=2019&jqlbmc=%E8%AD%A6%E5%8A%A1%E6%B1%82%E5%8A%A9`)
      .then((res) => {
        if (res.data.code === 200) {
          return res.data.data;
        } else {
          console.log(res.msg);
        }
      });
  },   

  /** 实有警情    最新警情 tab */
  getSyjqApiNewSjd: () => {
    return axios.get(`${CONFIG.HOST}/proxy/jingqing/third/newSjd?ssxqdm=310101000000`)
      .then((res) => {
        if (res.data.code === 200) {
          return res.data.data;
        } else {
          console.log(res.msg);
        }
      });
  },   

  /** 模型元数据 */
  getModelMetadata: (data) => {
    return axios.post(`${CONFIG.HOST}/assert/model-metadata`, data)
      .then((res) => {
        if (res.data.code === 200) {
          return res.data.data;
        } else {
          console.log(res.msg);
        }
      });
  },

  //获取当前模型的所有楼层名 ->[1,2，3，4]
  getAllFloorArry:(floorName)=>{
  return axios.get(`${CONFIG.HOST}/model/floorNumber?filename=${floorName}`).then((res) => {
      if(res.status===200){
        return res;
      }
    })
  },

  /**获取当前模型所有需要隐藏的分层分户的房间名字 */
  getAllHiddenHoseName:(param)=>{
    return axios.get(`${CONFIG.HOST}/model/houseshidden?filename=${param.floorName}`).then((res) => {
      if (res.status === 200) {
        return res;
      } else {
        console.log(res.msg);
      }
    });
  },

  /** pipeline */
  getConvertModel: () => {
    return axios.get(`${CONFIG.HOSTPipeline}/convertModel`).then((res) => {
      if (res.status === 200) {
        return res;
      } else {
        console.log(res.msg);
      }
    });
  },

  /** userList */
  getUserList: (id) => {
    return axios.post(`${CONFIG.HOST}/users/listUsers`, id)
      .then((res) => {
        console.log('getUserList', res);
        if (res.code === 200) {
          return res.data.data;
        } else {
          console.log(res.msg);
        }
      });
  },
}

