<template>
  <div class="details custom_warp" v-if="Report_Data['form_items']&&Report_Data['form_items']!=''">
    <!-- 加载组件 -->
    <!--<component :is="scroll" style="height:calc(100% - 42px);overflow-x: hidden;" :gutter="0">-->
      <!-- 数据出错时的加载按钮 -->
      <div class="refer_button" @click="getFilterData" v-show="load_Button">
        <i class="iconfont icon-shuaxin1"> 点击刷新</i></div>
      <!-- 表单 -->
      <group-title>{{Report_Data.info}}</group-title>
      <div v-if="Report_Data.form_items.list&&Report_Data.form_items.list!=''">
        <div v-for="(item, index) in Report_Data.form_items.list" :key="index">
          <!-- c_one按钮型 -->
          <box gap="20px 10px" v-if="item.component == 'x-button'" class="c_one">
            <component :is="item.component" :text="item.text"
                       :type="item.type" :gradients="item.bgColor" @click.native="form_data"
                       :disabled="item.disabled" :name="item.name"></component>
          </box>
          <!-- c_two 需要在配合cell用的组件 -->
          <group v-else-if="item.type=='cell'" class="c_two"
                 v-show="(typeof(item.show) !== 'undefined')?item.show:true">
            <cell :title="item.label + '：'" primary="content"
                  :inline-desc="(!item.desc&&item.desc!=='')?'当前: '+ item.default:item.desc">
              <component :is="item.component" :title="item.label+'：'" :text="item.text" :placeholder="item.placeholder"
                         v-model="item.default" :height="item.height" :max="item.max" :min="item.min"
                         :options="item.list" :step="item.step" :name="item.name"></component>
            </cell>
          </group>
          <!-- c_three checker组件 -->
          <group v-else-if="item.type=='checker'" class="c_three"
                 v-show="(typeof(item.show) !== 'undefined')?item.show:true">
            <cell :title="item.label+'：'" primary="content">
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
          <group :title="item.component=='radio'?item.title:''" v-else class="c_four"
                 v-show="(typeof(item.show) !== 'undefined')?item.show:true">
            <component :is="item.component" :title="item.label+'：'" :text="item.text" :placeholder="item.placeholder"
                       v-model="item.default" :height="item.height" :max="item.max" :min="item.min"
                       :options="item.list" :start-date="item.star_time" :end-date="item.end_time" :format="item.format"
                       :disable-future="item.disable_future" :fillable="item.fillable" :readonly="item.readonly"
                       :disabled="item.disabled" :data="item.list" :columns="item.columns" :name="item.name"
                       :fill-mode="item.fillmode"
                       :fill-label="item.text+'：'" :fill-placeholder="item.placeholder"
                       show-name :selected-label-style="{color: 'red'}"></component>
          </group>
        </div>
      </div>
    <!--</component>-->
    <box gap="20px 10px" v-if="Report_Data.button_items&&Report_Data.button_items!=''">
      <component v-for="(data,index) in Report_Data.button_items" :key="index" :is="data.component" :type="data.type"
                 :disabled="data.disabled" @click.native="submit">{{data.text}}
      </component>
    </box>
    <!-- 底部button -->
    <flexbox :gutter="0" v-else>
      <flexbox-item>
        <x-button @click.native="cancel">取消</x-button>
      </flexbox-item>
      <flexbox-item>
        <x-button :gradients="['#409eff', '#409eff']" @click.native="submit">确定</x-button>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script type="es6">
  import {
    base64,
    TransferDom,
    Group,
    GroupTitle,
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
    CheckerItem,
    Flexbox, FlexboxItem,
  } from 'vux'
  import PullTo from 'vue-pull-to'
  import {getCommon} from '@/api/api';

  export default {
    directives: {
      TransferDom
    },
    components: {
      PullTo,
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
      CheckerItem,
      Flexbox, FlexboxItem,
    },
    props: ["list", "url"],
    data() {
      return {
        scroll: "",
        load_Button: false,
        header_title: "", //头部导航的title
        Report_Data: [], //数据
      }
    },
    methods: {
      //通过本地存储的方式保持筛选不变
      onhide() {
        if (sessionStorage.getItem("realtime_Filter")) {
          this.Report_Data = JSON.parse(base64.decode(sessionStorage.getItem("realtime_Filter")));
        }
      },
      //取消
      cancel() {
        this.onhide();
        this.$emit('reset'); //  调用父组件的方法
      },
      //确认筛选
      submit() {
        let obj = {};
        let arr = [];
        for (let i = 0; i < this.Report_Data.form_items.list.length; i++) {
          if (this.Report_Data.form_items.list[i].required && !this.Report_Data.form_items.list[i].default) {
            arr.push(this.Report_Data.form_items.list[i].title);
            this.alert("提示", "<span style='color:red;'>[" + arr + "]</span>必填", "知道了");
          } else {
            obj[this.Report_Data.form_items.list[i].name] = this.Report_Data.form_items.list[i].default;
          }
        }
        if (arr == "") {
          this.$emit('ievent', obj); //向父页面传值
        }
        if (!this.list) {
          sessionStorage.setItem("realtime_Filter", base64.encode(JSON.stringify(this.Report_Data)));
          this.$emit('reset'); //  调用父组件的方法
        }
      },
      //警告弹窗取消之后出现刷新按钮
      onCancel() {
        this.load_Button = true;
      },
      //远程加载数据
      getFilterData() {
        let _this = this;
        _this.load_Button = false;
        let _param;
        (typeof(_this.url) !== 'undefined' && _this.url != '') ? _param = _this.url : _param = "/" + _this.$route.params.url.replace(/-/g, "/");
        getCommon(_param).then((res) => {
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
      sessionStorage.removeItem("realtime_Filter");
      if (typeof(this.list) == "undefined" || this.list == "") {
        this.scroll = "pull-to";
        this.getFilterData();
      } else {
        this.scroll = "group";
        this.header_title = this.list.title;
        this.Report_Data = this.list;
      }
    },
    mounted() {
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
    background: #ffffff url(../assets/checker-active.png) no-repeat right bottom;
    border-color: #ff4a00;
  }
</style>

<style>
  .details .vux-number-input {
    font-size: 14px !important;
  }

  .details > div > .weui-cells {
    background: transparent;
  }

  .details > div > .weui-cells > .weui-cells__title {
    margin-top: 0;
  }

  .details > div > .weui-cells:before {
    border-top: 0;
  }
</style>
