<template>
  <div class="custom_warp hidden">
    <x-header slot="header" :title="this.$route.name"></x-header>
    <!-- 面板 -->
    <div style="height:calc(100% - 46px);">
      <p-map></p-map>
    </div>
  </div>
</template>

<script type="es6">
  import {XHeader} from 'vux'

  export default {
    components: {
      XHeader,
      PMap: resolve => {
        require(['@/views/Map/PMap.vue'], resolve)
      }
    },
    data() {
      return {}
    },
    mounted() {

    },
    methods: {}
  }
</script>
