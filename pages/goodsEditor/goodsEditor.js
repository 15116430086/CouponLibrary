// pages/goodsEditor/goodsEditor.js
var utils = require("../../utils/util.js")
const app = getApp();
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
    pshow: false,
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
    mainimgNUM: 0,
    mainImage: [{
      url: "/static/images/img.png",
      state: 0
    }, {
      url: "/static/images/img.png",
      state: 0
    }, {
      url: "/static/images/img.png",
      state: 0
    }],
    categoryName: "",
    categoryID: "",
    SpecificationsAttribute: [],
    countNUM: 0,
    attributeNUM: 0,
    ProductSpecifications: [{
      CostPrice: 0,
      SalePrice: 0,
      StockNum: 0,
      Postage: 0,
      Attrivute: []
    }],
    ProductDetails: [{
      url: "/static/images/img.png",
      state: 0
    }],
    upimgnum: 0
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
      productName: e.detail.value
    })
  },
  onDelImageTap: function(e) {
    let that = this;
    const {
      index
    } = e.currentTarget.dataset;
    var mainImage = that.data.mainImage
    mainImage[index].url = "/static/images/img.png";
    mainImage[index].state = 0;

    var mainimgNUM = --that.data.mainimgNUM;
    that.setData({
      mainImage: mainImage,
      mainimgNUM: mainimgNUM
    })
  },
  //商品主图
  onUpImageTap: function(e) {
    let that = this;
    const {
      index
    } = e.currentTarget.dataset;
    var mainImage = that.data.mainImage
    if (mainImage[index].state == 0) {
      utils.UploadImg(1, app.globalData.AppGroupInfo.GroupID, app.globalData.appkeyid, that.UpFileImgBak, index)
    } else {
      wx.previewImage({
        urls: [mainImage[index].url]
      })
    }

  },
  UpFileImgBak: function(img, index) {
    let that = this;
    var mainImage = that.data.mainImage
    mainImage[index].url = img[0];
    mainImage[index].state = 1;
    var mainimgNUM = ++that.data.mainimgNUM;
    if (img.length > 0) {
      that.setData({
        mainImage: mainImage,
        mainimgNUM: mainimgNUM
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
  onDelDetailsTap: function(e) {
    let that = this;
    const {
      index
    } = e.currentTarget.dataset;
    var ProductDetails = that.data.ProductDetails
    ProductDetails[index].url = "/static/images/img.png";
    ProductDetails[index].state = 0;
    var upimgnum = --that.data.upimgnum;
    that.setData({
      ProductDetails: ProductDetails,
      upimgnum: upimgnum
    })
  },
  onAddDelDetailsTap: function(e) {
    let that = this;
    const {
      index
    } = e.currentTarget.dataset;
    var ProductDetails = that.data.ProductDetails
    if (ProductDetails[index].state == 0) {
      utils.UploadImg(1, app.globalData.AppGroupInfo.GroupID, app.globalData.appkeyid, that.UpDetailsImgBak, index)
    } else {
      wx.previewImage({
        urls: [ProductDetails[index].url]
      })
    }
  },
  UpDetailsImgBak: function(img, index) {
    let that = this;
    var ProductDetails = that.data.ProductDetails
    ProductDetails[index].url = img[0];
    ProductDetails[index].state = 1;
    var upimgnum = ++that.data.upimgnum;
    if (ProductDetails.length < 5 && upimgnum == ProductDetails.length)
      ProductDetails.push({
        url: "/static/images/img.png",
        state: 0
      })

    if (img.length > 0) {
      that.setData({
        ProductDetails: ProductDetails,
        upimgnum: upimgnum
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
    var index = e.currentTarget.dataset.index;
    this.data.ProductSpecifications[index].SalePrice = e.detail.value;
  },
  //库存StockNum
  StockNumInput: function(e) {
    var index = e.currentTarget.dataset.index;
    this.data.ProductSpecifications[index].StockNum = e.detail.value;
  },
  AttributeInput: function(e) {
    var index = e.currentTarget.dataset.index;
    var cindex = e.currentTarget.dataset.cindex;
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
    let that = this;
    var oCoupon_Product = {};
    oCoupon_Product.ProductName = that.data.productName;
    if (oCoupon_Product.ProductName == "") {
      wx.showToast({
        title: '请输入商品名称!',
        icon: "none",
        duration: 2000
      })
      return;
    }

    oCoupon_Product.CategoryID = that.data.categoryID;
    if (oCoupon_Product.CategoryID == "") {
      wx.showToast({
        title: '请选择商品所属栏目!',
        icon: "none",
        duration: 2000
      })
      return;
    }

    if (that.data.mainimgNUM == 0) {
      wx.showToast({
        title: '请最少一张商品主图！',
        icon: "none",
        duration: 2000
      })
      return;
    }

    var ProductSpecifications = that.data.ProductSpecifications
    if (ProductSpecifications.length<=0)
    {
      wx.showToast({
        title: '请最少输入一种规格类型！',
        icon: "none",
        duration: 2000
      })
      return;
    }
    for (var i in ProductSpecifications) {
      if (ProductSpecifications[i].SalePrice == "") {
        wx.showToast({
          title: '请输入商品规格' + (parseInt(i) + 1) + '价格！',
          icon: "none",
          duration: 2000
        })
        return;
      }

      if (ProductSpecifications[i].StockNum == "") {
        wx.showToast({
          title: '请输入商品规格' + (parseInt(i) + 1) + '库存！',
          icon: "none",
          duration: 2000
        })
        return;
      }

      var Attrivute = ProductSpecifications[i].Attrivute
      for (var j in Attrivute) {
        if (Attrivute[j].AttrivuteValue == "") {
          wx.showToast({
            title: '请输入商品规格【' + (parseInt(i) + 1) + '】' + Attrivute[j].AttributeName + '！',
            icon: "none",
            duration: 2000
          })
          return;
        }
      }
      ProductSpecifications[i].Postage = that.data.Postage;
      ProductSpecifications[i].AttrivuteValue = JSON.stringify(ProductSpecifications[i].Attrivute)
      if (i == 0) {
        oCoupon_Product.SalePrice = ProductSpecifications[i].SalePrice
        oCoupon_Product.StockNum = ProductSpecifications[i].StockNum
      }
    }

    var mainImage = that.data.mainImage
    for (var i in mainImage) {
      if (i == 0 && mainImage[i].state == 1) {
        oCoupon_Product.ImageOne = mainImage[i].url;
      }
      if (i == 1 && mainImage[i].state == 1) {
        oCoupon_Product.ImageTwo = mainImage[i].url;
      }
      if (i == 2 && mainImage[i].state == 1) {
        oCoupon_Product.ImageThree = mainImage[i].url;
      }
    }

    if (that.data.upimgnum == 0) {
      wx.showToast({
        title: '请最少一张商品描述图片！',
        icon: "none",
        duration: 2000
      })
      return;
    }
    var ProductDetails = that.data.ProductDetails
    var oCoupon_Picture = [];
    for (let i in ProductDetails) {
      if (ProductDetails[i].state == 1) {
        if (i == 0) {
          oCoupon_Product.ProductDetails = ProductDetails[i].url;
        } else {
          oCoupon_Picture.push({
            ImageType: 1,
            ImageURL: ProductDetails[i].url,
            SortIndex: i
          })
        }
      }
    }
    oCoupon_Product.ProductType = that.data.type;
    if (oCoupon_Product.ProductType == 1) {
      var ProductAttribute = that.data.ProductAttribute
      var CustomAttribute = [];
      for (let i in ProductAttribute) {
        if (ProductAttribute[i].IsChecked == 1) {
          CustomAttribute.push({
            AttributeID: ProductAttribute[i].AttributeID,
            name: ProductAttribute[i].AttributeName,
            value: ProductAttribute[i].AttributeValue,
            type: ProductAttribute[i].AttnibuteType
          })
        }
      }
    }
    oCoupon_Product.CustomAttribute = JSON.stringify(CustomAttribute);
    oCoupon_Product.GroupID = app.globalData.AppGroupInfo.GroupID;
    oCoupon_Product.ProductID = that.data.productid;
    wx.showLoading({
      title: '数据加载中...',
    })
    var data = {};
    data.pGroupID = app.globalData.AppGroupInfo.GroupID;
    data.pCoupon_Product = utils.syJsonSafe(oCoupon_Product);
    data.pLsitPicture = utils.syJsonSafe(oCoupon_Picture);
    data.pCoupon_ProductSpecifications = utils.syJsonSafe(ProductSpecifications);

    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponProductView/AddOrEditCouponProduct", "POST", data, app.globalData.appkeyid, this.AddCouponProductBack)
  },

  AddCouponProductBack: function(json) {
    let that = this;
    var json = json.data.Data;
    wx.hideLoading();
    if (json.flag) {
      wx.showToast({
        title: '商品新增成功!',
        icon: "none",
        duration: 2000
      })
      setTimeout(function() {
        wx.navigateBack()
      }, 2000);
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

    }
    that.GetProductCategory()
    that.GetSpecificationsAttribute()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    if (this.data.productid) { //说明是修改
      console.log(this.data.productid);
      this.GetData();
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  GetData: function() {

    //显示 加载中的提示
    wx.showLoading({
      title: '数据加载中...',
    })
    var data = {};
    data.productid = this.data.productid;
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponProductView/GetEditingproducts", "POST", data, app.globalData.appkeyid, this.GetDataBack)
  },
  GetDataBack: function(json) {
    let that = this;
    var json = json.data.Data;
    wx.hideLoading();
    if (json.flag) {
      var productInfo = json.Product
      var productName = productInfo.ProductName

      //商品主图
      var mainimgNUM = that.data.mainimgNUM
      var mainImage = that.data.mainImage
      if (productInfo.ImageOne != "") {
        mainimgNUM++;
        mainImage[0].url = productInfo.ImageOne;
        mainImage[0].state = 1;
      }
      if (productInfo.ImageTwo != "") {
        mainimgNUM++;
        mainImage[1].url = productInfo.ImageTwo
        mainImage[1].state = 1;
      }
      if (productInfo.ImageThree != "") {
        mainimgNUM++;
        mainImage[2].url = productInfo.ImageTwo
        mainImage[2].state = 1;
      }
      var idb = productInfo.ProductType
      var type = productInfo.ProductType
      var categoryID = productInfo.CategoryID
      var categoryName = that.data.categoryName
      var columns = that.data.columns;
      for (let i in columns) {
        if (columns[i].CategoryID == categoryID) {
          categoryName = columns[i].CategoryName
        }
      }
      var postage = productInfo.Postage

      //商品描述
      var ProductDetails = []
      var upimgnum = 0
      if (productInfo.ProductDetails != '') {
        upimgnum++;
        ProductDetails.push({
          url: productInfo.ProductDetails,
          state: 1
        })
      }
      var Picture = json.Picture
      if (Picture) {
        upimgnum += Picture.length
        for (let i in Picture) {
          ProductDetails.push({
            url: Picture[i].ImageURL,
            state: 1
          })
        }
      }
      if (upimgnum < 5) {
        ProductDetails.push({
          url: "/static/images/img.png",
          state: 0
        });
      }

      //业务商品附加属性
      var attributeNUM = 0;
      if (productInfo.CustomAttribute != '') {
        var CustomAttribute = JSON.parse(productInfo.CustomAttribute);
        attributeNUM = CustomAttribute.length
        var ProductAttribute = that.data.ProductAttribute;
        for (let i in ProductAttribute) {
          for (let j in CustomAttribute) {
            if (CustomAttribute[j].AttributeID == ProductAttribute[i].AttributeID) {
              ProductAttribute[i].IsChecked = 1;
              ProductAttribute[i].AttributeName = CustomAttribute[j].name;
              ProductAttribute[i].AttributeValue = CustomAttribute[j].value;
              ProductAttribute[i].AttnibuteType = CustomAttribute[j].type;
            }
          }
        }
      }

      //商品规格
      var ProductSpecifications = [];
      if (json.Coupon_ProductSpecifications) {
        var SpecificationsAttribute = that.data.SpecificationsAttribute
        var Coupon_ProductSpecifications = json.Coupon_ProductSpecifications
        for (let i in Coupon_ProductSpecifications) {
          var Specifications = {
            CostPrice: Coupon_ProductSpecifications[i].CostPrice,
            SalePrice: Coupon_ProductSpecifications[i].SalePrice,
            StockNum: Coupon_ProductSpecifications[i].StockNum,
            Postage: Coupon_ProductSpecifications[i].Postage,
            Attrivute: []
          }

          var Attrivute = JSON.parse(Coupon_ProductSpecifications[i].AttrivuteValue)
          for (let j in Attrivute) {
            Specifications.Attrivute.push({
              AttributeID: Attrivute[j].AttributeID,
              AttributeName: Attrivute[j].AttributeName,
              AttrivuteValue: Attrivute[j].AttrivuteValue,
              IsChecked: Attrivute[j].IsChecked,
              State: Attrivute[j].State
            })

            for (let x in SpecificationsAttribute) {
              if (SpecificationsAttribute[x].AttributeID == Attrivute[j].AttributeID) {
                SpecificationsAttribute[x].IsChecked = 1;
              }
            }
          }
          ProductSpecifications.push(Specifications)
        }
      }

      that.setData({
        idb: idb,
        type: type,
        categoryID: categoryID,
        categoryName: categoryName,
        postage: postage,
        productName: productName,
        mainimgNUM: mainimgNUM,
        upimgnum: upimgnum,
        mainImage: mainImage,
        ProductDetails: ProductDetails,
        SpecificationsAttribute: SpecificationsAttribute,
        ProductSpecifications: ProductSpecifications,
        ProductAttribute: ProductAttribute,
        attributeNUM: attributeNUM
      })

    }
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
  showpPopup() {
    this.setData({
      pshow: true
    });
  },
  onpClose() {
    this.setData({
      pshow: false
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

    var Specifications = {
      CostPrice: 0,
      SalePrice: 0,
      StockNum: 0,
      Postage: 0,
      Attrivute: []
    }

    var SpecificationsAttribute = that.data.SpecificationsAttribute
    for (let i in SpecificationsAttribute) {
      if (SpecificationsAttribute[i].IsChecked == 1) {
        Specifications.Attrivute.push({
          AttributeID: SpecificationsAttribute[i].AttributeID,
          AttributeName: SpecificationsAttribute[i].AttributeName,
          AttrivuteValue: SpecificationsAttribute[i].AttrivuteValue,
          IsChecked: SpecificationsAttribute[i].IsChecked,
          State: SpecificationsAttribute[i].State
        })
      }

    }
    var ProductSpecifications = [Specifications];

    that.setData({
      ProductSpecifications: ProductSpecifications,
      show: false,
    })

  },
  delProductSpecificationsTap: function(e) {
    let that = this;
    const {
      index
    } = e.currentTarget.dataset;
    var pSpecifications = that.data.ProductSpecifications;
    pSpecifications.splice(index, 1);
    that.setData({
      ProductSpecifications: pSpecifications
    })
  },
  onAddSpecificationsTap: function() {
    let that = this;
    var productSpecifications = that.data.ProductSpecifications;
    var specifications = {
      CostPrice: 0,
      SalePrice: 0,
      StockNum: 0,
      Postage: 0,
      Attrivute: []
    }
    var specificationsAttribute = that.data.SpecificationsAttribute
    for (let i in specificationsAttribute) {
      if (specificationsAttribute[i].IsChecked == 1) {
        specifications.Attrivute.push(
          specificationsAttribute[i]
        )
      }
    }
    productSpecifications.push(specifications);
    that.setData({
      ProductSpecifications: productSpecifications
    })
  },
  onCheckdeTap: function(e) {
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
          SpecificationsAttribute: json.sdata,
          ProductAttribute: json.pdata
        });
      }
    }
  },
  onpEnter: function() {
    let that = this;
    that.setData({
      pshow: false
    })
  },
  onpCheckedTap: function(e) {
    let that = this;
    var attributeNUM = that.data.attributeNUM;
    var isChecked = that.data.ProductAttribute[e.target.dataset.id].IsChecked;
    if (isChecked == 1) {
      attributeNUM--
    } else {
      attributeNUM++
    }
    that.data.ProductAttribute[e.target.dataset.id].IsChecked = Math.abs(isChecked - 1)
    that.setData({
      attributeNUM: attributeNUM,
      ProductAttribute: that.data.ProductAttribute
    })
  },
})