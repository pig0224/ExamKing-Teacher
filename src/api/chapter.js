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
  // 章节创建
  create: (data) => {
    return request({
      url: '/course/add-chapter',
      method: 'post',
      data
    })
  },
  // 删除章节
  remove: (id) => {
    return request({
      url: `/course/remove-chapter/${id}`,
      method: 'delete',
    })
  },
  // 查找章节
  find: (id) => {
    return request({
      url: `/course/info/${id}`,
      method: 'get',
    })
  },
  // 更新章节
  update: (data) => {
    return request({
      url: '/course/edit-chapter',
      method: 'put',
      data
    })
  }
}