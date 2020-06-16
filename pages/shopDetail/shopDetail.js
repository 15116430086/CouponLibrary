// pages/shopDetail/shopDetail.js
let utils = require("../../utils/util.js")
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "日期",
    hidden:false,
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    show: false,
    datatime:"",
    valuetime:"",
    types:1,
    DataList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      datatime:options.time=='日期'?'':options.time,
      valuetime:options.name
    });
  },

  UserQuery:function(){
    var data={
      Bingtime:this.data.valuetime,
      Time:this.data.datatime,
      pGroupID:app.globalData.AppGroupInfo.GroupID,
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/withdrawalAccountView/GetUserList", "POST", data, app.globalData.appkeyid, this.GetUserList)
  },

  GetUserList:function(res) {
    var json=res.data.Data;
     var chat=this;
     chat.setData({DataList:json.data});
  },
   // 显示日期
   showTime(e){
    let that = this;
    that.setData({ show: true,hidden:true });
  },

  // 日期选择
  confirmDate(e) {
    console.log(e.detail);
    let that = this;
    let timer = e.detail;
    timer = utils.formatTime(timer);
    console.log(timer)
    that.setData({
        date: timer,
        show: false,
        hidden:false
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
      this.UserQuery();
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