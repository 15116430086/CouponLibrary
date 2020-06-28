// pages/sendTicketMes/sendTicketMes.js
var utils = require("../../utils/util.js")
const app = getApp();
var page = 1;
var shoptype = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idc:1,
    img1: [
      {
        txt: "推广订单",
        id:1
      },
      {
        txt: "推广会员",
        id:2
      }
    ],
    sumCouponNum: 0,
    sumCouponMoney: 0,
    GiveCouponList: [],
    lastpage: 0,
    GroupID: 0,
    couponType: -1,
    typeName: "开始日期",
    GroupName: "全部店铺",
    selectDate: "结束日期",
    currentDate: new Date().getTime(),
    minDate: new Date("2019-10-01").getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      } else {
        return `${value} 日`;
      }
      return value;
    },
    columns: ["全部券", "代金券", "礼物券"],
    shoplist: [],

    show1: false,
    show2: false,
    show3: false
  },
 
  clkTab(e){
    let id = e.currentTarget.dataset.id;
    if(id==1){

    }else{

    }
    let that = this;
    that.setData({
      idc: id
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },
 
  onClose2(e) {
    let that = this;
    that.setData({
      show3: false
    })

  },
  showPopup1() {
    let that = this;
    if(app.globalData.AppGroupInfo.GroupID == app.globalData.AppGroupInfo.AffiliatedGroupID){
      that.setData({
        show1: true
      })
    }
  },
  showPopup2() {

    let that = this;
    that.setData({
      show2: true
    })
  },
  showPopup3() {

    let that = this;
    that.setData({
      show3: true
    })
  },

  confirm(event) {
    console.log(event.detail); // 打印出了时间
    let timestamp = event.detail;
    console.log(utils.formatTime(timestamp));
    console.log(utils.sysFormatDate(utils.formatTime(timestamp), "yyyy-MM-dd"));

    let that = this;
    that.setData({
      show3: false,
      selectDate: utils.sysFormatDate(utils.formatTime(timestamp), "yyyy-MM-dd")
    })

    page = 1;
    that.GetData(page);
  },
  //券类型选择
  onConfirm(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    console.log(`当前值：${value}, 当前索引：${index}`);

    let that = this;
    that.setData({
      show2: false,
      couponType: index - 1,
      typeName: value
    })
    page = 1;
    that.GetData(page);
  },
  onCancel(e) {

    let that = this;
    that.setData({
      show2: false
    })
  },
  onClose(e) {

    let that = this;
    that.setData({
      show2: false
    })
  },

  //商铺选择
  onConfirm1(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    console.log(`当前值：${value.GroupName}, 当前索引：${index}`);

    let that = this;
    that.setData({
      show1: false,
      GroupID: value.GroupID,
      GroupName: value.GroupName
    })
    page = 1;
    that.GetData(page);
  },
  onCancel1(e) {
    let that = this;
    that.setData({
      show1: false
    })
  },
  onCancel2(e) {
    let that = this;
    that.setData({
      show3: false
    })
  },
  onClose1(e) {
    let that = this;
    that.setData({
      show1: false
    })
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
    if (that.data.lastpage > page) {
      page++
      that.GetData(page);
    } else if (that.data.lastpage == page) {
      page++;
      wx.showToast({
        title: '没有更多数据!',
        icon: 'success',
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