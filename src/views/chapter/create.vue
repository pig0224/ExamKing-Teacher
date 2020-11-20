<template>
  <div class="app-container">
    <el-form :model="form"
             ref="form"
             label-width="100px"
             v-loading="formLoading"
             :rules="rules">
      <el-form-item v-show="!hideCourseSelect"
                    label="所属课程："
                    required>
        <course-select :course-id.sync="form.courseId"></course-select>
      </el-form-item>
      <el-form-item label="章节名称："
                    prop="chapterName">
        <el-input v-model="form.chapterName"></el-input>
      </el-form-item>
      <el-form-item label="章节描述："
                    prop="desc">
        <el-input v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="
                   primary"
                   @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import chapterApi from '@/api/chapter'
import CourseSelect from '@/components/CourseSelect'

export default {
  components: { CourseSelect },
  data() {
    return {
      form: {
        chapterName: '',
        courseId: 0,
        desc: '',
      },
      hideCourseSelect: false,
      formLoading: false,
      rules: {
        chapterName: [
          { required: true, message: '请输入章节名称', trigger: 'blur' },
        ],
        desc: [{ required: true, message: '请输入章节描述', trigger: 'blur' }],
      },
    }
  },
  computed: {},
  watch: {},
  methods: {
    async submitForm() {
      let _this = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.formLoading = true
          chapterApi
            .create(this.form)
            .then(() => {
              _this.$message.success('新增成功')
              _this.delCurrentView(_this).then(() => {
                _this.$router.push({
                  path: '/chapter/list',
                  query: { courseId: _this.form.courseId },
                })
              })
            })
            .catch(() => {
              _this.formLoading = false
            })
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.$refs['form'].resetFields()
    },
    ...mapActions('tagsView', { delCurrentView: 'delCurrentView' }),
  },
  created() {
    var courseId = this.$route.query.courseId
    if (courseId) {
      this.hideCourseSelect = true
      this.form.courseId = courseId
    }
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