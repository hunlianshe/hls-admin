

import UploadFile from '../components/uploadFile/uploadFile';
import Hls from '../hls/hls';
import Login from '../components/login/login';
import Register from '../components/register/register';

export default [
  { path: "/", name: "hls", component: Hls, auth: false },
  { path: "/hls", name: "Hls", component: Hls },
  { path: "/uploadFile", name: "UploadFile", component: UploadFile },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
]