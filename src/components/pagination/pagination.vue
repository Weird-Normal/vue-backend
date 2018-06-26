<template>
  <div class="center-box">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.cpage"
      :page-sizes="[10, 20, 50, 70]"
      :page-size="page.psize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="data.length">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: ['page', 'data'],
  methods: {
    // 每页显示的条数
    handleSizeChange (val) {
      console.log(`每页${val}条`)
      this.page.psize = val
      this.getUsersData()
    },
    // 当前页选择
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.page.cpage = val
      this.getUsersData()
    }
  }
}
</script>

<style>
.center-box {
  text-align: center;
  padding-top: 1rem;
}
</style>
