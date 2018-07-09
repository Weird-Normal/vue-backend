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
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="danger" size="small" @click="deleteUser(scope.row)">删除</el-button>
            <el-button type="success" size="small" @click="setCurrent(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>

      <Pagination :page="page" :data="userData" v-on:refresh="getUsersData"></Pagination>
    </el-row>

    <!-- 创建用户 modal -->
    <el-dialog title="创建用户" :visible.sync="dialogCreateVisible" :close-on-click-modal="false" :close-on-press-escape="false" @close="closeCreate">
      <el-form id="#create" :model="create" :rules="rules" ref="create" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="create.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="create.email"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="create.age"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogCreateVisible = false">取消</el-button> -->
        <el-button @click="closeCreate">取消</el-button>
        <el-button type="primary" :loading="createLoading" @click="createUser">确定</el-button>
      </div>
    </el-dialog>

    <!-- 修改用户 modal -->
    <el-dialog title="修改用户信息" :visible.sync="dialogUpdateVisible" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-form id="#update" :model="update" :rules="updateRules" ref="update" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="update.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="update.email"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model.number="update.age"></el-input>
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
import Pagination from '@/components/pagination/pagination'

var placeholders = {
  'username': '请输入查找用户名',
  'email': '请输入查找邮箱'
}

export default {
  name: 'S1',
  data () {
    return {
      userData: [],
      page: {
        psize: 10, // 每页的条数
        cpage: 1, // 当前页
        total: 0,
        username: '',
        age: '',
        email: '',
        sorts: ''
      },
      create: {
        username: '',
        email: '',
        age: ''
      },
      currentId: '',
      update: {
        username: '',
        email: '',
        age: ''
        // is_active: true
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
          required: true,
          message: '请输入邮箱',
          trigger: 'blur'
        }, {
          type: 'email',
          message: '邮箱格式不正确'
        }],
        age: [{
          required: true,
          message: '请输入年龄',
          trigger: 'blur'
        }, {
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
          required: true,
          message: '年龄不能为空'
        }, {
          type: 'number',
          message: '年龄必须为数字值'
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
  components: {
    Pagination
  },
  mounted: function () {
    this.getUsersData()
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
      this.getUsersData()
    },
    // 搜索字段的变更
    searchFieldChange (val) {
      this.placeholder = placeholders[val]
      console.log(`搜索字段：${val}`)
    },
    query () {
    },
    setCurrent (user) {
      this.currentId = user.id
      this.update.username = user.username
      this.update.email = user.email
      this.update.age = user.age
      this.dialogUpdateVisible = true
    },
    getUsersData: function () {
      this.loading = true
      var qs = require('qs')
      let limit = this.page.psize
      let offset = (this.page.cpage - 1) * limit
      this.$axios.post('/getUser', qs.stringify({start: offset, rows: limit})).then(res => {
        this.userData = res.data.data
        this.page.total = res.data.total
        this.loading = false
      }, err => {
        console.log(err)
      })
    },
    // 关闭创建用户表单
    closeCreate () {
      this.create.username = ''
      this.create.email = ''
      this.create.age = ''
      this.createLoading = false
      this.dialogCreateVisible = false
    },
    // 创建用户
    createUser () {
      this.$refs.create.validate((valid) => {
        if (valid) {
          this.createLoading = true
          this.$axios.post('/createUser', {info: this.create}).then(res => {
            this.$message.success('创建用户成功!')
            this.closeCreate()
            this.getUsersData()
          }).catch((res) => {
            var data = res
            if (data instanceof Array) {
              this.$message.error(data[0]['message'])
            } else if (data instanceof Object) {
              this.$message.error(data['message'])
            }
            this.createLoading = false
          })
        } else {
          // this.$message.error('存在输入校验错误!')
          return false
        }
      })
    },
    // 更新用户资料
    updateUser () {
      this.$refs.update.validate((valid) => {
        if (valid) {
          this.updateLoading = true
          this.$axios.post('/updateUser', {id: this.currentId, info: this.update}).then(res => {
            this.$message.success('修改成功！')
            this.dialogUpdateVisible = false
            this.updateLoading = false
            this.getUsersData()
          }, err => {
            console.log(err)
          }).catch(res => {
            var data = res
            if (data instanceof Array) {
              this.$message.error(data[0]['message'])
            } else if (data instanceof Object) {
              this.$message.error(data['message'])
            }
            this.updateLoading = false
          })
        } else {
          return false
        }
      })
    },
    // 删除单个用户
    deleteUser (user) {
      console.log('--------------' + user.id)
      this.$confirm('此操作将永久删除用户 ' + user.username + ', 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios.post('/deleteUser', { id: user.id }).then(res => {
          this.$message.success('成功删除了用户' + user.username + '!')
          this.getUsersData()
        }, err => {
          console.log(err)
        }).catch(res => {
          this.$message.error('删除失败！')
        })
      }).catch(() => {
        this.$message.info('已取消操作!')
      })
    },
    // 删除多个用户
    deleteUsers () {
      let ids = []
      this.selected.map((item) => {
        ids.push(item.id)
      })
      this.$confirm('此操作将永久删除 ' + this.selected.length + ' 个用户, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        this.$axios.post('/removeUsers', {id: ids}).then(res => {
          this.$message.success('删除了' + this.selected.length + '个用户!')
          this.getUsersData()
        }, err => {
          console.log(err)
        }).catch(res => {
          this.$message.error('删除失败！')
        })
      }).catch(() => {
        this.$message('已取消操作!')
      })
    }
  }
}
</script>
