import CheckAuth from "../../util/auth"
import request from "../../util/request"
// pages/shopcar/shopcar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slideButtons:[{
      type: 'warn',
      text: '删除'
    }],
    cartList:[]
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
      let {nickName} = wx.getStorageSync('token')
      let tel = wx.getStorageSync('tel')
      request({
        // json server 外键查询
        // 查询该用户和手机号下的所有购物车数据并加上对应id的商品数据good
        url:`/carts?_expand=good&username=${nickName}&tel=${tel}`
      }).then(res=>{
        this.setData({
          cartList:res
        })
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
  // 购物车商品删除
  slideButtonTap(evt){
    var id = evt.currentTarget.dataset.id
    this.setData({
      // filter 过滤除了当前选择的所有项
      cartList:this.data.cartList.filter(item=>item.id!==id)
    })
    // 删除对应数据库中数据
    request({
      url:`/carts/${id}`,
      method:"delete"
    })
  },
  // 购物车商品选择
  handleTap(evt){
    var item = evt.currentTarget.dataset.item
    item.checked = !item.checked
    this.handleUpdate(item)
  },
  // 减少商品数量
  handleMinus(evt){
    var item = evt.currentTarget.dataset.item
    if(item.number===1){
      return
    }
    item.number--
    this.handleUpdate(item)
  },
  // 增加商品数量
  handleAdd(evt){
    var item = evt.currentTarget.dataset.item
    item.number++
    this.handleUpdate(item)
  },
  // 封装重复计算金额
  handleUpdate(item){
    // 每次点击多选框后更新新的数据
    this.setData({
      cartList:this.data.cartList.map(data=>{
        // 将当前选择的商品数据重新覆盖老数据中
        if(data.id===item.id){
          return item
        }
        // 其余未改变的数据原路返回
        return data
      })
    })
    // 每次点击更改数据库中内容
    request({
      url:`/carts/${item.id}`,
      method:"put",
      data:{
        "username": item.username,
        "tel": item.tel,
        "goodId": item.goodId,
        "number": item.number,
        "checked": item.checked
      }
    })
  },
  handleAllChecked(evt){
    if(evt.detail.value.length===0){
      // 未全选
      this.setData({
        cartList:this.data.cartList.map(item=>({
          ...item,
          checked:false
        }))
      })
      
    }else(
      // 全选
      this.setData({
        cartList:this.data.cartList.map(item=>({
          ...item,
          checked:true
        }))
      })
    )
  }
})
