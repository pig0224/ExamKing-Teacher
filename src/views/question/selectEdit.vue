<template>
  <div class="app-container">
    <el-form :model="form"
             ref="form"
             label-width="120px"
             v-loading="formLoading"
             :rules="rules">

      <el-form-item label="所属课程："
                    required>
        <course-select :course-id.sync="form.courseId"
                       :course-label="courseName"></course-select>
      </el-form-item>

      <el-form-item label="所属章节："
                    required>
        <chapter-select :course-id="form.courseId"
                        :chapter-label="chapterName"
                        :chapter-id.sync="form.chapterId"></chapter-select>
      </el-form-item>

      <el-form-item label="题目："
                    prop="question">
        <el-input type="textarea"
                  placeholder="请输入题目内容"
                  v-model="form.question"
                  :autosize="{ minRows: 1, maxRows: 6 }" />
      </el-form-item>

      <el-form-item label="
                  选择题类型："
                    prop="isSingle">
        <el-radio v-model="form.isSingle"
                  label="1">单选题</el-radio>
        <el-radio v-model="form.isSingle"
                  label="0">多选题</el-radio>
      </el-form-item>

      <el-form-item label="选项A"
                    label-width="120px"
                    class="question-item-label">
        <el-input v-model="form.optionA"
                  class="question-item-content-input" />
      </el-form-item>

      <el-form-item label="选项B"
                    label-width="120px"
                    class="question-item-label">
        <el-input v-model="form.optionB"
                  class="question-item-content-input" />
      </el-form-item>
      <el-form-item label="选项C"
                    label-width="120px"
                    class="question-item-label">
        <el-input v-model="form.optionC"
                  class="question-item-content-input" />
      </el-form-item>
      <el-form-item label="选项D"
                    label-width="120px"
                    class="question-item-label">
        <el-input v-model="form.optionD"
                  class="question-item-content-input" />
      </el-form-item>

      <el-form-item v-show="form.isSingle=='1'"
                    label="
                  答案："
                    prop="answer">
        <el-radio v-model="form.answer"
                  label="A">选项A</el-radio>
        <el-radio v-model="form.answer"
                  label="B">选项B</el-radio>
        <el-radio v-model="form.answer"
                  label="C">选项C</el-radio>
        <el-radio v-model="form.answer"
                  label="D">选项D</el-radio>
      </el-form-item>

      <el-form-item v-show="form.isSingle=='0'"
                    label="
                  答案："
                    prop="answer">
        <el-checkbox-group v-model="answerCheckList"
                           @change="changeAnswerCheck">
          <el-checkbox label="选项A"></el-checkbox>
          <el-checkbox label="选项B"></el-checkbox>
          <el-checkbox label="选项C"></el-checkbox>
          <el-checkbox label="选项D"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>

      <el-form-item label="解题思路：">
        <el-input type="textarea"
                  placeholder="请输入解题思路"
                  v-model="form.ideas"
                  :autosize="{ minRows: 4, maxRows: 6 }" />
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
import questionApi from '@/api/question'
import CourseSelect from '@/components/CourseSelect'
import ChapterSelect from '@/components/ChapterSelect'

export default {
  components: { CourseSelect, ChapterSelect },
  data() {
    return {
      form: {
        question: '',
        answer: '',
        isSingle: '1',
        courseId: 0,
        chapterId: 0,
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        ideas: '',
      },
      chapterName: '',
      courseName: '',
      answerCheckList: [],
      formLoading: false,
      rules: {
        question: [{ required: true, message: '请输入题目', trigger: 'blur' }],
        answer: [{ required: true, message: '请输入答案', trigger: 'blur' }],
        isSingle: [
          { required: true, message: '请选择是否单选', trigger: 'blur' },
        ],
      },
    }
  },
  computed: {},
  watch: {},
  methods: {
    changeAnswerCheck(val) {
      var obj = {
        选项A: 'A',
        选项B: 'B',
        选项C: 'C',
        选项D: 'D',
      }
      var answer = ''
      val.forEach((item, index) => {
        var _answer = obj[item]
        if (index == 0) {
          answer = answer + _answer
        } else {
          answer = answer + '、' + _answer
        }
      })
      this.form.answer = answer
    },
    async submitForm() {
      let _this = this

      this.$refs.form.validate((valid) => {
        if (valid) {
          // 至少需要一个选项
          if (!this.form.optionA) {
            _this.$message.error('至少需要一个选项')
            return false
          }
          this.formLoading = true
          questionApi
            .updateSelect(this.form)
            .then(() => {
              _this.$message.success('修改成功')
              _this.delCurrentView(_this).then(() => {
                _this.$router.push('/question/select-list')
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
    var id = this.$route.query.id
    if (id) {
      this.form.id = id
      await questionApi.findSelect(id).then(({ data }) => {
        var anwer = data.answer.split('、')
        anwer.forEach((item) => {
          this.answerCheckList.push('选项' + item)
        })
        this.form = data
        this.courseName = data.course.courseName
        this.chapterName = data.chapter.chapterName
      })
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