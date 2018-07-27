<template>
  <div class="custom_warp hidden">
    <x-header slot="header">{{header}}</x-header>
    <div style="height: calc(100% - 96px);" class="hidden-x">
      <card v-for="(items, index) in data" :key="index" class="card-custom" :style="index==0?'margin-top:20px':''">
        <div slot="content">
          <!-- 标题 -->
          <p style="font-size:16px;">{{items.label}}</p>
          <div style="margin-top:10px;color:#666;font-size:12px;line-height:1.2;position:relative;">
            <!-- 简介栏 -->
            <div v-if="items.value&&items.value!=''">
              <div style="margin-top:8px;" v-for="(item,index) in items.value" :key="index" v-html="item"></div>
            </div>
            <!-- 标签栏 -->
            <div style="margin-top:8px;" v-if="items.tags && items.tags!=''">
              <span v-for="(item,index) in items.tags" :key="index" style="margin-right:5px;" v-html="item"></span>
            </div>
            <!-- 数量加减栏 -->
            <inline-x-number v-model="items.default"
                             :min="0"
                             :max="items.max"
                             @on-change="change"
                             button-style="round"
                             width="50px"
                             style="position:absolute;right:0;bottom:0;"
                             fillable>
            </inline-x-number>
          </div>
        </div>
      </card>
    </div>
    <!-- 统计和提交 -->
    <group :gutter="0">
      <cell>
        <div slot="title"><span style="color:#ff9000;">{{total_count_number}} {{total_price_number}}</span></div>
        <x-button type="primary" @click.native="submit" :gradients="['#409eff', '#409eff']" mini>提交</x-button>
      </cell>
    </group>
    <!-- loading -->
    <loading :show="submit_loading" text="提交中"></loading>
  </div>
</template>

<script type="es6">
  import {InlineXNumber, Card} from 'vux'
  import {getCommon, postCommon} from '@/api/api';

  export default {
    components: {InlineXNumber, Card},
    data() {
      return {
        is_done: false,  //配合keep-alive判断是否是首次加载
        is_location: null, //判断上次是否进入的该页面
        data: [],  //数据
        submit_loading: false,   //提交的页面loading
        total_count: false,   //判断是否开启数量统计
        total_price: false,   //判断是否开启价格统计
        total_count_number: null,  //数量统计
        total_price_number: null,  //价格统计
        header: null,
      }
    },
    methods: {
      //input-number值改变时触发
      change(val) {
        this.total();
      },
      //下方统计
      total() {
        if (this.total_count) {
          let count = 0;
          for (var i = 0; i < this.data.length; i++) {
            count += Number(this.data[i].default);
          }
          this.total_count_number = "已选择数量：" + count;
        }
        if (this.total_price) {
          let count = 0;
          for (var i = 0; i < this.data.length; i++) {
            count += Number(this.data[i].default) * Number(this.data[i].price);
          }
          this.total_price_number = "总金额：" + count;
        }
      },
      // 提交
      submit() {
        let _this = this;
        _this.submit_loading = true;
        let _param = {
          url: "/" + _this.$route.params.url.replace(/-/g, "/"),
          params: {}
        };
        for (var i = 0; i < _this.data.length; i++) {
          if (_this.data[i].default > 0) {
            _param['params'][_this.data[i].name] = _this.data[i].default;
          }
        }
        postCommon(_param).then((res) => {
          _this.toast(res.msg);
          _this.submit_loading = false;
          _this.total_count_number = _this.total_price_number = null;
          _this.getData(res.data.link);
        }).catch(function (error) {
          _this.submit_loading = false;
          _this.alert("提示", error.message, "知道了"); //使用main中的全局方法调用弹窗
        });
      },
      //加载数据
      getData(para) {
        let _this = this;
        getCommon("/" + _this.$route.params.url.replace(/-/g, "/")).then((res) => {
          _this.data = res.data.list;
          _this.total_count = res.data.total_count;
          _this.total_price = res.data.total_price;
          _this.header = (res.data.item_count) ? res.data.header + '(' + res.data.item_count + ')' : res.data.header;
          _this.$nextTick(() => {
            _this.loadingRemove();
            _this.is_done = true;
            if (para) {
              _this.$router.push(para);
            }
          });
        }).catch(function (error) {
          _this.loadingRemove();
          _this.is_done = true;
          _this.confirm("提示", error.message, "刷新试试", _this.reload, _this.onCancel); //使用main中的全局方法调用弹窗
        });
      },
    },
    created() {
      this.is_location = this.$route.path;
      this.getData();
    },
    activated() {
      if (this.is_done) {
        if (this.is_location == this.$route.path) {
          this.loadingRemove();
        } else {
          this.is_location = this.$route.path;
          this.getData();
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .card-custom {
    margin: 15px;
    padding: 15px;
    background: #fff;
    border-radius: 10px;
  }

  .weui-panel:before {
    border-top: none;
  }

  .weui-panel:after {
    border-bottom: none;
  }
</style>
