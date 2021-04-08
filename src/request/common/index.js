// 公共
import http from '../http'
import { BASICSDOMAIN } from '../../common/apiConfig.js'

// 微信登录接口
const doWechatLogin = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: (res) => {
        var code = res.code
        if (code) {
          resolve(code)
        } else {
          reject(res.errMsg)
        }
      },
      fail: (error) => {
        reject(error)
      }
    })
  })
}

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
  })

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
  })

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
  })

export default {
  doWechatLogin,
  getDownloadToken,
  getUploadToken,
  getAvatarUploadToken
}
