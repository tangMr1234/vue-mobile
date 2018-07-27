<template>
  <div class="gridCheck custom_warp">
    <!-- 滚动数据 -->
    <div ref="grid">
      <div ref="textareaHeight">
        <!-- 日期选择器 -->
        <group>
          <calendar @on-change="onChange"
                    v-model="demo4"
                    title="选择查看日期"
                    :replace-text-list="replaceTextList"
                    show-popup-header popup-header-title="选择查看日期"
                    disable-future>
          </calendar>
        </group>
        <!-- 探头单选组 -->
        <checklist title="选择探头"
                   :options="commonList"
                   :min="1" :max="1"
                   v-model="radioValue"
                   required
                   @on-change="change">
        </checklist>
      </div>
      <!-- 滚动中的table表头 -->
      <sticky>
        <x-table :cell-bordered="false" :content-bordered="false">
          <thead>
          <tr style="background-color: #F7F7F7">
            <th width="40%">日期</th>
            <th width="30%">温度</th>
            <th width="30%">湿度</th>
          </tr>
          </thead>
        </x-table>
      </sticky>
      <!-- 数据加载loading -->
      <new-loading
        v-show="isLoading"
        :style="'height:'+scrollHeight+'px;overflow: hidden;position:absolute;bottom:0;left:0;z-index:399;background:#fff;width:100%;'">
      </new-loading>
      <!-- 数据table部分 -->
      <div v-show="!isLoading">
        <!-- 数据出错的加载按钮||暂无数据 的提示-->
        <div v-if="!tableData||tableData==''">
          <div class="refer_button" @click="onChange" v-show="load_Button">
            <i class="iconfont icon-shuaxin1"> 点击刷新</i>
          </div>
          <div v-show="is_Nodata">
            <img src="@/assets/no-data.png" class="no_data" alt="">
          </div>
        </div>
        <!-- 可滚动Table数据 -->
        <x-table v-else :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
          <tbody>
          <tr v-for="(data, index) in tableData" :key="index">
            <td width="40%">{{data.date}}</td>
            <td width="30%">{{data.temp}}℃</td>
            <td width="30%">{{data.humi}}% RH</td>
          </tr>
          </tbody>
        </x-table>
      </div>
    </div>
  </div>
</template>

<script type="es6">
  import {Group, Calendar, Checklist, XTable, Sticky} from 'vux'
  import NewLoading from '@/components/loading.vue';
  import {getRealtimeGridCurve} from '@/api/api';

  export default {
    components: {
      NewLoading, Group, Calendar, Checklist, XTable, Sticky
    },
    data() {
      return {
        load_Button: false, //数据加载错误时的刷新按钮
        is_Nodata: false, //判断是否有数据
        isLoading: false, //加载动画是否显示
        demo4: 'TODAY', //日期选择的默认值
        replaceTextList: {'TODAY': '今'}, //日历今天显示“今”字
        scrollHeight: 0, //设置可滚动区域初始高度
        commonList: [], //单选列表数据
        radioValue: [], //单选列表选中
        tableData: [],//  表格数据
        localData: [], //临时存储数据
      }
    },
    methods: {
      //计算loading高度
      setscrollHeight() {
        var height = document.documentElement.clientHeight; //因为获取的是可视高度所以要减去导航的高度90和padding20的高度
        var heightCss = this.$refs.textareaHeight.offsetHeight + 110;
        this.scrollHeight = height - heightCss;
      },
      //日历事件
      onChange(val) {
        let date = timestamp(val);
        this.getGridData(date);
      },
      //单选按钮组事件
      change(val, label) {
        this.data_filter(label);
      },
      //根据选中探头筛选需要展示的数据
      data_filter(label) {
        let _this = this;
        if (label != "") {
          _this.isLoading = true;
          if (_this.localData.sensors && _this.localData.sensors != '') {
            var filter_Data = _this.localData.sensors.filter(function (e) {
              return e.name == label;
            });
            //判断是否有数据
            if (filter_Data[0].data != "") {
              for (var i = 0; i < filter_Data.length; i++) {
                _this.tableData = filter_Data[i].data;
              }
            } else {
              _this.is_Nodata = true;
            }
            setTimeout(() => {
              _this.isLoading = false;
            }, 200);
          }
        } else {
          _this.tableData = "";
        }
      },
      onCancel() {
        this.load_Button = true;
      },
      //  数据获取
      getGridData(date) {
        let _this = this;
        _this.load_Button = false;
        _this.isLoading = true;
        let param = {
          id: _this.$route.query.id,
          start_time: date
        };
        getRealtimeGridCurve(param).then((res) => {
          _this.localData = res.data;
          // 选择框数据
          _this.radioValue = [];
          _this.commonList = [];
          _this.radioValue.push(_this.localData.sensors[0].name);
          _this.data_filter(_this.radioValue);
          for (var i = 0; i < _this.localData.sensors.length; i++) {
            _this.commonList.push(_this.localData.sensors[i].name);
          }
          _this.$nextTick(function () {
            _this.setscrollHeight();
          });
          _this.isLoading = false;
          _this.loadingRemove();
        }).catch(function (error) {
          _this.load_Button = true;
          _this.isLoading = false;
          _this.confirm("提示", error.message, "刷新试试", _this.reload, _this.onCancel); //使用main中的全局方法调用弹窗
          _this.loadingRemove();
        });
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
