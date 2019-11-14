var app=getApp();
//var Provinceandcity;
//var provinces = [];//省
//var citys = [];//市
//var areas = [];//区

function query(provinces, pCallBack){
  wx.request({
    url: app.globalData.apiurl + "CouponView/CouponRegionView/GetCouponRegionlevel", //仅为示例，并非真实的接口地址
    data: { pStartLevel: 2, pQueryLevel: 3 },
    header: {
      'content-type': 'application/x-www-form-urlencoded', // 默认值
      "appKeyId": app.globalData.appkeyid
    },
    method: "post",
    success(res) {
      var json = res.data.Data;
      provinces = json.data;
      pCallBack(provinces);
    },
    fail(res) {
      wx.showToast({
        title: res.errMsg //'请求失败',
      })
    }
  })

}




function getProvinces() {
  for (let i = 0; i < placeArray.length; i++) {
    provinces.push(placeArray[i].name)
  }
  console.log(provinces)
}

function getCitys(n) {
  citys = [];
  const theCitys = placeArray[n].city;
  for (let i = 0; i < theCitys.length; i++) {
    citys.push(theCitys[i].name)
  }
  console.log(citys)
}

function getAreas(m, n) {
  areas = [];
  if (placeArray[m].city[n]) {  //province修改，city.length会逐个变化，若变化后比变化前小，会报错
    const theAreas = placeArray[m].city[n].area;
    for (let i = 0; i < theAreas.length; i++) {
      areas.push(theAreas[i])
    }
    console.log(areas)
  }
}


module.exports = {
  query: query,
  getProvinces: getProvinces,
  getCitys: getCitys,
  getAreas: getAreas
}