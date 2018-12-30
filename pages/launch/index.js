// pages/lanuch/index.js

const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    auth: app.globalData.auth

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.direct();
  },
  direct() {
    wx.getSystemInfo({
      success: function (res) {
        wx.setStorage({
          key: 'clientWidth',
          data: res.windowWidth,
        })
        wx.setStorage({
          key: 'clientHeight',
          data: res.windowHeight,
        })
      }
    })

    console.log(this.data.auth)
    if (this.data.auth) {
      wx.redirectTo({
        url: '../index/index',
      })
    }
    else {
      wx.redirectTo({
        url: 'launch',
      })

    }
  }
})