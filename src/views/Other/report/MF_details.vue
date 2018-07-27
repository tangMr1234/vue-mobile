<template>
  <div class="details custom_warp">
    <!-- 头部 -->
    <x-header :title="header_title"></x-header>
    <!-- 主体 -->
    <!-- 加载组件 -->
    <b-scroll class="wrapper" style="height:calc(100% - 46px);" ref="scroll">
      <div class="content" style="padding-bottom:10px;min-height:calc(100% - 9px);">
        <!-- 数据出错时的加载按钮 -->
        <div class="refer_button" @click="getResultData" v-show="load_Button"><i
          class="iconfont icon-shuaxin1"> 点击刷新</i></div>
        <!-- 表单 -->
        <group-title>{{Report_Data.info}}</group-title>
        <div v-for="(item, index) in Report_Data.form_items" :key="index">
          <!-- c_one按钮型 -->
          <box gap="20px 10px" v-if="item.component == 'x-button'" class="c_one">
            <component :is="item.component" :text="item.text"
                       :type="item.type" :gradients="item.bgColor" @click.native="form_data"
                       :disabled="item.disabled" :name="item.name"></component>
          </box>
          <!-- c_two 需要在配合cell用的组件 -->
          <group v-else-if="item.type=='cell'" class="c_two"
                 v-show="(typeof(item.show) !== 'undefined')?item.show:true">
            <cell :title="item.title" primary="content"
                  :inline-desc="(!item.desc&&item.desc!=='')?'当前: '+ item.default:item.desc">
              <component :is="item.component" :title="item.title" :text="item.text" :placeholder="item.placeholder"
                         v-model="item.default" :height="item.height" :max="item.max" :min="item.min"
                         :options="item.list" :step="item.step" :name="item.name"></component>
            </cell>
          </group>
          <!-- c_three checker组件 -->
          <group v-else-if="item.type=='checker'" class="c_three"
                 v-show="(typeof(item.show) !== 'undefined')?item.show:true">
            <cell :title="item.title" primary="content">
              <div style="margin-left:10px;text-align:left;">
                <checker
                  v-model="item.default"
                  :type="item.checker_type"
                  default-item-class="demo5-item"
                  selected-item-class="demo5-item-selected" :name="item.name">
                  <checker-item v-for="(data, index) in item.list" :key="index" :value="data.id">{{data.label}}
                  </checker-item>
                </checker>
              </div>
            </cell>
          </group>
          <!-- c_four 基础型通用-->
          <group v-else :title="item.text" class="c_four" v-show="(typeof(item.show) !== 'undefined')?item.show:true">
            <component :is="item.component" :title="item.title" :text="item.text" :placeholder="item.placeholder"
                       v-model="item.default" :height="item.height" :max="item.max" :min="item.min"
                       :options="item.list" :start-date="item.star_time" :end-date="item.end_time" :format="item.format"
                       :disable-future="item.disable_future" :fillable="item.fillable" :readonly="item.readonly"
                       :disabled="item.disabled" :data="item.list" :columns="item.columns" :name="item.name"
                       :fill-mode="item.fillmode"
                       :fill-label="item.title" :fill-placeholder="item.placeholder"
                       show-name></component>
          </group>
        </div>
      </div>
    </b-scroll>
  </div>
</template>

<script type="es6">
  import {
    TransferDom,
    XHeader,
    GroupTitle,
    Group,
    Cell,
    PopupPicker,
    XInput,
    XSwitch,
    Calendar,
    XTextarea,
    Box,
    XButton,
    Selector,
    XNumber,
    Range,
    Radio,
    DatetimeRange,
    Checker,
    CheckerItem
  } from 'vux'
  import {getReportDetail} from '@/api/api';

  export default {
    directives: {
      TransferDom
    },
    components: {
      XHeader,
      GroupTitle,
      Group,
      Cell,
      PopupPicker,
      XInput,
      XSwitch,
      Calendar,
      XTextarea,
      Box,
      XButton,
      Selector,
      XNumber,
      Range,
      Radio,
      DatetimeRange,
      Checker,
      CheckerItem
    },
    data() {
      return {
        load_Button: false,
        header_title: "", //头部导航的title
        // Report_Data: [{
        //   component: 'popup-picker',
        //   title: "请选择单位：",
        //   placeholder: "请选择单位",
        //   columns: 2,
        //   list: [{
        //     name: '中国',
        //     value: 'china',
        //     parent: 0
        //   }, {
        //     name: '美国',
        //     value: 'USA',
        //     parent: 0
        //   }, {
        //     name: '广东',
        //     value: 'china001',
        //     parent: 'china'
        //   }, {
        //     name: '广西',
        //     value: 'china002',
        //     parent: 'china'
        //   }, {
        //     name: '美国001',
        //     value: 'usa001',
        //     parent: 'USA'
        //   }, {
        //     name: '美国002',
        //     value: 'usa002',
        //     parent: 'USA'
        //   }, {
        //     name: '广州',
        //     value: 'gz',
        //     parent: 'china001'
        //   }, {
        //     name: '深圳',
        //     value: 'sz',
        //     parent: 'china001'
        //   }, {
        //     name: '广西001',
        //     value: 'gx001',
        //     parent: 'china002'
        //   }, {
        //     name: '广西002',
        //     value: 'gx002',
        //     parent: 'china002'
        //   }, {
        //     name: '美国001_001',
        //     value: '0003',
        //     parent: 'usa001'
        //   }, {
        //     name: '美国001_002',
        //     value: '0004',
        //     parent: 'usa001'
        //   }, {
        //     name: '美国002_001',
        //     value: '0005',
        //     parent: 'usa002'
        //   }, {
        //     name: '美国002_002',
        //     value: '0006',
        //     parent: 'usa002'
        //   }],
        //   default: [],
        //   disabled: false
        // }, {
        //   component: 'calendar',
        //   title: "开始日期：",
        //   placeholder: "请选择开始日期",
        //   disable_future: true, //是否禁止选择今天之后的日期
        //   default: "",
        //   readonly: false
        // }, {
        //   component: 'calendar',
        //   title: "结束日期：",
        //   placeholder: "请选择结束日期",
        //   disable_future: true, //是否禁止选择今天之后的日期
        //   default: "",
        //   readonly: false
        // }, {
        //   component: 'datetime-range',
        //   type: 'checker',
        //   title: "选择需要操作字段：",
        //   checker_type: "checkbox",
        //   list: [
        //     {id: "1", label: "冰箱1"},
        //     {id: "2", label: "冰箱2"},
        //     {id: "3", label: "冰箱3"},
        //   ],
        //   default: []
        // }, {
        //   component: 'x-input',
        //   title: "冰箱名称：",
        //   placeholder: "请输入冰箱名称",
        //   default: "",
        //   disabled: false
        // }, {
        //   component: 'x-switch',
        //   title: "报警开关：",
        //   placeholder: "请输入XXX",
        //   default: "",
        //   disabled: false
        // }, {
        //   component: 'x-input',
        //   title: "冰箱编号：",
        //   placeholder: "请输入冰箱编号",
        //   default: "",
        //   disabled: false
        // }, {
        //   component: 'x-textarea',
        //   title: "其他：",
        //   placeholder: "请输入其他",
        //   max: 200,
        //   height: 100,
        //   default: "",
        //   disabled: false
        // }, {
        //   component: 'selector',
        //   title: "下拉窗：",
        //   placeholder: "请选择",
        //   list: [{key: '0', value: '请选择'}, {key: 'sh', value: '上海'}, {key: 'gd', value: '广东'}, {
        //     key: 'gx',
        //     value: '广西'
        //   }],
        //   default: "0",
        //   readonly: false
        // }, {
        //   component: 'x-number',
        //   title: "数量：",
        //   min: 0,
        //   max: 3,
        //   fillable: true, //是否可以输入
        //   default: 0
        // }, {
        //   component: 'range',
        //   title: "延时分钟：",
        //   type: "cell", //判断是否在cell里面加载的组件
        //   desc: false,
        //   step: 1,
        //   min: 0,
        //   max: 100,
        //   default: 0
        // }, {
        //   component: 'datetime-range',
        //   title: "选择日期到分钟：",
        //   star_time: "2018-01-01",
        //   end_time: "2018-05-09",
        //   format: "YYYY年MM月DD日",
        //   default: ['2018-05-07', '11', '05']
        // }, {
        //   component: 'x-button',
        //   text: "查询",
        //   type: "primary",
        //   bgColor: ['#1D62F0', '#19D5FD'],
        //   disabled: false,  //如果按钮要选择禁用，不要传颜色字段
        // }],
        Report_Data: [], //数据
      }
    },
    methods: {
      //取值
      form_data() {
        let obj = {};
        for (let i = 0; i < this.Report_Data.form_items.length; i++) {
          if (this.Report_Data.form_items[i].default) {
            obj[this.Report_Data.form_items[i].name] = this.Report_Data.form_items[i].default;
          }
        }
        localStorage.setItem("report_detail", JSON.stringify(obj));
        this.$router.push({
          path: "/result",
          query: {
            id: this.$route.query.id,
            title: this.$route.query.title
          }
        });
      },
      //警告弹窗取消之后出现刷新按钮
      onCancel() {
        this.load_Button = true;
      },
      //远程加载数据
      getResultData() {
        let _this = this;
        _this.load_Button = false;
        getReportDetail(_this.$route.query.id).then((res) => {
          _this.header_title = res.data.title;
          _this.Report_Data = res.data;
          _this.loadingRemove();
        }).catch(function (error) {
          _this.confirm("提示", error.message, "刷新试试", _this.reload, _this.onCancel); //使用main中的全局方法调用弹窗
          _this.loadingRemove();
        });
      }
    },
    created() {
      this.getResultData();
    },
    mounted() {
      this.$refs.scroll.scrollTo(0, 0, 0, "");
    }
  }
</script>

<style scoped lang="less">
  .demo5-item {
    padding: 5px 10px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: #fff;
    margin: 5px 6px 5px 0;
  }

  .demo5-item-selected {
    background: #ffffff url(../../assets/checker-active.png) no-repeat right bottom;
    border-color: #ff4a00;
  }
</style>
<style>
  .details .vux-number-input {
    font-size: 14px !important;
  }
</style>
