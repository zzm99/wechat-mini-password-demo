// camera.js
const app = getApp()
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    nickName: "",
    src: "", //图片的链接
    token: "",
    base64: "",
    msg: ""
  },

  myrquest: function () {
    var that = this;
    //access_token获取,ps:需要多次尝试
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token',
      data: {
        grant_type: 'client_credentials',
        client_id: '********************',
        client_secret: '********************' //自己的
      },
      header: {
        'Content-Type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          token: res.data.access_token //获取到token
        })
        //上传人脸进行注册
        wx.request({
          url: 'https://aip.baidubce.com/rest/2.0/face/v3/faceset/user/add?access_token=' + that.data.token,
          method: 'POST',
          data: {
            image: that.data.base64,
            image_type: 'BASE64',
            group_id: '****', //自己的组id
            user_id: that.data.nickName //这里获取
          },
          header: {
            'Content-Type': 'application/json' // 默认值
          },
          success(res) {
            var errorcode = res.data.error_code
            //做成功判断
            if (errorcode == 0) {
              wx.showToast({
                title: '注册成功',
                icon: 'success',
                duration: 500
              })
              //注册成功，跳转到主界面
              wx.switchTab({
                url: '../UI/ui'
              })
            }
          }
        })
      }
    })
  },

  //拍照
  takePhoto() {
    var that = this;
    //拍照
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'small',
      success: (res) => {
        that.setData({
          src: res.tempImagePath //获取图片
        })

        //图片base64编码
        wx.getFileSystemManager().readFile({
          filePath: that.data.src, //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            that.setData({
              base64: res.data
            })
            that.myrquest();//拍照之后，调用上传函数，获取token上传人脸
          }
        })
      } //拍照成功结束

    }) //调用相机结束

      //失败尝试
      wx.showToast({
        title: '注册中...',
        icon: 'loading',
        duration: 1000
      })
  },
  error(e) {
    console.log(e.detail)
  },

  //获取用户信息
  bindGetUserInfo: function (e) {
    this.setData({
      nickName: e.detail.userInfo.nickName
    })
    wx.showToast({
      title: '授权成功',
      icon: 'success',
      duration: 500
    })
  },

  //先授权登陆，再拍照注册
  btnreg: function () {
    wx.showModal({
      title: '注册须知',
      content: '先授权登陆，再拍照注册哦！网络可能故障，如果不成功，请再试一下！'
    })
  }

})
