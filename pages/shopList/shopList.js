// pages/doorContor/doorContor.js
var utils = require("../../utils/util.js");
var app = getApp();
const chooseLocation = requirePlugin('chooseLocation');
var isLocation = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shoplist: {},
    repeat: true,
    Popup: true,
    Repeat: true,
    shopname: "",
    address: "",
    Contacts: "",
    Telephone: "",
    latitudeX: 0,
    longitudeY: 0,
    imgone: "",
    flag0: false,
    pGroupID: 0,
    imgurl: "",
    types: 0,
    shopid:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      groupType: app.globalData.AppGroupInfo.GroupType,
      pGroupID: options.GroupID
    });
    var datas = {
      GroupID: options.GroupID
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/GroupShop", "POST", datas, app.globalData.appkeyid, this.CouponShopView);
  },
  CouponShopView: function(res) {
    var chat = this;
    var json = res.data.Data;
    if (json.flag) {
      chat.setData({
        shoplist: json.data
      });
    }
  },
  add: function() {
    this.setData({
      Popup: false,
      shopname: "",
      address: "",
      Contacts: "",
      Telephone: "",
      latitudeX: 0,
      longitudeY: 0,
      flag0: false,
    });

  },
  blurs: function(event) { //店铺名称
    this.setData({
      shopname: event.detail.value
    });
  },
  addressblurs: function(event) { //店铺地址
    var that = this;
    // wx.chooseLocation({
    //   latitude: app.globalData.latitudeX,
    //   longitude: app.globalData.longitudeY,
    //   success(res) {
    //     console.log(JSON.stringify(res));
    //     if (res.address) {
    //       chat.setData({
    //         address: res.address
    //       })

    //       utils.getGeocoder(res.address,chat.getGeocoderBack)
    //     }
    //   }
    // })

    let referer = app.globalData.sysName+'商家助手'; //调用插件的app的名称 
    let category = '生活服务,娱乐休闲,美食';
    wx.navigateTo({
      url: 'plugin://chooseLocation/index?key=' + app.globalData.minmapkey + '&referer=' + referer + '&category=' + category
    });
    isLocation = true;
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let that = this;
    let location = chooseLocation.getLocation();
    if (location && location.address && isLocation) {
      that.setData({
        address: location.address
      })

      utils.getGeocoder(location.address, that.getGeocoderBack)
    }
  },
  getGeocoderBack: function(res) {
    var chat = this;
    chat.setData({
      latitudeX: res.latitude,
      longitudeY: res.longitude
    });

  },

  Contactsblurs: function(event) { //店铺联系人

    this.setData({
      Contacts: event.detail.value
    });
  },
  Telephoneblurs: function(event) { //联系方式
    this.setData({
      Telephone: event.detail.value
    });
  },
  coles: function() {
    this.setData({
      Popup: true
    });

  },
  nocoles: function() {
    this.setData({
      Popup: false
    });

  },
  onUpFileImg: function(e) {

    let that = this;
    utils.UploadImg(app.globalData.apiurl, 1, app.globalData.AppGroupInfo.GroupID, app.globalData.appkeyid, that.UpFileImgBak, 0, 0)
  },
  UpFileImgBak: function(img, type) {
    var chat = this;
    if (img.length > 0) {
      chat.setData({
        imgone: img[0],
        flag0: true,
        imgurl: json.url
      });
    }
  },

  onPreviewImageTap: function(e) {
    var imgtypeid = e.currentTarget.dataset.type;
    let that = this;
    if (imgtypeid == 0) {
      wx.previewImage({
        urls: [that.data.imgone],
      })
    }
  },
  onDeleteImageTap: function(e) {
    let that = this;
    var type = e.currentTarget.dataset.type;
    if (type == 0) {
      that.setData({
        imgone: "",
        flag0: false,
      })
    }
  },
  shopAdd: function(event) {
    if (this.data.shopname == "") {

      wx.showToast({
        title: "店铺名称不能为空",
        icon: "none"
      });
      return;
    }
    if (this.data.address == "") {
      wx.showToast({
        title: "店铺地区不能为空",
        icon: "none"
      });
      return;
    }
    if (this.data.Contacts == "") {
      wx.showToast({
        title: "联系人不能为空",
        icon: "none"
      });
      return;
    }
    if (this.data.Telephone == "") {
      wx.showToast({
        title: "联系方式不能为空",
        icon: "none"
      });
      return;
    }
    if (this.data.imgone == "") {
      wx.showToast({
        title: "请上传店铺照片",
        icon: "none"
      });
      return;
    }


    if (this.data.Repeat) {
      this.setData({
        repeat: false
      });
      wx.showLoading({
        title: "数据提交中...",
        mask: true
      });

      if (this.data.types == 0) {
        var datas = {
          GroupID: this.data.pGroupID,
          ShopName: this.data.shopname,
          address: this.data.address,
          Contacts: this.data.Contacts,
          Telephone: this.data.Telephone,
          latitudeX: this.data.latitudeX,
          longitudeY: this.data.longitudeY,
          img: this.data.imgone
        };
        utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/NewAddshop", "POST", datas, app.globalData.appkeyid, this.Addshop);
      }else{
        var datas = {
          shopId: this.data.shopid,
          ShopName: this.data.shopname,
          ShopAddress: this.data.address,
          Contacts: this.data.Contacts,
          Telephone: this.data.Telephone,
          latitudeX: this.data.latitudeX,
          longitudeY: this.data.longitudeY,
          ImageOne: this.data.imgone
        };
        utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/UpdateShopName", "POST", datas, app.globalData.appkeyid, this.Addshop);
      }
    } else {
      wx.showToast({
        title: "请勿重复点击",
        icon: "none"
      });
    }
  },

  Addshop: function(res) {
    wx.hideLoading();
    var chat = this;
    chat.setData({
      repeat: true
    });
    var json = res.data.Data;
    if (json.flag) {
      wx.showToast({
        title: json.msg,
        icon: "none"
      });
      chat.setData({
        Popup: true
      });
      var datas = {
        GroupID: chat.data.pGroupID
      }
      utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/GroupShop", "POST", datas, app.globalData.appkeyid, chat.CouponShopView);
    } else {
      wx.showToast({
        title: json.msg,
        icon: "none"
      });
    }
  },
  Jump: function(event) {
    var shopid = event.currentTarget.dataset.id;
    wx.showLoading({
      title: '数据加载中...',
    })
    var datas = {
      GroupID: this.data.pGroupID,
      shopID: shopid
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponShopView/GroupShop", "POST", datas, app.globalData.appkeyid, this.CouponShop);
  },
  CouponShop: function(res) {
    var chat = this;
    var json = res.data.Data;
    wx.hideLoading();
    if (json.flag) {
      chat.data.latitudeX = json.data[0].LatitudeX;
      chat.data.longitudeY = json.data[0].LongitudeY;
      if (json.data[0].ImageOne) {
        chat.setData({
          flag0: true
        });
      }
      chat.setData({
        imgone: json.data[0].ImageOne,
        shopname: json.data[0].ShopName,
        Popup: false,
        imgurl: json.data[0].ImageOne,
        address: json.data[0].ShopAddress,
        Contacts: json.data[0].Contacts,
        Telephone: json.data[0].Telephone,
        shopid: json.data[0].ShopID,
        types: 1
      });
    }
  },
})