// pages/sendTicketOne/sendTicketOne.js
var utils = require("../../utils/util.js")
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     datalist:[],
     pageIndex:1,
     ReleaseCommission:0,//托管金
     Comission:0,//已用
     BackCommission:0,//已退,
     Paging:true//是否可以加载下一页
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
        wx.showLoading({
          title: "数据加载中...",
          mask: true
        });
      var datas={
        pGroupID: app.globalData.AppGroupInfo.GroupID,
        pPageIndex:this.data.pageIndex,
        pPageSize:5
      }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/GetCouponReleaseList", "POST", datas, app.globalData.appkeyid, this.GetCouponReleaseList);
  },

//托管佣金明细页跳转
  JumpCommissionMestap:function(){
    wx.navigateTo({
      url: '../commissionMes/commissionMes',
    })
  },

  jumpOk(e){
    let index = e.currentTarget.dataset.index;
    let CouponID = e.currentTarget.dataset.couponid;
    let datalist = this.data.datalist;
    let data = JSON.stringify(datalist[index]);
    console.log(data)
    wx.navigateTo({
      url: '../startTicket/startTicket?pCoupon_Info=' + data + "&CouponID=" + CouponID,
    })
  },

  GetCouponReleaseList:function(res){
    wx.hideLoading({});
    var chat=this;
      var json=res.data.Data;
      if(json.flag){
        if(chat.data.pageIndex==1){
          chat.setData({
            datalist:json.data ||null,
            ReleaseCommission: json.ReleaseCommission,
            Comission: json.Comission,
            BackCommission: json.BackCommission
          });
        }else{
          //获取上次加载的数据
          var oldlists = chat.data.datalist;
          var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据
          chat.setData({
            datalist:newlists,
          });
        } 
        if (json.pageCount <= chat.data.pageIndex){//说明当前页已经超出总页数了
          chat.setData({ Paging: false });//不能再分页
        }
        chat.setData({
          pageIndex:parseInt(chat.data.pageIndex + 1)
        });
      }else{
        chat.setData({ Paging: false });//不能再分页
        wx.showToast({
          title: json.msg,
          icon: "none"
        });
      }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({ pageIndex:1});//下拉刷新 当前页给默认值
    var datas = {
      pGroupID: app.globalData.AppGroupInfo.GroupID,
      pPageIndex: this.data.pageIndex,
      pPageSize: 5
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/GetCouponReleaseList", "POST", datas, app.globalData.appkeyid, this.GetCouponReleaseList);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.Paging){//说明可以分页
      wx.showLoading({
        title: "数据加载中...",
        mask: true
      });
      var datas = {
        pGroupID: app.globalData.AppGroupInfo.GroupID,
        pPageIndex: this.data.pageIndex,
        pPageSize: 5
      }
      utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/GetCouponReleaseList", "POST", datas, app.globalData.appkeyid, this.GetCouponReleaseList);
    }
  },
  Issuing:function(){
      wx.navigateTo({
        url: '../sendTicketTwo/sendTicketTwo',
      })
  },
  Details: function (event) {
    var CouponIDs = event.currentTarget.dataset.couponid
      wx.navigateTo({
        url: '../watchMes/watchMes?CouponID=' + CouponIDs,
      })
  }
})