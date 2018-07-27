<template>
  <div class="details custom_warp">
    <!-- 头部 -->
    <x-header :title="this.$route.name"></x-header>
    <!-- 主体 -->
    <b-scroll class="wrapper" style="height:calc(100% - 46px);">
      <div class="content">
        <div v-if="list3&&list3!=''">
          <!-- 单位与设备选择 -->
          <group :title="list3.info">
            <popup-picker :title="list3.choose.label" :data="list3.choose.list" :columns="3" v-model="value3"
                          ref="picker3"
                          show-name></popup-picker>
          </group>
          <!-- 日期选择 -->
          <group>
            <calendar v-model="star_time" :title="list3.date.begin.label"></calendar>
            <calendar v-model="end_time" :title="list3.date.end.label"></calendar>
          </group>
          <!-- 模板选择 -->
          <div v-show="false">
            <group>
              <cell title="请选择模板" :value="selected_mb" is-link @click.native="show"></cell>
            </group>
            <!-- 展示字段选择 -->
            <box gap="30px 0">
              <divider>需要展示和操作的字段</divider>
              <div class="box">
                <checker
                  v-model="demo1"
                  type="checkbox"
                  default-item-class="demo5-item"
                  selected-item-class="demo5-item-selected"
                >
                  <checker-item v-for="i in 10" :key="i" :value="i" style="margin-top:10px;">{{['good']+i}}
                  </checker-item>
                </checker>
              </div>
            </box>
          </div>
          <!-- 查询按钮 -->
          <box gap="30px 10px">
            <x-button :gradients="['#1D62F0', '#19D5FD']" @click.native="search">查询</x-button>
          </box>
        </div>
      </div>
    </b-scroll>
    <!-- 弹出的选择模板 -->
    <div v-transfer-dom>
      <popup v-model="show1" style="height:calc(100% - 46px);">
        <div style="height:100%;overflow: hidden;">
          <v-details style="height:100%;overflow: hidden;" @reset="show" @select_mb="listen_select_mb"></v-details>
        </div>
      </popup>
    </div>
  </div>
</template>

<script type="es6">
  import {
    TransferDom,
    PopupPicker,
    Calendar,
    Checker, CheckerItem,
    Box,
    XButton,
    Divider,
    Popup,
    XHeader,
    Group,
    Cell,
    Loading
  } from 'vux'
  import {getReportResultData} from '@/api/api';

  export default {
    directives: {
      TransferDom
    },
    components: {
      PopupPicker, Calendar, Checker, CheckerItem, Box, XButton, Divider, Popup, XHeader, Group, Cell, Loading,
      VDetails:
        resolve => {
          require(['@/views/Vaccin_Details/Vaccin_Details.vue'], resolve)
        }
    },
    data() {
      return {
        list3: [], //联动选择
        value3: [],

        star_time: 'TODAY',
        end_time: 'TODAY',

        selected_mb: '',

        demo2: true,

        demo1: [],

        show1: false,
      }
    },
    methods: {
//打开详情页
      show() {
        this.show1 = !this.show1;
      },
//  子组件传递过来的选中的值
      listen_select_mb(select) {
        this.selected_mb = select;
      },
//  查询结果
      search() {
        this.$router.push('/result');
      },
//警告弹窗取消之后出现刷新按钮
      onCancel() {
        this.load_Button = true;
      },
//远程加载首页数据
      getResultData() {
        let _this = this;
        _this.load_Button = false;
        getReportResultData().then((res) => {
          _this.list3 = res.data;
          _this.star_time = res.data.date.begin.value;
          _this.end_time = res.data.date.end.value;
          _this.loadingRemove();
        }).catch(function (error) {
          _this.confirm("提示", error.message, "刷新试试", _this.reload, _this.onCancel); //使用main中的全局方法调用弹窗
          _this.loadingRemove();
        });
      }
    },
    mounted() {
      this.getResultData();
    }
  }
</script>

<style scoped lang="less">
  .card-padding {
    padding: 15px;
  }

  .box {
    padding: 0 15px;
  }

  .demo1-item {
    border: 1px solid #ececec;
    padding: 5px 15px;
  }

  .demo1-item-selected {
    border: 1px solid green;
  }

  .demo5-item {
    width: 31%;
    min-width: 100px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: #fff;
    margin-right: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .demo5-item-selected {
    background: #ffffff url(../../assets/checker-active.png) no-repeat right bottom;
    border-color: #ff4a00;
  }
</style>
