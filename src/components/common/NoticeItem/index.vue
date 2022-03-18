<template>
  <ul class="common-notice-item">
    <template v-if="hasTime">
      <li v-for="(item, index) in noticeList" :key="index">
        <span class="date">{{ item.date }}</span>
        <a :href="item.url">{{ item.title }}</a>
      </li>
    </template>
    <template v-else>
      <li v-for="(item, index) in noticeList" :key="index" class="no-date">
        <a :href="item.url">{{ item.title }}</a>
      </li>
    </template>
  </ul>
</template>
<script>
export default {
  name: 'ComNoticeItem',
  props: {
    noticeList: {
      type: Array,
      default() {
        return []
      }
    },
    hasTime: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/mixins.scss';
.common-notice-item{
  > li{
    padding: 10px 80px 10px 0;
    line-height: 20px;
    > .date{
      float: right;
      margin-right: -80px;
      color: #999999
    }
    a{
      display: block;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      &:hover{
        @include font_color('main-color')
      }
    }
  }
  > .no-date{
    padding: 10px 0;
  }
}
</style>
