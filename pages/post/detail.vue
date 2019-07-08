<!--  -->
<template>
  <div class="contianer">
    <div class="main">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
        <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 标题  -->
      <div class="title">
        <h1>{{postData.title}}</h1>
      </div>
      <!-- 发表日期 -->
      <div class="post-info">
        <span>攻略：{{new Date(postData.account.created_at).toLocaleString()}}</span>
        <span>阅读：{{postData.watch}}</span>
      </div>
      <!-- 内容 -->
      <div class="detailContent" v-html="postData.content"></div>
      <!-- good -->
      <div class="good">
        <el-row :gutter="10">
          <el-col :span="3">
            <i class="el-icon-edit"></i>
            <span class="icon-name">评论(100)</span>
          </el-col>
          <el-col :span="3">
            <i class="el-icon-star-off"></i>
            <span class="icon-name">收藏</span>
          </el-col>
          <el-col :span="3">
            <i class="el-icon-share"></i>
            <span class="icon-name">e分享</span>
          </el-col>
          <el-col :span="3">
            <i class="el-icon-thumb"></i>
            <span class="icon-name">点赞(15)</span>
          </el-col>
        </el-row>
      </div>
      <div class="comment">
        <h4>评论</h4>
        <el-form ref="form" :model="commentForm">
          <el-tag closable @close="tapClose()" v-if="replaynameVisible" type="info">@{{replayname}}</el-tag>
          <!-- 输入框 -->
          <el-input
            type="textarea"
            :rows="2"
            placeholder="说点什么吧"
            v-model="commentForm.content"
            resize="none"
          ></el-input>
          <!-- 上传照片 -->
          <div class="upload">
            <el-upload
              :action="$axios.defaults.baseURL+'/upload'"
              :file-list="fileList"
              name="files"
              list-type="picture-card"
              :on-success="uploadSucess"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
            <el-button type="primary" size="small" @click="addComment">提交</el-button>
          </div>
        </el-form>
        <!-- 评论展示 -->
        <div class="pComment">
          <div class="item" v-for="(e,i) in postComment" :key="i.id">
            <div class="content">
              <el-row type="flex" justify="space-between">
                <div class="user">
                  <div class="demo-basic--circle">
                    <div class="block">
                      <el-avatar :size="30" :src="circleUrl" style="border:2px solid #fa3"></el-avatar>
                    </div>
                  </div>
                  <div class="username">{{e.account.nickname}}</div>
                  <div class="time">{{e.created_at|time}}</div>
                </div>
                <div class="num">{{e.level}}</div>
              </el-row>
              <el-row>
                <!-- 回复 -->
                <replyComments v-if="e.parent" :replayComment="e.parent" @setReply="setReply" />
              </el-row>
              <div class="replayShow">
                <el-row>
                  <div class="commentContent">
                    <p>{{e.content}}</p>
                  </div>
                </el-row>
                <el-row>
                  <div class="commentImage" v-if="e.pics.length!==0">
                    <div class="images" v-for="(e,i) in e.pics" :key="i">
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
                    @click="setReply(e)"
                  ></el-button>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <el-row type="flex" justify="center" style="margin-top:10px;">
        <!-- size-change：切换条数时候触发 -->
        <!-- current-change：选择页数时候触发 -->
        <!-- current-page: 当前页数 -->
        <!-- page-size：当前条数 -->
        <!-- total：总条数 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-row>
    </div>
    <div class="aside">
      <Correlation />
    </div>
  </div>
</template>

<script>
import Correlation from "@/components/post/correlation.vue";
import replyComments from "@/components/post/replyComments.vue";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Correlation,
    replyComments
  },
  data() {
    //这里存放数据
    return {
      replaynameVisible: false,
      replayname: "",
      fileList: [],
      postData: {
        account: { created_at: "" }
      },
      commentForm: {
        follow: null,
        content: "",
        pics: [],
        post: this.$route.query.id
      },

      dialogImageUrl: "",
      dialogVisible: false,
      postComment: [],
      pageIndex: 1, // 当前页数
      // 显示条数
      pageSize: 2,
      total: 0,
      pageIndex: 0,
      circleUrl: "../../_nuxt/static/images/1.jpeg"
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  filters: {
    //   毫秒转年月日
    time(time) {
      return new Date(time).toLocaleString();
    }
  },
  //方法集合
  methods: {
    tapClose() {
      this.replaynameVisible = false;
      this.commentForm.follow = null;
    },
    setReply(e) {
      this.replayname = e.account.nickname;
      this.commentForm.follow = e.id;
      this.replaynameVisible = true;
    },
    //   文件上传成功之后的钩子
    uploadSucess(response, file, fileList) {
      console.log(response);
      //   上传文件成功之后，需要将返回的临时 文件的全路径添加到pics属性中
      // this.commentForm=response
      this.commentForm.pics.push(response[0]);
    },
    //  设置文件上传时的token设置
    setToken() {
      return {
        Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
      };
    },
    // 切换条数时触发
    handleSizeChange(value) {
      this.pageSize = value;
      this.pageIndex = 0;
      this.getPostComment();
    },

    // 切换页数时触发
    handleCurrentChange(value) {
      this.pageIndex = value;
      this.getPostComment();
    },
    // 获取攻略详情
    getCorrelation() {
      this.$axios({
        url: "posts/",
        params: { id: this.$route.query.id }
      }).then(res => {
        // console.log(res);
        this.postData = res.data.data[0];
      });
    },
    // 获取评论
    getPostComment() {
      this.$axios({
        url: `posts/comments?post=${this.$route.query.id}&_start=${this.pageIndex}&_limit=${this.pageSize}`
      }).then(res => {
        this.postComment = res.data.data;
        this.total = res.data.total;
      });
    },
    // 新增评论
    addComment() {
      // console.log(this.commentForm);
      this.$axios({
        url: "comments",
        method: "POST",
        data: this.commentForm,
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        this.getPostComment();
        this.commentForm = {
          follow: null,
          content: "",
          pics: [],
          post: this.$route.query.id
        };
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getCorrelation();
    this.getPostComment();
  }
};
</script>
<style lang='less' scoped>
.contianer {
  width: 1000px;
  margin: 20px auto;
  display: flex;
  justify-content: space-around;
  .main {
    width: 700px;
    .detailContent {
      width: 100%;
      font-size: 16px;
      color: #666;
      line-height: 1.5;
    }
    .post-info {
      color: #999;
      padding: 20px;
      text-align: right;
    }
  }
  .aside {
    width: 28%;
    margin-top: 45px;
  }
  .title {
    padding: 25px 0;
    border-bottom: 1px solid #ddd;
  }
}
.good {
  padding: 50px 0 30px;
  > .el-row {
    display: flex;
    justify-content: center;
    > .el-col {
      display: flex;
      flex-direction: column;
      //  justify-content: center;
      align-items: center;
      > i {
        display: block;
        font-size: 28px;
        color: orange;
      }
      > span {
        margin-top: 5px;
        font-size: 14px;
        color: #999;
      }
    }
  }
}
.comment {
  h4 {
    margin-bottom: 10px;
  }
  .el-textarea {
    margin: 10px 0;
  }
  .upload {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    button {
      height: 30px;
    }
  }
}
.pComment {
  border: 1px solid #ddd;

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
  text-indent: 2em;
  margin: 15px 0;
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