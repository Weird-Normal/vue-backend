<template>
  <div >
    <el-container>
      <el-aside width="200px">
        <Aside1></Aside1>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Aside1 from '@/components/aside/Aside1'

export default {
  name: 'Page1',
  data () {
    return {
    }
  },
  components: {
    Aside1
  }
}
</script>

<style>

</style>
