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
    typeName: "指定商户",
    shopName: "指定行业",
    selectDate: "指定地区",
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
    show1: false,
    show2: false,
    show3: false,
    shoplist: [],
    columns: [],
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

  query:function(releaseid,type){
    var data = {
      ReleaseID: releaseid,
      type: type
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/GetSpecifiedlist", "POST", data, app.globalData.appkeyid, this.GetSpecifiedlist);
},
  onClose2(e) {
    let that = this;
    that.setData({
      show3: false
    })

  },
  showPopup1(event) {
    var releaseid = event.currentTarget.dataset.releaseid;
   this.query(releaseid,2);
      this.setData({
        show1: true
      })
  },
  showPopup2(event) {
    var releaseid = event.currentTarget.dataset.releaseid;
    this.query(releaseid, 1);
    this.setData({
      show2: true
    })
  },
  showPopup3(event) {
    var releaseid = event.currentTarget.dataset.releaseid;
    this.query(releaseid, 0);
    this.setData({
      show3: true
    })
  },
  GetSpecifiedlist:function(res){
    var json=res.data.Data;
    var chat=this;
    if (json.data.length==0){
      chat.setData({
        columns: ["无"]
      });
    }else{
      chat.setData({
        columns: json.data
      });
    }
   
  },

  //指定地区确认
  confirm(event) {
    console.log(event.detail); 
    

    let that = this;
    that.setData({
      show3: false,
      selectDate: event.detail.value
    })

   
  },
  //指定商户确认
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

  //指定行业
  onConfirm1(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    console.log(`当前值：${value.ShopName}, 当前索引：${index}`);

    let that = this;
    that.setData({
      show1: false,
      shopID: value.ShopID,
      shopName: value.ShopName
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


  jumpOk: function(e) { //继续发券
    var CouponID = e.currentTarget.dataset.couponid;
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
    let datalist = this.data.CouponInfo;
    let data = JSON.stringify(datalist);
    wx.navigateTo({
      url: '../startTicket/startTicket?pCoupon_Info=' + data + "&CouponID=" + CouponID,
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
                pPageSize: 20
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