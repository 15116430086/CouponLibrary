// pages/merchantReg/merchantReg.js
var utils = require("../../utils/util.js")
const app = getApp();
var regionData = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: true,
    currentId: '1',
    section: [{
      name: '连锁商户',
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
    columns: [],
    industryName: "",
    industryCode: "",
    enterpriseLicensing: "", //营业执照
    mastergraphimg: "", //形象主图
    companyLOGimg: "", //公司LOG
    flag0: false,
    flag1: false,
    flag2: false,
    regAddress: "",
    regionName: "",
    multiArray: [],
    multiIndex: [17, 0, 2],
    Geocoder: [],
    disabled: true,
    GroupName: "", //公司名称   
    Contacts: "", //联系人
    LegalPerson: "", //法人
    CreditCode: "", //社会信用代码
    txtShow:false
  },
  onChange(event) {
    let that = this;
    let checked = that.data.checked;
    let disabled = that.data.disabled;
    that.setData({
      checked: !checked,
      disabled: !disabled
    })
  },
  onRegAddressTap: function() {
    let that = this;
    wx.chooseLocation({
      latitude: app.globalData.latitudeX,
      longitude: app.globalData.longitudeY,
      success(res) {
        console.log(JSON.stringify(res));
        if (res.address) {
          that.setData({
            RegisteredAddress: res.address
          })

          utils.getGeocoder(res.address, that.getGeocoderBack)
        }
      }
    })
  },
  getGeocoderBack: function(res) {
    let that = this;
    var regionName = res.province + res.city + res.district
    var regAddress = that.data.RegisteredAddress.replace(regionName, '')
    this.setData({
      regionName: regionName,
      regAddress: regAddress,
      Geocoder: res,
      txtShow:true

    });
  },
  onPreviewImageTap: function(e) {
    var imgtypeid = e.currentTarget.dataset.type;
    let that = this;
    if (imgtypeid == 0) {
      wx.previewImage({
        urls: [that.data.enterpriseLicensing],
      })
    }
    if (imgtypeid == 1) {
      wx.previewImage({
        urls: [that.data.mastergraphimg],
      })
    }
    if (imgtypeid == 2) {
      wx.previewImage({
        urls: [that.data.companyLOGimg],
      })
    }
  },

  onUpFileImg: function(e) {
    var type = 0;
    var typeid = e.currentTarget.dataset.type;
    if (typeid == 0) { //说明是上传营业执照
      type = 1;
    }
    let that = this;
    utils.UploadImg(1, app.globalData.AppGroupInfo.GroupID, app.globalData.appkeyid, that.UpFileImgBak, typeid, type)
  },
  UpFileImgBak: function(img, type) {
    let that = this;
    if (img.length > 0) {
      if (type == 0) {
        that.setData({
          enterpriseLicensing: img[0], //营业执照
          flag0: true,
        })

        var words_result = JSON.parse(img[1]);
        console.log(words_result);
        var RegisteredAddress = words_result.words_result.地址.words;

        var reg = /.+?(省|市|自治区|自治州|县|区)/g;
        var region = RegisteredAddress.match(reg);
        var regionName = "";
        var regAddress = "";
        if (region) {
          regionName = region.join("");
          regAddress = RegisteredAddress.replace(regionName, '')
        }
        that.setData({
          GroupName: words_result.words_result.单位名称.words,
          RegisteredAddress: RegisteredAddress,
          regionName: regionName,
          regAddress: regAddress,
          LegalPerson: words_result.words_result.法人.words,
          Contacts: words_result.words_result.法人.words,
          CreditCode: words_result.words_result.社会信用代码.words
        });

        utils.getGeocoder(regionName, that.getGeocoderBack)

      } else if (type == 1) {
        that.setData({
          mastergraphimg: img[0], //形象主图
          flag1: true,
        })
      } else if (type == 2) {
        that.setData({
          companyLOGimg: img[0], //公司LOG
          flag2: true,
        })
      }


      if (type == 0) {
        if (words_result.words_result.单位名称.words == "无") {
          wx.showToast({
            title: "营业执照不符合请重新上传!",
            icon: "none",
            duration: 2000
          })
        }
        return;
      }

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

  showPopup() {
    let that = this;
    that.setData({
      show2: true,

    });
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
    });
  },
  onCancel(e) {
    let that = this;
    that.setData({
      show2: false
    }); 
  },
  onFormSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    let that = this;
    var typename = that.data.currentId == "1" ? "【连锁商户】" : "【个体商户】"
    var data = {};
    data.GroupType = that.data.currentId == "1" ? 0 : 1
    data.IndustryCode = that.data.industryCode
    if (data.IndustryCode == '') {
      wx.showToast({
        title: "请选择所属行业！",
        icon: "none",
        duration: 1500
      })
      return;
    }
    data.GroupName = e.detail.value.GroupName
    if (data.GroupName == '') {
      wx.showToast({
        title: "请输入公司全称！",
        icon: "none",
        duration: 1500
      })
      return;
    }
    data.AccountName = data.GroupName
    data.EnterpriseCode = that.data.CreditCode
    data.BankCardNumber = e.detail.value.CorporateBankAccount
    // if (data.BankCardNumber == '') {
    //   wx.showToast({
    //     title: "请输入对公银行账号！",
    //     icon: "none",
    //     duration: 1500
    //   })
    //   return;
    // }
    data.OpeningBank = e.detail.value.OpeningBank
    // if (data.OpeningBank == '') {
    //   wx.showToast({
    //     title: "请输入开户银行！",
    //     icon: "none",
    //     duration: 1500
    //   })
    //   return;
    // }
    data.EnterpriseLicensing = this.data.enterpriseLicensing
    data.ImageOne = this.data.mastergraphimg;
    data.LogoImage = this.data.companyLOGimg;
    if (data.EnterpriseLicensing == '') {
      wx.showToast({
        title: "请上传营业执照！",
        icon: "none",
        duration: 1500
      })
      return;
    }
    if (data.ImageOne == '') {
      wx.showToast({
        title: "请上传公司形象照！",
        icon: "none",
        duration: 1500
      })
      return;
    }

    var regionName = e.detail.value.RegionName
    if (regionName == '') {
      wx.showToast({
        title: "注册地区不能为空",
        icon: "none",
        duration: 1500
      })
      return;
    }
    var regAddress = e.detail.value.RegAddress
    if (regAddress == '') {
      wx.showToast({
        title: "详细地址不能为空",
        icon: "none",
        duration: 1500
      })
      return;
    }
    data.RegionID = that.data.Geocoder.district
    data.RegisteredAddress = e.detail.value.RegionName + e.detail.value.RegAddress

    // var reg = /.+?(省|市|自治区|自治州|县|区)/g;
    // var region = data.RegisteredAddress.match(reg);
    // if (region.length > 0) {
    //   data.RegionID = region[region.length - 1];
    // }
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
    let that = this;
    var multiArray = that.data.multiArray;
    var multiIndex = that.data.multiIndex;
    // 登录
    wx.login({
      success: res => {

        // 发送 res.code 到后台换取 openId, sessionKey, unionId      
        app.globalData.logincode = res.code;

        wx.getUserInfo({
          success: res => {
            // 登录
            var detail = res;
            if (detail.errMsg == "getUserInfo:ok") {
              app.globalData.userInfo = res.userInfo
              data.LatitudeX = that.data.Geocoder.latitude.toString()
              data.LongitudeY = that.data.Geocoder.longitude.toString()
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

        wx.showModal({
          title: '券库商户注册',
          content: json.msg,
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.reLaunch({
                url: '../login/login',
              })
            }
          }
        })

        // setTimeout(
        //   function () {
        //     wx.reLaunch({
        //       url: '../login/login',
        //     })
        //   }, 2000
        // )

        // wx.setStorageSync('miniappkeyid', json.data)
        // var appkeyid = wx.getStorageSync('miniappkeyid');
        // if (appkeyid && appkeyid.FSessionKey && appkeyid.FContent) {
        //   app.globalData.appkeyid = appkeyid.FSessionKey;
        //   var loginInfo = JSON.parse(appkeyid.FContent);
        //   app.globalData.AppWxUserInfo = loginInfo.AppWxUserInfo;
        //   app.globalData.AppStaffInfo = loginInfo.AppStaffInfo;
        //   app.globalData.AppGroupInfo = loginInfo.AppGroupInfo;
        //   wx.reLaunch({
        //     url: '../home/home',
        //   })
        // }
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
    that.GetRegionIndustry();
  },
  //点击每个导航的点击事件
  handleTap: function(e) {
    let id = e.currentTarget.id;
    let that = this;
    if (id) {
      that.setData({
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

  },

  GetRegionIndustry: function() {
    let that = this;
    regionData = wx.getStorageSync('Region');
    var industrylist = wx.getStorageSync('Industry');
    var multiArray = wx.getStorageSync('multiArray');
    console.log(industrylist)
    if (regionData && industrylist) {
      this.setData({
        columns: industrylist,
        multiArray: multiArray
      });

      return;
    }
    utils.GetRegionIndustry(app.globalData.apiurl + "CouponView/LoginView/GetRegionIndustry", "POST", app.globalData.appkeyid, that.GetRegionIndustry)
  },

  getGeocoderRegionBack: function(res) {
    let that = this;
    that.setData({
      Geocoder: res
    });
  },
  bindMultiPickerChange: function(e) {
    let that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: e.detail.value
    };
    var regionName = data.multiArray[0][data.multiIndex[0]].RegionName + data.multiArray[1][data.multiIndex[1]].RegionName + data.multiArray[2][data.multiIndex[2]].RegionName
    that.setData({
      multiIndex: data.multiIndex,
      regionName: regionName
    })

    utils.getGeocoder(regionName, that.getGeocoderRegionBack)

  },
  bindMultiPickerColumnChange: function(e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        data.multiArray[1] = regionData[data.multiIndex[0]].LevelCoupon_Region;
        data.multiArray[2] = regionData[data.multiIndex[0]].LevelCoupon_Region[0].LevelCoupon_Region

        data.multiIndex[1] = 0;
        data.multiIndex[2] = 0;
        break;
      case 1:
        data.multiArray[2] = regionData[data.multiIndex[0]].LevelCoupon_Region[data.multiIndex[1]].LevelCoupon_Region

        data.multiIndex[2] = 0;
        break;
    }
    console.log(data.multiIndex);
    this.setData({
      multiArray: data.multiArray
    });
  }
})