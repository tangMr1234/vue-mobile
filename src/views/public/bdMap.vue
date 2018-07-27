<template>
  <div style="height: calc(100vh - 46px);">
    <!-- 数据出错时的加载按钮 -->
    <div class="refer_button" @click="getData()" v-show="load_Button">
      <i class="iconfont icon-shuaxin1"> 点击刷新</i>
    </div>
    <!-- 地图 -->
    <components :is="component" :data="MapData" @marker_click="loadInfo"></components>
  </div>
</template>

<script type="es6">
  import BdMap from '@/components/bdMap'
  import {getCommon} from '@/api/api'

  export default {
    components: {BdMap},
    data() {
      return {
        is_done: false,  //配合keep-alive判断是否是首次加载
        load_Button: false,
        component: null, //为了能使地图正确得到数据使用动态组件的方法
        MapData: {}, //地图数据
      }
    },
    methods: {
      //警告弹窗取消之后出现刷新按钮
      onCancel() {
        this.load_Button = true;
      },
      //点击地图标注加载地图右侧信息（组件地图的“标注”点击后调用该方法）
      loadInfo(name, url) {
        console.log(name);
      },
      getData() {
        let _this = this;
        _this.load_Button = false;
        getCommon("/" + _this.$route.params.url.replace(/-/g, "/")).then((res) => {
          _this.MapData = res.data;
          _this.component = "BdMap";
          _this.$nextTick(() => {
            _this.loadingRemove();
            _this.is_done = true;
          });
        }).catch(function (error) {
          _this.is_done = true;
          _this.loadingRemove();
          _this.confirm("提示", error.message, "刷新试试", _this.reload, _this.onCancel); //使用main中的全局方法调用弹窗
        });
      }
    },
    created() {
      this.getData();
    }
  }
</script>

<style scoped rel="stylesheet/less" lang="less">
  #lw-map {
    width: 100%;
    height: 100%;
    margin: 0;
    font-family: "微软雅黑";
  }
</style>
