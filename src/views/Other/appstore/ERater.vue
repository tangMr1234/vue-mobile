<template>
  <div style="background: #fff;">
    <!-- 顶部图文标题 -->
    <div v-for="(item, index) in app_data" :key="index">
      <flexbox v-for="(data, index) in item.app" :key="index">
        <flexbox-item :span="2/5"><img :src="data.icon" alt="" style="width:100%;"></flexbox-item>
        <flexbox-item>
          <h2 style="font-size:22px;">实时温湿度</h2>
          <div>服务到期时间：2018-09-10</div>
        </flexbox-item>
      </flexbox>
    </div>
    <!-- 评分 -->
    <group :gutter="0">
      <cell>
        <div slot="title">
          <div style="margin-bottom:10px;">
            APP应用分：
            <rater v-model="app" active-color="#409eff"></rater>
          </div>
          <div>开发团队分：
            <rater v-model="team" active-color="#409eff"></rater>
          </div>
        </div>
      </cell>
      <x-textarea :max="150" :height="200" placeholder="请输入评价" @on-focus="onEvent('focus')"
                  @on-blur="onEvent('blur')"></x-textarea>
    </group>
    <!-- 提交按钮 -->
    <box gap="10px 10px">
      <x-button :gradients="['#1D62F0', '#19D5FD']">提交</x-button>
    </box>
  </div>
</template>

<script type="es6">
  import {Flexbox, FlexboxItem, XTextarea, XButton, Box, Rater, Group, Cell} from 'vux'
  import {getMessage} from '@/api/api';

  export default {
    components: {
      Flexbox, FlexboxItem, XTextarea, XButton, Box, Rater, Group, Cell
    },
    data() {
      return {
        app: '0', //应用评分
        team: '0', //团队评分
        app_data: [
          {
            label: "冷链监测",
            link: "detail",
            app: [
              {
                id: 1,
                icon: "https://dev4.coldyun.com/static/images/icon/icon_ll_cljc.png",
                title: "管理评估表",
                content: "到期时间：2018年11月30日",
                disabled: true,
                cirle: false,
                percent: 1
              }
            ]
          }
        ]
      }
    },
    methods: {
      onEvent(event) {
        console.log('on', event)
      }
    },
    mounted() {
      this.loadingRemove(); //  使用main中的全局方法关闭loading
    }
  }
</script>

<style scoped rel="stylesheet/less" lang="less">
  .card-padding {
    padding: 15px;
  }
</style>
