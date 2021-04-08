/**
 * 封装http 请求方法
 */
import {
  checkNetworkConnect,
  hasOpenOffNetwordTip,
  showOffNetwordTip,
  hideOffNetwordTip
} from '../common/offNetworkHelper.js';

let redirectToLogin = false;

const http = async (params) => {
  return new Promise((resolve, reject) => {
    let defaultHeader = {
      'Content-Type': 'application/x-www-form-urlencoded', //设置后端需要的常用的格式就好，特殊情况调用的时候单独设置
      token: wx.getStorageSync('token')
        ? wx.getStorageSync('token')
        : 'Basic dXNlci1jbGllbnQ6dXNlci1zZWNyZXQtODg4OA=='
    };

    let reqData = params.data || {};
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    wx.request({
      url: params.url, //服务器url+参数中携带的接口具体地址
      data: reqData, //请求参数
      header: params.header ? Object.assign(defaultHeader, params.header) : defaultHeader,
      method: params.method || 'POST',
      dataType: params.dataType, //返回的数据格式,默认为JSON，特殊格式可以在调用的时候传入参数
      responseType: params.responseType, //响应的数据类型
      success: async function (res) {
        //接口访问正常返回数据
        if (res.statusCode == 200) {
          if (!params.isProxyResponse || params.isProxyResponse == undefined) {
            if (
              res.data.status == '401' ||
              res.data.status == '403' ||
              res.data.status == '2017'
            ) {
              if (!redirectToLogin) {
                redirectToLogin = true;
                wx.reLaunch({
                  url: `/pages/index/login`,
                  complete: () => {
                    redirectToLogin = false;
                  }
                });
              }
              wx.showToast({
                icon: 'none',
                title: res.data.error,
                duration: 2000
              });
            } else if (res.data.status != '200') {
              setTimeout(() => {
                wx.showToast({
                  icon: 'none',
                  title: res.data.error,
                  duration: 2000
                });
              }, 100);
            }
            hideOffNetwordTip(); //隐藏断网提示
          }
          resolve(res.data);
        } else {
          //2. 操作不成功返回数据，以toast方式弹出响应信息，如后端未格式化非操作成功异常信息，则可以统一定义异常提示
          var errMsg = res.data.message;
          console.log(res.data);
        }
      },
      fail: async function (error) {
        handleRequestFail(error);
        reject(error);
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  });
};

// 处理 request fail
async function handleRequestFail(error) {
  const { errMsg } = error;
  if (errMsg.includes('request:fail')) {
    const isNetworkConnect = await checkNetworkConnect();
    console.log('fail isNetworkConnect', isNetworkConnect, hasOpenOffNetwordTip());

    // 网络异常，显示断网提示页面
    if (!isNetworkConnect && !hasOpenOffNetwordTip()) {
      showOffNetwordTip();
    }
  }
}

export default http;
