import axios from 'axios'
import {base64} from 'vux'

axios.defaults.withCredentials = true;

// 拦截响应response，并做一些错误处理
axios.interceptors.response.use((response) => {
  const data = response.data;
  if (data.code === 0) {
    return response;
  } else if (data.code >= CODE_LoginException[0] && data.code <= CODE_LoginException[1]) {
    top.location.href = locationHref + "?back_url=" + base64.encode(top.location.href.split("#")[0] + '#/login?call_back=' + base64.encode(top.location.href));
    return response;
  } else if (data.code >= CODE_AuthException[0] && data.code <= CODE_AuthException[1]) {
    return Promise.reject({message: data.msg});
  } else {
    return Promise.reject({message: data.msg});
  }
}, (err) => {
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        err.message = '请求错误'
        break

      case 401:
        err.message = '未授权，请登录'
        break

      case 403:
        err.message = '拒绝访问'
        break

      case 404:
        err.message = `请求地址出错: ${err.response.config.url}`
        break

      case 408:
        err.message = '请求超时'
        break

      case 500:
        err.message = '服务器内部错误500'
        break

      case 501:
        err.message = '服务未实现'
        break

      case 502:
        err.message = '网关错误'
        break

      case 503:
        err.message = '服务不可用'
        break

      case 504:
        err.message = '网关超时'
        break

      case 505:
        err.message = 'HTTP版本不受支持'
        break

      default:
    }
  }
  return Promise.reject(err)
})

export default axios
