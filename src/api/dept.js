import request from '@/utils/request'

export default {
  // 系别列表
  list: (params) => {
    return request({
      url: '/dept/dept-list',
      method: 'get',
      params
    })
  },
}