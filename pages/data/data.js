// pages/data/data.js
var API_KEY = 'IE9=kMQw=1eG7OqQkCUZWCsXAC8='
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceList:[],
    deviceNameList:[]
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
      map.set(this.data.deviceList[index],"设备"+index)
    }
    
    console.log(map);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var deviceLists = []
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
            this.data.deviceList[index] = deviceLists[index]['id'];
        }
        console.log(this.data.deviceList);

        this.setData({
          deviceList: this.data.deviceList
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