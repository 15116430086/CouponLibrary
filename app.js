//app.js
var utils = require("utils/util.js")

App({
    onLaunch: function() {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

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
            GroupName: "湖南券库移分公司"
        },
        appkeyid: "CouponShopManger:251a8042-8243-40b5-b6a5-bce185cc8dea",
        latitudeX: 28.22778,
        longitudeY: 112.93886,
        regionName: "",
        //apiurl: "http://test.miboon.com/LibraryAPI/"
        //apiurl: "https://wx.wap.meiguwen.com/LibraryAPI/"       
        apiurl: "https://wx.wap.quankuzg.com/LibraryAPI/"
        //apiurl: "http://localhost:7562/"
    }
})