<template>
  <ul class="com-step-time">
    <li v-for="(item, index) in timeList" :key="index" :class="item.dayFirst ? 'c-t-day' : ''">
      <div class="c-t-date">{{ item.time }}</div>
      <div class="c-t-sliver" />
      <div class="pb-middle">
        <p class="c-t-tit">{{ item.title }}</p>
        <ul class="c-t-sinfo">
          <slot :timeData="item" />
        </ul>
      </div>
    </li>
  </ul>
</template>

<script type="text/babel">
export default {
  name: 'ComSingleTxt',
  props: {
    timeList: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.com-step-time {
  padding: 20px;
  background-color: #f1f4f9;
  .pb-middle{
    padding-bottom: 15px;
  }
  & > li {
    display: flex;
    &:last-child {
      // height: 54px;
      & > .c-t-sliver::after {
        display: none;
      }
    }
  }
  .c-t-day {
    & > .c-t-sliver {
      &::before {
        background: #3C6EF0;
        border: 4px solid #cad4f0;
        left: 10px;
        top: 0;
      }
    }
  }
  .c-t-date {
    width: 130px;
    flex: 0 0 130px;
    text-align: right;
    margin-top: -2px;
  }
  .c-t-sliver {
    width: 38px;
    flex: 0 0 38px;
    position: relative;
    &::before {
      content: '';
      display: block;
      border-radius: 50%;
      box-sizing: content-box;
      width: 8px;
      height: 8px;
      background: #CED5E7;
      border: none;
      position: absolute;
      top: 4px;
      left: 14px;
      z-index: 3;
    }
    &::after {
      content: '';
      display: block;
      width: 1px;
      height: 100%;
      background-color: #E4E9F0;
      position: absolute;
      left: 18px;
      top: 4px;
      z-index: 1;
    }

  }
  .c-t-tit {
    color: #333;
    height: 20px;
    overflow: hidden;
    font: 700 14px/20px sans-serif;
  }
  .c-t-sinfo {
    margin-top: 8px;
    & > li {
      float: left;
      font: normal 500 14px/20px sans-serif;
      color: #666;
      &::after {
        content: '|';
        color: #D0D7E1;
        margin: 0 10px;
      }
    }
    & > li:last-child{
      &::after {
        display: none;
      }
    }
  }
}
</style>
