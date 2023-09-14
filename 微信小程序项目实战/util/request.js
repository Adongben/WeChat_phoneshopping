// 封装request请求
// 第二个参数控制是否要当前后端返回的接口数据的总长度
function request(params,isHeader=false){
  return new Promise((resolve,rejects)=>{
    // 显示 loading 提示框
    wx.showLoading({
      title: '正在加载中',
    })
    wx.request({
      ...params,
      url:'http://localhost:5000'+params.url,
      success:(res)=>{
        // 判断第二个参数 isHeader
        if(isHeader){
          resolve({
            list:res.data, // 请求回的数据
            total:res.header["x-Total-Count"] // 当前请求数据的总长度
          })
        }else{
          resolve(res.data) // 请求回的数据
        }
      },
      // 接口调用失败的回调函数
      fail:(err)=>{
        rejects(err)
      },
      // 成功/失败都会执行
      complete:()=>{
        // 隐藏 loading 提示框
        wx.hideLoading({
          success:(res)=>{

          }
        })
      }
    })
  })
}
export default request
