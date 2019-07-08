<!--  -->
<template>
  <div class="pComment">
    <!-- 有上一级才会继续递归 -->
    <replayComment v-if="replayComment.parent" :replayComment="replayComment.parent" @setReply='setReply'  />
    <div class="item">
      <div class="content">
        <el-row type="flex" justify="space-between">
          <div class="user">
            <div class="demo-basic--circle">
              <div class="block">
                <!-- 拼接服务器地址显示头像 -->
                <el-avatar
                  :size="30"
                  :src="$axios.defaults.baseURL+replayComment.account.defaultAvatar"
                  style="border:2px solid #fa3"
                ></el-avatar>
              </div>
            </div>
            <div class="username">{{replayComment.account.nickname}}</div>
            <div class="time">{{replayComment.created_at|time}}</div>
          </div>
          <div class="num">{{replayComment.level}}</div>
        </el-row>
        <div class="replayShow">
          <el-row>
            <div class="commentContent">
              <p>{{replayComment.content}}</p>
            </div>
          </el-row>
          <el-row>
            <!-- 判断是否有评论图片 -->
            <div class="commentImage">
              <div class="images" v-for="(e,i) in replayComment.pics" :key="i">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="$axios.defaults.baseURL+e.url"
                  fit="cover"
                ></el-image>
              </div>
            </div>
          </el-row>
          <el-row>
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              class="replay"
              @click="setReply(replayComment)"
            ></el-button>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "replayComment",
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      // 头像
      circleUrl: "../../_nuxt/static/images/1.jpeg"
    };
  },
  // 接收回复评论
  props: {
    replayComment: {
      type: Object,
      default: {}
    }
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleClose() {
    this.tapClose()
    },
    setReply(e) {
     this.$emit('setReply',e)
    }
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  filters: {
    //   毫秒转年月日
    time(time) {
      return new Date(time).toLocaleString();
    }
  }
};
</script>
<style lang='less' scoped>
.pComment {
  background: #f9f9f9;
  border: 1px solid #ddd;
  padding: 2px;

  .content {
    border-bottom: 1px dashed #ddd;
    padding: 20px 20px 5px;
    font-size: 12px;
    color: #666;
    .user {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .username {
        margin: 0 5px;
      }
      .time {
        color: #999;
      }
    }
  }
}
.commentContent {
  font-size: 16px;
  color: #333;
  p {
    text-indent: 2em;
  }
}
.commentImage {
  display: flex;
  .images {
    width: 100px;
    border-radius: 6px;
    overflow: hidden;
    margin-right: 5px;
    margin-top: 10px;
    padding: 5px;
    border: 1px dashed #ddd;
  }
}
.replayShow:hover .replay {
  visibility: visible;
}
.replay {
  float: right;
  visibility: hidden;
}
</style>