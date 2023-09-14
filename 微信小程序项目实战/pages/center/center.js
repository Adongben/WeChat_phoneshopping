import CheckAuth from "../../util/auth"
// pages/center/center.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    CheckAuth(()=>{
      this.setData({
        userInfo:wx.getStorageSync('token')
      })
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  // 更换头像
  handleTap(){
    // 打开摄像头/相册
    wx.chooseMedia({
      count: 1, // 选择照片数量 最多9张或20张(版本)
      mediaType: ['image','video'], // 图片还是视频
      sourceType: ['album', 'camera'], // 相册还是相机
      maxDuration: 30, // 拍摄视频最长拍摄时间
      camera: 'back', // 使用前置或后置摄像头
      success:(res) => {
        console.log(res.tempFiles.tempFilePath) // 本地临时文件列表 视频缩略图临时文件路径
        console.log(res.tempFiles.size) // 本地临时文件列表 本地临时文件大小

        this.setData({
          userInfo:{
            ...this.data.userInfo,
            // tempFiles 为选中文件的列表 是一个数组
            avatarUrl:res.tempFiles[0].tempFilePath
          }
        })

        // 将更换的头像数据重新赋值本地
        wx.setStorageSync('token', {
          ...wx.getStorageSync('token'),
          avatarUrl:res.tempFiles[0].tempFilePath
        })
      }
    })
  }
})
