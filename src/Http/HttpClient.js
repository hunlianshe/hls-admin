import EventEmitter from 'eventemitter3';
import BrowserHttpClient from './BrowserHttpClient';
import _ from 'lodash';

/**
 *  HttpClient, h5通信模块的封装
 *  @author fanke
 */
class HttpClient extends EventEmitter {
  /**
   * http get 请求
   * @param  {Object} options  原始Get请求参数
   * @param  {function} succ    success callback
   * @param  {function} fail    failure callback
   * @example
   *   {
   *     url: '/assert/getModel?filename=HPDPKZ_sinanlu88nong2hao_16F_1601.xpl2',
   *     query: params,
   *     isShowLoading: '0',
   *   }
   */
  get(options, succ, fail, preHandler) {
    this.preRequestHandler(options, preHandler);

    // 发起http 请求
    BrowserHttpClient.get(options, (nData) => {
      this.preSuccessCallback(options, nData, succ, preHandler);
    }, (failData) => {
      this.preErrorCallback(options, failData, fail, preHandler);
    });
  }

  /**
   * http post 请求
   * @param  {Object} options  原始Post请求参数
   * @param  {function} succ    success callback
   * @param  {function} fail    failure callback
   * @example
   *   {
   *     url: '/mapp/service/public',
   *     query:params1, 可空
   *     body: params2,
   *     isShowLoading: '0',
   *   }
   */
  post(options, succ, fail, preHandler) {
    this.preRequestHandler(options, preHandler);

    // 发起http 请求
    BrowserHttpClient.post(options, (nData) => {
      this.preSuccessCallback(options, nData, succ, preHandler);
    }, (failData) => {
      this.preErrorCallback(options, failData, fail, preHandler);
    });
  }

  /**
   * 请求前处理参数
   * @author fanke
   * @date   2019-05-24
   * @param  {Object}   options    请求参数
   * @param  {Func}   preHandler  预处理函数
   */
  preRequestHandler(options, preHandler) {
    // 请求前处理
    if (preHandler) {
      this.getCustomHandlerResult('preRequest', options, null, preHandler);
    } else {
      this.emit('preRequest', options);
    }
  }

  /**
   * 成功回调处理
   * @author Lisa
   * @date   2019-05-24
   * @param  {Object}   options    请求参数
   * @param  {Object}   nData      成功请求返回参数
   * @param  {Func}   succ       成功处理函数
   * @param  {Func}   preHandler 预处理函数
   */
  preSuccessCallback(options, nData, succ, preHandler) {
      if (preHandler) {
          const handlerResult = this.getCustomHandlerResult('preResponse', null, nData, preHandler);
          if (handlerResult) {
              succ && succ(nData);
          }
      } else {
          this.emit('preResponse', options, nData, null, succ);
      }
  }

  /**
   * 错误回调处理
   * @author Lisa
   * @date   2019-05-24
   * @param  {Object}   options    请求参数
   * @param  {Object}   failData   错误请求返回数据
   * @param  {Func}   fail       错误处理函数
   * @param  {Func}   preHandler 预处理函数
   */
  preErrorCallback(options, failData, fail, preHandler) {
      if (preHandler) {
          const handlerResult = this.getCustomHandlerResult('preResponse', failData, null, preHandler);
          if (handlerResult) {
              fail && fail(failData);
          }
      } else {
          this.emit('preResponse', options, null, failData, fail);
      }
  }

  /**
   * 获取自定义请求结果
   * @param  {String}  type 类型
   * @param {String} err 错误信息
   * @param  {Object} data  需要返回的数据
   * @param  {Func} preHandler 自定义处理请求
   */
  getCustomHandlerResult(type, err, data, preHandler) {
    return preHandler({
      type: type,
      data: data,
      err: err,
    });
  }
}

export default new HttpClient();