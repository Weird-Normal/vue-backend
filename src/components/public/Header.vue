<template>
  <!-- <div> -->
    <el-row>
      <el-col :span="12"><div class="my-logo">后台管理系统</div></el-col>
      <el-col :span="12"><div class="my-logout">欢迎,{{ username }} <el-button @click="logout">退出</el-button></div></el-col>
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
  },
  methods: {
    logout: function () {
      this.$store.commit('delToken')
      this.$router.replace('/Login')
    }
  }
}
</script>

<style>
.my-logo {
  text-align: left;
  margin: 0 0 0 20px
}

.my-logout {
  text-align: right;
  margin: 0 20px 0 0
}
</style>
