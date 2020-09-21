import * as echarts from '../../ec-canvas/echarts';
let Chart = null;
let Chart1 = null;
let Chart2 = null;
let utils = require("../../utils/util.js")
const app = getApp();



Page({
    data: {
        idc: 2,
        ec: {
            onInit: function(canvas, width, height) {
                // 初始化图表
                Chart = echarts.init(canvas, null, {
                    width: width,
                    height: height
                });

                canvas.setChart(Chart);

                return Chart
            }
        },
        ec1: {
            onInit: function(canvas, width, height) {
                // 初始化图表

                Chart1 = echarts.init(canvas, null, {
                    width: width,
                    height: height
                });


                canvas.setChart(Chart1);

                return Chart1
            }
        },

        ec2: {
            onInit: function(canvas, width, height) {
                // 初始化图表

                Chart2 = echarts.init(canvas, null, {
                    width: width,
                    height: height
                });

                canvas.setChart(Chart2);
                return Chart2
            }
        },


        datime: new Date().getTime(),
        xAxisdataList: [],
        timeBox: [{
                id: 0,
                txt: '三天内'
            },
            {
                id: 1,
                txt: '近一周'
            },
            {
                id: 2,
                txt: '近一个月'
            },
            {
                id: 3,
                txt: '近三个月'
            }
        ],
        img1: [{
                txt: "新增会员走势图",
                id: 1
            },
            {
                txt: "券领用走势图",
                id: 2
            }
        ],
        idx: 0, //月,周

        // 第一条数据
        option: {
            title: {
                text: '点击数字查看详情',
                top: 25,
                right: 10,
                textStyle: {
                    fontSize: 14,
                    color: '#E85819',
                    fontWeight: 500
                }
            },
            color: ["#E85819"],
            // legend: {
            //   data: ['A'],
            //   top: 25,
            //   left: 'center',
            //   backgroundColor: '#FFF0DE',
            //   z: 100
            // },
            grid: {
                containLabel: true
            },
            tooltip: {
                show: true,
                trigger: 'axis',
                backgroundColor: '#FFF0DE',
                textStyle: {
                    color: '#E85819',

                },

                axisPointer: {
                    label: {

                    }
                },
                position: function(point, params, dom, rect, size) {
                    // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
                    // 提示框位置
                    var x = 0; // x坐标位置
                    var y = 0; // y坐标位置

                    // 当前鼠标位置
                    var pointX = point[0];
                    var pointY = point[1];

                    // 外层div大小
                    // var viewWidth = size.viewSize[0];
                    // var viewHeight = size.viewSize[1];

                    // 提示框大小
                    var boxWidth = size.contentSize[0];
                    var boxHeight = size.contentSize[1];

                    // boxWidth > pointX 说明鼠标左边放不下提示框
                    if (boxWidth > pointX) {
                        x = pointX + 50;
                    } else { // 左边放的下
                        x = pointX - 20;
                    }

                    // boxHeight > pointY 说明鼠标上边放不下提示框
                    if (boxHeight > pointY) {
                        y = 5;
                    } else { // 上边放得下
                        y = pointY + 30;
                    }

                    return [x, y];


                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                color: '#666666',
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        color: '#ccc'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#666666'
                    }
                },
                axisLabel:  {           interval: 0,           rotate: 45 //角度顺时针计算的
                                 }
                // show: false
            },
            yAxis: {
                x: 'center',
                type: 'value',
                name: '领券数量/张',
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: '#ccc'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#666666'
                    }
                },
                // show: false
            },
            series: [{
                name: 'A',
                type: 'line',
                itemStyle: {
                    normal: {
                        label: { show: true },
                        color: '#E85819',
                        lineStyle: {
                            color: '#E85819'
                        }
                    }
                },
                smooth: false,
                data: [18, 36, 65, 30, 78, 40, 33]
            }]

        },
        option2: {
            title: {
                text: '点击数字查看详情',
                top: 25,
                right: 10,
                textStyle: {
                    fontSize: 14,
                    color: '#E85819',
                    fontWeight: 500
                }
            },
            color: ["#E85819"],
            // legend: {
            //   data: ['A'],
            //   top: 25,
            //   left: 'center',
            //   backgroundColor: '#FFF0DE',
            //   z: 100
            // },
            grid: {
                containLabel: true
            },
            tooltip: {
                show: true,
                trigger: 'axis',
                backgroundColor: '#FFF0DE',
                textStyle: {
                    color: '#E85819',

                },

                axisPointer: {
                    label: {

                    }
                },
                position: function(point, params, dom, rect, size) {
                    // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
                    // 提示框位置
                    var x = 0; // x坐标位置
                    var y = 0; // y坐标位置

                    // 当前鼠标位置
                    var pointX = point[0];
                    var pointY = point[1];

                    // 外层div大小
                    // var viewWidth = size.viewSize[0];
                    // var viewHeight = size.viewSize[1];

                    // 提示框大小
                    var boxWidth = size.contentSize[0];
                    var boxHeight = size.contentSize[1];

                    // boxWidth > pointX 说明鼠标左边放不下提示框
                    if (boxWidth > pointX) {
                        x = pointX + 50;
                    } else { // 左边放的下
                        x = pointX - 20;
                    }

                    // boxHeight > pointY 说明鼠标上边放不下提示框
                    if (boxHeight > pointY) {
                        y = 5;
                    } else { // 上边放得下
                        y = pointY + 30;
                    }

                    return [x, y];


                },
                formatter: function(params, ) {
                    let value = params[0].value
                    return `张数:` + value
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                color: '#666666',
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        color: '#ccc'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#666666'
                    }
                },
                axisLabel:  {           interval: 0,           rotate: 45 //角度顺时针计算的
                                 }
                // show: false
            },
            yAxis: {
                x: 'center',
                type: 'value',
                name: '核销数量/张',
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: '#ccc'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#666666'
                    }
                },
                // show: false
            },
            series: [{
                name: 'A',
                type: 'line',
                itemStyle: {
                    normal: {
                        color: '#E85819',
                        lineStyle: {
                            color: '#E85819'
                        }
                    }
                },
                itemStyle: { normal: { show: true } },
                smooth: false,
                data: [48, 56, 75, 50, 18, 30, 23]
            }]
        },
        option3: {
            title: {
                text: '点击数字查看详情',
                top: 25,
                right: 10,
                textStyle: {
                    fontSize: 14,
                    color: '#E85819',
                    fontWeight: 500
                }
            },
            color: ["#E85819"],
            // legend: {
            //   data: ['A'],
            //   top: 25,
            //   left: 'center',
            //   backgroundColor: '#FFF0DE',
            //   z: 100
            // },
            grid: {
                containLabel: true
            },
            tooltip: {
                show: true,
                trigger: 'axis',
                backgroundColor: '#FFF0DE',
                textStyle: {
                    color: '#E85819',

                },

                axisPointer: {
                    label: {

                    }
                },
                position: function(point, params, dom, rect, size) {
                    // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
                    // 提示框位置
                    var x = 0; // x坐标位置
                    var y = 0; // y坐标位置

                    // 当前鼠标位置
                    var pointX = point[0];
                    var pointY = point[1];

                    // 外层div大小
                    // var viewWidth = size.viewSize[0];
                    // var viewHeight = size.viewSize[1];

                    // 提示框大小
                    var boxWidth = size.contentSize[0];
                    var boxHeight = size.contentSize[1];

                    // boxWidth > pointX 说明鼠标左边放不下提示框
                    if (boxWidth > pointX) {
                        x = pointX + 50;
                    } else { // 左边放的下
                        x = pointX - 20;
                    }

                    // boxHeight > pointY 说明鼠标上边放不下提示框
                    if (boxHeight > pointY) {
                        y = 5;
                    } else { // 上边放得下
                        y = pointY + 30;
                    }

                    return [x, y];


                },
                formatter: function(params, ) {
                    let value = params[0].value
                    return `张数:` + value
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                color: '#666666',
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        color: '#ccc'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#666666'
                    }
                },
                axisLabel:  {           interval: 0,           rotate: 45 //角度顺时针计算的
                                 }
                // show: false
            },
            yAxis: {
                x: 'center',
                type: 'value',
                name: '退券数量/张',
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: '#ccc'
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#666666'
                    }
                },
                // show: false
            },
            series: [{
                name: 'A',
                type: 'line',
                itemStyle: {
                    normal: {
                        color: '#E85819',
                        lineStyle: {
                            color: '#E85819'
                        }
                    }
                },
                itemStyle: { normal: { show: true } },
                smooth: false,
                data: [48, 56, 75, 50, 18, 30, 23]
            }]
        },
        currentDate: new Date().getTime(),
        minDate: new Date('2020-01-01').getTime(),
        formatter(type, value) {
            if (type === 'year') {
                return `${value}年`;
            } else if (type === 'month') {
                return `${value}月`;
            }
            return value;
        },
        show: false,

    },

    onLoad() {
        let id = 0;
        let that = this;
        that.UserQuery(id);
    },


    clkBtn(e) {
        let id = e.currentTarget.dataset.id;
        let that = this;
        // let option = that.data.option;
        // let option1 = that.data.option1;
        // let option2 = that.data.option2;
        // console.log(option)
        that.setData({
            idx: id,
        })
        that.UserQuery(id);
    },

    UserQuery(e) {
        let data = {};
        data.pGroupID = app.globalData.AppGroupInfo.GroupID;
        data.type = e;
        utils.AjaxRequest(app.globalData.apiurl + "CouponView/CouponGroupView/GeChannelOrderCount", "POST", data, app.globalData.appkeyid, this.GetNewUserCount)
    },
    GetNewUserCount(res) {

        let that = this;
        let json = res.data.Data;
        let option = that.data.option;
        let option2 = that.data.option2;
        let option3 = that.data.option3;

        let id = that.data.idx;
        if (id == 0) {
            var arr = [];
            var arr1 = [];
            var arr2 = [];
            // 领券
            arr[0] = json.data[0].week1;
            arr[1] = json.data[0].week2;
            arr[2] = json.data[0].week3;

            // 退券
            arr1[0] = json.data2[0].week1;
            arr1[1] = json.data2[0].week2;
            arr1[2] = json.data2[0].week3;

            // 核销
            arr2[0] = json.data3[0].week1;
            arr2[1] = json.data3[0].week2;
            arr2[2] = json.data3[0].week3;

        } else if (id == 1) {
            var arr = [];
            var arr1 = [];
            var arr2 = [];
            // 领券
            arr[0] = json.data[0].week1;
            arr[1] = json.data[0].week2;
            arr[2] = json.data[0].week3;
            arr[3] = json.data[0].week4;
            arr[4] = json.data[0].week5;
            arr[5] = json.data[0].week6;
            arr[6] = json.data[0].week7;
            // 退券
            arr1[0] = json.data2[0].week1;
            arr1[1] = json.data2[0].week2;
            arr1[2] = json.data2[0].week3;
            arr1[3] = json.data2[0].week4;
            arr1[4] = json.data2[0].week5;
            arr1[5] = json.data2[0].week6;
            arr1[6] = json.data2[0].week7;
            // 核销
            arr2[0] = json.data3[0].week1;
            arr2[1] = json.data3[0].week2;
            arr2[2] = json.data3[0].week3;
            arr2[3] = json.data3[0].week4;
            arr2[4] = json.data3[0].week5;
            arr2[5] = json.data3[0].week6;
            arr2[6] = json.data3[0].week7;
        } else if (id == 2) {
            var arr = [];
            var arr1 = [];
            var arr2 = [];
            // 领券
            arr[0] = json.data[0].week1;
            arr[1] = json.data[0].week2;
            arr[2] = json.data[0].week3;
            arr[3] = json.data[0].week4;
            // 退券
            arr1[0] = json.data2[0].week1;
            arr1[1] = json.data2[0].week2;
            arr1[2] = json.data2[0].week3;
            arr1[3] = json.data2[0].week4;
            // 核销
            arr2[0] = json.data3[0].week1;
            arr2[1] = json.data3[0].week2;
            arr2[2] = json.data3[0].week3;
            arr2[2] = json.data3[0].week3;
        } else {
            var arr = [];
            var arr1 = [];
            var arr2 = [];
            // 领券
            arr[0] = json.data[0].week1;
            arr[1] = json.data[0].week2;
            arr[2] = json.data[0].week3;
            // 退券
            arr1[0] = json.data2[0].week1;
            arr1[1] = json.data2[0].week2;
            arr1[2] = json.data2[0].week3;
            // 核销
            arr2[0] = json.data3[0].week1;
            arr2[1] = json.data3[0].week2;
            arr2[2] = json.data3[0].week3;
        }


        option.xAxis.data = json.xAxisdata;
        option2.xAxis.data = json.xAxisdata;
        option3.xAxis.data = json.xAxisdata;
        option.series[0].data = arr;
        option2.series[0].data = arr1;
        option3.series[0].data = arr2;
        that.setData({
            option: option,
            option2: option2,
            option3: option3,
            xAxisdataList: json.xAxisdataList
        })

        Chart.setOption(that.data.option);
        Chart1.setOption(that.data.option2);
        Chart2.setOption(that.data.option3);
        that.getData()

    },



    onReady() {
        var chat = this;
        setTimeout(function() { chat.getData() }, 500);
    },


    getData(e) {
        //获取到折线图 <ec-canvas> 的id，然后再获取数据塞就可以了。
        let that = this;
        let option = that.data.option;
        let option2 = that.data.option2;
        let option3 = that.data.option3;

        Chart.setOption({ option });
        Chart1.setOption({ option2 });
        Chart2.setOption({ option3 });

        Chart.off('click');
        Chart1.off('click');
        Chart2.off('click');

        Chart.on('click', function(e) {
            let ename = e.name; //日期
            let value = e.value; //张数
            let index = e.dataIndex;
            console.log("0");
            wx.navigateTo({
                url: '../shopDetail/shopDetail?name=' + that.data.xAxisdataList[index] + "&value=" + value + "&time=" + that.data.date + "&types=" + that.data.idc,
            })

        });
        Chart1.on('click', function(e) {
            console.log("1");
            let ename = e.name; //日期
            let value = e.value; //张数
            let index = e.dataIndex;

            wx.navigateTo({
                url: '../shopDetail/shopDetail?name=' + that.data.xAxisdataList[index] + "&value=" + value + "&time=" + that.data.date + "&types=" + that.data.idc,
            })

        });
        Chart2.on('click', function(e) {
            console.log("2");
            let ename = e.name; //日期
            let value = e.value; //张数
            let index = e.dataIndex;

            wx.navigateTo({
                url: '../shopDetail/shopDetail?name=' + that.data.xAxisdataList[index] + "&value=" + value + "&time=" + that.data.date + "&types=" + that.data.idc,
            })

        });

        //   return Chart;
        // });
    },

    onShareAppMessage: function(res) {

    },
});