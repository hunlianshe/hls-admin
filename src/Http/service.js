
import axios from 'axios';
import CONFIG from '../../config/config';

axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;

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

  /** getListLikes */
  getListLikes: (body) => {
    const token = sessionStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

    return axios.post(`${CONFIG.HOST}/users/listLikes`, body)
      .then((res) => {
        console.log('users/listLikes', res);
        if (res.data.code === 200) {
          return res.data;
        } else {
          console.log(res.msg);
        }
      });
  },

  /** getUserInfo */
  getUserInfo: (openid) => {
    const token = sessionStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    
    console.log('openid--->', openid)
    return axios.get(`${CONFIG.HOST}/users/getUserInfo/${openid}`)
      .then((res) => {
        if (res.data.code === 200) {
          return res.data;
        } else {
          console.log(res.msg);
        }
      });
  },

  /** adminlogin */
  adminlogin: (body = {}) => {
    console.log('body--->', body);
    return axios.post(`${CONFIG.HOST}/users/adminlogin`, body)
      .then((res) => {
        if (res.data.code === 200) {
          return res.data;
        } else {
          console.log(res.msg);
        }
      });
  },

  /** adminlogin */
  getTestList: () => {
    const token = sessionStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

    return axios.get(`${CONFIG.HOST}/psychological-test/list`)
      .then((res) => {
        if (res.data.code === 200) {
          return res.data;
        } else {
          console.log(res.msg);
        }
      });
  },

}

