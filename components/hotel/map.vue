<!--  -->
<template>
  <div class="map">
    <div id="container"></div>
    <el-card class="box-card" style="width:33%">
      <el-tabs v-model="mapDefault" @tab-click="handleClick">
        <el-tab-pane label="风景" name="scenicSpot">
          <el-row id="scenicSpot"></el-row>
        </el-tab-pane>
        <el-tab-pane label="交通" name="station">
          <el-row id="station"></el-row>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      map: null,
      // 地图搜索默认值
      mapDefault: "scenicSpot"
    };
  },
  props: {
    // 接收机票信息
    mapLocation: {
      type: Object,
      default: {}
    }
  },
  watch: {},
  methods: {
    // 切换地图
    handleClick(tab, event) {
      if (tab.name === "station") {
        let type = "公交车站;地铁站";
        this.loadmap(tab.name, type);
      }
    
    },
    loadmap(Default, type) {
      // 初始化地区
      this.map = new AMap.Map("container", {
        center: [this.mapLocation.longitude, this.mapLocation.latitude]
      });
      // 周边景点
      var placeSearch = new AMap.PlaceSearch({
        // city 指定搜索所在城市，支持传入格式有：城市名、citycode和adcode
        city: "南京",
        type: type || "风景名胜;风景名胜;寺庙道观",
        panel: Default, // 结果列表将在此容器中进行展示
        // pageSize: 3, // 单页显示结果条数
        // pageIndex: 1, // 页码
        citylimit: true, //是否强制限制在设置的城市内搜索
        map: this.map,
        autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
      });
      var cpoint = [this.mapLocation.longitude, this.mapLocation.latitude]; //中心点坐标
      placeSearch.searchNearBy("", cpoint, 600, function(status, result) {});
    }
  },
  mounted() {
    // 地图初始化
    window.onLoad = function() {
      var map = new AMap.Map("container", {
        zoom: 11, //级别
        viewMode: "3D" //使用3D视图
      });
      this.map = map;
    };
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=305a2c7581b7d150071d4ca049b5b623&callback=onLoad&plugin=AMap.PlaceSearch";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
    // 数据输出延迟
   var timer= setInterval(() => {
      if (this.mapLocation.latitude> 0) {
       // 定位
      this.loadmap(this.mapDefault);
         clearInterval(timer)
      }
    }, 500);
  }
};
</script>
<style lang='less' scoped>
#container {
  width: 700px;
  height: 400px;
}
.map {
  margin: 40px 0;
  display: flex;
}
#scenicSpot,#station {
  // position: fixed;
  background-color: white;
  max-height: 305px;
  overflow-y: auto;
  width: 100%;
  border-bottom: solid 1px silver;
}
</style>