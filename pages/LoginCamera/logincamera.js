// camera.js
Page({
  data: {
    base64: "",
    token: "",
    msg: null,
    src: ''
  },

  //上传人脸进行验证（用于拍照后调用）
  myRequest: function () {
    var that = this;
  //acess_token获取
    wx.request({
      url: 'https://aip.baidubce.com/oauth/2.0/token', // 仅为示例，并非真实的接口地址
      data: {
        grant_type: 'client_credentials',
        client_id: '********************', //自己的API key
        client_secret: '********************' //自己的Secrec Key
      },
      header: {
        'Content-Type': 'application/json' // 默认值
      },
      success(res) {
        that.setData({
          token: res.data.access_token //获取到token
          //上传人脸进行 比对
        })
        wx.request({
          url: 'https://aip.baidubce.com/rest/2.0/face/v3/search?access_token=' + that.data.token,
          method: 'POST',
          data: {
            image: that.data.base64, //change:使用that
            image_type: 'BASE64',
            group_id_list: '**********' //自己的用户组id
          },
          header: {
            'Content-Type': 'application/json' // 默认值
          },
          success(res) {
            var errorcode = res.data.error_code
            if (errorcode == 0) //访问成功
            {
              var ulist = res.data.result
              //打印返回msg看看
              if (ulist.user_list != null) {
                // console.log('ulist存在');
                var result = ulist.user_list[0].score
                if (result > 80) {
                  wx.showToast({
                    title: '验证通过',
                    icon: 'success',
                    duration: 500
                  })
                  //验证通过，跳转到主界面
                  wx.switchTab({
                    url: '../UI/ui'
                  })
                } else {
                  console.log('不匹配')
                }
              }
            } else {
              console.log('访问失败')
            }
          }
        });
      }
    })
  },

  //拍照并编码
  takePhoto() {
    var that = this;
    //拍照
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'small',
      success: (res) => {
        that.setData({
          src: res.tempImagePath
        })
        //图片base64编码
        wx.getFileSystemManager().readFile({
          filePath: that.data.src, //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            that.setData({
              base64: res.data
            })
            that.myRequest();//调用函数进行token获取和图片上传验证
          }
        })
      }
    })
    //失败重试提醒
    wx.showToast({
      title: '验证中...',
      icon: 'loading',
      duration: 1000
    })
  },
  error(e) {
    console.log(e.detail)
  }
})
