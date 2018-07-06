import axios from 'axios'

const instance = axios.create({
  // baseURL: '/ghoapi/',
  baseURL: 'http://local.guihuao.com/earth/',
  timeout: 10000,
  headers: {
    'Content-type': 'application/x-www-form-urlencoded'
  },
  transformRequest: [function (data) {
    // `transformRequest` 允许在向服务器发送前，修改请求数据
    let ret = ''
    for (let it in data) {
      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    }
    return ret
  }]
})

export default instance
