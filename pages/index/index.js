//index.js
//获取应用实例
const app = getApp();
const IMAGE_FACE_SMILE = '../../images/smile.png';
const IMAGE_FACE_WINK = '../../images/wink.png';
const IMAGE_FACE_ADD = '../../images/add.png';
var nickName = 'Secret'

Page({
  data: {
    lastX:0,
    lastY:0,
    currentY:0,
    currentX:0,
    currentGesture:0,
    currentJump:0,
    motto: 'To Meow',
    opacity: 1,
    facepic_url: IMAGE_FACE_SMILE,
    addpic_url: IMAGE_FACE_ADD,
    userInfo: app.globalData.userInfo,
    hasUserInfo: false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function (options) {
    var that = this;
    if(options.page)
    {
      wx.navigateTo({
        url: '../' + options.page + '/' + options.page
      })
    }
    console.log(that.data.userInfo)
    if (that.data.userInfo) {
      that.setData({
        hasUserInfo: true
      })
    }
    else{
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              app.globalData.userInfo = res.userInfo
              nickName = res.userInfo.nickName
              wx.setStorage({
                key: 'nickName',
                data: nickName
              })
              wx.setStorage({
                key: 'avatarUrl',
                data: res.userInfo.avatarUrl
              })
              that.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
              })
            }})
        }
        /*
        else{
          that.dialog.showDialog();
        }
        */
      }
    })
    }
  },
  starttouchadd: function () {
    this.setData({
      opacity: 0.5
    })
  },
  endtouchadd: function () {
    this.setData({
      opacity: 1
    })
  },
  clickadd: function() {
    wx.navigateTo({
      url: '../diary/diary'
    })
  },
  starttouchface: function () {
    this.setData({
      facepic_url: IMAGE_FACE_WINK
    }
    )

  },
  clickface: function () {
    wx.navigateTo({
      url: '../history/history'
    })
  },
  endtouchface: function () {
    this.setData({
      facepic_url: IMAGE_FACE_SMILE
    })
    

  },

  starttouchpage: function (e) {
    console.log(e)
    this.setData({
      lastX: e.touches[0].clientX,
      lastY: e.touches[0].clientY
    }) 
    
  },
  movetouchpage: function (e) {
    console.log(e)
    var cX = e.touches[0].clientX;
    var cY = e.touches[0].clientY;
    this.setData({
      currentGesture: 1,
      currentX: cX,
      currentY: cY
    }
  ) 

  },

  endtouchpage: function (e) {
    var that=this;
    var ty = this.data.currentY - this.data.lastY;
    var tx = this.data.currentX - this.data.lastX;
    console.log(tx)
    console.log(ty)
    console.log(this.data.currentY)
    console.log(this.data.lastY)


    if ( tx < -150 && Math.abs(ty) <50 ) {
      if (!that.data.currentJump && that.data.currentGesture){
      wx.navigateTo({
        url: '../me/me',
      })
    that.setData({
      currentJump:1,
    })
    setTimeout(function() {
      that.setData({
          currentJump: 0
    })
    },3000)
    }
    }
    that.setData({
      currentGesture: 0
    })
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('done')

  },
  /**  
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    var username = wx.getStorageSync('nickName')
    return{
      title: "“嘘——这是秘密:)”",
      path: "/pages/index/index"

    }
  },

   /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this;
    wx.stopPullDownRefresh(this)
    this.setData({
      facepic_url: IMAGE_FACE_WINK
    }
    )
    setTimeout(function () {
      that.setData({
        facepic_url: IMAGE_FACE_SMILE
      })
    }, 300)

  },
onReady:function(){
  //获得dialog组件
  this.dialog = this.selectComponent("#dialog");
},

  confirmEvent: function () {
    this.dialog.hideDialog();
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
        nickName = res.userInfo.nickName
        wx.setStorage({
          key: 'nickName',
          data: nickName
        })
        wx.setStorage({
          key: 'avatarUrl',
          data: res.userInfo.avatarUrl
        })
      }
    })
  }
  
})
