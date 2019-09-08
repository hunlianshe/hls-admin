
import envConfig from './h5-vip-web-env'

let env;
if (process.env.NODE_APP_CWD) {
  env = require(`${process.env.NODE_APP_CWD}/node_modules/@lu/env`)(envConfig);
} else {
  env = require('@lu/env')(envConfig);
}

module.exports = {
  'staticDomain': `${env.STATIC_HOST_HTTPS_URL}`,
  'userWebHostUrl': `${env.USER_WEB_HOST_HTTPS_URL}${env.USER_WEB_CONTEXT_PATH}`,
  'userAppHostUrl': `${env.USER_APP_HOST_URL}${env.USER_APP_CONTEXT_PATH}`,
  'ivipAppHostUrl': `${env.I_VIP_APP_HOST_URL}${env.I_VIP_APP_CONTEXT_PATH}`,
  'vipAppHostUrl': `${env.VIP_APP_HOST_URL}${env.VIP_APP_CONTEXT_PATH}`,

  // 域名
  'domain': env.LUFAX_DOMAIN,

  'sessionSwtchFlag': 'on',
  'sessionAppHostUrl': `${env.SESSION_APP_HOST_URL}${env.SESSION_APP_CONTEXT_PATH}`,
  'cookieTimeoutSeconds': 900,
  // @REVIEW: 经废弃。usercontext 模块中目前都通过 sessionSwtchFlag 开关走 session 服务器，暂时用不到 `env.LUFAX_SALT`
  'shaUserTokenSalt': ``,
  log4js: {
    appenders: [{type: 'console'}]
  },
  'cat': {
    'servers': env.CAT_SERVERS
  },
  'nasClient': {
    'location': `${env.DFS_LOCATION}/nfsc/upload/ies_p2p_share`,
    'get': {
      'retries': 2
    },
    'put': {
      'retries': 2
    }
  }
};

