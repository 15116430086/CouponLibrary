// cashM/account/account.js
let utils = require("../../utils/util.js")
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    SettlementMoneyCount:0,
    count:0,
    DataList:{},
    butCket:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.Query();
  },

  Query:function(){
    wx.showLoading({
      title: '数据加载中...',
    })
    var data={
      AffiliatedGroupID:app.globalData.AppGroupInfo.GroupID
    };
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/OperatorfundsView/GetSettlementrecord", "POST", data, app.globalData.appkeyid, this.GetSettlementrecord)
  },
  GetSettlementrecord:function(res){
    wx.hideLoading();
    var json=res.data.Data;
    var chat=this;
    chat.setData({
      SettlementMoneyCount:json.SettlementMoneyCount,
      count:json.count,
      DataList:json.data
    });
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
  Settlement:function(event){
    var groupid = event.currentTarget.dataset.groupid;
    var chat=this;
    wx.showModal({
      title: '提示',
      content: '确认支付待结算金',
      success: function(res) {
        if (res.confirm) {
            if(!chat.data.butCket){
                return;
            }
            chat.data.butCket=false;
            wx.showLoading({
              title: '数据提交中...',
            })
          var data = {}
          data.GroupID = groupid;
          data.AffiliatedGroupID=app.globalData.AppGroupInfo.GroupID;
          utils.AjaxRequest(app.globalData.apiurl + "CouponView/OperatorfundsView/settlement", "POST", data, app.globalData.appkeyid, chat.settlementBack);
        }
      }
    })
  },
  settlementBack:function(res){
    wx.hideLoading();
    var chta = this;
    var json = res.data.Data;
    wx.hideLoading({});
    if (json.flag) {
      if (json.ispay) { //说明是要掉支付
        var oJsApiParam = JSON.parse(json.paydata);
        wx.requestPayment({
          'timeStamp': oJsApiParam.timeStamp,
          'nonceStr': oJsApiParam.nonceStr,
          'package': oJsApiParam.package,
          'signType': 'MD5',
          'paySign': oJsApiParam.paySign,
          success(res) {
            console.log(res);
            if (res.errMsg == "requestPayment:ok") {
              chta.setData({ butCket: true});
              chat.Query();
            }
          },
          fail(res) {
            if (res.errMsg == "requestPayment:fail cancel") {
              chat.data.butCket=true;
              wx.showToast({
                title: "您取消了支付",
                icon: "none"
              });
            } else { //调用支付接口失败
              wx.showToast({
                title: res.errMsg,
                icon: "none"
              });
            }
            chta.setData({ butCket: true});
          }
        })
      }
    }else{
      wx.showToast({
        title: json.msg,
        icon: "none"
      });
      chta.setData({ butCket: true});
    }
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