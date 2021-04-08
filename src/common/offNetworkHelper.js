// 断网处理
import store from '../store/index';

// 判断网络是否可用
export function checkNetworkConnect() {
  return new Promise((resolve, reject) => {
    wx.getNetworkType({
      success: (res) => {
        const { networkType } = res;
        resolve(networkType != "none");
      },
      fail: () => {
        resolve(false);
      }
    })
  })
}

// 判断当前是否已经显示了断网提示界面
export function hasOpenOffNetwordTip() {
  return store.state.hasOpenOffNetworkTips;
}

// 显示断网提示界面
export function showOffNetwordTip() {
  store.state.isShowOffNetworkTips = true;
}

// 隐藏断网提示界面
export function hideOffNetwordTip() {
  store.state.isShowOffNetworkTips = false;
}
