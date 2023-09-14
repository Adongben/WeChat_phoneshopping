import request from "../../util/request"
// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vtabs:[],
    activeTab:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    request({
      // json server 模糊查询详解
      // 1.查询categories内容
      // 2.根据categories中id的值匹配goods下的所有叫categoryId的值
      // 3.将值一样的goods分别嵌入同id值的categories中 然后返回
      url:"/categories?_embed=goods"
    }).then(res=>{
      console.log(res)
      this.setData({
        vtabs:res
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
    var id = evt.currentTarget.dataset.id
    var name = evt.currentTarget.dataset.name
    wx.navigateTo({
      url:`/pages/detail/detail?id=${id}&name=${name}`,
    })
  }
})
