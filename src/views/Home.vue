<template>
  <div class="custom_warp" v-cloak>
    <view-box ref="viewBox"
              :body-padding-bottom="$route.meta.tabbar?'':'0'"
              :body-padding-top="$is_exist($route.meta.header) ? $route.meta.header ? '46px':'0':'0'">
      <!-- 导航：头部 -->
      <x-header slot="header"
                v-if="$is_exist($route.meta.header) ? $route.meta.header:''"
                :title="$route.meta.name"
                :left-options="{showBack: $is_exist($route.meta.headBack) ? $route.meta.headBack:true, preventGoBack:true}"
                @on-click-back="goBack" style="width:100%;position:fixed;left:0;top:0;z-index:100;">
        <!-- 是否有筛选项目 -->
        <a slot="right"
           v-if="$is_exist($route.meta.headFilter) ? $route.meta.headFilter:false"
           @click="is_filter">
          <i class="iconfont icon-sousuo" style="font-size:20px;"></i>
          <small style="vertical-align: top;">筛选</small>
        </a>
      </x-header>
      <!-- 视图部分 -->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      <!-- 导航：底栏菜单 -->
      <tabbar slot="bottom" v-if="MainMenu && MainMenu!='' && $route.meta.tabbar"
              style="position:fixed;bottom:0;left:0;width:100%;z-index:100;">
        <tabbar-item v-for="(item,index) in MainMenu"
                     :key="index"
                     :link="item.link"
                     :badge="(item.badge&&item.badge!='') ? badge:''"
                     :show-dot="item.showDot"
                     :selected="active() === item.link">
          <i :class="'iconfont'+' '+item.icon" slot="icon"></i>
          <span slot="label">{{item.name}}</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script type="es6">
  import {mapState} from 'vuex'
  import {getMenu, getMessageCount} from '@/api/api';

  export default {
    data() {
      return {
        badge: "", //底栏消息展示
        MainMenu: [], //菜单数据
      }
    },
    computed: {
      ...mapState({
        isLogin: state => state.vux.isLogin
      })
    },
    methods: {
      //设置底栏高亮项
      active() {
        return this.$route.path;
      },
      goBack() {
        if (window.history.length > 0) {
          this.$router.go(-1);
        } else {
          this.$router.push('/');
        }
      },
      //  获取消息数量
      getMessageCounts() {
        let _this = this;
        let old_count = localStorage.getItem("OldMessageCounts");
        getMessageCount().then((res) => {
          let badges = res.data.message_count;
          if (badges > 0 && _this.$route.path != "login") {
            //首次加载时弹窗
            if (!sessionStorage.getItem("first") || sessionStorage.getItem("first") == "") {
              _this.toast("您有" + parseInt(badges) + "条消息，请及时查看！", "text", "20em");
              sessionStorage.setItem("first", "1");
            }
            //判断获取新消息条数
            _this.badge = badges.toString(); //int型转换成string
            if (old_count && old_count != "" && badges > old_count) {
              _this.toast("您有" + (parseInt(badges) - parseInt(old_count)) + "条新的消息，请及时查看！", "text", "20em");
            }
          } else {
            _this.badge = ""; //当为0时设置字段为空
          }
          //将获取到的消息存入localStorage
          localStorage.setItem("OldMessageCounts", badges);
        });
      },
      //  获取tabbar菜单
      getMenuData() {
        let _this = this;
        getMenu().then((res) => {
          _this.MainMenu = res.data;
        }).catch(function (error) {
          _this.confirm("提示", "Menu获取失败", "重新登录"); //使用main中的全局方法调用弹窗
        });
      }
    },
    created() {
      this.getMenuData();
    },
    mounted() {
      let _this = this;
      //加载消息数量
      _this.getMessageCounts();
      //使用定时器加载消息数量
      window.timer = setInterval(function () {
        _this.getMessageCounts();
      }, 60000);
    },
    destroyed() {
      //判断当前不是登录状态时清除定时器
      if (this.isLogin === false) {
        window.clearInterval(window.timer);
      }
    }
  }
</script>
