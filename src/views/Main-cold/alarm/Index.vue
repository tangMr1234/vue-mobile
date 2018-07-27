<template>
  <div class="custom_warp hidden">
    <x-header slot="header" :title="$route.name" :left-options="{preventGoBack:true}" @on-click-back="goBack()">
      <a slot="right" @click="showFilter">
        <i class="iconfont icon-02sousuo" style="font-size:24px;"></i>
      </a>
    </x-header>
    <div style="height:calc(100% - 46px);position: relative;">
      <!-- 数据总计结果 -->
      <group :gutter="0">
        <cell :title="info" :value="total"></cell>
      </group>
      <!-- 数据展示列表 -->
      <div style="height:calc(100% - 39px);overflow:hidden;background: #fff;"
           v-if="AlarmIndexData&&AlarmIndexData!=''">
        <pull-to :top-load-method="refresh" @infinite-scroll="loadmore" @top-state-change="stateChange" ref="scroll">
          <!-- 下拉刷新 -->
          <template slot="top-block" slot-scope="props">
            <div class="top-load-wrapper">
              <svg class="icon"
                   :class="{
      'icon-arrow': props.state === 'trigger',
      'icon-loading': props.state === 'loading'
      }"
                   aria-hidden="true">
                <use :xlink:href="iconLink"></use>
              </svg>
              {{ props.stateText }}
            </div>
          </template>
          <!-- 数据展示 -->
          <new-pannel :list="AlarmIndexData" :type="type"
                      @on-click-item="showPopupComment"></new-pannel>
          <!-- 加载更多 -->
          <load-more :show-loading="infiniteLoading" :tip="infiniteTip" @click.native="load_again"
                     :class="infiniteTipError?'loadError':''"></load-more>
        </pull-to>
      </div>
      <!-- 自定义数据加载&&筛选后loading -->
      <new-loading v-show="isLoading" style="position:absolute;top:0;z-index:499;"></new-loading>
    </div>
    <!-- 筛选弹出层 -->
    <div v-transfer-dom>
      <popup v-model="filter_show" position="right" :width="popupWidth" @on-hide="pop_hide">
        <component :is="filter_component" :url='"/" + $route.params.url.replace(/-/g, "/")+"/search"'
                   @reset="showFilter" @ievent="ievent" ref="filter"></component>
      </popup>
    </div>
  </div>
</template>

<script type="es6">
  import {Popup} from 'vux'
  import PullTo from 'vue-pull-to'
  import NewFilter from '@/components/filter.vue';
  import NewPannel from '@/components/pannel.vue';
  import NewLoading from '@/components/loading';
  import {getAlarmIndexData} from '@/api/api';

  export default {
    components: {
      PullTo,
      Popup,
      NewFilter,
      NewLoading,
      NewPannel
    },
    data() {
      return {
        is_done: false,  //配合keep-alive判断是否是首次加载
        type: '5',
        isLoading: false, //自定义数据加载中
        filter_component: null, //加载的筛选组件
        filter_show: false, //弹出筛选的显示隐藏
        popupWidth: '87%', //弹出层的宽度设置
        info: "", //统计&&提示
        total: "",
        AlarmIndexData: [], //数据
        param: {
          data: "",
          page: 1
        }, //请求时传递的页数和搜索筛选的数据
        current_page: 1,//当前页数
        infiniteLoading: true,
        infiniteTip: "正在加载",
        infiniteTipError: false,
        iconLink: '', //下拉刷新的状态
        load_bottom: true, //判断数据是否到底部
        scrollPosition: 0,  //记录滚动条的位置
        is_goback: false, //判断是否点击的返回退出以后再进来的页面
      }
    },
    methods: {
      goBack() {
        this.is_goback = true;
        this.scrollPosition = 0;
        document.querySelector('.scroll-container').scrollTo(0, 0);
        this.param = {
          data: "",
          page: 1
        };
        this.$router.back(-1);
      },
      //设置sessionstorage来打开warn弹窗
      setSession() {
        sessionStorage.setItem('warn', 'yes');
      },
      //打开筛选,加载组件
      showFilter() {
        this.filter_component = "NewFilter";
        this.filter_show = !this.filter_show;
      },
      //关闭筛选弹出层后回调，为了保持筛选页面之前填写的数据不变
      pop_hide() {
        this.$refs.filter.onhide();
      },
      //获取筛选页面点击确定按钮后传递的值
      ievent(data) {
        document.querySelector('.scroll-container').scrollTo(0, 0);
        this.more_load_public();
        this.isLoading = true;
        if (data && data != "" && data != null) {
          this.param.page = 1;
          this.param.data = JSON.stringify(data);
          this.getIndexData(this.param);
        } else {
          this.confirm("提示", "获取筛选条件异常！", "立即刷新", this.reload); //使用main中的全局方法调用弹窗
        }
      },
      //弹出的子组件filter调用的父组件index的方法
      submitLoad() {
        this.getIndexData();
        this.showFilter();
      },
      //打开详情
      showPopupComment(item) {
        this.scrollPosition = document.querySelector('.scroll-container').scrollTop;
        this.$router.push(item.link);
      },
      //上拉加载中的公用部分
      more_load_public() {
        this.load_bottom = true;
        this.infiniteLoading = true;
        this.infiniteTip = "正在加载";
      },
      //上拉加载到底的公用部分
      more_done_public() {
        this.load_bottom = false;
        this.infiniteLoading = false;
        this.infiniteTip = "已经到底啦";
      },
      //上拉操作
      loadmore(loaded) {
        if (this.load_bottom) {
          this.param.page = this.current_page;
          this.getIndexData(this.param);
        }
      },
      //下拉刷新
      refresh(loaded) {
        this.param.page = 1;
        this.getIndexData(this.param);
        setTimeout(() => {
          this.more_load_public();
          loaded('done');
        }, 300);
      },
      //下拉时的顶部状态改变
      stateChange(state) {
        if (state === 'pull' || state === 'trigger') {
          this.iconLink = '#icon-arrow-bottom';
        } else if (state === 'loading') {
          this.iconLink = '#icon-loading';
        } else if (state === 'loaded-done') {
          this.iconLink = '#icon-finish';
        }
      },
      //加载失败时的点击事件
      load_again() {
        if (this.infiniteTipError && !this.infiniteLoading) {
          this.getIndexData(this.param);
        }
      },
      //加载数据
      getIndexData(params) {
        let _this = this;
        getAlarmIndexData(params).then((res) => {
          _this.info = res.data.info;
          //判断条数&&判断是否存在数据
          if (res.data.list && res.data.list.length > 0) {
            //以等于1来判断是否下拉刷新or筛选搜索数据
            if (params.page == 1) {
              _this.AlarmIndexData = res.data.list;
            } else {
              _this.AlarmIndexData = _this.AlarmIndexData.concat(res.data.list);
            }
            //赋值下一页页码
            _this.current_page = parseInt(res.data.page.current_page) + 1;
            //赋值当前页数
            _this.total = "第" + res.data.page.current_page + "页";
            //判断条数来判断是否已经到底部
            if (res.data.list.length < res.data.page.page_size) {
              _this.more_done_public();
            }
          } else {
            _this.total = "";
            _this.AlarmIndexData = [];
            _this.more_done_public();
          }
          //各种弹出窗的提示
          if (res.data.alert) {
            if (!sessionStorage.getItem('warn')) {
              _this.alert(res.data.alert.head, res.data.alert.content, res.data.alert.foot, this.setSession); //使用main中的全局方法调用弹窗
            }
          }
          _this.isLoading = false;
          _this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
          _this.is_done = true;
          _this.infiniteTipError = false;
        }).catch(function (error) {
          _this.is_done = true;
          _this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
          _this.isLoading = false;
          _this.infiniteTip = "加载失败,点击重试";
          _this.infiniteLoading = false;
          _this.infiniteTipError = true;
        });
      }
    },
    created() {
      this.getIndexData(this.param);
    },
    activated() {
      if (this.is_done) {
        if (this.is_goback) {
          this.param = {
            data: "",
            page: 1
          };
          this.getIndexData(this.param);
          this.is_goback = false;
        } else {
          if (this.scrollPosition > 0) {
            document.querySelector('.scroll-container').scrollTo(0, this.scrollPosition);
            this.scrollPosition = 0;
          }
          this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
        }
        if (this.$store.state.edit_state) {
          this.param = {
            data: "",
            page: 1
          };
          this.getIndexData(this.param);
          this.$store.state.edit_state = false;
        }
      }
    }
  }
</script>

<style scoped rel="stylesheet/less" lang="less">
  .icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  .top-load-wrapper {
    line-height: 50px;
    text-align: center;
  }

  .icon-arrow {
    transition: .2s;
    transform: rotate(180deg);
  }

  .icon-loading {
    transform: rotate(0deg);
    animation-name: loading;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
  }

  @keyframes loading {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  img {
    width: 100%;
  }
</style>

<style>
  .loadError .weui-loadmore__tips {
    color: #409eff !important;
  }
</style>
