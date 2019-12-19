// pages/sendTicketTwo/sendTicketTwo.js
let app = getApp();
let utils = require("../../utils/util.js")
var edit = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentId: 0,
    section: [{
      name: '代金券',
      typeId: 0
    }, {
      name: '礼物券',
      typeId: 1
    }],
    value: 3,
    "placeholder": "请输入文本",
    "maxlength": -1, // 最大输入长度，设置为 -1 的时候不限制最大长度
    "focus": true,
    "auto-height": true, // 是否自动增高，设置auto-height时，style.height不生效
    "adjust-position": true, // 键盘弹起时，是否自动上推页面
    getItem: [{
        id: '001',
        title: '仅首次领取',
        isSel: false,
        type: 0
      },
      {
        id: '002',
        title: '可重复领取',
        isSel: false,
        type: 1
      }
    ],
    idx: "",
    shareshow: false,
    getItem1: [{
        id: '001',
        title: '线上受理',
        isSel: false,
        type: 0
      },
      {
        id: '002',
        title: '线下消费',
        isSel: false,
        type: 1
      }
    ],
    idb: "",
    ArrProductchecked: false,
    shareshow1: false,
    getItem2: [{
        id: '001',
        title: '指定日期',
        isSel: false
      },
      {
        id: '002',
        title: '指定时间',
        isSel: false
      }
    ],
    pic_array: [{
        id: 7,
        name: '7天'
      },
      {
        id: 15,
        name: '15天'
      },
      {
        id: 30,
        name: '一个月'
      },
      {
        id: 60,
        name: '两个月'
      },
      {
        id: 90,
        name: '三个月'
      },
      {
        id: 180,
        name: '半年'
      },
      {
        id: 365,
        name: '一年'
      },
      {
        id: 730,
        name: '2年'
      },
      {
        id: 10000,
        name: '不限'
      }
    ],
    idd: "",
    shareshow2: false,
    date: "请选择",
    hexiao: "请选择",
    getRule: "请选择",
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
    show1: false,
    pArrProductID: [],
    pCoupon_Info: {
      CouponType: 0,
      CouponName: "",
      CouponMoney: 1,
      ExpirationDate: '',
      ExpiredType: 10,
      CouponDetails: '',
      ReceiveUpperLimit: 1,
      UsageRule: "",
      ImageOne: "",
      ReceiveRule: 0, //领取规则
      WriteOffType: 0, //核销方式
      SalePrice: 0, //领购售价
      CouponID: "",
      IsAppointProduct: 0

    },
    imageOne: "",
    imageTwo: "",
    imageTre: [],
    idm: "",
    df_value: 2,
    types: 0 //默认类型为添加

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setStorageSync("pArrProductKey", "");
    wx.setStorageSync("ArrProductchecked", false);
    wx.setStorageSync("ProductCount",0);
    if (options.edit) {
      edit = options.edit
      this.setData({
        edit: edit
      })
    }
    if (options.pCoupon_Info) { //说明是修改
      var Info = JSON.parse(options.pCoupon_Info);
      var Coupon_Info = this.data.pCoupon_Info;
      Coupon_Info.CouponName = Info.CouponName;
      Coupon_Info.CouponType = Info.CouponType;
      Coupon_Info.ImageOne = Info.ImageOne;
      Coupon_Info.CouponMoney = Info.CouponMoney;
      Coupon_Info.ExpirationDate = Info.ExpirationDate;
      Coupon_Info.ExpiredType = Info.ExpiredType;
      Coupon_Info.CouponDetails = Info.CouponDetails;
      Coupon_Info.ReceiveUpperLimit = Info.ReceiveUpperLimit;
      Coupon_Info.UsageRule = Info.UsageRule;
      Coupon_Info.ImageOne = Info.ImageOne;
      Coupon_Info.ReceiveRule = Info.ReceiveRule;
      Coupon_Info.WriteOffType = Info.WriteOffType;
      Coupon_Info.SalePrice = Info.SalePrice;
      Coupon_Info.CouponID = Info.CouponID;
      Coupon_Info.IsAppointProduct = Info.IsAppointProduct

      var data = {
        pCouponID: Info.CouponID
      }
      utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/GetCouponInfoPicture", "POST", data, app.globalData.appkeyid, this.GetCouponInfoPictureBack)


      if (Info.ReceiveRule == 0) {
        this.setData({
          getRule: "仅首次领取",
          idx: "001"
        });
      } else {
        this.setData({
          getRule: "可重复领取",
          idx: "002"
        });
      }
      if (Info.WriteOffType == 0) {
        this.setData({
          hexiao: "线上受理",
          idb: "001"
        })
      } else {
        this.setData({
          hexiao: "线下消费",
          idb: "002"
        })
      }

      if (Info.ExpiredType == 0) {
        this.setData({
          //show: true,
          idd: "001"
        });
      } else {
        this.setData({
          //show1: true,
          idd: "002"
        });
      }
      var imageTre = []
      if (Info.CouponDetails != '') {
        imageTre.push(Info.CouponDetails)
      }
      this.setData({
        types: 1,
        pCoupon_Info: Coupon_Info,
        date: Info.ExpirationDate,
        imageOne: Info.ImageOne,
        imageTwo: Info.UsageRule,
        imageTre: imageTre,
        shareshow1: true,
        shareshow2: true,
        shareshow: true
      });
    }

  },
  GetCouponInfoPictureBack: function(res) {
    var that = this;
    var json = res.data.Data;
    var list = [];
    if (json.pdudata) {
      for (var i in json.pdudata) {
        list.push(json.pdudata[i].ProductID);
      }
      wx.setStorageSync("pArrProductKey", list);
      that.setData({
        pArrProductID: list
      });
    }

    if (json.imgDdta) {
      let imageTre = that.data.imageTre;
      for (let i in json.imgDdta) {
        imageTre.push(json.imgDdta[i].ImageURL)
      }

      that.setData({
        imageTre: imageTre
      })

    }
  },
  bindPickerChange_hx: function(e) {
    let that = this;
    console.log('picker发送选择改变，携带值为', e);
    let pic_array = that.data.pic_array;
    let pCoupon_Info = that.data.pCoupon_Info;

    that.setData({ //给变量赋值
      hx_index: e.detail.value,
      df_index: 0,
      date: pic_array[e.detail.value].name //每次选择了下拉列表的内容同时修改下标然后修改显示的内容，显示的内容和选择的内容一致
    });
    pCoupon_Info.ExpiredType = 1;
    pCoupon_Info.ExpirationDate = pic_array[e.detail.value].id.toString();
  },


  formSubmit: function(e) {
    console.log(e.detail.value)
    let val = e.detail.value;
    let that = this;
    let data = {};

    let pCoupon_Info = that.data.pCoupon_Info;
    if (that.data.pArrProductID.length > 0) {
      pCoupon_Info.IsAppointProduct = 1; //指定商品
    }

    if (!this.data.ArrProductchecked && pCoupon_Info.WriteOffType == 0) { //如果是指定商品 并且是线上消费

      if (that.data.pArrProductID.length == 0) {
        wx.showToast({
          title: "请选择商品!",
          icon: "none",
          duration: 1500
        });
        return
      }
    }
    if (this.data.ArrProductchecked && pCoupon_Info.WriteOffType == 0 && wx.getStorageSync("ProductCount")==0) { //如果是全部商品 并且是线上消费
      wx.showToast({
        title: "请先创建商品!",
        icon: "none",
        duration: 1500
      });
      return
    }

    data.pGroupID = app.globalData.AppGroupInfo.GroupID;
    data.pArrProductID = utils.syJsonSafe(that.data.pArrProductID);
    pCoupon_Info.GroupID = app.globalData.AppGroupInfo.GroupID;
    pCoupon_Info.CouponName = val.CouponName; //券名称
    pCoupon_Info.CouponMoney = val.CouponMoney; //券面值
    pCoupon_Info.CouponType = that.data.currentId;
    pCoupon_Info.ReceiveUpperLimit = val.ReceiveUpperLimit; //领取上限
    if (that.data.currentId == 1)
      pCoupon_Info.SalePrice = val.SalePrice;

    if (pCoupon_Info.CouponName == '') {
      wx.showToast({
        title: "请输入券名称!",
        icon: "none",
        duration: 1500
      });
      return
    }
    if (pCoupon_Info.CouponName == '') {
      wx.showToast({
        title: "请输入券名称!",
        icon: "none",
        duration: 1500
      });
      return
    }
    if (pCoupon_Info.CouponMoney == '') {
      wx.showToast({
        title: "请输入券面值!",
        icon: "none",
        duration: 1500
      });
      return
    }

    if (pCoupon_Info.ReceiveUpperLimit == '' || pCoupon_Info.ReceiveUpperLimit == 0) {
      wx.showToast({
        title: "请输入领取上限!",
        icon: "none",
        duration: 1500
      });
      return
    }
    if (pCoupon_Info.SalePrice == '' && that.data.currentId == 1) {
      wx.showToast({
        title: "请输入销售价!",
        icon: "none",
        duration: 1500
      });
      return
    }
    if (pCoupon_Info.ImageOne == '') {
      wx.showToast({
        title: "请上传券主图!",
        icon: "none",
        duration: 1500
      });
      return
    }
    if (pCoupon_Info.UsageRule == '') {
      wx.showToast({
        title: "请上传使用规则!",
        icon: "none",
        duration: 1500
      });
      return
    }
    var imageTre = that.data.imageTre;
    if (imageTre.length == 0) {
      wx.showToast({
        title: "请上传券详情!",
        icon: "none",
        duration: 1500
      });
      return
    }
    var oCoupon_Picture = []
    for (let i in imageTre) {
      if (i == 0) {
        pCoupon_Info.CouponDetails = imageTre[0];
      } else {
        oCoupon_Picture.push({
          ImageType: 0,
          ImageURL: imageTre[i],
          SortIndex: i
        })
      }
    }

    data.pCoupon_Info = utils.syJsonSafe(pCoupon_Info);
    data.pLsitPicture = utils.syJsonSafe(oCoupon_Picture);

    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/NewCouponInfo", "POST", data, app.globalData.appkeyid, that.GetDataBack)

  },
  GetDataBack(json) {
    let that = this;
    console.log(json);
    var json = json.data.Data;
    let pCoupon_Info = JSON.stringify(that.data.pCoupon_Info);
    if (json.flag) {
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2]; //上一个页面
      prevPage.setData({
        isRefresh: true
      });
      console.log(json.msg);
      wx.redirectTo({
        url: '../startTicket/startTicket?pCoupon_Info=' + pCoupon_Info + "&CouponID=" + json.CouponID,
      })
    } else {
      wx.showToast({
        title: json.msg,
        icon: "none",
        duration: 2000
      })
      console.log(json.msg);
    }
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

  confirmDate(e) {
    console.log(e.detail);
    let that = this;
    let timer = e.detail;
    let pCoupon_Info = that.data.pCoupon_Info;
    timer = utils.formatTime(timer);
    console.log(timer)
    pCoupon_Info.ExpirationDate = timer;
    pCoupon_Info.ExpiredType = 0;
    that.setData({
      date: timer,
      show: false
    })
  },
  //领购规则 
  clickRule(e) {
    var that = this;
    var shareshow = that.data.shareshow
    that.setData({
      shareshow: !that.data.shareshow
    })
  },

  clickTrue(e) {
    let that = this;
    if (that.data.edit == '0') {
      return //查看详情不可编辑
    }
    let id = e.currentTarget.dataset.id;
    let pCoupon_Info = that.data.pCoupon_Info;
    let type = e.currentTarget.dataset.type;
    pCoupon_Info.ReceiveRule = type;
    console.log(type)

    if (type == 0) {
      that.setData({
        getRule: "仅首次领取",
        idx: id
      });
    } else {
      that.setData({
        getRule: "可重复领取",
        idx: id
      });
    }
  },
  jumpChoose: function() {
    wx.navigateTo({
      url: '../chooseBuyGoods/chooseBuyGoods',
    })
  },
  // 核销方式
  clickRule1(e) {
    var that = this;
    var shareshow = that.data.shareshow1
    that.setData({
      shareshow1: !that.data.shareshow1
    })
  },
  clickTrue1(e) {
    let that = this;
    if (that.data.edit == '0') {
      return //查看详情不可编辑
    }
    let id = e.currentTarget.dataset.id;
    let pCoupon_Info = that.data.pCoupon_Info;
    let type = e.currentTarget.dataset.type;
    pCoupon_Info.WriteOffType = type;
    if (type == 0) {
      that.setData({
        hexiao: "线上受理",
        idb: id
      });
      wx.navigateTo({
        url: '../chooseBuyGoodsTwo/chooseBuyGoodsTwo',
      })

    } else {
      wx.setStorageSync("ArrProductchecked", false); //清除线上全部缓存
      wx.setStorageSync("pArrProductKey", "");
      that.setData({
        hexiao: "线下消费",
        idb: id,
        pArrProductID: []
      })
    }

  },


  // 券有效期
  clickRule2(e) {
    var that = this;
    var shareshow = that.data.shareshow2
    that.setData({
      shareshow2: !that.data.shareshow2
    })
  },
  clickTrue2(e) {
    let that = this;
    if (that.data.edit == '0') {
      return //查看详情不可编辑
    }
    let id = e.currentTarget.dataset.id;
    if (id == "001") {
      that.setData({
        show: true
      });
    } else {
      that.setData({
        show1: true
      });
    }
    that.setData({
      idd: id
    })
  },
  onConfirm(event) {
    console.log(event)
  },

  onCancel(e) {
    console.log(e);
    this.setData({
      show: false
    });
  },
  onInput(event) {
    this.setData({
      currentDate: event.detail
    });
  },
  onChange(event) {
    const {
      picker,
      value,
      index
    } = event.detail;
    Toast(`当前值：${value}, 当前索引：${index}`);
  },
  onClose() {
    this.setData({
      show: false
    });
  },

  onChance() {
    this.setData({
      show: false
    });
  },


  //添加图片
  imgadd(e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    console.log(id);
    let pAppKeyId = app.globalData.appkeyid
    utils.UploadImg(app.globalData.upimgurl, 1, app.globalData.AppGroupInfo.GroupID, pAppKeyId, that.pCallBack, id)

  },
  pCallBack(e, id) {
    console.log(e)
    console.log(id)
    let img = e[0]
    console.log(img)
    let that = this;
    let pCoupon_Info = that.data.pCoupon_Info;


    if (img.length > 0) {
      pCoupon_Info.ImageOne = img
      that.setData({
        imageOne: img
      })
    }
  },

  preImg(e) {
    let that = this;
    let srcImg = that.data.imageOne;
    let srcArr = [];
    srcArr.push(srcImg);
    wx.previewImage({
      current: srcImg, // 当前显示图片的http链接  
      urls: srcArr
    })
  },
  delImg(e) {
    this.setData({
      imageOne: ""
    })
  },

  //添加图片
  imgadd2(e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    let pAppKeyId = app.globalData.appkeyid
    utils.UploadImg(app.globalData.upimgurl, 1, app.globalData.AppGroupInfo.GroupID, pAppKeyId, that.pCallBack2)

  },
  pCallBack2(e) {
    console.log(e)
    console.log(img)
    let that = this;
    let pCoupon_Info = that.data.pCoupon_Info;
    let img = e[0]


    if (img.length > 0) {
      pCoupon_Info.UsageRule = img;
      that.setData({
        imageTwo: img
      })
    }
  },

  preImg2(e) {
    let that = this;
    let srcImg = that.data.imageTwo;
    let srcArr = [];
    srcArr.push(srcImg);
    wx.previewImage({
      current: srcImg, // 当前显示图片的http链接  
      urls: srcArr
    })
  },
  delImg2(e) {
    this.setData({
      imageTwo: ""
    })
  },


  imgadd3(e) {
    let that = this;
    let id = e.currentTarget.dataset.id;
    console.log(id);
    let pAppKeyId = app.globalData.appkeyid
    let imageTre = that.data.imageTre;
    utils.UploadImg(app.globalData.upimgurl, 5 - imageTre.length, app.globalData.AppGroupInfo.GroupID, pAppKeyId, that.pCallBack3)

  },
  pCallBack3(e) {
    console.log(e)
    let that = this;
    let imageTre = that.data.imageTre;
    let img = e;

    if (img.length > 0) {
      imageTre = imageTre.concat(img);
      that.setData({
        imageTre: imageTre
      })
    }
  },
  preImg3(e) {
    let that = this;
    let srcImg = that.data.imageTre;

    let id = e.currentTarget.dataset.index;

    wx.previewImage({
      current: srcImg[id],
      urls: srcImg
    })
  },
  delImg3(e) {
    let that = this;
    let imageTre = that.data.imageTre;
    let itemIndex = e.currentTarget.dataset.index;
    imageTre.splice(itemIndex, 1);
    that.setData({
      imageTre: imageTre
    })
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
    var checked = wx.getStorageSync("ArrProductchecked");
    this.setData({
      edit: edit,
      ArrProductchecked: checked
    })
    var productList = wx.getStorageSync("pArrProductKey");
    if (productList.length > 0) {
      this.setData({
        pArrProductID: productList
      });
    }

    // that.data.pCoupon_Info.pArrProductID = that.data.pArrProductID;
    // console.log(that.data.pCoupon_Info)
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