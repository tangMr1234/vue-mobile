<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: ["id"],
    data() {
      return {
        scroll: null,
      }
    },
    methods: {
      handleScroll() {
        this.$nextTick(() => {
          this.$emit("scrollTop", this.scroll.scrollTop);
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        let _this = this;
        _this.scroll = document.querySelector('.' + _this.id);
        _this.scroll.addEventListener('scroll', _this.handleScroll);
      });
    },
    activated() {
      this.scroll.addEventListener('scroll', this.handleScroll);
    },
    deactivated() {
      this.scroll.removeEventListener('scroll', this.handleScroll);
    }
  }
</script>
