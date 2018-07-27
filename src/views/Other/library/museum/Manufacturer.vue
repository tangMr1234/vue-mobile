<template>
  <div class="custom_warp hidden">
    <x-header slot="header" :title="$route.name">
      <a slot="right" @click="show">
        <i class="iconfont icon-02sousuo" style="font-size:24px;"></i>
      </a>
    </x-header>
    <!-- 数据展示列表 -->
    <div class="wrapper" style="height: calc(100% - 96px);">
      <group :gutter="0">
        <cell v-for="(data, index) in ManuData.list" :key="index" @click.native="showPopupComment(data.id)"
              style="padding:20px 0;">
          <img slot="icon" :src="data.src" width="100" style="margin:0 20px;" alt="">
          <div slot="title" style="font-size:20px;">{{data.title}}</div>
          <div slot="inline-desc">{{data.desc}}</div>
        </cell>
      </group>
    </div>
    <!-- 筛选弹出层 -->
    <div v-transfer-dom>
      <popup v-model="popup_show" position="right" :width="popupWidth">
        <div style="height:100%;">
          <component slot="Popup" :url='"/" + $route.params.url.replace(/-/g, "/")+"/search"' :is="component"
                     @reset="submitLoad"></component>
        </div>
      </popup>
    </div>
  </div>
</template>

<script type="es6">
  import lwForm from '@/components/filter.vue'
  import {Popup} from 'vux';
  import {getCommon} from '@/api/api';

  export default {
    components: {Popup, lwForm},
    data() {
      return {
        component: "", //加载组件
        popupWidth: '87%', //弹出层的宽度设置
        popup_show: false, //筛选弹出窗
        ManuData: [], //列表数据
      }
    },
    methods: {
      //打开详情
      showPopupComment(id) {
        this.$router.push({
          path: '/mf_detail',
          query: {
            routeParams: id
          }
        });
      },
      //打开详情时调用子组件的方法
      show() {
        this.component = "lwForm";
        this.popup_show = true;
      },
      //弹出的子组件filter调用的父组件index的方法
      submitLoad() {
        this.popup_show = false;
        this.getManufacturer();
      },
      //加载数据
      getManufacturer() {
        let _this = this;
        getCommon("/" + _this.$route.params.url.replace(/-/g, "/")).then((res) => {
          _this.ManuData = res.data;
        }).catch(function (error) {
          _this.confirm("提示", error.message, "刷新试试", _this.reload); //使用main中的全局方法调用弹窗
        });
      }
    },
    mounted() {
      this.getManufacturer();
    },
    activated() {
      this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
    }
  }
</script>
