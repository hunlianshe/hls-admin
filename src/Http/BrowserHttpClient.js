import request from 'superagent';
import Config from '../../../config/config';

/**
 * H5环境下HttpClient通信模块
 * @author fanke
 */
class BrowserHttpClient {

  /**
   * 获取url
   * @param       {String} url
   * @return      {String}
   */
  static getUrl(url) {
      if (url.startsWith('http')) {
          return url;
      }
      // return window.location.origin + url; // eslint-disable-line no-undef
    return `${Config.HOST}/${url}`
  }

  /**
   * Http Get方法
   * @param  {Object} options options: {url, query}
   * @param  {function} succ    success callback
   * @param  {function} fail    failure callback
   * @example
   * let getOptions = {
   *   url: '/service/trade/invest-result',
   *   query: {
   *     productId: '123'
   *   },
   *   isShowLoading: '0' // 默认'1'
   * };
   */
  static get(options, succ, fail) {
      request
          .get(this.getUrl(options.url))
          .set('X-Requested-With', 'XMLHttpRequest')
          .withCredentials()
          .query(options.query || {})
          .accept('*/*')
          .timeout(30000)
          .end((err, res) => {
              if (err) {
                  fail(err);
                  return;
              }
              if (res && res.body) {
                  succ(res.body || {});
                  return;
              }
          });
  }

  /**
   * Http Post方法
   * @param  {Object} options options: {url, query}
   * @param  {function} succ    success callback
   * @param  {function} fail    failure callback
   * @example
   * let postOptions = {
   *   url: '/service/trade/invest-check',
   *   query: {
   *     productId: '123'
   *   },
   *   body: {
   *   },
   *   isShowLoading: '0' // 默认'1'
   * };
   */
  static post(options, succ, fail) {
    request
      .post(this.getUrl(options.url))
      .set('X-Requested-With', 'XMLHttpRequest')
      .withCredentials()
      .query(options.query || {})
      .type('form')
      .accept('*/*')
      .send(options.body || {})
      .timeout(30000)
      .end((err, res) => {
        if (err) {
          fail(err);
          return;
        }
        /*
          * http code:
          *   200: 正常
          *     如果httpcode返回200，解析json response中的data中的code和message
          *     code:
          *       0000：正常
          *       2222：登录态失效
          *       9999：通用错误码：解析用“|”分割的字符串，弹出对话框，并根据jumpcode，进行跳转
          *   401：登录态失效
          *   555：运维公告
          *   403：签名信息失败
          *   default：弹toast
          */
        if (res && res.body) {
          succ(res.body || {});
          return;
        }
    });
  }
}

export default BrowserHttpClient;