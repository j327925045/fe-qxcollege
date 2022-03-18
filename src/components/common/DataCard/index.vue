<!-- 可以考虑使用 v-slot 进行扩展 -->
<template>
  <ul class="common-data-card cf">
    <li v-for="(item, index) in dataList" :key="index"
        :class="current === item.value ? 'active': ''" @click="tabToggle(item)"
    >
      <div class="item">
        <p class="data-title">{{ item.title }}</p>
        <div><span class="data-number">{{ item.number }}</span></div>
      </div>
    </li>
  </ul>
</template>
<script>
export default {
  name: 'ComDataCard',
  props: {
    value: [String, Number],
    dataList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      current: null
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: function(val) {
        if (this.current === val) {
          return
        }
        this.current = val
      }
    }
  },
  methods: {
    tabToggle(item) {
      this.$emit('input', item.value)
      this.$emit('change', item.value)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/mixins.scss';

.common-data-card{
  height:100px;
  > li{
    float: left;
    width: 12.5%;
    min-width: 150px;
  }
  .item{
   margin-right: 15px;
    padding: 18px 0 0 24px;
    height: 100px;
    background: rgba(252,252,252,1);
    background: url('./img/card-bg.png') right bottom no-repeat rgba(252,252,252,1);
    background-size: 60%;
    border: 1px solid rgba(233,233,233,1);
    border-radius: 4px;
    cursor: pointer;

  }
  .data-title{
    margin-bottom: 8px;
    font-size: 14px;
    color: rgba(153,153,153,1);
  }
  .data-number{
    line-height: 30px;
    font-family: Avenir-Heavy;
    font-size: 25px;
    color: rgba(51,51,51,1);
    vertical-align: middle;
  }
  .active{
    .item{
      @include font_color("menu-active-color");
      @include background_color("menu-active-color");
      background: url('./img/card-active-bg.png') right bottom no-repeat;
      background-size: 60%;
      border:0;
      p, div span{
        color: #fff;
      }

    }
  }
}
</style>
