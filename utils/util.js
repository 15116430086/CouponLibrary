// 引入SDK核心类
var QQMapWX = require('qqmap-wx-jssdk.js');
// 实例化API核心类
var qqmapsdk = new QQMapWX({
  key: 'AFXBZ-HPG64-DE7UB-DOPGT-5NEG7-TDFZS' // 必填
});

const formatTime = date => {
  var date = new Date(date);
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  return [year, month, day].map(formatNumber).join('/')

}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function AjaxRequest(pUrl, pType, pData, pAppKeyId, pCallBack) {
  wx.request({
    url: pUrl, //仅为示例，并非真实的接口地址
    data: pData,
    header: {
      'content-type': 'application/x-www-form-urlencoded', // 默认值
      "appKeyId": pAppKeyId
    },
    method: pType,
    success(res) {
      pCallBack(res);
    },
    fail(res) {
      wx.showToast({
        title: res.errMsg //'请求失败',
      })
    }
  })
}

function consoleLog(msg) {
  console.log(msg);

}

/**
 * 日期格式化
 * value 将要格式化的值
 * format 格式化的格式
 **/
function sysFormatDate(value, format, isapi) {
  if (!value) {
    return "";
  }
  if (isapi) {
    value = GetDateRemoveT(value);
  }
  var date;
  if (/\/Date\((.*)\+.*\//.test(value)) {
    value = RegExp.$1;

    date = new Date();
    date.setTime(value);
  } else {
    if (typeof value === "string") {
      date = new Date(value);
    } else if (typeof value === "object") {
      date = value;
    } else {
      return "";
    }
  }

  try {
    var o = {
      "M+": date.getMonth() + 1,
      "d+": date.getDate(),
      "h+": date.getHours(),
      "m+": date.getMinutes(),
      "s+": date.getSeconds(),
      "q+": Math.floor((date.getMonth() + 3) / 3),
      "S": date.getMilliseconds()
    }

    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
    }
  } catch (e) {
    return "";
  }
  return format;
}

function GetDateRemoveT(d) {
  var date = d.replace('T', ' ');
  return date;
}
/**
 * 格式化金额，抹掉结尾的.00
 **/
function syFormatMoney(value) {
  if (!value) {
    return "0";
  }

  if (typeof value !== "string") {
    value = value.toString();
  }

  return value.replace(/^(\d+)(?:\.0+$|(\.\d+?)0+$)/, "$1$2");
}

function syJsonSafe(obj) {
  var oBackStr = JSON.stringify(obj);
  oBackStr = oBackStr.replace(/\+/g, "%2B");
  return escape(oBackStr);
}


function UploadImg(count,pGroupID, pAppKeyId, pCallBack, pOther) {
  wx.chooseImage({
    count: count,
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success(res) {
      // tempFilePath可以作为img标签的src属性显示图片
      var tempFilePaths = res.tempFilePaths;
      var sum = 0;
      var imgs = [];
      for (var s in tempFilePaths) {
        const uploadTask = wx.uploadFile({
          url: "https://wx.wap.meiguwen.com/LibraryAPI/CouponView/UploadImageView/UploadImgs", //开发者服务器的 url
          filePath: tempFilePaths[s], // 要上传文件资源的路径 String类型！！！
          name: 'fileUp', // 文件对应的 key ,(后台接口规定的关于图片的请求参数)
          formData: {
            pGroupID: pGroupID
          },
          header: {
            'content-type': 'multipart/form-data', // 默认值
            "appKeyId": pAppKeyId
          }, // HTTP 请求中其他额外的参数
          success: function(res) {
            var json = JSON.parse(res.data);
            json.Data = json.Data.replace("true|", "");
            imgs.push(json.Data);
            if (imgs.length == tempFilePaths.length) {
              wx.hideLoading();
              pCallBack(imgs, pOther);
            }
          },
          fail: function(res) {}
        });
        uploadTask.onProgressUpdate((res) => {

          if (res.progress == 100)
            sum = sum + 1;

          var pe = sum / tempFilePaths.length * 100;

          wx.showLoading({
            title: "上传进度" + pe + "%",
            mask: true
          });
        })
      }
    }
  });

}

function GetRegionIndustry(pUrl, pType, pAppKeyId, pCallBack) {
  let that = this;
  wx.showLoading({
    title: '数据加载中...',
  })
  var pData = {};
  pData.pStartLevel = 2
  pData.pQueryLevel = 3
  pData.State = 0

  wx.request({
    url: pUrl, //仅为示例，并非真实的接口地址
    data: pData,
    header: {
      'content-type': 'application/x-www-form-urlencoded', // 默认值
      "appKeyId": pAppKeyId
    },
    method: pType,
    success(res) {
      GetRegionIndustryBack(res, pCallBack);
    },
    fail(res) {
      wx.showToast({
        title: res.errMsg //'请求失败',
      })
    }
  })
}

function GetRegionIndustryBack(json, pCallBack) {
  console.log(json);
  wx.hideLoading();
  var json = json.data.Data;
  if (json.flag) {
    console.log(json.msg);
    var mArray = [];
    mArray.push(json.dataRegion)
    mArray.push(json.dataRegion[17].LevelCoupon_Region)
    mArray.push(json.dataRegion[17].LevelCoupon_Region[0].LevelCoupon_Region)
    var industrylist = [{
      text: "全行业",
      industryName: "全行业",
      industryCode: ""
    }];
    industrylist = industrylist.concat(json.dataIndustry)
    wx.setStorageSync('Industry', industrylist);
    wx.setStorageSync('Region', json.dataRegion);
    wx.setStorageSync('multiArray', mArray);
    if (pCallBack)
      pCallBack();
  }
}

function reverseGeocoder(pCallBack) {       
  qqmapsdk.reverseGeocoder({    
    // location: {
    //   latitude: latitude,
    //   longitude: longitude
    // },
    sig: 'KkXF9nGuNrp3LWqyWPrbvTtbHSgC2eu',
    success: function(res) { //成功后的回调
              
      console.log(res);        
      var res = res.result;        
      var mks = [];        
      mks.push({ // 获取返回结果，放到mks数组中
                  
        title: res.address,
                  id: 0,
                  latitude: res.location.lat,
                  longitude: res.location.lng,
                  iconPath: './resources/placeholder.png', //图标路径
                  width: 20,
                  height: 20,
                  callout: { //在markers上展示地址名称，根据需求是否需要
                      
          content: res.address,
                      color: '#000',
                      display: 'ALWAYS'          
        },
        ad_info: res.ad_info
      });
      if (pCallBack)
        pCallBack(mks);      
    },
          fail: function(error) {        
      console.error(error);      
    },
          complete: function(res) {        
      console.log(res);      
    }    
  })

}

function getGeocoder(address, region,pCallBack) {
  //调用地址解析接口
  qqmapsdk.geocoder({
    //获取表单传入地址
    address: address, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
    region: region,
    sig: 'KkXF9nGuNrp3LWqyWPrbvTtbHSgC2eu',
    success: function(res) { //成功后的回调
      console.log(res);
      var res = res.result;
      var newres = {
        latitude: res.location.lat,
        longitude: res.location.lng,
        province: res.address_components.province,
        city: res.address_components.city,
        district: res.address_components.district
      }
      if (pCallBack)
        pCallBack(newres);    
    },
    fail: function(error) {
      console.error(error);
    },
    complete: function(res) {
      console.log(res);
    }
  })
}

module.exports = {
  formatTime: formatTime,
  AjaxRequest: AjaxRequest,
  sysFormatDate: sysFormatDate,
  syFormatMoney: syFormatMoney,
  syJsonSafe: syJsonSafe,
  Console: consoleLog,
  UploadImg: UploadImg,
  GetRegionIndustry: GetRegionIndustry,
  reverseGeocoder: reverseGeocoder,
  getGeocoder: getGeocoder
}