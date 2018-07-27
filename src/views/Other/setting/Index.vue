<template>
  <div class="custom_warp hidden">
    <x-header slot="header" :title="this.$route.name" @on-click-back="goBack" :left-options="{preventGoBack: true}">
    </x-header>
    <!-- 面板 -->
    <b-scroll class="wrapper" style="height:calc(100% - 46px);background:#eee;">
      <div class="content" style="width:92%;margin:0 auto;padding-bottom:10px;">
        <group :gutter="10" style="box-shadow: 0 0 5px #ddd;" v-for="(data, index) in data" :key="index"
               @click.native="goList(data.link, data.title)">
          <cell>
            <div slot="title" style="padding: 10px 0;">
              <b style="font-size:18px;color:#333;">{{data.title}}</b>
              <div style="color:#999;margin-top:8px;">
                <p style="margin-bottom:8px;">{{data.comment}}</p>
              </div>
            </div>
            <div slot="default">
              <img :src="data.src" style="width:60px;"
                   alt="">
            </div>
          </cell>
        </group>
      </div>
    </b-scroll>
  </div>
</template>

<script type="es6">
  export default {
    data() {
      return {
        data: [
          {
            id: '1',
            title: "冰箱管理",
            comment: "查看并管理所有冰箱信息",
            src: "//pic.qiantucdn.com/58pic/27/03/36/15m58PICTVR_1024.jpg!/fw/780/watermark/url/L3dhdGVybWFyay12MS4zLnBuZw==/align/center/crop/0x1009a0a0",
            link: "list"
          },
          {
            id: '2',
            title: "探头管理",
            comment: "查看并管理所有探头信息",
            src: "//pic.qiantucdn.com/58pic/27/03/36/15m58PICTVR_1024.jpg!/fw/780/watermark/url/L3dhdGVybWFyay12MS4zLnBuZw==/align/center/crop/0x1009a0a0",
            link: "list"
          },
          {
            id: '3',
            title: "保温箱管理",
            comment: "查看并管理所有xxx",
            src: "//pic.qiantucdn.com/58pic/27/03/36/15m58PICTVR_1024.jpg!/fw/780/watermark/url/L3dhdGVybWFyay12MS4zLnBuZw==/align/center/crop/0x1009a0a0",
            link: "list"
          },
          {
            id: '4',
            title: "车辆管理",
            comment: "查看并管理所有xxx",
            src: "//pic.qiantucdn.com/58pic/27/03/36/15m58PICTVR_1024.jpg!/fw/780/watermark/url/L3dhdGVybWFyay12MS4zLnBuZw==/align/center/crop/0x1009a0a0",
            link: "list"
          },
          {
            id: '5',
            title: "一体机管理",
            comment: "查看并管理所有xxx",
            src: "//pic.qiantucdn.com/58pic/27/03/36/15m58PICTVR_1024.jpg!/fw/780/watermark/url/L3dhdGVybWFyay12MS4zLnBuZw==/align/center/crop/0x1009a0a0",
            link: "list"
          }
        ]
      }
    },
    mounted() {
      if (!sessionStorage.getItem('warn')) {
        this.alert("提示", "试用应用的演示数据，仅供APP体验，试用期间该弹窗可暂时关闭！", "知道了", this.setSession); //使用main中的全局方法调用弹窗
      }
    },
    activated() {
      this.loadingRemove(); //  使用main中的全局方法关闭loading
    },
    methods: {
      //设置sessionstorage来打开warn弹窗
      setSession() {
        sessionStorage.setItem('warn', 'yes');
      },
      //  通过postMessage调用iframe父组件的方法
      goBack() {
        let link = parent.window.location.href.split("#");
        window.parent.postMessage('closeLwFrame', link[0]);
      },
      //  打开列表页
      goList(link, title) {
        sessionStorage.setItem("List_header", title); //设置sessionStorage请求不一样的列表详情页
        this.$router.push(link);
      }
    }
  }
</script>
