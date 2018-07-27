<template>
  <div class="custom_warp hidden">
    <x-header slot="header" :title="this.$route.name"></x-header>
    <!-- 面板 -->
    <div id="map" class="hidden" style="height:calc(100% - 46px);"></div>
  </div>
</template>

<script type="es6">
  import {XHeader} from 'vux'
  import {BDMap} from '@/utils/BDMap'

  export default {
    components: {
      XHeader
    },
    data() {
      return {}
    },
    methods: {
      loadMap() {
        // 通过utils里的BDMap.js调用百度地图API功能
        let mapUrl = [
          '//api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js',
          "//api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer_min.js"
        ];
        BDMap(mapUrl).then(BMap => {
          var map = new BMap.Map("map");
          map.centerAndZoom(new BMap.Point(116.404, 39.915), 5);
          map.enableScrollWheelZoom();

          var MAX = 10;
          var markers = [];
          var pt = null;
          for (var i = 0; i < MAX; i++) {
            pt = new BMap.Point(Math.random() * 40 + 85, Math.random() * 30 + 21);
            markers.push(new BMap.Marker(pt));
          }
          //最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
          var markerClusterer = new BMapLib.MarkerClusterer(map, {markers: markers});
        })
        //关闭页面跳转时的加载中动画
        this.loadingRemove();
      }
    },
    mounted() {
      //加载地图
      this.loadMap();
    }
  }
</script>
