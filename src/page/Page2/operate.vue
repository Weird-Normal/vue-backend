<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>操作日志</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="">
      <el-row class="my-row">
        <el-col :span="6">
          <span>操作人员：</span>
          <el-input v-model='searchRolename' placeholder='请输入操作人员账号' style='width:240px'></el-input>
        </el-col>
        <el-col :span="6">
          <span>操作日期：</span>
          <!-- <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select> -->
          <el-date-picker type="date" placeholder="选择日期" v-model="form.date1"></el-date-picker>
        </el-col>
        <!-- <el-button type='primary' icon="el-icon-search" @click='doFilter'>搜索</el-button> -->
        <el-button type='primary' icon="el-icon-search">搜索</el-button>
      </el-row>
      <el-table :data='roleData' border style='width: 100%'>
        <el-table-column prop='id' label='编号'></el-table-column>
        <el-table-column prop='name' label='操作者'></el-table-column>
        <el-table-column prop='time' label='操作日期'></el-table-column>
        <el-table-column prop='record' label='操作记录'></el-table-column>
      </el-table>

      <Pagination :page="page" :data="roleData"></Pagination>
    </div>
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
      roleData: [
        {
          id: '30031001',
          name: 'admin',
          time: '2018-1-1 11:11:11',
          record: '增加用户wei'
        },
        {
          id: '30031001',
          name: 'admin',
          time: '2018-1-1 11:11:11',
          record: '增加用户wei'
        },
        {
          id: '30031001',
          name: 'admin',
          time: '2018-1-1 11:11:11',
          record: '增加用户wei'
        },
        {
          id: '30031001',
          name: 'admin',
          time: '2018-1-1 11:11:11',
          record: '增加用户wei'
        }
      ],
      page: {
        psize: 10,
        cpage: 1
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
  methods: {
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
  padding: 1.2rem 0rem;
}
</style>
