// pages/shopDetail/shopDetail.js
let utils = require("../../utils/util.js")
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "日期",
    hidden: false,
    currentDate: new Date().getTime(),
    minDate: new Date('2020/01/01').getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    show: false,
    datatime: "",
    valuetime: "",
    types: 1,
    DataList: [],
    DataList2: [],
    ststics: 0,
    titleName: "请输入券名称",
    search: "",
    searchTime: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    if (options.types == 2) {
      this.setData({
        titleName: "请输入店名称"
      });
    }
    this.setData({
      datatime: options.time == '日期' ? '' : options.time,
      valuetime: options.name,
      types: options.types
    });
  },

  UserQuery: function () {
    wx.showLoading({
      title: '数据加载中...',
    })
    var data = {
      Bingtime: this.data.valuetime,
      Time: this.data.datatime,
      pGroupID: app.globalData.AppGroupInfo.GroupID,
      type: this.data.ststics,
      ShopName: this.data.search
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/withdrawalAccountView/GetUserList", "POST", data, app.globalData.appkeyid, this.GetUserList)
  },

  GetUserList: function (res) {
    wx.hideLoading();
    var json = res.data.Data;
    var chat = this;
    chat.setData({
      DataList: json.data,
      searchTime: json.datetime
    });
  },


  CouponQuery: function () {
    wx.showLoading({
      title: '数据加载中...',
    })
    var data = {
      Bingtime: this.data.valuetime,
      Time: this.data.datatime,
      pGroupID: app.globalData.AppGroupInfo.GroupID,
      type: this.data.ststics,
      CouponName: this.data.search
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/withdrawalAccountView/GetCouponList", "POST", data, app.globalData.appkeyid, this.GetCouponList)
  },
  GetCouponList: function (res) {
    wx.hideLoading();
    var json = res.data.Data;
    var chat = this;
    chat.setData({
      DataList2: json.data,
      searchTime: json.datetime
    });
  },
  username: function (event) {
    this.setData({
      search: event.detail.value
    });
  },
  seacrh: function () {
    if (this.data.types == 1) {
      this.UserQuery();
    } else {
      this.CouponQuery();
    }
  },
  // 显示日期
  showTime(e) {
    let that = this;
    that.setData({
      show: true,
      hidden: true
    });
  },

  // 日期选择
  confirmDate(e) {
    console.log(e.detail);
    let that = this;
    let timer = e.detail;
    timer = utils.formatTimeyears(timer);
    console.log(timer)
    that.setData({
      date: timer,
      show: false,
      hidden: false,
      ststics: 1,
      datatime: timer
    })
    if (that.data.types == 1) {
      that.UserQuery();
    } else {
      that.CouponQuery();
    }
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
    if (this.data.types == 1) {
      this.UserQuery();
    } else {
      this.CouponQuery();
    }

  },
  onClose() {
    this.setData({
      show: false
    })
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