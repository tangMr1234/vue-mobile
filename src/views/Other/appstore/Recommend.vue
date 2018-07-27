<template>
  <div class="custom_warp index" v-cloak>
    <div class="hidden-x" style="height:calc(100% - 50px)">
      <router-link :to="data.link" class="app_recom"
                   v-for="(data,index) in Recommend" :key="index"
                   :style="(index===0)?'margin-top:25px;':''">
        <card style="border-radius:10px;">
          <img slot="header" :src="data.img" style="width:100%;display:block;">
          <div slot="content" class="card-padding">
            <p style="color:#999;font-size:12px;">{{data.group}}</p>
            <h1 style="font-size:20px;">{{data.title}}</h1>
            <p style="color:#999;font-size:14px;line-height:1.2;">{{data.comment}}</p>
          </div>
        </card>
      </router-link>
    </div>
    <tabbar style="position:fixed;bottom:0;left:0;width:100%;z-index:9000000;">
      <tabbar-item selected>
        <i slot="icon" class="iconfont icon-tuijian"></i>
        <span slot="label">推荐</span>
      </tabbar-item>
      <tabbar-item>
        <i slot="icon" class="iconfont icon-yingyong"></i>
        <span slot="label">APP</span>
      </tabbar-item>
      <tabbar-item link="/component/demo">
        <i slot="icon" class="iconfont icon-baobiaoguanli"></i>
        <span slot="label">报表</span>
      </tabbar-item>
      <tabbar-item>
        <i slot="icon" class="iconfont icon-anzhuangbao"></i>
        <span slot="label">已购</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script type="es6">
  import {Card} from 'vux'
  import {getIndexData} from '@/api/api';

  export default {
    components: {Card},
    data() {
      return {
        Recommend: [
          {
            img: "//pic.qiantucdn.com/58pic/27/22/00/99h58PICDVx_1024.jpg!/fw/780/watermark/url/L3dhdGVybWFyay12MS40LnBuZw==/align/center",
            group: "冷链监测系统",
            title: "实时温湿度",
            comment: "可查看实时温度、湿度，查看温度曲线",
            link: "/detail"
          }, {
            img: "//pic.qiantucdn.com/58pic/19/31/71/23w58PIC8dE_1024.jpg!/fw/780/watermark/url/L3dhdGVybWFyay12MS4zLnBuZw==/align/center/crop/0x1009a0a0",
            group: "生物制品系统",
            title: "疫苗档案",
            comment: "可查看所有疫苗档案，并对某些档案进行增加修改",
            link: "/detail"
          }, {
            img: "//pic.qiantucdn.com/58pic/27/38/98/76G58PIC2Z5_1024.jpg!/fw/780/watermark/url/L3dhdGVybWFyay12MS40LnBuZw==/align/center",
            group: "冷链监测系统",
            title: "保温箱监测",
            comment: "可查看保温箱温湿度，查看温度曲线，查看当前位置",
            link: "/detail"
          },
        ]
      }
    },
    methods: {},
    // 页面渲染后执行的钩子
    mounted() {
      this.loadingRemove(); //  使用main中的全局方法关闭loading
    }
  }
</script>

<style lang="less" scoped>
  .card-padding {
    padding: 15px;
  }

  .app_recom {
    display: block;
    margin: 10px auto 30px;
    width: 90%;
    border-radius: 10px;
    box-shadow: 0 5px 20px #999;
    color: #000;
  }
</style>
