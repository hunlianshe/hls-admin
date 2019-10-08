
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
  getUserList: (body) => {
    console.log('body--->', body)
    return axios.post(`${CONFIG.HOST}/users/adminuserlist`, body)
      .then((res) => {
        console.log('users/adminuserlist', res);
        if (res.data.code === 200) {
          return res.data;
        } else {
          console.log(res.msg);
        }
      });
  },

  /** getUserInfo */
  getUserInfo: (openid) => {
    console.log('openid--->', openid)
    return axios.get(`${CONFIG.HOST}/users/getUserInfo?openid=${openid}`)
      .then((res) => {
        if (res.data.code === 200) {
          return res.data;
        } else {
          console.log(res.msg);
        }
      });
  },
}

