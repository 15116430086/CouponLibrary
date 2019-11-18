// pages/goodsEditor/goodsEditor.js
var utils = require("../../utils/util.js")
const app = getApp();
var Specifications = {
  CostPrice: "",
  SalePrice: "",
  StockNum: "",
  Postage: "",
  Attrivute: []
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked: true,
    type: 0, //0商品，1业务
    productid: '',
    productName: '',
    show: false,
    threeList: [{
        Item_id: "0",
        Item_Name: "普通商品",
        isSelect: false
      },
      {
        Item_id: "1",
        Item_Name: "在线受理业务",
        isSelect: false
      }
    ],
    mainImage: ["/static/images/img.png", "/static/images/img.png", "/static/images/img.png"],
    categoryName: "",
    categoryID: "",
    SpecificationsAttribute: [],
    countNUM: 0,
    ProductSpecifications: [{
      CostPrice: "",
      SalePrice: "",
      StockNum: "",
      Postage: "",
      Attrivute: []
    }]
  },


  selectThree(e) {
    let id = e.target.dataset.id

    this.setData({
      idb: id,
      type: id
    })
  },

  //商品名称ProductName
  ProductNameInput: function(e) {
    this.setData({
      ProductName: e.detail.value
    })
  },
  //商品主图
  onUpImageTap:function(e)
  {
    let that = this;
    const {
      index
    } = e.currentTarget.dataset;
    utils.UploadImg(1, app.globalData.appkeyid, that.UpFileImgBak,index)
  },
  UpFileImgBak: function (img, index) {
    let that = this;
    var mainImage = that.data.mainImage
    mainImage[index]=img[0];
    if (img.length > 0) {
      that.setData({
        mainImage: mainImage,
        flag: true
      })
      wx.showToast({
        title: "上传成功!",
        icon: "none",
        duration: 1000
      })
    } else {
      wx.showToast({
        title: "上传失败!",
        icon: "none",
        duration: 1000
      })
    }
  },
  //价格SalePrice
  SalePriceInput: function(e) {
    const {
      index
    } = e.currentTarget.dataset;
    this.data.ProductSpecifications[index].SalePrice = e.detail.value;   
  },
  //库存StockNum
  StockNumInput: function(e) {
    const {
      index
    } = e.currentTarget.dataset;
    this.data.ProductSpecifications[index].StockNum = e.detail.value; 
  },
  AttributeInput:function(e){
    const {
      index,
      cindex
    } = e.currentTarget.dataset;
    this.data.ProductSpecifications[index].Attrivute[cindex].AttrivuteValue = e.detail.value; 
  },
  //分组Grouping
  GroupingInput: function(e) {
    this.setData({
      Grouping: e.detail.value
    })
  },
  //运费Postage
  PostageInput: function(e) {
    this.setData({
      Postage: e.detail.value
    })
  },
  //业务收费businesscharge
  BusinesschargeInput: function(e) {
    this.setData({
      Businesscharge: e.detail.value
    })
  },

  asd: function(e) {
    wx.showToast({
      title: '请输入商品名称!',
      icon: "none",
      duration: 2000
    })
  },


  //点击发布按钮
  ReleaseProduct: function(event) {
    if (!this.data.ProductName) {
      wx.showToast({
        title: '请输入商品名称!',
        icon: "none",
        duration: 2000
      })
      return;
    }

    if (this.data.type == 0) {
      if (!this.data.SalePrice) {
        wx.showToast({
          title: '请输入价格!',
          icon: "none",
          duration: 2000
        })
        return;
      }
      if (!this.data.StockNum) {
        wx.showToast({
          title: '请输入库存!',
          icon: "none",
          duration: 2000
        })
        return;
      }
    } else if (this.data.type == 1) {
      if (!this.data.Businesscharge) {
        wx.showToast({
          title: '请输入业务收费!',
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
    data.pExpressTel = this.data.ExpressTel

  },



  GetData: function() {
    let that = this;
    //显示 加载中的提示
    wx.showLoading({
      title: '数据加载中...',
    })
    var data = {};
    data.pProductID = that.data.productid;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponProductView/GetCouponProductInfo", "POST", data, app.globalData.appkeyid, this.GetDataBack)
  },
  GetDataBack: function(json) {
    let that = this;
    var json = json.data.Data;
    wx.hideLoading();
    if (json.flag) {
      that.setData({
        productName: json.data[0].ProductName,
        salePrice: json.data[0].SalePrice,
        stockNum: json.data[0].StockNum
      })
    }
  },






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    if (options.productid) {
      that.setData({
        productid: options.productid,
        type: options.type
      })
      that.GetData();
    }
    that.GetProductCategory()
    that.GetSpecificationsAttribute()
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
  showPopup() {
    this.setData({
      show: true
    });
  },

  onClose() {
    this.setData({
      show: false
    });
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
  GetProductCategory: function() {
    let that = this;
    var data = {};
    data.State = 0
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponProductView/GetProductCategory", "POST", data, app.globalData.appkeyid, that.ProductCategoryBack)
  },

  ProductCategoryBack: function(json) {
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
  showPopup2() {
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
      categoryName: value.CategoryName,
      categoryID: value.CategoryID
    })
  },
  onCancel(e) {

    let that = this;
    that.setData({
      show2: false
    })
  },
  onEnter: function() {
    let that = this;
    var Attrivute = [];
    var SpecificationsAttribute = that.data.SpecificationsAttribute
    for (let i in SpecificationsAttribute) {
      if (SpecificationsAttribute[i].IsChecked == 1) {
        Attrivute.push(
          SpecificationsAttribute[i]
        )
      }

    }
    Specifications.Attrivute = Attrivute;
    var ProductSpecifications = []
    ProductSpecifications.push(Specifications);
    that.setData({
      ProductSpecifications: ProductSpecifications,
      show: false,
    })

  },
  onAddSpecificationsTap: function() {
    let that = this;
    var pSpecifications = that.data.ProductSpecifications;
    pSpecifications = pSpecifications.concat(Specifications);
    that.setData({
      ProductSpecifications: pSpecifications
    })
  },
  onChecldeTap: function(e) {
    let that = this;
    var oCountNUM = that.data.countNUM;
    var isChecked = that.data.SpecificationsAttribute[e.target.dataset.id].IsChecked;
    if (oCountNUM == 2 && isChecked == 0) {
      wx.showToast({
        title: '最多选2项',
      })
      return;
    }
    if (isChecked == 1) {
      oCountNUM--
    } else {
      oCountNUM++
    }
    that.data.SpecificationsAttribute[e.target.dataset.id].IsChecked = Math.abs(isChecked - 1)
    that.setData({
      countNUM: oCountNUM,
      SpecificationsAttribute: that.data.SpecificationsAttribute
    })
  },

  GetSpecificationsAttribute: function() {
    let that = this;
    var data = {
      State: 0
    }
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponProductView/GetSpecificationsAttribute", "POST", data, app.globalData.appkeyid, that.SpecificationsAttributeBack)
  },
  SpecificationsAttributeBack: function(json) {
    console.log(json);
    var json = json.data.Data;
    if (json) {
      console.log(json.msg);
      if (json.flag) {
        this.setData({
          SpecificationsAttribute: json.data
        });
      }
    }
  }
})