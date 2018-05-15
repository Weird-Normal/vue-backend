<template>
  <!-- <div> -->
    <el-row>
      <el-col :span="12"><div class="my-title">后台管理系统</div></el-col>
      <el-col :span="12"><div class="my-logout">欢迎，{{ username }} <el-button>退出</el-button></div></el-col>
    </el-row>
  <!-- </div> -->
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      username: 'USER1'
    }
  }
}
</script>

<style>
.my-title {
  text-align: left;
  margin-left: 20px;
}

.my-logout {
  text-align: right;
  margin-right: 20px;
}
</style>
