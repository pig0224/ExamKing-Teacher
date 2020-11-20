import request from '@/utils/request'

export default {
  // 查询单选题列表
  singleList: (params) => {
    return request({
      url: '/question/select-or-single-list',
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
      url: '/question/select-or-single-list',
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
  // 创建选择题
  createSelect: (data) => {
    return request({
      url: '/question/add-select',
      method: 'post',
      data
    })
  },
  // 创建是非题
  createJudge: (data) => {
    return request({
      url: '/question/add-judge',
      method: 'post',
      data
    })
  },
  // 查询选择题列表
  selects: (params) => {
    return request({
      url: '/question/select-list',
      method: 'get',
      params
    })
  },
  // 查询是非题列表 
  judges: (params) => {
    return request({
      url: '/question/judge-list',
      method: 'get',
      params
    })
  },
  // 删除选择题
  removeSelect: (id) => {
    return request({
      url: `/question/remove-select/${id}`,
      method: 'delete',
    })
  },
  // 删除是非题
  removeJudge: (id) => {
    return request({
      url: `/question/remove-judge/${id}`,
      method: 'delete',
    })
  },
  // 更新选择题
  updateSelect: (data) => {
    return request({
      url: '/question/edit-select',
      method: 'put',
      data
    })
  },
  // 更新是非题
  updateJudge: (data) => {
    return request({
      url: '/question/edit-judge',
      method: 'put',
      data
    })
  },
  // 查询选择题信息
  findSelect: (id) => {
    return request({
      url: `/question/select-info/${id}`,
      method: 'get',
    })
  },
  // 查询是非题信息
  findJudge: (id) => {
    return request({
      url: `/question/judge-info/${id}`,
      method: 'get',
    })
  },
}