// pages/phoneLogin/phoneLogin.js
var utils = require("../../utils/util.js")
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },


  onPhoneLoginTap: function(res) {
    // 登录
    var detail = res.detail;
    if (detail.errMsg == "getPhoneNumber:ok") {
      // 登录
      wx.login({
        success: res => {
          let that = this;
          // 发送 res.code 到后台换取 openId, sessionKey, unionId      
          app.globalData.logincode = res.code;
          var data = {};
          data.Text = detail.encryptedData;
          data.AesIV = detail.iv;
          data.code = res.code
          utils.AjaxRequest(app.globalData.apiurl + "CouponView/LoginView/GetWxPhoneNumbeLogin", "POST", data, app.globalData.appkeyid, that.GetPhoneNumbeLoginBack)
        }
      })

    }
  },
  GetPhoneNumbeLoginBack: function(json) {
    console.log(json);
    var json = json.data.Data;
    if (json) {
      console.log(json.msg);
      if (json.flag) {
        wx.setStorageSync('appkeyid', json.data)
        var appkeyid = wx.getStorageSync('appkeyid');
        if (appkeyid) {
          app.globalData.appkeyid = appkeyid.FSessionKey;
          var loginInfo = JSON.parse(appkeyid.FContent);
          app.globalData.AppWxUserInfo = loginInfo.AppWxUserInfo;
          app.globalData.AppStaffInfo = loginInfo.AppStaffInfo;
          app.globalData.AppGroupInfo = loginInfo.AppGroupInfo;
          wx.reLaunch({
            url: '../home/home',
          })
        }
      } else {
        if (json.state == 3) {
          wx.showModal({
            title: '登录失败',
            content: json.msg ,            
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')
                wx.reLaunch({
                  url: '../login/login',
                })
              }
            }
          })
        } else {
          wx.showModal({
            title: '登录失败',
            showCancel:false,
            content: json.msg ,
            success: function(res) {
              if (res.confirm) {
                console.log('用户点击确定')               
              }
            }
          })
        }
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})