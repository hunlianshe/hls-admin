

import UploadFile from '../../components/uploadFile/uploadFile';
import Index from '../index/index';
import Login from '../../components/login/login';
// import Register from '../../components/register/register';
import UserList from '../../hls/index/components/userList/userList';
import UserDetail from '../../hls/index/components/userDetail/userDetail';

export default [
  { path: "/", name: "Index", component: Index, auth: false },
  { path: "/index", name: "Index", component: Index },
  { path: "/uploadFile", name: "UploadFile", component: UploadFile },
  { path: "/login", name: "Login", component: Login },
  // { path: "/register", name: "Register", component: Register },
  { path: "/userDetail/:id", name: "UserDetail", component: UserDetail },
  { path: "/userList", name: "UserList", component: UserList },
]