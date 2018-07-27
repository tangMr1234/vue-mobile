<template>
  <div class="custom_warp hidden">
    <x-header slot="header" :left-options="{preventGoBack:true}" @on-click-back="goBack">{{header}}</x-header>
    <div style="height:calc(100% - 46px);padding-bottom:10px;" class="hidden-x">
      <group :gutter="10">
        <cell v-for="(data, index) in data"
              :key="index"
              :link="data.link">
          <div slot="title" style="font-size:16px;">{{data.label}}</div>
          <div slot="inline-desc" style="margin-top:10px;">
            <div v-for="(item, index) in data.list" :key="index" v-html="item"></div>
          </div>
        </cell>
      </group>
    </div>
  </div>
</template>

<script type="es6">
  import {getCommon} from '@/api/api';

  export default {
    components: {
      ScrollPosition: resolve => {
        require(['@/components/scrollPosition.vue'], resolve)
      }
    },
    data() {
      return {
        data: [],
        header: null,
      }
    },
    methods: {
      //返回上一页
      goBack() {
        this.scrollTop = 0;
        this.$router.back(-1);
      },
      //加载数据
      getData() {
        let _this = this;
        _this.data = [];
        getCommon("/" + _this.$route.params.url.replace(/-/g, "/")).then((res) => {
          _this.data = res.data.list;
          _this.header = res.data.header;
          _this.loadingRemove();
        }).catch(function (error) {
          _this.loadingRemove();
          _this.confirm("提示", error.message, "刷新试试", _this.reload, _this.onCancel); //使用main中的全局方法调用弹窗
        });
      },
    },
    created() {
      this.getData();
    }
  }
</script>
