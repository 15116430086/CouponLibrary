// pages/seeSpan/seeSpan.js
var utils = require("../../utils/util.js")
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
      show: false,
      LabelID:'',
      LabelName:'',
      showDel:false
  },

  GetData: function () {
    let that = this;
    //显示 加载中的提示
    wx.showLoading({
      title: '数据加载中...',
    })
    var data = {};
    data.pGroupID = app.globalData.AppGroupInfo.GroupID;
    data.pLabelID = that.data.LabelID;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponUserMemberView/GetOneLabelName", "POST", data, app.globalData.appkeyid, that.GetDataBack)
  },
  GetDataBack: function (json) {
    let that = this;
    var json = json.data.Data;
    //隐藏 加载中的提示
    wx.hideLoading();
    if (json.flag) {      
        that.setData({
          LabelName: json.data[0].LabelName          
        }); 
    } else {
      wx.showToast({
        title: '没有找到相关数据!',
        icon: 'none',
        duration: 2000
      })
    }
  },

  Determinetap:function(e){
    let that = this;
    var data={}
    data.pGroupID = app.globalData.AppGroupInfo.GroupID;
    data.pLabelID = that.data.LabelID;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponUserMemberView/DelCouponLabelInfo", "POST", data, app.globalData.appkeyid, that.DeterminetapBack)
  },

DeterminetapBack:function(json){
  let that = this;
  var json = json.data.Data;
  if (json.flag) {
    wx.navigateBack({
      url: '/mebC/spanList/spanList',
    })
  }
  wx.showToast({
    title: json.msg,
    icon: 'none',
    duration: 2000
  })
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
      let that = this;
      that.setData({
        LabelID:options.labelid
      })
      that.GetData();
  },

  addNews(e) {
      this.setData({
          show: true
      })
  },

  onClose() {
      this.setData({
          show: false
      })
  },

  //删除标签

  delSpan(){
    this.setData({
        showDel: true
    })
  },
  hideDel(){
    this.setData({
        showDel: false
    })
  },

  //获取标签


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