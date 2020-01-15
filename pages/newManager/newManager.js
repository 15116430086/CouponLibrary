// pages/newManager/newManager.js
var utils = require("../../utils/util.js")
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag: false,
    show: false,
    showLevel: false,
    isFlag: false,
    list: [{
        imageOne: "/static/images/swp.png",
        name: "噢噢啊搜傲视OAOS撒是傲视噢噢啊搜傲视OAOS撒是傲视",
        isSel: false,
        block: [{
            span: "潜在客户"
          },
          {
            span: "一周多次消费"
          }
        ]
      },
      {
        imageOne: "/static/images/swp.png",
        name: "达摩无敌厉害啊",
        isSel: false,
        block: [

        ]
      },
    ],
    allSel: false,
    level: [{
        id: 1,
        title: "钻石渣渣"
      },
      {
        id: 2,
        title: "白金大神"
      },
      {
        id: 3,
        title: "黄金高手"
      }

    ],
    idx: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  //展开隐藏会员块 
  selBlock(e) {
    let that = this;
    let index = e.currentTarget.dataset.findex;
    let datalist = that.data.userlist;
    datalist[index].IsShow = !datalist[index].IsShow;
    that.setData({
      userlist: datalist,      
    })
  },


  // 跳转会员等级管理
  jumpLevel(e) {
    wx.navigateTo({
      url: '../levelManager/levelManager?id=1&page=4',
    })
  },

  //跳转标签列表
  jumpSpan(e) {
    wx.navigateTo({
      url: '../spanList/spanList',
    })
  },

  //全选会员
  allSel(e) {
    let that = this;
    let index = e.currentTarget.dataset.findex;
    let datalist = that.data.userlist;
    datalist[index].CheckAll = !datalist[index].CheckAll;
    for (let i in datalist[index].ListCoupon_UserInfo) {   
      datalist[index].ListCoupon_UserInfo[i].IsCheck = datalist[index].CheckAll      
    }
    that.setData({
      userlist: datalist,
    })
  },

  //单选
  isSel(e) {
    let that = this;
    let findex = e.currentTarget.dataset.findex;
    let cindex = e.currentTarget.dataset.cindex;
    let datalist = that.data.userlist;
    datalist[findex].ListCoupon_UserInfo[cindex].IsCheck = !datalist[findex].ListCoupon_UserInfo[cindex].IsCheck
    that.setData({
      userlist: datalist,
    })
  },


  //设置会员等级
  showLevel(e) {
    let that = this;
    let showIndex = e.currentTarget.dataset.findex; 
    let idx = e.currentTarget.dataset.gradeid;    
    that.setData({
      showLevel: true,
      showindex: showIndex
    })
  },
  //隐藏会员等级
  onClose(e) {
    let that = this;
    that.setData({
      showLevel: false
    })
  },

  onConfirm(e)
  {
    let that = this;
    that.setData({
      showLevel: false
    })
  },

  //单选等级
  isLevel(e) {
    let that = this;

    let id = e.currentTarget.dataset.id;
    that.setData({
      idx: id
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.GetData();
  },

  GetData: function() {
    let that = this;
    //显示 加载中的提示
    wx.showLoading({
      title: '数据加载中...',
    })
    var data = {};
    data.pGroupID = app.globalData.AppGroupInfo.GroupID;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponUserMemberView/GetUserInfo", "POST", data, app.globalData.appkeyid, this.GetDataBack)
  },
  GetDataBack: function(json) {
    let that = this;
    var json = json.data.Data;
    wx.hideLoading();
    if (json.flag) {
      console.log(json.msg);
      this.setData({
        HistoryUserUNM: json.HistoryUserUNM,
        TodayUserNUM: json.TodayUserNUM,
        userlist: json.data,
      });

    } else {
      wx.showToast({
        title: '没有找到相关数据!',
        icon: 'none',
        duration: 2000
      })
    }
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