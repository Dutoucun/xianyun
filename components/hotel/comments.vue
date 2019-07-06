<!--  -->
<template>
  <div class="userComment">
    <el-row v-for="(e,i) in hotelsComments" :key="i">
      <el-col :span="3" class="user">
        <div class="demo-basic--circle">
          <div class="block">
            <el-avatar :size="50" :src="circleUrl" style="border:2px solid #fa3"></el-avatar>
          </div>
        </div>
        <div class="user_level">Lv.{{e.level}}</div>
        <div class="comment_date">{{e.created_at|time}}</div>
      </el-col>
      <el-col class="userComment_info" :span="21">
        <div class="commentContent">{{e.content}}</div>
        <el-input
          rows="1"
          type="textarea"
          placeholder="添加回复"
          v-model="textarea"
          show-word-limit
          resize="none"
          class="commentReply"
        ></el-input>
        <comments :hotelsComments="e.followed" v-if="e.followed" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      circleUrl: "../../_nuxt/static/images/1.jpeg",
      textarea: "",
      times:''
    };
  },
  name: "comments",
  props: {
    hotelsComments: {
      type: Array,
      default: {}
    }
  },
  filters: {
    //   毫秒转年月日
    time(time) {
      let dataTime = new Date(time).toLocaleString(); //2019/4/5 下午16:16:16
      let end = dataTime.lastIndexOf("/") + 2;
      return dataTime.slice(0,end);
    }
  }
};
</script>
<style lang='less' scoped>
.userComment {
  > .el-row {
    padding: 10px 0;
    border-bottom: 1px dashed #eeeeee;
  }

  padding: 20px 0;
  .user {
    display: flex;
    flex-direction: column;
    justify-content: left;
    align-items: center;
    .user_level {
      color: #fa3;
      text-align: center;
    }
    .comment_date {
      font-size: 14px;
      color: #999;
    }
  }
  .userComment_info {
    padding-left: 20px;
    .commentContent {
      text-indent: 2em;
      font-size: 16px;
      color: #666;
      line-height: 24px;
      display: block;
    }
    .commentReply {
      margin-top: 10px;

      // height: 2em;

      :focus {
        min-height: 6em !important;
        transition: all 0.25s;
      }
    }
  }
}
</style>