// 引入request模块
import request from '../../util/request'
// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    looplist:[],
    goodlist:[]
  },

  current:1, // 页数
  total:0, // 数据总长度

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.renderSwiper()
    this.renderGoods()
  },
  renderSwiper(){
    request({
      url:"/recommends"
    }).then(res=>{
      this.setData({
        looplist:res
      })
    })
  },
  renderGoods(){
    request({
      url:`/goods?_page=${this.current}&_limit=5`
    },true).then(res=>{
      this.total = Number(res.total) // 将接收到的数据总长度字符类型转换为数字类型
      this.setData({
        goodlist:[...this.data.goodlist,...res.list] // 展开老数据+新数据 合并
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
    setTimeout(()=>{
      // 更新数据后
      wx.stopPullDownRefresh() // 停止下拉刷新
    },500)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // 每次下拉到底时判断当前数组长度是否等于数据总长度
    // 后端没有数据总长度时 判断每次拉取数据是否能为拉取的长度即可
    if(this.data.goodlist.length===this.total){
      return
    }
    this.current++
    this.renderGoods()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  handleEvent(){
    // 搜索处理
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  // 跳转页面并传参
  handleChangePage(evt){
    var id = evt.currentTarget.dataset.id
    var name = evt.currentTarget.dataset.name
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}&name=${name}`,
    })
  }
})
