
var util = require('../../utils/util.js');
const IMAGE_FACE_SMILE = '../../images/smile.png';
const IMAGE_FACE_WINK = '../../images/wink.png';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'',
    words:'',
    input:'',
    savepic_url: IMAGE_FACE_SMILE,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var date=util.formatDate(new Date());
    var that=this;
    wx.getStorage({
      key:date,
      success: function(res) {
        that.setData(
          {
            words: res.data,
            input: res.data
          })
      }
    })
    this.setData({
      date:date
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
    var username = wx.getStorageSync('nickName') || 'mystery man'
    return {
      title: 'Diary ' + this.data.date+' @' + username,
      path: "/pages/index/index?page=diary"
    }
  },



  getinput:function(e){
    e.words = e.detail.value
    this.setData({
      input:e.detail.value
    })
  },
starttouchsave:function() {
  this.setData({
    savepic_url:IMAGE_FACE_WINK
  })
},
 endtouchsave: function () {
    this.setData({
      savepic_url: IMAGE_FACE_SMILE
    })
  },


  saveclick: function() {
  var record ={
    date:this.data.date,
    input: this.data.input
  }
  wx.setStorage({
    key: record.date,
    data: record.input,
  })
    console.log(record.date)
    console.log(record.input)
  var records = wx.getStorageSync('records') || []
    if (records[0] != util.formatDate(new Date()))
    records.unshift(util.formatDate(new Date()))
  wx.setStorage({
      key: 'records',
      data: records,
    })
    console.log(records)
    if(record.input){
    wx.showToast({
      title: 'Saved to Diary',
      icon: 'success',
      duration: 2000
    })
    }



  },

})