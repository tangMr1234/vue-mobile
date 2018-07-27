<template>
  <div class="custom_warp hidden">
    <!-- 面板 -->
    <div class="hidden-x" style="height:100%;background:#eee;padding-bottom:20px;">
      <div style="width:92%;margin:0 auto;">
        <router-link v-for="(data, index) in data" :key="index" :to="data.link">
          <group style="box-shadow: 0 0 5px #ddd;">
            <cell>
              <div slot="title" style="padding: 20px 0;">
                <b style="font-size:18px;color:#333;">{{data.title}}</b>
                <div style="color:#999;margin-top:18px;">
                  <p style="margin-bottom:8px;">{{data.comment}}</p>
                  <p>{{data.explain}}</p>
                </div>
              </div>
              <div slot="default">
                <img :src="data.src" style="width:60px;"
                     alt="">
              </div>
            </cell>
          </group>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script type="es6">
  export default {
    data() {
      return {
        data: [
          {
            id: '1',
            title: "所有车辆",
            comment: "查看所有车辆温度状态信息",
            explain: "共100辆，在线30辆",
            src: "http://pic.qiantucdn.com/58pic/28/21/18/67658PICMAK_1024.jpg!/fw/780/watermark/url/L3dhdGVybWFyay12MS40LnBuZw==/align/center/crop/0x1009a0a0",
            link: "list"
          },
          {
            id: '1',
            title: "地理信息（GIS）",
            comment: "查看所有车辆当前位置",
            explain: "如需查看车辆轨迹，请到电脑端查看",
            src: "http://pic.qiantucdn.com/58pic/26/55/77/25K58PICGDz_1024.jpg!/fw/780/watermark/url/L3dhdGVybWFyay12MS4zLnBuZw==/align/center/crop/0x1009a0a0",
            link: "map"
          }
        ]
      }
    },
    mounted() {
      if (!sessionStorage.getItem('warn')) {
        this.alert("提示", "试用应用的演示数据，仅供APP体验，试用期间该弹窗可暂时关闭！", "知道了", this.setSession); //使用main中的全局方法调用弹窗
      }
      this.loadingRemove();
    },
    methods: {
      //设置sessionstorage来打开warn弹窗
      setSession() {
        sessionStorage.setItem('warn', 'yes');
      }
    }
  }
</script>
