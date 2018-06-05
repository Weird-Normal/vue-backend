<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>成员管理</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="">
      <el-row class="my-row">
        <el-col :span="7">
          <span>角色名称：</span>
          <el-input v-model='searchRolename' placeholder='请输入姓名' style="width: 200px"></el-input>
        </el-col>
        <el-col :span="7">
          <span>角色状态：</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-col>
        <!-- <el-button type='primary' icon="el-icon-search" @click='doFilter'>搜索</el-button> -->
        <el-col :span="10">
          <el-button type='primary' icon="el-icon-search">搜索</el-button>
          <el-button type="primary" icon="el-icon-edit" @click="add">新增</el-button>
        </el-col>
      </el-row>
      <el-table :data='memberData' border style='width: 100%'>
        <el-table-column prop='account' label='账号'></el-table-column>
        <el-table-column prop='name' label='姓名'></el-table-column>
        <el-table-column prop='email' label='邮箱地址'></el-table-column>
        <el-table-column prop='branch' label='所属部门'></el-table-column>
        <el-table-column prop='addTime' label='添加时间'></el-table-column>
        <el-table-column prop='lastTime' label='最后登录'></el-table-column>
        <el-table-column prop='status' label='角色状态' width="150">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" active-text="启用" inactive-text="禁用"></el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="primary" plain size="small" @click="editRole(scope.row)">角色编辑</el-button>
            <el-button type="danger" size="small" @click="deleteUser(scope.row)">删除</el-button>
            <!-- <el-button type="success" size="small" @click="setCurrent(scope.row)">设置人员</el-button> -->
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
  name: 'Member',
  data () {
    return {
      memberData: [
        {
          account: 'Jon',
          name: '王五',
          email: 'dsfas@csd.cn',
          branch: '技术部',
          addTime: '2018-6-1 00:00:00',
          lastTime: '2018-6-5 00:00:00',
          status: true
        },
        {
          account: 'Tim',
          name: '李四',
          email: 'vdsfas@csd.cn',
          branch: '技术部',
          addTime: '2018-6-1 00:00:00',
          lastTime: '2018-6-5 00:00:00',
          status: false
        },
        {
          account: 'qwedc',
          name: '王开宇',
          email: 'bffas@csd.cn',
          branch: '技术部',
          addTime: '2018-6-1 00:00:00',
          lastTime: '2018-6-5 00:00:00',
          status: false
        },
        {
          account: 'Tim',
          name: '李四',
          email: 'vdsfas@csd.cn',
          branch: '技术部',
          addTime: '2018-6-1 00:00:00',
          lastTime: '2018-6-5 00:00:00',
          status: true
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
    },
    add () {
      this.$router.push('/page2/addMember')
    }
  }
}
</script>

<style>
.my-row.el-row {
  padding: 1.2rem 0rem;
}
</style>
