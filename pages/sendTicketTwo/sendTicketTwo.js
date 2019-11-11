// pages/sendTicketTwo/sendTicketTwo.js
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
    let chat = this;
    wx.chooseImage({
      count:1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        chat.setData({
          coverImg:tempFilePaths[0]
        })
        const uploadTask = wx.uploadFile({
          url:"http://test.miboon.com/LibraryAPI/CouponView/UploadImageView/UploadImgs", //开发者服务器的 url
          filePath: tempFilePaths[0], // 要上传文件资源的路径 String类型！！！
          name: 'fileUp', // 文件对应的 key ,(后台接口规定的关于图片的请求参数)
          formData: { data: {}}, 
          header: {
            'content-type': 'multipart/form-data', // 默认值
            "appKeyId": app.globalData.appkeyid
          },// HTTP 请求中其他额外的参数
          success: function (res) {
            console.log('success', res.data, res.statusCode);


          },
          fail: function (res) {
          }
        });
        uploadTask.onProgressUpdate((res) => {
          console.log('上传进度', res.progress)
          console.log('已经上传的数据长度', res.totalBytesSent)
          console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
        })
      }
    });
  },
  ruleaddimg:function(event){
    var chat=this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;
        var imgs=[];
        var oldlists = chat.data.ruleimg1;
        
        for (var s in tempFilePaths){
          imgs.push(tempFilePaths[s]);

          var tempFilePaths = res.tempFilePaths;
          
          const uploadTask = wx.uploadFile({
            url: "http://test.miboon.com/LibraryAPI/CouponView/UploadImageView/UploadImgs", //开发者服务器的 url
            filePath: tempFilePaths[s], // 要上传文件资源的路径 String类型！！！
            name: 'fileUp', // 文件对应的 key ,(后台接口规定的关于图片的请求参数)
            formData: { data: {} },
            header: {
              'content-type': 'multipart/form-data', // 默认值
              "appKeyId": app.globalData.appkeyid
            },// HTTP 请求中其他额外的参数
            success: function (res) {
              console.log('success', res.data, res.statusCode);


            },
            fail: function (res) {
            }
          });
          uploadTask.onProgressUpdate((res) => {
            console.log('上传进度', res.progress)
           
          })

        }    
        var imglist = oldlists.concat(imgs) 
        chat.setData({ ruleimg1: imglist});
      }
    });

  }
})