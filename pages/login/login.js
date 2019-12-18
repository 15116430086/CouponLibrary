// pages/login/login.js
var utils = require("../../utils/util.js")
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    itemImage: [{
        image: "/static/images/1.png",
        title: "发券引流",
        span: "向平台商户或指定商户发券引流消费者"
      },
      {
        image: "/static/images/2.png",
        title: "推券赚钱",
        span: "本商户会员大数据变现跨界赚钱"
      },
      {
        image: "/static/images/3.png",
        title: "提升会员权益",
        span: "引入联盟商资源提升本店会员权益"
      },
      {
        image: "/static/images/4.png",
        title: "区域消费闭环",
        span: "联合周边商户共同打造会员消费闭环"
      },
    ]
  },
  onMerchantRegTap: function() {
    wx.getUserInfo({
      success: res => {
        // 登录
        var detail = res;
        if (detail.errMsg == "getUserInfo:ok") {
          app.globalData.userInfo = res.userInfo
          wx.reLaunch({
            url: '../merchantReg/merchantReg',
          })
        }
      }
    })

  },
  onPhoneLoginTap: function(res) {
    wx.reLaunch({
      url: '../phoneLogin/phoneLogin',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success(res) {
              that.getLocation();
            }
          })
        } else {
          that.getLocation();
        }
      }
    })

    var industry = wx.getStorageSync('Industry');
    var region = wx.getStorageSync('Region');
    if (!region || !industry) {
      utils.GetRegionIndustry(app.globalData.apiurl + "CouponView/LoginView/GetRegionIndustry", "POST", app.globalData.appkeyid)
    }

  },

  GetGeocoderBack: function(res) {
    app.globalData.regionName = res[0].ad_info.district
    var appkeyid = wx.getStorageSync('miniappkeyid');
    if (appkeyid && appkeyid.FSessionKey && appkeyid.FContent) {
      app.globalData.appkeyid = appkeyid.FSessionKey;
      var loginInfo = JSON.parse(appkeyid.FContent);
      app.globalData.AppWxUserInfo = loginInfo.AppWxUserInfo;
      app.globalData.AppStaffInfo = loginInfo.AppStaffInfo;
      app.globalData.AppGroupInfo = loginInfo.AppGroupInfo;
      app.globalData.AppShopInfo = loginInfo.AppShopInfo;
        wx.reLaunch({
          url: '../home/home',
        })
    }
    console.log(JSON.stringify(res));
  },

  getLocation: function() {
    //显示 加载中的提示
    wx.showLoading({
      title: '正在获取你的地理位置...',
    })
    let that = this;
    wx.getLocation({
      type: 'gcj02',
      altitude: true,
      isHighAccuracy: true,
      success(res) {
        console.log(JSON.stringify(res));
        app.globalData.latitudeX = res.latitude
        app.globalData.longitudeY = res.longitude

        utils.reverseGeocoder(res.latitude, res.longitude, that.GetGeocoderBack)
      },
      complete(res) {
        //隐藏 加载中的提示
        wx.hideLoading();
      }
    })
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