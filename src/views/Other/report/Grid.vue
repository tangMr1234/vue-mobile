<template>
  <div class="gridCheck">
    <!-- 数据加载loading -->
    <div v-show="load"
         style="height:100%;overflow: hidden;text-align:center;position:absolute;bottom:0;left:0;z-index:99;background:#fff;width:100%;">
      <spinner type="spiral" style="position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;"></spinner>
    </div>
    <!-- Table数据 -->
    <div style="height:100%;overflow: hidden;" v-show="!load">
      <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
        <thead>
        <tr style="background-color: #F7F7F7">
          <th width="40%">日期</th>
          <th width="30%">温度</th>
          <th width="30%">湿度</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="data in tableData">
          <td width="40%">{{data.date}}</td>
          <td width="30%">{{data.temp}}℃</td>
          <td width="30%">{{data.humi}}% RH</td>
        </tr>
        </tbody>
      </x-table>
    </div>
  </div>
</template>

<script type="es6">
  import {Group, XTable, Spinner} from 'vux'

  export default {
    components: {
      Group, XTable, Spinner
    },
    data() {
      return {
        table:{
          list:[]
        },
        //  表格数据
        tableData: [
          {date: "2018-03-23 13:54", temp: "30", humi: "70"},
          {date: "2018-03-23 13:54", temp: "30", humi: "70"},
          {date: "2018-03-23 13:54", temp: "30", humi: "70"},
          {date: "2018-03-23 13:54", temp: "30", humi: "70"},
          {date: "2018-03-23 13:54", temp: "30", humi: "70"},
          {date: "2018-03-23 13:54", temp: "30", humi: "70"},
          {date: "2018-03-23 13:54", temp: "30", humi: "70"},
          {date: "2018-03-23 13:54", temp: "39", humi: "70"},
          {date: "2018-03-23 13:54", temp: "10", humi: "90"},
          {date: "2018-03-23 13:54", temp: "30", humi: "20"},
          {date: "2018-03-23 13:54", temp: "10", humi: "90"},
          {date: "2018-03-23 13:54", temp: "30", humi: "20"},
          {date: "2018-03-23 13:54", temp: "10", humi: "90"},
          {date: "2018-03-23 13:54", temp: "130", humi: "20"},
        ],
        types: 'spiral',
        load: true
      }
    },
    methods: {
      //数据加载
      loadData() {
        this.load = true;
        setTimeout(() => {
          this.load = false;
        }, 1000)
      }
    },
    mounted() {
      this.loadData();
      this.loadingRemove();
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
