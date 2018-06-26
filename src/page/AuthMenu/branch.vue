<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>部门管理</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="">
      <!-- 搜索 开始 -->
      <el-row class="my-row">
        <el-form :inline="true" :model="searchCondition" class="demo-form-inline">
          <el-form-item label="部门名称">
            <el-input v-model='searchCondition.branchName' placeholder='请输入部门名称' style='width:240px'></el-input>
          </el-form-item>
          <!-- <el-form-item label="部门状态">
            <el-select v-model="searchCondition.state" placeholder="请选择查询状态">
              <el-option label="全部" value=""></el-option>
              <el-option label="已启用" value="1"></el-option>
              <el-option label="已禁用" value="0"></el-option>
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item id="submit-item">
            <el-button type='primary' icon="el-icon-search" @click="onSearchSubmit">搜索</el-button>
          </el-form-item> -->
          <el-form-item>
            <el-button type="primary" icon="el-icon-edit" @click="addNewBranch">新增</el-button>
          </el-form-item>
        </el-form>
      </el-row>
      <!-- 搜索 结束 -->
      <el-table :data='filterData' border style='width: 100%'>
        <el-table-column prop='id' label='编号'></el-table-column>
        <el-table-column prop='name' label='部门名称'></el-table-column>
        <el-table-column prop='describe' label='职能描述'>
          <template slot-scope="scope">
            <span v-if="scope.row.describe === ''" style="color: red">暂无描述</span>
            <span v-else>{{ scope.row.describe }}</span>
          </template>
        </el-table-column>
        <el-table-column prop='count' label='成员数量' width="100rem"></el-table-column>
        <el-table-column prop='time' label='添加时间'></el-table-column>
        <el-table-column prop='status' label='是否启用' width="150rem">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" active-text="启用" inactive-text="禁用"></el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="270rem">
          <template slot-scope="scope">
            <el-button type="primary" plain size="small" @click="editRole(scope.row)">角色编辑</el-button>
            <el-button type="success" size="small" @click="setAuth(scope.row)">权限设置</el-button>
            <el-button type="danger" size="small" @click="deleteUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <Pagination :page="page" :data="branchData"></Pagination>
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
  name: 'Branch',
  data () {
    return {
      branchData: [
        {
          id: '01',
          name: '市场部',
          describe: '市场工作',
          count: 100,
          time: '2018-1-1 00:00:00',
          status: true
        },
        {
          id: '02',
          name: '开发部',
          describe: '',
          count: 100,
          time: '2018-1-1 00:00:00',
          status: false
        }
      ],
      page: {
        psize: 10,
        cpage: 1
      },
      // selected: [], // 已选择项
      searchCondition: {
        branchName: ''
        // state: ''
      },
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
  computed: {
    filterData: function () {
      let branchName = this.searchCondition.branchName
      console.log(branchName)
      let items1
      if (branchName) {
        items1 = this.branchData.filter(function (item) {
          return Object.keys(item).some(function (key1) {
            return String(item[key1]).match(branchName)
          })
        })
      } else {
        items1 = this.branchData
      }

      return items1
    }
  },
  components: {
    Pagination
  },
  methods: {
    // 搜索
    // onSearchSubmit () {
    //   this.branchData = this.branchData.filter()
    // },
    updateRole () {

    },
    editRole (user) {
      this.currentId = user.id
      this.update.role = user.role
      this.update.note = user.note
      this.update.status = user.status
      this.dialogUpdateVisible = true
    },
    // 设置权限
    setAuth (user) {
      this.$router.push('/authMenu/auth')
    }
  }
}
</script>

<style>
.my-row.el-row {
  padding: 1.2rem 0rem 0rem 0rem;
}
</style>
