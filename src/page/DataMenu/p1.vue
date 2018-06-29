<template>
  <div>
    <!-- 新增/修改 表单 -->
    <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" v-show="isShow">
      <el-form-item prop="id" v-show="false">
        <el-input v-model="dynamicValidateForm.id"></el-input>
      </el-form-item>
      <el-form-item prop="date" label="日期" :rules="[{ required: true, message: '请输入日期', trigger: 'blur' }]">
        <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-model="dynamicValidateForm.date" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item prop="name" label="姓名" :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' }]">
        <el-input v-model="dynamicValidateForm.name"></el-input>
      </el-form-item>
      <el-form-item
        v-for="(domain, index) in dynamicValidateForm.domains"
        :label="'域名' + index"
        :key="domain.key"
        :prop="'domains.' + index + '.value'"
        :rules="{required: true, message: '域名不能为空', trigger: 'blur'}"
      >
        <el-input v-model="domain.value"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
        <el-button @click="addDomain">新增域名</el-button>
        <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
        <el-button @click="closeForm('dynamicValidateForm')">关闭</el-button>
      </el-form-item>
    </el-form>
    <!-- 操作按钮 -->
    <div style="margin-top: 20px">
      <el-row>
        <el-col :span="8">
          <el-button @click="addForm()" v-if="flagAdd">增加</el-button>
          <el-button @click="updateForm()" v-if="flagUpdate">修改</el-button>
          <el-button @click="deleteData()" v-if="flagDelete">删除</el-button>
        </el-col>
        <el-col :span="16">
          <el-form :inline="true">
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input v-model="searchFild.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <!-- 数据表格 -->
    <el-table ref="multipleTable" :data="tableData3" stripe tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="日期">
              <span>{{ props.row.date }}</span>
            </el-form-item>
            <el-form-item label="姓名">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="域名">
              <span>
                <ul>
                  <li v-for="(item, index) in props.row.domains" v-bind:key="index">
                    {{ item.value }}
                  </li>
                </ul>
              </span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" :index="indexMethod"></el-table-column>
      <el-table-column prop="id" label="主键" sortable width="0" v-if="false"></el-table-column>
      <el-table-column label="日期" sortable>
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" sortable></el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="margin-top: 20px; text-align: center">
      <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.cpage"
      :page-sizes="[10, 50, 100, 200]"
      :page-size="page.psize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total">
      </el-pagination>
    </div>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
  </div>
</template>

<script>
import store from '@/util/store'

export default {
  name: 'P1',
  data () {
    return {
      isAdd: true,
      isShow: false,
      flagAdd: false,
      flagUpdate: false,
      flagDelete: false,
      tableData3: [],
      multipleSelection: [],
      dynamicValidateForm: {
        domains: [{
          value: ''
        }],
        date: '',
        name: ''
      },
      page: {
        total: 0,
        psize: 10,
        cpage: 1
      },
      formLabelWidth: '50px',
      searchFild: {
        name: ''
      }
    }
  },
  mounted () {
    this.getPermit()
    this.getData()
  },
  methods: {
    getPermit () {
      var path = this.$route.path
      console.log('path: ' + path)
      var permit = store.state.permit
      var thisPermit = []
      for (let i = 0; i < permit.length; i++) {
        if (permit[i].path === path) {
          thisPermit = permit[i].permission.split(',')
          break
        }
      }
      this.flagAdd = thisPermit.includes('add')
      this.flagUpdate = thisPermit.includes('update')
      this.flagDelete = thisPermit.includes('delete')
    },
    getData () {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      var qs = require('qs')
      let limit = this.page.psize
      let offset = (this.page.cpage - 1) * limit
      let name = this.searchFild.name
      console.log(qs.stringify({start: offset, rows: limit}))
      this.$axios.post('/get', qs.stringify({start: offset, rows: limit, name: name})).then(response => {
        console.log(response.data)
        this.tableData3 = JSON.parse(response.data).data
        this.page.total = JSON.parse(response.data).total
      }).catch(error => {
        console.log(error)
        this.$message({
          showClose: true,
          message: '错了哦，这是一条错误消息',
          type: 'error'
        })
      })
      loading.close()
    },
    toggleSelection (rows) {
      console.log(`-----------row--------------`)
      console.log(rows)
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      console.log(`-----------val--------------`)
      console.log(val)
      this.multipleSelection = val
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.page.psize = val
      // let offset = (this.page.cpage-1) * val
      this.getData()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.page.cpage = val
      this.getData()
    },
    indexMethod (index) {
      let cpage = this.page.cpage
      let limit = this.page.psize
      let offset = (cpage - 1) * limit
      return offset + index + 1
    },
    addForm () {
      if (!this.isShow) {
        this.isShow = true
      }
      this.isAdd = true
    },
    updateForm () {
      let rows = this.multipleSelection
      console.log(`-----------update--------------`)
      console.log(rows.length)
      if (rows.length === 0) {
        this.$message({
          showClose: true,
          message: '请选择数据',
          type: 'error'
        })
        return false
      }
      if (rows.length > 1) {
        this.$message({
          showClose: true,
          message: '只能选1条数据',
          type: 'error'
        })
        return false
      }
      console.log(`----------- continue update--------------`)
      console.log(rows[0].name)
      if (!this.isShow) {
        this.isShow = true
      }
      this.isAdd = false
      this.dynamicValidateForm.id = rows[0].id
      this.dynamicValidateForm.name = rows[0].name
    },
    deleteData () {
      let rows = this.multipleSelection
      if (rows.length === 0) {
        this.$message({
          showClose: true,
          message: '请选择数据',
          type: 'error'
        })
        return false
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = []
        for (var i = 0; i < rows.length; i++) {
          var _id = rows[i].id
          var json = {id: _id}
          ids.push(json)
        }
        this.$axios.post('/del', JSON.stringify({id: ids}), {headers: {'Content-Type': 'application/json'}}).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.page.psize = 10
          this.page.cpage = 1
          this.getData()
        }).catch(error => {
          console.log(error)
          this.$message({
            showClose: true,
            message: '错了哦，这是一条错误消息',
            type: 'error'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let myurl = '/add'
          if (this.isAdd) {
            console.log('add!!')
          } else {
            console.log('update!!')
            myurl = '/update'
          }
          console.log(this.dynamicValidateForm.name)
          const loading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          var qs = require('qs')
          console.log(this.dynamicValidateForm)
          console.log(qs.stringify(this.dynamicValidateForm))
          this.$axios.post(myurl, qs.stringify(this.dynamicValidateForm)).then(response => {
            this.$message({
              showClose: true,
              message: '恭喜你，这是一条成功消息',
              type: 'success'
            })
            console.log(response.data)
            this.page.psize = 10
            this.page.cpage = 1
            this.getData()
          }).catch(error => {
            console.log(error)
            this.$message({
              showClose: true,
              message: '错了哦，这是一条错误消息',
              type: 'error'
            })
          })
          this.$refs[formName].resetFields()
          loading.close()
        } else {
          this.$message({
            showClose: true,
            message: '错了哦，这是一条错误消息',
            type: 'error'
          })
          return false
        }
      })
    },
    search () {
      this.getData()
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    closeForm (formName) {
      if (this.isShow) {
        this.isShow = false
      }
      this.$refs[formName].resetFields()
    },
    removeDomain (item) {
      var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    addDomain () {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now()
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
