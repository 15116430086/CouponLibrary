// pages/watchMes/watchMes.js
var utils = require("../../utils/util.js")
var app = getApp();
var page = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageCount: 0,
    pCouponID: "",
    datalist: [],
    CouponInfo: {},
    Paging: true //是否可以加载下一页
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      pCouponID: options.CouponID
    });
    page = 1;
    this.GetData(page);
  },

  GetData(page) {
    var datas = {
      pCouponID: this.data.pCouponID,
      pPageIndex: page,
      pPageSize: 20
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/GetCouponReleaseInfo", "POST", datas, app.globalData.appkeyid, this.GetCouponReleaseInfo);
  },

  GetCouponReleaseInfo: function(res) {
    var chat = this;
    var json = res.data.Data;
    if (json.flag) {
      if (page == 1) {
        if (!json.ReleaseList)
        {
          json.ReleaseList=[];
        }
        chat.setData({
          datalist: json.ReleaseList,
          CouponInfo: json.CouponInfo,
          pageCount: json.pageCount
        });
      } else {
        var oldlists = chat.data.datalist;
        var newlists = oldlists.concat(json.ReleaseList) //合并数据 res.data 你的数组数据
        chat.setData({
          datalist: newlists,
          pageCount:json.pageCount
        });
      }

    } else {
      wx.showToast({
        title: json.msg,
        icon: "none"
      });
    }
  },

  //删除该券
  delCouponRecordtap: function(e) {
    let that = this;
    var ReleaseID = e.currentTarget.dataset.releaseid;
    wx.showModal({
      title: '提示',
      content: '是否删除该券',
      success: function(res) {
        if (res.confirm) {
          var data = {}
          data.ReleaseID = ReleaseID;
          utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/DelCouponRecord", "POST", data, app.globalData.appkeyid, that.delCouponRecordback);
        }
      }
    })
  },

  delCouponRecordback: function(json) {
    let that = this;
    var json = json.data.Data;
    if (json.flag) {
      page = 1;
      this.GetData(page);
      wx.showToast({
        title: json.msg,
        icon: 'none',
        duration: 2000
      })
    } else {
      wx.showToast({
        title: json.msg,
        icon: 'none',
        duration: 2000
      })
    }
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
   
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
        icon: 'success',
        duration: 2000
      })

    }
  },


  See: function(event) {
    var releaseid = event.currentTarget.dataset.releaseid
    wx.navigateTo({
      url: '../watchMesOne/watchMesOne?releaseid=' + releaseid,
    })
  },
  jumpOk: function(event) { //继续发券

    wx.navigateTo({
      url: '../startTicket/startTicket?pCoupon_Info=' + JSON.stringify(this.data.CouponInfo) + "&CouponID=" + this.data.CouponInfo.CouponID,
    })
  },
  pay: function(event) {
    var monery = event.currentTarget.dataset.monery;
    var ReleaseID = event.currentTarget.dataset.releaseid;
    var chat = this;
    wx.showModal({
      title: "提示",
      content: "确认支付佣金" + monery + "元",
      showCancel: true,
      cancelText: "取消",
      confirmText: "确认支付",
      success: function(res) {
        if (res.confirm) {
          var data = {
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
  },
  Pay: function(res) {
    var chat = this;
    var json = res.data.Data;
    if (json.flag) {
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
                pCouponID: chat.data.pCouponID,
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