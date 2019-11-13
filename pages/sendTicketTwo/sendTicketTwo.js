// pages/sendTicketTwo/sendTicketTwo.js
var utils = require("../../utils/util.js")
var region = require("../../utils/region.js")
var app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        "placeholder": "请输入文本",
        "maxlength": -1, // 最大输入长度，设置为 -1 的时候不限制最大长度
        "focus": true,
        "auto-height": true, // 是否自动增高，设置auto-height时，style.height不生效
        "adjust-position": true, // 键盘弹起时，是否自动上推页面,
         coverImg1:"",//封面图片
         coverImg2: "",//封面图片
         ruleimg1:[],//规则图片
         ruleimg2: [],//规则图片
      WriteOffType: [
        { name: '0', value: '线上',checked: 'true' },
        { name: '1', value: '线下',  },
        
      ],
      ReceiveRule:[
        { name: '0', value: '首次领取', checked: 'true' },
        { name: '1', value: '可重复领取', },

      ],
      CouponType: [{ name: '0', value: '代金券', checked: 'true' },
        { name: '1', value: '团购券', },],
       describe:"现金抵用券，将券发布至指定商户或券平台，商户免费领券 赠送给其会员为您引流并赚取佣金",
       Datetype:true,//默认领取后多少天
      selectDate: "选择日期",
      currentDate: new Date().getTime(),
      minDate: new Date("2019-10-01").getTime(),
      formatter(type, value) {
        if (type === 'year') {
          return `${value}年`;
        } else if (type === 'month') {
          return `${value}月`;
        } else {
          return `${value} 日`;
        }
        return value;
      },
      typeData: [{ name: '0', value: '领取后多少天', checked: 'true' },
        { name: '1', value: '选择到期时间', },],
      show3: false,
      provinces:[],
      citys:[],
      areas:[],
      value:["选择省","选择市","选择区"],
      sheng:"",
      shi:"",
      qu:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
      console.log(this.data.ruleimg1);

      region.query(this.data.provinces, this.regionList)

    },

  regionList:function(res){
    var chat=this;
    chat.setData({ provinces:res});
    console.log(chat.data.provinces);
  },

  bindChange:function(event){
    var val=event.detail.value;

 
    this.setData({
      sheng: this.data.provinces[val[0]],
      
    })

  },

    CouponTypeChange:function(event){
      if (event.detail.value==1){
        this.setData({ describe:"联盟商户购买商品团购券后，销售或赠送给消费者，消费者可使用团购券在线下或线上兑换商品."});
      }else{
        this.setData({ describe: "现金抵用券，将券发布至指定商户或券平台，商户 免费领券 赠送给其会员为您引流并赚取佣金" });
      }
      

  },
  typeDataChange: function (event){
    if (event.detail.value == 1) {
      this.setData({ Datetype:false})
    }else{
      this.setData({ Datetype: true })
    }

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
  radioChange:function(){


  },
  addimg:function(event){
   
    utils.UploadImg(1, app.globalData.appkeyid,this.imglist1);
  },
  imglist1:function(res){
    let chat = this;
    res[0] = res[0].replace("true|","");
    chat.setData({ coverImg1: res[0]});
    
  },
  showPopup3() {

    let that = this;
    that.setData({
      show3: true
    })
  },
  onClose(e) {

    let that = this;
    that.setData({
      show3: false
    })
  },
  confirm(event) {
    console.log(event.detail); // 打印出了时间
    let timestamp = event.detail;
    console.log(utils.formatTime(timestamp));
    console.log(utils.sysFormatDate(utils.formatTime(timestamp), "yyyy-MM-dd"));

    let that = this;
    that.setData({
      show3: false,
      selectDate: utils.sysFormatDate(utils.formatTime(timestamp), "yyyy-MM-dd")
    })
  },
  onCancel(e) {
    let that = this;
    that.setData({
      show3: false
    })
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