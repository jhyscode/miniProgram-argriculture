Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    ptxt:"这是怎么了",
    i_value:""
  },
 
 
  i_name:function(res){
    console.log(res.detail.value);//打印输入的值
    this.setData({
      i_value: res.detail.value , //赋值给i_value,使用的使用直接去i_value即可
    })
 
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options){
    console.log(this.data.ptxt)
 
  }
}) 