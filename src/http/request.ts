import type { RequestParams, DataObject } from './config'
import { HOST } from './config'

const token = wx.getStorageSync('token')

function request({ url, data = {}, method = 'GET', header = {} }: RequestParams) { 
    return new Promise((resolve, reject) => {
        wx.request({
            url: HOST + url,
            data,
            method,
            header,
            success:({statusCode, data}: {statusCode: number, data: DataObject}) => {
                if (statusCode === 401) {
                    setTimeout(() => {
                      wx.navigateTo({
                        url: "/pages/account/login/index"
                      })
                    }, 0)
                  }
          
                // 请求成功
                if (statusCode === 200) {
                // 业务状态码大于400，则为异常，并显示对应异常提示信息
                    if (data.code && data.code >= 400) {
                      wx.showToast({
                        title: String(data.message || 'system error'),
                        icon: 'none',
                        duration: 2000
                      })
                    }
                // 返回该异常值
                    resolve(data)
                }
          
                // 其它 http 级异常，返回异常值
                resolve({
                    code: statusCode,
                    message: data.message,
                    data: {}
                })
            },
            fail: err => {
                // 失败时返回错误信息，这样使用端不需要 try catch 接收
                reject({
                  code: err.errno || 400,
                  message: err.errMsg,
                  data: {}
                })
        
                // 异常提示
                wx.showToast({
                  title: err.errMsg,
                  icon: 'error',
                  duration: 2000
                })
            }
        })
    })
}

function upload(url: string, filePath: string, name = 'file', formData = {}, timeout = 60000) {
    // 返回一个 Pormise ，使其支持 Promise 调用
    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url: HOST + url,
        filePath,
        name,
        formData,
        header: {
          // 上传接口必传 token ，后端会校验该值是否合法
          // 注意 Bearer 后有一个空格
          token: token
        },
        timeout,
        success: ({ data }) => {
          if (typeof data === 'string') {
            data = JSON.parse(data)
          }
          resolve(data)
        },
        fail: err => {
          // 失败时返回错误信息，这样使用端不需要 try catch 接收
          reject({
            code: err.errno || 400,
            message: err.errMsg,
            data: {}
          })
  
          // 异常提示
          wx.showToast({
            title: err.errMsg,
            icon: 'error',
            duration: 2000
          })
        }
      })
    })
}

export default {
    // get 请求
    get(url:string, data:any, header = {}) {      
      return request({url, data, method:"GET", header})
    },
    // post 请求
    post(url:string, data:any, header = {}) {
        return request({url, data, method:'POST', header})
    },
    
    // put 请求
    put(url:string, data:any, header = {}) {
        return request({url, data, method:'PUT', header})
    },
    
    // 删除请求
    delete(url:string, data:any, header = {}) {
        return request({url, data, method:'DELETE', header})
    },
    
    // 上传请求
    upload(url:string, filePath: string, name:string, formData: object) {
        return upload(url, filePath, name, formData)
    }
}
