import request from '@/utils/request'

export default {
  // 手动组卷
  add: (data) => {
    return request({
      url: '/exam/add-exam',
      method: 'post',
      data
    })
  },
  // 更新试卷
  update: (data) => {
    return request({
      url: '/exam/edit-exam',
      method: 'put',
      data
    })
  },
  // 删除试卷
  remove: (id) => {
    return request({
      url: '/exam/remove-exam/' + id,
      method: 'delete',
    })
  },
  //查询考试列表
  list: (params) => {
    return request({
      url: '/exam/exam-list',
      method: 'get',
      params
    })
  },
  // 查询考试信息
  find: (id) => {
    return request({
      url: '/exam/exam-info/' + id,
      method: 'get',
    })
  },
  //查询考试是非题列表
  judges: (id) => {
    return request({
      url: '/exam/judges/' + id,
      method: 'get',
    })
  },
  //查询考试多选题列表
  selects: (id) => {
    return request({
      url: '/exam/selects/' + id,
      method: 'get',
    })
  },
  //查询考试单选题列表
  singles: (id) => {
    return request({
      url: '/exam/singles/' + id,
      method: 'get',
    })
  },
  // 启用试卷
  enableExam: (id) => {
    return request({
      url: `/exam/enable-exam/${id}`,
      method: 'put',
    })
  }
}