// cashM/myMoney/myMoney.js
let utils = require("../../utils/util.js")
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sumBalanceMoney:0,
    sumDrawbackMoney:0,
    sumCommissionMoney:0,
    sumCollectionMoney:0,
    sumDrawbackMoney:0,
    pageIndex:1,
    pageCount:1,
    DataList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  Query:function(){
   
    var data={
      pGroupID:app.globalData.AppGroupInfo.GroupID,
    };
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/OperatorfundsView/Operatorfunds", "POST", data, app.globalData.appkeyid, this.Operatorfunds)
  },
  Operatorfunds:function(res){
    var json=res.data.Data;
    var chat=this;
    if(json.flag){
        chat.setData({
          sumBalanceMoney:json.data[0].sumBalanceMoney,
          sumDrawbackMoney:json.data[0].sumDrawbackMoney,
          sumCommissionMoney:json.data[0].sumCommissionMoney,
          sumCollectionMoney:json.data[0].sumCollectionMoney,
          sumDrawbackMoney:json.data[0].sumDrawbackMoney
        });
    }
  },
  QueryList:function(){
    wx.showLoading({
      title: '数据加载中...',
    })
      var data={
        pageIndex:this.data.pageIndex,
        pageSize:10,
        pGroupID:app.globalData.AppGroupInfo.GroupID
      };
      utils.AjaxRequest(app.globalData.apiurl + "CouponView/OperatorfundsView/GetPurchaserecord", "POST", data, app.globalData.appkeyid, this.GetPurchaserecord)
  },
  GetPurchaserecord:function(res){
    wx.hideLoading();
    var json=res.data.Data;
    var chat=this;
    if(json.flag){
      if (chat.data.pageIndex == 1) {
        chat.setData({
          DataList: json.data || null,
          pageCount: json.pageCount //你的总页数   
        });
      } else {
        //获取上次加载的数据
        var oldlists = chat.data.DataList;
        var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据
        chat.setData({
          DataList: newlists,
          pageCount: json.pageCount, //你的总页数   
        });
      }
      chat.setData({pageIndex:chat.data.pageIndex+1});
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
     this.data.pageIndex=1;
      this.Query();
      this.QueryList();
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
    if(this.data.pageIndex>this.data.pageCount){
      return;
    }
    this.QueryList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})