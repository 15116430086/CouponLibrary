// pages/myMoney/myMoney.js
var utils = require("../../utils/util.js")
const app = getApp();
var page = 1; //初始化页数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Capitaldetailslist: [],
    lastpage: 0,
    sumBalanceMoney:0,
    sumDrawbackMoney:0,
    sumCommissionMoney:0,
    sumCollectionMoney:0,
    dAccountName: "",
    dBankCardNumber: "",
    dOpeningBank: "",
    showView:false,
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
    data.pPageSize = 10;
    data.pDateMonth = '';
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponCapitalView/GetCapitalInfo", "POST", data, app.globalData.appkeyid, this.GetDataBack)
  },
  GetDataBack: function (json) {
    let that = this;
    var json = json.data.Data;
    wx.hideLoading();
    if (json.flag) {
      console.log(json.msg);
      if (page == 1) {
        this.setData({
          sumBalanceMoney:json.CapitalTypeSun.sumBalanceMoney,          //结算总额，佣金余额
          sumCollectionMoney: json.CapitalTypeSun.sumCollectionMoney,   //平台代收资金
          sumCommissionMoney:json.CapitalTypeSun.sumCommissionMoney,    //佣金收入
          sumDrawbackMoney:json.CapitalTypeSun.sumDrawbackMoney,        //佣金回退
          dAccountName: json.dataGroup[0].AccountName,
          dBankCardNumber: json.dataGroup[0].BankCardNumber,
          dOpeningBank: json.dataGroup[0].OpeningBank,
          Capitaldetailslist: json.data,
          lastpage: json.pageCount //你的总页数   
        });
      } else {
        //获取上次加载的数据
        var oldlists = that.data.Capitaldetailslist;
        var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据
        that.setData({
          Capitaldetailslist: newlists,
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

  startSettlement: function (event){
    let that = this;
    if (that.data.sumBalanceMoney>0){
      wx.showToast({
        title: '没有要结算的资金',
        icon: "none",
        duration: 2000
      })
      return;
    }
    else
    {
      that.setData({
        showView:true
      })
    }
  },

  isAdd:function(e){
    let that = this;
    if (e.detail.value.dOpeningBank==""){
      wx.showToast({
        title: "请输入开户银行！",
        icon: "none",
        duration: 1500
      })
      return;
    }
    if (e.detail.value.dAccountName == ""){
      wx.showToast({
        title: "请输入开户姓名！",
        icon: "none",
        duration: 1500
      })
      return;
    }
    if (e.detail.value.dBankCardNumber == ""){
      wx.showToast({
        title: "请输入银行卡号！",
        icon: "none",
        duration: 1500
      })
      return;
    }
    var data = {}
      data.pGroupID = app.globalData.AppGroupInfo.GroupID;
      data.pAccountName = e.detail.value.dAccountName,
      data.pBankCardNumber = e.detail.value.dBankCardNumber,
      data.pOpeningBank = e.detail.value.dOpeningBank
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponCapitalView/AddCapitalWithdrawal", "POST", data, app.globalData.appkeyid, that.startSettlementBack)
  },
  startSettlementBack: function (json) {
    let that = this;
    var json = json.data.Data;
    if (json.flag) {
      wx.showToast({
        title: json.msg,
        icon: "none",
        duration: 2000
      })
      wx.navigateTo({
        url: '../banlanceMes/banlanceMes'
      })
    }
    else {
      wx.showToast({
        title: json.msg,
        icon: "none",
        duration: 2000
      })
    }
    //that.GetData();
  },
  
  coles(e) {
    let that = this;
    let showView = that.data.showView;
    that.setData({
      showView: false
    })
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