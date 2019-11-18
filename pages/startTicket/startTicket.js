// pages/startTicket/startTicket.js
let app = getApp();
let utils = require("../../utils/util.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        contents: [{
                id: '001',
                title: '自营店铺',
                isSel: false
            },
            {
                id: '002',
                title: '指定商户',
                isSel: false
            }
        ],
        idx: "",
        shows: false,
        shareshow2: false, //判断是否指定商户 默认不是 
        df_value: 1, //行业索引
        regionvalue: "", //最终选择地区值
        regionID: ["110105"], //最终选择地区ID
        Number: 0, //券数量
        Commission: 0, //佣金比列
        IndustryCodes: ["10001"], //最终行业ID
        Industryvalue: "餐饮，休闲/自选", //最终选择行业名称
        GroupIDList: [10001], //最终选择的集团ID
        Limited: 0, //单商户限量
        pic_array: [], //行业列表
        pCoupon_Info: {}

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options);
        this.setData({ pCoupon_Info: JSON.parse(options.pCoupon_Info) });
        utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponIndustryView/GetCouponIndustry", "POST", {}, app.globalData.appkeyid, this.GetCouponIndustry);

    },
    selChoose(e) {
        let that = this;
        let id = e.currentTarget.dataset.id;
        that.setData({
            idx: id
        })
        if (id == "002") {
            wx.navigateTo({
                url: "../shopChoose/shopChoose"
            })
        }
    },
    showHide(e) {
        let that = this;
        that.setData({
            shows: (!that.data.shows)
        })

    },
    GetCouponIndustry: function(res) {
        var chat = this;
        var json = res.data.Data;

        chat.setData({ pic_array: json.data });

    },
    Commissionratio: function(event) { //数量失去焦点计算托管佣金
        var number = event.detail.value
        this.setData({
            Commission: (this.data.pCoupon_Info.CouponMoney * 0.1 * number),
            Number: number
        });
    },
    Limit: function(event) { //单商户限制
        this.setData({ Limited: event.detail.value });
    },
    bindPickerChange_hx: function(e) {
        let that = this;
        let pic_array = that.data.pic_array;
        // let pCoupon_Info = that.data.pCoupon_Info;

        that.setData({ //给变量赋值
            df_index: 0,
            IndustryCodes: pic_array[e.detail.value].IndustryCode,
            Industryvalue: pic_array[e.detail.value].IndustryName //每次选择了下拉列表的内容同时修改下标然后修改显示的内容，显示的内容和选择的内容一致
        });
        //pCoupon_Info.ExpiredType = 1;
        // pCoupon_Info.ExpirationDate = pic_array[e.detail.value].name;
    },
    pay: function(event) {
        if (!this.data.Number || this.data.Number <= 0) {
            wx.showToast({
                title: "发布数量异常",
                icon: "none"
            });
            return;
        }
        if (!this.data.Limited || this.data.Limited <= 0) {
            wx.showToast({
                title: "单商户领取限制异常",
                icon: "none"
            });
            return;
        }

        if (this.data.shareshow2) { //如果是指定商户 就判断地区行业
            if (!this.data.regionID) {
                wx.showToast({
                    title: "请选择地区",
                    icon: "none"
                });
                return;
            }

            if (!this.data.IndustryCodes) {
                wx.showToast({
                    title: "请选择行业",
                    icon: "none"
                });
                return;
            }


        }

        var Coupon_Release = {
            ReceiveNUM: 0,
            ReleaseNUM: this.data.Number,
            State: 0,
            ReceiveUpperLimit: this.data.pCoupon_Info.ReceiveUpperLimit,
            ReleaseCommission: this.data.Commission,
            GroupID: app.globalData.AppGroupInfo.GroupID,
            ReceiveTerm: "2019-10-23"
        }

        var datas = {
            GroupID: app.globalData.AppGroupInfo.GroupID,
            CouponID: this.data.pCoupon_Info.CouponID,
            Coupon_Release: utils.syJsonSafe(Coupon_Release),
            pArrIndustryCode: utils.syJsonSafe(this.data.IndustryCodes),
            pArrRegionID: utils.syJsonSafe(this.data.regionID),
            pArrGroupID: utils.syJsonSafe(this.data.GroupIDList)


        }

        utils.AjaxRequest(app.globalData.apiurl + "CouponView/CoupoInfoView/AgainCouponRelease", "POST", datas, app.globalData.appkeyid, this.AgainCouponRelease);

    },
    AgainCouponRelease: function(res) {
        console.log(res);
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        var grouplist = wx.getStorageSync("Groupkey");
        if (grouplist.length > 0) {
            var groupid = [];
            for (var s in grouplist) {
                groupid.push(grouplist[s].GroupID);
            }
            this.setData({ GroupIDList: groupid });
        }
        console.log(this.data.GroupIDList);
    },
})