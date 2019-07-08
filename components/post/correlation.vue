<!-- 相关攻略 -->
<template>
  <div class="correlation">
    <div class="title">相关攻略</div>
    <div class="rows" >
       <nuxt-link :to="`/post/detail?id=${e.id}`" v-for="(e,i) in correlationData" :key="i">
      <el-row >
        <el-col :span="9">
          <el-image style="width: 100px; height: 80px" :src='e.images[0]' fit="cover" v-if="e.images.lenght!=0"></el-image>
          <el-image style="width: 100px; height: 80px" :src='circleUrl' fit="cover" v-else></el-image>
        </el-col>
        <el-col :span="15" class="content">
          <div class="correlation_title">{{e.title}}</div>
          <div class="correlation_date">{{e.created_at|time}} <i class="el-icon-view"></i><span v-if="e.watch"> {{e.watch}}</span><span v-else> 0</span></div>
        </el-col>
      </el-row>
        </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      correlationData: [],
      circleUrl: "../../_nuxt/static/images/1.jpeg",
   
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 获取相关攻略
    getCorrelationData() {
      this.$axios({
        url: "posts/recommend"
      }).then(res => {
        this.correlationData = res.data.data;
      });
    },

  },
  filters: {
    //   毫秒转年月日
    time(time) {
      return new Date(time).toLocaleString();
    }
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getCorrelationData();

  }
};
</script>
<style lang='less' scoped>
.title {
  font-weight: 400;
  font-size: 18px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
}
.rows {
  a{
   display: block;
    padding: 10px 0;
    border-bottom: 1px solid #ddd;
   
    >.el-row{
      width: 100%;
       display: flex;
       img{
         vertical-align:auto;
       }
    }
  }
  .content {
    position: relative;
  
    flex: 1;
    .correlation_date {
      position: absolute;
      bottom: 0;
      left: 0;
      font-size: 12px;
      color: #999;
    }
    .correlation_title {
      overflow: hidden;
      width: 100%;
    }
  }
}
</style>