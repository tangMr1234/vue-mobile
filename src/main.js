import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from '@/router/index'
import {
  ConfirmPlugin,
  AlertPlugin,
  ToastPlugin,
  TransferDom,
  ViewBox,
  Flexbox,
  FlexboxItem,
  XTextarea,
  Tab,
  TabItem,
  LoadMore,
  Blur,
  FormPreview,
  Box,
  CellFormPreview,
  CellBox,
  XHeader,
  XImg,
  Divider,
  Tabbar,
  TabbarItem,
  Group,
  Cell,
  Panel,
  Badge,
  Marquee,
  MarqueeItem,
  XInput,
  XButton,
  Loading,
  base64
} from 'vux'
import utils from '@/utils/utils'
// import vuexStore from './vuex/store'

require('./assets/icon/iconfont');

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(ConfirmPlugin);
Vue.use(AlertPlugin);
Vue.use(ToastPlugin);
Vue.directive('transfer-dom', TransferDom);
Vue.component('view-box', ViewBox);
Vue.component('flexbox', Flexbox);
Vue.component('flexbox-item', FlexboxItem);
Vue.component('form-preview', FormPreview);
Vue.component('x-header', XHeader);
Vue.component('x-img', XImg);
Vue.component('divider', Divider);
Vue.component('tabbar', Tabbar);
Vue.component('tabbar-item', TabbarItem);
Vue.component('group', Group);
Vue.component('cell', Cell);
Vue.component('panel', Panel);
Vue.component('badge', Badge);
Vue.component('marquee', Marquee);
Vue.component('marquee-item', MarqueeItem);
Vue.component('x-input', XInput);
Vue.component('x-button', XButton);
Vue.component('blur', Blur);
Vue.component('load-more', LoadMore);
Vue.component('tab', Tab);
Vue.component('tab-item', TabItem);
Vue.component('cell-form-preview', CellFormPreview);
Vue.component('x-textarea', XTextarea);
Vue.component('cell-box', CellBox);
Vue.component('box', Box);
Vue.component('loading', Loading);

// FastClick.attach(document.body);

const store = new Vuex.Store({
  state: {
    edit_state: false,
    is_back_index: false
  },
});

store.registerModule('vux', {
  state: {
    isLoading: false,
    direction: 'forward',
    isLogin: false,
  },
  mutations: {
    updateLoadingStatus(state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection(state, payload) {
      state.direction = payload.direction
    },
    //全局设置是否登录的状态
    updateLoginStatus(state, payload) {
      state.isLogin = payload.isLogin
    }
  }
});

Vue.config.productionTip = false;

/* 注册全局方法，用来获取url传递的参数 */
Vue.prototype.$utils = utils;
/* 判断是否存在的全局方法 */
Vue.prototype.$is_exist = function (para) {
  return typeof(para) !== "undefined";
};
/* 开启loading的全局方法 */
Vue.prototype.loadingAdd = function () {
  store.commit('updateLoadingStatus', {isLoading: true})
};
/* 关闭loading的全局方法 */
Vue.prototype.loadingRemove = function () {
  store.commit('updateLoadingStatus', {isLoading: false})
};
/* 刷新页面的全局方法 */
Vue.prototype.reload = function () {
  window.location.reload();
};
/* 注册弹窗的全局方法 */
Vue.prototype.confirm = function (title, content, buttonText, Confirm, Cancel) {
  this.$vux.confirm.show({
    title: title,
    content: content,
    confirmText: buttonText,
    onConfirm() {
      if (Confirm && Confirm != "") {
        Confirm();
      }
    },
    onCancel() {
      if (Cancel && Cancel != "") {
        Cancel();
      }
    }
  })
};
/* 注册alert的全局方法 */
Vue.prototype.alert = function (title, content, buttonText, func) {
  this.$vux.alert.show({
    title: title,
    content: content,
    buttonText: buttonText,
    onHide() {
      if (func && func != "") {
        func();
      }
    }
  })
};
/* 注册toast的全局方法 */
Vue.prototype.toast = function (title, type, width, func) {
  this.$vux.toast.show({
    text: title,
    type: type,
    width: width,
    onHide() {
      if (func && func != "") {
        func();
      }
    }
  })
};

router.beforeEach(function (to, from, next) {
  /* 开启loading */
  store.commit('updateLoadingStatus', {isLoading: true});
  /* 路由切换时关闭弹窗 */
  const list = ['alert', 'confirm', 'toast', 'datetime'];
  list.forEach(one => {
    if (Vue.$vux[one]) {
      Vue.$vux[one].hide && Vue.$vux[one].hide()
    }
  });
  if (navigator.onLine) {
    /* 判断是否跳转到登陆页登录 */
    // let Menu = localStorage.getItem("MainMenu");
    next();
    // if (to.path === '/login') {
    //   setTimeout(() => {
    //     _this.getListIng();
    //   }, 5000);
    //   top.location.href = locationHref + "?back_url=" + base64.encode(top.location.href.split("#")[0] + '#/login?call_back=' + base64.encode(top.location.href));
    // } else {
    //   next();
    // }
  } else {
    store.commit('updateLoadingStatus', {isLoading: false});
    Vue.$vux.alert.show({
      title: "提示",
      content: "当前网络状态不佳，请稍后重试！",
      buttonText: "知道了"
    })
  }
});

router.afterEach(function (to) {

});

new Vue({
  store,
  // vuexStore,
  router,
  render: h => h(App)
}).$mount('#app-box');
