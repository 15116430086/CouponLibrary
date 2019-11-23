let app = getApp();
let utils = require("../../utils/util.js")
Page({
  data: {
    idx: "",
    idb: "",
    index: 0,
    xzindex: 0,
    content: [],
    RegionIDList: []

  },
  onLoad: function(options) {
    wx.showLoading({
      title: "数据加载中...",
      mask: true
    });
    this.GetRegionIndustry();
  },
  GetRegionIndustry: function() {
    let that = this;

    var regionData = wx.getStorageSync('Region');
    if (regionData) {
      this.setData({
        content: regionData
      });
      wx.hideLoading();
      console.log(regionData);
      return;
    }
    utils.GetRegionIndustry(app.globalData.apiurl + "CouponView/LoginView/GetRegionIndustry", "POST", app.globalData.appkeyid, that.GetRegionIndustry)
  },
  isHasElement: function(value) {
    var arr = this.data.RegionIDList;
    var index = arr.indexOf(value);
    if (index >-1) {      
      arr.splice(index, 1);
      this.setData({
        RegionIDList: arr
      });
    } 
  },

  showHide2: function(event) { //点击省选择框  如果是选中 那当前省下面的市区都选中  取消择都取消
    var contentFor = this.data.content;
    var RegionID = event.currentTarget.dataset.id;
    var arr = [];
    for (var i in contentFor) {
      if (RegionID == contentFor[i].RegionID) {
        contentFor[i].isSel = !contentFor[i].isSel;
        for (var s in contentFor[i].LevelCoupon_Region) {
          contentFor[i].LevelCoupon_Region[s].isSel = !contentFor[i].LevelCoupon_Region[s].isSel
          for (var j in contentFor[i].LevelCoupon_Region[s].LevelCoupon_Region) {
            contentFor[i].LevelCoupon_Region[s].LevelCoupon_Region[j].isSel = !contentFor[i].LevelCoupon_Region[s].LevelCoupon_Region[j].isSel;
            if (contentFor[i].LevelCoupon_Region[s].LevelCoupon_Region[j].isSel) {
              arr.push(contentFor[i].LevelCoupon_Region[s].LevelCoupon_Region[j].RegionID); //保存区的编号
            } else { //移除编号

             this.isHasElement(contentFor[i].LevelCoupon_Region[s].LevelCoupon_Region[j].RegionID)
            }
          }

        }
        break;
      }
    }
    this.setData({
      content: contentFor,
      RegionIDList: arr
    });
  },

  showMasks: function(event) { //点击省
    var contentFor = this.data.content;
    var RegionID = event.currentTarget.dataset.changeid;
    var index = event.currentTarget.dataset.index;
    if (index != this.data.index) {
      contentFor[this.data.index].shows = false;
    }
    contentFor[index].shows = !contentFor[index].shows;
    this.setData({
      content: contentFor,
      index: index
    });
  },
  showMaskChilds: function(event) { //点击市
    var inx = this.data.index;
    var RegionID = event.currentTarget.dataset.id;
    var mindex = event.currentTarget.dataset.sindex
    var contentFor = this.data.content; //得到整个对象
    contentFor[inx].LevelCoupon_Region[mindex].shows = !contentFor[inx].LevelCoupon_Region[mindex].shows
    this.setData({
      content: contentFor, xzindex: mindex
    });
  },
  clickTrue2:function(event){//选择市勾选框 那么省 当前市 区都勾选上
     var arr = [];
     var content = this.data.content;
     var inx = this.data.index;
    var sindex = event.currentTarget.dataset.mindex;
     var RegionID = event.currentTarget.dataset.id;
    content[inx].isSel = !content[inx].isSel;
    content[inx].LevelCoupon_Region[sindex].isSel = !content[inx].LevelCoupon_Region[sindex].isSel;
    for (var i in content[inx].LevelCoupon_Region[sindex].LevelCoupon_Region){
      content[inx].LevelCoupon_Region[sindex].LevelCoupon_Region[i].isSel = !content[inx].LevelCoupon_Region[sindex].LevelCoupon_Region[i].isSel;
      if (content[inx].LevelCoupon_Region[sindex].LevelCoupon_Region[i].isSel){
        arr.push(content[inx].LevelCoupon_Region[sindex].LevelCoupon_Region[i].RegionID); //保存区的编号
      }else{
        this.isHasElement(content[inx].LevelCoupon_Region[sindex].LevelCoupon_Region[i].RegionID)
      }
     }
    this.setData({
      content: content,
      RegionIDList: arr
    });
  },
  clickTwo:function(event){
    var arr = [];
    var content = this.data.content;
    var cindex = event.currentTarget.dataset.cindex;
    var inx = this.data.index;
    var xzindex = this.data.xzindex;
    content[inx].LevelCoupon_Region[xzindex].LevelCoupon_Region[cindex].isSel = !content[inx].LevelCoupon_Region[xzindex].LevelCoupon_Region[cindex].isSel;
    //content[inx].LevelCoupon_Region[xzindex].isSel = !content[inx].LevelCoupon_Region[xzindex].isSel
    //content[inx].isSel = !content[inx].isSel;
    if (content[inx].LevelCoupon_Region[xzindex].LevelCoupon_Region[cindex].isSel){
      arr.push(content[inx].LevelCoupon_Region[xzindex].LevelCoupon_Region[cindex].RegionID);
    }else{
      this.isHasElement(content[inx].LevelCoupon_Region[xzindex].LevelCoupon_Region[cindex].RegionID)
    }
    var list = this.data.RegionIDList;
    list.push(arr);
    this.setData({
      content: content,
      RegionIDList: list
    });
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
   
    wx.setStorageSync("regionList", this.data.RegionIDList);
  },

})