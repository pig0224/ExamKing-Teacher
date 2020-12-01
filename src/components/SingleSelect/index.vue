<template>
  <div id='single-select'>
    <el-button @click="addQuestion"
               type="primary">添加题目</el-button>
    <el-button @click="delQuestionSelect"
               type="warning">删除题目</el-button>
    <el-button @click="delAllQuestion"
               type="danger">清空题目</el-button>
    <el-table ref="questionTable"
              v-loading="loading"
              :data="questionItems"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection"
                       width="55">
      </el-table-column>
      <el-table-column label="题目">
        <template slot-scope="scope">{{ scope.row.question }}</template>
      </el-table-column>
      <el-table-column label="分值">
        <template slot-scope="scope">{{ scope.row.score }}</template>
      </el-table-column>
      <el-table-column label="操作"
                       width="200">
        <template slot-scope="scope">
          <el-button size="mini"
                     @click="setScore(scope.$index)">设置分值</el-button>
          <el-button size="mini"
                     type="danger"
                     @click="delQuestion(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="questionList.length>0"
                :total="questionList.length"
                :page.sync="questionIndex"
                :limit.sync="questionSize"
                @pagination="searchQuestion" />

    <el-dialog :visible.sync="showDialog"
               width="70%">
      <el-table v-loading="loadingQuestion"
                :data="items"
                @selection-change="handleSelectionQuestionChange"
                border
                fit
                highlight-current-row
                style="width: 100%">
        <el-table-column type="selection"
                         width="35"></el-table-column>
        <el-table-column prop="question"
                         label="题目"
                         min-width="200" />
        <el-table-column prop="optionA"
                         label="选项A" />
        <el-table-column prop="optionB"
                         label="选项B" />
        <el-table-column prop="optionC"
                         label="选项C" />
        <el-table-column prop="optionD"
                         label="选项D" />
        <el-table-column prop="answer"
                         label="答案"
                         width="120" />
      </el-table>
      <pagination v-show="totalCount>0"
                  :total="totalCount"
                  :page.sync="queryParam.pageIndex"
                  :limit.sync="queryParam.pageSize"
                  @pagination="search" />
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="showDialog = false">取 消</el-button>
        <el-button type="primary"
                   @click="confirmQuestionSelect">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import questionApi from '@/api/question'
import Pagination from '@/components/Pagination'

export default {
  name: 'SingleSelect',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    questionList: {
      required: true,
      type: Array,
    },
  },
  components: { Pagination },
  data() {
    return {
      questionItems: [],
      questionIndex: 1,
      questionSize: 5,
      selectQuestion: [],
      selectRemoteQuestion: [],
      showDialog: false,
      queryParam: {
        pageIndex: 1,
        pageSize: 5,
      },
      totalCount: 0,
      loadingQuestion: true,
      items: [],
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 添加题目
    addQuestion() {
      this.showDialog = true
    },
    // 删除选中题目
    delQuestionSelect() {
      this.selectQuestion.forEach((item) => {
        this.delQuestion(item)
      })
    },
    // 清空题目
    async delAllQuestion() {
      await this.$emit('update:questionList', [])
      this.questionList = []
      this.questionItems = []
    },
    handleSelectionChange(val) {
      this.selectQuestion = val
    },
    // 设置分值
    async setScore(index) {
      var that = this
      this.$prompt('请输入该题分值', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      })
        .then(({ value }) => {
          if (!value) {
            that.$message.error('请设置分数')
            return false
          }
          var newQuestionList = that.questionList
          newQuestionList[index].score = isNaN(value) ? 0 : parseInt(value)
          that.$emit('update:questionList', newQuestionList)
          that.searchQuestion()
        })
        .catch(() => {})
    },
    // 删除题目
    async delQuestion(row) {
      var newQuestionList = this.questionList
      var index = newQuestionList.findIndex((item) => {
        // console.log(item)
        // console.log(row)
        if (item.questionId == row.questionId) {
          return true
        }
      })
      newQuestionList.splice(index, 1)
      await this.$emit('update:questionList', newQuestionList)
      this.searchQuestion()
    },
    // 选中题库
    handleSelectionQuestionChange(val) {
      this.selectRemoteQuestion = val
    },
    // 确定题库
    async confirmQuestionSelect() {
      var newQuestionList = this.questionList
      this.selectRemoteQuestion.forEach((item) => {
        newQuestionList.unshift({
          questionId: item.id,
          question: item.question,
          score: 0,
        })
      })
      await this.$emit('update:questionList', newQuestionList)
      this.searchQuestion()
      this.selectRemoteQuestion = []
      this.showDialog = false
      this.search()
    },
    async search() {
      this.loadingQuestion = true
      // 获取课程数据
      return await questionApi.singleList(this.queryParam).then(({ data }) => {
        this.queryParam.pageIndex = data.pageIndex
        this.queryParam.pageSize = data.pageSize
        this.totalCount = data.totalCount
        this.items = data.items
        this.loadingQuestion = false
      })
    },
    // 数组分页
    pagination(pageNo, pageSize, array) {
      var offset = (pageNo - 1) * pageSize
      return offset + pageSize >= array.length
        ? array.slice(offset, array.length)
        : array.slice(offset, offset + pageSize)
    },
    searchQuestion() {
      this.questionItems = this.pagination(
        this.questionIndex,
        this.questionSize,
        this.questionList
        // this.items
      )
    },
  },
  async created() {
    await this.search()
    this.searchQuestion()
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