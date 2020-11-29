<template>
  <div class="app-container">
    <el-form :model="form"
             ref="form"
             label-width="120px"
             v-loading="formLoading"
             :rules="rules">

      <el-form-item label="所属课程："
                    required>
        <course-select :course-label="courseName"
                       :course-id.sync="form.courseId"></course-select>
      </el-form-item>

      <el-form-item label="所属班级："
                    required>
        <dept-class-select :classes-id.sync="classesId"
                           :dept-id.sync="deptId"
                           :dept-label="deptName"
                           :classes-label="classesName"></dept-class-select>
      </el-form-item>

      <el-form-item label="试卷名称："
                    prop="examName">
        <el-input type="text"
                  placeholder="请输入试卷名称"
                  v-model="form.examName" />
      </el-form-item>

      <el-form-item style="width:50%"
                    label="开始时间："
                    prop="startTime">
        <el-date-picker v-model="form.startTime"
                        type="datetime"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择开始时间">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="结束时间："
                    prop="endTime">
        <el-date-picker v-model="form.endTime"
                        type="datetime"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择结束时间">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="单选题："
                    required="">
        <single-select :loading="loadingSingles"
                       :question-list.sync="form.singles"></single-select>
      </el-form-item>

      <el-form-item label="多选题："
                    required="">
        <select-select :loading="loadingSelects"
                       :question-list.sync="form.selects"></select-select>
      </el-form-item>

      <el-form-item label="是非题："
                    required="">
        <judge-select :loading="loadingJudges"
                      :question-list.sync="form.judges"></judge-select>
      </el-form-item>

      <el-form-item label="考试时长：">
        <el-input type="text"
                  disabled
                  v-model="duration" />
      </el-form-item>

      <el-form-item label="试卷总分数：">
        <el-input type="text"
                  disabled
                  v-model="examScore" />
      </el-form-item>

      <el-form-item label="是非题分数">
        <el-input type="text"
                  disabled
                  v-model="judgeScore" />
      </el-form-item>

      <el-form-item label="单选题分数">
        <el-input type="text"
                  disabled
                  v-model="singleScore" />
      </el-form-item>

      <el-form-item label="多选题分数">
        <el-input type="text"
                  disabled
                  v-model="selectScore" />
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
import examApi from '@/api/exam'
import CourseSelect from '@/components/CourseSelect'
import DeptClassSelect from '@/components/DeptClassSelect'
import SingleSelect from '@/components/SingleSelect'
import SelectSelect from '@/components/SelectSelect'
import JudgeSelect from '@/components/JudgeSelect'

export default {
  components: {
    CourseSelect,
    DeptClassSelect,
    SingleSelect,
    SelectSelect,
    JudgeSelect,
  },
  data() {
    return {
      form: {
        id: 0,
        examName: '',
        courseId: 0,
        examclasses: [],
        startTime: '',
        endTime: '',
        duration: 0,
        isEnable: '0',
        examScore: 0,
        judgeScore: 0,
        singleScore: 0,
        selectScore: 0,
        selects: [],
        singles: [],
        judges: [],
      },
      loadingSingles: true,
      loadingSelects: true,
      loadingJudges: true,
      courseName: '',
      classesName: '',
      deptName: '',
      classesId: 0,
      deptId: 0,
      duration: '0分钟',
      examScore: '0分',
      judgeScore: '0分',
      singleScore: '0分',
      selectScore: '0分',
      formLoading: false,
      rules: {
        examName: [
          { required: true, message: '请输入试卷名称', trigger: 'blur' },
        ],
        startTime: [
          { required: true, message: '请选择开始试卷', trigger: 'blur' },
        ],
        endTime: [
          { required: true, message: '请选择结束试卷', trigger: 'blur' },
        ],
      },
    }
  },
  computed: {},
  watch: {
    classesId: {
      handler(val) {
        this.form.examclasses.push({ classesId: val })
      },
      deep: true,
    },
    form: {
      handler(val) {
        // 计算考试分数
        var singleScore = 0
        val.singles.forEach((item) => {
          singleScore = singleScore + parseInt(item.score)
        })
        var selectScore = 0
        val.selects.forEach((item) => {
          selectScore = selectScore + parseInt(item.score)
        })
        var judgeScore = 0
        val.judges.forEach((item) => {
          judgeScore = judgeScore + parseInt(item.score)
        })
        var examScore = singleScore + selectScore + judgeScore
        this.form.examScore = examScore
        this.form.judgeScore = judgeScore
        this.form.singleScore = singleScore
        this.form.selectScore = selectScore
        this.examScore = examScore + '分'
        this.judgeScore = judgeScore + '分'
        this.singleScore = singleScore + '分'
        this.selectScore = selectScore + '分'
        // 计算考试时长
        var startTime = this.$utils.strToTimestamp(val.startTime)
        var endTime = this.$utils.strToTimestamp(val.endTime)
        var duration = endTime - startTime
        if (duration > 0) {
          this.form.duration = duration
          this.duration = this.$utils.showTime(duration)
        } else {
          this.form.duration = 0
          this.duration = '0分钟'
        }
      },
      deep: true,
    },
  },
  methods: {
    async submitForm() {
      let _this = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.courseId <= 0) {
            _this.$message.error('请选择所属系别')
            return false
          }
          if (this.form.examclasses.length <= 0) {
            _this.$message.error('请选择所属班级')
            return false
          }
          // 判断考试时长
          if (this.form.duration <= 0) {
            _this.$message.error('考试时间设置不正确')
            return false
          }
          if (this.form.selectScore <= 0) {
            _this.$message.error('请选择多选题并设置分数')
            return false
          }
          if (this.form.singleScore <= 0) {
            _this.$message.error('请选择单选题并设置分数')
            return false
          }
          if (this.form.judgeScore <= 0) {
            _this.$message.error('请选择是非题并设置分数')
            return false
          }
          this.formLoading = true
          examApi
            .update(this.form)
            .then(() => {
              _this.$message.success('更新成功')
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
  created() {
    var id = this.$route.query.id
    var that = this
    var form = this.form
    examApi.find(id).then(({ data }) => {
      this.form = {
        ...form,
        ...data,
      }
      this.deptName = data.classes[0].dept.deptName
      this.classesName = data.classes[0].classesName
      this.courseName = data.course.courseName
    })
    // 获取题库信息
    examApi.singles(id).then(({ data }) => {
      var newQuestion = []
      data.forEach((item) => {
        newQuestion.push({
          questionId: item.questionId,
          score: item.score,
          question: item.single.question,
        })
      })
      that.form.singles = newQuestion
      that.loadingSingles = false
    })
    examApi.selects(id).then(({ data }) => {
      var newQuestion = []
      data.forEach((item) => {
        newQuestion.push({
          questionId: item.questionId,
          score: item.score,
          question: item.select.question,
        })
      })
      that.form.selects = newQuestion
      that.loadingSelects = false
    })
    examApi.judges(id).then(({ data }) => {
      var newQuestion = []
      data.forEach((item) => {
        newQuestion.push({
          questionId: item.questionId,
          score: item.score,
          question: item.judge.question,
        })
      })
      that.form.judges = newQuestion
      that.loadingJudges = false
    })
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