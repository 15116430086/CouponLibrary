// pages/Businessmanagement/Businessmanagement.wxml.js
let utils = require("../../utils/util.js")
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeBox: [{
      id: 1,
      txt: '今天'
  },
  {
      id: 3,
      txt: '三天内'
  },
  {
      id: 7,
      txt: '一周内'
  },
  {
      id: 30,
      txt: '一个月内'
  }
],
cell1: [{
  id: 1,
  txt: '券名称'
},
{
  id: 2,
  txt: '渠道购券'
},
{
  id: 3,
  txt: '会员领券'
},
{
  id: 4,
  txt: '会员核券'
}
],
sdate: "选择日期",
edate: "选择日期",
idx: 1,
currentDate: new Date().getTime(),
minDate: new Date('2020-01-01').getTime(),
formatter(type, value) {
  if (type === 'year') {
      return `${value}年`;
  } else if (type === 'month') {
      return `${value}月`;
  }
  return value;
},
shopCell:[],
databox: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.GetData();
  },

  GetData: function () {
    wx.showLoading({
        title: '数据加载中...',
    })
    var data = {};
    data.startTime = this.data.sdate;
    data.endTime = this.data.edate;
    data.dayNum = this.data.idx;
    data.GroupID = app.globalData.AppGroupInfo.GroupID;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponHomeView/GetBusinessmanagement", "POST", data, app.globalData.appkeyid, this.GetDataBack)
},

GetDataBack: function (json) {
    wx.hideLoading();
    var json = json.data.Data;
    if (json.flag) {
        this.setData({
            databox: json.DataCount,
            shopCell: json.SellCouponRanking
        })
    }
},

formatDate: function (date) {
  var myyear = date.getFullYear();
  var mymonth = date.getMonth() + 1;
  var myweekday = date.getDate();
  if (mymonth < 10) {
      mymonth = "0" + mymonth;
  }
  if (myweekday < 10) {
      myweekday = "0" + myweekday;
  }
  return (myyear + "-" + mymonth + "-" + myweekday);
},
GetFromDate: function (day, type) {
  var zdate = new Date();
  var edate;
  if (type === 1) {
      edate = new Date(zdate.getTime() - (day * 24 * 60 * 60 * 1000));
  } else {
      edate = new Date(zdate.getTime() + (day * 24 * 60 * 60 * 1000));
  }
  return edate;
},
  // 显示日期
  showTime(e) {
    let that = this;
    that.setData({
        show: true,
        hidden: true,
        datatype: e.currentTarget.dataset.datetype
    });
},

// 日期选择
confirmDate(e) {
    console.log(e.detail);
    let that = this;
    let timer = e.detail;
    timer = utils.formatTime(timer);
    console.log(timer)
    if (that.data.datatype == 0) {
        that.setData({
            sdate: timer,
            show: false,
            hidden: false,
            idx: 0
        })
    }
    if (that.data.datatype == 1) {
        that.setData({
            edate: timer,
            show: false,
            hidden: false,
            idx: 0
        })
    }

    that.GetData();
},
onClose() {
    this.setData({
        show: false
    })
},
clkBtn(e) {
  let id = e.currentTarget.dataset.id;
  let that = this;

  that.setData({
      idx: id
  })
  that.GetData();
},
JumpPage: function (e) {
  var url = e.currentTarget.dataset.url;
  var starttime = this.data.sdate;
  var endtime = this.data.edate;
  if (this.data.idx > 0) {
      endtime = this.formatDate(this.GetFromDate(0, 0))
      if (this.data.idx == 1) {
          starttime = this.formatDate(this.GetFromDate(0, 0))

      } else {
          starttime = this.formatDate(this.GetFromDate(this.data.idx, 1))
      }
  }
  if (url.indexOf("?") != -1) {
      url += "&StartTime=" + starttime + "&EndTime=" + endtime;
  } else {
      url += "?StartTime=" + starttime + "&EndTime=" + endtime;
  }
  wx.navigateTo({
      url: url,
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