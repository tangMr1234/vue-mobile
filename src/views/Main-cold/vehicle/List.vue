<template>
  <div class="custom_warp hidden">
    <x-header :title="this.$route.name" @on-click-back="ListgoBack" :left-options="{preventGoBack: true}">
      <a slot="right" class="iconfont icon-sousuo" style="font-size:20px;"
         @click="showFilter">
        <small style="vertical-align: top;"> 筛选</small>
      </a>
    </x-header>
    <!-- 统计结果展示条 -->
    <group gutter="0">
      <cell :inline-desc="TableData.total"></cell>
    </group>
    <div class="hidden" style="height:calc(100% - 81px);">
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
        <div v-for="(item, index) in TableData.data" :key="index" :style="(index===0)?'':'margin-top:20px;'">
          <!-- 区县单位结果 -->
          <sticky>
            <div style="background:#eee;height:40px;line-height:40px;margin-bottom:20px;">
              <span
                style="background:rgb(64, 158, 255);color:#fff;text-align:center;padding:0 5px;min-width:40px;display: inline-block;">{{index+1}}</span>
              {{item.region.city}} / {{item.region.area}} / <span
              style="color: rgb(64, 158, 255);">{{item.region.unit}}</span>
            </div>

          </sticky>
          <!-- 数据列表型展示 -->
          <group class="TableBorderNone" v-for="(item, index) in item.car" :key="index" @click.native="showComment"
                 :gutter="(index===0)?'0':''">
            <a>
              <cell :title="item.title" :inline-desc="item.date">
                  <span slot="default" :style="backgroundDiv" class="background-img">
                    {{item.number}}
                  </span>
              </cell>
              <cell :inline-desc="item.address">
                <div slot="title" style="padding-bottom:10px;"><span>{{item.temp}}</span><span style="float:right;">{{item.type}}</span>
                </div>
              </cell>
            </a>
          </group>
        </div>
        <!-- 加载更多 -->
        <load-more :show-loading="infiniteLoading" :tip="infiniteTip"></load-more>
      </pull-to>
    </div>
    <!-- 详情弹出层 -->
    <p-filter ref="popup" :popupWidth="popupWidth">
      <s-filter slot="Popup" @reset="showFilter" v-show="Filter"></s-filter>
      <s-frame slot="Popup" @reset="showComment" v-show="Comment" :link="link" :name="name"></s-frame>
    </p-filter>
  </div>
</template>

<script type="es6">
  import {XHeader, LoadMore, Group, GroupTitle, Cell, Sticky} from 'vux'
  import PullTo from 'vue-pull-to'

  export default {
    components: {
      PullTo,
      XHeader,
      LoadMore,
      Group,
      Cell,
      Sticky,
      PFilter: resolve => {
        require(['@/components/popupFilter.vue'], resolve)
      },
      SFrame: resolve => {
        require(['@/views/Frame.vue'], resolve)
      },
      SFilter: resolve => {
        require(['@/views/Popup/Filter'], resolve)
      }
    },
    data() {
      return {
        backgroundDiv: {
          backgroundImage: 'url(' + require('@/assets/bg_car_number.jpg') + ')',
        }, //背景图片
        link: "", //frame弹出层要接收的路径
        name: "",
        Comment: false,
        Filter: false,
        popupWidth: '100%', //弹出层的宽度设置
        infiniteLoading: true,
        infiniteTip: "正在加载",
        iconLink: '', //下拉刷新的状态
        TableData: {
          total: '"冷藏车..." 的相关结果：100条',
          data: [{
            region: {
              city: '上海市',
              area: '嘉定区',
              unit: '冷王01'
            },
            car: [
              {
                title: "冷藏车001",
                number: "沪A·QQ111",
                type: "正常",
                date: "2018-10-11 16:23",
                temp: "50℃,60℃,10℃",
                address: "当前位置：上海市嘉定区爱特路855号歆翱国际855号"
              },
              {
                title: "冷藏车002",
                number: "沪A·1S111",
                type: "正常",
                date: "2018-10-11 16:23",
                temp: "50℃,60℃,10℃",
                address: "当前位置：上海市嘉定区爱特路855号歆翱国际"
              }
            ]
          }, {
            region: {
              city: '上海市',
              area: '嘉定区',
              unit: '冷王01'
            },
            car: [
              {
                title: "冷藏车001",
                number: "沪A·QQ111",
                type: "正常",
                date: "2018-10-11 16:23",
                temp: "50℃,60℃,10℃",
                address: "当前位置：上海市嘉定区爱特路855号"
              }, {
                title: "冷藏车001",
                number: "沪A·QQ111",
                type: "正常",
                date: "2018-10-11 16:23",
                temp: "50℃,60℃,10℃",
                address: "当前位置：上海市嘉定区爱特路855号"
              }, {
                title: "冷藏车001",
                number: "沪A·QQ111",
                type: "正常",
                date: "2018-10-11 16:23",
                temp: "50℃,60℃,10℃",
                address: "当前位置：上海市嘉定区爱特路855号"
              }
            ]
          }, {
            region: {
              city: '上海市',
              area: '嘉定区',
              unit: '冷王01'
            },
            car: [
              {
                title: "冷藏车001",
                number: "沪A·QQ111",
                type: "正常",
                date: "2018-10-11 16:23",
                temp: "50℃,60℃,10℃",
                address: "当前位置：上海市嘉定区爱特路855号歆翱国际855号606"
              }
            ]
          }]
        }
      }
    },
    mounted() {
      this.loadingRemove();
    },
    methods: {
      onImgError(item, $event) {
        //console.log(item, $event)
      },
      ListgoBack() {
        this.$router.push("/index");
      },
      //打开详情
      showComment() {
        this.Comment = true;
        this.Filter = false;
        this.popupWidth = "100%";
        this.link = "details";
        this.$refs.popup.show(); //  调用子组件的方法
      },
      showFilter() {
        this.Filter = true;
        this.Comment = false;
        this.popupWidth = "87%";
        this.$refs.popup.show(); //  调用子组件的方法
      },
      //上拉操作
      infinite(done) {

      },
      //下拉刷新
      refresh(loaded) {
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
      }
    }
  }
</script>

<style scoped rel="stylesheet/less" lang="less">
  .background-img {
    background-size: 100% 100%;
    text-align: center;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    color: #000;
    font-size: 20px;
    display: inline-block;
  }

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

  .clearfix:after {
    content: "";
    display: block;
    clear: both;
  }
</style>
