<template>
  <div>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>

      <el-header>
        <Menu></Menu>
      </el-header>

      <router-view></router-view>

      <!-- <el-row>
        <Main></Main>
      </el-row> -->

      <Footer></Footer>
    </el-container>
  </div>
</template>

<script>
import Header from '@/components/public/Header'
// import Main from '@/components/public/Main'
import Footer from '@/components/public/Footer'
import Menu from '@/components/public/Menu'

export default {
  name: 'Index',
  data () {
    return {
    }
  },
  components: {
    Header,
    // Aside,
    // Main,
    Menu,
    Footer
  }
}
</script>

<style scoped>
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
