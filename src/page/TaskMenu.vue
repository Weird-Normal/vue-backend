<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <Aside></Aside>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Aside from '@/components/public/Aside'

export default {
  name: 'TaskMenu',
  data () {
    return {
    }
  },
  components: {
    Aside
  }
}
</script>

<style>

</style>
