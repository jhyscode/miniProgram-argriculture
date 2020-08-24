// pages/data/data.js
var API_KEY = 'IE9=kMQw=1eG7OqQkCUZWCsXAC8=';
const deviceId = '614865746';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceList:[],
    deviceNameList:[],
    latestTemp:'',
    latestHumi:'',
    latestTempSet:[],
    latestHumiSet:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
  },

  //生成设备名称函数
  generateName:function(){
    var map = new Map();
    for (let index = 0; index < this.data.deviceList.length; index++) {
      map.set("设备"+index, this.data.deviceList[index])
    }   
    console.log(map);
    
    for ( var [key,value] of map) {
      console.log(key);
    }
    this.data.deviceNameList = Array.from(map.keys());
    this.setData({
      deviceNameList: this.data.deviceNameList
    })
  },

  //生成设备最新温度和湿度数据
  generateDeviceData: function() {
    var params = ['temperature','humidity'];
    for (const key in params) {
        const element = params[key];
        var reqTask = wx.request({
          url: "http://api.heclouds.com/devices/" + deviceId+ "/datapoints?datastream_id=" + element +"&limit=100",
          data: {
    
          },
          header: {
          "content-type": 'application/x-www-form-urlencoded',
          'api-key': API_KEY
        },
          method: 'GET',
          success: (result) => {
            if (element == 'temperature') {
              this.setData({ 
                latestTemp:result.data.data.datastreams[0].datapoints[0].value  
            });
            }
            else if (element == 'humidity') {
              this.setData({ 
                latestHumi:result.data.data.datastreams[0].datapoints[0].value  
            });
            }
            // this.setData({ 
            //   latestHumi:result.data.data.datastreams[0].datapoints[0].value  
            // });
            console.log(result.data.data.datastreams[0].datapoints[0].value);
          },
          fail: () => {},
          complete: () => {}
        });
      }
    },
  
    //生成最新温湿度数据系列(5条)
    generateMultiData:function() {
      var params = ['temperature','humidity'];
      var latestTempSet = [];
      var latestHumiSet = [];
      for (const key in params) {
          const element = params[key];
          var reqTask = wx.request({
            url: "http://api.heclouds.com/devices/" + deviceId+ "/datapoints?datastream_id=" + element +"&limit=100",
            data: {
      
            },
            header: {
            "content-type": 'application/x-www-form-urlencoded',
            'api-key': API_KEY
          },
            method: 'GET',
            success: (result) => {

              console.log(result.data.data.datastreams[0].datapoints);
              if (element == 'temperature') {
                var tempList = result.data.data.datastreams[0].datapoints;
                console.log(tempList);
                for (var i = 0; i < 5; i++) {
                  latestTempSet.push(tempList[i].value)
                }
                this.setData({
                  latestTempSet: latestTempSet
                })
              //   this.setData({ 
              //     latestTemp:result.data.data.datastreams[0].datapoints[0].value  
              // });
              }
              else if (element == 'humidity') {
                var humiList = result.data.data.datastreams[0].datapoints;
                console.log(humiList);
                for (var i = 0; i < 5; i++) {
                  latestHumiSet.push(humiList[i].value)
                }
                this.setData({
                  latestHumiSet: latestHumiSet
                })

              }
             
              //console.log(result.data.data.datastreams[0].datapoints[0].value);
            },
            fail: () => {},
            complete: () => {}
          });
        }
    },
 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  //生成设备号
  onReady: function () {
    var deviceLists = []
    var deviceList = []
    wx.request({
      url: 'https://api.heclouds.com/devices',
      header : { 
        'api-key': API_KEY
      },
      data: {
      },
      success: (result) => {
        // console.log(result.data.data.devices);
        deviceLists = result.data.data.devices;
        // console.log(deviceLists);
        for (let index = 0; index < deviceLists.length; index++) {
          deviceList.push(deviceLists[index]['id']);
          // this.data.deviceList[index] = deviceLists[index]['id'];
        }
        // console.log(this.data.deviceList);

        this.setData({
          deviceList: deviceList
        })

      },
      fail: () => {},
      complete: () => {}
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})