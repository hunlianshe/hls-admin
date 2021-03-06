

import UploadFile from '../../components/uploadFile/uploadFile';
import Index from '../index/index';
import Login from '../../components/login/login';
// import Register from '../../components/register/register';
import UserList from '../../hls/index/components/userList/userList';
import UserDetail from '../../hls/index/components/userDetail/userDetail';
import LikeListDetail from '../../hls/index/components/likeListDetail/likeListDetail';

export default [
  { path: "/", name: "Index", component: Index, auth: true },
  { path: "/index", name: "Index", component: Index, auth: true },
  { path: "/uploadFile", name: "UploadFile", component: UploadFile, auth: true },
  { path: "/login", name: "Login", component: Login },
  // { path: "/register", name: "Register", component: Register },
  { path: "/userDetail/:id", name: "UserDetail", component: UserDetail, auth: true },
  { path: "/userList", name: "UserList", component: UserList, auth: true },
  { path: "/likeListDetail/:id/:type", name: "likeListDetail", component: LikeListDetail, auth: true },
]