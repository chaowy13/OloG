// pages/history/history.js
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:'',
    words_list:[{
      date: '',
      words:''
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    var index = that.index;
    var nwords_list = that.data.words_list;
  
    wx.getStorage({
      key:'records',
      success: function (res) {
        for (var i in res.data) {
          var date = res.data[i]
          wx.getStorage({
            key: date,
            success: function (ress) {
              var words = ress.data
              var nlist = [{ date, words }]
              nwords_list = nwords_list.concat(nlist);
            }
          })
        } 
       }
        })
    
    that.setData({
      words_list: nwords_list
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

  /**
     * 用户点击右上角分享
     */
  onShareAppMessage: function () {
    var username = wx.getStorageSync('nickName')
    return {
      title:'History @'+ username,
      path: "/pages/index/index?page=history"
    }
  }
})