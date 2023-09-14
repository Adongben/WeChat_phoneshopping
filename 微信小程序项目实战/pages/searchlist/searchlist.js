import request from "../../util/request"
// pages/searchlist/searchlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodList:[]
  },
  priceorder:true, // 价格
  commentOrder:true, // 好评
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: options.name,
    })
    this.getList(options.id)
  },
  getList(id){
    request({
      // 查询并返回goods下的所有属性名为categoryId并id值为5的数据
      // (查询的属性名后缀为Id时，后缀必须加s) 如查询kerwinId 时 对应url为kerwins
      url:`/categories/${id}?_embed=goods`
    }).then(res=>{
      this.setData({
        goodList:res.goods
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
    wx.navigateTo({
      url:`/pages/detail/detail?id=${evt.currentTarget.dataset.id}&name=${evt.currentTarget.dataset.name}`,
    })
  },
  // 价格排序
  handlePrice(){
    this.priceorder = !this.priceorder
    this.setData({
      // 使用sort方法排序
      goodList:this.priceorder?this.data.goodList.sort((item1,item2)=>item1.price-item2.price):this.data.goodList.sort((item1,item2)=>item2.price-item1.price)
    })
  },
  // 好评排序
  handleComment(){
    this.commentOrder = !this.commentOrder
    this.setData({
      // 使用sort方法排序 parseInt方法强制转换字符串为数字类型
      goodList:this.commentOrder?this.data.goodList.sort((item1,item2)=>parseInt(item1.goodcomment)-parseInt(item2.goodcomment)):this.data.goodList.sort((item1,item2)=>parseInt(item2.goodcomment)-parseInt(item1.goodcomment))
    })
  }
})
