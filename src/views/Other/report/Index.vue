<template>
  <div class="custom_warp hidden">
    <x-header slot="header" :title="this.$route.name"
              @on-click-back="goBack" :left-options="{preventGoBack: false}"></x-header>
    <!-- 面板 -->
    <b-scroll class="wrapper" style="height:calc(100% - 46px);overflow-x:hidden;background:#eee;">
      <div class="content" style="width:92%;margin:0 auto;padding-bottom:10px;min-height:calc( 100% - 9px)">
        <!-- 数据出错时的加载按钮 -->
        <div class="refer_button" @click="getIndexData" v-show="load_Button"><i
          class="iconfont icon-shuaxin1"> 点击刷新</i></div>
        <!-- 数据展示 -->
        <group :gutter="10" style="box-shadow: 0 0 5px #ddd;" v-for="(data, index) in data" :key="index"
               @click.native="goList(data)">
          <cell>
            <div slot="title" style="padding: 10px 0;">
              <b style="font-size:18px;color:#333;">{{data.title}}</b>
              <div style="color:#999;margin-top:8px;">
                <p style="margin-bottom:8px;">{{data.comment}}</p>
              </div>
            </div>
            <div>
              <img :src="data.src" style="width:60px;" alt="">
            </div>
          </cell>
        </group>
      </div>
    </b-scroll>
  </div>
</template>

<script type="es6">
  import {getReportIndexData} from '@/api/api';

  export default {
    data() {
      return {
        data: [], //数据
        load_Button: false,
      }
    },
    methods: {
      //设置sessionstorage来打开warn弹窗
      setSession() {
        sessionStorage.setItem('warn', 'yes');
      },
      //  通过postMessage调用iframe父组件的方法
      goBack() {
        let link = parent.window.location.href.split("#");
        window.parent.postMessage('closeLwFrame', link[0]);
      },
      //  打开列表页
      goList(data) {
        this.$router.push({
          path: data.link,
          query: {
            id: data.id,
            title: data.title
          }
        });
      },
      //警告弹窗取消之后出现刷新按钮
      onCancel() {
        this.load_Button = true;
      },
      //远程加载首页数据
      getIndexData() {
        let _this = this;
        _this.load_Button = false;
        getReportIndexData().then((res) => {
          _this.data = res.data;
          if (!sessionStorage.getItem('warn')) {
            _this.alert("提示", "试用应用的演示数据，仅供APP体验，试用期间该弹窗可暂时关闭！", "知道了", this.setSession); //使用main中的全局方法调用弹窗
          }
          _this.loadingRemove();
        }).catch(function (error) {
          _this.confirm("提示", error.message, "刷新试试", _this.reload, _this.onCancel); //使用main中的全局方法调用弹窗
          _this.loadingRemove();
        });
      }
    },
    created() {
      this.getIndexData();
    },
    activated() {
      this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
    }
  }
</script>
