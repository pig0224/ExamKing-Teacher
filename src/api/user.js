import request from '@/utils/request'

export default {
  login: (data) => {
    return request({
      url: '/teacher/login',
      method: 'post',
      data
    })
  },
  getInfo: () => {
    return request({
      url: '/teacher/info',
      method: 'get'
    })
  }
}