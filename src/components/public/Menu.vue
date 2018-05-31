<template>
  <el-row>
    <el-menu router :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="/page1">处理中心</el-menu-item>
      <el-menu-item index="/page2">系统管理</el-menu-item>
      <el-menu-item index="/page3">我的任务</el-menu-item>
    </el-menu>
  </el-row>
</template>

<script>
export default {
  name: 'Menu',
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>

</style>
