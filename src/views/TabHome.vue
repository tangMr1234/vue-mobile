<template>
  <div class="custom_warp">
    <tab :line-width="2">
      <tab-item v-for="(item, index) in tabs" :key="index"
                @on-item-click="onItemClick(item.link)"
                :selected="$route.path === item.link">
        {{item.label}}
      </tab-item>
    </tab>
    <div class="hidden-x" style="height:calc(100vh - 90px);">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </div>
</template>

<script type="es6">
  import {Tab, TabItem} from 'vux'

  export default {
    components: {
      Tab, TabItem
    },
    data() {
      return {
        tabs: [
          {id: 1, label: "装备详情", link: '/detail'},
          {id: 2, label: "温度曲线", link: '/curve'},
          {id: 3, label: "温度列表", link: '/grid'},
        ]
      }
    },
    methods: {
      //Tab点击跳转事件
      onItemClick(link) {
        this.$router.push({
          path: link,
          query: {
            id: this.$route.query.id
          }
        });
      }
    }
  }
</script>
