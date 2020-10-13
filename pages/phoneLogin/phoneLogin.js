// pages/phoneLogin/phoneLogin.js
var utils = require("../../utils/util.js")
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    code: "",
    phonelength: 0,
    codelength: 0,
    time: 60,
    isCode: true,
    sendMes: "发送验证码"
  },

  //手机号码
  phoneinput: function (e) {
    let that = this;
    that.setData({
      phone: e.detail.value,
      phonelength: e.detail.value.length
    })
  },
  //验证码
  codeinput: function (e) {
    let that = this;
    that.setData({
      code: e.detail.value,
      codelength: e.detail.value.length
    })
  },
  //发送验证码
  sendCode(e) {
    if (this.data.phone == "") {
      wx.showToast({
        title: '请输入手机号码!',
        icon: "none",
        duration: 2000
      })
      return;
    }
    if (this.data.phonelength != 11) {
      wx.showToast({
        title: '请输入11位数的手机号码!',
        icon: "none",
        duration: 2000
      })
      return;
    }
    var Phones = this.data.phone;
    var data = {
      Phone: Phones
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/LoginView/Getverificationcode", "POST", data, app.globalData.appkeyid, this.Getverificationcode)
  },

  Getverificationcode: function (res) {
    var chat = this;
    var json = res.data.Data;
    if (json.flag) {
      let promise = new Promise((resolve, reject) => {
        let setTimer = setInterval(
          () => {
            chat.setData({
              isCode: false,
              time: chat.data.time - 1
            })
            if (chat.data.time <= 0) {
              chat.setData({
                time: 60,
                isCode: true,
                sendMes: "重新发送"
              })
              resolve(setTimer)
            }
          }, 1000)
      })
      promise.then((setTimer) => {
        clearInterval(setTimer)
      })

    } else {
      wx.showToast({
        title: json.msg,
        icon: "none",
        duration: 3000
      })

    }
  },

  isConfirmLogin: function () {
    let that = this;
    if (that.data.phone == "") {
      wx.showToast({
        title: '请输入手机号码!',
        icon: "none",
        duration: 2000
      })
      return;
    }
    if (that.data.phonelength != 11) {
      wx.showToast({
        title: '请输入11位数的手机号码!',
        icon: "none",
        duration: 2000
      })
      return;
    }
    if (that.data.code == "") {
      wx.showToast({
        title: '请输入验证码!',
        icon: "none",
        duration: 2000
      })
      return;
    }
    if (that.data.codelength != 4) {
      wx.showToast({
        title: '请输入4位数的验证码!',
        icon: "none",
        duration: 2000
      })
      return;
    }
    wx.showLoading({
      title: '数据加载中...',
    })
    wx.login({
      success: res => {
        let that = this;
        // 发送 res.code 到后台换取 openId, sessionKey, unionId      
        app.globalData.logincode = res.code;
        wx.getUserInfo({
          success: res => {
            // 登录
            var detail = res;
            if (detail.errMsg == "getUserInfo:ok") {
              app.globalData.userInfo = res.userInfo
              var data = {};
              data.Text = detail.encryptedData;
              data.AesIV = detail.iv;
              data.code = app.globalData.logincode;
              data.pHoneNumber = that.data.phone;
              data.pCheckCode = that.data.code;
              data.AppId = app.globalData.sysaAppid;
              utils.AjaxRequest(app.globalData.apiurl + "CouponView/LoginView/GetWxPhoneNumbeLogin", "POST", data, app.globalData.appkeyid, that.GetPhoneNumbeLoginBack)
            }
          }
        })
      }
    })
  },

  onPhoneLoginTap: function (res) {
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
          data.AppId = app.globalData.sysaAppid;
          utils.AjaxRequest(app.globalData.apiurl + "CouponView/LoginView/GetWxLoginAuth", "POST", data, app.globalData.appkeyid, that.GetPhoneNumbeLoginBack)
        }
      })
    }
  },
  GetPhoneNumbeLoginBack: function (json) {
    console.log(json);
    wx.hideLoading();
    var json = json.data.Data;
    if (json) {
      console.log(json.msg);
      if (json.flag) {
        wx.setStorageSync('miniappkeyid', json.data)
        var appkeyid = wx.getStorageSync('miniappkeyid');
        if (appkeyid && appkeyid.FSessionKey && appkeyid.FContent) {
          app.globalData.appkeyid = appkeyid.FSessionKey;
          var loginInfo = JSON.parse(appkeyid.FContent);
          app.globalData.AppWxUserInfo = loginInfo.AppWxUserInfo;
          app.globalData.AppStaffInfo = loginInfo.AppStaffInfo;
          app.globalData.AppGroupInfo = loginInfo.AppGroupInfo;
          app.globalData.AppShopInfo = loginInfo.AppShopInfo;
          if (loginInfo.AppGroupInfo.GroupID == loginInfo.AppGroupInfo.AffiliatedGroupID) {
            wx.reLaunch({
              url: '../newHome/newHome',
            })
          } else {
            wx.reLaunch({
              url: '../home/home',
            })
          }
        }
      } else {
        if (json.state == 3) {
          wx.showModal({
            title: '登录失败',
            content: json.msg,
            success: function (res) {
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
            showCancel: false,
            content: json.msg,
            success: function (res) {
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
  onLoad: function (options) {
    this.setData({
      proname: app.globalData.sysName
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})