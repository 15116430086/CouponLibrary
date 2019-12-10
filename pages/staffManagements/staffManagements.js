// pages/staffManagement /staffManagement .js
var utils = require("../../utils/util.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist: {},
    AdministratorsList: {},
    Paging: true,
    pageIndex: 1,
    shopID: "",
    state:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      shopID: options.ShopID
    });
    var datas = {
      pageIndex: this.data.pageIndex,
      pageSize: 5,
      ShopID: this.data.shopID,
      IsShopowner: 1,
      StaffID: app.globalData.AppStaffInfo.StaffID
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/ShopStaff", "POST", datas, app.globalData.appkeyid, this.ShopStaff);
  },
  ShopStaff: function(res) {
    var chat = this;
    var json = res.data.Data;
    if (json.flag) {
      chat.setData({
        AdministratorsList: json.data
      });
    }
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
    if (this.data.Paging) {
      var datas = {
        pageIndex: this.data.pageIndex,
        pageSize: 5,
        ShopID: this.data.shopID,
        IsShopowner: 0
      }
      utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/ShopStaff", "POST", datas, app.globalData.appkeyid, this.ShopStaffList);
    }
  },
  addStaff: function(event) {
    wx.navigateTo({
      url: '../doorScan/doorScan?shopid=' + this.data.shopID,
    })
  },
  addAdministrators: function(event) {
    wx.navigateTo({
      url: '../staffChoose/staffChoose?shopid=' + this.data.shopID,
    })
  },
  Jurisdiction:function(event){//设置权限
    var StaffID = event.currentTarget.dataset.staffid
    wx.navigateTo({
      url: '../thronesManagers/thronesManagers?staffid=' + StaffID + "&shopid=" + this.data.shopID,
    })

  }
})