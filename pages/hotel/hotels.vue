<!--  -->
<template>
  <!-- 面包屑 -->
  <div class="contianer">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">酒店</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">南京酒店</el-breadcrumb-item>
      <el-breadcrumb-item>{{hotelsData.name}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 标题 -->
    <div class="title">
      <h4>{{hotelsData.name}}</h4>
      <p>{{hotelsData.alias}}</p>
      <span>
        <i class="iconfont iconlocation"></i>
        {{hotelsData.address}}
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
    <el-table :data="hotelsData.products" style="width: 100%;margin-top:40px" align="center">
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
      <Map :mapLocation="hotelsData.location" />
    </template>
    <!-- 酒店配置 -->
    <template>
      <div class="hotel">
        <div class="basic">
          <el-row>
            <el-col :span="4">
              <span class="basic_title">基本信息</span>
            </el-col>
            <el-col :span="20" class="basic_info">
              <span>入住时间: 14:00之后</span>
              <span>离店时间: 12:00之前</span>
              <span>
                {{hotelsData.creation_time}}/
                {{hotelsData.renovat_time}}
              </span>
              <span>酒店规模: {{hotelsData.roomCount}}间客房</span>
            </el-col>
          </el-row>
        </div>
        <div class="main">
          <el-row>
            <el-col :span="4">
              <span class="main_title">主要设施</span>
            </el-col>
            <el-col class="main_info" :span="20">
              <span v-for="(e,i) in hotelsData.hotelassets" :key="i">{{e.name}}</span>
            </el-col>
          </el-row>
        </div>
        <div class="park">
          <el-row>
            <el-col :span="4">
              <span class="park_title">停车服务</span>
            </el-col>
            <el-col class="park_info" :span="20">
              <span v-if="hotelsData.parking">{{hotelsData.parking}}</span>
              <span v-else>暂无</span>
            </el-col>
          </el-row>
        </div>
        <div class="brand">
          <el-row>
            <el-col :span="4">
              <span class="brand_title">品牌信息</span>
            </el-col>
            <el-col
              class="brand_info"
              :span="20"
              v-if="hotelsData.hotelbrand!=null"
            >{{hotelsData.hotelbrand.name}}</el-col>
            <el-col class="brand_info" :span="20" v-else>无</el-col>
          </el-row>
        </div>
      </div>
    </template>
    <!-- 真实评论 -->
    <div class="comment">
      <el-row>
        <el-col>
          <span class="comment_title">
            <h4>{{hotelsComments.lenght}}条真实用户评论</h4>
          </span>
        </el-col>
      </el-row>
      <div class="comments">
        <el-row>
          <el-col :span="4">
            <p class="comment_info">总评数：{{hotelsData.all_remarks}}</p>
            <p class="comment_info">好评数：{{hotelsData.good_remarks}}</p>
            <p class="comment_info">差评数：{{hotelsData.bad_remarks}}</p>
          </el-col>
          <el-col :span="4" class="comment_star">
            <el-rate
              v-model="hotelsData.stars"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}分"
            ></el-rate>
            <div class="recommendedDegree">{{hotelsData.stars|recommendedDegree}}</div>
          </el-col>
          <el-col :span="3" class="comment_progress">
            <el-progress
              type="circle"
              :percentage="hotelsData.scores.environment*10"
              :format="environment"
              :width="75"
              :color="colors"
              :stroke-width="6"
            ></el-progress>
          </el-col>
          <el-col :span="3" class="comment_progress">
            <el-progress
              type="circle"
              :percentage="hotelsData.scores.product*10"
              :format="product"
              :width="75"
              :color="colors"
              :stroke-width="6"
            ></el-progress>
          </el-col>
          <el-col :span="3" class="comment_progress">
            <el-progress
              type="circle"
              :percentage="hotelsData.scores.service*10"
              :format="service"
              :width="75"
              :color="colors"
              :stroke-width="6"
            ></el-progress>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 评论 -->
   <hotelComments :hotelsComments='hotelsComments'/>
  </div>
</template>
<script>
import Map from "@/components/hotel/map.vue";
import hotelComments from "@/components/hotel/comments.vue";
export default {
  components: {
    Map,hotelComments
  },
  data() {
    //这里存放数据
    return {
      // 酒店信息
      hotelsData: {
        address: "",
        alias: "",
        name: "",
        // 订购渠道
        products: [],
        location: {
          latitude: 0,
          longitude: 0
        },
        enterTime: "",
        roomCount: null,
        creation_time: "",
        renovat_time: "",
        hotelbrand: {
          name: ""
        },
        hotelassets: [],
        parking: "",
        stars: 0,
        all_remarks: "",
        good_remarks: "",
        bad_remarks: "",
        scores: { environment: 10, product: 10, service: 10 }
      },
      // 评分颜色
      colors: [
        { color: "#f56c6c", percentage: 20 },
        { color: "#E6A23C", percentage: 40 },
        { color: "#67C23A", percentage: 60 },
        { color: "#008000", percentage: 80 },
        { color: "#228B22", percentage: 100 }
      ],
      // 评论数据
      hotelsComments:[],
     
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    service(percentage) {
      return "服务:" + this.hotelsData.scores.service;
    },
    product(percentage) {
      return "产品:" + this.hotelsData.scores.product;
    },
    environment(percentage) {
      return "环境:" + this.hotelsData.scores.environment;
    },
    // 获取酒店数据
    async getHotelsData() {
      let res = await this.$axios({
        url: `hotels`,
        params: { id: this.$route.query.id }
      });
      this.hotelsData = res.data.data[0];
    },
    // 获取评论
    getHotelsComments(){
      this.$axios({
        url:'hotels/comments'
      }).then(res=>{
        this.hotelsComments=res.data.data
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getHotelsData();
    this.getHotelsComments();
  },
  // 过滤器
  filters: {
    recommendedDegree(stars) {
      return stars === 5
        ? "惊喜"
        : stars >= 4
        ? "满意"
        : stars >= 3
        ? "一般"
        : stars >= 2
        ? "失望"
        : "极差";
    }
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
.basic,
.park,
.main,
.brand {
  border-bottom: 1px solid #eee;
}
.basic_title,
.main_title,
.brand_title,
.park_title {
  padding: 20px 10px;
  font-size: 14px;
  display: block;
}
.basic_info,
.park_info,
.brand_info {
  display: flex;
  justify-content: space-between;
  padding: 20px 10px;
  font-size: 14px;
  color: #666;
  padding-right: 40px;
}
.brand_info {
  color: #000;
}
.main_info {
  float: left;
  display: flex;
  padding: 20px 10px;
  > span {
    border: 1px solid #eee;
    padding: 4px 10px;
    margin-right: 10px;
    border-radius: 4px;
    background-color: #eee;
    color: #666;
  }
}
.comment {
  margin-top: 40px;
  .comments {
    color: #666;
    padding: 20px 0;
    .comment_info {
      margin: 5px 0;
    }
  }
}
.comment {
  border-bottom: 1px dashed #eee;
}
.comment_star {
  position: relative;
  top: 20px;
  font-size: x-large;
  .recommendedDegree {
    position: absolute;
    left: 20px;
    top: -90%;
    border: 2px solid #fa3;
    text-align: center;
    line-height: 70px;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    opacity: 0.25;
    -webkit-transform: rotate(-30deg);
    transform: rotate(-30deg);
    // font-size: x-large;
    color: #fa3;
  }
}
.comment_progress {
  width: 100px;
  height: 100px;
}

</style>