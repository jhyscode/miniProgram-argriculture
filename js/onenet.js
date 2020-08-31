var API_KEY = 'IE9=kMQw=1eG7OqQkCUZWCsXAC8=';

function getDeviceStatus(device_id) {
  var deviceConnected
   wx.request({
      url: 'https://api.heclouds.com/devices/' + device_id,
      data: {

      },
      header: {
          'content-type':'application/x-www-form-urlencoded',
          'api-key': API_KEY },
      method: 'GET',
      success: (result) => {
          console.log(result);
          if (result.data.data.online) {
            console.log("设备已经连接")
            deviceConnected = true
            return true
          } else {
                console.log("设备还未连接")
        deviceConnected = false
        return false
          }

      },
      fail: () => {
        console.log("请求失败")
        deviceConnected = false
        return false
      },
      complete: () => {}
  });
 
}

function sendCmd(id, data) {
    var deiviceConneted
    var reqTask = wx.request({
        url: 'https://api.heclouds.com/cmds?device_id=' + id,
        data: data,
        header: {
            'content-type':'application/json',
            "api-key": API_KEY},
        method: 'POST',
        success: (result) => {
            console.log(result)
        },
        fail: () => {
            console.log("请求失败")
            deviceConnected = false
        },
        complete: () => {
            if (deviceConnected) {
                console.log("complete ok")
                return true
              } else {
                console.log("complete error")
                return false
              }
        }
    });
      
}

module.exports = {
    getDeviceStatus,
    sendCmd
}