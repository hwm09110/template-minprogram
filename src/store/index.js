import { createStore } from '@mpxjs/core';
import request from '../request/index';

const store = createStore({
  state: {
    isLogin: false, // 登录标识
    userInfo: wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo') : null, //用户信息
    userWxInfo: wx.getStorageSync('userWxInfo') ? wx.getStorageSync('userWxInfo') : null, //用户微信信息
    token: wx.getStorageSync('token') ? wx.getStorageSync('token') : '', //登录返回的token
    //文件下载配置
    downloadConfigs: {
      token: '',
      upUrl: '',
      downUrl: ''
    },
    //文件上传配置
    uploadConfigs: {
      token: '',
      upUrl: '',
      downUrl: ''
    },
    hasOpenOffNetworkTips: false, // 是否已经弹出断网提示
    isShowOffNetworkTips: false, //请求超时或网络断开标识 true显示 false隐藏
    studentDefaultAvatar: require('../assets/img/icon_head@2x.png') // 默认学生头像
  },
  mutations: {
    // 设置登录标识
    setLoginFlag(state, flag) {
      state.isLogin = flag;
    },
    // 设置token
    setToken(state, token) {
      wx.setStorageSync('token', token);
      state.token = token;
    },
    // 设置用户信息
    setUserInfo(state, info) {
      state.userInfo = info;
    },
    // 设置用户微信信息
    setUserWxInfo(state, info) {
      state.userWxInfo = info;
    },
    //设置文件下载配置信息
    setDownloadInfo(state, info) {
      state.downloadConfigs = {
        token: info.token,
        upUrl: info.upUrl,
        downUrl: info.downUrl
      };
    },
    //设置文件上传配置信息
    setUploadloadInfo(state, info) {
      state.uploadConfigs = {
        token: info.token,
        upUrl: info.upUrl,
        downUrl: info.downUrl
      };
    },
    // 清除/重置 store 里面的state
    resetAllState(state) {
      state.userInfo = null;
      state.userWxInfo = null;
      state.token = '';
      state.isLogin = false;
    },
    // 设置请求超时或网络断开提示标识
    setOffNetworkStatus(state, flag) {
      state.isShowOffNetworkTips = flag;
    }
  },
  getters: {
    userInfo: (state) => state.userInfo
  },
  actions: {
    //获取文件下载配置信息
    getDownloadInfo({ commit }, param) {
      return request.getDownloadToken(param).then((res) => {
        if (res.status === 200) {
          commit('setDownloadInfo', res.message);
        }
      });
    },
    //获取文件上传配置信息
    getUploadloadInfo({ commit }, param) {
      return request.getUploadToken(param).then((res) => {
        if (res.status === 200) {
          commit('setUploadloadInfo', res.message);
        }
      });
    },
    // 获取用户信息
    getUserInfo({ commit }) {
      return request.getUserAccountInfo().then((res) => {
        if (res.status === 200) {
          commit('setUserInfo', res.message);
          wx.setStorageSync('userInfo', res.message);
          return res;
        }
      });
    },
    // 检查用户是否已经登录了
    checkIsLogin({ commit, state }) {
      if (state.isLogin) return state.isLogin;
      return request.checkUserIsLogin().then((res) => {
        const flag = res.status != 401 && res.status != 403 ? true : false;
        console.log('检查用户是否已经登录了>>>', flag, res);
        commit('setLoginFlag', flag);
      });
    }
  }
});

export default store;
