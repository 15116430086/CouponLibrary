// Buyacard/CardDetails/CardDetails.js
var utils = require("../../utils/util.js")
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Time:"",
    pageIndex:1,
    pageCount:1,
    DataList:[],
    types:1,
    ActivityID:"",
    ShopID:"",
    orderCount:0,
    monery:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      Time:options.PayData,
      types:options.types,
      ActivityID:options.ActivityID||"",
      ShopID:options.shopid||""
    });
  },
  Query:function(){
    wx.showLoading({
      title: '数据加载中...',
    })
    var data={
      pPageIndex: this.data.pageIndex,
      pPageSize: 20,
      startCreateDate: this.data.Time,
      endCreateDate: this.data.Time,
      pAffiliatedGroupID:app.globalData.AppGroupInfo.AffiliatedGroupID,
      ActivityID: this.data.ActivityID,
      ShopID: this.data.ShopID,
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponUserMemberView/GetUserActivityPurchaseGroupby", "POST", data, app.globalData.appkeyid, this.QueryList)
  },
  QueryList:function(res){
    wx.hideLoading();
    var json=res.data.Data;
    var chat=this;
    if(json.flag){
      if (chat.data.pageIndex == 1) {
        chat.setData({
          DataList: json.data,
          pageCount: json.pageCount,
          pageIndex: chat.data.pageIndex + 1,
          orderCount:json.orderCount,
          monery:json.sumMonery
        });
      } else {
        //获取上次加载的数据
        var oldlists = chat.data.DataList;
        var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据
        chat.setData({
          DataList: newlists,
          pageCount: json.pageCount, //你的总页数,
          pageIndex: chat.data.pageIndex + 1,
          orderCount:json.orderCount,
          monery:json.sumMonery
        });
      }
    }else{
      if (chat.data.pageIndex == 1) {
        chat.setData({
          DataList: []
        });
      }
    }
  },
  Jump:function (e) {
    var shopid=e.currentTarget.dataset.shopid;
    var PayData=e.currentTarget.dataset.time;
    var ActivityID=e.currentTarget.dataset.activityid;
    wx.navigateTo({
     url: "../MemberList/MemberList?shopid="+shopid+"&PayData="+PayData+"&ActivityID="+ActivityID+"&types=0&EndPayData="+PayData,
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
    this.Query();
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
    if (this.data.pageIndex > this.data.pageCount) {
      return;
    }
    this.Query();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})