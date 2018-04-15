<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>处理中心</el-breadcrumb-item>
      <el-breadcrumb-item>导航一</el-breadcrumb-item>
      <el-breadcrumb-item>table</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table :data="userData" stripe style="width: 100%">
      <el-table-column prop="id" label="ID">
      </el-table-column>
      <el-table-column prop="username" label="姓名">
      </el-table-column>
      <el-table-column prop="email" label="邮箱">
      </el-table-column>
      <el-table-column prop="age" label="年龄">
      </el-table-column>
    </el-table>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Table',
  data () {
    return {
      userData: []
    }
  },
  created () {
    this.setUserData()
  },
  methods: {
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

</style>
