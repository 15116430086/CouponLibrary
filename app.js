//app.js
var utils = require("utils/util.js")
const accountInfo = wx.getAccountInfoSync();
App({
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        this.globalData.sysaAppid = accountInfo.miniProgram.appId
        wx.setNavigationBarTitle({
            title: this.globalData.sysName + '商家助手'
        })

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId      
                this.globalData.logincode = res.code;
            }
        })
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        withCredentials: true,
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo
                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: null,
        logincode: null,
        AppWxUserInfo: null,
        AppStaffInfo: null,
        AppGroupInfo: {
            GroupID: 100000,
            GroupName: "湖南券库"
        },
        appkeyid: "",
        latitudeX: 28.22778,
        longitudeY: 112.93886,
        regionName: "",
        sysName: "券库", //世纪
        sysaAppid: '',
 
       apiurl: "https://wx.wap.quankuzg.com/LibraryAPI/",
        minmapkey: 'LC5BZ-J343R-M5AWH-WYNV2-P5UW5-BVFHE',

    //    apiurl: "https://wx.wap.quankuzg.com/PleasureAPI/",
    //    minmapkey: 'LC5BZ-J343R-M5AWH-WYNV2-P5UW5-BVFHE',

        // apiurl: "https://wx.wap.quankuzg.com/TestAPI/",
      //  minmapkey:'DV7BZ-GESWW-XKVRT-OE2FG-C2EN2-NDFYF',
        //   apiurl: "http://localhost:7562/"
    }
})