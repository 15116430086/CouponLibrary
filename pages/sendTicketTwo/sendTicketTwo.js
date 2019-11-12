// pages/sendTicketTwo/sendTicketTwo.js
var utils = require("../../utils/util.js")
var app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentId: '1',
        section: [{
            name: '代金券',
            typeId: '1'
        }, {
            name: '团购券',
            typeId: '2'
        }],
        "placeholder": "请输入文本",
        "maxlength": -1, // 最大输入长度，设置为 -1 的时候不限制最大长度
        "focus": true,
        "auto-height": true, // 是否自动增高，设置auto-height时，style.height不生效
        "adjust-position": true, // 键盘弹起时，是否自动上推页面,
         coverImg1:"",//封面图片
         coverImg2: "",//封面图片
         ruleimg1:[],//规则图片
         ruleimg2: []//规则图片
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      console.log(this.data.ruleimg1);

    },
    //点击每个导航的点击事件
    handleTap: function(e) {
        let id = e.currentTarget.id;
        if (id) {
            this.setData({
                currentId: id
            })
        }
    },

  addimg:function(event){
   
    utils.UploadImg(1, app.globalData.appkeyid,this.imglist1);
  },
  imglist1:function(res){
    let chat = this;
    res[0] = res[0].replace("true|","");
    chat.setData({ coverImg1: res[0]});
    
  },

  imglist2:function(res){
    var chat=this;
    var imgs = [];
    for(var s in res){
      res[s] = res[s].replace("true|", "");
      imgs.push(res[s]);
    }
    var oldlists = chat.data.ruleimg1;
    var imglist = oldlists.concat(imgs)
    chat.setData({ ruleimg1: imglist });
  },
  ruleaddimg:function(event){
    utils.UploadImg(9, app.globalData.appkeyid, this.imglist2);
  }
})