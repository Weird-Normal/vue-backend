<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>操作日志</el-breadcrumb-item>
    </el-breadcrumb>

      <el-row class="my-row">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item label="操作人员">
            <el-input v-model='searchRolename' placeholder='请输入操作人员账号' style='width:240px'></el-input>
          </el-form-item>
          <el-form-item label="操作日期">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type='primary' icon="el-icon-search">搜索</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <el-table :data='operateData' border style='width: 100%'>
        <el-table-column prop='id' label='编号'></el-table-column>
        <el-table-column prop='name' label='操作者'></el-table-column>
        <el-table-column prop='time' label='操作日期'></el-table-column>
        <el-table-column prop='record' label='操作记录'></el-table-column>
      </el-table>

      <Pagination :page="page" :data="operateData" v-on:refresh="getOperateData"></Pagination>
  </div>
</template>

<script>
import Pagination from '@/components/pagination/pagination'
import Rule from '@/assets/js/rule'

export default {
  name: 'Operate',
  data () {
    return {
      form: {
        data1: ''
      },
      operateData: [],
      page: {
        size: 10,
        cpage: 1,
        total: 0
      },
      searchRolename: '',
      value: '',
      options: [{
        value: 1,
        label: '已启用'
      }, {
        value: 0,
        label: '已禁用'
      }],
      dialogUpdateVisible: false, // 编辑对话框的显示状态
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
    this.getOperateData()
  },
  methods: {
    getOperateData () {
      var qs = require('qs')
      let limit = this.page.size
      let offset = (this.page.cpage - 1) * limit
      this.$axios.post('/getOperate', qs.stringify({start: offset, rows: limit})).then(res => {
        this.operateData = res.data.data
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
