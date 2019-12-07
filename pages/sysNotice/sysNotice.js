// pages/sysNotice/sysNotice.js
var utils = require("../../utils/util.js")
const app = getApp();
var page = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CouponMsgList:[],
    lastpage: 0,
    Time:"",
  },

  GetData: function () {
    let that = this;
    //显示 加载中的提示
    wx.showLoading({
      title: '数据加载中...',
    })
    var data = {};
    data.pGroupID = app.globalData.AppGroupInfo.GroupID;
    data.pPageIndex = page;
    data.pPageSize = 20;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponHomeView/GetCouponMsg", "POST", data, app.globalData.appkeyid, this.GetDataBack)
  },
  GetDataBack: function (json) {
    let that = this;
    var json = json.data.Data;
    wx.hideLoading();
    if (json.flag) {
      console.log(json.msg);
      if (page == 1) {
        this.setData({
          CouponMsgList: json.data,
          lastpage: json.pageCount //你的总页数   
        });
      } else {
        //获取上次加载的数据
        var oldlists = that.data.CouponMsgList;
        var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据
        that.setData({
          CouponMsgList: newlists,
          lastpage: json.pageCount //你的总页数   
        });
      }
    } else {
      wx.showToast({
        title: '没有找到相关数据!',
        icon: 'none',
        duration: 2000
      })
    }
  },

//点击请立即领取
  JumpticketMes:function(e){
    let that = this;
    var RelationID = e.currentTarget.dataset.relationid;
    var SendMsgID = e.currentTarget.dataset.id;
    that.EditoState(SendMsgID);
    wx.navigateTo({
      url: '../ticketMes/ticketMes?ReleaseID=' + RelationID,
    })
  },

//点击查看详情
  Eetailstap:function(e){
    let that = this;
    var SendMsgID = e.currentTarget.dataset.id;
    that.EditoState(SendMsgID);
    // wx.navigateTo({
    //   url: '../ticketMes/ticketMes?ReleaseID=' + RelationID,
    // })
  },
  
  EditoState: function (SendMsgID){
    var data = {}
    data.pSendMsgID = SendMsgID;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponHomeView/EditoCouponMsgState", "POST", data, app.globalData.appkeyid, this.EditoStateBack)
  },
EditoStateBack:function(){
  let that = this;
  var json = json.data.Data;
  console.log(json.msg);
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.GetData();
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
    let that = this;
    if (that.data.lastpage > page) {
      page++
      that.GetData(page);
    } else if (that.data.lastpage == page) {
      page++;
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
  onShareAppMessage: function () {

  }
})