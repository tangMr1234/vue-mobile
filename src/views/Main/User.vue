<template>
  <div class="custom_warp hidden-x">
    <!-- 数据出错时的加载按钮 -->
    <div class="refer_button" @click="getData" v-show="load_Button">
      <i class="iconfont icon-shuaxin1"> 点击刷新</i>
    </div>
    <div v-if="userData">
      <!-- 模糊背景图 -->
      <div v-if="userData.header"
           :style="'background:url('+ userData.header.background +');background-size:100% 100%;width:100%;padding: 20px 0;'">
        <p class="center"><img :src="userData.header.avatar"></p>
        <p class="center" v-html="userData.header.title"></p>
      </div>
      <!-- 列表 -->
      <group v-if="userData.info">
        <cell v-for="(data, index) in userData.info"
              :key="index"
              :title="data.label"
              :is-link="data.is_link"
              :link="data.link"
              :value="data.value">
          <div :style="'color:'+ data.icon_color" slot="icon">
            <i class="iconfont" :class="data.icon" style="display:block;font-size: 26px;margin-right:5px;"></i>
          </div>
        </cell>
      </group>
      <!-- 退出登录按钮 -->
      <group :style="'opacity:'+ is_show">
        <cell title="退出登录" @click.native="logOut">
          <i slot="icon" class="iconfont icon-dengchu"
             style="display:block;font-size: 22px;margin:0 5px 0 3px;color:#409eff;"></i>
        </cell>
      </group>
      <br>
    </div>
  </div>
</template>

<script type="es6">
  import {base64} from 'vux'
  import {getCommon} from '@/api/api';

  export default {
    data() {
      return {
        is_done: false,  //配合keep-alive判断是否是首次加载
        load_Button: false,
        is_show: "0", //判断是否加载完成而显示页面
        userData: [], //数据
      }
    },
    methods: {
      //登出的跳转事件
      onHide() {
        window.location.href = locationHref + "?back_url=" + base64.encode(top.location.href.split("#")[0] + '#/login');
      },
      //登出
      logOut() {
        sessionStorage.clear();
        localStorage.clear();
        this.alert("提示", "退出成功，正在跳转！", "知道了", this.onHide); //使用main中的全局方法调用弹窗
        setTimeout(() => {
          this.$vux.alert.hide();
          this.onHide();
        }, 1000);
      },
      //警告弹窗取消之后出现刷新按钮
      onCancel() {
        this.load_Button = true;
      },
      // 加载完成后，成功失败要执行的
      LoadResult() {
        this.loadingRemove();
        this.is_done = true;
        this.is_show = "1"; //等待页面加载完毕显示登出按钮
      },
      //获取我的页面数据
      getData() {
        let _this = this;
        _this.load_Button = false;
        getCommon("/" + _this.$route.params.url.replace(/-/g, "/")).then((res) => {
          _this.userData = res.data;
          _this.$nextTick(() => {
            _this.LoadResult();
          });
        }).catch(function (error) {
          _this.LoadResult();
          _this.alert("提示", error.message, "知道了"); //使用main中的全局方法调用弹窗
        });
      },
    },
    created() {
      this.getData();
    },
    activated() {
      if (this.is_done) {
        this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
      }
    }
  }
</script>

<style scoped>
  .center {
    text-align: center;
    padding-top: 20px;
    color: #fff;
  }

  .center img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 4px solid #ececec;
  }
</style>
