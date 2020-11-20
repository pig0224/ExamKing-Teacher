import request from '@/utils/request'

export default {
  // 查询单选题列表
  singleList: (params) => {
    return request({
      url: '/question/select-list',
      method: 'get',
      params: {
        ...params,
        issingle: true
      }
    })
  },
  // 查询多选题列表
  selectList: (params) => {
    return request({
      url: '/question/select-list',
      method: 'get',
      ...params,
      issingle: false
    })
  },
  // 查询是非题列表
  judgeList: (params) => {
    return request({
      url: '/question/judge-list',
      method: 'get',
      params
    })
  },
}