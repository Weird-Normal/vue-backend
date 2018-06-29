<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>数据库管理</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="">
      <el-row class="my-row">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="备份时间:">
            <el-date-picker
              v-model="value5"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type='primary' icon="el-icon-search">搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-edit">开始备份</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-table :data='fileData' border style='width: 100%'>
        <el-table-column prop='filename' label='备份文件名'></el-table-column>
        <el-table-column prop='version' label='版本号'></el-table-column>
        <el-table-column prop='size' label='大小(字节)'></el-table-column>
        <el-table-column prop='time' label='备份时间'></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editRole(scope.row)">恢复</el-button>
            <el-button type="text" size="small" @click="setCurrent(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <Pagination :page="page" :data="fileData" v-on:refresh="getFileData"></Pagination>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/pagination/pagination'
import Rule from '@/assets/js/rule'

export default {
  name: 'Database',
  data () {
    return {
      fileData: [],
      page: {
        size: 10,
        cpage: 1,
        total: 0
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      value5: '',
      value: '',
      options: [{
        value: 1,
        label: '已启用'
      }, {
        value: 0,
        label: '已禁用'
      }],
      updateRules: Rule.updateRules(),
      updateLoading: false,
      currentId: '',
      update: {
        role: '',
        note: '',
        status: ''
      }
    }
  },
  components: {
    Pagination
  },
  mounted: function () {
    this.getFileData()
  },
  methods: {
    getFileData () {
      var qs = require('qs')
      let limit = this.page.size
      let offset = (this.page.cpage - 1) * limit
      this.$axios.post('/getDatabase', qs.stringify({start: offset, rows: limit})).then(res => {
        this.fileData = res.data.data
        this.page.total = res.data.total
      }, err => {
        console.log(err)
      })
    },
    updateRole () {

    },
    editRole (user) {
      this.currentId = user.id
      this.update.role = user.role
      this.update.note = user.note
      this.update.status = user.status
      this.dialogUpdateVisible = true
    }
  }
}
</script>

<style>
.my-row.el-row {
  padding: 1.2rem 0rem 0rem 0rem;
}
</style>
