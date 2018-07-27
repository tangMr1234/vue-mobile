<template>
  <div class="custom_warp hidden-x">
    <!-- 数据出错时的加载按钮 -->
    <div class="refer_button" @click="" v-show="load_Button"><i
      class="iconfont icon-shuaxin1"> 点击刷新</i></div>
    <!-- 列表 -->
    <div style="padding: 66px 0;">
      <flexbox orient="vertical" v-if="$route.meta.type==='code'">
        <flexbox-item>
          <div class="flex-demo"><img src="@/assets/coldchain56.png" width="200"></div>
        </flexbox-item>
        <flexbox-item>
          <div class="flex-demo">智慧冷链</div>
        </flexbox-item>
      </flexbox>
      <flexbox orient="vertical" v-else>
        <flexbox-item>
          <div class="flex-demo"><img src="@/assets/bq-logo.png" width="200"></div>
        </flexbox-item>
        <flexbox-item v-for="(data, index) in list" :key="index">
          <div class="flex-demo">{{data.label}}：{{data.value}}</div>
        </flexbox-item>
      </flexbox>
    </div>
  </div>
</template>

<script type="es6">

  export default {
    data() {
      return {
        load_Button: false,
        list: [
          {
            label: '冷王智能科技有限公司',
            value: '版权所有'
          }, {
            label: '当前版本',
            value: '1.0.0'
          }, {
            label: '发布时间',
            value: '2018-03-06'
          }
        ]
      }
    },
    methods: {
      //警告弹窗取消之后出现刷新按钮
      onCancel() {
        this.load_Button = true;
      }
    },
    activated() {
      this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
    }
  }
</script>

<style lang="less" scoped>
  .flex-demo {
    text-align: center;
  }
</style>
