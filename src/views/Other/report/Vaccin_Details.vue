<template>
  <div class="custom_warp">
    <!-- 头部 -->
    <group :gutter="0">
      <cell :title="app_data.info">
        <div @click="$emit('reset');">
          <x-icon type="ios-close-outline" style="fill:red;"></x-icon>
        </div>
      </cell>
    </group>
    <!-- 数据出错时的加载按钮 -->
    <div class="refer_button" @click="getResultType()" v-show="load_Button"><i
      class="iconfont icon-shuaxin1"> 点击刷新</i></div>
    <div v-if="app_data.list">
      <b-scroll class="wrapper" style="height: calc(100% - 49px);">
        <div class="content">
          <!-- 选择列表 -->
          <group v-for="(data, index) in app_data.list" :key="index" :gutter="(index===0)?20:5"
                 @click.native="select_mb($event, data.label)">
            <flexbox :gutter="20">
              <flexbox-item :span="2/5"><img :src="data.msrc" @click="show(index)" class="previewer-demo-img"
                                             style="width:100%;" alt=""></flexbox-item>
              <flexbox-item>
                <h2 style="font-size:22px;">{{data.label}}</h2>
                <div>{{data.value}}</div>
              </flexbox-item>
            </flexbox>
          </group>
        </div>
      </b-scroll>
      <!-- 打开大图 -->
      <div v-transfer-dom>
        <previewer :list="app_data.list" ref="previewer" :options="options"></previewer>
      </div>
    </div>
  </div>
</template>

<script type="es6">
  import {
    Flexbox,
    FlexboxItem,
    Group,
    Cell,
    Previewer,
    TransferDom
  } from 'vux'
  import 'swiper/dist/css/swiper.css'
  import {getReportResultType} from '@/api/api';

  export default {
    directives: {
      TransferDom
    },
    components: {
      Flexbox, FlexboxItem, Group, Cell, Previewer
    },
    props: ["id"],
    data() {
      return {
        load_Button: false,
        options: {
          getThumbBoundsFn(index) {
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            let rect = thumbnail.getBoundingClientRect()
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          }
        }, //打开大图的初始化配置
        app_data: [], //数据
      }
    },
    //获取swiper对其进行操作
    computed: {
      swiper() {
        return this.$refs.mySwiperTab.swiper
      }
    },
    methods: {
      show(index) {
        this.$refs.previewer.show(index)
      },
      //  选择模板
      select_mb(event, param) {
        if (event.srcElement.localName != "img") {
          this.$emit('select_mb', param);
          this.$emit('reset');
        }
      },
      //警告弹窗取消之后出现刷新按钮
      onCancel() {
        this.load_Button = true;
      },
      //获取展示形式的模板列表
      getResultType() {
        let _this = this;
        _this.load_Button = false;
        getReportResultType(_this.id).then((res) => {
          _this.app_data = res.data;
          _this.loadingRemove();
        }).catch(function (error) {
          _this.confirm("提示", error.message, "刷新试试", _this.reload, _this.onCancel); //使用main中的全局方法调用弹窗
          _this.loadingRemove();
        });
      }
    },
    mounted() {
      this.getResultType();
    }
  }
</script>
