import fs from 'fs'
import path from 'path'

const env = process.env
let tag

try {
  tag = fs.readFileSync(path.join(process.cwd(), 'ver.txt'), 'utf8').replace('\n', '')
} catch (e) {
} finally {
  tag = tag || 'NO_TAG'
}

export default {
  'appenders': [{
    'type': 'console'
  }, {
    'type': 'dateFile',
    'filename': `${env.NODE_LOGS_DIR}${env.NODE_APP_NAME}.log`,
    'pattern': '-yyyy-MM-dd.log',
    'alwaysIncludePattern': false,
    // 'layout': {
    //   type: 'pattern',
    //   pattern: 'd{yyyy-MM-dd HH:mm:ss SSS} [%-5p] [%t] [Lid:%X{Lid}] [${app.tag}] %c{3} - %m%n'
    // },
    'category': ['h5-vip-web', 'cat-client']
  }, {
    'level': 'WARN',
    'type': 'logLevelFilter',
    'appender': {
      'type': 'dateFile',
      'filename': `${env.NODE_LOGS_DIR}${env.NODE_APP_NAME}.warn.log`,
      'pattern': '-yyyy-MM-dd.log',
      'alwaysIncludePattern': false
    }
  }, {
    'type': 'dateFile',
    'filename': `${env.NODE_LOGS_DIR}${env.NODE_APP_NAME}.3rdParty.log`,
    'pattern': '-yyyy-MM-dd.log',
    'alwaysIncludePattern': false,
    // 'layout': {
    //   type: 'pattern',
    //   pattern: 'd{yyyy-MM-dd HH:mm:ss SSS} [%-5p] [%t] [Lid:%X{Lid}] [${app.tag}] %c{3} - %m%n'
    // },
    'category': ['cat-client']
  }, {
    'type': 'dateFile',
    'filename': `${env.NODE_LOGS_DIR}${env.NODE_APP_NAME}.remote.log`,
    'pattern': '-yyyy-MM-dd.log',
    'alwaysIncludePattern': false,
    // 'layout': {
    //   type: 'pattern',
    //   pattern: 'd{yyyy-MM-dd HH:mm:ss SSS} [%-5p] [%t] [Lid:%X{Lid}] [${app.tag}] %c{3} - %m%n'
    // },
    'category': ['bunker']
  }]
}
