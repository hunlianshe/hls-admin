import Http from '../../../Http/HttpClient';

class HomeActions {
  

    /**
     * post
     * @param  {Function} onSuccess     请求成功回调函数
     * @param  {Function} onFailure     请求失败回调函数
     * @param  {Object} params          请求参数
     * @param  {String} isShowLoading   是否显示正在加载
     */
    getModel(onSuccess, onFailure, params, isShowLoading = '2') {
        Http.get({
            isShowLoading,
            url: 'assert/getModel',
            query: params,
        }, onSuccess, onFailure);
    }
}

export default new HomeActions();