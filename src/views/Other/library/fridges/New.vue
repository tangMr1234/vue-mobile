<template>
  <div class="custom_warp hidden">
    <x-header slot="header" :title="this.$route.name"></x-header>
    <!-- 数据展示列表 -->
    <b-scroll class="wrapper" :data="new_data" style="height: calc(100% - 46px);">
      <div class="content">
        <!-- 数据出错时的加载按钮 -->
        <div class="refer_button" @click="getNewData" v-show="load_Button"><i
          class="iconfont icon-shuaxin1"> 点击刷新</i></div>
        <!-- 列表 -->
        <div style="margin: 10px;overflow: hidden;" v-for="(item, index) in new_data" :key="index">
          <masker style="border-radius: 2px;" @click.native="showPopupComment(item.id)">
            <div class="m-img" :style="{backgroundImage: 'url(' + item.img + ')'}"></div>
            <div slot="content" class="m-title">
              {{item.title}}
              <br/>
              <span class="m-time">{{item.time}}</span>
            </div>
          </masker>
        </div>
      </div>
    </b-scroll>
  </div>
</template>

<script type="es6">
  import {getNewData} from '@/api/api';

  export default {
    data() {
      return {
        load_Button: false,
        new_data: [],
      }
    },
    methods: {
      //打开详情
      showPopupComment(id) {
        this.$router.push({
          path: 'new_detail',
          query: {
            routeParams: id
          }
        });
      },
      //关闭数据加载失败的弹窗后显示刷新按钮
      onCancel() {
        this.load_Button = true;
      },
      //获取数据
      getNewData() {
        let _this = this;
        _this.load_Button = false;
        getNewData().then((res) => {
          _this.new_data = res.data;
        }).catch(function (error) {
          _this.confirm("提示", error.message, "刷新试试", _this.reload, _this.onCancel); //使用main中的全局方法调用弹窗
        });
      }
    },
    mounted() {
      this.getNewData();
    },
    activated() {
      this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
    }
  }
</script>

<style scoped rel="stylesheet/less" lang="less">
  img {
    width: 100%;
  }
</style>
<style lang="less">
  .m-img {
    padding-bottom: 33%;
    display: block;
    position: relative;
    max-width: 100%;
    background-size: cover;
    background-position: center center;
    cursor: pointer;
    border-radius: 2px;
  }

  .m-title {
    color: #fff;
    text-align: center;
    text-shadow: 0 0 2px rgba(0, 0, 0, .5);
    font-weight: 500;
    font-size: 16px;
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
  }

  .m-time {
    font-size: 12px;
    padding-top: 4px;
    border-top: 1px solid #f0f0f0;
    display: inline-block;
    margin-top: 5px;
  }
</style>
