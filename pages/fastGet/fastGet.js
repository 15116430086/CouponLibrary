// pages/fastGet/fastGet.js
var utils = require("../../utils/util.js")
const app = getApp();
var page = 1; //初始化页数
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hangye: [],
    quan: [],
    activeNames: ['1'],
    distance: [],
    money: [],
    mindistance: "", //最近距离
    maxdistance: "", //最远距离
    minmoney: "", //最小券面值
    maxmoney: "", //最大券面值
    applyList: [{
        Item_id: "10",
        Item_Name: "公司",
        isSelect: false
      },
      {
        Item_id: "11",
        Item_Name: "职务",
        isSelect: false
      },
      {
        Item_id: "12",
        Item_Name: "行业",
        isSelect: false
      },
      {
        Item_id: "13",
        Item_Name: "家庭住址",
        isSelect: false
      }
    ],
    oneList: [{
        Item_id: "0",
        Item_Name: "1-2",
        isSelect: false
      },
      {
        Item_id: "1",
        Item_Name: "2-3",
        isSelect: false
      },
      {
        Item_id: "2",
        Item_Name: "3-4",
        isSelect: false
      },
      {
        Item_id: "3",
        Item_Name: "5-6",
        isSelect: false
      }
    ],
    twoList: [{
        Item_id: "0",
        Item_Name: "20-30",
        isSelect: false
      },
      {
        Item_id: "1",
        Item_Name: "50-60",
        isSelect: false
      },
      {
        Item_id: "2",
        Item_Name: "100-200",
        isSelect: false
      },
      {
        Item_id: "3",
        Item_Name: "500-1000",
        isSelect: false
      }
    ],
    threeList: [{
        Item_id: "0",
        Item_Name: "代金券",
        isSelect: false
      },
      {
        Item_id: "1",
        Item_Name: "礼物券",
        isSelect: false
      },
      {
        Item_id: "-1",
        Item_Name: "全部券",
        isSelect: false
      }
    ],
  },


  GetCouponIndustry: function() {
    let that = this;
    var data = {};
    data.State = 0
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponIndustryView/GetCouponIndustry", "POST", data, app.globalData.appkeyid, that.CouponIndustryBack)
  },

  CouponIndustryBack: function(json) {
    console.log(json);
    var json = json.data.Data;
    if (json) {
      console.log(json.msg);
      if (json.flag) {
        this.setData({
          applyList: json.data
        });
      }
    }
  },

  coupon: function(e) {
    let that = this;
    let applyList = that.data.applyList;
    let threeList = that.data.threeList;
    if (that.data.mindistance != "" && that.data.maxdistance != "") {
      if (that.data.mindistance > that.data.maxdistance) {
        wx.showToast({
          title: '最远距离要大于最近距离!',
          icon: "none",
          duration: 2000
        })
        return;
      }
    }
    if (that.data.minmoney != "" && that.data.maxmoney != "") {
      if (that.data.minmoney > that.data.maxmoney) {
        wx.showToast({
          title: '最高面值要大于最低面值!',
          icon: "none",
          duration: 2000
        })
        return;
      }
    }
    var data = {};
    for (let i in applyList) {
      if (applyList[i].isSelect) {
        that.data.hangye = that.data.hangye.concat(applyList[i].IndustryCode);
      }
    }
    for (let i in threeList) {
      if (threeList[i].isSelect) {
        data.pCouponType = threeList[i].Item_id
      }
    }
    data.pIndustryCode = utils.syJsonSafe(that.data.hangye);
    data.minCouponMoney = that.data.minmoney == "" ? -1 : that.data.minmoney;
    data.maxCouponMoney = that.data.maxmoney == "" ? -1 : that.data.maxmoney;
    data.minDistance = that.data.mindistance == "" ? -1 : that.data.mindistance;
    data.maxDistance = that.data.maxdistance == "" ? -1 : that.data.maxdistance;
    wx.navigateTo({
      url: '../getTicketList/getTicketList?quick=1&data=' + JSON.stringify(data)
    })
  },

  //距离最近
  mindistanceinput: function(e) {
    let that = this;
    let id = e.target.dataset.id;
    that.setData({
      mindistance: e.detail.value,
      idx: id
    })
  },
  //距离最远
  maxdistanceinput: function(e) {
    let that = this;
    let id = e.target.dataset.id;
    that.setData({
      maxdistance: e.detail.value,
      idx: id
    })
  },
  //券面值最小
  minmoneyinput: function(e) {
    let that = this;
    let id = e.target.dataset.id;
    that.setData({
      minmoney: e.detail.value,
      ide: id,
    })
  },
  //券面值最大
  maxmoneyinput: function(e) {
    let that = this;
    let id = e.target.dataset.id;
    that.setData({
      maxmoney: e.detail.value,
      ide: id,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.GetCouponIndustry();
  },

  selectApply: function(e) {
    let that = this;
    var index = e.currentTarget.dataset.index;
    var item = that.data.applyList[index];
    item.isSelect = !item.isSelect;
    that.setData({
      applyList: that.data.applyList,
    });
  },

  selectOne: function(e) {
    let that = this;
    let id = e.target.dataset.id;
    if (that.data.idx == id) {
      that.setData({
        idx: "",
        mindistance: "",
        maxdistance: "",
      })
    } else {
      that.data.distance = (that.data.oneList[id].Item_Name).split("-"),
        that.setData({
          idx: id,
          mindistance: that.data.distance[0],
          maxdistance: that.data.distance[1],
        })
    }
  },
  selectTwo(e) {
    let that = this;
    let id = e.target.dataset.id
    if (that.data.ide == id) {
      that.setData({
        ide: "",
        minmoney: "",
        maxmoney: "",
      })
    } else {
      that.data.money = (that.data.twoList[id].Item_Name).split("-"),
        that.setData({
          ide: id,
          minmoney: that.data.money[0],
          maxmoney: that.data.money[1],
        })
    }
  },
  selectThree(e) {
    let id = e.currentTarget.dataset.id
    let that = this;
    let threeList = that.data.threeList;
    for (let i in threeList) {
      if (id == i) {
        threeList[i].isSelect = !threeList[i].isSelect;
      } else {
        threeList[i].isSelect = false;
      }
    }
    that.setData({
      threeList: threeList
    });
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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