// 权限相关
import store from '../store/index';

// 检查用户是否登录
export function checkIsAuth() {
  if (!store.state.isLogin) {
    wx.reLaunch({
      url: '/pages/index/login'
    });
    return false;
  }
  return true;
}
