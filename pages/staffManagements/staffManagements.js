// pages/staffManagement /staffManagement .js
var utils = require("../../utils/util.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist:{},
    AdministratorsList:{},
    Paging:true,
    pageIndex:1,
    shopID:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        shopID: options.ShopID
      });
      var datas={
        pageIndex:this.data.pageIndex,
        pageSize:5,
        ShopID:this.data.shopID,
        IsShopowner:0
      }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/ShopStaff", "POST", datas, app.globalData.appkeyid, this.ShopStaffList);
    var datashop = {
      ShopID: this.data.shopID,
      IsShopowner: 1
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/ShopStaff", "POST", datashop, app.globalData.appkeyid, this.ShopStaff);
  },
  ShopStaff:function(res){
    var chat = this;
    var json = res.data.Data;
    if (json.flag) {
        chat.setData({
          AdministratorsList: json.data
        });
      } 
  },
  ShopStaffList:function(res){
    var chat = this;
    var json = res.data.Data;
    if (json.flag) {
      if (chat.data.pageIndex == 1) {
        chat.setData({
          datalist: json.data || null,
        });
      } else {
        //获取上次加载的数据
        var oldlists = chat.data.datalist;
        var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据
        chat.setData({
          datalist: newlists,
        });
      }
      if (json.pageCount <= chat.data.pageIndex) {//说明当前页已经超出总页数了
        chat.setData({ Paging: false });//不能再分页
      }
      chat.setData({
        pageIndex: parseInt(chat.data.pageIndex + 1)
      });
    } else {
      wx.showToast({
        title: json.msg,
        icon: "none"
      });
    }
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
  addStaff:function(event){
    wx.navigateTo({
      url: '../doorScan/doorScan?shopid='+this.data.shopID,
    })
  }
})