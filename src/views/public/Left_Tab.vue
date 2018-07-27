<template>
  <div class="custom_warp hidden">
    <!-- 导航条 -->
    <x-header slot="header" :title="header_title">
      <a slot="left" @click="$router.push('/')">关闭</a>
      <a slot="right" @click="jump">
        <small style="vertical-align: top;">{{right_button_title}}</small>
      </a>
    </x-header>
    <!-- 数据展示列表 -->
    <flexbox :gutter="0" class="scroll" style="height: calc(100% - 46px);overflow: hidden;">
      <!-- 左侧菜单 -->
      <flexbox-item :span="1/4" style="height: 100%;overflow: hidden;background:#f2f2f2;">
        <ScrollPosition style="height: 100%;overflow-x: hidden;" class="LeftView" id="LeftView"
                        @scrollTop="lefthandleScroll">
          <group>
            <cell v-for="(item, index) in MenuData" :key="index" :title="item.title"
                  style="background:#f2f2f2;" :class="{leftMenuActive: index==selectItem }"
                  @click.native="leftMenuClick(index, item)">
            </cell>
          </group>
        </ScrollPosition>
      </flexbox-item>
      <!-- 右侧数据 -->
      <flexbox-item :span="3/4" style="height:100%;">
        <ScrollPosition style="height: 100%;position: relative;" @scrollTop="righthandleScroll"
                        :style="loadingShow==true?'':'overflow-x: hidden;'" class="RightView" id="RightView">
          <group gutter="0">
            <cell v-for="(data,index) in list" :key="index" @click.native="showPopupComment(data)">
              <div slot="title">
                <span style="color:#409eff;">{{data.title}}</span>
              </div>
              <div slot="inline-desc" style="margin-top:10px;">
                {{data.description}}
                <div v-if="data.tags&&data.tags!=''">
                  <span v-for="(item,index) in data.tags" style="margin-right:5px;" v-html="item"></span></div>
              </div>
            </cell>
          </group>
          <divider><i class="iconfont icon-xiaoliansmiley40"></i> 已经到底了</divider>
          <new-loading v-show="loadingShow" style="position:absolute;width:100%;top:0;left:0;"></new-loading>
        </ScrollPosition>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script type="es6">
  import {getCommon} from '@/api/api';

  export default {
    components: {
      NewLoading: resolve => {
        require(['@/components/loading.vue'], resolve)
      },
      ScrollPosition: resolve => {
        require(['@/components/scrollPosition.vue'], resolve)
      }
    },
    data() {
      return {
        loadingShow: true, //数据加载时右侧的loading
        MenuData: [], //左侧菜单数据
        selectItem: 0, //当前选中
        is_selectItem: null,  //存储前一个当前选中
        header_title: null, //顶部标题
        list: [],  //右侧列表数据
        right_button_link: null,  //头部右侧按钮链接
        right_button_title: null, //头部右侧按钮文字
        left_scroll: 0,
        right_scroll: 0,
      }
    },
    methods: {
      //设置sessionstorage来打开warn弹窗
      setSession() {
        sessionStorage.setItem('warn', 'yes');
      },
      //全部与我的之间的切换
      jump() {
        this.$router.push(this.right_button_link);
        this.selectItem = 0;
        this.setScrollTop();
        document.querySelector('.LeftView').scrollTo(0, 0);
        this.Left_scroll = 0;
      },
      //打开详情
      showPopupComment(item) {
        this.$router.push({
          path: item.link
        });
      },
      //左侧菜单点击事件
      leftMenuClick(index, item) {
        if (this.is_selectItem != index) {
          this.is_selectItem = this.selectItem = index;
          this.getData(item['url']);
          this.setScrollTop();
        }
      },
      //加载菜单
      getMenu() {
        let _this = this;
        _this.loadingShow = true;
        getCommon("/" + _this.$route.params.url.replace(/-/g, "/")).then((res) => {
          _this.header_title = res.data.header;
          _this.right_button_title = res.data.mobile.header.right_button.text;
          _this.right_button_link = res.data.mobile.header.right_button.link;
          _this.MenuData = res.data.tabs.list;
          _this.getData(res.data.tabs.list[0].url);
        }).catch(function (error) {
          _this.loadingShow = false;
          _this.loadingRemove();
          _this.confirm("提示", error.message, "刷新试试", _this.reload, _this.onCancel); //使用main中的全局方法调用弹窗
        });
      },
      //加载右侧数据
      getData(para) {
        //远程加载首页数据
        let _this = this;
        _this.loadingShow = true; //数据加载时的loading
        getCommon(para).then((res) => {
          _this.list = res.data.list;
          _this.loadingShow = false;
          _this.loadingRemove();
        }).catch(function (error) {
          _this.loadingShow = false;
          _this.loadingRemove();
          _this.confirm("提示", error.message, "刷新试试", _this.reload, _this.onCancel); //使用main中的全局方法调用弹窗
        });
      },
      // 设置滚动条位置为0公用
      setScrollTop() {
        document.querySelector('.RightView').scrollTo(0, 0);
        this.right_scroll = 0;
      },
      //记录滚动条位置
      lefthandleScroll(position) {
        this.left_scroll = position;
      },
      //记录滚动条位置
      righthandleScroll(position) {
        this.right_scroll = position;
      }
    },
    created() {
      this.getMenu();
    },
    mounted() {
      if (!sessionStorage.getItem('warn')) {
        // this.alert("提示", "试用应用的演示数据，仅供APP体验，试用期间该弹窗可暂时关闭！", "知道了", this.setSession); //使用main中的全局方法调用弹窗
      }
    },
    watch: {
      "$route": function (ne, old) {
        if (ne.path == this.right_button_link) {
          this.getMenu();
        }
      }
    },
    activated() {
      if (this.$store.state.edit_state) {
        this.getMenu();
        this.$store.state.edit_state = false;
      }
      if (this.left_scroll > 0) {
        document.querySelector('.LeftView').scrollTo(0, this.left_scroll);
        this.left_scroll = 0;
      }
      if (this.right_scroll > 0) {
        document.querySelector('.RightView').scrollTo(0, this.right_scroll);
        this.right_scroll = 0;
      }
      this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
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
