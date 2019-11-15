// pages/configGoods/configGoods.js
import Toast from '../../static/vant/toast/toast';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentId: '1',
        section: [{
            name: '全部',
            typeId: '1'
        }, {
            name: '餐饮业',
            typeId: '2'
        }, {
            name: '我的',
            typeId: '3'
        }],
        result: ['b'],
        columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
        show: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

    },
    onChange(event) {
        this.setData({
            result: event.detail
        });
    },
    //点击每个导航的点击事件
    handleTap: function(e) {
        let id = e.currentTarget.id;
        console.log(id)
        if (id) {
            this.setData({
                currentId: id
            })
        }
    },
    onConfirm(event) {
        const { picker, value, index } = event.detail;
        console.log(`当前值：${value}, 当前索引：${index}`)
            // Toast(`当前值：${value}, 当前索引：${index}`);
    },

    onCancel() {
        Toast('取消');
    },
    showPopup() {
        this.setData({ show: true });
    },

    onClose() {
        this.setData({ show: false });
    },
    onlyMine(e) {

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})