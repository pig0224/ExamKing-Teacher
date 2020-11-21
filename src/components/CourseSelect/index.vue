<template>
  <div class='course-select'>
    <el-select v-model="Course"
               :loading="loading"
               placeholder="请选择课程"
               filterable
               clearable>
      <el-option v-for="item in items"
                 :key="item.id"
                 :value="item.id"
                 :label="item.courseName"></el-option>
      <div style="bottom: 0;width: 100%;background: #fff">
        <pagination v-show="totalCount>0"
                    :total="totalCount"
                    :page.sync="queryParam.pageIndex"
                    :limit.sync="queryParam.pageSize"
                    layout="prev, pager,next,total"
                    @pagination="search" />
      </div>
    </el-select>
  </div>
</template>

<script>
import courseApi from '@/api/course'
import Pagination from '@/components/Pagination'

export default {
  name: 'CourseSelect',
  components: { Pagination },
  props: {
    courseId: {
      type: Number,
      default: 0,
    },
    courseLabel: {
      type: String,
      default: '',
    },
  },
  watch: {
    courseLabel: {
      handler(val) {
        this.courseName = val
      },
      deep: true,
    },
  },
  computed: {
    Course: {
      get() {
        return this.courseName
      },
      set(val) {
        if (val) {
          var item = this.getItem(this.items, val)
          this.courseName = item.courseName
          this.$emit('update:courseId', item.id)
        } else {
          this.courseName = ''
          this.$emit('update:courseId', 0)
        }
      },
    },
  },
  data() {
    return {
      queryParam: {
        pageIndex: 1,
        pageSize: 10,
      },
      courseName: '',
      totalCount: 0,
      loading: true,
      items: [],
    }
  },
  methods: {
    async search() {
      this.loading = true
      // 获取课程数据
      await courseApi.list(this.queryParam).then(({ data }) => {
        this.queryParam.pageIndex = data.pageIndex
        this.queryParam.pageSize = data.pageSize
        this.totalCount = data.totalCount
        this.items = data.items
      })
      this.loading = false
    },
    getItem(array, id) {
      for (let item of array) {
        if (item.id === id) {
          return item
        }
      }
      return null
    },
  },
  created() {
    this.search()
  },
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style lang='scss' scoped>
</style>