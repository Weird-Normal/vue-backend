<template>
  <div>
    <el-row>
      权限设置
      <el-button @click="forward()">返回</el-button>
    </el-row>
    <el-form>
      <!-- <el-form-item label="商品管理">
        <el-checkbox v-bind="key" v-for="item in goods">{{ item }}</el-checkbox>
      </el-form-item>
      <el-form-item label="订单管理">
        <el-checkbox v-bind="key" v-for="item in goods">{{ item }}</el-checkbox>
      </el-form-item> -->
      <el-form-item v-for="item in auth" :key="item">
        {{ item.label}}
        <el-checkbox v-for="i in item.detail" :key="i">
          {{ i }}
        </el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button>保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Auth',
  data () {
    return {
      auth: [{
        label: '商品管理',
        detail: [
          '图片批量处理',
          '图片库管理',
          '商品添加/编辑',
          '商品删除/恢复',
          '分类添加/编辑',
          '分类转移/删除',
          '商品属性管理',
          '商品评价管理'
        ]
      }, {
        label: '订单管理',
        detail: [
          '图片批量处理',
          '图片库管理',
          '商品添加/编辑',
          '商品删除/恢复',
          '分类添加/编辑',
          '分类转移/删除',
          '商品属性管理',
          '商品评价管理'
        ]
      }]
    }
  },
  methods: {
    // 前端搜索功能需要区分是否检索,因为对应的字段的索引不同
    // 用两个变量接收currentChangePage函数的参数
    doFilter () {
      if (this.tableDataName === '') {
        this.$message.warning('查询条件不能为空！')
        return
      }
      this.tableDataEnd = []
      // 每次手动将数据置空,因为会出现多次点击搜索情况
      this.filterTableDataEnd = []
      this.tableDataBegin.forEach((value, index) => {
        if (value.name) {
          if (value.name.indexOf(this.tableDataName) >= 0) {
            this.filterTableDataEnd.push(value)
          }
        }
      })
      // 页面数据改变重新统计数据数量和当前页
      this.currentPage = 1
      this.totalItems = this.filterTableDataEnd.length
      // 渲染表格,根据值
      this.currentChangePage(this.filterTableDataEnd)
      // 页面初始化数据需要判断是否检索过
      this.flag = true
    },
    openData () {},
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.handleCurrentChange(this.currentPage)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
      // 需要判断是否检索
      if (!this.flag) {
        this.currentChangePage(this.tableDataEnd)
      } else {
        this.currentChangePage(this.filterTableDataEnd)
      }
    }, // 组件自带监控当前页码
    currentChangePage (list) {
      let from = (this.currentPage - 1) * this.pageSize
      let to = this.currentPage * this.pageSize
      this.tableDataEnd = []
      for (; from < to; from++) {
        if (list[from]) {
          this.tableDataEnd.push(list[from])
        }
      }
    },
    forward () {
      this.$router.push('/page2/branch')
    }
  }
}
</script>
