<template>
  <div>

  <el-row>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1"><router-link to="/page1">处理中心</router-link></el-menu-item>
      <el-menu-item index="2"><router-link to="/page2">消息中心</router-link></el-menu-item>
      <el-menu-item index="3"><router-link to="/page3">我的任务</router-link></el-menu-item>
    </el-menu>
  </el-row>

  <router-view ></router-view>
  </div>
</template>

<script>
export default {
  name: 'Main',
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

<style>

</style>
