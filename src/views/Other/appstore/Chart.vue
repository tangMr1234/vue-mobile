<template>
  <div>
    <group v-for="(item, index) in app_data" :key="index" :title="item.label">
      <cell primary="content" v-for="(data, index) in item.app" :key="index">
        <!-- 应用图标 -->
        <img slot="icon" :src="data.icon" style="width:80px;" alt="" @click="$router.push('/'+item.link)">
        <!-- 应用内容 -->
        <div slot="title" @click="$router.push('/'+item.link)">
          <h2>{{data.title}}</h2>
          <p style="color:#999;">{{data.content}}</p>
        </div>
        <!-- 安装按钮 -->
        <x-button slot="default" mini plain @click.native="install(data)" v-show="!data.cirle" :disabled="data.disabled"
                  style="width:85px;">{{(data.disabled===false)?'添加':'已添加'}}
        </x-button>
        <!-- 安装进度 -->
        <div slot="default" style="width:85px;float:right;" v-if="data.disabled===false" v-show="data.cirle">
          <div style='width:40px;height:40px;margin:0 auto;'>
            <x-circle :percent="data.percent" :stroke-width="6" :trail-width="6" stroke-color="#409eff"
                      trail-color="#ececec">
              <span :style="{color: strokeColor2}">{{data.percent}}%</span>
            </x-circle>
          </div>
        </div>
      </cell>
    </group>
  </div>
</template>

<script type="es6">
  import {Group, Cell, XButton, XCircle} from 'vux'
  import {getMessage} from '@/api/api';

  export default {
    components: {
      Group, Cell, XButton, XCircle
    },
    data() {
      return {
        strokeColor2: '#409eff', //安装进度条颜色
        app_data: [
          {
            label: "冷链监测",
            link: "detail",
            app: [
              {
                id: 1,
                icon: "https://dev4.coldyun.com/static/images/icon/icon_ll_cljc.png",
                title: "管理评估表",
                content: "可以查看所有管理评估表",
                disabled: true,
                cirle: false,
                percent: 1
              },
              {
                id: 2,
                icon: "https://dev4.coldyun.com/static/images/icon/icon_ll_cljc.png",
                title: "管理评估表",
                content: "可以查看所有管理评估表",
                disabled: false,
                cirle: false,
                percent: 1
              }
            ]
          }, {
            label: "生物制品",
            link: "detail",
            app: [
              {
                id: 12000,
                icon: "https://dev4.coldyun.com/static/images/icon/icon_sw_ymda.png",
                title: "管理评估表",
                content: "可以查看所有管理评估表",
                disabled: false,
                cirle: false,
                percent: 1
              },
              {
                id: 10000,
                icon: "https://dev4.coldyun.com/static/images/icon/icon_sw_ymda.png",
                title: "管理评估表",
                content: "可以查看所有管理评估表",
                disabled: false,
                cirle: false,
                percent: 1
              }, {
                id: 13000,
                icon: "https://dev4.coldyun.com/static/images/icon/icon_sw_ymda.png",
                title: "管理评估表",
                content: "可以查看所有管理评估表",
                disabled: false,
                cirle: false,
                percent: 1
              }
            ]
          }
        ]
      }
    },
    methods: {
      install(item) {
        item.percent = 1;
        item.cirle = true;
        let timer = setInterval(function () {
          if (item.percent < 100) {
            if (item.percent + 10 <= 100) {
              item.percent = item.percent + 10
            } else {
              item.percent2 = 100;
              item.cirle = false;
              item.disabled = true;
              window.clearInterval(timer);
            }
          }
          console.log(item.percent);
        }, 300);
      }
    },
    mounted() {
      this.loadingRemove(); //  使用main中的全局方法关闭loading
    }
  }
</script>
