// pages/merchantReg/merchantReg.js
var utils = require("../../utils/util.js")
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentId: '1',
    section: [{
      name: '集团商户',
      typeId: '1'
    }, {
      name: '个体商户',
      typeId: '2'
    }],
    "placeholder": "请输入文本",
    "maxlength": -1, // 最大输入长度，设置为 -1 的时候不限制最大长度   
    "auto-height": true, // 是否自动增高，设置auto-height时，style.height不生效
    "adjust-position": true, // 键盘弹起时，是否自动上推页面
    show2: false,
    columns: ["现金券", "团购券"],
    industryName: "",
    industryCode: "",
    enterpriseLicensing: "http://test.miboon.com/file/image/20191025215104232.jpg",
    flag: false,
    regAddress: "湖南长沙五一大道59号", 
    multiArray: [ ],
    multiIndex: [0, 0, 0],
    regionData: []
  },
  onRegAddressTap: function() {
    let that = this;
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success(res) {
              that.getLocation();
            }
          })
        } else {
          that.getLocation();
        }
      }
    })
  },
  getLocation: function() {
    //显示 加载中的提示
    wx.showLoading({
      title: '正在获取你的地理位置...',
    })
    let that = this;
    wx.getLocation({
      type: 'gcj02',
      altitude: true,
      isHighAccuracy: true,
      success(res) {
        console.log(JSON.stringify(res));
        app.globalData.latitudeX = res.latitude
        app.globalData.longitudeY = res.longitude

        wx.chooseLocation({
          latitude: res.latitude,
          longitude: res.longitude,
          success(res) {
            console.log(JSON.stringify(res));
            if (res.address)
              that.setData({
                regAddress: res.address
              })
          }
        })
      },
      complete(res) {
        //隐藏 加载中的提示
        wx.hideLoading();
      }
    })
  },
  onPreviewImageTap:function()
  {
    let that=this;

    wx.previewImage({
      urls:[that.data.enterpriseLicensing],      
    })
  },
  onUpFileImg: function() {
    let that = this;
    utils.UploadImg(1, app.globalData.appkeyid, that.UpFileImgBak)
  },
  UpFileImgBak: function(img) {
    let that = this;
    if (img.length > 0) {
      that.setData({
        enterpriseLicensing: img[0],
        flag: true
      })
      wx.showToast({
        title: "上传成功!",
        icon: "none",
        duration: 2000
      })
    } else {
      wx.showToast({
        title: "上传失败!",
        icon: "none",
        duration: 2000
      })
    }
  },
  GetData: function() {
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
          columns: json.data
        });
      }
    }
  },

  showPopup() {
    let that = this;
    that.setData({
      show2: true
    })
  },

  //券类型选择
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
      industryName: value.IndustryName,
      industryCode: value.IndustryCode
    })
  },
  onCancel(e) {

    let that = this;
    that.setData({
      show2: false
    })
  },
  onFormSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let that = this;
    var typename = that.data.currentId == "1" ? "【集团商户】" : "【个体商户】"
    var data = {};
    data.GroupType = that.data.currentId == "1" ? 0 : 1
    data.IndustryCode = that.data.industryCode
    if (data.IndustryCode == '') {
      wx.showToast({
        title: "请选择据属行业！",
        icon: "none",
        duration: 1500
      })

      return;
    }
    data.GroupName = e.detail.value.GroupName
    if (data.GroupName == '') {
      wx.showToast({
        title: "请输公司全称！",
        icon: "none",
        duration: 1500
      })

      return;
    }
    data.EnterpriseLicensing = this.data.enterpriseLicensing
    if (data.EnterpriseLicensing == '') {
      wx.showToast({
        title: "请上转营业执照！",
        icon: "none",
        duration: 1500
      })

      return;
    }

    data.LegalPerson = e.detail.value.RegAddress
    if (data.LegalPerson == '') {
      wx.showToast({
        title: "注册地址不能为空",
        icon: "none",
        duration: 1500
      })

      return;
    }

    data.LegalPerson = e.detail.value.LegalPerson
    if (data.LegalPerson == '') {
      wx.showToast({
        title: "请输入公司法人姓名",
        icon: "none",
        duration: 1500
      })

      return;
    }
    data.Contacts = e.detail.value.Contacts
    if (data.Contacts == '') {
      wx.showToast({
        title: "请输入联系人姓名",
        icon: "none",
        duration: 1500
      })

      return;
    }
    data.Telephone = e.detail.value.Telephone
    if (data.Telephone == '') {
      wx.showToast({
        title: "请输入注册手机号",
        icon: "none",
        duration: 1500
      })

      return;
    }

    wx.showModal({
      title: '券库商户注册',
      content: '您确定注册成' + typename,
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.RegCouponGroup(data)
        }
      }
    })
  },

  RegCouponGroup: function(data) {
    // 登录
    wx.login({
      success: res => {
        let that = this;
        // 发送 res.code 到后台换取 openId, sessionKey, unionId      
        app.globalData.logincode = res.code;

        wx.getUserInfo({
          success: res => {
            // 登录
            var detail = res;
            if (detail.errMsg == "getUserInfo:ok") {
              app.globalData.userInfo = res.userInfo
              data.LatitudeX = app.globalData.latitudeX.toString()
              data.LongitudeY = app.globalData.longitudeY.toString()
              data.RegionID = "430102";
              data = {
                pCoupon_Group: utils.syJsonSafe(data),
                Text: res.encryptedData,
                AesIV: res.iv,
                Code: app.globalData.logincode
              }
              utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponGroupView/RegCouponGroupAndLogin", "POST", data, app.globalData.appkeyid, that.RegCouponGroupBack)
            } else {
              wx.showToast({
                title: "获取微信用户信息授权失败!",
                icon: "none",
                duration: 2000
              })
            }
          }
        })

      }
    })

  },

  RegCouponGroupBack: function(json) {
    console.log(json);
    var json = json.data.Data;
    if (json) {
      console.log(json.msg);
      if (json.flag) {
        wx.setStorageSync('miniappkeyid', json.data)
        var appkeyid = wx.getStorageSync('miniappkeyid');
        if (appkeyid) {
          app.globalData.appkeyid = appkeyid.FSessionKey;
          var loginInfo = JSON.parse(appkeyid.FContent);
          app.globalData.AppWxUserInfo = loginInfo.AppWxUserInfo;
          app.globalData.AppStaffInfo = loginInfo.AppStaffInfo;
          app.globalData.AppGroupInfo = loginInfo.AppGroupInfo;
          wx.reLaunch({
            url: '../home/home',
          })
        }
      } else {
        wx.showToast({
          title: json.msg,
          icon: "none",
          duration: 1500
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.GetData();
    that.GetRegionData();
  },
  //点击每个导航的点击事件
  handleTap: function(e) {
    let id = e.currentTarget.id;
    if (id) {
      this.setData({
        currentId: id
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

  }, GetRegionData: function () {
    let that = this;
    var data = {};
    data.pStartLevel = 2
    data.pQueryLevel = 3
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponRegionView/GetCouponRegionlevel", "POST", data, app.globalData.appkeyid, that.RegionDataBack)
  },

  RegionDataBack: function (json) {
    console.log(json);
    var json = json.data.Data;
    if (json) {
      console.log(json.msg);
      var mArray = [];
      mArray.push(json.data)
      mArray.push(json.data[0].LevelCoupon_Region)
      mArray.push(json.data[0].LevelCoupon_Region[0].LevelCoupon_Region)
      if (json.flag) {
        this.setData({
          regionData: json.data,
          multiArray: mArray
        });
      }
    }
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        data.multiArray[1] = this.data.regionData[data.multiIndex[0]].LevelCoupon_Region;
        data.multiArray[2] = this.data.regionData[data.multiIndex[0]].LevelCoupon_Region[0].LevelCoupon_Region

        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        data.multiArray[2] = this.data.regionData[data.multiIndex[0]].LevelCoupon_Region[data.multiIndex[1]].LevelCoupon_Region

        data.multiIndex[2] = 0;
        break;
    }
    console.log(data.multiIndex);
    this.setData({
      multiArray: data.multiArray,
      multiIndex: data.multiIndex
    });
  }
})