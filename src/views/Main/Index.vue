<template>
  <div class="custom_warp hidden-x index" v-cloak>
    <!-- 数据出错时的加载按钮 -->
    <div class="refer_button" @click="getData()" v-if="load_Button">
      <i class="iconfont icon-shuaxin1"> 点击刷新</i>
    </div>
    <div :style="'height:100%;visibility:'+ is_show" v-else>
      <!-- 广告位1 -->
      <div class="ads"
           v-if="Index_data['ads'] && Index_data['ads']['ad1']"
           v-html="Index_data['ads']['ad1']['content']"
           @click="onItemClick(Index_data['ads']['ad1']['link'])">
      </div>
      <!-- banner 广告位 -->
      <div
        v-if="Index_data['ads'] && Index_data['ads']['top_slider'] && Index_data['ads']['top_slider']['content'] && Index_data['ads']['top_slider']['content']!=''">
        <swiper :options="swiperOptionBanner" ref="mySwiper">
          <swiper-slide
            v-for="(item, index) in Index_data['ads']['top_slider']['content']"
            :key="index"
            @click.native="onItemClick(item.link)">
            <img :src="item.img" width="100%" style="display:block;" @load="lazyload_img()">
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <!-- 单位名 -->
      <div v-if="Index_data['info'] && Index_data['info']!=''">
        <group gutter="0">
          <cell :title="Index_data.info.unit_name" :value="Index_data['info']['user_name']"></cell>
        </group>
      </div>
      <!-- 广告位2 -->
      <div class="ads"
           v-if="Index_data['ads'] && Index_data['ads']['ad2']"
           v-html="Index_data['ads']['ad2']['content']"
           @click="onItemClick(Index_data['ads']['ad2']['link'])">
      </div>
      <!-- 常用APP按钮区域 -->
      <div
        v-if="Index_data['apps'] && Index_data['apps']['frequently'] && Index_data['apps']['frequently']['grid']!=''">
        <group
          :title="Index_data['apps']['frequently']['name']">
          <swiper :options="swiperOptionButton" ref="mySwiperButton" style="padding-bottom:35px;">
            <swiper-slide class="black" v-for="(item,index) in Index_data['apps']['frequently']['grid']" :key="index">
              <flexbox :gutter="0" wrap="wrap">
                <flexbox-item :span="1/5" v-for="(obj, index) in item" :key="index"
                              @click.native="onItemClick(obj.link)">
                  <div class="flex-demo app_badge"><img slot="icon" :src="obj.icon" width="100%">
                    <div class="flex-demo">{{obj.label}}</div>
                    <div v-if="obj.warning" class="apps_badge">
                      <badge v-if="obj.warning=='dot'" class="dot"></badge>
                      <badge v-else :text="obj.warning" class="number"></badge>
                    </div>
                  </div>
                </flexbox-item>
              </flexbox>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </group>
      </div>
      <!-- 上下轮播广告位 快讯 -->
      <div v-if="Index_data['ads'] && Index_data['ads']['marquee']">
        <group gutter="0">
          <flexbox :gutter="0" wrap="wrap">
            <flexbox-item :span="3/10">
              <div class="flex-demo ads" style="height:40px;line-height:40px;"
                   v-html="Index_data['ads']['marquee']['title']">
              </div>
            </flexbox-item>
            <flexbox-item :span="6/10">
              <marquee :interval=5000>
                <marquee-item v-for="(item,index) in Index_data['ads']['marquee']['content']" :key="index"
                              @click.native="onItemClick(item.link)" :item-height="40"
                              class="whiteSpace text-ellipsis" v-html="item.content">
                </marquee-item>
              </marquee>
            </flexbox-item>
            <flexbox-item :span="1/10" style="text-align:center;">
              <i class="iconfont icon-youjiantou" style="color:#999;"></i>
            </flexbox-item>
          </flexbox>
        </group>
      </div>
      <!-- APP按钮区域 -->
      <div v-if="Index_data['apps'] && Index_data['apps']['grid'] && Index_data['grid']!=''">
        <group :title="item.name" v-for="(item,index) in Index_data['apps']['grid']" :key="index">
          <flexbox :gutter="0" wrap="wrap" style="padding:10px 5px;">
            <flexbox-item :span="1/5" v-for="(obj, index) in item.grid" :key="index"
                          @click.native="onItemClick(obj.link)">
              <div class="flex-demo app_badge" :class="(obj.link&&obj.link!='')?'':'no_auth'">
                <!-- APP图标 -->
                <img slot="icon" :src="obj.icon" width="100%">{{obj.label}}
                <!-- APP提示红点 -->
                <div v-if="obj.warning" class="apps_badge">
                  <badge v-if="obj.warning=='dot'" :style="{'background': obj.link&&obj.link!=''?'':'#999'}"
                         class="dot"></badge>
                  <badge v-else :text="obj.warning" :style="{'background': obj.link&&obj.link!=''?'':'#999'}"
                         class="number"></badge>
                </div>
              </div>
            </flexbox-item>
          </flexbox>
        </group>
      </div>
      <!-- 广告位3 -->
      <div class="ads"
           v-if="Index_data['ads'] && Index_data['ads']['ad3']"
           v-html="Index_data['ads']['ad3']['content']"
           @click="onItemClick(Index_data['ads']['ad3']['link'])">
      </div>
      <!-- 带简介的列表 -->
      <div v-if="Index_data['apps'] && Index_data['apps']['list'] && Index_data['apps']['list']['grid']!=''">
        <group :title="Index_data['apps']['list']['name']">
          <panel gutter="0" :list="Index_data['apps']['list']['grid']"
                 :type="Index_data['apps']['list']['type']"
                 @on-click-item="jump">
          </panel>
        </group>
      </div>
      <!-- 广告4 -->
      <div class="ads"
           v-if="Index_data['ads']&&Index_data['ads']['ad4']"
           v-html="Index_data['ads']['ad4']['content']"
           @click="onItemClick(Index_data['ads']['ad4']['link'])">
      </div>
    </div>
  </div>
</template>

<script type="es6">
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {getCommon} from '@/api/api';

  export default {
    components: {swiper, swiperSlide},
    data() {
      return {
        is_done: false,  //配合keep-alive判断是否是首次加载
        load_Button: false,  //数据出错时的加载按钮
        is_show: "hidden",  //页面加载完再显示
        Index_data: {}, //首页数据
        //banner轮播初始化,使用swiper4插件,具体Api可查看手册
        swiperOptionBanner: {
          watchOverflow: true, //因为仅有1个slide，swiper无效
          preloadImages: false,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false, //手动滑动或其他操作后自动轮播能继续运行
          },
          loop: true,
          pagination: {
            el: '.swiper-pagination'
          }
        },
        //常用APP滑动初始化
        swiperOptionButton: {
          watchOverflow: true, //因为仅有1个slide，swiper无效
          pagination: {
            el: '.swiper-pagination',
            dynamicBullets: true,
          },
          resistanceRatio: 0, //禁止左右回弹的效果
        },
      }
    },
    methods: {
      //等轮播图片加载出来后显示页面，预防图片造成页面闪动
      lazyload_img() {
        this.is_show = "visible";
      },
      //pannel列表部分跳转
      jump(item) {
        this.onItemClick(item.link);
      },
      //点击事件，使用vue query传递页面参数
      onItemClick(link) {
        if (link && link != "" && link != "javascript:;") {
          this.$router.push(link);
        } else {
          this.alert("提示", "功能暂未开放，敬请期待！", "知道了");
        }
      },
      //警告弹窗取消之后出现刷新按钮
      onCancel() {
        this.load_Button = true;
      },
      //远程加载首页数据
      getData() {
        let _this = this;
        _this.load_Button = false;
        getCommon("/" + _this.$route.params.url.replace(/-/g, "/")).then((res) => {
          _this.Index_data = res.data;
          _this.$nextTick(() => {
            _this.loadingRemove();
            _this.is_done = true;
          });
        }).catch(function (error) {
          _this.is_done = true;
          _this.loadingRemove();
          _this.confirm("提示", error.message, "刷新试试", _this.reload, _this.onCancel); //使用main中的全局方法调用弹窗
        });
      },
    },
    created() {
      this.getData();
    },
    activated() {
      this.$store.state.is_back_index = true; //设置在首页，其他页面全部重新加载数据
      if (this.is_done) {
        if (this.Index_data == {}) {
          this.getData();
        } else {
          this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
        }
      }
    }
  }
</script>

<style lang="less">
  .ads img {
    display: block;
  }

  /* APP部分小红点位置 */
  .app_badge {
    position: relative;
    .dot, .number {
      position: absolute;
    }
    .dot {
      top: 12%;
      left: 68%;
    }
    .number {
      top: 10%;
      left: 60%;
    }
  }
</style>

<style lang="less" scoped>
  .no_auth {
    filter: grayscale(100%);
    opacity: 0.5;
  }

  .flex-demo {
    text-align: center;
    background-clip: padding-box;
    color: #686868;
    font-size: .75rem;
    font-weight: 500;
  }

  .whiteSpace {
    height: 40px;
    line-height: 40px;
    color: #444;
  }
</style>
