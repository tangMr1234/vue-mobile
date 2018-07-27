<template>
  <div>
    <div v-transfer-dom>
      <loading :show="show1" :text="text1"></loading>
    </div>
  </div>
</template>

<script type="es6">
  import {base64} from 'vux'

  export default {
    data() {
      return {
        show1: false,
        text1: '登录中'
      }
    },
    methods: {
      show1change() {
        let _this = this;
        _this.show1 = true;
        tick(0, (percent) => {
          if (percent === 100) {
            _this.show1 = false;
            if (_this.$utils.getUrlKey("call_back") && _this.$utils.getUrlKey("call_back") != null && _this.$utils.getUrlKey("call_back") !== "undefined") {
              top.location.href = base64.decode(_this.$utils.getUrlKey("call_back"));
            } else {
              _this.$router.push("/");
            }
          }
          _this.text1 = percent + '%';
        })
      },
      //获取菜单失败的时候获取和判断back_url是否存在
      goBack() {
        if (this.$is_exist(this.$router.query) && this.$is_exist(this.$router.query.back_url)) {
          top.location.href = locationHref + "?back_url=" + this.$router.query.back_url;
        } else {
          top.location.href = locationHref;
        }
      }
    },
    mounted() {
      this.loadingRemove();
      this.show1change();
    }
  }

  function tick(i, cb) {
    setTimeout(function () {
      i++;
      cb(i);
      if (i < 100) {
        tick(i, cb)
      }
    }, 10)
  }
</script>
