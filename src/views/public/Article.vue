<template>
  <section class="details custom_warp" v-if="data&&data['article']">
    <!-- 数据出错时的加载按钮 -->
    <div class="refer_button" v-if="load_Button" @click="getData()">
      <i class="iconfont icon-shuaxin1"> 点击刷新</i>
    </div>
    <card v-else>
      <!-- 标题及来源 -->
      <div slot="header" style="margin:30px 15px 0;">
        <div style="font-size:22px;">{{data['article']['title']}}</div>
        <div class="lw-color-gray">
          {{data['article']['update_time']}}
          <a style="color:#607fa6;margin-left:10px;">{{data['article']['author']}}</a>
          <a style="color:#409eff;margin-left:10px;">{{data['article']['description']}}</a>
        </div>
      </div>
      <!-- 文章 -->
      <div slot="content" class="card-padding" style="margin-top:10px;">
        <div v-html="data['article']['content']"></div>
        <br>
        <divider>{{data['more']['title']}}</divider>
        <br>
        <!-- 公众号之类的 -->
        <div style="text-align:center;">{{data['more']['content']}}</div>
        <!-- 文章换篇 -->
        <flexbox>
          <flexbox-item>
            <div v-if="data['prev']&&data['prev']!=''" class="text-ellipsis" style="display:block;color:#409eff;"
                 @click="jump(data['prev']['link'])">
              <span>上一篇：</span><span>{{data['prev']['title']}}</span>
            </div>
            <div v-else class="lw-color-gray">没有上一篇了</div>
          </flexbox-item>
          <flexbox-item :span="1/6">
            <div
              style="border-radius:100%;background:#eee;width:50px;height:50px;line-height:50px;text-align:center;margin:30px auto">
              完
            </div>
          </flexbox-item>
          <flexbox-item>
            <div v-if="data['next']&&data['next']!=''" class="text-ellipsis"
                 style="display:block;color:#409eff;text-align:right;" @click="jump(data['next']['link'])">
              <span>下一篇：</span><span>{{data['next']['title']}}</span>
            </div>
            <div v-else class="lw-color-gray" style="display:block;text-align:right;">没有下一篇了</div>
          </flexbox-item>
        </flexbox>
      </div>
    </card>
  </section>
</template>

<script type="es6">
  import {Card} from 'vux'
  import {getCommon} from '@/api/api';

  export default {
    components: {Card},
    data() {
      return {
        load_Button: false,
        data: {},
      }
    },
    methods: {
      jump(link) {
        this.$router.push(link);
      },
      //关闭数据加载失败的弹窗后显示刷新按钮
      onCancel() {
        this.load_Button = true;
      },
      //数据加载
      getData() {
        let _this = this;
        _this.load_Button = false;
        getCommon("/" + _this.$route.params.url.replace(/-/g, "/")).then((res) => {
          _this.data = res.data;
          _this.$nextTick(() => {
            _this.loadingRemove();
          });
        }).catch(function (error) {
          _this.loadingRemove();
          _this.confirm("提示", error.message, "刷新试试", _this.reload, _this.onCancel); //使用main中的全局方法调用弹窗
        });
      }
    },
    created() {
      this.getData();
    },
    watch: {
      "$route": function () {
        this.getData();
      }
    }
  }
</script>

<style scoped lang="less">
  .card-padding {
    padding: 15px;
  }

  .lw-color-gray {
    color: #999;
  }
</style>
