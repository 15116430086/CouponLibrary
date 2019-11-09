// pages/ticketMes/ticketMes.js
var utils = require("../../utils/util.js")
const app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
      images:null,
      CouponID:"100110",//"100110",
      ReceiveID:"12345454",//"12345454",
      datalist:null,
      shoplist:null
     
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      //this.data.CouponID = options.CouponID;
      //this.data.ReceiveID = options.ReleaseID;
      var datas = {
        ReleaseID: this.data.ReceiveID,
        groupId: app.globalData.AppGroupInfo.GroupID,
        couponId: this.data.CouponID,
        LatitudeX: app.globalData.latitudeX || "28.22778",
        LongitudeY: app.globalData.longitudeY || "112.93886"

      }
      utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/GetShangfamilyCoupondetails", "POST", datas, app.globalData.appkeyid, this.collarCouponDetail)
    },
  collarCouponDetail:function(res){
      let chat=this;
      var json=res.data.Data;
      if(json.flag){
        chat.setData({
          datalist:json.data,
          shoplist: json.shops
        });

      
        if (json.pictures.length){
              chat.setData({
                images :json.pictures
              });
        }
      }else{
        wx.showToast({
           title:"加载数据错误",
          icon:"none"
        });

      }

  },
  payBtn:function(event){
       wx.navigateTo({
         url: '../orderPay/orderPay?CouponID=' + this.data.CouponID + '&ReceiveID=' + this.data.ReceiveID
       }) 

  },
  onPullDownRefresh:function(event){
    var datas = {
      ReleaseID: this.data.ReceiveID,
      groupId: app.globalData.AppGroupInfo.GroupID,
      couponId: this.data.CouponID,
      LatitudeX: app.globalData.latitudeX || "28.22778",
      LongitudeY: app.globalData.longitudeY || "112.93886"

    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/GetShangfamilyCoupondetails", "POST", datas, app.globalData.appkeyid, this.collarCouponDetail)
  }
})