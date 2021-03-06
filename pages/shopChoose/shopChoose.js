// pages/shopChoose/shopChoose.js
var utils = require("../../utils/util.js")
const app = getApp();
var page = 1;
var regionData=[];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: [],
    Grouplist: [], //集团数组对象
    huanlist: [],
    lastpage: 0,
    number: 0,
    shoplist: [],
    show2: false,
    industryName: "全部行业",
    industryCode: "",
    GroupName: "",
    columns: [],
    regionId: "",
    showMask: false,
    multiArray: [],
    multiIndex: [17, 0, 0],  
  },

  /**
     * 生命周期函数--监听页面加载
     */
  onLoad: function (options) {
    let that = this;
    that.setData({
      RegionName: "所有地区"
    })
    that.GetRegionIndustry(); 
    page = 1;
    that.GetData();
    var checkdeList = wx.getStorageSync("resultkey");
    this.setData({
      number: checkdeList.length
    });
  },

  GetRegionIndustry: function () {
    let that = this;

    regionData = wx.getStorageSync('Region');
    var industrylist = wx.getStorageSync('Industry');
    var multiArray = wx.getStorageSync('multiArray');
    if (regionData && industrylist) {
      this.setData({
        columns: industrylist,
        multiArray: multiArray
      });

      return;
    }
    utils.GetRegionIndustry(app.globalData.apiurl + "CouponView/LoginView/GetRegionIndustry", "POST", app.globalData.appkeyid, that.GetRegionIndustry)
  },

  deletetap: function(e) {
    let that = this;
    console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index
    var del = that.data.huanlist[index]
    var oindex = that.data.Grouplist.indexOf(del);
    if (oindex > -1) {
      that.data.result.splice(index, 1);
      console.log(oindex);
    }
    that.data.huanlist.splice(index, 1);
    console.log(that.data.huanlist);
    if (that.data.huanlist.length==0){
      that.setData({
        result: that.data.result,
        number: that.data.huanlist.length,
        huanlist: that.data.huanlist,
        showMask:false
      })
    }else{
      that.setData({
        result: that.data.result,
        number: that.data.huanlist.length,
        huanlist: that.data.huanlist
      })
    }
    
    
  },

  emptytap: function() {
    let that = this;
    that.setData({
      result: [],
      huanlist: [],
      showMask: false
    })
  },

  //商品名称ProductName
  GroupNameInput: function(e) {
    this.setData({
      GroupName: e.detail.value
    })
  },

  search: function() {
    let that = this;
    that.data.regionId = that.data.multiArray[2][that.data.multiIndex[2]].RegionID
    that.GetData();
  },

  GetData: function() {
    let that = this;
    //显示 加载中的提示
    wx.showLoading({
      title: '数据加载中...',
    })
    var data = {};
    data.pGroupID = app.globalData.AppGroupInfo.GroupID;
    data.pPageIndex  = page;
    data.pPageSize = 20;
    data.pRegionName = that.data.RegionName != '' ? that.data.RegionName : app.globalData.regionName;
    data.pIndustryCode = that.data.industryCode;
    data.pQueryKey = that.data.GroupName;  
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponGroupView/GetPageCouponGroup", "POST", data, app.globalData.appkeyid, this.GetDataBack)
  },
  GetDataBack: function(json) {
    let that = this;
    var json = json.data.Data;
    wx.hideLoading();
    if (json.flag) {
      console.log(json.msg);
      if (page == 1) {
        this.setData({
          Grouplist: json.data,
          lastpage: json.pageCount //你的总页数   
        });
      } else {
        //获取上次加载的数据
        var oldlists = that.data.Grouplist;
        var newlists = oldlists.concat(json.data) //合并数据 res.data 你的数组数据
        that.setData({
          Grouplist: newlists,
          lastpage: json.pageCount //你的总页数   
        });
      }

      var checkdeList = wx.getStorageSync("resultkey")
      that.setData({
        result: checkdeList
      });
    } else {
      wx.showToast({
        title: '没有找到相关数据!',
        icon: 'none',
        duration: 2000
      })
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

  isChoice: function(e) {
    let that = this;
    if (!that.data.result.length > 0) {
      wx.showToast({
        title: '请选择店铺!',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    that.data.huanlist = [];
    for (let i in that.data.result) {
      that.setData({
        huanlist: that.data.huanlist.concat(that.data.Grouplist[that.data.result[i]])
      })
    }
    wx.setStorageSync("Groupkey", that.data.huanlist);
    wx.setStorageSync("resultkey", that.data.result);
    console.log(that.data.huanlist);
    wx.navigateBack();
  },

  shoptap: function(e) {
    
    let that = this;
    that.data.huanlist = [];
    for (let i in that.data.result) {
      that.setData({
        huanlist: that.data.huanlist.concat(that.data.Grouplist[that.data.result[i]])
      })
    }
    wx.setStorageSync("Groupkey", that.data.huanlist);
    wx.setStorageSync("resultkey", that.data.result);
    console.log(that.data.huanlist);
    if(that.data.huanlist.length>0){

    that.setData({
      showMask: (!that.data.showMask)
    })
    }else{
      return
    }
  },
  downMask(e) {
    let that = this;
    that.setData({
      showMask: false
    })
  },
  onChange(event) {
    let that = this;
    that.setData({
      result: event.detail,
      number: event.detail.length,
    });
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let that = this;
    if (that.data.lastpage > page) {
      page++
      that.GetData(page);
    } else if (that.data.lastpage == page) {
      page++;
      wx.showToast({
        title: '没有更多数据!',
        icon: 'none',
        duration: 2000
      })
    }
  },

  isChoice: function(e) {
    let that = this;
    that.data.huanlist = [];
    for (let i in that.data.result) {
      that.setData({
        huanlist: that.data.huanlist.concat(that.data.Grouplist[that.data.result[i]])

      })
    }

    if (that.data.huanlist.length == 0) {
      wx.showToast({
        title: '请选择商户!',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    wx.setStorageSync("Groupkey", that.data.huanlist);
    wx.setStorageSync("resultkey", that.data.result);
    wx.navigateBackMiniProgram();
    console.log(that.data.huanlist);
    wx.navigateBack();
  },

  bindMultiPickerCancel: function () {
    //console.log('picker发送取消，携带值为', e.detail.value)
    this.setData({
      RegionName: "所有地区"
    })
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: e.detail.value
    };

    this.setData({
      multiIndex: data.multiIndex,
      RegionName: data.multiArray[2][data.multiIndex[2]].RegionName
    })
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
      multiArray: data.multiArray
      //multiIndex: data.multiIndex,
      //RegionName: data.multiArray[2][data.multiIndex[2]].RegionName
    });
  }
})