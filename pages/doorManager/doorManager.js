// pages/doorManager/doorManager.js
var utils = require("../../utils/util.js")
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
     shopid:"",
     datalist:{},
    Popup:true,
    shopname:"",
    latitudeX:0,
    longitudeY:0,
    flag0:true,
    imgone:"",
    show:false,
    imgurl:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      shopid: options.ShopID
    });
    var datas = {
      pGroupID: app.globalData.AppGroupInfo.GroupID,
      shopID: options.ShopID
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/GetGroupShop", "POST", datas, app.globalData.appkeyid, this.CouponShopView);
  },
  CouponShopView:function(res){
    var chat=this;
    var json = res.data.Data;
    if(json.flag){
      chat.data.latitudeX = json.data[0].LatitudeX;
      chat.data.longitudeY = json.data[0].LongitudeY;
      chat.setData({
        datalist:json.data,
        imgone:json.data[0].ImageOne
      });
    }
  },
  Jump:function(event){
    wx.navigateTo({
      url: '../staffManagements/staffManagements?ShopID=' + this.data.shopid,
    })
  },
  onUpFileImg: function (e) {

    let that = this;
    utils.UploadImg(app.globalData.apiurl, 1, app.globalData.AppGroupInfo.GroupID, app.globalData.appkeyid, that.UpFileImgBak, 0, 0)
  },
  UpFileImgBak: function (img, type) {
    var chat = this;
    if (img.length > 0) {
      chat.setData({
        imgone: img[0],
        flag0: true,
      });
    }
  },

  onPreviewImageTap: function (e) {
    var imgtypeid = e.currentTarget.dataset.type;
    let that = this;
    if (imgtypeid == 0) {
      wx.previewImage({
        urls: [that.data.imgone],
      })
    }
  },
  onDeleteImageTap: function (e) {
    let that = this;
    var type = e.currentTarget.dataset.type;
    if (type == 0) {
      that.setData({
        imgone: "",
        flag0: false,
      })
    }
  },
  onClose(){
    this.setData({ show:false});
  },

  cperfecttap:function()
  {//分享我的店铺 小程序维码
    wx.navigateTo({
      url: '../doorScan/doorScan?gid=' + app.globalData.AppGroupInfo.GroupID,
    })
  },

  perfecttap:function(){//分享我的店铺 公从号二维码
    var datas={
      GroupID: app.globalData.AppGroupInfo.GroupID //6123
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponGroupView/GettemporaryWxImgUrl", "POST", datas, app.globalData.appkeyid, this.GettemporaryWxImgUrl);
  },
  GettemporaryWxImgUrl:function(res){
    var json=res.data.Data;
    if(json.flag){
      this.setData({
        show: true,
        imgurl:json.url
    })
    }else{
      wx.showToast({
        title: json.msg,
        icon: "none"
      })
    }

  },
  updateshop:function(event){
    this.setData({ Popup:false});

  },
  coles:function(event){
    this.setData({ Popup: true });
  },
  nocoles:function(event){
    this.setData({ Popup: false });
  },
  blurs:function(event){
    this.setData({
      shopname: event.detail.value
    });
  },
  shopUpdate:function(event){
    if (this.data.shopname == "") {

      wx.showToast({
        title: "店铺名称不能为空",
        icon: "none"
      });
      return;
    }
    this.setData({ repeat: false });
    wx.showLoading({
      title: "数据提交中...",
      mask: true
    });

    var datas = {
      shopId: this.data.shopid,
      ShopName: this.data.shopname,
      ShopAddress: this.data.datalist[0].ShopAddress,
      Contacts: this.data.datalist[0].Contacts,
      Telephone: this.data.datalist[0].Telephone,
      latitudeX: this.data.latitudeX,
      longitudeY: this.data.longitudeY,
      ImageOne: this.data.imgone

    };
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/UpdateShopName", "POST", datas, app.globalData.appkeyid, this.updateStaff);
  },
  updateStaff:function(res){
    var chat=this;
    wx.hideLoading();
    var json=res.data.Data;
    if(json.flag){
      wx.showToast({
        title: "修改成功",
        icon: "none"
      });
      chat.setData({Popup: true});
      var datas = {
        pGroupID: app.globalData.AppGroupInfo.GroupID,
        shopID: chat.data.shopid
      }
      utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/GetGroupShop", "POST", datas, app.globalData.appkeyid, chat.CouponShopView);

    }else{
      wx.showToast({
        title: "修改失败",
        icon: "none"
      });
    }
  },
  addressblurs: function (event) {//店铺地址
    var chat = this;
    wx.chooseLocation({
      latitude: app.globalData.latitudeX,
      longitude: app.globalData.longitudeY,
      success(res) {
        console.log(JSON.stringify(res));
        if (res.address) {
          chat.data.datalist[0].ShopAddress = res.address
          // chat.setData({
          //   address: res.address
          // })

          utils.getGeocoder(res.address,chat.getGeocoderBack)
        }
      }
    })
  },
  getGeocoderBack: function (res) {
    var chat = this;
    chat.setData({
      latitudeX: res.latitude,
      longitudeY: res.longitude
    });

  },
  Contactsblurs: function (event) {//店铺联系人

    this.data.datalist[0].Contacts = event.detail.value;
    // this.setData({
    //   Contacts: event.detail.value
    // });
  },
  Telephoneblurs: function (event) {//联系方式
    this.data.datalist[0].Telephone = event.detail.value;
    // this.setData({
    //   Telephone: event.detail.value
    // });
  },
})