<template>
  <div>
    <el-container>

    <el-aside width="200px">
      <Aside2></Aside2>
    </el-aside>
    <el-container>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside2 from '@/components/aside/Aside2'
export default {
  name: 'Page2',
  data () {
    return {
    }
  },
  components: {
    Aside2
  }
}
</script>

<style>

</style>
