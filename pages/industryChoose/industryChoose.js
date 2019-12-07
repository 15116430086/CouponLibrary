var utils = require("../../utils/util.js")
const app = getApp();
Page({
  data: {
    idx: "",
    content: []
  },
  onLoad() {

    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponIndustryView/GetListIndustry", "POST", {}, app.globalData.appkeyid, this.GetCouponIndustry);

  },
  GetCouponIndustry: function(res) {
    var json = res.data.Data;
    var chta = this;
    var industryList = wx.getStorageSync("industryKey");
    if (industryList) {
      for (var i in industryList) {
        for (var s in json.data) {
           console.log(s);
          if (json.data[s].IndustryCode == industryList[i]) {
            json.data[s].shows = "true";
            break;
          }
        }

      }
    }
    chta.setData({
      content: json.data
    });
    console.log(chta.data.content);
  },
  showHide(e) {
    let that = this;
    let index = e.currentTarget.dataset.index;
    console.log(index)
    let item = that.data.content[index];
    //item.shows = !item.shows;
    if (item.shows == "true") {
      item.shows = "false"
    } else {
      item.shows = "true"
    }
    that.setData({
      content: that.data.content
    })

    // for (var i = 0; i < contentFor.length; i++) {　　
    //     if (e.currentTarget.dataset.changeid == contentFor[i].id) {　　　　
    //         var printPrice = "content[" + i + "].shows";　　　　
    //         if (contentFor[i].shows) {　　　　　　
    //             that.setData({　　　　　　　　
    //                 [printPrice]: false　　　　　　
    //             });　　　　
    //         } else {　　　　　　
    //             that.setData({　　　　　　　　
    //                 [printPrice]: true　　　　　　
    //             });　　　　
    //         }　　
    //     } else {　　　　　　
    //         var printPrice1 = "content[" + i + "].shows";　　　　　　
    //         this.setData({　　　　　　　　
    //             [printPrice1]: false　　　　　　
    //         });　　　　
    //     }　　
    // }
  },

  clickTrue(e) {
    let that = this;
    var contentFor = that.data.content;
    let selId = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    let contents = contentFor[index].contents;
    console.log(selId)
    that.setData({
      idx: selId
    })

  },

  /**
   * 确认点击
   */
  goBack: function() {
    var industryList = [];
    var contentlist = this.data.content;
    for (var i in contentlist) {
      if (contentlist[i].shows == "true") {
        industryList= industryList.concat(contentlist[i].IndustryCode);
      }

    }
    wx.setStorageSync("industryKey", industryList);
    wx.navigateBack({
      detail:1
    })
  },
})