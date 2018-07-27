<template>
  <div class="custom_warp hidden-x">
    <!-- 数据出错时的加载按钮 -->
    <div class="refer_button" @click="getData" v-show="load_Button">
      <i class="iconfont icon-shuaxin1"> 点击刷新</i>
    </div>
    <!-- 列表 -->
    <group v-if="moreData['info']">
      <cell v-for="(data, index) in moreData['info']" :key="index"
            :title="data['label']"
            :is-link="data['is_link']"
            :value="data['value']"
            @click.native="open(data['link'], data['is_link'])">
        <div slot="icon" :style="'color:'+data['icon_color']">
          <i :class="'iconfont'+' '+data['icon']" style="display:block;font-size: 26px;margin-right:5px;"></i>
        </div>
      </cell>
    </group>
  </div>
</template>

<script type="es6">
  import {getCommon} from '@/api/api';

  export default {
    data() {
      return {
        is_done: false,  //配合keep-alive判断是否是首次加载
        moreData: [],
        load_Button: false,
      }
    },
    methods: {
      //  页面跳转
      open(link, isLink) {
        if (isLink) {
          if (link && link != "" && link != "javascript:;") {
            this.$router.push({path: link});
          } else {
            this.alert("提示", "功能暂未开放，敬请期待！", "知道了");
          }
        }
      },
      //警告弹窗取消之后出现刷新按钮
      onCancel() {
        this.load_Button = true;
      },
      //获取更多页面数据
      getData() {
        let _this = this;
        _this.load_Button = false;
        getCommon("/" + _this.$route.params.url.replace(/-/g, "/")).then((res) => {
          _this.moreData = res.data;
          _this.$nextTick(() => {
            _this.loadingRemove();
            _this.is_done = true;
          });
        }).catch(function (error) {
          _this.loadingRemove();
          _this.is_done = true;
          _this.confirm("提示", error.message, "刷新试试", _this.reload, _this.onCancel); //使用main中的全局方法调用弹窗
        });
      }
    },
    created() {
      this.getData();
    },
    activated() {
      if (this.is_done) {
        this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
      }
    }
  }
</script>
