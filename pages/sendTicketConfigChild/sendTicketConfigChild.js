// pages/sendTicketConfigChild/sendTicketConfigChild.js
var utils = require("../../utils/util.js")
const app = getApp();
var mCouponID = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberchecked: true,
    staffchecked: true,
    AppointStaff: 0,
    radio: '1',
    pushList:[
      {
        id: 0,
        name: '普通',
        ischeck:false
      },
      {
        id: 1,
        name: '推荐',
        ischeck: false
      },  
      {
        id: 3,
        name: 'banner',
        ischeck: false
      }
    ],
    shopList: [{
        id: 1,
        name: 'B语言',
        isSelected: true,
        invalidActivty: [{
          cdName: "哈LOL",
          cdId: 1,
          cdType: true,
        }, {
          cdName: "bbbb",
          cdId: 2,
          cdType: true,
        }, {
          cdName: "ccc",
          cdId: 3,
          cdType: true,
        }]
      },
      {
        id: 1,
        name: 'Java',
        isSelected: true,
        invalidActivty: [{
          cdName: "eee",
          cdId: 1,
          cdType: true,
        }, {
          cdName: "ffff",
          cdId: 2,
          cdType: true,
        }, {
          cdName: "gggg",
          cdId: 3,
          cdType: true,
        }]
      }
    ]
  },

  GetData: function() {
    let that = this;
    //显示 加载中的提示
    wx.showLoading({
      title: '数据加载中...',
    })
    var data = {};
    data.pGroupID = app.globalData.AppGroupInfo.GroupID;
    data.pCouponID = mCouponID;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/GetCouponGiveConfigItem", "POST", data, app.globalData.appkeyid, this.GetDataBack)
  },
  GetDataBack: function(json) {
    console.log(json);
    var json = json.data.Data;
    //隐藏 加载中的提示
    wx.hideLoading();
    if (json.flag) {
      console.log(JSON.stringify(json.data));
      this.setData({
        memberchecked: json.data.MemberCollar == 1,
        staffchecked: json.data.AppointStaff > 0,
        radio: json.data.AppointStaff.toString(),
        shopList: json.data.ListCoupon_ShopInfo

      });
    } else {
      wx.showToast({
        title: '没有找到相关数据!',
        icon: 'none',
        duration: 2000
      })
    }
    let pushList = this.data.pushList;
    if (json.dataGroupExtension.length>0){
      for (let i in pushList) {
        if (pushList[i].id == json.dataGroupExtension[0].ExtensionType) {
          pushList[i].ischeck = true;
          this.setData({
            pushList: pushList
          })
        }
      }
    }
    else
    {
      pushList[0].ischeck=true;
      this.setData({
        pushList: pushList
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    mCouponID = options.CouponID;

    let that = this;
    that.GetData();
  },
  // onChange({ detail,e }) {
  //     console.log(detail,e)
  //         // 需要手动对 checked 状态进行更新
  //     this.setData({ checked: detail });
  // },
  onChange(e) {
    console.log(e);
    let that = this;
    let detail = e.detail;
    var data = {};
    let index = e.currentTarget.dataset.index;
    if (index == 1) {
      data.pMemberCollar = detail ? 1 : 0;
      that.setData({
        memberchecked: detail
      })
    } else {
      data.pAppointStaff = detail ? 1 : 0;
      // 需要手动对 checked 状态进行更新
      that.setData({
        staffchecked: detail,
        radio: "1"
      });
    }

    that.setCouponGiveConfig(data);

  },
  radioChange(event) {
    console.log(event)
    let that = this;
    that.setData({
      radio: event.detail
    });
  },
  onAppointStaffClick(event) {
    let that = this;
    const {
      name
    } = event.currentTarget.dataset;
    that.setData({
      radio: name
    });

    if (name === "1") {
      var shopList = that.data.shopList;
      for (let i in shopList) {
        var configStaffList = shopList[i].ListCoupon_GiveConfigStaff
        shopList[i].IsSelected = false;
        for (let j in configStaffList) {
          shopList[i].ListCoupon_GiveConfigStaff[j].cdType = false;
        }
      }

      that.setData({
        shopList: shopList,
      });

      var data = {
        pAppointStaff: name
      };
      that.setCouponGiveConfig(data);
    }

  },
  onStaffSelectedTap: function(e) {
    console.log(e)
    var that = this;
    var findex = e.currentTarget.dataset.findex;
    var index = e.currentTarget.dataset.index;

    that.data.shopList[findex].ListCoupon_GiveConfigStaff[index].cdType = !that.data.shopList[findex].ListCoupon_GiveConfigStaff[index].cdType;

    that.setData({
      shopList: that.data.shopList,
    });
    var staffconfig = [{
      StaffID: that.data.shopList[findex].ListCoupon_GiveConfigStaff[index].StaffID,
      CouponID: mCouponID,
      GroupID: app.globalData.AppGroupInfo.GroupID,
      ShopID: that.data.shopList[findex].ListCoupon_GiveConfigStaff[index].ShopID,
      IsOpenConfig: that.data.shopList[findex].ListCoupon_GiveConfigStaff[index].cdType
    }];
    var data = {
      pAppointStaff: 2,
      pCoupon_GiveConfigInfo: utils.syJsonSafe(staffconfig)
    };

    that.setCouponGiveConfig(data);
  },
  onShopCheckedTap(e) {
    var that = this;
    var idx = e.currentTarget.dataset.index;
    console.log(idx);
    that.data.shopList[idx].IsSelected = !that.data.shopList[idx].IsSelected;
    var isSelected = that.data.shopList[idx].IsSelected;
    var shopStaffConfig = that.data.shopList[idx].ListCoupon_GiveConfigStaff
    var staffconfig = [];
    for (let i in shopStaffConfig) {
      that.data.shopList[idx].ListCoupon_GiveConfigStaff[i].cdType = isSelected
      var cofing = {
        StaffID: that.data.shopList[idx].ListCoupon_GiveConfigStaff[i].StaffID,
        CouponID: mCouponID,
        GroupID: app.globalData.AppGroupInfo.GroupID,
        ShopID: that.data.shopList[idx].ListCoupon_GiveConfigStaff[i].ShopID,
        IsOpenConfig: isSelected
      };
      staffconfig.push(cofing);
    }

    that.setData({
      shopList: that.data.shopList
    });

    var data = {
      pAppointStaff: 2,
      pCoupon_GiveConfigInfo: utils.syJsonSafe(staffconfig)
    };

    that.setCouponGiveConfig(data);

  },

  setCouponGiveConfig: function(data) {
    data.pGroupID = app.globalData.AppGroupInfo.GroupID;
    data.pCouponID = mCouponID;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/SetCouponGiveConfig", "POST", data, app.globalData.appkeyid, this.setCouponGiveConfigBack)
  },
  setCouponGiveConfigBack: function(json) {
    console.log(json);
    var json = json.data.Data;
    if (json.flag) {
      wx.showToast({
        title: '设置成功！',
        icon: 'none',
        duration: 2000
      })
    }
  },


  pushChange(e){
    console.log(e);
    let that = this;
    let pushList = that.data.pushList;
    let detail = e.detail;
    let id = e.currentTarget.dataset.id;
    for (let i in pushList){
      if (id == pushList[i].id){
        pushList[i].ischeck = true;
        that.setData({
          pushList: pushList
        })
      }else{
        pushList[i].ischeck = false;
        that.setData({
          pushList: pushList
        })
      }
    }
    var data={
      pExtensionType:id
    }
    that.groupExtensionOperation(data);
  },  



  groupExtensionOperation:function(data){
    let that = this;
    data.pGroupID = app.globalData.AppGroupInfo.GroupID;
    data.pCouponID = mCouponID;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponGroupView/GroupExtensionOperation", "POST", data, app.globalData.appkeyid, that.groupExtensionOperationBack)
  },
  groupExtensionOperationBack:function(json){
    console.log(json);
    var json = json.data.Data;
    if (json.flag) {
      wx.showToast({
        title: '设置成功！',
        icon: 'none',
        duration: 2000
      })
    }
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