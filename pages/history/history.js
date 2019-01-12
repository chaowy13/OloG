// pages/history/history.js
var util = require('../../utils/util.js');
const IMAGE_FACE_BUTTON = '../../images/face_button.png';
const IMAGE_LIST_CHOSEN = '../../images/list_icon_chosen.png';
const IMAGE_LIST = '../../images/list_icon.png';
const IMAGE_GRID_CHOSEN = '../../images/grid_icon_chosen.png';
const IMAGE_GRID = '../../images/grid_icon.png';
const IMAGE_BAR_BG = '../../images/bar_bg.png';
const WHITE = '#FFFFFF'
const GREY ='#e7e7e7'
const yeardata = new Array();
const monthdata = new Array();
const week = new Array("日", "一", "二", "三", "四", "五", "六");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isGrid:true,
    isList:false,
    opacity:1,
    listcolor:WHITE,
    changecolor:WHITE,
    button_url: IMAGE_FACE_BUTTON,
    grid_url: IMAGE_GRID_CHOSEN,
    list_url: IMAGE_LIST,
    bg_url: IMAGE_BAR_BG,
    display: 'none',
    index:'',
    words_list:[],
    clickId:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    var index = that.index;
    var nwords_list = that.data.words_list;
    console.log('length'+Object.keys(nwords_list).length)
    var records= new Array();
  
    records = wx.getStorageSync('records')
    console.log(records)
    var j =0;
    var k =0;
    var l=0;
    
    for (var i in records) {
      var datetime=new Date(records[i])
      var year = datetime.getFullYear()
      var month = datetime.getMonth()+1  
      var yMdate = util.formatyMdate(datetime)
      var weekindex= datetime.getDay();
      var weekday= "周" + week[weekindex];
      var day = datetime.getDate()  
      var date = util.formatDate(datetime) 
      var words = wx.getStorageSync(date)
  console.log('i:'+i+words)

      if (words){
        var monthdata = [{weekday,day,date,words}]
        var yeardata = [{month,yMdate,monthdata}]
        var nwordlist = [{year,yeardata}]

        if (!nwords_list[0]){
          console.log('list=[]')
          nwords_list = nwordlist
          console  .log(nwords_list[0].year)
        }
        else {
          console.log('list !=[]')
        var ind = Object.keys(nwords_list).length - 1
          var jnd = Object.keys(nwords_list[ind].yeardata).length - 1
        if(yMdate == nwords_list[ind].yeardata[jnd].yMdate){
          nwords_list[ind].yeardata[jnd].monthdata = nwords_list[ind].yeardata[jnd].monthdata.concat(monthdata)
          k=k+1;
          console.log('k'+monthdata[0].words)
        }
        else{
          var ind = Object.keys(nwords_list).length - 1
          if (year == nwords_list[ind].year){
            nwords_list[ind].yeardata = nwords_list[ind].yeardata.concat(yeardata)
            j=j+1
            k=k+1
            console.log('j' + yeardata.yMdate)
          }
          else{
            console.log('diffyear')
          nwords_list=nwords_list.concat(nwordlist)
          j = j + 1
          k = k + 1
          l=l+1
          }
        }
          }
      }
    }
    console.log(i+j+k+l)
var that =this
    that.setData({
      words_list: nwords_list
    })
 
    },
  clickface:function(){

    this.setData({
      display:'block',
    })

  },
  move: function () { },
  recover: function () {

    this.setData({
      display: 'none',
    })

  },
   clicklist: function () {
     var that=this;
    this.setData({
      list_url: IMAGE_LIST_CHOSEN,
      grid_url: IMAGE_GRID,
      isList:true,
      isGrid:false
    })
     setTimeout(function(){ that.recover();},500)
    
  },

   clickgrid: function () {
     var that=this;
    this.setData({
      list_url: IMAGE_LIST,
      grid_url: IMAGE_GRID_CHOSEN,
      isList: false,
      isGrid: true
    })
     setTimeout(function(){ that.recover(); }, 500)
  },

  clickdiary(e){
    console.log(e)
    var index = e.currentTarget.dataset.index;
    var date = e.currentTarget.dataset.date;
    date = date.replace(/\./g,'');
    console.log(index);
    console.log(date);
  var that =this;
    that.setData({
      changecolor:GREY,
      clickId: index

    })
    wx.navigateTo({
      url: '/pages/history/detail?date='+date,
    })

    setTimeout(function () {
      that.setData({
        changecolor: WHITE
      })

    }, 1000)

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