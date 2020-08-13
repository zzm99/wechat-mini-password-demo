Page({

  /**
   * 页面的初始数据
   */
  data: {
    introText: "这是一个基于微信和人脸识别的、用于个人密码管理的小程序\n",
    vrsText: "当前版本: v0.0.0",
    hiddenModal_show : true,
    currentTitle : "",
    currentText : ""
  },
  /**
   * 我的简介响应点击事件
   */
  btn_intro: function() {
    this.setData({
      hiddenModal_show: false,
      currentTitle: "我的简介",
      currentText: this.data.introText
    })
  },
  /**
   *版本管理响应点击事件
   */
  btn_vrs: function() {
    this.setData({
      hiddenModal_show: false,
      currentTitle: "版本管理",
      currentText: this.data.vrsText
    })
  },
  /**
   * 弹窗确认
   */
  modal_show_confirm:function(){
    this.setData({
      hiddenModal_show: true
    })
  },
    /**
   * 弹窗取消
   */
  modal_show_cancel: function () {
    this.setData({
      hiddenModal_show: true
    })
  },
    /**
   * 退出登陆，回到登陆注册页
   */
  btn_back:function() {
    wx.reLaunch({
      url: '../index/index',
    })
  }
})