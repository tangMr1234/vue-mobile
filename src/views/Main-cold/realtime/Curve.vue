<template>
  <section>
    <!-- 日期选择器 -->
    <group>
      <calendar @on-change="onChange" v-model="demo4" title="选择查看日期" show-popup-header popup-header-title="选择查看日期"
                disable-future :replace-text-list="replaceTextList"></calendar>
    </group>
    <div v-if="data==null">
      <!-- 数据出错时的加载按钮 -->
      <div class="refer_button" @click="getCurveData"
           v-show="load_Button">
        <i class="iconfont icon-shuaxin1"> 点击刷新</i>
      </div>
      <!-- 暂无数据的显示 -->
      <div v-show="is_Nodata">
        <img src="@/assets/no-data.png" class="no_data" alt="">
      </div>
    </div>
    <!-- F2图表 -->
    <div v-else>
      <group>
        <v-chart :data="data">
          <v-scale y field="percent" :formatter="formatter"/>
          <v-tooltip show-x-value/>
          <v-line series-field="type"/>
        </v-chart>
      </group>
    </div>
  </section>
</template>

<script>
  import {VChart, VLine, VAxis, VTooltip, VScale, Group, Calendar} from 'vux'
  import {getRealtimeGridCurve} from '@/api/api';

  export default {
    components: {
      VChart, VLine, VAxis, VTooltip, VScale, Group, Calendar
    },
    data() {
      return {
        formatter: function (val) {
          return val + '℃'
        },
        load_Button: false,
        is_Nodata: false,
        demo4: 'TODAY',
        replaceTextList: {
          'TODAY': '今'
        },
        data: null, //曲线图数据
      }
    },
    methods: {
      //日历事件
      onChange(val) {
        let date = timestamp(val);
        this.getCurveData(date);
      },
      onCancel() {
        this.load_Button = true;
      },
      //  数据获取
      getCurveData(date) {
        let _this = this;
        _this.load_Button = false;
        let param = {
          id: _this.$route.query.id,
          start_time: date
        }
        getRealtimeGridCurve(param).then((res) => {
          let arr = [];
          for (var i = 0; i < res.data.sensors.length; i++) {
            for (var j = 0; j < res.data.sensors[i].data.length; j++) {
              let obj = {};
              obj['date'] = res.data.sensors[i].data[j].date.split(" ")[1];
              obj['value'] = Number(res.data.sensors[i].data[j].temp);
              obj['type'] = res.data.sensors[i].name;
              obj['time'] = res.data.sensors[i].data[j].date;
              arr.push(obj);
            }
          }
          //判断是否有数据
          if (arr != "") {
            //数据按顺序排列
            arr.sort(function (a, b) {
              return Date.parse(a.time.replace(/-/g, "/")) - Date.parse(b.time.replace(/-/g, "/"));//时间正序
            });
            _this.data = arr;
          } else {
            _this.is_Nodata = true;
          }
          _this.loadingRemove();
        }).catch(function (error) {
          _this.confirm("提示", error.message, "刷新试试", _this.reload, _this.onCancel); //使用main中的全局方法调用弹窗
          _this.loadingRemove();
        });
      }
    },
    created() {

    }
  }
</script>
