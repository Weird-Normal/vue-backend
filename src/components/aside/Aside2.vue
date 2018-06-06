<template>
  <div class="my-aside">
    <el-menu router default-active="1" @open="handleOpen" @close="handleClose" class="my-menu">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/page2/role">测试</el-menu-item>
          <el-menu-item index="/page2/branch">部门管理</el-menu-item>
          <el-menu-item index="/page2/member">成员管理</el-menu-item>
          <el-menu-item index="/page2/operate">操作日志</el-menu-item>
          <el-menu-item index="/page2/database">数据库管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Aside2',
  data () {
    return {
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style>

</style>
