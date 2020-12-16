// pages/me/me.js
const IMAGE_ICON='https://pukamoe.com/resource/images/iconhalf.jpg'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:IMAGE_ICON,
    username:'mystery man',
    motto:'You’re what you write :)'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'avatarUrl',
      success: function(res) {
        that.setData({
          avatarUrl: res.data
        })
      },
    })
    wx.getStorage({
      key: 'nickName',
      success: function (res) {
        that.setData({
          username: res.data
        })
      },
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  enterClick:function() {
    wx.reLaunch({
      url: '../launch/launch',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

    return{
      title: 'About @' + this.data.username + ' :)',
      path: '/pages/index/index?page=me'
      
    }

  }
})