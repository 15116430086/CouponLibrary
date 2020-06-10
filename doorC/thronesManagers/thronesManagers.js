// pages/thronesManager /thronesManager.js
var utils = require("../../utils/util.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: true,
    selIndex: "",
    datalist:{},
    StaffID:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: "数据加载中...",
      mask: true
    });
    this.data.StaffID = options.staffid;
    var data={
      ShopID: options.shopid,
      StaffID: options.staffid,
      pGroupID: app.globalData.AppGroupInfo.GroupID
    };
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/GetJurisdictionList", "POST", data, app.globalData.appkeyid, this.GetJurisdictionList);
  },
  GetJurisdictionList:function(res){
    wx.hideLoading();
    var chat=this;
    var json=res.data.Data;
    chat.setData({
      datalist: json.JurisdictionList,
    });

  },
  onChange:function(event) {
    var index = event.currentTarget.dataset.index
    var data=this.data.datalist;
    data[index].checked = !data[index].checked;
    this.setData({ datalist:data});
  },
  confirm:function(event){
    wx.showLoading({
      title: "数据保存中...",
      mask: true
    });
    var datalist=this.data.datalist;
    var arr=[];
    for (var i in datalist){
      if (datalist[i].checked || datalist[i].checked==1){
        arr.push(datalist[i].ID);
      }
    }
    if(arr.length==0){
      wx.showToast({
        title: '请选择权限' 
      })
      return;
    }
    var data={
      arr: utils.syJsonSafe(arr),
      StaffID: this.data.StaffID
    };
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/AddJurisdiction", "POST", data, app.globalData.appkeyid, this.AddJurisdiction);
  },
  AddJurisdiction:function(res){
      var json=res.data.Data;
      if(json.flag){
        wx.showToast({
          title: '操作成功' 
        })
        wx.navigateBack({
          url: '/doorC/staffManagements/staffManagements'
        });
      }else{
        wx.showToast({
          title: '操作失败' 
        })
      }

  }

 
})