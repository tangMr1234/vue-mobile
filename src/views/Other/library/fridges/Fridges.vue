<template>
  <div class="custom_warp hidden" v-cloak>
    <x-header slot="header" :title="$route.name">
      <a slot="right" @click="show">
        <i class="iconfont icon-02sousuo" style="font-size:24px;"></i>
      </a>
    </x-header>
    <!-- 数据出错时的加载按钮 -->
    <div class="refer_button" @click="getIndexMenuData"
         v-show="load_Button"><i
      class="iconfont icon-shuaxin1"> 点击刷新</i></div>
    <!-- 数据展示列表 -->
    <flexbox :gutter="0" style="height:100%;overflow: hidden;" v-if="FridgesMenu.MenuData">
      <!-- 左侧菜单 -->
      <flexbox-item :span="1/4" style="height: 100%;overflow: hidden;background:#f2f2f2;">
        <b-scroll class="wrapper" style="height:calc(100% - 46px);">
          <div class="content">
            <group>
              <cell v-for="(item, index) in FridgesMenu.MenuData" :key="index" :title="item.label"
                    style="background:#f2f2f2;"
                    :class="{leftMenuActive: item.id==FridgesMenu.selected }"
                    @click.native="leftMenuClick(item.id)">
                <i slot="icon" v-if="item.icon&&item.icon!=''" :class="'iconfont'+' '+item.icon"
                   style="background:#fe4a1e;padding:2px;margin-right:4px;font-size:12px;color:#fff;border-radius:3px;"></i>
              </cell>
            </group>
          </div>
        </b-scroll>
      </flexbox-item>
      <!-- 右侧数据 -->
      <flexbox-item :span="3/4" style="height: 100%;position: relative;background:#fff;">
        <b-scroll class="wrapper" :data="FridgesIndexData.list" style="height:calc(100% - 46px);" ref="scroll">
          <div class="content">
            <!-- 面板 -->
            <panel :list="FridgesIndexData.list" :type="FridgesIndexData.type"
                   @on-click-item="showPopupComment"></panel>
            <new-loading v-show="loadingShow" style="position:absolute;width:100%;top:0;left:0;"></new-loading>
          </div>
        </b-scroll>
      </flexbox-item>
    </flexbox>
    <!-- 筛选弹出层 -->
    <div v-transfer-dom>
      <popup v-model="popup_show" position="right" :width="popupWidth">
        <div style="height:100%;">
          <component slot="Popup" :is="component" @reset="submitLoad"></component>
        </div>
      </popup>
    </div>
  </div>
</template>

<script type="es6">
  import NewLoading from '@/components/loading.vue';
  import lwForm from '@/components/filter.vue'
  import {getFridgesIndexMenu, getFridgesIndexList} from '@/api/api';

  export default {
    components: {
      NewLoading,
      lwForm
    },
    data() {
      return {
        load_Button: false,
        component: "", //加载组件
        popupWidth: '87%', //弹出层的宽度设置
        loadingShow: true, //右侧数据加载时的loading
        popup_show: false, //筛选弹出窗
        FridgesMenu: {}, //侧边栏数据
        FridgesIndexData: {}, //右侧列表数据
      }
    },
    methods: {
      //打开详情
      showPopupComment(item) {
        this.$router.push({
          path: 'fridges_detail',
          query: {
            id: item.id
          }
        });
      },
      //打开筛选
      show() {
        this.component = "lwForm";
        this.popup_show = true;
      },
      //弹出的子组件filter调用的父组件index的方法
      submitLoad() {
        this.popup_show = false;
        this.getIndexMenuData();
      },
      //左侧菜单点击事件
      leftMenuClick(id) {
        this.$refs.scroll.scrollTo(0, 0, 0, "");
        if (this.FridgesMenu.selected !== id) {
          this.getIndexListData(id);
        }
        this.FridgesMenu.selected = id;
      },
      //关闭数据加载失败的弹窗后显示刷新按钮
      onCancel() {
        this.load_Button = true;
      },
      //加载leftMenu数据
      getIndexMenuData() {
        let _this = this;
        _this.load_Button = false;
        getFridgesIndexMenu().then((res) => {
          _this.FridgesMenu = res.data;
          _this.getIndexListData(_this.FridgesMenu.selected);
        }).catch(function (error) {
          _this.loadingRemove(); //  使用main中的全局方法关闭loading
          _this.loadingShow = false;
          _this.confirm("提示", error.message, "刷新试试", _this.reload, _this.onCancel); //使用main中的全局方法调用弹窗
        });
      },
      //右侧list数据
      getIndexListData(param) {
        let _this = this;
        _this.loadingShow = true; //数据加载时的loading
        getFridgesIndexList(param).then((res) => {
          _this.FridgesIndexData = res.data;
          _this.loadingShow = false;
          _this.load_Button = false;
        }).catch(function (error) {
          _this.FridgesIndexData = {};
          _this.confirm("提示", error.message, "刷新试试", _this.reload, _this.onCancel); //使用main中的全局方法调用弹窗
          _this.loadingShow = false;
          _this.load_Button = true;
        });
      }
    },
    created() {
      this.getIndexMenuData();
    },
    activated() {
      this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
      this.$refs.scroll.refresh();
    }
  }
</script>

<style scoped rel="stylesheet/less" lang="less">
  img {
    width: 100%;
  }
</style>
<style>
  .leftMenuActive {
    background: #fff !important;
  }
</style>
