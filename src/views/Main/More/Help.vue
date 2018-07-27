<template>
  <div class="custom_warp hidden-x help" style="background:#fff;">
    <!-- 数据出错时的加载按钮 -->
    <div class="refer_button" @click="" v-show="load_Button"><i
      class="iconfont icon-shuaxin1"> 点击刷新</i></div>
    <!-- 帮助列表 -->
    <div style="padding: 0 10px;">
      <div v-for="(item, index) in data" :key="index">
        <group gutter="10px">
          <cell style="background-color: #f0f5f5;" :title="index+1+'. '+item.label"></cell>
        </group>
        <p style="padding: 10px 30px 0;font-size:14px; text-align: justify;line-height:25px;">{{item.value}}</p>
      </div>
    </div>
  </div>
</template>

<script type="es6">

  export default {
    data() {
      return {
        load_Button: false,
        data: [
          {
            label: '如何使用冷链系统',
            value: '应用商店下载或者冷王官网扫码下载后,系统人员开设账号便可使用。'
          }, {
            label: '为什么系统不能自由注册',
            value: ' 如果您要预约其他日期号源就诊，注册并登录APP后，点击“预约”，再选择您要就诊的科室，选择您要就诊的医生，选择合适的就诊时间，选择您绑定的就诊卡，点击确定即可完成预约。'
          }, {
            label: '其他问题',
            value: '您在医院就诊的报告单生成之后，可在首页“报告单查询”中点击查看，依次点击每条报告单，即可查看该报告单的具体数据。'
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

<style lang="less">
  .flex-demo {
    text-align: center;
  }

  .help .weui-cells {
    border-left: 3px solid #56c5fe;
  }
</style>
