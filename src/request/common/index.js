// 公共
import http from '../http';
import { BASICSDOMAIN, LOGINDOMAIN } from '../../common/apiConfig.js';

// 微信登录接口
const doWechatLogin = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: (res) => {
        var code = res.code;
        if (code) {
          resolve(code);
        } else {
          reject(res.errMsg);
        }
      },
      fail: (error) => {
        reject(error);
      }
    });
  });
};

//获取下载token
const getDownloadToken = (param) =>
  http({
    url: BASICSDOMAIN + '/file/url',
    method: 'get',
    data: param,
    header: {
      'Content-Type': 'application/json;charset=UTF-8',
      'X-AUTH-TOKEN': wx.getStorageSync('token')
        ? wx.getStorageSync('token')
        : 'Basic dXNlci1jbGllbnQ6dXNlci1zZWNyZXQtODg4OA=='
    }
  });

//获取上传token
const getUploadToken = (param) =>
  http({
    url: BASICSDOMAIN + '/file/upload/token',
    method: 'get',
    data: param,
    header: {
      'Content-Type': 'application/json;charset=UTF-8',
      'X-AUTH-TOKEN': wx.getStorageSync('token')
        ? wx.getStorageSync('token')
        : 'Basic dXNlci1jbGllbnQ6dXNlci1zZWNyZXQtODg4OA=='
    }
  });

//获取头像上传token
const getAvatarUploadToken = (param) =>
  http({
    url: BASICSDOMAIN + '/file/upload/header/token',
    method: 'get',
    data: param,
    header: {
      'Content-Type': 'application/json;charset=UTF-8',
      'X-AUTH-TOKEN': wx.getStorageSync('token')
        ? wx.getStorageSync('token')
        : 'Basic dXNlci1jbGllbnQ6dXNlci1zZWNyZXQtODg4OA=='
    }
  });

// 获取头像接口
// personId:学生id ，type：1学生2家长3老师  thumbnail： 1\2\3  【1:100*100 2:140*140 3:200*200】
const getPersonalAvatarUrl = (id, type, thumbnail = 3) =>
  `${BASICSDOMAIN}/file/stu/avatar?personId=${id}&type=${type}&thumbnail=${thumbnail}`;

//发送短信
const getPhoneMessage = (param, url) =>
  http({
    url: BASICSDOMAIN + '/user/sendMsg',
    method: 'post',
    data: param
  });

//微信登录
const doLoginByWechat = (param) =>
  http({
    url: LOGINDOMAIN + '/authentication/login/wechatMiniapp',
    method: 'post',
    data: param
  });

// 教师绑定
const bindTeacherAccount = (param) =>
  http({
    url: BASICSDOMAIN + '/user/bind/teacher',
    method: 'put',
    data: param
  });

// 教师解绑
const unbindTeacherAccount = (param) =>
  http({
    url: BASICSDOMAIN + '/user/unbind',
    method: 'put',
    data: param
  });

// 获取用户信息
const getUserAccountInfo = (param) =>
  http({
    url: BASICSDOMAIN + '/user',
    method: 'get',
    data: param
  });

// 获取教师为班主任的班级列表
const getClassListOfMasterTeacher = (param) =>
  http({
    url: BASICSDOMAIN + '/teacher/handMasterClass',
    method: 'get',
    data: param
  });

// 查询单个学生的家长接口
const getStudentParentByTea = (param) =>
  http({
    url: BASICSDOMAIN + '/parent/querySingle',
    method: 'get',
    data: param
  });

// 检查用户是否已经登录（通过调用拉取用户信息接口返回的响应来判断）
const checkUserIsLogin = (param) =>
  http({
    url: BASICSDOMAIN + '/user',
    method: 'get',
    data: param,
    isProxyResponse: true // 单独处理响应
  });

export default {
  doWechatLogin,
  getDownloadToken,
  getUploadToken,
  getAvatarUploadToken,
  getPersonalAvatarUrl,
  getPhoneMessage,
  doLoginByWechat,
  bindTeacherAccount,
  unbindTeacherAccount,
  getUserAccountInfo,
  getClassListOfMasterTeacher,
  getStudentParentByTea,
  checkUserIsLogin
};
