<template>
  <div class="nofound" style="height:100vh;">
    <!-- 图片+提示文字 -->
    <div class="flex-demo">
      <x-img :src="src" style="box-shadow:0 0 10px #000;"></x-img>
      <!--<divider><b style="font-size:18px;color: #3EA9F5;">{{Nofound.title}}</b></divider>-->
      <!--<div v-html='Nofound.content'></div>-->
    </div>
    <!-- 底栏按钮 -->
    <box gap="30px 10px">
      <x-button type="primary" plain @click.native="$router.go(-1)">返回上层</x-button>
      <x-button type="primary" @click.native="$router.push('/')">返回首页</x-button>
      <x-button type="warn" @click.native="jump()">重新登录</x-button>
    </box>
  </div>
</template>

<script type="es6">
  export default {
    data() {
      return {
        src: "http://58pic.ooopic.com/58pic/19/42/73/83y58PICW9n.jpg",
        Nofound: {
          title: "冷王科技提醒您",
          content: "你访问的页面丢失了！可进行如下操作 :<br>1、检查网络是否出错<br>2、访问系统其他页面<br>3、联系管理员或客服"
        }
      }
    },
    methods: {
      jump() {
        top.location.href = locationHref;
      }
    },
    mounted() {
      this.loadingRemove(); //  使用main中的全局方法关闭loading
    }
  }
</script>

<style lang="less" scoped>
  .flex-demo {
    text-align: center;
  }
</style>
