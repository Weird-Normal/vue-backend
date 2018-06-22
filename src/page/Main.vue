<template>
  <el-container>
    <el-main>
      <el-row style="padding-left: 4.5rem">
        <el-col :span="5" v-for="(o, index) in currentData" :key="index" :offset="index > 0 ? 1 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <!-- <img src="" class="image"> -->
            <div style="padding: 14px;">
              <i class="el-icon-tickets"></i>
              <span>{{ o.title }}</span>
              <div class="clearfix">
                {{ o.count }}
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row class="main-item">
        <el-col :span="24">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>待处理事务</span>
            </div>
            <el-col v-for="(o, index) in todosData" :key="index" :span="8">
              <div v-for="(i, index) in o" :key="index" class="todo-div">
                <span>{{ i.title }}</span>
                <span class="main-count">{{ i.count }}</span>
              </div>
            </el-col>
          </el-card>
        </el-col>
      </el-row>
      <el-row class="main-item">
        <el-col :span="24">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>待处理事务</span>
            </div>
            <el-col v-for="(o, index) in todosData" :key="index" :span="8">
              <div v-for="(i, index) in o" :key="index" class="todo-div">
                <span>{{ i.title }}</span>
                <span class="main-count">{{ i.count }}</span>
              </div>
            </el-col>
          </el-card>
        </el-col>
      </el-row>
      <el-row class="main-item">
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>用户总览</span>
            </div>
            <el-col v-for="(o, index) in usersData" :key="index" :span="6" class="main-about">
                <div>{{ o.count }}</div>
                <div>{{ o.title }}</div>
            </el-col>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>商品总览</span>
            </div>
            <el-col v-for="(o, index) in goodsData" :key="index" :span="6" class="main-about">
                <div>{{ o.count }}</div>
                <div>{{ o.title }}</div>
            </el-col>
          </el-card>
        </el-col>
      </el-row>
    </el-main>

  </el-container>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      currentData: [
        {
          title: '今日订单总数',
          count: 500
        },
        {
          title: '今日销售总额',
          count: 7000.00
        },
        {
          title: '昨日销售总额',
          count: 7000.00
        },
        {
          title: '近7天销售总额',
          count: 70000.00
        }
      ],
      todosData: [
        [
          {
            title: '待付款订单',
            count: 10
          },
          {
            title: '待发货订单',
            count: 10
          },
          {
            title: '已发货订单',
            count: 10
          }
        ],
        [
          {
            title: '已完成订单',
            count: 10
          },
          {
            title: '新缺货登记',
            count: 10
          },
          {
            title: '待处理退货订单',
            count: 10
          }
        ],
        [
          {
            title: '待确认退货订单',
            count: 10
          },
          {
            title: '待处理退款申请',
            count: 10
          },
          {
            title: '广告位即将到期',
            count: 10
          }
        ]
      ],
      goodsData: [
        {
          title: '已下架',
          count: 100
        },
        {
          title: '已上架',
          count: 400
        },
        {
          title: '库存紧张',
          count: 50
        },
        {
          title: '全部商品',
          count: 500
        }
      ],
      usersData: [
        {
          title: '今日新增',
          count: 100
        },
        {
          title: '昨日新增',
          count: 400
        },
        {
          title: '本月新增',
          count: 1000
        },
        {
          title: '会员总数',
          count: 5000
        }
      ]
    }
  },
  components: {
    // Aside1
  }
}
</script>

<style>
.todo-div {
  padding: 0 1rem;
  margin: 1rem 2rem;
  border-bottom: 1px solid #80808040
}

.el-card__header {
  background: gainsboro;
}

.main-item {
  margin: 2rem 3.5rem 1rem 4rem;
}

.main-count {
  float: right;
  color: red;
}

.main-about {
  text-align: center;
  padding-bottom: 1rem;
}
</style>
