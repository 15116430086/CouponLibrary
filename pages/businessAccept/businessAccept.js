// pages/businessAccept/businessAccept.js
var utils = require("../../utils/util.js")
const app = getApp();
var ordertype = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDisabled: false,  //表示页面加载完成时disabled为启用状态
    type:1,             //0普通购物，1业务办理
    orderid:'',         //订单编号
    titleName:'',       //业务名
    orderstate:0,       //订单状态
    EC_ID:'',           //快递公司编码
    CourierNumber:'',
    CourierCompany:'',
    ExpressTel:'',
    GroupName: app.globalData.AppGroupInfo.GroupName,//集团名称
    columns: [],
    show: false,
    company: "",
    index:0,
    orderstate:0,
    type:0,
    orderid:''
  },
  //快递单号
  CourierNumberInput: function (e) {
    this.setData({
      CourierNumber: e.detail.value
    })
  },
  //快递公司
  CourierCompanyInput: function (e) {
    this.setData({
      CourierCompany: e.detail.value
    })
  },
  //客服电话
  ExpressTelInput: function (e) {
    this.setData({
      ExpressTel: e.detail.value
    })
  },

  //点击确认发货按钮
  isDeliver: function(event) {
    if (!this.data.CourierNumber){
      if(this.data.type==0){
        wx.showToast({
          title: '请输入快递单号!',
          icon: "none",
          duration: 2000
        })
      }
      else if (this.data.type == 1){
        wx.showToast({
          title: '请输入受理单号!',
          icon: "none",
          duration: 2000
        })
      }
      return;
    }
    if (!this.data.CourierCompany) {
      if (this.data.type == 0) {
        wx.showToast({
          title: '请输入快递公司!',
          icon: "none",
          duration: 2000
        })
      }
      else if (this.data.type == 1) {
        wx.showToast({
          title: '请输入业务员工!',
          icon: "none",
          duration: 2000
        })
      }
      return;
    }
    if (!this.data.ExpressTel) {
      if (this.data.type == 1) {
        wx.showToast({
          title: '请输入联系电话!',
          icon: "none",
          duration: 2000
        })
        return;
      }
    }
    wx.showLoading({
      title: '数据加载中...',
    })
    var data = {};
    data.pWriteOffOrderID = this.data.orderid;
    data.pState = 3;
    data.pCourierCompany = this.data.CourierCompany;
    data.pCourierNumber = this.data.CourierNumber;
    data.pExpressTel = this.data.ExpressTel;
    if (this.data.type == 0) {
      data.pEC_ID = this.data.columns[this.data.index].EC_ID;
    }
    else{
      data.pEC_ID ="";
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponGroupView/UpdateWriteOffOrderState", "POST", data, app.globalData.appkeyid, this.isDeliverBack)
  },

  isDeliverBack: function (json) {
    let that = this;
    console.log(json);
    var json = json.data.Data;
    wx.hideLoading();
    if (json.flag) {
      wx.showToast({
        title: '通知成功!',
        icon: "success",
        duration: 2000
      })
      wx.navigateTo({
        url: '../orderManagement/orderManagement?ordertype=' + ordertype +'&currentId=1',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    ordertype = options.ordertype;
    that.setData({
      orderid: options.orderid,
    })
    that.GetData();
    that.GetExpressCompanylist();
  },

  
  GetData: function () {
    let that = this;
    //显示 加载中的提示
    wx.showLoading({
      title: '数据加载中...',
    })
    var data = {};
    data.pOrderID = this.data.orderid;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/GetOneOrderDetails", "POST", data, app.globalData.appkeyid, this.GetDataBack)
  },
  GetDataBack: function (json) {
    let that = this;
    var json = json.data.Data;
    wx.hideLoading();
    if (json.flag) {
      that.setData({
        CourierNumber: json.data[0].CourierNumber,
        CourierCompany: json.data[0].CourierCompany,
        ExpressTel: json.data[0].ExpressTel,
        orderstate: json.data[0].State,
        type: json.data[0].ProductType
      })
      if (json.data[0].State == 3 || json.data[0].State == 4){
        that.setData({
          isDisabled: true,  //修改isDisabled的值为true（即启用状态）
        })
      }
    }
  },

  GetExpressCompanylist: function () {
    let that = this;
    var data = {};
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponIndustryView/GetExpressCompany", "POST", data, app.globalData.appkeyid, this.GetExpressCompanylistBack)
  },
  GetExpressCompanylistBack: function (json) {
    let that = this;
    var json = json.data.Data;
    if (json.flag) {
      that.setData({
        columns: json.data
      })
      console.log(that.data.columns);
    }
  },

  showPop(e) {
    this.setData({
      show: true
    })
  },
  onConfirm(event) {
    const { picker, value, index } = event.detail;
    console.log(event.detail.value.id);
    let text = event.detail.value.text;
    this.setData({
      CourierCompany: text,
      index: event.detail.index,
      show: false
    })
  },

  onCancel() {
    this.setData({
      show: false
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },


  onWxScanCode: function () {
    let that = this;
    that.setData({
      EC_ID: '',
      CourierCompany: ''
    })
    wx.scanCode({
      success(res) {
        that.setData({
          CourierNumber: res.result
        })
        var data = {};
    data.LogisticsNumber = res.result;
        utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/NumberQuery", "POST", data, app.globalData.appkeyid, that.GetNumberQueryBack)
      }
    })
  },
  GetNumberQueryBack: function (json) {
    let that = this;
    var json = json.data.Data;
    if(json.flag){
      if (json.data.length==1){
        that.setData({
          CourierCompany: json.data[0].text,
          EC_ID: json.data[0].EC_ID,
        })
      }
      that.setData({
        columns: json.data
      })
    }
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})