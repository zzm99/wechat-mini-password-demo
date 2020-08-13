//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //滚动显示图片集
    images : [
      "/images/1.jpg",
      "/images/2.jpg",
      "/images/3.jpg",
      "/images/4.jpg",
      "/images/5.jpg",
      "/images/6.jpg",
      "/images/7.jpg"
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
  },

  onLoad: function (options) {
    wx.hideTabBar({})
  },

  onReady: function () {
    wx.hideTabBar({})
  },
  /**
   * 点击登陆
   * 验证人脸
   * 识别通过/不通过
   */
  btnlogin : function(){
    wx.navigateTo({
      url: '../LoginCamera/logincamera',
    })
  },
  /**
   * 点击注册
   * 拍照上传人脸库
   * 注册人脸
   */
  btnregist : function(){
    wx.navigateTo({
      url: '../camera/camera',
    })
  }
})
