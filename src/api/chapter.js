import request from '@/utils/request'

export default {
  // 章节列表
  list: (params) => {
    return request({
      url: '/course/chapter-list',
      method: 'get',
      params
    })
  },
}