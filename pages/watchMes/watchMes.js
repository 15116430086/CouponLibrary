// pages/watchMes/watchMes.js
var utils = require("../../utils/util.js")
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      pageIndex:1,
     pCouponID:"",
     datalist:[{}],
    CouponInfo:{},
    Paging: true//是否可以加载下一页
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ pCouponID: options.CouponID});
    var datas = {
      pCouponID: options.CouponID,
      pPageIndex: this.data.pageIndex,
      pPageSize: 5
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/GetCouponReleaseInfo", "POST", datas, app.globalData.appkeyid, this.GetCouponReleaseInfo);
  },

  GetCouponReleaseInfo:function(res){
    var chat=this;
      var json=res.data.Data;
      if(json.flag){
        if(chat.data.pageIndex==1){
            chat.setData({
            datalist: json.ReleaseList,
            CouponInfo: json.CouponInfo
          });
        }else{
          var oldlists = chat.data.datalist;
          var newlists = oldlists.concat(json.ReleaseList) //合并数据 res.data 你的数组数据
          chat.setData({
            datalist: newlists,
          });
        }
        if (json.pageCount <= chat.data.pageIndex) {//说明当前页已经超出总页数了
          chat.setData({ Paging: false });//不能再分页
        }
        chat.setData({
          pageIndex: parseInt(chat.data.pageIndex + 1)
        });

          
      }else{
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
    if (this.data.Paging){
      var datas = {
        pCouponID: this.data.pCouponID,
        pPageIndex: this.data.pageIndex,
        pPageSize: 5
      }
      utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/GetCouponReleaseInfo", "POST", datas, app.globalData.appkeyid, this.GetCouponReleaseInfo);
    }
  },
  See:function(event){
    var releaseid = event.currentTarget.dataset.releaseid
   wx.navigateTo({
     url: '../watchMesOne/watchMesOne?releaseid=' + releaseid,
   })
  },
  jumpOk:function(event){//继续发券
    
    wx.navigateTo({
      url: '../startTicket/startTicket?pCoupon_Info=' + this.data.CouponInfo + "&CouponID=" + this.data.CouponInfo.CouponID,
    })
  },
  pay:function(event){
    var monery = event.currentTarget.dataset.monery;
    var ReleaseID = event.currentTarget.dataset.releaseid;
    var chat=this;
    wx.showModal({
      title: "提示",
      content: "确认支付佣金" + monery+"元",
      showCancel:true,
      cancelText:"取消",
      confirmText:"确认支付",
      success:function(res){
        if (res.confirm) {
          var data={
            monery: monery,
            ReleaseID: ReleaseID,
            StaffID: app.globalData.AppStaffInfo.StaffID,
            GroupID: app.globalData.AppGroupInfo.GroupID,
            pCouponID: chat.data.pCouponID
          }
          utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/Pay", "POST", data, app.globalData.appkeyid, chat.Pay);
        }
      }
    });
  },Pay:function(res){
    var chat=this;
    var json=res.data.Data;
    if(json.flag){
      if (json.ispay) { //说明要支付拥金
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
              var datas = {
                pCouponID: chat.data.CouponID,
                pPageIndex: 1,
                pPageSize: 5
              }
              utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/GetCouponReleaseInfo", "POST", datas, app.globalData.appkeyid, chat.GetCouponReleaseInfo);
            }
          },
          fail(res) {
            if (res.errMsg == "requestPayment:fail cancel") {
              wx.showToast({
                title: "您取消了支付",
                icon: "none"
              });
            }
          }
        })
    }
  }
  }
})