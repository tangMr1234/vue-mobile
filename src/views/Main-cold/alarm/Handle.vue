<template>
  <div class="handle custom_warp" v-cloak>
    <x-header :title="this.$route.name"></x-header>
    <div class="hidden" style="height:calc(100% - 46px);">
      <pull-to>
        <!-- 数据出错时的加载按钮 -->
        <div class="refer_button" @click="getHandledsData"
             v-show="load_Button"><i
          class="iconfont icon-shuaxin1"> 点击刷新</i></div>
        <!-- 详情table -->
        <div class="Interlace" v-if="Handled_detail&&Handled_detail!=''">
          <group>
            <x-table>
              <tbody>
              <tr v-for="(data, index) in Handled_detail.warn_info" :key="index">
                <td width="25%">{{data.label}}</td>
                <td style="text-align:left;padding:0 20px;">{{data.value}}</td>
              </tr>
              </tbody>
            </x-table>
          </group>
          <!-- 处理 -->
          <br>
          <divider>{{Handled_detail.handle_title}}</divider>
          <div v-if="!Handled_detail.is_handled">
            <s-filter @ievent="ievent" ref="filter" :list="Handled_detail.handle_option"></s-filter>
          </div>
          <div v-else>
            <group>
              <x-table>
                <tbody>
                <tr v-for="(data, index) in Handled_detail.handle_info" :key="index">
                  <td width="25%">{{data.label}}</td>
                  <td style="text-align:left;padding:0 20px;">{{data.value}}</td>
                </tr>
                </tbody>
              </x-table>
            </group>
            <br>
          </div>
        </div>
      </pull-to>
    </div>
    <!-- 提交时的loading -->
    <loading :show="submitLoading" :text="submitText"></loading>
  </div>
</template>

<script type="es6">
  import {XTable, Box, XButton, Loading, XInput, Divider, Radio} from 'vux'
  import SFilter from '@/views/Popup/Filter.vue';
  import PullTo from 'vue-pull-to'
  import {getHandledData, postHandledData} from '@/api/api';

  export default {
    components: {
      PullTo, XTable, Box, XButton, Loading, XInput, Divider, Radio, SFilter
    },
    data() {
      return {
        load_Button: false,
        Handled_detail: null, // 数据
        commonList: ['冷链设备故障', '监控设备故障', '误报警'],
        checked: null,
        other: false, //其他部分输入框的显示与隐藏
        submitLoading: false, //提交数据时的loading
        submitText: "提交中", //提交数据时的loading的提示文字
      }
    },
    methods: {
      //获取筛选页面点击确定按钮后传递的值
      ievent(data) {
        console.log(data);
        let _this = this;
        _this.$vux.loading.show({
          text: '提交中'
        });
        if (data && data != "" && data != null) {
          postHandledData(data).then((res) => {
            _this.Handled_detail = res.data;
            _this.$vux.loading.hide();
            _this.toast(res.msg);
          }).catch(function (error) {
            _this.$vux.loading.hide();
            _this.alert("提示", error.message); //使用main中的全局方法调用弹窗
          });
        } else {
          _this.$vux.loading.hide();
          _this.confirm("提示", "提交异常！", "刷新试试", _this.reload); //使用main中的全局方法调用弹窗
        }
      },
      onCancel() {
        this.load_Button = true;
      },
      //  数据获取
      getHandledsData() {
        let _this = this;
        _this.load_Button = false;
        getHandledData(_this.$route.query.id).then((res) => {
          _this.Handled_detail = res.data;
          _this.loadingRemove();
        }).catch(function (error) {
          _this.confirm("提示", error.message, "刷新试试", _this.reload, _this.onCancel); //使用main中的全局方法调用弹窗
          _this.loadingRemove();
        });
      }
    },
    created() {
      this.getHandledsData();
    }
  }
</script>

<style>
  .handle img {
    width: 100%;
  }

  .Interlace table tr:nth-child(odd) {
    background: #F4F4F4;
  }
</style>
