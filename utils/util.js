const formatTime = date => {
  var date = new Date(date);
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

module.exports = {
  formatTime: formatTime,
  AjaxRequest: AjaxRequest,
  sysFormatDate: sysFormatDate,
  syFormatMoney: syFormatMoney,
  syJsonSafe: syJsonSafe,
  Console: consoleLog
}
