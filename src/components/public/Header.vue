<template>
  <!-- <div> -->
    <el-row>
      <el-col :span="12"><div>后台管理系统</div></el-col>
      <el-col :span="12"><div>欢迎{{ username }}</div></el-col>
    </el-row>
  <!-- </div> -->
</template>

<script>
import store from '@/util/store'

export default {
  name: 'Header',
  data () {
    return {
      username: store.state.username
    }
  }
}
</script>

<style>

</style>
