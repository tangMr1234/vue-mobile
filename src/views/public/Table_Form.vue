<template>
  <div class="details custom_warp">
    <div class="hidden-x" style="-webkit-overflow-scrolling : touch;">
      <!-- 详情table -->
      <group v-for="(data,index) in table_data" :key="index" :title="data.header" style="margin-bottom:20px;">
        <x-table style="background-color:#fff;">
          <thead>
          <tr style="background-color: #F7F7F7">
            <th v-for="(column, index) in data.column" :width="column.width">{{column.title}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(list, index) in data.list">
            <td v-for="(column, index) in data.column" v-html="list[column.field]"></td>
          </tr>
          </tbody>
        </x-table>
      </group>
      <!-- 表单 -->
      <div v-if="data && data.form_items && data.form_items!=''">
        <component :is="component" :list="data" @ievent="submit"></component>
      </div>
    </div>
    <!-- loading -->
    <loading :show="submit_loading" text="提交中"></loading>
  </div>
</template>

<script type="es6">
  import {XTable, XButton, XHeader} from 'vux'
  import {getCommon, postCommon} from '@/api/api';

  export default {
    components: {
      XTable, XButton, XHeader,
      PublicForm: resolve => {
        require(['@/components/filter.vue'], resolve)
      }
    },
    data() {
      return {
        table_data: [],  //表格的数据
        data: null,  //全部的数据
        component: "PublicForm",  //引用组件
        submit_loading: false,  //提交时的loading
      }
    },
    methods: {
      //提交修改
      submit(item) {
        let _this = this, _para;
        _this.submit_loading = true;
        (top.location.href.split("?")[1]) ? _para = "?" + top.location.href.split("?")[1] : _para = "";
        let _param = {
          url: "/" + _this.$route.params.url.replace(/-/g, "/") + _para,
          params: item
        };
        postCommon(_param).then((res) => {
          _this.getData();
          _this.submit_loading = false;
          _this.toast(res.msg); //使用main中的全局方法调用弹窗
          _this.$store.state.edit_state = true;
        }).catch(function (error) {
          _this.submit_loading = false;
          _this.alert("提示", error.message, "知道了"); //使用main中的全局方法调用弹窗
        });
      },
      //获取详情数据
      getData() {
        let _this = this, _param;
        (top.location.href.split("?")[1]) ? _param = "?" + top.location.href.split("?")[1] : _param = "";
        getCommon("/" + _this.$route.params.url.replace(/-/g, "/") + _param).then((res) => {
          _this.data = res.data;
          (res.data['lists']) ? _this.table_data = res.data['lists'] : _this.table_data.push(res.data);
          _this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
        }).catch(function (error) {
          _this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
          _this.confirm("提示", error.message, "刷新试试", _this.reload, _this.onCancel); //使用main中的全局方法调用弹窗
        });
      }
    },
    created() {
      this.getData();
    },
    mounted() {
    }
  }
</script>
