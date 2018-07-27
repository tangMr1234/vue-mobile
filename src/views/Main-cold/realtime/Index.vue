<template>
  <div class="custom_warp hidden">
    <x-header :title="this.$route.name" :left-options="{preventGoBack:true}" @on-click-back="goBack()">
      <a slot="right" @click="showFilter">
        <i class="iconfont icon-02sousuo" style="font-size:24px;"></i>
      </a>
    </x-header>
    <!-- 数据出错时的加载按钮 -->
    <div v-if="!TableData || TableData==''">
      <!-- 暂无数据的显示 -->
      <div v-show="is_Nodata">
        <img src="@/assets/no-data.png" class="no_data" alt="">
      </div>
    </div>
    <!-- 数据展示 -->
    <div style="position:relative;height:calc(100vh - 46px);" v-else>
      <!-- 顶部统计结果 -->
      <group gutter="0">
        <x-switch :title="total" :value="is_list" @on-change="list_Change" class="text-ellipsis"></x-switch>
      </group>
      <!-- 数据可滚动部分 -->
      <div style="height:calc(100% - 44px);overflow: hidden;">
        <pull-to :top-load-method="refresh" @infinite-scroll="loadmore" @top-state-change="stateChange">
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
          <!-- 数据列表 -->
          <div v-for="(item, index) in TableData" :key="index">
            <!-- 区县单位结果 -->
            <sticky>
              <div class="vux-1px-t vux-1px-b color_blue" style="background:#fff; padding:10px;margin-top:20px;">
                <span v-if="item.region.city">{{item.region.city}}</span>
                <span>
                  <i v-if="item.region.area" class="iconfont icon-youjiantou" style="font-size:12px;color:#999;"></i>{{item.region.area}}
                </span>
                <span>
                  <i v-if="item.region.unit" class="iconfont icon-youjiantou" style="font-size:12px;color:#999;">{{item.region.unit}}</i>
                </span>
              </div>
            </sticky>
            <!-- 数据列表型展示 -->
            <group class="TableBorderNone"
                   :label-width="(!is_list)?'':'8em'"
                   v-for="(item, index) in item.cooler" :key="index">
              <group-title slot="title">{{item.title}}
                <span v-if="item.status!=='正常'"
                      :style="'float:right;padding:0 5px;background:'+coolers_color+';border-radius:5px;color:#fff;'">{{item.status}}
                </span>
                <span v-else style="float:right;padding:0 5px;">{{item.status}}</span>
              </group-title>
              <!-- 列表 -->
              <cell primary="content" @click.native="showComment(item.id)">
                <!-- 冰箱图片 -->
                <img slot="title" v-show="is_list" :src="item.img" alt="">
                <!-- 温湿度数据 -->
                <div v-for="(data, index) in item.sensors" :key="index"
                     :class="index!=0?'vux-1px-t':''" style="padding:10px 0;">
                  <div>
                    <!-- 探头名 -->
                    <span style="color:#333;float:left;">{{data.sensor}}</span>
                    <!-- 温度 -->
                    <div style="color:#333;">
                      <!-- 判断当前状态为不正常 -->
                      <div v-if="data.status!=='正常'&&temp_bgColor[data.status]">
                        <span :style="'color:'+ temp_bgColor[data.status]">{{data.temp}} ℃</span>
                        <badge :text="data.status" :style="'background:'+ temp_bgColor[data.status]"></badge>
                      </div>
                      <!-- 判断当前状态正常 -->
                      <div v-else>{{data.temp}} ℃</div>
                    </div>
                  </div>
                  <div v-show="is_list" style="margin-top:8px;">
                    <!-- 湿度 -->
                    <span style="float:left;">{{data.humi}} %RH</span>
                    <!-- 时间 -->
                    <span>{{data.refresh_time}}</span>
                  </div>
                </div>
              </cell>
            </group>
          </div>
          <!-- 加载更多 -->
          <load-more :show-loading="infiniteLoading" :tip="infiniteTip"></load-more>
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
  import {Popup, GroupTitle, Sticky, XSwitch} from 'vux'
  import SFilter from '@/components/filter';
  import NewLoading from '@/components/loading';
  import PullTo from 'vue-pull-to'
  import {getRealtimeIndex} from '@/api/api';

  export default {
    components: {
      PullTo,
      Popup,
      GroupTitle,
      Sticky,
      XSwitch,
      SFilter,
      NewLoading
    },
    data() {
      return {
        is_done: false,  //配合keep-alive判断是否是首次加载
        is_Nodata: false, //没有数据时加载
        filter_show: false, //弹出层的显示隐藏
        isLoading: false, //自定义数据加载中
        filter_component: null, //加载的筛选组件
        total: "",  //统计结果
        is_list: localStorage.getItem("realtime_islist") === "true" ? true : false, //列表切换
        TableData: [], //上拉加载的数据绑定
        temp_bgColor: [], //状态的背景颜色
        coolers_color: null, //冰箱非正常的背景
        popupWidth: '87%', //弹出层的宽度设置
        infiniteLoading: true,
        infiniteTip: "正在加载",
        iconLink: '', //下拉刷新的状态
      }
    },
    methods: {
      goBack() {
        this.$router.back(-1);
      },
      //设置sessionstorage来打开warn弹窗
      setSession() {
        sessionStorage.setItem('warn', 'yes');
      },
      //判断区域和单位的字段值是否为空，加"first"判断是第一个无“>”符号
      MenuBar(item, index) {
        if (item && item != '') {
          if (index && index === "first") {
            return item;
          } else {
            return '>' + item
          }
        } else {
          return "";
        }
      },
      //视图开关&&本地保存
      list_Change() {
        this.is_list = !this.is_list;
        localStorage.setItem("realtime_islist", this.is_list);
      },
      //打开筛选,加载组件
      showFilter() {
        this.filter_component = "SFilter";
        this.filter_show = !this.filter_show;
      },
      //关闭筛选弹出层后回调，为了保持筛选页面之前填写的数据不变
      pop_hide() {
        this.$refs.filter.onhide();
      },
      //获取筛选页面点击确定按钮后传递的值
      ievent(data) {
        this.isLoading = true;
        if (data && data != "" && data != null) {
          this.getIndexData("1", data);
        } else {
          this.confirm("提示", "获取筛选条件异常，可刷新后再试！", "立即刷新", this.reload); //使用main中的全局方法调用弹窗
        }
      },
      //打开详情页面
      showComment(id) {
        this.$router.push({
          path: '/detail',
          query: {
            id: id
          }
        });
      },
      //上拉操作
      loadmore(loaded) {
        this.getIndexData("0");
      },
      //下拉刷新
      refresh(loaded) {
        this.getIndexData("1");
        setTimeout(() => {
          this.infiniteLoading = true;
          this.infiniteTip = "正在加载";
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
      //  数据获取
      getIndexData(type, params) {
        let _this = this;
        getRealtimeIndex(params).then((res) => {
          if (res.data != "") {
            if (type && type == "0") {
              _this.TableData = _this.TableData.concat(res.data.data);
            } else {
              _this.TableData = res.data.data;
            }
            _this.total = res.data.total; //给统计数据赋值
          } else {
            _this.is_Nodata = true;
          }
          _this.is_done = true;
          //弹出提示
          if (res.data.alert) {
            if (!sessionStorage.getItem('warn')) {
              _this.alert(res.data.alert.head, res.data.alert.content, res.data.alert.foot, this.setSession); //使用main中的全局方法调用弹窗
            }
          }
          _this.isLoading = false;
          _this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
        }).catch(function (error) {
          _this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
          _this.is_done = true;
          _this.confirm("提示", error.message, "刷新试试", _this.reload); //使用main中的全局方法调用弹窗
          _this.isLoading = false;
          _this.infiniteLoading = false;
          _this.infiniteTip = "加载失败，请重试";
        });
      }
    },
    created() {
      this.temp_bgColor = temp_color; //获取在config.js里定义的数组颜色，并赋值
      this.coolers_color = cooler_color; //获取在config.js里定义的颜色，并赋值
      this.getIndexData();
    },
    activated() {
      if (this.is_done) {
        if (this.$store.state.is_back_index) {
          this.$store.state.is_back_index = false;
          this.getIndexData();
        } else {
          this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
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
