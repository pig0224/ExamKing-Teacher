<template>
  <div class="app-container">
    <el-form :model="queryParam"
             ref="queryForm"
             :inline="true">
      <el-form-item>
        <router-link :to="{path:'/exam/create'}"
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
      <el-table-column prop="examName"
                       label="试卷名称" />
      <el-table-column prop="course.courseName"
                       label="所属课程" />
      <el-table-column prop="startTime"
                       label="开始时间" />
      <el-table-column prop="endTime"
                       label="结束时间" />
      <el-table-column label="考试时长"
                       align="center"
                       width="80">
        <template slot-scope="scope">
          {{$utils.showTime(scope.row.duration)}}
        </template>
      </el-table-column>

      <el-table-column label="启用状态"
                       align="center"
                       width="80">
        <template slot-scope="scope">
          {{scope.row.isEnable=="1"?"是":"否"}}
        </template>
      </el-table-column>

      <el-table-column label="结束状态"
                       align="center"
                       width="80">
        <template slot-scope="scope">
          {{scope.row.isFinish=="1"?"已结束":"未结束"}}
        </template>
      </el-table-column>
      <el-table-column prop="examScore"
                       label="试卷总分数"
                       align="center"
                       width="100" />
      <el-table-column prop="createTime"
                       label="创建时间" />
      <el-table-column width="220px"
                       label="操作"
                       align="center">
        <template slot-scope="{row}">
          <router-link :to="{path:'/exam/edit', query:{id:row.id}}"
                       class="link-left">
            <el-button size="mini">编辑</el-button>
          </router-link>
          <router-link v-show="row.isEnable"
                       :to="{path:'/exam/edit', query:{id:row.id}}"
                       class="link-left">
            <el-button size="mini"
                       type="primary">启用</el-button>
          </router-link>
          <el-button size="mini"
                     type="danger"
                     @click="deleteexam(row)"
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
import examApi from '@/api/exam'

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
      await examApi.list(this.queryParam).then(({ data }) => {
        this.queryParam.pageIndex = data.pageIndex
        this.queryParam.pageSize = data.pageSize
        this.totalCount = data.totalCount
        this.items = data.items
      })
      this.listLoading = false
    },
    async deleteexam(row) {
      // console.log(row)
      var id = row.id
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          examApi.remove(id).then(() => {
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