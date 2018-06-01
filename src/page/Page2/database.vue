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
        <el-col :span="6">
          <span>角色名称：</span>
          <el-input v-model='searchRolename' placeholder='请输入姓名' style='width:240px'></el-input>
        </el-col>
        <el-col :span="6">
          <span>角色状态：</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <!-- <el-button type='primary' icon="el-icon-search" @click='doFilter'>搜索</el-button> -->
        <el-button type='primary' icon="el-icon-search">搜索</el-button>
        <el-button type="primary" icon="el-icon-edit">新增</el-button>
      </el-row>
      <el-table :data='roleData' border style='width: 100%'>
        <el-table-column prop='id' label='编号'></el-table-column>
        <el-table-column prop='role' label='角色名称'></el-table-column>
        <el-table-column prop='note' label='备注'></el-table-column>
        <el-table-column prop='status' label='角色状态'>
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">已启用</span>
            <span v-else style="color: red">已禁用</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" plain size="small" @click="editRole(scope.row)">角色编辑</el-button>
            <el-button type="success" size="small" @click="setCurrent(scope.row)">设置人员</el-button>
          </template>
        </el-table-column>
      </el-table>

      <Pagination :page="page" :data="roleData"></Pagination>
    </div>

    <!-- 修改用户 modal -->
    <el-dialog title="编辑角色" :visible.sync="dialogUpdateVisible" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form id="#update" :model="update" :rules="updateRules" ref="update" label-width="100px">
        <el-form-item label="角色名称" prop="role">
          <el-input v-model="update.role"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="update.note"></el-input>
        </el-form-item>
        <el-form-item label="角色状态" prop="status">
          <!-- <el-input v-model.number="update.status"></el-input> -->
          <!-- <el-switch v-model.number="update.status" active-text="启动" inactive-text="禁用"></el-switch> -->
          <el-switch v-model="update.status" active-value=1 inactive-value=0 active-text="启动" inactive-text="禁用"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateVisible = false">取消</el-button>
        <el-button type="primary" :loading="updateLoading" @click="updateRole">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/pagination/pagination'
import Rule from '@/assets/js/rule'

export default {
  name: 'Database',
  data () {
    return {
      roleData: [
        {
          id: '01',
          role: '市场部主管',
          note: '',
          status: 1
        },
        {
          id: '02',
          role: '市场部普通员工',
          note: '',
          status: 0
        },
        {
          id: '03',
          role: '技术部主管',
          note: '',
          status: 1
        },
        {
          id: '04',
          role: '技术部普通员工',
          note: '',
          status: 0
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
