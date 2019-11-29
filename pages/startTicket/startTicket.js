// pages/startTicket/startTicket.js
let app = getApp();
let utils = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contents: [{
        id: '',
        title: '全部商户',
        isSel: false
      },
      {
        id: '001',
        title: '自营店铺',
        isSel: false
      },
      {
        id: '002',
        title: '指定商户',
        isSel: false
      }
    ],
    idx: "",
    shows: false,
    shareshow2: true, //判断是否指定商户 默认不是 
    df_value: 1, //行业索引
    regionvalue: "地区选择", //最终选择地区值
    regionID: [], //最终选择地区ID
    Number: 0, //券数量
    Commission: 0, //佣金比列
    IndustryCodes: [], //最终行业ID
    Industryvalue: "请选择行业", //最终选择行业名称
    GroupIDList: [], //最终选择的集团ID
    Limited: 0, //单商户限量
    pic_array: [], //行业列表
    pCoupon_Info: {},
    sign: 1, //全部，2自营，3自选
    Doyoupay: true, //是否要支付佣金 默认支付
    date: "日期",
    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    show: false,
    ReleaseID: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    wx.setStorageSync("Groupkey", "");
    wx.setStorageSync("resultkey", "");
    wx.setStorageSync("industryKey", "");
    wx.setStorageSync("regionList", "");
    var oCoupon_Info = JSON.parse(options.pCoupon_Info);
    oCoupon_Info.CouponID = options.CouponID
    this.setData({
      pCoupon_Info: oCoupon_Info
    });
    // utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponIndustryView/GetCouponIndustry", "POST", {}, app.globalData.appkeyid, this.GetCouponIndustry);

  },
  selChoose(e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    that.setData({
      idx: id
    })
    if (id == "002") {
      that.setData({
        shareshow2: false,
        sign: 3,
        Doyoupay: true,
        Commission: parseFloat((this.data.pCoupon_Info.CouponMoney * 0.1 * parseInt(this.data.Number))).toFixed(2)
      });
      wx.navigateTo({
        url: "../shopChoose/shopChoose"
      })
    } else if (id == "001") {
      that.setData({
        shareshow2: false,
        sign: 2,
        Doyoupay: false,
        Commission: 0
      }); //选择自营 就隐藏行业 地区
    } else {
      that.setData({
        shareshow2: true,
        sign: 1,
        Doyoupay: true,
        Commission: parseFloat((this.data.pCoupon_Info.CouponMoney * 0.1 * parseInt(this.data.Number))).toFixed(2)
      }); //全部
    }

  },
  showHide(e) {
    let that = this;
    that.setData({
      shows: (!that.data.shows)
    })

  },
  Selectindustry: function(event) { //选择行业
    wx.navigateTo({
      url: '../industryChoose/industryChoose',
    })

  },
  Commissionratio: function(event) { //数量失去焦点计算托管佣金
    var number = event.detail.value
    this.setData({
      Commission: parseFloat((this.data.pCoupon_Info.CouponMoney * 0.1 * number)).toFixed(2),
      Number: number
    });
  },
  Limit: function(event) { //单商户限制
    this.setData({
      Limited: event.detail.value
    });
  },

  showDate: function(event) { //领取期限
    this.setData({
      show: true
    });

  },
  onClose() {
    this.setData({
      show: false
    });
  },
  onCancel(e) {
    this.setData({
      show: false
    });
  },
  onInput(event) {
    this.setData({
      currentDate: event.detail
    });
  },
  confirmDate(e) {
    console.log(e.detail);
    let that = this;
    let timer = e.detail;

    timer = utils.formatTime(timer);
    console.log(timer)
    that.setData({
      date: timer,
      show: false
    })
  },
  Regionselection: function(event) { //选择区域
    wx.navigateTo({
      url: '../provincialChoose/provincialChoose',
    })
  },
  pay: function(event) {
    if (this.data.date == "日期") {
      this.setData({
        date: "2199-12-31"
      })
    }
    if (!this.data.Number || this.data.Number <= 0) {
      wx.showToast({
        title: "发布数量异常",
        icon: "none"
      });
      return;
    }
    if ((!this.data.Limited || this.data.Limited <= 0) && this.data.sign == 1) {
      wx.showToast({
        title: "单商户领取限制异常",
        icon: "none"
      });
      return;
    }

    if (!this.data.date == "日期") {
      wx.showToast({
        title: "请选择领取期限",
        icon: "none"
      });
      return;
    }

    if (this.data.sign != 2 && this.data.Limited<=0) {
      wx.showToast({
        title: "请选设置领取限制",
        icon: "none"
      });
      return;
    }



    if (this.data.sign == 1) { //说明是全部商户

      this.setData({
        GroupIDList: [],
        regionID: [],
        IndustryCodes: [],
        Doyoupay: true, //说明要支付
      });
    }
    if (this.data.sign == 2) { //说明自营商户
      this.data.GroupIDList = [app.globalData.AppGroupInfo.GroupID];
      this.setData({
        regionID: [],
        Limited: 0,
        IndustryCodes: [],
        Doyoupay: false, //说明不要支付
      });
    }
    if (this.data.sign == 3) { //说明指定商户      
      this.setData({
        regionID: [],
        IndustryCodes: [],
        Doyoupay: true, //说明不要支付
      });

    }



    var Coupon_Release = {
      ReceiveNUM: 0,
      ReleaseNUM: this.data.Number,
      State: 0,
      ReceiveUpperLimit: this.data.Limited,
      ReleaseCommission: this.data.Commission,
      GroupID: app.globalData.AppGroupInfo.GroupID,
      ReceiveTerm: this.data.date
    }

    var datas = {
      GroupID: app.globalData.AppGroupInfo.GroupID,
      CouponID: this.data.pCoupon_Info.CouponID,
      Coupon_Release: utils.syJsonSafe(Coupon_Release),
      pArrIndustryCode: utils.syJsonSafe(this.data.IndustryCodes),
      pArrRegionID: utils.syJsonSafe(this.data.regionID),
      pArrGroupID: utils.syJsonSafe(this.data.GroupIDList),
      StaffID: app.globalData.AppStaffInfo.StaffID,
      ReleaseID: this.data.ReleaseID
    }
    wx.showLoading({
      title: "数据提交中...",
      mask: true
    });
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/AgainCouponRelease", "POST", datas, app.globalData.appkeyid, this.AgainCouponRelease);

  },
  AgainCouponRelease: function(res) {
    var chat = this;
    wx.hideLoading();
    var json = res.data.Data;
    if (json.flag) {
      chat.setData({
        ReleaseID: json.ReleaseID
      });
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
              wx.navigateBack({
                url: '../sendTicketOne/sendTicketOne'
              });
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
      } else {
        wx.showToast({
          title: json.msg,
          icon: 'none',
          duration: 2000
        })
        wx.navigateBack({
          url: '../sendTicketOne/sendTicketOne'
        });
      }
    } else {
      wx.showToast({
        title: json.msg,
        icon: 'none',
        duration: 2000
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var grouplist = wx.getStorageSync("Groupkey");
    var industryList = wx.getStorageSync("industryKey");
    var regionList = wx.getStorageSync("regionList");
    if (grouplist.length > 0) {
      var groupid = [];
      for (var s in grouplist) {
        groupid.push(grouplist[s].GroupID);
      }
      this.setData({
        GroupIDList: groupid
      });
    }
    if (industryList.length > 0) {
      this.setData({
        IndustryCodes: industryList,
        Industryvalue: industryList.length
      });

    } else {
      this.setData({
        IndustryCodes: [],
        Industryvalue: "餐饮，休闲/自选"
      });
    }

    if (regionList.length > 0) {
      this.setData({
        regionID: regionList,
        regionvalue: "已选" + regionList.length + "个地区"
      });
    }

    console.log(this.data.GroupIDList);
  },
})