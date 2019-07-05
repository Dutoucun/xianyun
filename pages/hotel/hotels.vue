<!--  -->
<template>
  <!-- 面包屑 -->
  <div class="contianer">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">酒店</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">南京酒店</el-breadcrumb-item>
      <el-breadcrumb-item>南京古都文化酒店（鼓楼店）(如家联盟)</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 标题 -->
    <div class="title">
      <h4>南京古都文化酒店（鼓楼店）(如家联盟)</h4>
      <p>nan jing gu du wen hua hotel （ gu lou dian ）(ru jia lian meng)</p>
      <span>
        <i class="iconfont iconlocation"></i>北京东路8号(江苏电视台对面，北京东路与丹凤街交汇处东南角)
      </span>
    </div>
    <!-- 实景 -->
    <div class="photo">
      <el-row>
        <el-col :span="16">
          <div class="photo_left">
            <img src="../../static/images/1.jpeg" alt />
          </div>
        </el-col>
        <el-col :span="8">
          <div class="photo_right">
            <img src="../../static/images/2.jpeg" alt />
            <img src="../../static/images/3.jpeg" alt />
            <img src="../../static/images/4.jpeg" alt />
            <img src="../../static/images/5.jpeg" alt />
            <img src="../../static/images/6.jpeg" alt />
            <img src="../../static/images/7.jpeg" alt />
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 订购渠道 -->
    <el-table :data="orderDATa" style="width: 100%;margin-top:40px" align="center">
      <el-table-column prop="name" label="价格来源"></el-table-column>
      <el-table-column prop="bestType" label="低价房型"></el-table-column>
      <el-table-column label="最低价格/每晚" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px;color:#f90">￥{{ scope.row.price }}</span>
          <span>起</span>
          <i class="el-icon-arrow-right" style="color:#f90"></i>
        </template>
      </el-table-column>
    </el-table>
    <!-- 地图 -->
<template>
    <div class="map">
      <Map />
      <el-card class="box-card" style="width:33%">
        <el-tabs v-model="mapData" @tab-click="handleClick">
          <el-tab-pane label="风景" name="first">
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple"></div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light"></div>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="交通" name="second">
            <el-row>
              <el-col :span="12">
                <div class="grid-content bg-purple"></div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple-light"></div>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
</template>
  </div>
</template>
<script>
import Map from "@/components/hotel/map.vue";
export default {
  components: {
    Map
  },
  data() {
    //这里存放数据
    return {
      // 订购渠道
      orderDATa: [
        {
          name: "携程",
          price: 281,
          bestType: "高级大床房A"
        },
        {
          name: "艺龙",
          price: 240,
          bestType: "高级大床房A"
        },
        {
          name: "Hotels.com",
          price: 228,
          bestType: "高级大床房A"
        }
      ],
      mapData:"first"
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 切换地图
    handleClick(){

    },
    // 获取酒店数据
    getHotelsData(){
this.$axios({
   url: `hotels`,
    params:{id:18}
      }).then(res => {
console.log(res);
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
   this.getHotelsData()

    
  }
};
</script>
<style lang='less' scoped>
.contianer {
  width: 1000px;
  margin: 20px auto;
}
.title {
  margin-top: 20px;
  h4 {
    color: #333;
    font-weight: 400;
    font-size: x-large;
  }
  > p {
    color: #666;
    font-size: 14px;
  }
  span {
    color: #666;
    font-size: 14px;
  }
}

.photo {
  margin-top: 40px;
  .photo_left {
    > img {
      height: 360px;
      width: 640px;
    }
  }
  .photo_right {
    > img {
      width: 160px;
      margin-bottom: 9px;
    }
    > img:nth-child(even) {
      margin-left: 7px;
    }
  }
}
.map {
  margin-top: 40px;
  display: flex;
}
</style>