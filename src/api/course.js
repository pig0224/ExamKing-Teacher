import request from '@/utils/request'

export default {
  // 课程列表
  list: (params) => {
    return request({
      url: '/course/course-list',
      method: 'get',
      params
    })
  },
}