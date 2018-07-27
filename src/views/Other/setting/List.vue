<template>
  <div class="custom_warp hidden">
    <x-header slot="header" :title="List_header" @on-click-back="goBack" :left-options="{preventGoBack: true}">
      <a slot="right" @click="showPopupFilter">
        <i class="iconfont icon-sousuo" style="font-size:20px;"></i>
        <small style="vertical-align: top;">筛选</small>
      </a>
    </x-header>
    <!-- 数据总计结果 -->
    <group :gutter="0">
      <cell :title="setting_Data.total">
        <div slot="default">
          <x-button :gradients="['#19D5FD', '#1D62F0']" @click.native="add_data" mini><i class="iconfont icon-jia"
                                                                                         style="font-size:12px;"></i>
            新增
          </x-button>
        </div>
      </cell>
    </group>
    <!-- 数据展示列表 -->
    <b-scroll class="wrapper" style="height:calc(100% - 102px);">
      <div class="content" style="padding-bottom:10px;min-height:calc(100% - 9px);">
        <group :gutter="10">
          <cell v-for="(data, index) in setting_Data.data" :key="index" :title="data.label" :inline-desc="data.desc"
                :link="data.link"></cell>
        </group>
      </div>
    </b-scroll>
    <!-- 详情弹出层 -->
    <p-filter ref="popup" popupWidth="87%">
      <s-filter slot="Popup" @reset="submitLoad"></s-filter>
    </p-filter>
  </div>
</template>

<script type="es6">
  import {Group, Cell, XHeader, XButton} from 'vux'
  import PFilter from '@/components/popupFilter.vue'
  import SFilter from '@/views/Popup/Filter.vue'

  export default {
    components: {
      Group,
      Cell,
      XHeader,
      XButton,
      PFilter,
      SFilter
    },
    data() {
      return {
        List_header: "", //header位置title显示
        loadingShow: true,
        setting_Data: {
          total: "共拥有冰箱30台",
          data: [
            {id: "1", label: "冰箱： 天津市一号冰箱", desc: "编号：BX-100921022-冷", link: "detail"},
            {id: "2", label: "冰箱： 天津市2号冰箱", desc: "编号：BX-300921022-冷", link: "detail"},
            {id: "5", label: "冰箱： 天津市5号冰箱", desc: "编号：BX-500921022-冷", link: "detail"},
            {id: "12", label: "冰箱： 天津市12号冰箱", desc: "编号：BX-300921022-冷", link: "detail"},
            {id: "15", label: "冰箱： 天津市25号冰箱", desc: "编号：BX-500921022-冷", link: "detail"},
            {id: "22", label: "冰箱： 天津市32号冰箱", desc: "编号：BX-300921022-冷", link: "detail"},
            {id: "25", label: "冰箱： 天津市45号冰箱", desc: "编号：BX-500921022-冷", link: "detail"},
            {id: "32", label: "冰箱： 天津市52号冰箱", desc: "编号：BX-300921022-冷", link: "detail"},
            {id: "45", label: "冰箱： 天津市65号冰箱", desc: "编号：BX-500921022-冷", link: "detail"},
            {id: "52", label: "冰箱： 天津市21号冰箱", desc: "编号：BX-300921022-冷", link: "detail"},
            {id: "415", label: "冰箱： 天津市51号冰箱", desc: "编号：BX-500921022-冷", link: "detail"},
            {id: "27", label: "冰箱： 天津市22号冰箱", desc: "编号：BX-300921022-冷", link: "detail"},
            {id: "57", label: "冰箱： 天津市52号冰箱", desc: "编号：BX-500921022-冷", link: "detail"},
            {id: "275", label: "冰箱： 天津市26号冰箱", desc: "编号：BX-300921022-冷", link: "detail"},
            {id: "523", label: "冰箱： 天津市56号冰箱", desc: "编号：BX-500921022-冷", link: "detail"},
          ]
        },
        link: "", //frame弹出层要接收的路径
        name: ""
      }
    },
    mounted() {

    },
    activated() {
      this.List_header = sessionStorage.getItem("List_header");
      this.loadingRemove(); //  使用main中的全局方法关闭loading
    },
    methods: {
      //打开详情
      showPopupComment(item) {

      },
      //打开筛选
      showPopupFilter() {
        this.show();
      },
      //调用子组件的方法打开详情
      show() {
        this.$refs.popup.show(); //  调用子组件的方法
      },
      //弹出的子组件filter调用的父组件index的方法
      submitLoad() {
        this.show();
      },
      // 新增数据
      add_data() {
        sessionStorage.setItem('result_header', '新增');
        this.$router.push("/result");
      },
      //  返回操作
      goBack() {
        this.$router.go(-1);
        // this.$refs.list_Scroll.scrollTo(0, 0, 0, "");
      }
    }
  }
</script>
