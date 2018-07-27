<template>
  <div class="custom_warp hidden-x">
    <!-- 数据出错时的加载按钮 -->
    <div class="refer_button" @click="" v-show="load_Button"><i
      class="iconfont icon-shuaxin1"> 点击刷新</i></div>
    <group>
      <cell :title="company" :value="slogan"></cell>
      <cell-form-preview v-for="(data, index) in list" :key="index" :list="data"></cell-form-preview>
    </group>
  </div>
</template>

<script type="es6">

  export default {
    data() {
      return {
        load_Button: false,
        company: "冷王智能科技",
        slogan: "感知温度，守护健康",
        list: {
          list1: [
            {
              label: '公司',
              value: '上海冷王智能科技有限公司'
            }, {
              label: '地址',
              value: '上海市嘉定区爱特路855号606室'
            }, {
              label: '客服电话',
              value: '021-69001566'
            }
          ],
          list2: [
            {
              label: '公司',
              value: '苏州冷王网络科技有限公司'
            }, {
              label: '地址',
              value: '苏州市吴中区若水路388号E幢702室'
            }, {
              label: '客服电话',
              value: '0512-89573903'
            }
          ],
          list3: [
            {
              label: '公司',
              value: '广州冷王信息科技有限公司'
            }, {
              label: '地址',
              value: '广州市天河区中山大道西1112号417室'
            }, {
              label: '客服电话',
              value: '0512-89573903'
            }
          ]
        }
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
