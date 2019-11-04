const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
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
        title: res.errMsg//'请求失败',
      })
    }
  })
}
function consoleLog(msg) {
  console.log(msg);

}
module.exports = {
  formatTime: formatTime,
  AjaxRequest: AjaxRequest,
  Console: consoleLog
}
