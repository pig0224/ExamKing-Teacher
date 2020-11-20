<template>
  <div class="app-container">
    <el-form :model="queryParam"
             ref="queryForm"
             :inline="true">
      <el-form-item>
        <router-link :to="{path:'/chapter/create',query:{courseId:queryParam.courseId}}"
                     class="link-left">
          <el-button type="primary">添加</el-button>
        </router-link>
      </el-form-item>
    </el-form>

    <el-table v-loading="listLoading"
              :data="items"
              border
              fit
              highlight-current-row
              style="width: 100%">
      <el-table-column prop="chapterName"
                       label="章节名称" />
      <el-table-column prop="course.courseName"
                       label="所属课程" />
      <el-table-column prop="desc"
                       label="章节介绍" />

      <el-table-column width="150px"
                       label="操作"
                       align="center">
        <template slot-scope="{row}">
          <router-link :to="{path:'/chapter/edit', query:{courseId:row.course.id,id:row.id}}"
                       class="link-left">
            <el-button size="mini">编辑</el-button>
          </router-link>
          <el-button size="mini"
                     type="danger"
                     @click="deleteChapter(row)"
                     class="link-left">删除</el-button>
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
import chapterApi from '@/api/chapter'

export default {
  components: { Pagination },
  data() {
    return {
      listLoading: false,
      queryParam: {
        courseId: 0,
        pageIndex: 1,
        pageSize: 10,
      },
      totalCount: 0,
      items: [],
    }
  },
  created() {
    var courseId = this.$route.query.courseId
    if (courseId) {
      this.queryParam.courseId = courseId
      this.search()
    }
  },
  methods: {
    async search() {
      this.listLoading = true
      await chapterApi.list(this.queryParam).then(({ data }) => {
        this.queryParam.pageIndex = data.pageIndex
        this.queryParam.pageSize = data.pageSize
        this.totalCount = data.totalCount
        this.items = data.items
      })
      this.listLoading = false
    },
    async deleteChapter(row) {
      var id = row.id
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          chapterApi.remove(id).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!',
            })
            this.queryParam.pageIndex = 1
            this.search()
          })
        })
        .catch(() => {})
    },
  },
}
</script>

<style lang='scss' scoped>
</style>