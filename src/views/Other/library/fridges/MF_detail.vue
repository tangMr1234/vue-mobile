<template>
  <div class="details custom_warp">
    <!-- 头部 -->
    <x-header :title="this.$route.name"></x-header>
    <!-- 主体 -->
    <b-scroll class="wrapper" style="height:calc(100% - 46px);">
      <div class="content">
        <!-- 数据出错时的加载按钮 -->
        <div class="refer_button" @click="getDetailData" v-show="load_Button"><i
          class="iconfont icon-shuaxin1"> 点击刷新</i></div>
        <!-- 顶部图文标题 -->
        <div style="padding:20px 10px">
          <flexbox>
            <flexbox-item :span="2/5"><img :src="detail_Data.src" alt="" style="width:100%;">
            </flexbox-item>
            <flexbox-item :span="3/5">
              <h2 style="font-size:28px;" v-html="detail_Data.label"></h2>
            </flexbox-item>
          </flexbox>
        </div>
        <div class="card-padding">
          <p v-html="detail_Data.content"></p>
        </div>
        <!-- 生产疫苗种类 -->
        <divider>{{detail_Data.divider}}</divider>
        <group :gutter="0">
          <cell v-for="(data, index) in detail_Data.list" :key="index" :title="data.label"
                :link="'fridges_detail?id='+data.id"></cell>
        </group>
      </div>
    </b-scroll>
  </div>
</template>

<script type="es6">
  import {getManuDetailData} from '@/api/api';

  export default {
    data() {
      return {
        load_Button: false,
        detail_Data: {}, //页面数据
      }
    },
    methods: {
      //关闭数据加载失败的弹窗后显示刷新按钮
      onCancel() {
        this.load_Button = true;
      },
      //数据加载
      getDetailData() {
        let _this = this;
        _this.load_Button = false;
        getManuDetailData(this.$route.query.routeParams).then((res) => {
          _this.detail_Data = res.data;
          _this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
        }).catch(function (error) {
          _this.confirm("提示", error.message, "刷新试试", _this.reload, _this.onCancel); //使用main中的全局方法调用弹窗
          _this.loadingRemove();  // 使用MAIN中的全局方法关闭LOADING
        });
      }
    },
    mounted() {
      this.getDetailData();
    }
  }
</script>

<style scoped lang="less">
  .card-padding {
    padding: 15px;
  }
</style>
