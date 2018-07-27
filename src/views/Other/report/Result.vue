<template>
  <div class="details custom_warp">
    <!-- 头部 -->
    <x-header :title="this.$route.name">
      <div slot="right" style="color:#fff;" @click="show7=true">
        <small style="vertical-align: top;">操作</small>
      </div>
    </x-header>
    <!-- 主体 -->
    <!-- 操作栏目 -->
    <div v-transfer-dom>
      <actionsheet
        v-model="show7"
        :menus="menu7"
        theme="android"
        @on-click-menu="click">
      </actionsheet>
    </div>
    <div v-transfer-dom>
      <popup v-model="show13" style="height:60%;overflow:hidden;">
        <group :gutter="0">
          <cell>
            <div slot="icon" @click="show13=false">关闭</div>
            <div slot="title">
              <x-input v-model="search_sn" novalidate :icon-type="iconType" placeholder="请输入要查找的设备号"
                       style="margin:0 20px;background:#eee;">
              </x-input>
            </div>
            <div slot="default">
              <x-button slot="right" type="primary" @click.native="search" mini>搜索</x-button>
            </div>
          </cell>
        </group>

        <div style="height:calc(100% - 60px);overflow-x:hidden;">
          <group :gutter="10">
            <radio :options="options"></radio>
          </group>
          <div style="padding: 15px;">
            <x-button @click.native="show12 = false" type="primary">确认打印</x-button>
          </div>
        </div>

      </popup>
    </div>
    <!-- 展示 -->
    <b-scroll class="wrapper" style="height:calc(100% - 46px);">
      <div class="content">
        <!-- 模板选择 -->
        <group>
          <cell title="请选择模板" :value="selected_mb" is-link @click.native="show"></cell>
        </group>
        <!-- 弹出的选择模板 -->
        <div v-transfer-dom>
          <popup v-model="show1" style="height:calc(100% - 46px);">
            <div style="height:100%;overflow: hidden;">
              <component :is="details" :id="$route.query.id" style="height:100%;overflow: hidden;" @reset="show"
                         @select_mb="listen_select_mb"></component>
            </div>
          </popup>
        </div>
        <!-- 加载组件 -->
        <component :is="item.component" :text="item.text" v-for="(item, index) in items" :key="index"
                   style="margin:20px 0;"></component>
      </div>
    </b-scroll>
  </div>
</template>

<script type="es6">
  import {XHeader, Actionsheet, Popup, Group, Cell, Box, XButton, XInput, Radio, TransferDom} from 'vux'
  import aComponent from '@/views/Result/Grid.vue'
  import bComponent from '@/views/Result/Curve.vue'
  import VDetails from '@/views/MF_details/Vaccin_Details.vue';
  import {getReportResultType} from '@/api/api';

  export default {
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      Actionsheet,
      Popup,
      Group,
      Cell,
      Box,
      XButton,
      XInput,
      Radio,
      TransferDom,
      aComponent,
      bComponent,
      VDetails
    },
    data() {
      return {
        details: "", //点击后加载的展示模板选择组件
        show1: false,
        selected_mb: '',
        items: [{
          component: 'a-component',
          text: "1"
        }, {
          component: 'b-component',
          text: "2"
        }],
        show7: false,
        menu7: {
          menu1: '导出excel',
          menu2: '导出PDF',
          menu3: '普通打印',
          menu4: '便携式打印'
        },
        show13: false,
        options: [{
          icon: 'http://dn-placeholder.qbox.me/110x110/FF2D55/000',
          key: '001',
          value: '便携式001'
        }, {
          icon: 'http://dn-placeholder.qbox.me/110x110/FF2D55/000',
          key: '011',
          value: '便携式001'
        }, {
          icon: 'http://dn-placeholder.qbox.me/110x110/FF2D55/000',
          key: '0201',
          value: '便携式001'
        }, {
          icon: 'http://dn-placeholder.qbox.me/110x110/FF2D55/000',
          key: '0301',
          value: '便携式001'
        }, {
          icon: 'http://dn-placeholder.qbox.me/110x110/FF2D55/000',
          key: '1001',
          value: '便携式001'
        }, {
          icon: 'http://dn-placeholder.qbox.me/110x110/FF2D55/000',
          key: '0041',
          value: '便携式001'
        }, {
          icon: 'http://dn-placeholder.qbox.me/110x110/FF2D55/000',
          key: '0051',
          value: '便携式001'
        }, {
          icon: 'http://dn-placeholder.qbox.me/110x110/FF2D55/000',
          key: '00531',
          value: '便携式001'
        }, {
          icon: 'http://dn-placeholder.qbox.me/110x110/FF2D55/000',
          key: '03501',
          value: '便携式0099'
        }],
        search_sn: "", //搜索输入框的值
        iconType: "", //搜索框错误的图标
      }
    },
    methods: {
      show() {
        this.details = "VDetails";
        this.show1 = !this.show1;
      },
      //选择模板值的传递
      listen_select_mb(select) {
        this.selected_mb = select;
      },
      click(key) {
        if (key == "menu4") {
          this.show13 = true;
        }
      },
      //  搜索打印机编号
      search() {
        if (this.search_sn != "") {
          this.iconType = '';
        } else {
          this.iconType = 'error';
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
        // getReportResultType().then((res) => {
        //   // _this.options = res.data;
        //   _this.loadingRemove();
        // }).catch(function (error) {
        //   _this.confirm("提示", error.message, "刷新试试", _this.reload, _this.onCancel); //使用main中的全局方法调用弹窗
        //   _this.loadingRemove();
        // });

      }
    },
    mounted() {
      this.getResultType();
    }
  }
</script>
