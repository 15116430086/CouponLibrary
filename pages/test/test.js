var utils = require("../../utils/util.js")
const app = getApp();
Page({
  data: {
    multiArray: [
      [{
          id: 0,
          name: '无脊柱动物'
        },
        {
          id: 1,
          name: '脊柱动物'
        }
      ],
      [{
          id: 0,
          name: '扁性动物'
        },
        {
          id: 1,
          name: '线形动物'
        },
        {
          id: 2,
          name: '环节动物'
        },
        {
          id: 3,
          name: '软体动物'
        },
        {
          id: 3,
          name: '节肢动物'
        }
      ],
      [{
          id: 0,
          name: '猪肉绦虫'
        },
        {
          id: 1,
          name: '吸血虫'
        }
      ]
    ],
    multiIndex: [0, 0, 0],
    regionData: []
  },

  GetRegionData: function() {
    let that = this;
    var data = {};
    data.pStartLevel = 2
    data.pQueryLevel = 3
    utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponRegionView/GetCouponRegionlevel", "POST", data, app.globalData.appkeyid, that.RegionDataBack)
  },

  RegionDataBack: function(json) {
    console.log(json);
    var json = json.data.Data;
    if (json) {
      console.log(json.msg);
      var mArray=[];
      mArray.push(json.data)
      mArray.push(json.data[0].LevelCoupon_Region)
      mArray.push(json.data[0].LevelCoupon_Region[0].LevelCoupon_Region)
      if (json.flag) {
        this.setData({
          regionData: json.data,
          multiArray:mArray
        });
      }
    }
  },
  bindMultiPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
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
    this.setData(data);
  },

  onLoad: function(Options) {
    let that = this;
    that.GetRegionData();
  }
})