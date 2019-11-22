import axios from '@@/utils/axios'
import { Dialog } from 'vant'
import { path } from '@/config.js'

// 接口路径、前缀
const baseURL = path + (process.env.NODE_ENV === 'development' ? '/proxy' : '')

/**
 * 请求拦截 config配置项
 * @params {string} url 接口地址
 * @params {string} method 请求方式
 * @params {object} data 参数数据
 * @params {boolean} isSelf 控制是否自行处理接口错误
 */
function http ({ url, method, data, isSelf, headers }) {
  method = method || 'post'
  isSelf = isSelf || false

  // 返回promise
  return new Promise((resolve, reject) => {
    axios({
      url,
      method,
      data,
      isSelf,
      headers,
      baseURL
    })
      .then(res => {
        if (res.result && (res.result.code === 2000)) {
          Dialog.alert({
            title: '提示',
            message: '登录失效，请重新登录'
          }).then(() => {
            // window.location.reload()
          })
        }
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export default http
