<template>
  <div class="custom_warp">
    <tab>
      <tab-item v-for="(data, index) in tab" :key="index" :selected="index==0?true:false"
                @on-item-click="tabChange(data)">
        {{data.title}}
      </tab-item>
    </tab>
    <div style="height:calc(100vh - 140px);overflow:hidden;">
      <pull-to :top-load-method="refresh" @infinite-scroll="infinite" @top-state-change="stateChange">
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
        <!-- 面板列表 -->
        <panel :list="list" :type="list.type" @on-click-item="jump"></panel>
        <!-- 加载更多 -->
        <load-more :show-loading="infiniteLoading" :tip="infiniteTip" v-show="loadMore"></load-more>
      </pull-to>
    </div>
  </div>
</template>

<script type="es6">
  import PullTo from 'vue-pull-to'
  import {getCommon} from '@/api/api';

  export default {
    components: {PullTo},
    data() {
      return {
        loadMore: false,
        tab: [],
        list: [],
        infiniteLoading: true,
        infiniteTip: "正在加载",
        iconLink: '', //下拉刷新的状态
      }
    },
    created() {
      this.getData();
    },
    methods: {
      //pannel列表部分跳转
      jump(item) {
        this.$router.push(item.link);
      },
      //tab切换
      tabChange(data) {
        this.loadingAdd();
        this.getContent(data.url);
      },
      //tab加载
      getData() {
        let _this = this;
        getCommon("/" + _this.$route.params.url.replace(/-/g, "/")).then((res) => {
          let data = res.data.tabs.list;
          _this.tab = data;
          _this.getContent(data[0].url);
        }).catch(function (error) {
          _this.loadingRemove();
          _this.loadMore = false;
          _this.confirm("提示", error.message, "刷新试试", _this.reload);
        });
      },
      getContent(url) {
        let _this = this;
        getCommon(url).then((res) => {
          _this.list = res.data.data;
          if (res.data.data.length < 10) {
            _this.loadNoData_State();
          } else {
            _this.loadMore = true;
          }
          _this.$nextTick(() => {
            _this.loadingRemove();
          });
        }).catch(function (error) {
          _this.loadingRemove();
          _this.loadMore = false;
          _this.confirm("提示", error.message, "刷新试试", _this.reload);
        });
      },
      //加载后无数据状态
      loadNoData_State() {
        this.infiniteLoading = false;
        this.infiniteTip = "暂无更多";
      },
      //加载后有数据状态
      loadData_State() {
        this.infiniteLoading = true;
        this.infiniteTip = "正在加载";
      },
      //上拉操作
      infinite(loaded) {
        if (this.bottom >= 30) {
          this.loadNoData_State();
          return false;
        }
        let start = this.bottom + 1;
        for (let i = start; i < start + 10; i++) {
          this.ajaData(i);
        }
        this.bottom = this.bottom + 10;
        setTimeout(() => {
          //this.loadNoData_State();
        }, 600)
      },
      //下拉刷新
      refresh(loaded) {
        setTimeout(() => {
          this.loadData_State();
          this.getData();
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

  .overwrite-title-demo {
    margin-top: 5px;
  }
</style>
