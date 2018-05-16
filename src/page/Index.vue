<template>
  <div>
    <!-- <el-container> -->
      <div id="my-header">
        <el-header>
          <Header></Header>
        </el-header>
        <el-header>
          <Menu></Menu>
        </el-header>
      </div>
      <div id="my-page">
        <router-view></router-view>
      </div>
      <Footer></Footer>
    <!-- </el-container> -->
  </div>
</template>

<script>
import Header from '@/components/public/Header'
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
    Menu,
    Footer
  }
}
</script>

<style scoped>
.el-header {
  padding: 0px;
}
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

#my-app {
  min-height: 100%;
  height: auto !important;
  height: 100;
  position: relative
}

#my-page {
  padding-bottom: 60px
}
</style>
