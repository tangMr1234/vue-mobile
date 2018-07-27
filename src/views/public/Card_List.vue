<template>
  <div class="custom_warp hidden">
    <x-header slot="header">{{header}}</x-header>
    <div class="hidden-x" style="height:calc(100% - 46px);background:#eee;padding-bottom:20px;">
      <div style="width:92%;margin:0 auto;">
        <group style="box-shadow: 0 0 5px #ddd;" v-for="(item, index) in data" :key="index"
               @click.native="jump(item.link)">
          <cell>
            <div slot="title" style="padding: 20px 0;">
              <b style="font-size:18px;color:#333;">{{item.title}}</b>
              <div style="color:#999;margin-top:18px;">
                <p style="margin-bottom:5px;">{{item.comment}}</p>
                <p>{{item.explain}}</p>
              </div>
            </div>
            <div>
              <img :src="item.src" style="width:60px;" alt="">
            </div>
          </cell>
        </group>
      </div>
    </div>
  </div>
</template>

<script type="es6">
  import {getCommon} from '@/api/api';

  export default {
    data() {
      return {
        is_done: false,  //配合keep-alive判断是否是首次加载
        is_location: null, //判断上次是否进入的该页面
        data: [],
        header: null,
      }
    },
    methods: {
      //设置sessionStorage来打开warn弹窗
      setSession() {
        sessionStorage.setItem('warn', 'yes');
      },
      jump(link) {
        this.$router.push(link);
      },
      //加载数据
      getData() {
        let _this = this;
        getCommon("/" + _this.$route.params.url.replace(/-/g, "/")).then((res) => {
          _this.data = res.data.list;
          _this.header = res.data.header;
          _this.$nextTick(() => {
            _this.loadingRemove();
            _this.is_done = true;
          });
        }).catch(function (error) {
          _this.loadingRemove();
          _this.is_done = true;
          _this.confirm("提示", error.message, "刷新试试", _this.reload, _this.onCancel); //使用main中的全局方法调用弹窗
        });
      },
    },
    created() {
      this.is_location = this.$route.path;
      this.getData();
    },
    mounted() {
      if (!sessionStorage.getItem('warn')) {
        // this.alert("提示", "试用应用的演示数据，仅供APP体验，试用期间该弹窗可暂时关闭！", "知道了", this.setSession); //使用main中的全局方法调用弹窗
      }
    },
    activated() {
      if (this.is_done) {
        if (this.is_location == this.$route.path) {
          this.loadingRemove();
        } else {
          this.is_location = this.$route.path;
          this.data = [];
          this.getData();
        }
      }
    }
  }
</script>
