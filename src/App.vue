<template>
  <div id="app" class="custom_warp">
    <router-view class="router-view"></router-view>
    <loading :show="isLoading"></loading>
  </div>
</template>

<script type="es6">
  import {mapState} from 'vuex'

  export default {
    name: 'app',
    data() {
      return {}
    },
    computed: {
      ...mapState({
        isLoading: state => state.vux.isLoading
      })
    },
    methods: {
      is_online(e) {
        this.loadingRemove();
        this.alert("提示", "当前网络状态不佳，请稍后重试！", "知道了");
      }
    },
    mounted() {
      window.addEventListener('offline', this.is_online);
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/tap.less';
  @import './style/pub.css';

  /* 自定义的lw-badge样式 */
  .lw-badge-primary {
    color: #fff;
    background-color: #007bff !important;
  }

  .lw-badge-secondary {
    color: #fff;
    background-color: #6c757d !important;
  }

  .lw-badge-success {
    color: #fff;
    background-color: #28a745 !important;
  }

  .lw-badge-danger {
    color: #fff;
    background-color: #dc3545 !important;
  }

  .lw-badge-warning {
    color: #212529 !important;
    background-color: #ffc107 !important;
  }

  .lw-badge-info {
    color: #fff;
    background-color: #17a2b8 !important;
  }

  .lw-badge-light {
    color: #212529 !important;
    background-color: #f8f9fa !important;;
  }

  .lw-badge-dark {
    color: #fff;
    background-color: #343a40 !important;
  }

  .lw-badge {
    display: inline-block;
    padding: .25em .4em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: .25rem;
  }

  .lw-badge-pill {
    padding-right: .6em;
    padding-left: .6em;
    border-radius: 10rem;
  }
</style>
