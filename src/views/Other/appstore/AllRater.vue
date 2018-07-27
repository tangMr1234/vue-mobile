<template>
  <div style="background: #fff;">
    <!-- 顶部图文标题 -->
    <flexbox>
      <flexbox-item :span="3/10">
        <div class="card-padding">
          <h2 style="font-size:22px;">4分</h2>
          <div>满分5分</div>
          <div>150人评分</div>
          <router-link to="erater" style="color:#409eff;margin-top:15px;display:block;">我要评分</router-link>
        </div>
      </flexbox-item>
      <flexbox-item>
        <div style="display:flex;" v-for="(data, index) in total" :key="index">
          <rater v-model="data.max" :max="data.max" :margin="10" :font-size="10" active-color="#409eff" disabled
                 style="flex: 1;text-align: right;"></rater>
          <x-progress :percent="data.percent" :show-cancel="false" style="flex: 1;margin:0 10px"></x-progress>
        </div>
      </flexbox-item>
    </flexbox>
    <!-- 评价信息 -->
    <card style="background: #eee;margin:10px;border-radius:5px;" v-for="(data, index) in card_data" :key="index">
      <div slot="header">
        <cell>
          <b slot="title" style="font-size:20px;">{{data.name}}</b>
          <div slot="default">
            {{data.date}}
          </div>
          <div slot="inline-desc"><b>{{data.raterText}}分</b>
            <rater v-model="data.rater" active-color="#409eff" disabled></rater>
          </div>
        </cell>
      </div>
      <div slot="content" style="padding:0 15px 15px;">
        {{data.content}}
      </div>
    </card>
  </div>
</template>

<script type="es6">
  import {Flexbox, FlexboxItem, Rater, Group, Cell, Card, XProgress} from 'vux'
  import {getMessage} from '@/api/api';

  export default {
    components: {
      Flexbox, FlexboxItem, Rater, Group, Cell, Card, XProgress
    },
    data() {
      return {
        total: [
          {max: 5, percent: 80},
          {max: 4, percent: 10},
          {max: 3, percent: 5},
          {max: 2, percent: 3},
          {max: 1, percent: 2}
        ],
        card_data: []
      }
    },
    methods: {
      onEvent(event) {
        console.log('on', event)
      },
      // 加载评论数据
      loadRaterData() {
        for (var i = 0; i < Math.ceil(Math.random()*50); i++) {
          let math = Math.ceil(Math.random()*5)
          this.card_data.push({
            name: "小冷冷" + i,
            date: "2018年4月3日",
            raterText: math,
            rater: math,
            content: i + "应用真的很好用应用真的很好用应用真的很好用应用真的很好用应用真的很好用应用真的很好用应用真的很好用应用真的很好用应用真的很好用应用真的很好用应用真的很好用应用真的很好用应用真的很好用应用真的很好用应用真的很好用应用真的很好用应用真的很好用应用真的很好用应用真的很好用应用真的很好用应用真的很好用应用真的很好用应用真的很好用应用真的很好用应用真的很好用应用真的很好用应用真的很好用"
          });
        }
      }
    },
    mounted() {
      this.loadRaterData();
      this.loadingRemove(); //  使用main中的全局方法关闭loading
    }
  }
</script>

<style scoped rel="stylesheet/less" lang="less">
  .card-padding {
    padding: 15px;
  }
</style>
