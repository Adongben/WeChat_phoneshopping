import request from "../../util/request"
import CheckAuth from "../../util/auth"
// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:null,
    current:0,
    commentList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // options 接收传参
  onLoad(options) {
    // console.log(options)
    // 设置导航栏标题方法
    wx.setNavigationBarTitle({
      title: options.name,
    })
    this.getDetailInfo(options.id)
    this.getCommentInfo()
  },
  // 轮播 商品详情
  getDetailInfo(id){
    request({
      url:`/goods/${id}`
    }).then(res=>{
      this.setData({
        info:res
      })
    })
  },
  // 用户评价
  getCommentInfo(){
    request({
      url:"/comments"
    }).then(res=>{
      this.setData({
        commentList:res
      })
    })
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
  handleTap(evt){
    // 在新页面中全屏预览图片
    wx.previewImage({
      current: evt.currentTarget.dataset.current, // 当前显示图片的http链接
      urls: this.data.info.slides.map(item=>`http://localhost:5000${item}`) // 需要预览的图片http链接列表
    })
  },
  handleActive(evt){
    this.setData({
      current:evt.currentTarget.dataset.index
    })
  },
  handleAdd(){
    CheckAuth(()=>{
      // 加入购物车
      let {nickName} = wx.getStorageSync('token')
      let tel = wx.getStorageSync('tel')
      var goodId = this.data.info.id
      // 查询对应的手机号 商品id 用户名等
      request({
        url:"/carts",
        data:{
          tel,
          goodId,
          nickName
        }
      }).then(res=>{
        // 第一次加入该商品到购物车
        // 未添加该商品 发post请求添加该商品等数据到数据库
        if(res.length===0){
          return request({
            url:"/carts",
            method:"post",
            data:{
              "username": nickName,
              "tel": tel,
              "goodId": goodId,
              "number": 1,
              "checked": false
            }
          })
        }else{
          // 第n次加入该商品到购物车
          // 查询到已有商品 数量+1 用put请求数据覆盖
          return request({
            url:`/carts/${res[0].id}`,
            method:"put",
            data:{
              ...res[0],
              number:res[0].number+1
            }
          })
        }
      }).then(res=>{
        // promise 链式调用 then方法会返回一个新的promise对象
        // 自带弹框方法
        wx.showToast({
          title: '加入购物车成功',
        })
      })
    })
  },
  // 跳转购物车
  handleChange(){
    wx.switchTab({
      url: '/pages/shopcar/shopcar',
    })
  }
})
