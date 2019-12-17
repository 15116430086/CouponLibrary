// pages/sendTicketOne/sendTicketOne.js
var utils = require("../../utils/util.js")
var app = getApp();
var page = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist: [],
    lastpage: 0,
    isRefresh: true,
    ReleaseCommission: 0, //托管金
    Comission: 0, //已用
    BackCommission: 0, //已退   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var isRefresh = this.data.isRefresh
    if (isRefresh) {
      page = 1;
      this.GetData();
      wx.pageScrollTo({
        scrollTop: 0
      })
    }
    this.setData({
      isRefresh: false
    });
  },

  //托管佣金明细页跳转
  JumpCommissionMestap: function() {
    wx.navigateTo({
      url: '../commissionMes/commissionMes',
    })
  },

  jumpOk(e) {
    let index = e.currentTarget.dataset.index;
    let CouponID = e.currentTarget.dataset.couponid;
    var Couponstatus = e.currentTarget.dataset.couponstatus; //发券状态
    var ReleaseIDs = e.currentTarget.dataset.releaseids; //发券编号
    if (ReleaseIDs) {

      if (Couponstatus == 1) {
        wx.showToast({
          title: "存在待审核的发布券",
          icon: "none",
          duration: 1500
        });
        return
      }

      if (Couponstatus == 0) {
        wx.showToast({
          title: "存在待支付的发布券",
          icon: "none",
          duration: 1500
        });
        return
      }

    }


    let datalist = this.data.datalist;
    let data = JSON.stringify(datalist[index]);
    console.log(data)
    wx.navigateTo({
      url: '../startTicket/startTicket?pCoupon_Info=' + data + "&CouponID=" + CouponID,
    })
  },
  edit: function(event) {
    let index = event.currentTarget.dataset.indexs;
    let edit = event.currentTarget.dataset.edit;
    let datalist = this.data.datalist[index];
    let data = JSON.stringify(datalist);
    wx.navigateTo({
      url: '../sendTicketTwo/sendTicketTwo?pCoupon_Info=' + data + '&edit=' + edit
    })
  },

  GetData: function() {
    wx.showLoading({
      title: "数据加载中...",
      mask: true
    });

    var datas = {
      pGroupID: app.globalData.AppGroupInfo.GroupID,
      pPageIndex: page,
      pPageSize: 20
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/GetCouponReleaseList", "POST", datas, app.globalData.appkeyid, this.GetCouponReleaseList);
  },
  GetCouponReleaseList: function(res) {
    wx.hideLoading({});
    var chat = this;
    var json = res.data.Data;
    if (json.flag) {
      if (page == 1) {
        chat.setData({
          datalist: json.data || null,
          ReleaseCommission: json.ReleaseCommission,
          Comission: json.Comission,
          BackCommission: json.BackCommission,
          lastpage: json.pageCount //你的总页数   
        });
      } else {
        //获取上次加载的数据
        var oldlists = chat.data.datalist;
        var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据
        chat.setData({
          datalist: newlists,
          lastpage: json.pageCount //你的总页数   
        });
      }
    } else {
      wx.showToast({
        title: json.msg,
        icon: "none"
      });
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
  Issuing: function() {
    wx.navigateTo({
      url: '../sendTicketTwo/sendTicketTwo?edit=1',
    })
  },
  Details: function(event) {
    var CouponIDs = event.currentTarget.dataset.couponid
    wx.navigateTo({
      url: '../watchMes/watchMes?CouponID=' + CouponIDs,
    })
  },
  delCoupon: function(event) {
    let that = this;
    var CouponID = event.currentTarget.dataset.couponid
    var CouponName = event.currentTarget.dataset.couponname
    wx.showModal({
      title: '确认删除',
      content: '你确定要删除[' + CouponName + ']吗？',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          var data = {
            pGroupID: app.globalData.AppGroupInfo.GroupID,
            pCouponID: CouponID
          };
          utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/DelCouponInfo", "POST", data, app.globalData.appkeyid, that.DelCouponInfoBack);
        }
      }
    })
  },
  DelCouponInfoBack: function(res) {
    let that = this;
    var json = res.data.Data;
    if (json.flag) {
      wx.showToast({
        title: json.msg,
        duration: 2000,
        success: function(res) {
          page = 1;
          that.GetData();
        },
      })
    } else {
      wx.showToast({
        title: json.msg,
      })
    }
  }

})