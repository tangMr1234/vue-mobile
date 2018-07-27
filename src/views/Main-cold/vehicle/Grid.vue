<template>
  <div class="gridCheck">
    <div ref="textareaHeight">
      <!-- 日期选择器 -->
      <group :gutter="10">
        <flexbox :gutter="0">
          <flexbox-item :span="7/10">
            <datetime v-model="StarTime" placeholder="111" end-date="2018-04-13" format="YYYY-MM-DD HH:mm"
                      @on-change="change"
                      title="开始时间："></datetime>
            <datetime v-model="EndTime" placeholder="111" end-date="2018-04-13" format="YYYY-MM-DD HH:mm"
                      @on-change="change"
                      title="结束时间："></datetime>
          </flexbox-item>
          <flexbox-item>
            <box gap="10px 10px">
              <x-button :gradients="['#409eff', '#409eff']" mini>查询</x-button>
              <x-button mini @click.native="show12 = true">打印</x-button>
            </box>
          </flexbox-item>
        </flexbox>
      </group>
      <!-- table表头 -->
      <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
        <thead>
        <tr style="background-color: #F7F7F7">
          <th width="50%">日期</th>
          <th>温度</th>
        </tr>
        </thead>
      </x-table>
    </div>
    <!-- 可滚动的Table数据 -->
    <!-- 数据加载loading -->
    <div v-show="load"
         :style="'height:'+scrollHeight+'px;overflow: hidden;text-align:center;position:absolute;bottom:0;left:0;z-index:99;background:#fff;width:100%;'">
      <spinner type="spiral" style="position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;"></spinner>
    </div>
    <div :style="'height:'+scrollHeight+'px;overflow: hidden;'" v-show="!load">
      <pull-to>
        <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
          <tbody>
          <tr v-for="data in tableData">
            <td width="50%">{{data.date}}</td>
            <td>{{data.temp}}℃</td>
          </tr>
          </tbody>
        </x-table>
      </pull-to>
    </div>

    <div v-transfer-dom>
      <popup v-model="show12" position="bottom" :hide-on-blur="false">
        <group>
          <radio :options="radio001" @on-change="change"></radio>
        </group>
        <div style="padding: 15px;">
          <x-button @click.native="show12 = false" :gradients="['#409eff', '#409eff']"> 打印</x-button>
          <x-button @click.native="show12 = false" plain> 关闭</x-button>
        </div>
      </popup>
    </div>

  </div>
</template>

<script type="es6">
  import {Group, XTable, Spinner, Datetime, Flexbox, FlexboxItem, XButton, Box, Popup, TransferDom, Radio} from 'vux'
  import PullTo from 'vue-pull-to'

  export default {
    directives: {
      TransferDom
    },
    components: {
      PullTo, Group, XTable, Spinner, Datetime, Flexbox, FlexboxItem, XButton, Box, Popup, Radio
    },
    data() {
      return {
        show12: false,
        radio001: ['打印机1号', '打印机2号', '打印机3号', '打印机4号', '打印机5号'],
        StarTime: "2018-04-12",
        EndTime: "2018-04-13",
        scrollHeight: 0, //设置可滚动区域初始高度
        //  表格数据
        tableData: [
          {date: "2018-03-23 13:54", temp: "30℃，29℃，22℃"},
          {date: "2018-03-23 13:54", temp: "30℃，29℃，22℃"},
          {date: "2018-03-23 13:54", temp: "30℃，29℃，22℃"},
          {date: "2018-03-23 13:54", temp: "30℃，29℃，22℃"},
          {date: "2018-03-23 13:54", temp: "30℃，29℃，22℃"},
          {date: "2018-03-23 13:54", temp: "30℃，29℃，22℃"},
          {date: "2018-03-23 13:54", temp: "30℃，29℃，22℃"},
          {date: "2018-03-23 13:54", temp: "30℃，29℃，22℃"},
          {date: "2018-03-23 13:54", temp: "30℃，29℃，22℃"},
          {date: "2018-03-23 13:54", temp: "30℃，29℃，22℃"},
          {date: "2018-03-23 13:54", temp: "30℃，29℃，22℃"},
          {date: "2018-03-23 13:54", temp: "30℃，29℃，22℃"},
          {date: "2018-03-23 13:54", temp: "30℃，29℃，22℃"},
          {date: "2018-03-29 13:54", temp: "39℃，29℃，22℃"},
        ],
        types: 'spiral',
        load: true
      }
    },
    methods: {
      //日历事件
      onChange(val) {
        console.log('on change', val);
        this.loadData();
      },
      //单选按钮组事件
      change(value, label) {
        console.log(value);
      },
      //数据加载
      loadData() {
        this.load = true;
        setTimeout(() => {
          this.load = false;
        }, 1000)
      },
      //计算可滚动区域的高度
      setscrollHeight() {
        var height = document.documentElement.clientHeight;
        var heightCss = this.$refs.textareaHeight.offsetHeight + 100;
        this.scrollHeight = height - heightCss;
      },
    },
    mounted() {
      this.loadData();
      this.setscrollHeight();
      this.loadingRemove();

      const _this = this;
      //监听窗口大小变化
      window.onresize = () => {
        return (() => {
          _this.setscrollHeight();
        })()
      }
    }
  }
</script>
<style lang="less">
  .gridCheck .weui-check_label {
    float: left;
  }

  .gridCheck .weui-cell:before {
    border-top: none;
  }

  .gridCheck tr:nth-child(even) {
    background: #f7f7f7;
  }
</style>
