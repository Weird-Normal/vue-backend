<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>处理中心</el-breadcrumb-item>
      <el-breadcrumb-item>导航一</el-breadcrumb-item>
      <el-breadcrumb-item>table</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="line-display">
      <div>
        <!-- 查询 -->
        <ul class="btn-edit fl">
          <li class="input-search">
            <el-input :placeholder="placeholder" v-model="keywords" style="width: 300px;">
              <el-select v-model="select" @change="searchFieldChange" slot="prepend">
                <el-option label="用户名" value="username"></el-option>
                <el-option label="邮箱" value="email"></el-option>
              </el-select>
              <el-button type="danger" class="danger" slot="append" icon="search" @click="query">查找</el-button>
            </el-input>
          </li>
        </ul>

        <!-- 操作 -->
        <ul class="btn-edit fr">
          <li>
            <el-button type="primary" @click="dialogCreateVisible = true"><i class="el-icon-plus iconss"></i>添加</el-button>
            <el-button type="danger" @click="deleteUsers()" :disabled="selected.length==0"><i class="el-icon-delete"></i>删除</el-button>
          </li>
        </ul>
      </div>
      <el-table :data="userData"
                stripe
                v-loading="loading"
                element-loading-text="拼命加载中..."
                style="width: 100%"
                @sort-change="tableSortChange"
                @selection-change="tableSelectionChange">
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column prop="id" label="ID" sortable="custom"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="age" label="年龄"></el-table-column>
        <el-table-column inline-template label="操作">
          <span>
            <el-button type="danger" size="small" @click="deleteUser(row)">删除</el-button>
            <el-button type="success" size="small" @click="setCurrent(row)">编辑</el-button>
          </span>
        </el-table-column>
      </el-table>

      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.cpage"
          :page-sizes="[10, 20, 50, 70]"
          :page-size="page.psize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total">
        </el-pagination>
      </div>
    </el-row>

    <!-- 创建用户 modal -->
    <el-dialog title="创建用户" v-model="dialogCreateVisible" :close-on-click-modal="false" :close-on-press-escape="false" @close="reset">
      <el-form id="#create" :model="create" :rules="rules" ref="create" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="create.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="create.email"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="create.age"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCreateVisible = false">取消</el-button>
        <el-button type="primary" :loading="createLoading" @click="createUser">确定</el-button>
      </div>
    </el-dialog>

    <!-- 修改用户 modal -->
    <el-dialog title="修改用户信息" v-model="dialogUpdateVisible" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form id="#update" :model="update" :rules="updateRules" ref="update" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="update.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="update.email"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="update.age"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUpdateVisible = false">取消</el-button>
        <el-button type="primary" :loading="updateLoading" @click="updateUser">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import api from '@/api/api.js'

var placeholders = {
  'username': '请输入查找用户名',
  'email': '请输入查找邮箱'
}

export default {
  name: 'Table',
  data () {
    return {
      userData: [],
      page: {
        psize: 10, // 每页的条数
        cpage: 1, // 当前页
        totoal: 0,
        username: '',
        age: '',
        email: '',
        sorts: ''
      },
      create: {
        id: '',
        username: '',
        email: '',
        age: '',
        is_active: true
      },
      currentId: '',
      update: {
        name: '',
        email: '',
        age: '',
        is_active: true
      },
      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }, {
          min: 4,
          max: 20,
          message: '长度在 4 到 20 个字符'
        }, {
          pattern: /^[A-Za-z0-9]+$/,
          message: '用户名只能为字母和数字'
        }],
        email: [{
          type: 'email',
          message: '邮箱格式不正确'
        }],
        age: [{
          type: 'number',
          message: '年龄只能为数字'
        }]
      },
      updateRules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }, {
          min: 4,
          max: 20,
          message: '长度在 4 到 20 个字符'
        }],
        email: [{
          type: 'email',
          message: '邮箱格式不正确'
        }],
        age: [{
          type: 'number',
          message: '年龄只能为数字'
        }]
      },
      loading: true,
      keywords: '', // 搜索框的关键字内容
      select: 'username', // 搜索框的搜索字段
      selected: [], // 已选择项
      dialogCreateVisible: false, // 创建对话框的显示状态
      dialogUpdateVisible: false, // 编辑对话框的显示状态
      createLoading: false,
      updateLoading: false,
      placeholder: placeholders['username']
    }
  },
  created () {
    this.setUserData()
  },
  methods: {
    tableSelectionChange (val) {
      this.selected = val
    },
    // 排序
    tableSortChange (val) {
      if (val.prop != null) {
        if (val.order === 'descending') {
          this.page.sorts = '-' + val.prop
        } else {
          this.page.sorts = '' + val.prop
        }
      } else {
        this.page.sorts = ''
      }
    },
    setUserData: function () {
      this.$axios.get('/getUser').then(res => {
        // console.log(res.data)
        this.userData = res.data.userInfo
        // console.log(this.userData)
      })
    }
  }
}
</script>

<style>
ul li{list-style: none}
.tc{text-align:center; }
.mg{ margin-top:10px;}
.fl{float:left}
.fr{float:right}
</style>
