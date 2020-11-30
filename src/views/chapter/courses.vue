<template>
  <div class="app-container">

    <el-table v-loading="listLoading"
              :data="items"
              border
              fit
              highlight-current-row
              style="width: 100%">
      <el-table-column prop="courseName"
                       label="课程名称" />
      <el-table-column prop="classes"
                       label="所属班级" />
      <el-table-column prop="createTime"
                       label="创建时间" />

      <el-table-column width="200px"
                       label="操作"
                       align="center">
        <template slot-scope="{row}">
          <router-link :to="{path:'/chapter/list', query:{courseId:row.id}}"
                       class="link-left">
            <el-button size="mini"
                       type="primary">章节列表</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="totalCount>0"
                :total="totalCount"
                :page.sync="queryParam.pageIndex"
                :limit.sync="queryParam.pageSize"
                @pagination="search" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import courseApi from '@/api/course'

export default {
  components: { Pagination },
  data() {
    return {
      listLoading: false,
      queryParam: {
        pageIndex: 1,
        pageSize: 10,
      },
      totalCount: 0,
      items: [],
    }
  },
  created() {
    this.search()
  },
  methods: {
    async search() {
      this.listLoading = true
      await courseApi.list(this.queryParam).then(({ data }) => {
        this.queryParam.pageIndex = data.pageIndex
        this.queryParam.pageSize = data.pageSize
        this.totalCount = data.totalCount
        this.items = data.items
        this.items.forEach((item, index) => {
          var classes = ''
          this.items[index].classes.forEach((item, index) => {
            if (index == 0) {
              classes = item.classesName
            } else {
              classes = classes + '、' + item.classesName
            }
          })
          this.items[index].classes = classes
        })
      })
      this.listLoading = false
    },
  },
}
</script>

<style lang='scss' scoped>
</style>