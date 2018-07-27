<template>
  <div class="details custom_warp">
    <div v-if="!detail || detail==''">
      <!-- 数据出错时的加载按钮 -->
      <div class="refer_button" @click="getDetailData()" v-show="load_Button">
        <i class="iconfont icon-shuaxin1"> 点击刷新</i>
      </div>
      <!-- 暂无数据的显示 -->
      <div v-show="is_Nodata">
        <img src="@/assets/no-data.png" class="no_data" alt="">
      </div>
    </div>
    <div v-else>
      <!-- 装备信息table -->
      <group :title="detail.compony">
        <x-table>
          <tbody>
          <tr>
            <td rowspan="6" width="30%">
              <img :src="detail.cooler.img" alt="">
            </td>
            <td style="text-align:left;padding:10px 30px;">
              <span style="color:#999;">{{detail.cooler.label}}：</span>
              {{detail.cooler.value}}
            </td>
          </tr>
          <tr v-for="(data,index) in detail.cooler.list" :key="index">
            <td style="text-align:left;padding:10px 30px;">
              <span style="color:#999;">{{data.label}}：</span> {{data.value}}
            </td>
          </tr>
          </tbody>
        </x-table>
      </group>
      <!-- 装备温区table -->
      <group :title="detail['space_title']">
        <x-table>
          <tbody v-for="(data, index) in detail['space']" :key="index">
          <tr>
            <td :rowspan="data.list.length+1" width="30%">{{data.label}}：</td>
            <td></td>
          </tr>
          <tr v-for="(item, index) in data.list" :key="index">
            <td style="text-align:left;padding:10px 30px;">
              <span style="color:#999;">{{item.label}}：</span> {{item.value}}
            </td>
          </tr>
          </tbody>
        </x-table>
      </group>
      <!-- 分割线 -->
      <divider style="padding:30px 0 20px 0">{{detail.info}}</divider>
      <!-- 装备探头信息 -->
      <group :gutter="10" v-for="(items, index) in detail['sensors']" :key="index">
        <cell-form-preview :list="items"></cell-form-preview>
      </group>
    </div>
  </div>
</template>

<script type="es6">
  import {Group, Divider, XTable, CellFormPreview} from 'vux'
  import {getRealtimeDetail} from '@/api/api';

  export default {
    components: {
      Group, Divider, XTable, CellFormPreview
    },
    data() {
      return {
        load_Button: false,
        is_Nodata: false,
        detail: null, //数据
      }
    },
    methods: {
      onCancel() {
        this.load_Button = true;
      },
      //  数据获取
      getDetailData() {
        let _this = this;
        _this.load_Button = false;
        getRealtimeDetail(this.$route.query.id).then((res) => {
          if (res.data && res.data != "") {
            _this.detail = res.data;
          } else {
            _this.is_Nodata = true;
          }
          _this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
        }).catch(function (error) {
          _this.confirm("提示", error.message, "刷新试试", _this.reload, _this.onCancel); //使用main中的全局方法调用弹窗
          _this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
        });
      }
    },
    created() {
      this.getDetailData();
    }
  }
</script>

<style>
  .details img {
    width: 100%;
  }

  .details .vux-table {
    line-height: 1.41176471;
  }
</style>
