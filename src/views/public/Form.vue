<template>
  <section>
    <lwForm @ievent="ievent"></lwForm>
  </section>
</template>

<script type="es6">
  import lwForm from '@/components/filter';
  import {postFilter} from '@/api/api';

  export default {
    components: {lwForm},
    data() {
      return {}
    },
    methods: {
      //获取筛选页面点击确定按钮后传递的值
      ievent(data) {
        let _this = this;
        _this.isLoading = true;
        if (data && data != "" && data != null) {
          postFilter(data).then((res) => {
            _this.header_title = res.data.title;
            _this.Report_Data = res.data;
            _this.loadingRemove();
          }).catch(function (error) {
            _this.alert("提示", error.message, "重试", _this.ievent(data), _this.onCancel); //使用main中的全局方法调用弹窗
            _this.loadingRemove();
          });
        } else {
          this.confirm("提示", "获取筛选条件异常，可刷新后再试！", "立即刷新", this.reload); //使用main中的全局方法调用弹窗
        }
      },
    },
    activated() {
      this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
    }
  }
</script>
