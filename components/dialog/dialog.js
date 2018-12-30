// dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 弹窗标题
    title: {
      type: String,
      value: 'Authorize' // 默认值
    },
    // 弹窗内容
    content: {
      type: String,
      value: 'Tell your Nickname To Me :)'
    },

    // 弹窗确认按钮文字
    confirmText: {
      type: String,
      value: 'Sure'
    } 

  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false
  },

  /**
   * 组件的方法列表
   */
  methods: {

    //隐藏弹框
    hideDialog() {
      this.setData({
        isShow: false
      })
    },
    //展示弹框
    showDialog() {
      this.setData({
        isShow: true
      })
    },
    /**
    * triggerEvent 组件之间通信
    */
    confirmEvent() {
      this.triggerEvent("confirmEvent");
    },

    bindGetUserInfo() {
      this.triggerEvent("bindGetUserInfo");
    }
  }
})
