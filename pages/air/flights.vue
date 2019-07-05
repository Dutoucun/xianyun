<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <!-- 传输数据及方法 -->
        <FlightsFilters :data="cacheFlightsData" @setDataList="setDataList" />

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班列表 -->
        <flightsItem v-for="(item, index) in dataList" :key="index" :data="item" />
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
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="flightsData.total"
          ></el-pagination>
        </el-row>
      </div>
      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside @getData="getData" />
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsFilters from "@/components/air/flightsFilters.vue";
import FlightsAside from "@/components/air/flightsAside.vue";

export default {
  data() {
    return {
      flightsData: {
        // 航班总数据
        flights: [],
        info: {},
        options: {}
      },

      cacheFlightsData: {
        // 缓存一份数据，只会修改一次
        flights: [],
        info: {},
        options: {}
      },
      dataList: [], // 航班列表数据，用于循环flightsItem组件，单独出来是因为要分页
      pageIndex: 1, // 当前页数
      pageSize: 5 // 显示条数
    };
  },

  methods: {
    // 获取航班总数据
    getData() {
      this.$axios({
        url: `airs`,
        params: this.$route.query // 来自URL的5个参数
      }).then(res => {
        this.flightsData = res.data;
        this.dataList = this.flightsData.flights;
        // 缓存一份新的列表数据数据，这个列表传给过滤器，不会被修改
        // 每次选择flightsData会被修改
        this.cacheFlightsData = { ...res.data };
        // 初始化显示数据
        this.setDataList();
      });
    },
    // 设置显示的数据
    setDataList(arr) {
      // 如果有新数据(过滤器传过来)，
      if (arr) {
        this.pageIndex = 1; //从第一页开始显示
        this.flightsData.flights = arr; //重新赋值要显示的数据
        this.flightsData.total = arr.length; //总条数
      }
      // 起始索引 （页码-1）*显示条数
      const start = (this.pageIndex - 1) * this.pageSize;
      // 截止索引 不包含 [)
      const end = start + this.pageSize;
      // 截取数据 example:0-5 0-10 5-10
      this.dataList = this.flightsData.flights.slice(start, end);
    },

    // 切换条数时触发
    handleSizeChange(value) {
      this.pageSize = value;
      this.pageIndex = 1;
      this.setDataList();
    },

    // 切换页数时触发
    handleCurrentChange(value) {
      this.pageIndex = value;
      this.setDataList();
    }
  },
  watch: {
    $route() {
      //  this.getData();
      console.log(this.getData());
    }
  },
  mounted() {
    this.getData();
  },
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  }
};
</script>
<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>