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
    }],
    records:['','']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    var index = that.index;
    var nwords_list = that.data.words_list;
    var records= new Array();
  
    records = wx.getStorageSync('records')
    for (var i in records) {
      var date = records[i]
       var words = wx.getStorageSync(date)

          console.log('loopdate: ' + date)
          console.log('words: ' + words)

          if (words) {
            var nlist = { date, words}
            console.log('nlistwords:' + nlist.words)
            console.log('nlistdate:' + nlist.date)
            nwords_list = nwords_list.concat(nlist);
          }
    }

    that.setData({
      words_list: nwords_list
    })
    },
 

  

  /**
     * 用户点击右上角分享
     */
  onShareAppMessage: function () {
    var username = wx.getStorageSync('nickName') ||'mystery man'
    return {
      title:'History @'+ username,
      path: "/pages/index/index?page=history"
    }
  }
})