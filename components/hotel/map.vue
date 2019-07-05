<!--  -->
<template>
  <div id="container"></div>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  mounted() {
    window.onLoad = function() {
      var map = new AMap.Map("container", {
        zoom:11,//级别
        center: [116.397428, 39.90923],//中心点坐标
        viewMode:'3D'//使用3D视图
    });
    };
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=305a2c7581b7d150071d4ca049b5b623&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>
<style lang='less' scoped>
#container {
  width: 700px;
  height: 400px;
}
</style>