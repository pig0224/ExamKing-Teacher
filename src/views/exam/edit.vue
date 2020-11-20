<!-- exam edit -->
<template>
  <div class="app-container">

    <el-form :model="form"
             ref="form"
             label-width="100px"
             v-loading="formLoading"
             :rules="rules">
      <!-- <el-form-item label="账号："
                    prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码：">
        <el-input v-model="form.password"
                  placeholder="留空不修改密码"
                  type="password"></el-input>
      </el-form-item> -->
      <el-form-item label="试卷名称："
                    prop="examName">
        <el-input v-model="form.examName"></el-input>
      </el-form-item>

      <el-form-item label="开始时间："
                    prop="startTime">
        <el-input v-model="form.startTime"></el-input>
      </el-form-item>

      <el-form-item label="结束时间: "
                    prop="endTime">
        <el-input v-model="form.endTime"></el-input>
      </el-form-item>

      <el-form-item label="考试时长："
                    prop="duration">
        <el-input v-model="form.duration"></el-input>
      </el-form-item>

      <el-form-item label="启用状态："
                    prop="isEnable">
        <el-input v-model="form.isEnable"></el-input>
      </el-form-item>

      <el-form-item label="试卷总分数："
                    prop="examScore">
        <el-input v-model="form.examScore"></el-input>
      </el-form-item>
      <el-form-item label="是非题分数："
                    prop="judgeScore">
        <el-input v-model="form.judgeScore"></el-input>
      </el-form-item>
      <el-form-item label="单选题分数："
                    prop="singleScore">
        <el-input v-model="form.singleScore"></el-input>
      </el-form-item>
      <el-form-item label="多选题分数："
                    prop="selectScore">
        <el-input v-model="form.selectScore"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import examApi from '@/api/exam'

export default {
  components: {},
  data() {
    return {
      form: {
        id: null,
        username: '',
        password: '',
      },
      formLoading: false,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
      },
    }
  },
  watch: {},
  methods: {
    async submitForm() {
      let _this = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.formLoading = true
          var { id, username, password } = this.form
          examApi
            .update({ id, username, password })
            .then(() => {
              _this.$message.success('修改成功')
              _this.delCurrentView(_this).then(() => {
                _this.$router.push('/exam/list')
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
  async created() {
    this.formLoading = true
    var id = this.$route.query.id
    let that = this
    if (id) {
      await examApi.find(id).then(({ data }) => {
        that.form = data
      })
      this.formLoading = false
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