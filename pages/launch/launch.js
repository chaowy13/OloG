// pages/lanuch/launch.js

const app = getApp();
const IMAGE_FACE_SEAGULL = '../../images/bg/ss.gif'; 
const IMAGE_FACE_GRAGUAL ='../../images/bg/ss2.gif'
const IMAGE_FACE_STATIC = '../../images/bg/init2.png';
const GOLDEN_SLUMBERS ="http://isure.stream.qqmusic.qq.com/C400004GHNme3ifE3T.m4a?guid=4113464841&vkey=6582E0FD107D72ABC39AC2A99B31A47E67C1392CCD03A428D6D11077C4CB7DFC4B3FB04E15BD87A12C18CA0F132C3C66BE22FBFB7C80BA19&uin=0&fromtag=66";
const O = "http://isure.stream.qqmusic.qq.com/C400004Jrkwu2glzdM.m4a?guid=4113464841&vkey=8429E5339E453C3A39D673BFC330616106B61B20A9B149FDF3005D5747B5487705B0FA940D21FCC1B4DE7FFF5DAC93DA72633286584E6926&uin=0&fromtag=66";
const music = wx.createInnerAudioContext();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    picbg0: IMAGE_FACE_STATIC,
    picbg1: IMAGE_FACE_GRAGUAL,
    welcome: 'Once meet\nwrite Logs',
    picbgheight: '100%',
    bgcolor: 'white',
    opacity:0,
    bgshow:1,
    gifshow:0,
    isMusicPlay:false,
    userInfo: app.globalData.userInfo,
    hasUserInfo: false

    //'#5a7ebb'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  // 动图高度兼容ipX
    var that=this;
    var width = wx.getStorageSync('clientWidth');
    var height = wx.getStorageSync('clientHeight');
    if (height/width >= 1.6){
    that.setData({
      picbgheight:'1200rpx'
    }) 
    }

    var that = this;
    
    setTimeout(function () {
          that.play();        
    }, 2500)


    var that = this;
    for (let i = 0; i < 10; i++) {
      function temp(j) {
        setTimeout(function () {
          that.setData({
            bgshow: 0.8 - i * 0.1
          })
        }, 3000 + 125 * i)

      };
      temp(i)
    }
    var that = this;
    for (let i = 0; i < 5; i++) {
      function temp(j) {
        setTimeout(function () {
          var t = 0.2 + i * 0.2;
          that.setData({
            gifshow: t,
          })
        }, 3000 + 125 * i)
      };
      temp(i)
    }

    setTimeout(function () {
      
      that.setData({
        picbg1: IMAGE_FACE_SEAGULL,
        bgcolor: 'rgba(90,126,187,1)',
        opacity:0.2
      })
    }, 4500)

    var that = this;
    for (let i = 1; i < 5; i++) {
      function temp(j) {
        setTimeout(function () {
          var t = 0.2 + i * 0.2;
          that.setData({
            opacity: t
          })
        }, 4500 + 250 * i)
      };
      temp(i)
    }

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

    if (this.data.isMusicPlay == true){
      music.play()}
  
  },




  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   *   })生命周期函数--监听页面卸载
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

  },

  bindGetUserInfo: function (e) {
    var that = this;
    // 调用登录接口
    wx.getUserInfo({
      success: function (res) {
        app.globalData.userInfo = res.userInfo;
        that.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
       
        wx.setStorage({
          key: 'nickName',
          data:res.userInfo.nickName
        })
        wx.setStorage({
          key: 'avatarUrl',
          data: res.userInfo.avatarUrl
        })
      }
    })
    this.stop();
    this.setData({ isplay: false });
    wx.redirectTo({
      url: '../index/index',
    })
    wx.setStorageSync('auth', true);



  },

  

  play: function () {
    music.src = GOLDEN_SLUMBERS;
    music.loop = true;
    music.play();
    this.setData({ isMusicPlay: true });
    music.onEnded(function callback(){

      music.seek(0);
      music.play();
    }
    )
  },


  stop: function () {
    music.stop();
    this.setData({ isMusicPlay: false });
  },

onPullDownRefresh: function () {
    var that = this;
music.pause();
     if(music.src == GOLDEN_SLUMBERS){
       music.src = O;
     }
  else{
  music.src = GOLDEN_SLUMBERS}
  music.play();

  wx.stopPullDownRefresh(this)

  },


})