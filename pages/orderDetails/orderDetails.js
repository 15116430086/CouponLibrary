// pages/orderDetails/orderDetails.js
var utils = require("../../utils/util.js")
const app = getApp();
var pageM = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderDetailslist: [],
    currentId: 0,
    time:'',
  },

  GetData: function() {
    let that = this;
    //显示 加载中的提示
    wx.showLoading({
      title: '数据加载中...',
    })
    var pageindex = pageM[0].page;

    var data = {};
    data.pGroupID = app.globalData.AppGroupInfo.GroupID;
    data.pPageIndex = pageindex;
    data.pPageSize = 10;
    data.pShopID = app.globalData.AppStaffInfo.ShopID,
    data.pDateTime=that.data.time,
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponProductView/GetOrderDetails", "POST", data, app.globalData.appkeyid, this.GetDataBack)
  },
  GetDataBack: function(json) {
    let that = this;
    var json = json.data.Data;
    if (json.flag) {
      pageM[0].lastpage = json.pageCount

        if (pageM[0].page == 1) {
          that.setData({
            orderDetailslist: json.data
          })
        } else {
          //获取上次加载的数据
          var oldlists = that.data.orderDetailslist;
          var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据

          that.setData({
            orderDetailslist: newlists
          });
      }
    } else {
      wx.showToast({
        title: '暂无数据!',
        icon: "none",
        duration: 2000
      })
    }

    //隐藏 加载中的提示
    wx.hideLoading();
  },

  // JumpwaitGoods: function(e) {
  //   var orderid = e.currentTarget.dataset.orderid;
  //   var writeofftype = e.currentTarget.dataset.writeofftype;
  //   var type = ordertype;
  //     wx.navigateTo({
  //       url: '../waitGoods/waitGoods?orderid=' + orderid + '&ordertype=' + type,
  //     })
  //   console.log(type);
  // },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
      that.setData({
        time: options.time
      })
  },


  //点击每个导航的点击事件
  handleTap: function(e) {
    // let that = this;
    // let id = e.currentTarget.id;
    // if (id) {
    //   this.setData({
    //     currentId: id,
    //   })

    //   if (pageM[id].iscleck) {
    //     that.GetData();
    //   }
    // }

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
    pageM = [{
      page: 1,
      lastpage: 0,
    }];
    let that = this;
    that.GetData();
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
    let that = this;
    if (pageM[0].lastpage > pageM[0].page) {
      pageM[0].page++;
      that.GetData();
    } else if (pageM[0].lastpage == pageM[0].page) {
      pageM[0].page++
        wx.showToast({
          title: '没有更多数据!',
          icon: 'none',
          duration: 2000
        })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})