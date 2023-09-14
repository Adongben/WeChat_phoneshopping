function CheckAuth(callback){
  // 判断是否有手机号信息
  if(wx.getStorageSync('tel')){
    // 回调函数 条件成立 原路返回执行
    callback()
  }else{
    // 判断是否有登录token信息
    if(wx.getStorageSync('token')){
      wx.navigateTo({
        url: '/pages/telform/telform', // 手机号绑定页面
      })
    }else{
      wx.navigateTo({
        url: '/pages/auth/auth', // 登录授权页面
      })
    }
  }
}
export default CheckAuth
