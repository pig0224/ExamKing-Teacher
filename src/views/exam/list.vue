<!--  -->
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
      <!-- <el-table-column prop="dept.deptName"
                       label="所属系别" />
      <el-table-column prop="class.classesName"
                       label="所属班级" /> -->
      <el-table-column prop="startTime"
                       label="开始时间" />
      <el-table-column prop="endTime"
                       label="结束时间" />
      <el-table-column prop="duration"
                       label="考试时长" />
      <el-table-column prop="isEnable"
                       label="启用状态" />
      <el-table-column prop="isFinish"
                       label="结束状态" />
      <el-table-column prop="createTime"
                       label="创建时间" />
      <el-table-column prop="examScore"
                       label="试卷总分数" />
      <el-table-column prop="judgeScore	"
                       label="是非题分数" />
      <el-table-column prop="singleScore"
                       label="单选题分数" />
      <el-table-column prop="selectScore"
                       label="多选题分数" />
      <el-table-column width="220px"
                       label="操作"
                       align="center">
        <template slot-scope="{row}">
          <router-link :to="{path:'/exam/edit', query:{id:row.id}}"
                       class="link-left">
            <el-button size="mini">编辑</el-button>
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
// export default {
//   components: {},
//   data() {
//     return {}
//   },
//   computed: {},
//   watch: {},
//   methods: {},
//   created() {},
//   mounted() {},
//   beforeCreate() {}, //生命周期 - 创建之前
//   beforeMount() {}, //生命周期 - 挂载之前
//   beforeUpdate() {}, //生命周期 - 更新之前
//   updated() {}, //生命周期 - 更新之后
//   beforeDestroy() {}, //生命周期 - 销毁之前
//   destroyed() {}, //生命周期 - 销毁完成
//   activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
// }
</script>

<style lang='scss' scoped>
</style>