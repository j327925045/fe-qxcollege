<template>
  <div class="gyl-view">
    <h3 class="gyl-title">
      <a class="more" href="#">查看全部 <i class="el-icon-arrow-cycle-right-solid" /></a><i class="el-icon-s-order" />模板标题
    </h3>
    <ul class="column-notice-item">
      <li v-for="(item, index) in noticeList" :key="index">
        <span class="date">{{ item.date }}</span
        ><a href="#">{{ item.title }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noticeList: [
        {
          title: '关于集团CHO体系组织调整及人员任命的公告',
          date: '2019.12.09'
        },
        {
          title: '关于业务部组织架构调整及人员任…',
          date: '2019.12.09'
        },
        {
          title: '中秋家礼来咯！这一次，JOY带你亲临紫禁城！',
          date: '2019.12.09'
        },
        {
          title: '中秋家礼来咯！这一次，JOY带你亲临紫禁城！',
          date: '2019.12.09'
        },
        {
          title: '首日开门红，25W+兄弟迎接检阅！',
          date: '2019.12.09'
        },
        {
          title: '11.11的第一杯奶茶',
          date: '2019.12.09'
        },
        {
          title: '关于产业发展事业部的组织架构调整…',
          date: '2019.12.09'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/mixins.scss';

.more {
  float: right;
  color: #999;
  font-size: 14px;

  i {
    color: #e6e6e6;
  }

  &:hover,
  &:hover i {
    @include font_color('main-color');
  }
}

.column-notice-item {
  height: 270px;

  li {
    padding: 10px 80px 10px 0;
    line-height: 20px;

    .date {
      float: right;
      margin-right: -80px;
      color: #999;
    }

    a {
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;

      &:hover {
        @include font_color('main-color');
      }
    }
  }
}
</style>
